import {Box,useTheme} from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { dashboardActions } from '../../reducx/dashboard';
import { dshItemActions } from "../../reducx/dashboardItem";
import { homeActions } from '../../reducx/home';
import DashBoardHeader from '../../components/dashboard/DashboardHeader';
import { useEffect,useState } from 'react';
import EDITmode from "../../components/dashboard/EDITmode";
import SAVEmode from "../../components/dashboard/SAVEmode";
import { useQuery } from "@tanstack/react-query";
import { getDshboardItem } from "../../util/restAPI/siteAdmin/dashITEM";
import { fromDataBase ,getBoxIdFromContents} from "../../components/dashboard/handlers/itemboxeshandler";
import { getDshboardCodeList } from "../../util/restAPI/siteAdmin/dashboardCode";
import { commonActions } from "../../reducx/common";
import BuildSite from "../modeling/newVersion/BuildSite";
import { managingActions } from "../../reducx/3dModeling/table";
import useFetchFacilityData from "../../scenes/modeling/customHook/useFetchFacilityData";

function Dashboard(){
    const dispatch = useDispatch();
    const {closeIcon,dashNo} = useSelector((state) => state.dashboardReducer);
    const {deleteItemDialog,items}= useSelector((state) => state.dashboardItemReducer);
    const {userID,siteNo } = useSelector((state) => state.authReducer);
    const {pageNumber} = useSelector((state) => state.commonReducer); 
    const facilityList = useFetchFacilityData();

//-------------------[ home의 페이지 타이틀 ]-------------------
dispatch(homeActions.getPageTitle('대시보드'));

//-------------------[ 컴포넌트 나갈때 ]----------------------
useEffect(()=>{
  return()=>{
    dispatch(dshItemActions.getItems([]));
    dispatch(commonActions.getTableData([]));
  }
},[]);




//함수
//1. UI
//1. Drawer
//---------------데이터 선택하기 Drawer 닫기--------------------------
const toggleDrawer = () => {
  dispatch(dashboardActions.getOpenDataDrawer(false));
  
};


//2. HTTP
//- 두 가지의 GET요청이 하나의 컴포넌트에서 이루어지는 경우 
// 객체 분해할때 key, value로 나누면 됨 

//1. GET 요청 #1. 대시보드 아이템들 받아오기  ----------------
  //dashboardbody-EDIT MODE에, SAVE MODE
const {isLoading: isLoadingDashboard, isError: isErrorDashboard, 
  error: errorDashboard, data: dataDashboard, refetch: refetchDashboard, 
  isFetching: isFetchingDashboard, isPreviousData: isPreviousDataDashboard} 
  = useQuery({
               queryKey: ['getDshboardItem', pageNumber,dashNo,siteNo],
               queryFn: ({ signal, queryKey }) => getDshboardItem({...queryKey[1],
                                                                      pageNum:pageNumber,
                                                                      siteNum : siteNo,
                                                                      userId :userID ,
                                                                      dashNo : dashNo,
                                                                    }),
                                              refetchOnWindowFocus: false, 
                                      });
if(dataDashboard){
  const { content } = dataDashboard;
  dispatch(dshItemActions.getItems(content));
 }




//2. GET 요청 #2. 대시보드 코드 리스트 받아오기 
 //EDIT MODE에서 우클릭할때 나오는 데이터들 
 const {isLoading: isLoadingAnother, isError: isErrorAnother, error: errorAnother, data: dataDashCode, 
  refetch: refetchAnother, isFetching: isFetchingAnother, isPreviousData: isPreviousDataAnother} 
  = useQuery({
                queryKey: ['getDshboardCodeList', pageNumber,siteNo],
                queryFn: ({ signal, queryKey }) => getDshboardCodeList({...queryKey[1],
                                                                          pageNum:pageNumber,
                                                                          siteNum:siteNo
                                                                        }),
                                              refetchOnWindowFocus: false, 
                                         });

if(dataDashCode){
  const { content } = dataDashCode;
   dispatch(commonActions.getTableData(content));   
  }


//3. useEffect 
  //1. (DashboardHeader에서) 대시보드를 다른것을 선택했을때 실행됨
    useEffect(() => {
        if (dashNo !== undefined) {
          refetchDashboard();
        }
    }, [dashNo, refetchDashboard]);

  //2. (DashboardHeader에서) 저장하기/편집하기 버튼 누르면 실행
    useEffect(() => {
      console.log("useEffect 실행 : closeIcon");
      refetchDashboard();
    }, [closeIcon]);

  //3. (EDIT MODE에서) 대시보드 아이템을 삭제하시겠습니까 다이얼
    useEffect(() => { 
      console.log("useEffect 실행 : deleteItemDialog");
      refetchDashboard().then((result) => {
        console.log('데이터 다시 가져오기 완료:', result);
        const {data} =result;
        const {content} =data;
        dispatch(dshItemActions.getItems(content));
      }).catch((error) => {
        console.error('데이터 다시 가져오기 에러:', error);
      });
    }, [deleteItemDialog]);

  //4. 대시보드 아이템이 바뀐경우 
    useEffect(() => {
      refetchDashboard();
    }, [items]);



  return (
    <>
     <Box id="DashBoard entire body" 
      sx={{ backgroundColor: 'black',
            height:'25%',
            paddingTop:'10px', 
            width:'93%',
            paddingLeft:'20px',
            marginLeft:'40px',
            paddingRight:'20px',
            borderRadius: '22px',
      }} 
     >
          {/* -------------[ 1. 대시보드 타이틀 & 버튼 &&  2. 대시보드 화면 상단  ]------------ */}
            <DashBoardHeader/>

          {/* -------------[ 2. 대시보드 바디  ]------------*/}
          {dashNo !== 0 &&
          (closeIcon ?  <EDITmode/> : <SAVEmode/> )
          }
      </Box>
      {/* -------------[ 3. 사이트  ]------------*/}
      <div style={{width:'95%', height:'80%',paddingLeft:'3%', paddingTop:'4%'}}>
        <BuildSite/>
      </div>
       
    </>
  
  );
}


export default Dashboard;