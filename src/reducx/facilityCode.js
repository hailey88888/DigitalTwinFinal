import { createSlice } from '@reduxjs/toolkit';

const facilityCodeState = {
    openDrawer: false,  //drawer open
    openEditDrawer : false,
    searchForm : false,
    deleteAlert: false,
    deleteDialog : false
}


const counterSlice = createSlice({
    name: 'facilityCode',
    initialState: facilityCodeState,
    reducers :{
        getopenDrawer(state,action){
            console.log("설비코드 리듀서 -  Drawer열기 : ",action.payload);
            state.openDrawer = action.payload;
        },
        getopenEditDrawer(state,action){
            console.log("설비코드 리듀서 -  편집 Drawer열기 : ",action.payload);
            state.openEditDrawer = action.payload;
        },
        getdataGridKey(state,action){
            console.log("설비코드 리듀서 -  Datagrid업데이트하기 : ",action.payload);
            state.dataGridKey = action.payload;
        },
        getCheckedBoxes(state,action){
            console.log("설비코드 리듀서 -  체크한 박스 배열  : ",action.payload);
            state.checkedBoxes = action.payload;
        },
        getupdateData(state,action){
            console.log("설비코드 리듀서 -  업데이트할 데이터 : ",action.payload);
            state.updateData = action.payload;
        },
      
        //삭제 알림창
        getDeleteAlert(state,action){
            console.log("설비코드 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteAlert = action.payload;
        },
   

        getUserDeleteDialog(state,action){
            console.log("설비코드 리듀서 -  삭제창 : ",action.payload);
            state.deleteDialog = action.payload;
        },

    

    },
});

export const facilityCodeActions = counterSlice.actions;

export default counterSlice.reducer;