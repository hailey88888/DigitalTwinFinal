
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery  } from '@tanstack/react-query';
import { getSitelists } from '../../util/restAPI/masterUser/site';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../reducx/common';

const Paging = () => {
  console.log('페이징 컴포넌트 컴포넌트')
  const dispatch = useDispatch();

    //전역 
        //1. 페이지 타이틀 
        const {pageTitle} = useSelector((state) => state.homeReducer);
    
        //2. 카운트 수, 전체 데이터
        const { totalCount,pageNumber,currentPage,numberOfPage } = useSelector((state) => state.commonReducer);
    

    //HTTP GET 요청 - 페이징
    const contentSize = 15;
    const count = Math.ceil(totalCount/contentSize);


    // 페이지 버튼 누르기 
    const handleChange = async(event, page) => {
        //const pagNum = page-1;
    //------ [현재 페이지 넘버를 전역으로 전달 ]-----------------
    dispatch(commonActions.getCurrentPage(page));
  
    //------ [페이지 넘버를 전역으로 전달 ]-----------------
    dispatch(commonActions.getPageNumber(page));
        
        
    };


    return(
     
            <Pagination 
                count={numberOfPage} // 전체 페이지 수 계산
                page={currentPage}
                onChange={handleChange}
                variant="outlined"
                sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'rgba(44, 56, 126, 0.5)',
                        // color: '#6798bf',
                        color:'white'
                    },
                }}
            />
        
    )
}

export default Paging;