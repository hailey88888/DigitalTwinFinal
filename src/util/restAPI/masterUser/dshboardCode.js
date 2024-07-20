import { QueryClient } from '@tanstack/react-query';
export const dshboardCodeQueryClient = new QueryClient();

const BASE_URL = 'http://localhost:8080'; 


//대시보드 코드 관리 기능


//대시보드 코드 전체 조회 
export async function getDshCodelists({ signal,page,site_id }) {
    const URL = `${BASE_URL}/HOME/site/${site_id}/dashboard-code?page=${page}&size=15`

    const response = await fetch(URL,{ signal }) ;
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
   
        const { dshcodeList, totalCount } = await response.json();
        console.log('API getList-URL : ',URL)
        console.log('API getList-totalPages',totalCount);
        console.log('API getList-content',dshcodeList);
    
        const content = { dshcodeList, totalCount } ;
    return content;

}


//대시보드 코드 추가
export async function createDshCode({body,sessionID}) {
    const URL = `${BASE_URL}/HOME/site/${site_id}/dashboard-code`
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                            'Cookie': sessionID  // 헤더에 토큰 추가
                        }
                        
                    });

                    if(response.ok){
                        return true;
                    }else {
                        const error = new Error('An error occurred while deleting the event');
                        error.code = response.status;
                        error.info = await response.json();
                        throw error;
                    }
   
}


//대시보드 코드 편집 
export async function editDshCode({body,sessionID}) {
    const URL = `${BASE_URL}/HOME/site/${site_id}/dashboard-code`
    console.log('API updateContents-URL : ',URL);
    console.log('API updateContents-body : ',body);

    const response = await fetch(URL,{
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                            'Cookie': sessionID  // 헤더에 토큰 추가
                        }
                    });
    if(response.ok){
        return true;
    }else {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    // return response.json();   
}


//대시보드 코드 삭제
export async function deleteDshCode({body,sessionID}) {
    const URL = `${BASE_URL}/HOME/site/${site_id}/dashboard-code`
    const response = await fetch(URL,{
                        method: 'DELETE',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                            'Cookie': sessionID  // 헤더에 토큰 추가
                        }
                    });

                    if (!response.ok) {
                        const error = new Error('An error occurred while deleting the event');
                        error.code = response.status;
                        error.info = await response.json();
                        throw error;
                      }
    console.log('API deleteID-URL : ',URL) 
    //return response.json();
   
}

