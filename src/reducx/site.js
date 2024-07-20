
import { createSlice } from '@reduxjs/toolkit';

const siteState = {
   
    openDrawer: false,  //drawer open
    openEditDrawer : false,
    dataGridKey: 0, // DataGrid의 key번호
    checkedBoxes : [],
    updateData : {},
    searchForm : false,
    deleteAlert: false,
    

}

const counterSlice = createSlice({
    name: 'site',
    initialState: siteState,
    reducers :{
        getopenDrawer(state,action){
            console.log("Site 리듀서 -  Drawer열기 : ",action.payload);
            state.openDrawer = action.payload;
        },
        getopenEditDrawer(state,action){
            console.log("Site 리듀서 -  편집 Drawer열기 : ",action.payload);
            state.openEditDrawer = action.payload;
        },
        getdataGridKey(state,action){
            console.log("Site 리듀서 -  Datagrid업데이트하기 : ",action.payload);
            state.dataGridKey = action.payload;
        },
        getCheckedBoxes(state,action){
            console.log("Site 리듀서 -  체크한 박스 배열  : ",action.payload);
            state.checkedBoxes = action.payload;
        },
        getupdateData(state,action){
            console.log("Site 리듀서 -  업데이트할 데이터 : ",action.payload);
            state.updateData = action.payload;
        },
        getOpenSearchForm(state,action){
            console.log("Site 리듀서 -  검색창 열기 : ",action.payload);
            state.searchForm = action.payload;
        },
        //삭제 알림창
        getDeleteAlert(state,action){
            console.log("Site 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteAlert = action.payload;
        },

    

    },
});

export const siteActions = counterSlice.actions;

export default counterSlice.reducer;