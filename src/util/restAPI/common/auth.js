
import { QueryClient } from '@tanstack/react-query';
export const authQueryClient = new QueryClient();


//로그인 기능 
export async function signIn({userID}) {
    
    const URL = `/api/v1/user/${userID}/login`;
    console.log(URL);


    const response = await fetch(URL);

    if (!response.ok) {
        const error = new Error('로그인 실패');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    //username 추출
    const data = await response.json();
    console.log("data : ",data);
    const { userName, auth ,userPw,site,userId} = data;
    const {siteNo,siteName} = site;

    const name = userName;

 //   return { name, auth, userPw, siteNo, siteName, data ,userId};
 return {name,auth, userPw, siteNo, siteName, data, userId};
}


//로그아웃 기능
export async function signOut() {
    const URL = '/api/logout';

    const response 
    = await fetch(URL,{ credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}