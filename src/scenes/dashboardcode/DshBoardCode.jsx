import { useDispatch,useSelector } from 'react-redux';
import { homeActions } from '../../reducx/home';
import { useQuery } from "@tanstack/react-query";
import { commonActions } from '../../reducx/common';
import { getDshboardCodeList,deleteDshboardCode } from '../../util/restAPI/siteAdmin/dashboardCode';
import { Box, Button, Drawer,CircularProgress} from "@mui/material";
import Table from '../../components/table/Table';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Alert from '@mui/material/Alert';
import { dshcodeActions } from '../../reducx/dashboardCode';
import { TableSearchBox } from '../css/TableSearchBox';
import { useEffect, useState} from 'react';
import DashboardCodeDialog from '../../components/dialogs/dashboardCode/DashboardCodeDialog';
import { SceneCss,Header } from '../css/CRUD/SceneCss';
import DshCodeDeleteDialog from '../../components/dialogs/dashboardCode/DshCodeDeleteDialog';


const DshBoardCode = () => {
    const dispatch = useDispatch();
    //테이블 데이터
    const {tableData,pageNumber,checkedBoxes,updateData} = useSelector((state) => state.commonReducer); // 테이블 데이터
    const {openDrawer,openEditDrawer,deleteAlert,deleteDialog}= useSelector((state) => state.dshcodeReducer);
    const {userID,siteNo } = useSelector((state) => state.authReducer);

//-------------------[ home의 페이지 타이틀 ]-------------------
    dispatch(homeActions.getPageTitle('대시보드코드'));

//-------------------[ (1) Drawer관련 state ]-------------------
const [open, setOpen] = useState(openDrawer);
const [editOpen, setEditOpen] = useState(openEditDrawer);



//함수 
//1. UI
  //1. 대시보드코드 삭제하시겠습니까 다이얼창 열기 
      //1)체크박스 선택안된경우  : 선택해주세요 Alert
      //2)선택된경우 : HTTP DELETE 요청 
  const deleteOpen = () => {
    if(checkedBoxes.length === 0){
      dispatch(dshcodeActions.getDeleteAlert(true));
    }else{
      dispatch(dshcodeActions.getDshCodeDeleteDialog(true));
    }
  }

  useEffect(() => {
    console.log('삭제후 UseEffect 실행')
    if(deleteAlert){
      setTimeout(()=> {
        dispatch(commonActions.getCheckedBoxes([]));
        dispatch(dshcodeActions.getDeleteAlert(false));
        dispatch(commonActions.getdataGridKey(2));
      }, 1000); 
    }else{
      refetch();
    }
  }, [deleteAlert]);


  useEffect(()=>{
    if(!deleteDialog && checkedBoxes.length > 0){  
      dispatch(dshcodeActions.getDeleteAlert(true));
    }
  },[deleteDialog])


  //2. 대시보드코드 생성 Form Dialog 열기 (Create a new Dashboard Code)
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
    dispatch(dshcodeActions.getopenDrawer(newOpen));
  };



//2. HTTP 
  //1. GET 요청 - 대시보드 코드 리스트 가져오기
  const {isLoading,isError,error,data,refetch,
    isFetching,isPreviousData} = useQuery({
                                              queryKey: ['getDshboardCodeList', pageNumber],
                                               queryFn: ({ signal, queryKey }) => getDshboardCodeList({...queryKey[1],
                                                                            pageNum:pageNumber,
                                                                            siteNum:siteNo
                                                                          }),
                                                refetchOnWindowFocus: false, 
                                           });

    if(data){
    const { content,totalPages } = data;
 
    //전역 데이터 2. 현재 테이블 데이터 
    dispatch(commonActions.getTableData(content));
    //전역 데이터 3. 페이지 개수
    dispatch(commonActions.getNumberOfPages(totalPages));
    }



//3. UseEffect
  //1. 대시보드코드 생성완료하면 Form Dialog 닫기
  useEffect(() => {
    setOpen(openDrawer);
    dispatch(commonActions.getdataGridKey(1));
    refetch();   
  }, [openDrawer]);
  


  //2. 대시보드코드 편집 완료하면 Form Dialog 닫기
  useEffect(() => {
    setEditOpen(openEditDrawer);
    if(!openEditDrawer){
      dispatch(commonActions.getUpdateData(''));
      dispatch(commonActions.getdataGridKey(3));
      refetch();  
    }
  }, [openEditDrawer]);


//3. 삭제완료하면 deleteAlert 띄우기 -> 2초뒤에 사라지고 refetch
useEffect(() => {
    if(deleteAlert){
      setTimeout(()=> {
        dispatch(commonActions.getCheckedBoxes([]));
        dispatch(dshcodeActions.getDeleteAlert(false));
        dispatch(commonActions.getdataGridKey(2));
      }, 2000); 
    } else {
      refetch();    
    }
  }, [deleteAlert]);


    return (
   
      <Box id="Dashboard code entire body"  
            sx={SceneCss} >
          <h1 style={{ paddingLeft:'20px', fontSize:'30px'}}>대시보드 코드 목록</h1>
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
                        marginLeft:'10px',
                        marginRight: '20px',
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#7089c4',
                        }
                    }}
                />
                <h3 style={{ marginLeft: '-10px', color:'#6798bf' }}>Create a new Dashboard Code</h3>
            </div>
            {tableData && tableData.length > 0 &&
              <div style={{ display: 'flex', alignItems: 'center', marginRight:'20px' }}>
                  {/* 삭제 button */}
                  <Button
                      type="submit"
                      // color="secondary"
                      variant="contained"
                      onClick={deleteOpen}
                      style={{ marginRight: '10px', color: 'white',backgroundColor:'#2c387e' }} 
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
                                :  <Table url="dshCode"/>
                                }
                            </>
  
                        </div>
           </Box>  
            {/* ------------------------[ Dialog ]-----------------------------*/}
              {/* 생성 */}
                {open && <DashboardCodeDialog/>}

              {/* 편집 */}
                {editOpen && <DashboardCodeDialog/>}

              {/* 삭제 */}
                {deleteDialog && <DshCodeDeleteDialog/>}
      </Box>
     
       
         
  
    );
}

export default DshBoardCode;