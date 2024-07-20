
import { useSelector , useDispatch} from 'react-redux';
import { Box, Button, TextField } from "@mui/material";
import  Header from '../../Header';
import { Formik,Form } from "formik";
import * as yup from "yup";
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { createSite,editSites,siteQueryClient } from '../../../util/restAPI/masterUser/site';
import { siteActions } from '../../../reducx/site';


// 사이트 생성 및 편집 하는 폼 => Drawer
const SiteForm = () => {
    const dispatch = useDispatch();
    const {updateData}= useSelector((state) => state.commonReducer);

    console.log('사이트 편집 데이터 : ',updateData);
//-----------------------[ Formik ]-----------------------------
    //초기 데이터 
    const initialValues 
    =  {
        siteName : updateData ? updateData.siteName :'',
        siteLogo : null,
        userId : updateData? updateData.userId :'',
        userName : updateData? updateData.userName :'',
        userPwd : updateData? updateData.userPwd :''
        };

        
    //form 제출함수 => HTTP POST요청 하기 : 생성
    const handleSubmit = async(values) => {
        console.log("클릭!");
        console.log("받아온 데이터 : ",values);
        if(updateData){
            handleEditSubmit(values);
        }else{
            const fileInput = document.getElementById('siteLogo'); // 파일 입력 필드의 ID로 가져옴
            const file = fileInput.files[0]; // 첫 번째 파일만 사용
            const fileName = file ? file.name : '';
            console.log("파일 : ",file);
            console.log("파일이름 : ",fileName);
            console.log("받아온 데이터 : ",values);
    
                console.log('생성 - POST 요청');
                const requestBody = {
                    siteNo : "",
                    siteName: values.siteName,
                    siteStatus : "ACTIVE",
                    userId : values.userId,
                    userPw : values.userPwd,
                    userName : values.userName,
                   
                };
                //HTTP POST Request
                    try {
                        // API 요청 보내기
                        await createSite({ body : requestBody , fileName : fileName, file : file});
                        dispatch(siteActions.getopenDrawer(false));
                    } catch (error) {
                        dispatch(siteActions.getopenDrawer(false));
                    }
        }
        
    };

    //form 제출함수 => HTTP PUT요청 하기 : 편집
    const handleEditSubmit = async(values) => {
        const fileInput = document.getElementById('siteLogo'); 
        const file = fileInput.files[0]; // 첫 번째 파일만 사용
        const fileName = file ? file.name : '';
        // console.log("파일 : ",file);
        // console.log("파일이름 : ",fileName);
        console.log("받아온 데이터 : ",values);
        console.log("사이트 번호 : ",updateData.siteNo.toString());

            
        const requestBody = {
            siteNo : updateData.siteNo.toString(),
            siteName: values.siteName,
            siteStatus : "ACTIVE",
            userId : updateData.userId,
            userPw : values.userPwd,
            userName : updateData.userName,
           
        };

        //HTTP PUT Request
        try {
            // API 요청 보내기
            await editSites({ body : requestBody , file : file});
            dispatch(siteActions.getopenEditDrawer(false));

        } catch (error) {
            dispatch(siteActions.getopenEditDrawer(false));
        }
    };
    
    //유효성 검사 
    const checkoutSchema = yup.object().shape({
        siteName: yup.string().required("required"),
        siteLogo:  yup.string().required("required"),
        userId : yup.string().required("required"),
        userName : yup.string().required("required"),
        userPwd : yup.string().required("required"),
       
    });



    return (
        <>
            <Box sx={{ pl:"15px" }}>
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
                    // handleSubmit,
                    
                }) => (
                <Form>
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
                        {updateData?(
                            <Header title={`No. ${updateData.siteNo} 사이트 편집`} 
                            // subtitle={updateData.siteNo} 
                            />
                        ) : (
                            <Header title="사이트 생성" />
                        )}
                    </div>

                    {/* Create | Edit 버튼 */}
                    <Box
                        justifyContent="flex-end"
                        sx={{ pl: "10px" }}
                    >
                         <Button
                                type="submit"
                                style={{ color: '#6798bf' }} 
                                variant="contained"
                                onClick={handleSubmit}
                            >
                               {updateData ? 'Edit' : 'Create'}
                            </Button>
                        {/* {updateData ? (
                            <Button
                                type="submit"
                                style={{ color: '#6798bf' }} 
                                variant="contained"
                                // onClick={handleSubmit}
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                style={{ color: '#6798bf' }} 
                                variant="contained"
                                // onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        )} */}
                    </Box>
                    </div>

                {/* -----------------[ Form 부분  ]-------------------- */}
                            <Box
                                display="grid"
                                // gap="10px"
                                gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                sx={{
                                    // "& > div": "span 6",
                                    width: "75vw",
                                }}
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

                     {/* ---------------[ 업데이트 할때 Text Field ]--------------------*/}
                            {updateData 
                            ? 
                                <>
                                    <h3 style={{ gridColumn: "span 3", marginBottom: '-5px' }}> 사이트 로고 & 비밀번호 재설정 </h3>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                        <TextField fullWidth
                                                //size="small"
                                                id="userPwd"
                                                variant="filled"
                                                type="text"
                                                label="비밀번호 재설정"
                                                onChange={handleChange}
                                                value={values.userPwd}
                                                name="userPwd"
                                                error={touched.userPwd && errors.userPwd}
                                                helperText={touched.userPwd && errors.userPwd}
                                            />
                                    </div>


                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                <TextField fullWidth
                                                        //size="small"
                                                        id="siteName"
                                                        variant="filled"
                                                        type="text"
                                                        label="사이트 이름 재설정"
                                                        onChange={handleChange}
                                                        value={values.siteName}
                                                        name="siteName"
                                                        error={touched.siteName && errors.siteName}
                                                        helperText={touched.siteName && errors.siteName}
                                                    />
                                    </div>
                                
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <InsertPhotoIcon sx={{ mr: '10px', color: 'gray' }} />
                                        <TextField fullWidth 
                                            type='file'
                                            id="siteLogo" name="siteLogo"
                                            accept=".jpeg, .png, .jpg"
                                            outline='none'
                                            sx={{backgroundColor:!touched.siteLogo && '#1b1b1b', 
                                                borderBottom: !touched.siteLogo && '1px solid white', 
                                                //outline:'none'
                                            }}
                                            onChange={handleChange}
                                            error={touched.siteLogo && errors.siteLogo}
                                            helperText={touched.siteLogo && errors.siteLogo}
                                            
                                        />
                                    </div>
                                  
                                </>
                            :
                                <>
                                            <h3 style={{ gridColumn: "span 3", marginBottom: '-5px' }}>해당 사이트 관리자 정보 </h3>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                <TextField fullWidth
                                                        //size="small"
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
                                                        id="userName"
                                                        variant="filled"
                                                        type="text"
                                                        label="이름"
                                                        onChange={handleChange}
                                                        value={values.userName}
                                                        name="userName"
                                                        error={touched.userName && errors.userName}
                                                        helperText={touched.userName && errors.userName}
                                                    />
                                            </div>


                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                <TextField fullWidth
                                                        //size="small"
                                                        id="userPwd"
                                                        variant="filled"
                                                        type="text"
                                                        label="비밀번호"
                                                        onChange={handleChange}
                                                        value={values.userPwd}
                                                        name="userPwd"
                                                        error={touched.userPwd && errors.userPwd}
                                                        helperText={touched.userPwd && errors.userPwd}
                                                    />
                                            </div>


                                            <h3 style={{ gridColumn: "span 3", marginBottom: '-5px' }}>사이트 설정</h3>

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{mr:'10px', color:'gray'}}/>
                                                <TextField fullWidth
                                                        //size="small"
                                                        id="siteName"
                                                        variant="filled"
                                                        type="text"
                                                        label="사이트 명"
                                                        onChange={handleChange}
                                                        value={values.siteName}
                                                        name="siteName"
                                                        error={touched.siteName && errors.siteName}
                                                        helperText={touched.siteName && errors.siteName}
                                                    />
                                            </div>
                                        
                                        
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <InsertPhotoIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <TextField fullWidth 
                                                    type='file'
                                                    id="siteLogo" name="siteLogo"
                                                    accept=".jpeg, .png, .jpg"
                                                    outline='none'
                                                    sx={{backgroundColor:!touched.siteLogo && '#1b1b1b', 
                                                        borderBottom: !touched.siteLogo && '1px solid white', 
                                                        //outline:'none'
                                                    }}
                                                    onChange={handleChange}
                                                    error={touched.siteLogo && errors.siteLogo}
                                                    helperText={touched.siteLogo && errors.siteLogo}
                                                    required
                                                />
                                            </div>
                                </>}
                                    
                                    
                                   
                                </Box>
                            </Box>
                </Form>
            )}
            </Formik>
                       
                    
            </Box>
        </>
    );


}

export default SiteForm;