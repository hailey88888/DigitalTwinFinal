import { createSlice } from '@reduxjs/toolkit';


const dshcodeState = {
    openDrawer: false,  //drawer open
    openEditDrawer : false,
    deleteAlert: false,
    dashCode : 0,
    deleteDialog : false,
}


const counterSlice = createSlice({
    name: 'dshcode',
    initialState: dshcodeState,
    reducers :{
        getopenDrawer(state,action){
            console.log("대시보드 코드 리듀서 -  Drawer열기 : ",action.payload);
            state.openDrawer = action.payload;
        },
        getopenEditDrawer(state,action){
            console.log("대시보드 코드 리듀서 -  편집 Drawer열기 : ",action.payload);
            state.openEditDrawer = action.payload;
        },
        //삭제 알림창
        getDeleteAlert(state,action){
            console.log("대시보드 코드 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteAlert = action.payload;
        },
        getDashCode(state,action){
            console.log("대시보드 코드 리듀서 -  대시보드 코드  : ",action.payload);
            state.dashCode = action.payload;
        },

        getDshCodeDeleteDialog(state,action){
            console.log("대시보드 코드 리듀서 -  삭제창 : ",action.payload);
            state.deleteDialog = action.payload;
        },



    

    },
});

export const dshcodeActions = counterSlice.actions;

export default counterSlice.reducer;