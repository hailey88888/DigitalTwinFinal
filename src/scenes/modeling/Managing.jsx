import Table from "../../components/managing/Table";
import { Box} from "@mui/material";
import Select from '@mui/material/Select';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { managingActions } from "../../reducx/3dModeling/table";
import MenuItem from '@mui/material/MenuItem';
import { homeActions } from '../../reducx/home';
import useFetchFacilityData from "../../scenes/modeling/customHook/useFetchFacilityData";
import Site from "./Site";

const Managing = () =>{
    const [facName, setfacName] = useState('');
    const {siteNo} = useSelector((state) => state.authReducer);
    const {selectedFac,comName,wsSocketData} = useSelector((state) => state.managingReducer);
    const dispatch = useDispatch();
    const facilityList = useFetchFacilityData();

    
// -------------------[ home의 페이지 타이틀 ]-------------------
useEffect(()=>{
    dispatch(homeActions.getPageTitle('사이트 모니터링'));
},[]);

//-------------------------------- JSON 연결해서 테이블 구조 --------------------------------
    //1. 시설 선택하기 => select에서
    const handleChange = (event) =>{
       // setfacName(event.target.value);
        const comData = facilityList.find(facility => facility.name === event.target.value);
        dispatch(managingActions.getComponentsList(comData));   //컴포넌트 리스트   
        dispatch(managingActions.getSelectedFac(event.target.value));   //선택한 설비

        const seletedComTopic = `/dt/site/${siteNo}/facility/${event.target.value}/${comName}`;
        console.log("seletedComTopic : ",seletedComTopic);
        dispatch(managingActions.getSelectedComTopic(seletedComTopic));
    }



      
    return(
        <Box id="Manging entire body"
        sx={{ backgroundColor: 'black', 
            height:'100%',
            width:'93%',
            paddingLeft:'20px',
            marginLeft:'20px',
            
        }}>
            {/* -------------- 0. 헤더 -------------- */}
            
               <div style={{ 
                            paddingRight:'30px',
                            // borderBottom: '1px solid #8f8c8c',
                            borderRadius: '22px',
                            // border:'1px solid rgba(77,171,245,0.5)',
                            height:'27%',
                            // paddingTop :'15px',
                            paddingLeft:'10px'
                            }}
                >
                    <div style={{display: 'flex', 
                            justifyContent: 'space-between', }}>
                        {/* -------------- 선택한 시설 이름 뜨기 -------------- */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 style={{ // color:'#6798bf',
                                marginLeft:'15px' }}> 설비 : </h2>
                            <h2 
                                style={{paddingLeft:'10px', 
                                // color:'#6798bf'
                            }}>  {selectedFac}</h2>
                        </div>

                        {/* -------------- 시설 선택 select --------------*/}
                        <div style={{ display: 'flex', alignItems: 'center', marginRight:'20px' }}>
                            <Select
                                sx={{ 
                                    width: '200px', 
                                    height: '37px', 
                                    borderRadius: 0, 
                                    backgroundColor: '#1f1e1e', 
                                    border: '1px solid #1f1e1e' 
                                    // color:'primary'
                                }}
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={facName}
                                onChange={handleChange}
                            >
                            {facilityList && facilityList.length > 0 ? (
                                facilityList.map((item, index) => (
                                <MenuItem key={index} value={item.name}>
                                    {item.name}
                                </MenuItem>
                                ))
                            ) : (
                                <p>시설 목록을 가져오는 중...</p>
                            )}
                        </Select>
                    </div>
                    </div>
                    {/* -------------- 1. Table -------------- */}
                    <Table/>
                </div>

            {/* -------------- 2. 3d Modeling -------------- */}
            <div style={{height:'80%',paddingTop:'5%'}}>
                <Site/>
            </div>
                
        </Box>
    );
}

export default Managing;
