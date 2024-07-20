import { useDispatch,useSelector } from 'react-redux';
import {Button,Typography} from "@mui/material";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import Select from '@mui/material/Select';
import { dashboardActions } from '../../reducx/dashboard';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddIcon from '@mui/icons-material/Add';
import { getDshboardList } from '../../util/restAPI/siteAdmin/dashboard';
import { useQuery } from "@tanstack/react-query";
import MenuItem from '@mui/material/MenuItem';
import { useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DashboardForm from '../form/dashboard/DashboardForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { dashboardCRUDActions } from '../../reducx/dashboardCRUD';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import DeleteDialog from '../dialogs/dashboard/DeleteDialog';
import SettingsIcon from '@mui/icons-material/Settings';
import {  TextField } from "@mui/material";
import { dshItemActions } from '../../reducx/dashboardItem';
import { editDshboard } from '../../util/restAPI/siteAdmin/dashboard';


const DashBoardHeader = () => {
    
    const dispatch = useDispatch();
    const {pageNumber} = useSelector((state) => state.commonReducer); // 테이블 데이터
    const {openDrawer,deleteDialog,deleteAlert,titleAlert,
            createAlert,success,editAlert ,selectedDashCodes} = useSelector((state) => state.dashboardCRUDReducer);
    const {closeIcon,dataList,openTopCom,dashNo } = useSelector((state) => state.dashboardReducer);
    const {userID,siteNo } = useSelector((state) => state.authReducer);
    const [errorAlert, setErrorAlert] = useState(false);
    const [newTitle, setNewTitle]= useState('');

    const [dashboardTitle, setDashboardTitle] = useState('');

//함수
//1. UI
   //1. Drawer 
   //---------------데이터 선택하기 Drawer 열고닫기 --------------------------
    const toggleDrawer = () => {
        dispatch(dashboardActions.getOpenDataDrawer(true));
    };
    

    //2. newTitle 지정하기
    //---------------대시보드 제목 수정하고 (handleEdit 완료 후) 리패치한 데이터로 newTitle 지정하기 --------------------------
    const setDashTitle = (content) => {
        const findMatchingDashboard = content.filter(item => item.dashboardNo === dashNo);
        let title;
        if (findMatchingDashboard.length > 0) {
             title = findMatchingDashboard[0].dashboardTitle;
             console.log("title : ",title);
            setDashboardTitle(title);
        } else {
            console.log('No matching dashboard found.');
        }
    }


    //3. 대시보드 삭제하시겠습니까 다이얼
    //---------------------- 삭제알림창열기 ---------------------------
    const openDeleteDialog = () => {
        if(selectedDashCodes===0){
            setErrorAlert(true);
            setTimeout(()=> {setErrorAlert(false)},2000);
        }else dispatch(dashboardCRUDActions.getDeleteDialog(true));
    }


    //4. 대시보드 Select 창 -> 선택하면 newTitle 바뀜 
    //---------------  대시보드 선택하기 --------------------------
     const handleChange = (event) => {
        console.log("event : ",event);
        dispatch(dashboardCRUDActions.getSelectedDashCodes(event.target.value));
        let title, dshCode;
        codeList.forEach(() => { 
            const filteredCodes = codeList.filter(item => item.dashboardNo === event.target.value);
            title = filteredCodes.map(item => item.dashboardTitle);
            dshCode = filteredCodes.map(item => item.dashboardNo);
        });
        setDashboardTitle(title);
        setNewTitle(title); // textField에 onChange로 state 바뀜
        dispatch(dashboardActions.getDashNo(dshCode[0]));
    };
    
    //5. 대시보드 생성할때 form 나오기 -> 제목만 입력
    //---------------  대시보드 생성 창 열기 --------------------------
    const handleOpen = () =>{
        dispatch(dashboardCRUDActions.getopenDrawer(true));
    }

    
    //6. 생성취소 누르면 다이얼 사라짐
    const handleCancel = () => {
        dispatch(dashboardCRUDActions.getopenDrawer(false));
    }



//2. HTTP
    //1. PUT 요청 - 대시보드 제목 수정하기
    //---------------[PUT] 데이터 선택하기 Drawer && RND 박스 Save--------------------------
    const handleEdit = async()  => {
        if (closeIcon && newTitle !==''){ 
                dispatch(dashboardCRUDActions.getopenDrawer(false));
                dispatch(dashboardActions.closeIconSetting(false));
                const requestBody = {
                    dashboardNo : dashNo,
                    dashboardTitle:newTitle
                }
                await editDshboard({ body: requestBody , siteNum: siteNo, userId:userID });
                dispatch(dashboardCRUDActions.getEditDialog(true));
          } else if(newTitle===''){
            if(newTitle==='')dispatch(dashboardCRUDActions.getTitleAlert(true));
            dispatch(dashboardActions.closeIconSetting(true));
          }else{
            dispatch(dashboardActions.closeIconSetting(true));

          }
      
    }

    //2. GET 요청 - 대시보드 리스트 가져오기 
    const { isLoading, isError, error, data, refetch, isFetching, isPreviousData } = useQuery({
        queryKey: ['getDshboardList', pageNumber,siteNo,userID],
        queryFn: ({ signal, queryKey }) => getDshboardList({
            ...queryKey[1],
            pageNum: pageNumber,
            siteNum: siteNo,
            userId: userID
        }),
        refetchOnWindowFocus: false,
    });

    const [codeList, setCodeList] = useState([]);

    useEffect(() => {
        if (data) {
            const { content } = data;
            setCodeList(content);
            console.log("codeList : ", content);
            if (content && content.length > 0) {
                // 대시보드 타이틀이 현재 상태와 다를 때만 업데이트
                // if (dashboardTitle !== content[0].dashboardTitle) {
                    console.log("content[0].dashboardTitle : ",content[0].dashboardTitle);
                    setDashboardTitle(content[0].dashboardTitle);
                    setNewTitle(content[0].dashboardTitle);
                    dispatch(dashboardActions.getDashNo(content[0].dashboardNo));
                // }
            }
        }

        return()=>{
            dispatch(dshItemActions.getItems(undefined));
            setDashboardTitle('');
            setCodeList([]);
        }
    }, [data]);
    console.log("dashboardTitle : ",dashboardTitle);
    

//3. UseEffect
    //1. 삭제완료 Alert -> 대시보드 삭제 
    useEffect(() => {
        console.log('삭제후 UseEffect 실행')
        if(deleteAlert){
            setTimeout(()=> {
                dispatch(dashboardCRUDActions.getSelectedDashCodes(0));
                dispatch(dashboardCRUDActions.getDeleteAlert(false));
                dispatch(dashboardCRUDActions.getSuccess(false));
                setDashboardTitle('');
                dispatch(dashboardActions.closeIconSetting(false));
                dispatch(dashboardActions.getDashNo(0));
            }, 1000); 
        } else {
        refetch();    
        }
    }, [deleteAlert]);


  //2. 편집완료 Alert -> 대시보드 저장하기 
    useEffect(() => {
    console.log('편집후 UseEffect 실행')
    if(editAlert){
        setTimeout(()=> {
            dispatch(dashboardCRUDActions.getEditDialog(false));
        }, 1000); 
    } else {
    refetch().then((response)=>{
        const { data } = response;
        const {content} = data;
        setDashTitle(content);
    })
    }
    }, [editAlert]);


    //3. 타이틀 Alert -> 대시보드 제목 입력 안했을때 
    useEffect(() => {
        console.log('titleAlert UseEffect 실행')
        if(titleAlert){
            setTimeout(()=> {
                dispatch(dashboardCRUDActions.getTitleAlert(false));
            }, 1000); 
        } 
    }, [titleAlert]);

        
    //4. 삭제 Dialog -> 삭제 완료창 
    useEffect(() => {
        console.log('삭제후 UseEffect 실행')
        if(!deleteDialog&success){
            dispatch(dashboardCRUDActions.getDeleteAlert(true));
        }
    }, [deleteDialog]);



    //5. 사이트 생성완료 Alert
    useEffect(() => {
        if(createAlert){
            setTimeout(()=> {
                dispatch(dashboardCRUDActions.getCreateAlert(false));
            }, 2000); 
        } else {
            refetch();    
            setDashboardTitle('');
        }
    }, [createAlert]);

    //6. 대시보드를 선택해주세요 Alert
    useEffect(()=>{

    },[errorAlert]);


    return (
        <>
        {/* -------------[ 1. 대시보드 타이틀 & 버튼 ]------------ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', 
            paddingRight:'30px', paddingBottom:'10px', paddingTop:'10px', paddingLeft:'10px',
            borderBottom: '1px solid #8f8c8c', 
            }}>

            {/* -------------대시보드 타이틀 */}
            {closeIcon
            ?
                <TextField 
                    id="userId"
                    variant="filled"
                    type="text"
                    label="대시보드 제목입력하세요"
                    onChange={(event) => setNewTitle(event.target.value)}
                    value={newTitle}
                    name="userId"
                    sx={{width:'300px'}}
                    required = {true}
                    
                />
            :
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize={24}
                    sx={{pt:'10px', pl:'10px'}}
                >
                {dashboardTitle}
                </Typography>
            }
            
            
            {/* -------------삭제완료 알림창 */}
            {deleteAlert &&
                <Alert 
                    sx={{ width: '300px' , mt:'5px'}} 
                    severity="success"
                    >
                    삭제완료
                </Alert> 
            }

            {createAlert &&
                <Alert 
                    sx={{ width: '300px' , mt:'5px'}} 
                    severity="success"
                    >
                    생성완료
                </Alert> 
            }
            

            {editAlert &&
              <Alert 
              sx={{ width: '300px' , mt:'5px'}} 
              severity="success"
              >
                편집완료
              </Alert>
            }

            {titleAlert&&
                <Alert 
                sx={{ width: '300px' , mt:'5px'}} 
                severity="error"
                >
                대시보드 제목을 입력해주세요
                </Alert>
            }
            
                <div style={{display: 'flex'}}>
                    {/* -------------대시보드 선택하기 Select */}
                    {(data && !openDrawer) && (
                            <div style={{ margin: 1, marginRight: '15px', marginTop: '10px' }}>
                                <Select
                                    sx={{ width: '200px', height: '37px' ,borderRadius:0,
                                    backgroundColor:'#1f1e1e', border:'1px solid #1f1e1e'}}
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={selectedDashCodes}
                                    onChange={handleChange}
                                >
                                    {codeList.map((item, index) => (
                                        <MenuItem key={index} value={item.dashboardNo}>
                                            {item.dashboardTitle}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errorAlert &&
                                    <p style={{color:'#E45B5B', paddingLeft:'30px'}}>대시보드를 선택해주세요</p>
                                } 
                            </div>
                        )
                    }
                    {/* -------------대시보드 생성 버튼 */}
                  
                    {openDrawer
                    ?  
                       <DashboardForm/>
                    :  
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleOpen}
                            style={{ marginTop:'10px' , backgroundColor:'#2c387e', borderRadius:2, height: '35px'}} 
                        >
                            <AddIcon sx={{ marginRight: '10px' }} />
                                대시보드 생성하기
                        </Button>
                    }
                   
                    {openDrawer
                    ?
                    // -------------대시보드 생성 취소 버튼
                    <Button
                        size="small"
                        type="submit"
                        style={{ color: '#6798bf' , borderRadius:0, fontWeight:'bold' }} 
                        onClick={handleCancel}
                    >
                        cancel
                    </Button>
                    :
                    // -------------대시보드 삭제 버튼 
                    <Button
                    type="submit"
                    style={{ marginTop:'10px' , backgroundColor:'#2E3235', borderRadius:0, height: '35px', 
                     marginLeft:'10px', paddingRight:'20px'}} 
                    onClick={openDeleteDialog}
                    >
                        <DeleteOutlineIcon 
                        sx={{fontSize:'23px',color:'#6798bf', '&:hover': {
                            cursor: 'pointer',
                            },
                            pl:'0px'
                            }}
                        />
                        <p style={{color:'white',paddingLeft:'10px'}}>삭제하기</p>
                    </Button>
                    }

            {closeIcon
            ? 
                (
                    <>
                    <Button
                        //size="small"
                        type="submit"
                        style={{ marginTop:'10px' , backgroundColor:'#2E3235', borderRadius:0, height: '35px', 
                        marginLeft:'10px', paddingRight:'20px', }} 
                        onClick={handleEdit}
                        >
                            <CreateNewFolderIcon
                                sx={{
                                    fontSize: '20px',
                                    color: '#6798bf',
                                    '&:hover': {cursor: 'pointer'},
                                    pl: '0px'
                                }}
                            />
                            <p style={{ color: 'white', paddingLeft: '10px' }}>저장하기</p>
                        </Button>
                    </>
                ) 
            : 
                (
                dashboardTitle !== '' && (
                    <>
                      <Button
                        //size="small"
                        type="submit"
                        style={{ marginTop:'10px' , backgroundColor:'#2E3235', borderRadius:0, height: '35px', 
                        marginLeft:'10px', paddingRight:'20px'}} 
                        onClick={handleEdit}
                      >
                        <SettingsIcon
                            sx={{
                                fontSize: '20px',
                                color: '#6798bf',
                                '&:hover': {cursor: 'pointer' },
                                pl: '0px'
                            }}
                        />
                        <p style={{ color: 'white', paddingLeft: '10px' }}>편집하기</p>
                    </Button>
                    </>
                )
                )
            }

                </div>
            </div>


        {/* -------------[ 2. 대시보드 화면 상단  ]------------ */}
        {openTopCom && 
            <div style={{ display: 'flex', justifyContent: 'space-between', 
                paddingRight:'30px',
                borderBottom: '1px dashed #8f8c8c',
                }}
            >
            <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* ---------[ 대쉬보드 수정하기 - 데이터 선택하기 버튼 ]-------------- */}
            <ControlPointDuplicateIcon
            type="submit"
            variant="text"
            onClick={toggleDrawer}
            sx={{
                color : '#6798bf',
                fontSize: '35px',
                marginLeft:'10px',
                marginRight: '20px',
                '&:hover': {
                    cursor: 'pointer',
                    color: '#7089c4',
                }
            }}
            />
            <h3 style={{ marginLeft: '-10px', color:'#6798bf', marginTop:'20px'}}>데이터 선택</h3>
            </div>
            {Object.keys(dataList).length > 0 && closeIcon && <h4>마우스 우클릭 하여 데이터를 선택하세요</h4>}

            </div>
            
        }


        {/* --------------- [삭제 알림창] ---------------------- */}
        {deleteDialog &&
        <Dialog open= {true}>
            <DeleteDialog selectedDashCodes = {selectedDashCodes}/>
        </Dialog> 
        }
        
        </>
    )
    

}



export default DashBoardHeader;
