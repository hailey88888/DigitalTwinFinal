import { QueryClient } from '@tanstack/react-query';
export const dashboardItemClient = new QueryClient();

//대시보드 아이템 리스트
export async function getDshboardItem({pageNum,siteNum,userId,dashNo }) {
    const URL = `/api/v0/site/${siteNum}/user/${userId}/dashboard/${dashNo}/dashboardItem/list?page=${pageNum}&size=10`

    const response = await fetch(URL)
    .catch(error => {
        console.error('Error:', error);
    });

    const data = await response.json();

    // console.log("대시보드 아이템 받아오기 : ",data);

  
     // page 객체를 추출
    const { page } = data;
    const {content,totalPages} = page;
 
    
    // console.log("content : ",content);
    const contents = {content,totalPages};
    return contents;
    
}

//대시보드 아이템 생성
export async function createDshboardItem({siteNum,body,dashNo,userId}) {
    const URL = `/api/v0/site/${siteNum}/user/${userId}/dashboard/${dashNo}/dashboardItem`
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    });
    return await response.json();
                    
}



//대시보드 아이템 수정
export async function editDshboardItem({body,siteNum,userId,dashCode}) {
    const URL = `/api/v0/site/${siteNum}/user/${userId}/dashboard/${dashCode}/dashboardItem`
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    })
    // const {code} = await response.json();
    console.log("await response.json() : ",await response.json());
    // return code;
                    
}



//대시보드 아이템 삭제
export async function deleteDshboardItem({dashCode,userId,siteNum,dashItem}) {
    const URL = `/api/v0/site/${siteNum}/user/${userId}/dashboard/${dashCode}/dashboardItem/${dashItem}`
    console.log("삭제 실행");
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