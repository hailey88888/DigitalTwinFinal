import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import {CookiesProvider} from 'react-cookie';
import { User } from "./scenes";
import Home from "./scenes/home/Home.jsx";
import Dashboard from "./scenes/dashboard/Dashboard.jsx";
import { Provider } from 'react-redux';
import store from "./reducx/index.js";
import Site from "./scenes/site/Site.jsx";
import combinedQueryClient from "./util/combinedQueryClient .js";
import DshBoardCode from "./scenes/dashboardcode/DshBoardCode.jsx";
import Facility from "./scenes/facility/Facility.jsx";
import Managing from "./scenes/modeling/Managing.jsx";
import FacilityCode from "./scenes/facilityCode/FacilityCode.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/model" element={<Managing />} />
      <Route pate="/home" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/site" element={<Site />} />
      <Route path="/user" element={<User />} />
      <Route path="/facility" element={<Facility />} />

      <Route path="/facilityCode" element={<FacilityCode />} />
      <Route path="/dashboardcode" element={<DshBoardCode />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={combinedQueryClient}>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </QueryClientProvider>
);
