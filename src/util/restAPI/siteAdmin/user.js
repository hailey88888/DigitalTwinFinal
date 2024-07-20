import { QueryClient } from '@tanstack/react-query';
export const userQueryClient = new QueryClient();


//유저 전체 조회 
export async function getUserlists({siteNum,pageNum }) {
    console.log("사이트 번호 : ",siteNum);
    const URL = `/api/v1/site/${siteNum}/user/list?page=${pageNum}&size=10`
    console.log("URL 주소 : ",URL);
    const response = await fetch(URL)
    .catch(error => {
        console.error('Error:', error);
    });

    const { page } = await response.json();
    console.log(page);
    // const {content,totalElements,totalPages } = page;
    // const contents = { content, totalElements,totalPages,siteManager } ;
    
    return page;
    
}


//유저 추가
export async function createUser({body,siteNum}) {
    const URL = `/api/v2/site/${siteNum}/user`;
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    })
    const {code} = await response.json();
    return code;
                    
   
}


//유저 편집 
export async function editUser({body,siteNum}) {
    const URL = `/api/v2/site/${siteNum}/user`;
    console.log('API updateContents-URL : ',URL);
    console.log('API updateContents-body : ',body);

    const response = await fetch(URL,{
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                        //credentials: 'include'
                    })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
   
    // return response.json();   
}


//유저 삭제
export async function deleteUser({userId,siteNum}) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}`;
    const response = await fetch(URL,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    })
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
          
}

