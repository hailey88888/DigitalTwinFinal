import { createSlice } from '@reduxjs/toolkit';

const authState = {
    userName : '',
    role : "",
    siteNo : 0,
    siteNam : "",
    userID : "",
}



const counterSlice = createSlice({
    name : 'auth',
    initialState : authState,
    reducers : {
        getUserName(state,action){
            console.log("auth 리듀서 | 유저이름 가져오기 : ",action.payload);
            state.userName =  action.payload;
        },
        getAuthorization(state,action){
            console.log("auth 리듀서 | 권한 : ",action.payload);
            state.role =  action.payload;
        },
        getSiteNumber(state,action){
            console.log("auth 리듀서 | 사이트 번호 : ",action.payload);
            state.siteNo =  action.payload;
        },
        getSiteName(state,action){
            console.log("auth 리듀서 | 사이트 이름 : ",action.payload);
            state.siteNam =  action.payload;
        },
        getUserID(state,action){
            console.log("auth 리듀서 | 유저 아이디 이름 : ",action.payload);
            state.userID =  action.payload;
        },
        
        logout(state) {
            return initialState;
        },

    }
});

export const authActions = counterSlice.actions;
export default counterSlice.reducer;