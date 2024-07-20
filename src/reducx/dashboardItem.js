import { createSlice } from '@reduxjs/toolkit';

const dshItemState = {
    dashboardItemNo : 0,
    deleteItemDialog : false,
    items:[],
    deleteBoxId : 0,

}


const counterSlice = createSlice({
    name: 'dshItem',
    initialState: dshItemState,
    reducers :{
        getdashboardItemNo(state,action){
            console.log("대시보드 아이템 리듀서 -  대시보드 아이템 번호 : ",action.payload);
            state.dashboardItemNo = action.payload;
        },
        getDeleteItemDialog(state,action){
            console.log("대시보드 아이템 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteItemDialog = action.payload;
        },
        getItems(state,action){
            // console.log("대시보드 아이템 리듀서 -  아이템 박스들 가져오기 : ",action.payload);
            state.items = action.payload;
        },
        getDeleteBoxId(state,action){
            console.log("대시보드 아이템 리듀서 -  삭제할 박스 아이디 가져오기 : ",action.payload);
            state.deleteBoxId = action.payload;
        },
        logout(state) {
            return initialState;
          },

    },
});

export const dshItemActions = counterSlice.actions;

export default counterSlice.reducer;