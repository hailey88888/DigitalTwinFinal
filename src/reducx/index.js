import { combineReducers,configureStore } from '@reduxjs/toolkit';

import dashboardReducer from './dashboard';
import authReducer from './auth';
import siteReducer from './site';
import homeReducer from './home';
import commonReducer from './common';
import userReducer from './user';
import dshcodeReducer from './dashboardCode'
import dashboardCRUDReducer from './dashboardCRUD';
import dashboardItemReducer from './dashboardItem';
import modelObjectReducer from './build3dModel';
import facilityReducer from './facility';
import facilityCodeReducer from './facilityCode';
import siteBuildingReducer from './3dModeling/siteBuilding';
import managingReducer from './3dModeling/table'
// const store = configureStore({
//     reducer:{ 
//               dashboardReducer : dashboardReducer,
//               authReducer : authReducer,
//               siteReducer : siteReducer,
//               homeReducer : homeReducer,
//               commonReducer : commonReducer,
//               userReducer : userReducer,
//               dshcodeReducer:dshcodeReducer,
//               dashboardCRUDReducer:dashboardCRUDReducer,
//               dashboardItemReducer:dashboardItemReducer,
//               modelObjectReducer:modelObjectReducer,
//               facilityReducer :facilityReducer,
//               facilityCodeReducer : facilityCodeReducer,
//               siteBuildingReducer:siteBuildingReducer,
//               managingReducer:managingReducer,

//      }
// });

// export default store;


const appReducer = combineReducers({
    dashboardReducer,
    authReducer,
    siteReducer,
    homeReducer,
    commonReducer,
    userReducer,
    dshcodeReducer,
    dashboardCRUDReducer,
    dashboardItemReducer,
    modelObjectReducer,
    facilityReducer,
    facilityCodeReducer,
    siteBuildingReducer,
    managingReducer,
  });
  
  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;