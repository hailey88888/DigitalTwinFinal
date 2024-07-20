import { Box ,Button, Drawer,CircularProgress} from "@mui/material";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { TableSearchBox } from "../css/TableSearchBox";
import Table from "../../components/table/Table";
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { siteActions } from "../../reducx/site";
import { homeActions } from "../../reducx/home";
import { commonActions } from "../../reducx/common";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Drawers from "../../components/drawer/Drawers";
import { useQuery } from "@tanstack/react-query";
import { getSitelists } from "../../util/restAPI/masterUser/site";
import { deleteSite } from "../../util/restAPI/masterUser/site";

        
const Site = () => {
  const dispatch = useDispatch();

  const {openDrawer,openEditDrawer,dataGridKey,updateData,deleteAlert}
    = useSelector((state) => state.siteReducer);
  const {tableData,pageNumber,checkedBoxes}= useSelector((state) => state.commonReducer); // 테이블 데이터

//-------------------[ home의 페이지 타이틀 ]-------------------
useEffect(()=>{
  dispatch(homeActions.getPageTitle('Site 관리'));
},[])

//                        1. Drawer
//-------------------[ (1) Drawer관련 state ]-------------------
const [open, setOpen] = useState(openDrawer);
const [editOpen, setEditOpen] = useState(openEditDrawer);


//-----------------[ (2) 사이트생성 Drawer 열기 ]------------------
  const toggleDrawer = (newOpen) => {
  setOpen(newOpen);
  dispatch(siteActions.getopenDrawer(newOpen));

  };

  //사이트 생성완료하면 닫기
  useEffect(() => {
    setOpen(openDrawer);
    if(!openDrawer){
          refetch();  
    }
    
  }, [openDrawer]);
  
//-----------------[ (3) 사이트편집 Drawer 열기 ]------------------

  const toggleUpdateDrawer = (newOpen)  => {
    setEditOpen(newOpen);
    dispatch(siteActions.getopenEditDrawer(newOpen));
  };


  useEffect(() => {
    console.log("useEffect 사용하기 : ",openEditDrawer);
    setEditOpen(openEditDrawer);
    if(!openEditDrawer){
      console.log("데이터 삭제하기 ");
      dispatch(commonActions.getUpdateData(''));
      refetch();
    }
  }, [openEditDrawer]);

//----------------[ HTTP GET 요청 사이트 조회 불러오는중 ]------------------------------------------
  //GET 요청
  const {isLoading,isError,error,data,refetch,
    isFetching,isPreviousData, } = useQuery({
                                              queryKey: ['getSitelists', pageNumber],
                                               
   //page 상태가 변경되면 queryKey가 변경 
   //새로운 queryKey에 따라 queryFn(즉, fetchProjects 함수)을 호출하여 새로운 페이지에 해당하는 데이터를 요청
                                               queryFn: ({ signal, queryKey }) => getSitelists({...queryKey[1],
                                                                            pageNum:pageNumber
                                                                          }),
                                                refetchOnWindowFocus: false, // 창 포커스 시 자동 새로고침 비활성화
                                           });


  if(data){
    const { content, totalElements,totalPages } = data;
    //전역 데이터 1. 전체 데이터 수(카운터)
    dispatch(commonActions.getTotalCount(totalElements));
    //전역 데이터 2. 현재 테이블 데이터 
    dispatch(commonActions.getTableData(content));
    //전역 데이터 3. 페이지 개수
    dispatch(commonActions.getNumberOfPages(totalPages));
  }
 

//-----------------------useEffect [1. 페이징 될때마다 ]-------------------------------------
  useEffect(() => {
      console.log('useEffect-data pageNumber 실행')
      
  }, [pageNumber]);



//-----------------------useEffect [3. 삭제완료되었을때 ]-------------------------------------
  useEffect(() => {
    console.log('삭제후 UseEffect 실행')
    if(deleteAlert){
      setTimeout(()=> {
        dispatch(commonActions.getCheckedBoxes([]));
        dispatch(siteActions.getDeleteAlert(false));
        dispatch(commonActions.getdataGridKey(1));
      }, 2000); 
    } else {
      refetch();    
    }
  }, [deleteAlert]);



//                      3. Functions
//---------------[ (1) 체크박스 삭제 알림창(다이얼) 열기  ]-----------------------------
  const deleteOpen = () => {
    console.log('checkedBox : ',checkedBoxes)
    if(checkedBoxes.length === 0){
      dispatch(siteActions.getDeleteAlert(true));
    }else{
      checkedBoxes.forEach(async (checkedID) => {
        await deleteSite({siteNo:checkedID}); // 삭제하는 함수 호출 
        dispatch(siteActions.getDeleteAlert(true));
      });
    }
  }


    return(
        <>
         <Box id="Site entire body"  
         sx={{ backgroundColor: 'black',
               marginTop:'-30px', height:'100%'
          }} >

          {/* ----------[ 생성 & 삭제 버튼 ]--------- */}
          <div style={{ display: 'flex', justifyContent: 'space-between', 
                        marginTop: '30px', marginBottom: '-25px', paddingRight:'30px',
                        borderBottom: '1px solid #8f8c8c',
                         }}
            >
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
                <h3 style={{ marginLeft: '-10px', color:'#6798bf' }}>Create a new site</h3>
            </div>
            {tableData && tableData.length > 0 &&
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* 삭제 button */}
                <Button
                    type="submit"
                    // color="secondary"
                    variant="contained"
                    // onClick={()=>deleteOpen}
                    onClick={deleteOpen}
                    style={{ marginRight: '10px', color: '#6798bf' }} 
                >
                  <DeleteOutlineIcon sx={{ marginRight: '10px' }} />
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
                                :  <Table
                                    url="site"/>
                                }
                            </>
  
                        </div>
              </Box>    
          </Box>
    


    {/* ------------------------[ Drawer ]-----------------------------*/}
        {/* 생성 */}
          <Drawer 
          id="Drawer 감싸는 div"
          open={open} anchor='top' 
          sx={{
                
                height: '50vh',
                //width: '60%',
                margin: '0 auto', // 좌우 중앙 배치를 위해
          
            }}
            onClose={()=>toggleDrawer(false)}>
              <Drawers
                id ="createDialog"
                url = 'site'
               
              />
          </Drawer>

        {/* 편집 */} 
        <Drawer open={editOpen} anchor='top' 
         sx={{
          height: '50vh',
          margin: '0 auto', // 좌우 중앙 배치를 위해
    
        }}
        onClose={()=>toggleUpdateDrawer(false)}>
          {/* <EditDialog
            url = 'site'
          /> */}
           <Drawers
                id ="editDialog"
                url = 'site'
              
              />
        </Drawer>



        </>
    );
}


export default Site;
