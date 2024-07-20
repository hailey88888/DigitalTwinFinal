import { createSlice } from '@reduxjs/toolkit';

const dashboardState = {
    dataList : {},
    deleteBox : false,
    deleteBoxId : 0,
    closeIcon : false,
    // boxRefSize : {width:0, height:0},
    createdRndBoxes : [],
    lastBoxNumber : 0,

    //가로,세로 비율 데이터
    wr:0,
    hr:0,

    //윈도우 사이즈 변경
    windowSize : false,
    openTopCom : false,
    openDataDrawer:false,


    zoom:0,

    dashNo : 0,
};

const counterSlice = createSlice({
    name : 'dashboard',
    initialState : dashboardState,
    reducers : {
        getDataList(state,action){
            console.log("리듀서 내부 선택 데이터 목록 가져오기 : ",action.payload);
            state.dataList = action.payload
        },
        deleteRnDBox(state,action){
            console.log("리듀서 내부 Rnd box 삭제 : ",action.payload);
            state.deleteBox = action.payload
        },
        deleteRnDBoxID(state,action){
            console.log("리듀서 내부 박스 아이디 삭제  : ",action.payload);
            state.deleteBoxId = action.payload
        },
        closeIconSetting(state,action){
            console.log("리듀서 내부 closeIconSetting : ",action.payload);
            state.closeIcon = action.payload
        },
        getBoxRefSize(state,action){
            console.log("리듀서 내부 getBoxRefSize : ",action.payload);
            state.boxRefSize.width = action.payload.width
            state.boxRefSize.height = action.payload.height
        },
        getRndBoxes(state,action){
            console.log("리듀서 내부 getRndBoxes : ",action.payload);
            state.createdRndBoxes = action.payload
        },
        getLastBoxNumber(state,action){
            console.log("리듀서 내부 getLastBoxNumber : ",action.payload);
            state.lastBoxNumber = action.payload
        },
        //길이 비율 데이터
        getWHRatio(state,action){
            console.log("리듀서 내부 getWHRatio : ",action.payload);
            state.hr = action.payload.hp
            state.wr = action.payload.wp
        },

        //윈도우 사이즈 변경
        getWindowSize(state,action){
            console.log("리듀서 내부 getWindowSize : ",action.payload);
            state.windowSize = action.payload
        },

        //대시보드 화면상단 보이기
        getOpenTopCom(state,action){
            console.log("리듀서 내부 대시보드 화면 상단 보이기 : ",action.payload);
            state.openTopCom = action.payload
        },

        //데이터 Drawer 열고 닫기
        getOpenDataDrawer(state,action){
            console.log("리듀서 내부 대시보드 화면 상단 보이기 : ",action.payload);
            state.openDataDrawer = action.payload
        },

        getZoom(state,action){
            console.log("리듀서 내부 대시보드 zoom 데이터 보기 : ",action.payload);
            state.zoom = action.payload
        },

        getDashNo(state,action){
            console.log("리듀서 내부 대시보드코드 가져오기 : ",action.payload);
            state.dashNo = action.payload
        },
        
        logout(state) {
            return initialState;
        },

    }

});

export const dashboardActions = counterSlice.actions;
export default counterSlice.reducer;