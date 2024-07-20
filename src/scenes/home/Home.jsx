import { Box, CssBaseline, ThemeProvider,useMediaQuery } from "@mui/material";
import { ColorModeContext,useMode } from "../../theme";
import Navbar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
export const ToggledContext = createContext(null);
import { homeActions } from "../../reducx/home";
import { useDispatch,useSelector } from 'react-redux';



function Home() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };
  const dispatch = useDispatch();

//-------------------[ home의 페이지 타이틀 ]-------------------
  // dispatch(homeActions.getPageTitle(undefined));


  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToggledContext.Provider value={values}>
            {/* 홈페이지 상단 */}
            <Navbar />
            <Box id="home" 
              sx={{ 
                backgroundColor:'black',
                display: "flex", 
              height: "100vh", 
              maxWidth: "100%",
             }}>
            
              {/* 사이드바 */}
              <SideBar /> 
              <Box
                id="Side bar 밑"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  maxWidth: "100%",
                }}
              >
                
                <Box 
                id="페이지 컴포넌트"
                sx={{ overflowY: "auto", flex: 1, maxWidth: "100%"}}>
                  <Outlet />
                </Box>
              </Box>
                
            
              
            </Box>
          </ToggledContext.Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default Home;
