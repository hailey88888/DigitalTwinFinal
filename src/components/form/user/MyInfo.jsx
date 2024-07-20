
import Header from "../../Header";
import { useDispatch,useSelector } from 'react-redux';
import { Formik,Form } from "formik";
import * as yup from "yup";
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { Box, Button, TextField } from "@mui/material";

const MyInfo = () => {
    //---------------[ 사이트 관리자 정보 ] ---------
    const {userName,userID} = useSelector((state) => state.authReducer);

//-----------------------[ Formik ]-----------------------------
 //초기 데이터 
 const initialValues =  {
     userId : userID ? userID :'',
     userPw : '',
     userDashDefaultNo  :'',
     userName : userName ? userName :'',
     };

//유효성 검사 
  const checkoutSchema = yup.object().shape({
    userId: yup.string().required("required"),
    userPw:  yup.string().required("required"),
    userDashDefaultNo : yup.string().required("required"),       
    userName : yup.string().required("required"),       
    });   

    return (
        <Box 
                id="내정보관리"
                sx={{backgroundColor:'black',
                width:'1000px',
                height:'430px',
                paddingLeft:'30px',
            }}>
                <Formik
                    // onSubmit={updateData ? handleEditSubmit : handleSubmit}
                   // onSubmit={updateData ? handleEditSubmit : handleSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                    >{({
                        values,
                        errors,
                        touched,
                        handleChange,
                        //handleSubmit,
                        //handleEditSubmit,
                    }) => (
                    <Form>
                    <div
                        id='My Information'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                            paddingBottom: '10px',
                            marginTop: '10px',
                            borderBottom: '1px solid #8f8c8c',
                            justifyContent: 'space-between',
                        }}
                    >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon
                                    type="submit"
                                    variant="text"
                                    sx={{ fontSize: '30px', marginRight: '10px' }} 
                                />
                                <Header title="내정보 관리" />
                            
                            </div>
                        {/* Edit 버튼 */}
                            <Box
                                justifyContent="flex-end"
                                sx={{ pl: "10px" }}
                            >
                                <Button
                                    type="submit"
                                    style={{ color: '#6798bf' }} 
                                    variant="contained"
                                // onClick={handleSubmit}
                                >
                                    Edit
                                </Button>
                            </Box>
                    </div>
                    {/* -----------------[ Form 부분  ]-------------------- */}
                       
                    <h3 style={{marginBottom: '-5px' }}> 사용자 아이디 & 비밀번호 </h3>
                    <div style={{ display: 'flex', alignItems: 'center' , paddingTop:'30px',paddingRight:'10px'}}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' , width:'50%'}}>
                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                    <TextField 
                                    fullWidth
                                    id="userPw"
                                    variant="filled"
                                    type="text"
                                    label="비밀번호 입력"
                                    onChange={handleChange}
                                    value={values.userPw}
                                    name="userPw"
                                    error={touched.userPw && errors.userPw}
                                    helperText={touched.userPw && errors.userPw}
                                    />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' ,width:'50%'}}>
                            <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                <TextField fullWidth
                                    disabled
                                    id="userId"
                                    variant="filled"
                                    type="text"
                                    label="아이디"
                                    onChange={handleChange}
                                    value={values.userId}
                                    name="userId"
                                    error={touched.userId && errors.userId}
                                    helperText={touched.userId && errors.userId}
                                />
                        </div>
                    </div> 


                    <h3 style={{ gridColumn: "span 3", marginBottom: '-5px', paddingTop:'30px' }}>사용자 이름  </h3>
                    <div style={{ display: 'flex', alignItems: 'center' , paddingTop:'30px', paddingRight:'10px'}}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' ,width:'50%' }}>
                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                    <TextField 
                                    fullWidth
                                    id="userName"
                                    variant="filled"
                                    type="text"
                                    label="사용자 이름"
                                    onChange={handleChange}
                                    value={values.userName}
                                    name="userName"
                                    error={touched.userName && errors.userName}
                                    helperText={touched.userName && errors.userName}
                                    />
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' ,width:'50%'}}>
                            <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                <TextField 
                                    fullWidth
                                    id="userDashDefaultNo"
                                    variant="filled"
                                    type="text"
                                    label="대시보드 코드 번호"
                                    onChange={handleChange}
                                    value={values.userDashDefaultNo}
                                    name="userDashDefaultNo"
                                    error={touched.userDashDefaultNo && errors.userDashDefaultNo}
                                    helperText={touched.userDashDefaultNo && errors.userDashDefaultNo}
                                />
                        </div> */}
                    </div>
                            


                      


               

                    </Form>  )}
                </Formik>
        </Box>
    );
}

export default MyInfo;
