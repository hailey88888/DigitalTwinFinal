import { createSlice } from '@reduxjs/toolkit';

const homeState = {
   
    pageTitle : '',

}


const counterSlice = createSlice({
    name: 'home',
    initialState: homeState,
    reducers :{
        getPageTitle(state,action){
            console.log("home 리듀서 -  페이지 타이틀  : ",action.payload);
            state.pageTitle = action.payload;
        },

    },
});



export const homeActions = counterSlice.actions;

export default counterSlice.reducer;