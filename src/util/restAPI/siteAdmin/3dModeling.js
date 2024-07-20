import { QueryClient } from '@tanstack/react-query';
import { json, response } from 'express';
export const modelingClient = new QueryClient();


//JSON 파일 불러오기 - 사이트 
export async function getSiteJsonFile({siteNum,userId,pageNum }) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard/list?page=${pageNum}&size=10`
    await fetch(URL,
                {headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                           }
                }
            )
            .then((response)=>response.json())
            .then((json)=>{
                console.log('불러온 JSON Site 데이터:', JSON.parse(json));
                //return json;
             })        
            .catch(error => {
                console.error('Error:', error);
             });

}


//JSON 파일 불러오기 - 시설
export async function getFacilityJsonFile({siteNum,userId,pageNum }) {
    const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard/list?page=${pageNum}&size=10`
    const response 
        = await fetch(URL,
                {headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            }
                }
            )
        .then((response)=>response.json())
        .then((json)=>{
            console.log('불러온 JSON 시설 데이터:', JSON.parse(json));            
            //return json;
        })        
        .catch(error => {
            console.error('Error:', error);
        });

}
// export async function createDshboard({siteNum,userId,body}) {
//     const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard`;
//     console.log('API createContents-URL : ',URL) 
//     console.log('API createContents-URL : ',body) 
//     const response = await fetch(URL,{
//                         method: 'POST',
//                         body: JSON.stringify(body),
//                         headers: {
//                             'Content-Type': 'application/json' 
//                         },
//                     })
//     return await response.json();
                    
   
// }

// export async function editDshboard({siteNum,userId,body}) {
//     const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard`;
//     console.log('API createContents-URL : ',URL) 
//     console.log('API createContents-URL : ',body) 
//     const response = await fetch(URL,{
//                         method: 'PUT',
//                         body: JSON.stringify(body),
//                         headers: {
//                             'Content-Type': 'application/json' 
//                         },
//                     })
//     return await response.json();
                    
   
// }


// export async function deleteDshboard({siteNum,userId,dashCode}) {
//     const URL = `/api/v1/site/${siteNum}/user/${userId}/dashboard/${dashCode}`;
//     const response = await fetch(URL,{
//                         method: 'DELETE',
//                         headers: {
//                             'Content-Type': 'application/json' 
//                         },
//                     })
//                     .then(data => {
//                         console.log('Success:', data);
//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                     });
          
// }

