import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managingActions } from '../../../reducx/3dModeling/table';



const useFetchFacilityData = () => {
  const dispatch = useDispatch();
  const { siteNo } = useSelector((state) => state.authReducer);
  const { comName } = useSelector((state) => state.managingReducer);
  const [facilityList, setFacilityList] = useState([]);

  const SITE_TABLE_URL = `/site/dt-model/site/${siteNo}/site-dm.json`; // 시설 

  const facFetchData = useCallback(async () => {
    try {
      const response = await fetch(SITE_TABLE_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFacilityList(Array.isArray(data.facility) ? data.facility : []); // 데이터가 배열인지 확인하고 설정
      console.log("테이블 정보 :", data.facility);
    } catch (error) {
      console.error('Failed to fetch JSON:', error);
    }
  }, [SITE_TABLE_URL]);

  useEffect(() => {
    facFetchData();
  }, [facFetchData]);

  useEffect(() => {
    if (facilityList.length > 0) {
      dispatch(managingActions.getSelectedFac(facilityList[0].name));
      dispatch(managingActions.getComponentsList(facilityList[0])); // 컴포넌트 리스트   
      const seletedComTopic = `/dt/site/${siteNo}/facility/${facilityList[0].name}/${comName}`;
      dispatch(managingActions.getSelectedComTopic(seletedComTopic));
    }
  }, [facilityList, dispatch, siteNo]);

  return facilityList;
};

export default useFetchFacilityData;
