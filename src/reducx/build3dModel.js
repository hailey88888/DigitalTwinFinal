import { createSlice } from '@reduxjs/toolkit';

const modelState ={
    modelObjects : [],
    siteData :{},
    //facilityData :{}
    glbFiles : {}
}


const counterSlice = createSlice({
    name: '3dmodeling',
    initialState: modelState,
    reducers :{
        //GLB 파일을 가져오기
        getModelObjects(state,action){
            console.log("GLB 파일들 : ",action.payload);
            state.modelObjects = action.payload;
        },
        //Site 파일을 가져오기
        getSiteJsonFile(state,action){
            console.log("사이트 Json 파일들 : ",action.payload);
            state.siteData = action.payload;
        },

        //Facility 파일 가져오기
        getFacilityJsonFile(state,action){
            console.log("시설 Json 파일들 : ",action.payload);
            state.facilityData = action.payload;
        },

        //3D 파일 
        get3dGLB(state,action){
            console.log("시설 glbFiles 파일들 : ",action.payload);
            state.glbFiles = action.payload;
        },
    }
})

export const modelObjectActions = counterSlice.actions;

export default counterSlice.reducer;