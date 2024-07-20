import { Box, Button, TextField } from "@mui/material";
import { Formik,Form } from "formik";
import * as yup from "yup";
import { useSelector , useDispatch} from 'react-redux';
import Header from "../../Header";
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { useState } from 'react';
import { createDshboardCode,editDshboardCode } from "../../../util/restAPI/siteAdmin/dashboardCode";
import { dshcodeActions } from "../../../reducx/dashboardCode";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { trendG,barG } from "./dataType/dataType";
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
  import DialogContent from '@mui/material/DialogContent';


const DashboardCodeForm = () => {
    const dispatch = useDispatch();
    const {updateData}= useSelector((state) => state.commonReducer);
    const {siteNo} = useSelector((state) => state.authReducer);
    const [fail, setFail] = useState(false);
    const [selectedDataType, setSelectedDataType] = useState('');

//-----------------------[ Formik ]-----------------------------
//초기 데이터 
    const initialValues 
    =  {
        dashName : updateData ? updateData.dashboardCodeName :'',
        
        };


//유효성 검사 
    const checkoutSchema 
    = yup.object().shape({
        dashData : yup.string().required("required"),          
    });

//form 제출함수 => HTTP POST요청 하기 : 생성
const handleSubmit = async(values) => {
    console.log('생성 - POST 요청');
    console.log(values);
    const requestBody = {
        dashboardCodeNo:'',
        dashboardCodeName : values.dashName ,
        dashboardCodeData : 'dashboardData' ,
    };
    //HTTP POST Request
        try {
            // API 요청 보내기
            const code = await createDshboardCode({ body : requestBody,siteNum:siteNo});
            console.log("POST 결과 : ",code);
            if(code==='ERROR'){
                setFail(true);
            }else {
                dispatch(dshcodeActions.getopenDrawer(false));
                setFail(false);
            }
        } catch (error) {
            dispatch(dshcodeActions.getopenDrawer(false));
        }
}

//form 제출함수 => HTTP PUT요청 하기 : 편집
const handleEditSubmit = async(values) => {
    console.log('편집 - PUT요청');
    const requestBody = {
        dashboardCodeNo :  updateData.dashboardCodeNo ,
        dashboardCodeName : values.dashName ,
        dashboardCodeData : 'dashboardData' ,
       
    };

    //HTTP PUT Request
    try {
        // API 요청 보내기
        await editDshboardCode({ body : requestBody,siteNum:siteNo });
       dispatch(dshcodeActions.getopenEditDrawer(false));

    } catch (error) {
       dispatch(dshcodeActions.getopenEditDrawer(false));
    }
};


//데이터 타입
const dataType = ['Trend Graph', 'Bar Graph'];
const handleSelectDataType = (event) => {
    setSelectedDataType(event.target.value);

}

const renderGraphSettings = (graphData) => {
    return (
        <>
            <h1 style={{ gridColumn: "span 3", marginBottom: '-5px', borderBottom: '1px solid white', paddingBottom: '10px' }}>{selectedDataType} 설정 </h1>
            {graphData.map((item, index) => (
                <div style={{ gridColumn: "span 3" }} key={index}>
                    {Object.keys(item).map((key, i) => (
                        <div key={i}>
                            <h3 style={{ paddingBottom: '10px' }}>{key} 설정</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {item[key].map((subItem, subIndex) => (
                                    <div key={subIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                        <BallotIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                        <TextField
                                            fullWidth
                                            id={subItem}
                                            variant="filled"
                                            type="text"
                                            label={subItem}
                                            // onChange={handleChange}
                                            value={subItem}
                                            name={subItem}
                                            // error={touched.dashName && errors.dashName}
                                            // helperText={touched.dashName && errors.dashName}
                                        />
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};


    return (
        <Box  id="DialogBody"  sx={{pb:'30px'}}>
                <Formik
                    onSubmit={updateData ? handleEditSubmit : handleSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        handleEditSubmit,
                    }) => (
                    <Form>
                        {/* -----------------[ Header 부분 ]-------------------- */}
                        

                    {/* -----------------[ Form 부분  ]-------------------- */}
                                <Box
                                    display="grid"
                                    // gap="10px"
                                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                   
                                >
                                    
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(3, 1fr)" // 2열 구성
                                        sx={{
                                            width: "65vw",
                                            marginBottom: '10px',
                                        }}
                                    >
                                
                                    <>
                                        <h3 style={{ gridColumn: "span 3", marginBottom: '-5px' }}> 대시보드코드 이름 & 데이터 타입 선택 </h3>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                    <TextField 
                                                    fullWidth
                                                            id="dashName"
                                                            variant="filled"
                                                            type="text"
                                                            label="대시보드코드 이름"
                                                            onChange={handleChange}
                                                            value={values.dashName}
                                                            name="dashName"
                                                            error={touched.dashName && errors.dashName}
                                                            helperText={touched.dashName && errors.dashName}
                                                        />
                                        </div>

                                        {!updateData && (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <div style={{ margin: 1, marginRight: '15px', marginTop: '10px' }}>
                                                    <Select
                                                        sx={{ width: '250px', height: '55px', marginBottom: '10px' }}
                                                        labelId="demo-multiple-name-label"
                                                        id="demo-multiple-name"
                                                        value={selectedDataType}
                                                        onChange={handleSelectDataType}
                                                    >
                                                        {dataType.map((item, index) => (
                                                            <MenuItem key={index} value={item}>
                                                                {item}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        )}

                                        {updateData 
                                        ? (
                                            <>
                                            <h1 style={{ gridColumn: "span 3", marginBottom: '-5px', borderBottom: '1px solid white', paddingBottom: '10px' }}>{selectedDataType} 설정 </h1>
                                            {Array.isArray(updateData) ? (
                                                updateData.map((item, index) => (
                                                    <div style={{ gridColumn: "span 3" }} key={index}>
                                                        {Object.keys(item).map((key, i) => (
                                                            <div key={i}>
                                                                <h3 style={{ paddingBottom: '10px' }}>{key} 설정</h3>
                                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                                                    {item[key].map((subItem, subIndex) => (
                                                                        <div key={subIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <BallotIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                                                            <TextField
                                                                                fullWidth
                                                                                id={subItem}
                                                                                variant="filled"
                                                                                type="text"
                                                                                label={subItem}
                                                                                value={subItem}
                                                                                name={subItem}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>업데이트할 데이터가 없습니다.</p>
                                            )}
                                        </>
                                        ) : (
                                            <>
                                                {selectedDataType === 'Trend Graph' && renderGraphSettings(trendG)}
                                                {selectedDataType === 'Bar Graph' && renderGraphSettings(barG)}
                                            </>
                                        )}

                           
                                    </>
                                    </Box>
                                </Box>
                    </Form>
                )}
                </Formik>
        </Box>
    
    );

}

export default DashboardCodeForm;