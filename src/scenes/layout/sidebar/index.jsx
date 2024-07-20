/* eslint-disable react/prop-types */
import {  Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import './sidebar.css';
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
  AddHome,ContactPage,Dashboard,PeopleAlt,CropFree
} from "@mui/icons-material";
import Item from "./Item";
import { ToggledContext } from "../../home/Home";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../reducx/common";
//import AddHomeIcon from '@mui/icons-material/AddHome';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
    //sidbar가 열린경우
    dispatch(commonActions.getSideBarOpen(collapsed)); // DataGrid 업데이트 하기

    const {role}= useSelector((state) => state.authReducer);


  return (
    <Sidebar
      id="Sidebar Component"
      // backgroundColor="#1f1e1e"
      // backgroundColor='rgba(77,171,245, 0.3)'
      // backgroundColor='rgba(44, 56, 126, 0.3)'

      backgroundColor='rgba(62, 69, 112, 0.3)'

      rootStyles={{
        border: 0,
        height: "80%",
        borderRadius: '22px', // 단위를 명확히 지정

        // marginRight:'10px'
      }}

      style={{ borderRadius: '22px', }}

      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >

  {/* 요소의 내용 */}

      {/* Hover */}
      <Menu
       id="Side bar Menu"
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            // margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // borderBottom: '1px solid #8f8c8c',
              // backgroundColor:'black'
            }}
          >
            {/* 사이드바 가리기 */}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>


      <Box 
      mb={5} 
      pl={collapsed ? undefined : "5%"}
      >
        {/* Home버튼 */}
        <Menu
        id="Side bar buttons"
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#2c387e",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {/* <Item
            title="Home"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          /> */}
        </Menu>
{/* ======================Dashboard==================== */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "운영" : " "}
        </Typography>{" "}

        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#2c387e",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
       {(role==='ROLE_SITE_MANAGER' || role==='ROLE_SITE_USER') &&
            <Item
            title="대시보드"
            path="/dashboard"
            colors={colors}
            icon={<Dashboard sx={{fontSize:'17px',color:'#6798bf'}}/>}
            />
          }

          
        {(role==='ROLE_SITE_MANAGER' || role==='ROLE_SITE_USER') &&
            <Item
            title="사이트 모니터링"
            path="/model"
            colors={colors}
            icon={<AddHome sx={{fontSize:'17px',color:'#6798bf'}} />}
          />
          }
        </Menu>

        <div 
        style={{width:'80%', height:'20px', 
                borderBottom:'1px solid gray', marginLeft:'5%'}}
        />

        {/* ======================Manage==================== */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "관리" : " "}
        </Typography>{" "}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#2c387e",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >

          {(role==='ROLE_SITE_MANAGER' || role==='ROLE_SITE_USER') &&
            <Item
            title="대시보드코드 관리"
            path="/dashboardcode"
            colors={colors}
            icon={
            <CropFree 
              sx={{fontSize:'17px',
                color:'#6798bf'
              }}
              />}
          />
          }


          {role==='ROLE_ADMIN' &&
            <Item
            title="Site"
            path="/site"
            colors={colors}
            icon={<ReceiptOutlined sx={{fontSize:'17px',color:'#6798bf'}}/>}
            />
          }

          {role==='ROLE_SITE_MANAGER' &&
            <Item
              title="설비 관리"
              path="/facility"
              colors={colors}
              icon={<WarehouseIcon sx={{fontSize:'17px',color:'#6798bf'}}/>}
            />
          }

          {role==='ROLE_SITE_MANAGER' &&
            <Item
              title="설비코드 관리"
              path="/facilityCode"
              colors={colors}
              icon={<ReceiptOutlined sx={{fontSize:'17px',color:'#6798bf'}}/>}
            />
          }

          {role==='ROLE_SITE_MANAGER' &&
            <Item
            title="사용자 관리"
            path="/user"
            colors={colors}
            icon={<PeopleAlt sx={{fontSize:'17px',color:'#6798bf'}}/>}
          />
          }
        </Menu>



  
      </Box>

    </Sidebar>
  );
};

export default SideBar;
