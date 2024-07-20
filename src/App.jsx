// import { createContext,useEffect} from "react";
// export const ToggledContext = createContext(null);
// import { useSelector,useDispatch } from "react-redux";
// import Home from "./scenes/home/Home";
// import { authActions } from "./reducx/auth";
// import SignInClass from "./scenes/signin/SignInClass";
// import { useNavigate } from 'react-router-dom';

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const name = JSON.parse(JSON.stringify(localStorage.getItem('name'))) || undefined;
//   const auth = JSON.parse(JSON.stringify(localStorage.getItem('auth'))) || undefined;
//   const siteNum = JSON.parse(JSON.stringify(localStorage.getItem('siteNum'))) || undefined;
//   const siteName = JSON.parse(JSON.stringify(localStorage.getItem('siteName'))) || undefined;
//   const userId = JSON.parse(JSON.stringify(localStorage.getItem('userId'))) || undefined;


//   const {userName,role}= useSelector((state) => state.authReducer);
//   dispatch(authActions.getUserName(name));
//   dispatch(authActions.getAuthorization(auth));
//   dispatch(authActions.getSiteNumber(siteNum));
//   dispatch(authActions.getSiteName(siteName));
//   dispatch(authActions.getUserID(userId));


// //로그인후 -> Home으로 
//   useEffect(()=>{
//     if(name !== undefined){
//       navigate('/dashboard');
//     }
    
//   },[userName,role])


  

//   return (
//     <>
//     {/* <Home/> */}
//     {name === undefined
//      ? 
//      <SignInClass/>
//     //  <Signin/> 
//      : <Home/>
//      } 
//     </>
   
      
//   );
// }

// export default App;


import { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./reducx/auth";
import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// 동적 import
const Home = lazy(() => import("./scenes/home/Home"));
const SignInClass = lazy(() => import("./scenes/signin/SignInClass"));

export const ToggledContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = localStorage.getItem('name') || undefined;
  const auth = localStorage.getItem('auth') || undefined;
  const siteNum = localStorage.getItem('siteNum') || undefined;
  const siteName = localStorage.getItem('siteName') || undefined;
  const userId = localStorage.getItem('userId') || undefined;

  const { userName, role } = useSelector((state) => state.authReducer);
  
  useEffect(() => {
    dispatch(authActions.getUserName(name));
    dispatch(authActions.getAuthorization(auth));
    dispatch(authActions.getSiteNumber(siteNum));
    dispatch(authActions.getSiteName(siteName));
    dispatch(authActions.getUserID(userId));
  }, [dispatch, name, auth, siteNum, siteName, userId]);

  useEffect(() => {
    if (name !== undefined) {
      navigate('/dashboard');
      // navigate('/model');
    }
  }, [name, navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {name === undefined ? <SignInClass /> : <Home />}
    </Suspense>
  );
}

export default App;
