import { createSlice } from '@reduxjs/toolkit';


const dashboardState = {
    openDrawer: false,  //drawer open
    openEditDrawer : false,
    deleteAlert: false,
    createAlert :false,
    editAlert:false,
    titleAlert : false,
    deleteDialog:false,
    success:false,
    selectedDashCodes:0
}

const counterSlice = createSlice({
    name: 'dashboardCRUD',
    initialState: dashboardState,
    reducers :{
        getopenDrawer(state,action){
            console.log("dashboardCRUD 리듀서 -  Drawer열기 : ",action.payload);
            state.openDrawer = action.payload;
        },
        getopenEditDrawer(state,action){
            console.log("dashboardCRUD 리듀서 -  편집 Drawer열기 : ",action.payload);
            state.openEditDrawer = action.payload;
        },
        //삭제 알림창
        getDeleteAlert(state,action){
            console.log("dashboardCRUD 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteAlert = action.payload;
        },
        
        getCreateAlert(state,action){
            console.log("dashboardCRUD 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.createAlert = action.payload;
        },
        getDeleteDialog(state,action){
            console.log("dashboardCRUD 리듀서 -  삭제 알림창 열기 : ",action.payload);
            state.deleteDialog = action.payload;
        },

        getEditDialog(state,action){
            console.log("User 리듀서 -  편집 알림창 열기 : ",action.payload);
            state.editAlert = action.payload;
        },
        getSuccess(state,action){
            state.success = action.payload;
        },
        getSelectedDashCodes(state,action){
            console.log("dashboardCRUD 리듀서 - selectedDashCodes  : ",action.payload);
            state.selectedDashCodes = action.payload;
        },
        getTitleAlert(state,action){
            console.log("dashboardCRUD 리듀서 - titleAlert  : ",action.payload);
            state.titleAlert = action.payload;
        },
        logout(state) {
            return initialState;
        },
    

    },
});

export const dashboardCRUDActions = counterSlice.actions;

export default counterSlice.reducer;