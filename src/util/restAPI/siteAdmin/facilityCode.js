import { QueryClient } from '@tanstack/react-query';
export const facilityCodeQueryClient = new QueryClient();


//시설 전체 조회
export async function getFacilityCodelists({siteNum,pageNum }) {
    console.log("사이트 번호 : ",siteNum);
    const URL = `/api/v0/site/${siteNum}/facilityCode/list?page=${pageNum}&size=10`
    console.log("URL 주소 : ",URL);
    const response = await fetch(URL)
    .catch(error => {
        console.error('Error:', error);
    });

    const { page } = await response.json();
    console.log(page);
    return page;
    
}


//시설 등록
export async function createFacilityCode({body,siteNum}) {
    const URL = `/api/v0/site/${siteNum}/facilityCode`;
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

//시설 편집
export async function editFacilityCode({siteNum,body}) {
    const URL = `/api/v0/site/${siteNum}/facilityCode`;
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
   
}


// 시설 삭제 
export async function deleteFacilityCode({siteNum,facCodeNum}) {
    const URL = `/api/v0/site/${siteNum}/facilityCode/${facCodeNum}`;
    await fetch(URL,{
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