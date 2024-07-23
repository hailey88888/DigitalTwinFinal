import { DataGrid,GridToolbar } from "@mui/x-data-grid";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,useEffect,useCallback ,useMemo } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { managingActions } from "../../reducx/3dModeling/table";


const Table = () =>{
  const dispatch = useDispatch();
  const {comTableData ,componentsList,seletecdComJson,
        comName,tableIndivComData,dataGridKey
        ,wsSocketData,selectedFac} = useSelector((state) => state.managingReducer); // 테이블 데이터
  const [jsonURL, setJsonURL]=useState('');
  const {siteNo} = useSelector((state) => state.authReducer);


const componentsListFlag = componentsList &&
                           componentsList.component &&
                           componentsList.component.length > 0
                           &&selectedFac;


// 설비 다른거 선택시 새로운 컴포넌트 리스트중 첫번째를 디폴트로 설정
useEffect(() => {
  console.log("리스트 선택");
  if (componentsListFlag) {
    console.log("componentsList : ",componentsList);
    const firstComponent = componentsList.component[0];
    console.log("firstComponent : ",firstComponent);
    if (firstComponent.model_path !== jsonURL) {
      dispatch(managingActions.getSeletecdComJSON(firstComponent.model));
      dispatch(managingActions.getComName(firstComponent.name));
      setJsonURL(firstComponent.model_path);
    }
  }
}, [componentsList, selectedFac,jsonURL]);





//1. 컴포넌트 리스트(탭들)중 하나를 선택 하기
const handleChange = (event, newValue) => {
  const seletedComTopic = `/dt/site/${siteNo}/facility/${selectedFac}/${newValue}`;
  console.log("선택한 컴포넌트 : ",newValue);
  dispatch(managingActions.getSelectedComTopic(seletedComTopic));
  dispatch(managingActions.getComName(newValue));

  // dispatch(managingActions.getComTableData({}));

};

useEffect(()=>{
  console.log("Table selectedFac 바뀜 : ",selectedFac);
},[selectedFac])



//2. 컴포넌트 리스트(탭들)중 하나를 선택한 경우 
  const COM_DATA_URL  = `/site/${jsonURL}/${seletecdComJson}`; //컴포넌트
  const comFetchData = async () => {
    console.log("COM_DATA_URL : ",COM_DATA_URL);
    try {
      const response = await fetch(COM_DATA_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("선택한 컴포넌트 정보 :", data);
      dispatch(managingActions.getComTableData(data.parts));
  
    } catch (error) {
    }
  };

  useEffect(()=>{
    comFetchData();
  },[jsonURL])


  const [tableHeader, setTableHeader] = useState([]);
  const [tableBody, setTableBody] = useState([]);

  const processData = useCallback(() => {
    if (comTableData && comTableData.length > 0) {
      const array = comTableData.map((item) => ({
        title: item.title,
        name: item.name
      }));
      const datas = comTableData.map((item) => item.datas);

      // 테이블 헤더
      const newTableHeader = array.map((key) => ({
        field: key.title,
        headerName: key.title,
        flex: 1,
        cellClassName: "name-column--cell",
        width: 100
      }));

      const frontHeader = {
        field: 'dataName',
        headerName: '항목',
        flex: 1,
        cellClassName: "name-column--cell",
        width: 100
      };

      // 테이블 바디
      // console.log("tableIndivComData : ",tableIndivComData);
      let dataNames = [];
      if (tableIndivComData && tableIndivComData.length > 0) {
        dataNames = [...new Set(tableIndivComData.flatMap(part => part.data.map(d => d.data_name)))];

        const newTableBody = dataNames.map((dataName, index) => {
          const row = { id: index, dataName };
          tableIndivComData.forEach(part => {
            const dataItem = part.data.find(d => d.data_name === dataName);
            const keyItem = array.find(item => item.name === part.name);
            if (dataItem && keyItem) {
              row[keyItem.title] = dataItem.cur_nvalue ? dataItem.cur_nvalue : dataItem.nvalue;
            }
          });
          return row;
        });
        setTableBody(newTableBody);
      }else setTableBody([]);

      setTableHeader([frontHeader, ...newTableHeader]);
    }
  }, [comTableData, tableIndivComData]);


//--------------------------- 웹소켓 데이터가 오는 경우 ----------------------------------
  // const comTableDatas = useMemo(() => {
  //   if (wsSocketData && Array.isArray(wsSocketData)) {
  //     const facility = wsSocketData.find(item => item.name === selectedFac);
  //     if (facility) {
  //       console.log("facility : ",facility);
  //       console.log(facility.components.find(component => component.name === comName)?.parts || []);
  //       return facility.components.find(component => component.name === comName)?.parts || [];
  //     }
  //   }
  //   return [];
  // }, [wsSocketData, selectedFac, comName]);


  useEffect(() => {
    processData();
  }, [comTableData, processData,tableIndivComData]);

  // useEffect(() => {
  //   // console.log("테이블 컴포넌트 선택! ", comName);
  //   // console.log("comTableDatas : ",comTableDatas);
  //   dispatch(managingActions.getTableIndivComData(comTableDatas));
  // }, [comTableDatas, dispatch]);




    //WebSocket 데이터를 받아와서 채우기 
    return(
        <div style={{height:'90%', marginLeft:'20px', paddingTop:'-20px', borderTop:'1px solid gray'}}>
          {componentsList?.component?.length > 0
          ?
            <>
              <Tabs
               value={comName}
               onChange={handleChange}
               textColor="primary"
               indicatorColor="secondary"
               aria-label="secondary tabs example"
               sx={{
                 '& .MuiTabs-indicator': {
                   backgroundColor: '#42a5f5', // 하늘색으로 변경
                 },
                 '& .MuiTab-root': {
                   fontSize: '13px',
                   color: '#6798bf', // 탭 텍스트 색상 변경
                   '&.Mui-selected': {
                     color: '#6798bf', // 선택된 탭 텍스트 색상 변경
                   },
                 },
               }}
              >
                {componentsList && componentsList.component && componentsList.component.length > 0 &&
                  componentsList.component.map((item,index)=>{
                  //console.log("탭 item (컴포넌트) : ",item);
                    return (
                        <Tab key={index} value={item.name} label={item.name} fontSize='15px' />
                    );
                  })
                }
              
              </Tabs>
              {comTableData && 
                <DataGrid
                  key={dataGridKey}
                  rows={tableBody}
                  columns={tableHeader}
                  sx={{
                    fontSize:'15px',
                    // height:'90%',
                    width: '100%',
                    '& .MuiDataGrid-cell': {
                      color: '#c8c8c8', // 셀 텍스트 색상 설정
                      backgroundColor: 'rgba(23,105,170, 0.1)', 
                      // border:'1px solid rgba(41, 172, 98, 0.)'
                    },
                    '& .MuiDataGrid-row' : {
                    border:'1px solid rgba(23,105,170,0.4)'
                    },
                    '& .custom-header-class': {
                      color: 'success',
                    },
                  }}
                  pagination={false}
                  disableColumnFilter
                  checkboxSelection={false}
                />
              }

            </>
          :
            <div style={{height:'90%',textAlign: 'center'}}>
              {/* <DesktopAccessDisabledIcon
                      sx={{
                            fontSize :'10vh',
                            color:"#5e5e5e" 
                          }}
                /> */}
              <h3 style={{ textAlign: 'center', color:"#5e5e5e"  }}>설비를 선택해주세요</h3>
            </div>
        
          }


         
         
        </div>
    );

}

export default Table;
