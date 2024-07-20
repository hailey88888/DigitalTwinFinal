import { QueryClient } from '@tanstack/react-query';
export const siteQueryClient = new QueryClient();


//getSitelists - 사이트 전체 조회 
export async function getSitelists({pageNum}) {
    console.log('site HTTP GET Request')
    const URL = `/api/v1/site/list?page=${pageNum}&size=10`
    console.log('site HTTP GET Request-URL : ',URL)

    const response = await fetch(URL) ;

    console.log("response : ",response)



    //에러 정보 
    if (!response.ok) {
        const error = new Error('사이트 목록 조회 실패');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
   
    //response 데이터
        const { page } = await response.json();
        const {content,totalElements,totalPages } = page;
        console.log('API getList-URL : ',URL)
        console.log('API getList-totalPages',page);
        const contents = { content, totalElements,totalPages } ;
    return contents;

}


//create - 사이트 추가
export async function createSite({ body, file }) {
    const URL = '/api/v0/site';
    console.log('API createContents-URL : ', URL);
    console.log('API createContents-body : ', body);

    const formData = new FormData();
    formData.append('site', [JSON.stringify(body)]);
    if (file) {
        formData.append('logofile', file); // 이미지 파일 추가, 파일 이름 지정
    }

    const response = await fetch(URL, {
        method: 'POST',
        body: formData,
        // headers: {
        //     'Content-Type': 'application/json' 
        // },
        //credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

    if (!response.ok) {
        const error = new Error('An error occurred while creating the site');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    } else {
        console.log('사이트 생성 요청 완료');
    }

    return await response.json();
}


//update - 사이트 편집 
export async function editSites({body, file}) {
    const URL = '/api/v0/site';
    console.log('API updateContents-URL : ',URL);
    console.log('API updateContents-body : ',body);
    const formData = new FormData();
    formData.append('site', [JSON.stringify(body)]);
    if (file) {
        formData.append('logofile', file); // 이미지 파일 추가, 파일 이름 지정
    }
    const response = await fetch(URL,{
            method: 'PUT',
            body: formData,
            //credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

    return await response.json();
}


export async function deleteSite({siteNo}) {
    const URL = `/api/v1/site/${siteNo}`
    const response = await fetch(URL,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
                    
    console.log('API deleteID-URL : ',response) 
    //return response.json();
   
}
