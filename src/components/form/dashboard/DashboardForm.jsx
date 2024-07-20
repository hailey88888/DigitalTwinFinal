import { Box, Button, TextField } from "@mui/material";
import { Formik,Form } from "formik";
import * as yup from "yup";
import { useSelector , useDispatch} from 'react-redux';
import Header from "../../Header";
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { useState } from 'react';
import { createDshboard } from "../../../util/restAPI/siteAdmin/dashboard";
import { dashboardCRUDActions } from "../../../reducx/dashboardCRUD";


const DashboardForm = () => {
    const dispatch = useDispatch();
    const {userID,siteNo}= useSelector((state) => state.authReducer);

//-----------------------[ Formik ]-----------------------------
 //초기 데이터 
 const initialValues =  {
    dashTitle : '',
    };

//유효성 검사 
 const checkoutSchema = yup.object().shape({
   dashTitle:  yup.string().required("required"),     
   });   



//form 제출함수 => HTTP POST요청 하기 : 생성
    const handleSubmit = async(values) => {
        console.log('생성 - POST 요청');
        console.log(values);
        const requestBody = {
            dashboardNo :  '',
            dashboardTitle : values.dashTitle ,
            
        };
        //HTTP POST Request
            try {
                // API 요청 보내기
                const code = await createDshboard({ siteNum :siteNo , userId:userID ,  body : requestBody});
                console.log("POST 결과 : ",code);
                dispatch(dashboardCRUDActions.getopenDrawer(false));
                dispatch(dashboardCRUDActions.getCreateAlert(true));
            } catch (error) {
                dispatch(dashboardCRUDActions.getopenDrawer(false));
            }
    }


    return (
        <>
        <Box 
            id="대시보드 생성하기"
        >
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                    >{({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                    <Form>
                        
                    <div
                        id='My Information'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                            //paddingBottom: '10px',
                            marginTop: '10px',
                            justifyContent: 'space-between',
                        }}
                    >
                   
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                <TextField 
                                    size="small"   
                                    id="dashTitle"
                                    variant="outlined"
                                    type="text"
                                    label="대시보드 제목"
                                    onChange={handleChange}
                                    value={values.dashTitle}
                                    name="dashTitle"
                                    error={touched.dashTitle && errors.dashTitle}
                                    //helperText={touched.dashTitle && errors.dashTitle}
                                />
                        </div>
                        {/* 생성 취소 버튼 */}
                            <Box
                                justifyContent="flex-end"
                                sx={{ pl: "10px" }}
                            >
                                <Button
                                    type="submit"
                                    style={{ backgroundColor:'#2c387e' ,borderRadius:0}} 
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            </Box>

                    </div>
                       
                        
        

                    </Form>  )}
                </Formik>
        </Box>
        </>
    );

}

export default DashboardForm;