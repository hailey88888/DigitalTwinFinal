/*

1. 사이트 정보
- 사이트 모델명 :model_name

2. 시설 정보
- 시설 모델명 : model_name
- 시설 JSON 데이터

3. 컴포넌트 정보
- 컴포넌트 모델명 : model_name
- 컴포넌트 이름 : name
- 컴포넌트 JSON 데이터 

4. GLB 파일들 
- 파트 GLB (from vender & site)
- 
5. 


*/

import { createSlice } from '@reduxjs/toolkit';

const modelState ={
    siteModelName : '',
    facModelName : '',
    comModelName : '',
    comName : '',
    // facJSON : [],
    // comJSON : [],
    partsGLB : [],

    wsTopic : '',

    numOfDataRetievals : 0,
}


const counterSlice = createSlice({
    name: '3dmodeling',
    initialState: modelState,
    reducers :{

        // ----------------------- 웹소켓 토픽 
        getWsTopic (state,action){
            console.log("웹소켓 토픽: ",action.payload);
            state.wsTopic = action.payload;
        },
        // ----------------------- 사이트 모델명 가져오기
        getSiteModelName (state,action){
            console.log("사이트 모델명 가져오기: ",action.payload);
            state.siteModelName = action.payload;
        },

        // ----------------------- 시설 모델명 가져오기
        getFacModelName(state,action){
            console.log("시설 모델명 가져오기 : ",action.payload);
            state.facModelName = action.payload;
        },

        // ----------------------- 시설 JSON 데이터 가져오기 
        getFacJSON(state,action){
            console.log("시설 JSON 데이터 가져오기  : ",action.payload);
            state.facJSON = action.payload;
        },

        // ----------------------- 컴포넌트 모델명 가져오기
        getComModelName(state,action){
            console.log("컴포넌트 모델명 가져오기 : ",action.payload);
            state.comModelName = action.payload;
        },

        // ----------------------- 컴포넌트 이름 가져오기
        getComName(state,action){
            console.log("컴포넌트 이름 가져오기 : ",action.payload);
            state.comName = action.payload;
        },

        // ----------------------- 컴포넌트 JSON 데이터 가져오기 
        getComJSON(state,action){
            console.log("컴포넌트 JSON 데이터 가져오기  : ",action.payload);
            state.comJSON = action.payload;
        },

        // ----------------------- 파트 GLB 가져오기
        getPartsGLB(state,action){
            console.log("파트 GLB 가져오기  : ",action.payload);
            state.partsGLB = action.payload;
        },


        // ----------------------- cur_value 적용 여부 (웹소켓 받아온 횟수)
        getNumOfDataRetievals(state,action){
            // console.log("웹소켓 데이터 받아온 횟수   : ",action.payload);
            state.numOfDataRetievals = action.payload;
        },
    }
})

export const siteBuildingActions = counterSlice.actions;

export default counterSlice.reducer;
