import { createSlice } from '@reduxjs/toolkit';


const userState = {
    openDrawer: false,  //drawer open
    openEditDrawer : false,
    searchForm : false,
    deleteAlert: false,
    deleteDialog : false

}

const counterSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers :{
        getopenDrawer(state,action){
            console.log("User 리듀서 -  Drawer열기 : ",action.payload);
            state.openDrawer = action.payload;
        },
        getopenEditDrawer(state,action){
            console.log("User 리듀서 -  편집 Drawer열기 : ",action.payload);
            state.openEditDrawer = action.payload;
        },
        getdataGridKey(state,action){
            console.log("User 리듀서 -  Datagrid업데이트하기 : ",action.payload);
            state.dataGridKey = action.payload;
        },
        getCheckedBoxes(state,action){
            console.log("User 리듀서 -  체크한 박스 배열  : ",action.payload);
            state.checkedBoxes = action.payload;
        },
        getupdateData(state,action){
            console.log("User 리듀서 -  업데이트할 데이터 : ",action.payload);
            state.updateData = action.payload;
        },
        getOpenSearchForm(state,action){
            console.log("User 리듀서 -  검색창 열기 : ",action.payload);
            state.searchForm = action.payload;
        },
        //삭제 알림창
        getDeleteAlert(state,action){
            console.log("User 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteAlert = action.payload;
        },
        //사이트 매니저 내정보 관리
        getSiteManagerInfo(state,action){
            console.log("User 리듀서 -  사이트 관리자 정보 가져오기 : ",action.payload);
            state.siteManager = action.payload;
        },

        getUserDeleteDialog(state,action){
            console.log("User 리듀서 -  삭제창 : ",action.payload);
            state.deleteDialog = action.payload;
        },

    

    },
});

export const userActions = counterSlice.actions;

export default counterSlice.reducer;