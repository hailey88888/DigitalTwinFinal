import {
  Box,
  IconButton,Button,
  useTheme,Typography
} from "@mui/material";
import logo from '../../../assets/images/skybluelogo.png';
import {
  PersonOutlined,
} from "@mui/icons-material";
import { useDispatch,useSelector } from 'react-redux';
import { Header } from "../../../components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { authActions } from "../../../reducx/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import { signOut } from "../../../util/restAPI/common/auth";
import { useNavigate } from "react-router";
import { homeActions } from "../../../reducx/home";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import MyInfo from "../../../components/form/user/MyInfo";
import BootstrapDialog from "../../css/BootstrapDialog";
import { dashboardActions } from "../../../reducx/dashboard";
import { useEffect } from "react";
import { dshItemActions } from "../../../reducx/dashboardItem";
import { dashboardCRUDActions } from "../../../reducx/dashboardCRUD";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //----------------[ 내정보관리 닫기 ]--------------
   const handleClose = () => {
    setOpen(false);
   }

   const handleOpen = () =>{
    setOpen(true);
   }
  
  //----------------[ 이미지 경로 ] ---------


  //----------------[ 페이지 타이틀] ---------
  const {pageTitle} = useSelector((state) => state.homeReducer);

  //----------------[ 유저 네임, 권한 ] ---------
  const {userName,role,siteNo,siteNam} = useSelector((state) => state.authReducer);
  console.log('userName & Role :',userName,' ', role);


  //----------------[ 로그아웃 ] ---------
  const logOut = async() => {
    localStorage.removeItem('name'); 
    localStorage.removeItem('auth'); 
    localStorage.removeItem('siteNum'); 
    localStorage.removeItem('siteName'); 
    localStorage.removeItem('userId'); 
    window.location.replace('/');
  }

  //----------------[ 이미지 크기 데이터 JSON 데이터 가져오기 ] ---------
  const LOGO_DATA_URL = `/site/site/${siteNo}/logo/logo.json`
  const [logoRatio, setLogoRatio] = useState(0);
  const [width, setWidth] = useState('');

  const comFetchData = async () => {
    try {
      const response = await fetch(LOGO_DATA_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("로고 이미지 데이터 :", data);
      const ratioData = data.width / data.height;
      setLogoRatio(Math.ceil(ratioData));
      setWidth( `${Math.ceil(ratioData) * 35}px`);
  
    } catch (error) {
      // console.error('Failed to fetch JSON:', error);
    }
  };
  
  // console.log("로고 비율 데이터 :", logoRatio);
  // console.log("로고 가로길이 : ",width );


  useEffect(()=>{
    comFetchData();
  },[LOGO_DATA_URL])


  return (
    <>
        <Box
        id="1"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        sx={{ height: '90px', 
          backgroundColor :'black'
           //backgroundColor:'rgba( 10,20,51, 0.5)', 
        // backgroundColor:'rgba(41, 172, 137, 0.1)'
        }}
    >
            {/* 로고 */}
            <Box
                id="3"
                display="flex"
                alignItems="center"
                gap="12px"
                // sx={{ transition: ".3s ease" }}
            >
                {role==='ROLE_ADMIN' 
                ?
                <img
                    style={{ width: "35px", height: "35px", borderRadius: "8px", marginTop:'5px' }}
                    src={logo}
                    alt="logo"
                />
                :
                <img  
                    style={{ width: width, height: "40px", borderRadius: "8px", marginTop:'5px' }}
                    src={`/site/site/${siteNo}/logo/logo.png`}
                />          
                //높이는 35로 고정 
                //가로길이는 (원본가로/원본세로) * 35
                }
            
                
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textTransform="capitalize"
                    // color="#4cc2f5"
                    //{ colors.greenAccent[500] : 연두색}
                    fontSize={20}
                >
                    {role==='ROLE_ADMIN' 
                    ? <h2>Digital Twin</h2>
                    : <h2 style={{color:'#2196f3'}}>{siteNam}</h2>
                    }
                
                </Typography>
                {/* 페이지 타이틀 */}
                {pageTitle && (
                    <>
                        <ArrowForwardIosIcon />
                        <h3 style={{
                            //color:'#46CEC5', 
                            paddingTop:'5px'}}>
                                {pageTitle}</h3>
                        {/* <Header title={pageTitle} /> */}
                    </>
                )}
            </Box>    

            {/* 다크모드, 알림, 설정, 프로필 아이콘 */}
            <Box display="flex">
                
                    <div style={{ paddingTop: '6px', display: 'flex', alignItems: 'center' }}>
                        
                    {/*--------------- 내정보관리 버튼--------------- */}
                        {role==='ROLE_SITE_MANAGER' || role ==='ROLE_SITE_USER' ?
                        <>  
                        <IconButton>
                            <ManageAccountsIcon 
                                type="submit"
                                onClick={handleOpen}
                                style={{fontSize: '23px' ,
                                        // color:'#307963'
                                        color:'#2c387e',
                                        }}/>
                        </IconButton> 
                        </>
                        :
                        <PersonOutlined 
                            sx={{ fontSize: '25px' ,
                                //background: 'linear-gradient(to right, blue, indigo)',
                                color: 'linear-gradient(to right, blue, indigo)',
                                marginBottom :'3px', 
                                marginRight:'6px'}} />
                        
                        }
                    {/*--------------- 이름 --------------- */}
                        <span style={{ marginRight: '8px', paddingTop:'2px' }}>{userName + ' '}</span>
                    {/*--------------- 권한 --------------- */}
                        <Chip label={role} size="small" 
                            style={{ marginLeft: '5px',marginBottom :'3px',
                                    background: 'linear-gradient(to right, #2196f3, gray)',
                                    // backgroundColor: 'rgba(0, 0, 255, 0.5)',
                                    //backgroundColor:'#46AECE',
                                    color: 'white' 
                            }} 
                        />
                        
                    </div>   


                    <div style={{paddingTop:'5px',display: 'flex', marginLeft:'25px'}}>
                    <IconButton>
                        <LogoutIcon 
                            onClick={logOut}
                            sx={{ fontSize:'25px',  marginBottom :'2px'}}/>
                    </IconButton>   
                    </div>
            </Box>
        </Box>


        {/* --------------- [내정보관리 Modal] ---------------------- */}
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
        >
         
            <MyInfo />
        </Dialog>
            
      
    </>
  );
};

export default Navbar;
