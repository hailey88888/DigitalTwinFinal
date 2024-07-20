import { Box, Button, TextField } from "@mui/material";
import Header from "../../Header";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import DialogContent from '@mui/material/DialogContent';
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import UserForm from "../../form/user/UserForm";
import { userActions } from "../../../reducx/user";
import { Formik,Form } from "formik";
import { createUser,editUser } from "../../../util/restAPI/siteAdmin/user";
import * as yup from "yup";


function PaperComponent(props) {
    return (
      <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }


const UserDialog = () => {
    const dispatch = useDispatch();
    const { updateData }= useSelector((state) => state.commonReducer);

    const toggleDrawer = (newOpen) => {
        dispatch(updateData
            ? userActions.getopenEditDrawer(newOpen) 
            : userActions.getopenDrawer(newOpen) 
        );
    };
    console.log("업데이트 데이터 : ",updateData);

    const {siteNo} = useSelector((state) => state.authReducer);

//-----------------------[ Formik ]-----------------------------
    //초기 데이터 
        const initialValues 
        =  {
            userId : updateData ? updateData.userId :'',
            userPw : updateData ? updateData.userPw :'',
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
        <Dialog
            id="Dialog"
            open={true}
            onClose={() => toggleDrawer(false)}
            fullWidth={true}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            sx={{
                // background: 'black',
                '& .MuiPaper-root': {
                  background: 'black'
                },
                // '& .MuiBackdrop-root': {
                //   backgroundColor: 'transparent' // Try to remove this to see the result
                // }
              }}
            PaperProps={{
                sx: {
                    width: '70%', // 다이얼로그의 너비를 70%로 설정 (필요에 따라 조정 가능)
                    maxWidth: '1100px', // 다이얼로그의 최대 너비를 1100px로 설정 (필요에 따라 조정 가능)
                    pl: '20px',
                    pr: '-50px',
                    backgroundColor: 'black'
                }
            }}
        >
       
       <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form style={{width:'100%'}}>
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
                                    borderBottom: '1px solid #6798bf',
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
                                <Box justifyContent="flex-end" sx={{ pl: "10px", }}>
                                    <Button
                                        type="submit"
                                        style={{ color: '#6798bf' }}
                                        variant="contained"
                                        // disabled={isSubmitting}
                                        // onClick={handleSubmit}
                                    >
                                        {updateData ? 'Edit' : 'Create'}
                                    </Button>
                                </Box>
                            </div>
                        </DialogTitle>

                        <DialogContent sx={{ overflow: 'auto', width: '100%' }}>
                            <Box sx={{ pb: '30px' }}>
                                {/* -----------------[ Form 부분  ]-------------------- */}
                                <Box
                                    display="grid"
                                  //  gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                    sx={{ width: "100%" }}
                                >
                                    <Box
                                        display="grid"
                                        gap="20px"
                                        gridTemplateColumns="repeat(3, 1fr)" // 3열 구성
                                        sx={{
                                            width: '100%',
                                            marginBottom: '10px',
                                            pt: '20px',
                                            pr:'20px'
                                        }}
                                    >
                                        <>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <TextField
                                                    fullWidth
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
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
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
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
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
                                        </>
                                    </Box>
                                </Box>
                            </Box>
                        </DialogContent>
                    </Form>
                )}
            </Formik>
               
           
        </Dialog>

    );
}

export default UserDialog;

{/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
{/* -----------------[ Header 부분 ]-------------------- */}
{/* <div
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
//     <Box justifyContent="flex-end" sx={{ pl: "10px" }}>
//         <Button
//             type="submit"
//             style={{ color: '#6798bf' }}
//             variant="contained"
//             // disabled={isSubmitting}
//             onClick={handleSubmit}
//         >
//             {updateData ? 'Edit' : 'Create'}
//         </Button>
//     </Box>
// </div>
// </DialogTitle> */}