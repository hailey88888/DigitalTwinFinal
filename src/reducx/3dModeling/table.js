/*
1. 선택한 설비 facility
2. 선택한 com 
4. 선택된 com의 데이터
*/

import { createSlice } from '@reduxjs/toolkit';
import { Line3 } from 'three';
const managingState = {
    comTableData : {},
    totalCount : 0,
    sideBarOpen : false,
    dataGridKey : 0,

    selectedFac : '',
    seletecdComJson : '',

    componentsList :[],

    comName : '',

    webSocketData : [],
    wsAnimationData :[],

    comInstanceName :'',

    tableIndivComData : [],
    wsSocketData : [],

    syncData : [],

    wsComData :[],

    wsControlData :[],
    

    selectedComTopic : '',


    newWsTopic :'',


    childPosition : {},

}

const counterSlice = createSlice({

    name:'managing',
    initialState:managingState,
    reducers:{
        getWsComData(state,action){
            console.log("리듀서 : 필터링 된  데이터 : ",action.payload);
            state.wsComData = action.payload;
        },

        getComTableData(state,action){
            console.log("리듀서 : 컴포넌트 데이터 : ",action.payload);
            state.comTableData = action.payload;
        },
        getSeletecdComJSON(state,action){
            console.log("리듀서 : 선택한 컴포넌트 JSON 파일 : ",action.payload);
            state.seletecdComJson = action.payload;
        },
        getSelectedFac(state,action){
            console.log("리듀서 : 선택한 설비 : ",action.payload);
            state.selectedFac = action.payload;
        },
        getComponentsList(state,action){
            // console.log("리듀서 : 컴포넌트 리스트 componentsList : ",action.payload);
            state.componentsList = action.payload;
        },
        getComName(state,action){
            // console.log("리듀서 : 선택한 컴포넌트 이름 가져오기: ",action.payload);
            state.comName = action.payload;
        },
        getWebSocketData(state,action){
            // console.log("리듀서 : 해당 컴포넌트의 웹소켓 데이터: ",action.payload);
            state.webSocketData = action.payload;
        },
        getWSAnimationData(state,action){
            // console.log("리듀서 : 해당 컴포넌트의 웹소켓 애니메이션 데이터: ",action.payload);
            state.wsAnimationData = action.payload;
        },
        getComInstanceName(state,action){
            // console.log("리듀서 : 웹소켓 컴포넌트 이름: ",action.payload);
            state.comInstanceName = action.payload;
        },

        //1. 테이블에 표시될 데이터 : 선택된 컴포넌트만 보여주면 됨
        getTableIndivComData(state,action){
            // console.log("리듀서 : 테이블에 표시될 데이터(선택한 컴포넌트 한개만): ",action.payload);
            state.tableIndivComData = action.payload;
        },
        
        //2. 애니메이션에 적용될 데이터 : 모든 컴포넌트가 필요함
        getWsSocketData(state,action){
            // console.log("리듀서 : (#1 - 웹소켓 Data) 컴포넌트 데이터 : ",action.payload);
            state.wsSocketData = action.payload;
        },

        //3. 웹소켓 데이터를 받아오고 컴포넌트 선택을 할때마다 테이블 DataGrid 업데이트 하기
        getDataGridKey(state,action){
            // console.log("리듀서 : 웹소켓 데이터를 받아오고 컴포넌트 선택을 할때마다 테이블 DataGrid 업데이트 하기: ",action.payload);
            state.dataGridKey = action.payload;
        },

        //4. 컨트롤 데이터 
        getWsControlData(state,action){
            // console.log("리듀서 : (#2 - 웹소켓 Data) 컨트롤 데이터 : ",action.payload);
            state.wsControlData = action.payload;
        },

         //5. 선택된 컴포넌트 topic = 색상변경
         getSelectedComTopic(state,action){
            // console.log("리듀서 : 선택된 컴포넌트 topic (색상변경) : ",action.payload);
            state.selectedComTopic = action.payload;
        },

        //6. 현재 온 웹소켓 데이터 토픽
        getNewWsTopic(state,action){
            // console.log("리듀서 : 현재 온 웹소켓 데이터 토픽 : ",action.payload);
            state.newWsTopic = action.payload;
        },

        //7. 자식 위치 데이터
        getChildPosition(state,action){
            // console.log("리듀서 : 자식 위치 데이터 : ",action.payload);
            state.childPosition = action.payload;
        },

    }
})

export const managingActions = counterSlice.actions;

export default counterSlice.reducer;