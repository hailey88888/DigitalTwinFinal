import { createSlice } from '@reduxjs/toolkit';

const commonState = {
    //테이블 관련 데이터
    tableData : {},
    totalCount : 0,
    //sidebar 열기
    sideBarOpen : false,
    //업데이트할 데이터 열기
    updateData : [],
    pageNumber : 1,
    currentPage : 1,
    numberOfPage : 0,
    dataGridKey : 0,
    checkedBoxes : [],


}

const counterSlice = createSlice({
    name: 'common',
    initialState: commonState,
    reducers :{
       //Table Data 받아옴
        getTableData(state,action){
            // console.log("Common 리듀서 -  Table Data 받아오기 : ",action.payload);
            state.tableData = action.payload;
        },
        //Total Count 받아옴
        getTotalCount(state,action){
            console.log("Common 리듀서 -  Total Count 받아오기 : ",action.payload);
            state.totalCount = action.payload;
        },
        getNumberOfPages(state,action){
            console.log("Common 리듀서 -  페이지 개수 받아오기 : ",action.payload);
            state.numberOfPage = action.payload;
        },
        //sidebar열기
        getSideBarOpen(state,action){
            console.log("Common 리듀서 -  sideBarOpen 받아오기 : ",action.payload);
            state.sideBarOpen = action.payload;
        },
        //Table Update 받아옴
        getUpdateData(state,action){
            console.log("Common 리듀서 -  업데이트할 데이터 받아오기 : ",action.payload);
            state.updateData = action.payload;
        },
        //Paging page number
        getPageNumber(state,action){
            console.log("Common 리듀서 -  페이지 넘버 받아오기 : ",action.payload);
            state.pageNumber = action.payload;
        },
        getCurrentPage(state,action){
            console.log("Common 리듀서 -  현재 페이지 넘버 받아오기 : ",action.payload);
            state.currentPage = action.payload;
        },
        getdataGridKey(state,action){
            console.log("Common 리듀서 -  Datagrid업데이트하기 : ",action.payload);
            state.dataGridKey = action.payload;
        },
        //체크박스
        getCheckedBoxes(state,action){
            console.log("Common 리듀서 -  체크한 박스 배열  : ",action.payload);
            state.checkedBoxes = action.payload;
        },

    },
});



export const commonActions = counterSlice.actions;

export default counterSlice.reducer;