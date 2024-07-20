import { QueryClient } from '@tanstack/react-query';
export const dashboardClient = new QueryClient();



//대시보드 리스트
export async function getDshboardList({siteNum,userId,pageNum }) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard/list?page=${pageNum}&size=10`
    const response = await fetch(URL)
    .catch(error => {
        console.error('Error:', error);
    });

    const data = await response.json();

     // page 객체를 추출
    const { page } = data;
    const {content,totalPages} = page;
  
    let dshcodeList = [];
    let dshTitleList =[];
    content.forEach(item => {
        dshcodeList.push({ dashCode: item.dashCode});
        dshTitleList.push({  dashTitle : item.dashTitle});
    });
    console.log("content : ",content);
    const contents = {content,totalPages};
    return contents;
    
}


//대시보드 생성
export async function createDshboard({siteNum,userId,body}) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard`;
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    })
    return await response.json();
                    
   
}

//대시보드 수정
export async function editDshboard({siteNum,userId,body}) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard`;
    console.log('API createContents-URL : ',URL) 
    console.log('API createContents-URL : ',body) 
    const response = await fetch(URL,{
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                    })
    return await response.json();
                    
   
}


//대시보드 삭제 
export async function deleteDshboard({siteNum,userId,dashCode}) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard/${dashCode}`;
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

