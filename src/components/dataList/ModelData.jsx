import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const ModelData = () => {
    const {siteNo} = useSelector((state) => state.authReducer);

    return (
        <div style={{marginRight:'30px', height:'80%'}}>
            <div style={{height:'30px', width:'50%', backgroundColor:'#2E3235',paddingLeft:'10px', paddingTop:'3px', color:'#4A8ACA'}}>
                Site Modeling
            </div>
            <BuildSite/>
        </div>
    )
}

export default ModelData;