import { useDispatch,useSelector } from 'react-redux';
import { Box, Button, Drawer,CircularProgress} from "@mui/material";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { homeActions } from '../../reducx/home';
import { getUserlists } from '../../util/restAPI/siteAdmin/user';
import { useQuery } from "@tanstack/react-query";
import { commonActions } from '../../reducx/common';
import { TableSearchBox } from '../css/TableSearchBox';
import Alert from '@mui/material/Alert';
import Table from '../../components/table/Table';
import { deleteUser } from '../../util/restAPI/siteAdmin/user';
import { userActions } from '../../reducx/user';
import { useEffect, useState} from 'react';
import Drawers from '../../components/drawer/Drawers';
import UserDialog from '../../components/dialogs/user/UserDialog';
import UserDeleteDialog from '../../components/dialogs/user/UserDeleteDialog';
import { SceneCss,Header } from '../css/CRUD/SceneCss';


const User = () => {
    const dispatch = useDispatch();
    const {openDrawer,openEditDrawer,deleteAlert,deleteDialog}
    = useSelector((state) => state.userReducer);
    const {tableData,pageNumber,checkedBoxes} = useSelector((state) => state.commonReducer); // 테이블 데이터
    const {siteNo,role} = useSelector((state) => state.authReducer);

//-------------------[ home의 페이지 타이틀 ]-------------------
    dispatch(homeActions.getPageTitle('사용자'));

//                        1. Drawer
//-------------------[ (1) Drawer관련 state ]-------------------
const [open, setOpen] = useState(openDrawer);
const [editOpen, setEditOpen] = useState(openEditDrawer);


//-----------------[ (2) 사용자생성 Drawer 열기 ]------------------
  const toggleDrawer = (newOpen) => {
  console.log("사용자 생성")
  setOpen(newOpen);
  dispatch(userActions.getopenDrawer(newOpen));

  };

  //사이트 생성완료하면 닫기
  useEffect(() => {
    setOpen(openDrawer);
    dispatch(commonActions.getdataGridKey(1));
    refetch();   
  }, [openDrawer]);
  
  useEffect(() => {
    setEditOpen(openEditDrawer);
    if(!openEditDrawer){
      dispatch(commonActions.getUpdateData(''));
      dispatch(commonActions.getdataGridKey(3));
      refetch();  
    }
  }, [openEditDrawer]);


//----------------[ HTTP GET 요청 유저목록 조회 불러오는중 ]------------------------------------------
  //GET 요청
  const {isLoading,isError,error,data,refetch,
    isFetching,isPreviousData} = useQuery({
                                              queryKey: ['getUserlists', pageNumber],
                                               queryFn: ({ signal, queryKey }) => getUserlists({...queryKey[1],
                                                                            pageNum:pageNumber,
                                                                            siteNum : siteNo
                                                                          }),
                                                refetchOnWindowFocus: false, 
                                           });

    console.log(data);

    if(data){
      console.log("data : ",data);
    const { content, totalElements,totalPages } = data;
    //전역 데이터 1. 전체 데이터 수(카운터)
    dispatch(commonActions.getTotalCount(totalElements));
    //전역 데이터 2. 현재 테이블 데이터 
    dispatch(commonActions.getTableData(content));
    //전역 데이터 3. 페이지 개수
    dispatch(commonActions.getNumberOfPages(totalPages));
    }

//-----------------------useEffect [3. 삭제완료되었을때 ]-------------------------------------
useEffect(() => {
    console.log('삭제후 UseEffect 실행')
   // refetch();  
    if(deleteAlert){
      setTimeout(()=> {
        dispatch(commonActions.getCheckedBoxes([]));
        dispatch(userActions.getDeleteAlert(false));
        dispatch(commonActions.getdataGridKey(2));
      }, 1000); 
    }else{
      refetch();
    }
  }, [deleteAlert]);
  
  useEffect(()=>{
    if(!deleteDialog && checkedBoxes.length > 0){  
      dispatch(userActions.getDeleteAlert(true));
    }
  },[deleteDialog])


//---------------[ (1) 체크박스 삭제 알림창(다이얼) 열기  ]-----------------------------
const deleteOpen = () => {
    if(checkedBoxes.length === 0){
      dispatch(userActions.getDeleteAlert(true));
    }else{
        dispatch(userActions.getUserDeleteDialog(true));
    }
  }

  

return(
    <>
     <Box id="User entire body"  
         sx={SceneCss} >
          <h1 style={{ paddingLeft:'20px', fontSize:'30px'}}>사용자 목록</h1>
       
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
                        // color : '#1B7C6C',
                        color:'#6798bf',
                        fontSize: '30px',
                        marginLeft:'15px',
                        marginRight: '20px',
                        '&:hover': {
                            cursor: 'pointer',
                            color: '#7089c4',
                        }
                    }}
                />
                
                <h3 
                  style={{ marginLeft: '-10px', 
                        color:'#6798bf'
                        // color:'rgba(27, 124, 108, 0.7)' 
                  }}>Create a new User</h3>
               
            </div>
            {tableData && tableData.length > 0 &&
            <div style={{ display: 'flex', alignItems: 'center',marginRight:'20px'  }}>
                {/* 삭제 button */}
                <Button
                    type="submit"
                    // color="secondary"
                    variant="contained"
                    // onClick={()=>deleteOpen}
                   onClick={deleteOpen}
                    style={{ marginRight: '10px', color: 'white',backgroundColor:'#2c387e' }} 
                >
                  <DeleteOutlineIcon sx={{ marginRight: '10px' , fontSize:'19px'}} />
                    Delete
                </Button>
            </div>}
            
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
                                :  <Table url="user"/>
                                }
                            </>
  
                        </div>
           </Box>  

           
      </Box>

    {/* ------------------------[ Drawer ]-----------------------------*/}
         {/* 생성 */}
       {open && <UserDialog/>}
        {/* 편집 */}
       {editOpen && <UserDialog/>}

       {deleteDialog && <UserDeleteDialog/>}
    </>
)



}


export default User;
