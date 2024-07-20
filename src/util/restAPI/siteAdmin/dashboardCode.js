import { QueryClient } from '@tanstack/react-query';
export const dashboardCodeClient = new QueryClient();

//대시보드코드 리스트
export async function getDshboardCodeList({pageNum,siteNum }) {
    const URL = `/api/v1/site/${siteNum}/dashboardCode/list?page=${pageNum}&size=10`

    const response = await fetch(URL)
    .catch(error => {
        console.error('Error:', error);
    });

    const data = await response.json();

     // page 객체를 추출
    const { page } = data;
    const {content,totalPages} = page;
  
    content.forEach(item => {
        delete item.site;
        delete item.dashData;
      });
    
    console.log("content : ",content);
    const contents = {content,totalPages};
    return contents;
    
}

//대시보드 생성
export async function createDshboardCode({body,siteNum}) {
    const URL =`/api/v1/site/${siteNum}/dashboardCode`
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


//대시보드 수정
export async function editDshboardCode({body,siteNum}) {
    const URL =`/api/v1/site/${siteNum}/dashboardCode`
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



//대시보드코드 삭제
export async function deleteDshboardCode({dashCode,siteNum}) {
    const URL =`/api/v1/site/${siteNum}/dashboardCode/${dashCode}`
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