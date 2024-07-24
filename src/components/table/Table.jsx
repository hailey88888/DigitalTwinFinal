import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { useDispatch,useSelector } from 'react-redux';
import { siteActions } from "../../reducx/site";
import { userActions } from "../../reducx/user";
import { useEffect } from 'react';
import Paging from "../pagination/Paging";
import { commonActions } from "../../reducx/common";
import { dshcodeActions } from "../../reducx/dashboardCode";
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { facilityActions } from "../../reducx/facility";
import { facilityCodeActions } from "../../reducx/facilityCode";
import CheckBox from "./CheckBox";


const Table = ({url}) => {
  console.log('테이블 컴포넌트');
  const dispatch = useDispatch();
  const { tableData,dataGridKey,checkedBoxes } = useSelector((state) => state.commonReducer);


//----------------[ 날짜 포맷 ]------------
function formatDate(isoDate) {
  if(isoDate==="null" || isoDate===null) {
    return null;
  }else{
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
  
//----------------[ 이미지 경로 ] ---------
const imageUrl = '/files/web/site'; // 서버를 통해 접근하는 이미지 URL

//---------------------[ 페이징 될때마다 업데이트 ]----------------------------
  useEffect(() => {
    console.log('테이블 UseEffect 실행')
  }, [tableData]);

  useEffect(() => {
    console.log('테이블 UseEffect 실행 - 테이블 업데이트')
    dispatch(commonActions.getdataGridKey(0)); 
  }, [dataGridKey]);

  useEffect(()=>{
    dispatch(commonActions.getCheckedBoxes([]));
  },[]);

//1.                        Functions
//---------------------[ (1) 편집하기  ]------------------------
const upDateHandle = () =>{
  dispatch(commonActions.getdataGridKey(dataGridKey+1));
    if(url === 'site'){
      dispatch(siteActions.getopenEditDrawer(true)); // Edit Drawer 열기
    }else if(url === 'user'){
      dispatch(userActions.getopenEditDrawer(true)); // Edit Drawer 열기
    }else if(url === 'dshCode'){
      dispatch(dshcodeActions.getopenEditDrawer(true)); // Edit Drawer 열기
    }else if (url ==='facility'){
      dispatch(facilityActions.getopenEditDrawer(true)); // Edit Drawer 열기
    }else if (url ==='facilityCode'){
      dispatch(facilityCodeActions.getopenEditDrawer(true)); // Edit Drawer 열기
    }
}


//---------------------[ (2) 체크박스 선택하기 => 삭제 ]------------------------
const checkingBox = (params) => {
console.log("params ::",params);
  let id;
  if(url==='site'){
    id = params.siteNo;
  }else if(url==='user'){
    id = params.userId;
  }else if(url==='dshCode'){
    id = params.dashboardCodeNo;
  }else if (url ==='facility'){
    id = params.facilityNo;
  }else if (url ==='facilityCode'){
    id = params.facilityCodeNo;
  }

    let updatedArray;
    if (!checkedBoxes.includes(id)) {
         updatedArray = [...checkedBoxes, id]; 
    } else {
         updatedArray = checkedBoxes.filter(checkedId  => checkedId  !== id);
         console.log(`ID ${id} is already in the checkedArray.`);
    }
    dispatch(commonActions.getCheckedBoxes(updatedArray)); 
  }


//2.                            Tables
//---------------------[ (1) 테이블 헤더와 바디  ]-----------------------
let tableHeader, tableBody;
    if (tableData && tableData.length > 0) {
        const firstRow = tableData[0];
        const keys = Object.keys(firstRow);

          //-------테이블 바디
          tableBody = tableData.map((row,rowIndex) => {
            const rowData = {id:rowIndex};
            keys.forEach((key) => {
              rowData[key] = row[key];
              if(key==='createDatetime' || key==='lastModifyDatetime'){
                  return rowData[key] = formatDate(row[key]);
              }
          });
            return rowData;
          });


        //--------테이블 헤더
        tableHeader = keys.map((key,index) => {
            
            if(key==='userPw'){
              return null;
            //URL = site일때 
            }else if(key==='logoFileName'){
              return null;
              // return {
              //   field: key,
              //   headerName: key,
              //   flex: 1,
              //   width: 100,
              //   renderCell: (params) => {
              //    return( <img
              //     src={`${imageUrl}/${params.row.siteNo}/logo/logo.png`}
              //     alt="logo"
              //     style={{ width: '30px', height: '20px' }}
              //   />)
              //     }
              // }
            }
            // else if(key==='Checkbox selection'){
            //   return {
            //     field: key,
            //     headerName: key,
            //     flex: 1,
            //     width: 100,
            //   }
            // }
            else{
              return {
                field: key,
                headerName: key,
                flex: 1,
                cellClassName: "name-column--cell",
                width: 100,
              }
            }
        }).filter(header => header !== null);

        //--------편집 icon
        const editIcon = {
        field: 'update',
        headerName: 'update',
        flex: 1,
        cellClassName: "name-column--cell",
        width: 20,
        //해당 헤더의 바디 데이터
        // detail는 데이터객체의 key값임
                renderCell:({row : {detail}}) =>{
                    return (
                     <Chip 
                          type="submit"
                          onClick={upDateHandle}
                          icon={<EditIcon
                                    sx={{
                                      fontSize: '25px',
                                      paddingLeft:'5px',
                                      marginLeft:'20px',
                                      marginRight: '20px',
                                  }}
                               />} 
                          label="Edit"  
                          sx={{
                            backgroundColor:'#4dabf5',
                            color:'white'
                          }}
                          
                    />
                    )
                }
                };

        //---------헤더에 편집 icon 추가
        tableHeader = [...tableHeader, editIcon];


    }else {                                
    tableHeader = [];
    tableBody = [];
    }


//---------------------[ 사이드바 열린 경우 크기 변화  ]-----------------------
const {sideBarOpen}= useSelector((state) => state.commonReducer);

return (
    <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  paddingTop:'15px',
                  // width:'90%'
                  }}>
        {tableData && tableData.length > 0 
        ? //데이터가 존재
        <>
        {/* ---------------[ 테이블 ]-------------------- */}
          <DataGrid       
              key={dataGridKey}
              rows={tableBody}
              columns={tableHeader.map(column => ({
                ...column,
                headerClassName: 'custom-header-class'
              }))}
              slots={{
                toolbar: GridToolbar,
                // baseCheckbox: CheckBox, 
              }}
              // density="comfortable"


              sx={{
                fontSize:'14px',
                height:'100%',
                // width:'100%',
                // borderRadius:'20px',
                // width: sideBarOpen ? '90%' : '85%',
                '& .MuiDataGrid-cell': {
                  color: '#c8c8c8', // 셀 텍스트 색상 설정
                  backgroundColor: 'rgba(44, 56, 126, 0.3)', 
                  // backgroundColor: 'rgba(23,105,170, 0.1)', 
                  // border:'1px solid rgba(41, 172, 98, 0.)'
                },

                '& .MuiDataGrid-row' : {
                    // border:'1px solid rgba(23,105,170,0.4)'
                    border:'1px solid black'

                },

                
          
              }}
              pagination={false}
              //체크박스 옵션 
              checkboxSelection 
                //체크박스 선택
                onCellClick={(params) => {
                  const rowData = params.row;
                  const columnField = params.field;
                  console.log('columnField-rowData : ',rowData);
                  console.log('columnField : ',columnField);
                  // 클릭된 셀이 'update' 컬럼(즉, DriveFileRenameOutlineIcon 셀)이고, rowData.detail가 있는 경우에만 upDateHandle 함수를 실행합니다.
                  //Update 할 데이터를 전역 데이터로 전달
                  if(columnField === 'update'){
                    dispatch(commonActions.getUpdateData(rowData)); // 업데이트 할 데이터 전역으로 전달 
                    dispatch(siteActions.getopenEditDrawer(true)); // 업데이트 폼 열기 
                  }else{
                      checkingBox(rowData);
                  }
                 
                }}
                disableColumnFilter 
          />
        {/* ---------------[ 페이징 ]-------------------- */}
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          
            }}>
              <Paging
              />
          </div>
          </>
        :  //데이터가 없는경우
        <>
        {/* ----------[ 데이터가 존재하지 않습니다 ]--------- */}
          <div style={{  
                      marginTop : '20vh',
                      textAlign: 'center'
                      }}
          >
              <DesktopAccessDisabledIcon
                      sx={{
                            fontSize :'30vh',
                            color:"#5e5e5e" 
                          }}
                />
              <h3 style={{ textAlign: 'center', color:"#5e5e5e"  }}>데이터가 존재하지 않습니다</h3>
          </div>
        </>
        }

        
    </div>


);
}


export default Table;
