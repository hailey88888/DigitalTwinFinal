import Header from '../../Header'
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { Formik,Form } from "formik";
import * as yup from "yup";
import { useSelector , useDispatch} from 'react-redux';
import { Box, Button, TextField } from "@mui/material";
import { createUser, editUser } from '../../../util/restAPI/siteAdmin/user';
import { userActions } from '../../../reducx/user';
import { useState } from 'react';

const UserForm = () => {
    const dispatch = useDispatch();
    const {updateData}= useSelector((state) => state.commonReducer);
    const {siteNo} = useSelector((state) => state.authReducer);
    const [fail, setFail] = useState(false);

//-----------------------[ Formik ]-----------------------------
    //초기 데이터 
    const initialValues 
    =  {
        userId : updateData ? updateData.userId :'',
        userPw : updateData ? updateData.userPw :'',
        // userDashDefaultNo : updateData ? updateData.userDashDefaultNo :'',
        userName : updateData ? updateData.userName :'',
        };
        

    //form 제출함수 => HTTP POST요청 하기 : 생성
    const handleSubmit = async(values) => {
        if (updateData) {
            await handleEditSubmit(values);
        } else {
            console.log('생성 - POST 요청');
            console.log(values);
            const requestBody = {
                userId: values.userId,
                userPw: values.userPw,
                userName: values.userName,
            };
            // HTTP POST Request
            try {
                // API 요청 보내기
                const code = await createUser({ body: requestBody , siteNum: siteNo });
                console.log("POST 결과 : ", code);
                if (code === 'ERROR') {
                    setFail(true);
                } else {
                    dispatch(userActions.getopenDrawer(false));
                    setFail(false);
                }
            } catch (error) {
                dispatch(userActions.getopenDrawer(false));
            }
        }
    }
        
   


    //form 제출함수 => HTTP PUT요청 하기 : 편집
    const handleEditSubmit = async(values) => {
        console.log('편집 - PUT요청');
        const requestBody = {
            userPw : values.userPw,
            userId :updateData.userId, //못바꿈
            userName : values.userName,           
        };

        //HTTP PUT Request
        try {
            // API 요청 보내기
            await editUser({ body : requestBody , siteNum: siteNo });
           dispatch(userActions.getopenEditDrawer(false));

        } catch (error) {
           dispatch(userActions.getopenEditDrawer(false));
        }
    };
    

    //유효성 검사 
    const checkoutSchema = yup.object().shape({
        userId: yup.string().required("required"),
        userPw:  yup.string().required("required"),
        userName : yup.string().required("required"),       
    });


    return (
        <>
            <Box sx={{pb:'30px'}}>
                <Formik
                    // onSubmit={updateData ? handleEditSubmit : handleSubmit}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,isSubmitting,
                    }) => (
                    <Form>
                        {/* -----------------[ Header 부분 ]-------------------- */}
                        
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        {/* -----------------[ Header 부분 ]-------------------- */}
                        <div
                            id='siteFormHeader'
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
                                    sx={{ fontSize: '30px', marginRight: '10px' }} // marginRight 속성을 추가합니다.
                                />
                                {updateData ? (
                                    <Header title={`${updateData.userId} 사용자 정보 편집`} />
                                ) : (
                                    <Header title="사용자 생성" />
                                )}
                            </div>

                            {/* Create | Edit 버튼 */}
                            <Box justifyContent="flex-end" sx={{ pl: "10px" }}>
                                <Button
                                    type="submit"
                                    style={{ color: '#6798bf' }}
                                    variant="contained"
                                    // disabled={isSubmitting}
                                    onClick={handleSubmit}
                                >
                                    {updateData ? 'Edit' : 'Create'}
                                </Button>
                            </Box>
                        </div>
                    </DialogTitle>
                    {/* -----------------[ Form 부분  ]-------------------- */}
                                <Box
                                    display="grid"
                                    // gap="10px"
                                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                    sx={{
                                        // "& > div": "span 6",
                                        //width: "75vw",
                                    }}
                                >
                                    
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(3, 1fr)" // 2열 구성
                                        sx={{
                                            width:'900px' ,
                                            marginBottom: '10px',
                                            pt:'20px'
                                        }}
                                    >
                                
                                    <>
                                        {/* <h3 style={{ gridColumn: "span 6", marginBottom: '-5px' }}> 사용자 아이디 & 비밀번호 </h3> */}
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                                    <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                    <TextField fullWidth
                                                            disabled={updateData ? true : false}
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
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                            <TextField fullWidth
                                                    //size="small"
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
                                        
                                   
                                                {/* <h3 style={{ gridColumn: "span 3", marginBottom: '-5px' }}>사용자 이름  </h3> */}
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                    <TextField fullWidth
                                                            //size="small"
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
{/* 
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                    <TextField fullWidth
                                                            //size="small"
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
                                    </>
                                        
                                        
                                    
                                    </Box>
                                </Box>
                    </Form>
                )}
                </Formik>
                {fail && 
                     <h4 style={{color:'red', textAlign :'center'}}>생성실패 : 아이디 중복 </h4>
                }
                
            </Box>
        </>
    );
}

export default UserForm;