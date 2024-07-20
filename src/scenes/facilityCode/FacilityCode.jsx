import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { homeActions } from '../../reducx/home';
import { commonActions } from '../../reducx/common';
import { Box, Button, Drawer,CircularProgress} from "@mui/material";
import Table from '../../components/table/Table';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { getFacilityCodelists } from '../../util/restAPI/siteAdmin/facilityCode';
import { TableSearchBox } from '../css/TableSearchBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { SceneCss,Header } from '../css/CRUD/SceneCss';
import { facilityCodeActions } from '../../reducx/facilityCode';
import FacilityCodeDeleteDialog from '../../components/dialogs/facilityCode/FacilityCodeDeleteDialog';
import { useEffect } from 'react';
import FacilityCodeDialog from '../../components/dialogs/facilityCode/FacilityCodeDialog';
import Alert from '@mui/material/Alert';


const FacilityCode = () => {
    const dispatch = useDispatch();
    const {tableData,pageNumber,checkedBoxes,updateData} 
            = useSelector((state) => state.commonReducer); // 테이블 데이터
    const {siteNo } = useSelector((state) => state.authReducer);

    const {deleteAlert,deleteDialog,openDrawer,openEditDrawer} = useSelector((state) => state.facilityCodeReducer);

//-----------------[ 사이트생성 Drawer 열기 ]------------------
    const toggleDrawer = (newOpen) => {
        dispatch(facilityCodeActions.getopenDrawer(newOpen));
    };
  
    useEffect(() => {
      if(!openEditDrawer){
        dispatch(commonActions.getUpdateData(''));
        dispatch(commonActions.getdataGridKey(3));
      }
      refetch();  
    }, [openEditDrawer]);


    //사이트 생성완료하면 닫기
    useEffect(() => {
        dispatch(commonActions.getdataGridKey(1));
        refetch();   
    }, [openDrawer]);

//-----------------------useEffect [3. 삭제완료되었을때 ]-------------------------------------
useEffect(() => {
    console.log('삭제후 UseEffect 실행')
   // refetch();  
    if(deleteAlert){
      setTimeout(()=> {
        dispatch(commonActions.getCheckedBoxes([]));
        dispatch(facilityCodeActions.getDeleteAlert(false));
        dispatch(commonActions.getdataGridKey(2));
      }, 1000); 
    }else{
      refetch();
    }
  }, [deleteAlert]);
  
  useEffect(()=>{
    if(!deleteDialog && checkedBoxes.length > 0){  
      dispatch(facilityCodeActions.getDeleteAlert(true));
    }
  },[deleteDialog])

//-------------------[ home의 페이지 타이틀 ]-------------------
dispatch(homeActions.getPageTitle('설비 코드'));

//---------------[ 체크박스 삭제 알림창(다이얼) 열기  ]-----------------------------
const deleteOpen = () => {
    if(checkedBoxes.length === 0){
      dispatch(facilityCodeActions.getDeleteAlert(true));
    }else{
        dispatch(facilityCodeActions.getUserDeleteDialog(true));
    }
  }



//-------------------[ HTTP 설비 코드 리스트 요청  ]-------------------
const {isLoading,isError,error,data,refetch,
    isFetching,isPreviousData} = useQuery({
                                            queryKey: ['getFacilityCodelists', pageNumber],
                                            queryFn: ({ queryKey }) => getFacilityCodelists({...queryKey[1],
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

    return(
        <Box id="Facility Code entire body"
             sx={SceneCss}>
            <h1 style={{ paddingLeft:'20px', fontSize:'30px'}}>설비 코드 목록</h1>
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
                    <h3 style={{ marginLeft: '-10px', color:'#6798bf' }}>Create a new Facility Code</h3>
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
                                :  <Table url="facilityCode"/>
                                }
                            </>
  
                        </div>
             </Box>  
 {/* ------------------------[ Drawer ]-----------------------------*/}
      
      {/* 생성 */}
      {openDrawer && <FacilityCodeDialog/>}

      {/* 편집 */}
      {openEditDrawer && <FacilityCodeDialog/>}

      {/* 삭제 */}
      {deleteDialog && <FacilityCodeDeleteDialog/>}


    </Box>
    );
}


export default FacilityCode;