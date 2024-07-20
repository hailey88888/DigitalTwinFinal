
import { useDispatch,useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { homeActions } from '../../reducx/home';
import { Box, Button, Drawer,CircularProgress} from "@mui/material";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { useQuery } from "@tanstack/react-query";
import { getFacilitylists } from '../../util/restAPI/siteAdmin/facility';
import { commonActions } from '../../reducx/common';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TableSearchBox } from '../css/TableSearchBox';
import Table from '../../components/table/Table';
import Alert from '@mui/material/Alert';
import { facilityActions } from '../../reducx/facility';
import FacilityDialog from '../../components/dialogs/facility/FacilityDialog';
import FacilityDeleteDialog from '../../components/dialogs/facility/FacilityDeleteDialog';
import { SceneCss,Header } from '../css/CRUD/SceneCss';

const Facility = () => {
    const dispatch = useDispatch();
    const {tableData,pageNumber,checkedBoxes,updateData} = useSelector((state) => state.commonReducer); // 테이블 데이터
    const {siteNo } = useSelector((state) => state.authReducer);
    const {deleteAlert,deleteDialog,openDrawer,openEditDrawer} = useSelector((state)=> state.facilityReducer);

//-------------------[ home의 페이지 타이틀 ]-------------------
dispatch(homeActions.getPageTitle('설비'));

//-----------------[ 사이트생성 Drawer 열기 ]------------------
const toggleDrawer = (newOpen) => {
  dispatch(facilityActions.getopenDrawer(newOpen));
  };

  //사이트 생성완료하면 닫기
  useEffect(() => {
      dispatch(commonActions.getdataGridKey(1));
      refetch();   
  }, [openDrawer]);

  useEffect(() => {
    if(!openEditDrawer){
      dispatch(commonActions.getUpdateData(''));
      dispatch(commonActions.getdataGridKey(3));
    }
    refetch();  
  }, [openEditDrawer]);
  

//---------------[ 체크박스 삭제 알림창(다이얼) 열기  ]-----------------------------
const deleteOpen = () => {
  if(checkedBoxes.length === 0){
    dispatch(facilityActions.getDeleteAlert(true));
  }else{
      dispatch(facilityActions.getUserDeleteDialog(true));
  }
}

//-----------------------useEffect [3. 삭제완료되었을때 ]-------------------------------------
useEffect(() => {
  console.log('삭제후 UseEffect 실행')
 // refetch();  
  if(deleteAlert){
    setTimeout(()=> {
      dispatch(commonActions.getCheckedBoxes([]));
      dispatch(facilityActions.getDeleteAlert(false));
      dispatch(commonActions.getdataGridKey(2));
    }, 1000); 
  }else{
    refetch();
  }
}, [deleteAlert]);


useEffect(()=>{
  if(!deleteDialog && checkedBoxes.length > 0){  
    dispatch(facilityActions.getDeleteAlert(true));
  }
},[deleteDialog])



//-------------------[ HTTP 설비 리스트 요청  ]-------------------
const {isLoading,isError,error,data,refetch,
    isFetching,isPreviousData} = useQuery({
                                              queryKey: ['getFacilitylists', pageNumber],
                                               queryFn: ({ signal, queryKey }) => getFacilitylists({...queryKey[1],
                                                                            pageNum:pageNumber,
                                                                            siteNum:siteNo
                                                                          }),
                                                refetchOnWindowFocus: false, 
                                           });
    if(data){
    const { content } = data;
    //전역 데이터 2. 현재 테이블 데이터 
    dispatch(commonActions.getTableData(content));
    }

    return (
        <Box id="Facility entire body"
          sx={SceneCss}>
          <h1 style={{ paddingLeft:'20px', fontSize:'30px'}}>설비 목록</h1>

        {/* ----------[ 생성 & 삭제 버튼 ]--------- */}
         <div style={Header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* 생성 button */}
                <ControlPointDuplicateIcon
                    type="submit"
                    // color="#4cc2f5"
                    variant="text"
                   onClick={()=>toggleDrawer(true)}
                    sx={{
                        color : '#6798bf',
                        fontSize: '30px',
                        marginLeft:'15px',
                        marginRight: '20px',
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#7089c4',
                        }
                    }}
                />
                <h3 style={{ marginLeft: '-10px', color:'#6798bf' }}>Create a new Facility</h3>
            </div>
            {tableData && tableData.length > 0 &&
              <div style={{ display: 'flex', alignItems: 'center', marginRight:'20px' }}>
                  {/* 삭제 button */}
                  <Button
                      type="submit"
                      // color="secondary"
                      variant="contained"
                      onClick={deleteOpen}
                      style={{marginRight: '10px', color: 'white',backgroundColor:'#2c387e' }} 
                  >
                    <DeleteOutlineIcon sx={{ marginRight: '10px',fontSize:'19px' }} />
                      Delete
                  </Button>
              </div>
            }
            
          </div>
        {/* ------------[ 데이터 목록(Table) ]------------- */}
            <Box
                marginLeft={5}
                marginTop={4}
                sx={TableSearchBox}
              >
                      {/* -------------------[ 테이블 데이터 + (생성 / 삭제)버튼 ]-------------------*/}
                        <div>
                            <>
                              {/* ----------[ 테이블 ]--------- */}
                              <Box 
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  
                                }}
                              >
                            {/* ----------[ 삭제완료 알람 ]--------- */}
                              {deleteAlert && checkedBoxes.length === 0 &&
                              <Alert 
                                    sx={{ width: '600px' }} 
                                    severity="error"
                                    >
                                        삭제할 데이터를 선택해주세요
                                    </Alert> }
                              {deleteAlert && checkedBoxes.length > 0 &&
                              <Alert 
                                    sx={{ width: '600px' }} 
                                    severity="success"
                                    >
                                        삭제완료
                                    </Alert> }


                              </Box>
                                {isLoading 
                                ?  <CircularProgress color="success" size={100} 
                                    sx={{
                                      position: 'fixed',
                                      top: '20%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)',
                                    }}
                                    />
                                :  <Table url="facility"/>
                                }
                            </>
  
                        </div>
           </Box>  


 {/* ------------------------[ Drawer ]-----------------------------*/}
      {/* 생성 */}
        {openDrawer && <FacilityDialog/>}

      {/* 편집 */}
        {openEditDrawer && <FacilityDialog/>}

      {/* 삭제 */}
        {deleteDialog && <FacilityDeleteDialog/>}


        </Box>
    );


}

export default Facility;