
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { Box, Button, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import DialogContent from '@mui/material/DialogContent';
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { Formik,Form } from "formik";
import * as yup from "yup";
import { useEffect } from 'react';
import Header from '../../Header';
import { facilityCodeActions } from '../../../reducx/facilityCode';
import { createFacilityCode, editFacilityCode } from '../../../util/restAPI/siteAdmin/facilityCode';


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


const FacilityCodeDialog = () =>{

    const dispatch = useDispatch();
    const {siteNo} = useSelector((state) => state.authReducer);
    const {updateData}= useSelector((state) => state.commonReducer);

    const toggleDrawer = (newOpen) => {
        if(Object.keys(updateData).length !== 0){
          dispatch(facilityCodeActions.getopenEditDrawer(newOpen));
          
        } else {
          dispatch(facilityCodeActions.getopenDrawer(newOpen));
        }
      };

    console.log("업데이트 데이터 : ",updateData);


//-----------------------[ Formik ]-----------------------------
    //초기 데이터 
    const initialValues 
        =  {
            facilityCode : updateData ? updateData.facilityCode :'',
            facilityCodeName : updateData ? updateData.facilityCodeName :'',
            facilityCodeInfo : updateData ? updateData.facilityCodeInfo :'',
            };

    //유효성 검사 
    const checkoutSchema = yup.object().shape({
        facilityCode: yup.string().required("required"),
        facilityCodeName:  yup.string().required("required"),
        facilityCodeInfo : yup.string().required("required"),            
    }); 

    //form 제출함수 => HTTP POST요청 하기 : 생성
    const handleSubmit = async(values) => {
        if (updateData) {
            await handleEditSubmit(values);
        } else {
            console.log('생성 - POST 요청');
            console.log(values);
            const requestBody = {
                facilityCode :  values.facilityCode ,
                facilityCodeName : values.facilityCodeName,
                facilityCodeInfo : values.facilityCodeInfo,
            };
            // HTTP POST Request
         
            try {
                // API 요청 보내기
                const code = await createFacilityCode({ body: requestBody , siteNum: siteNo });
                console.log("POST 결과 : ", code);
                if (code === 'ERROR') {
                    // setFail(true);
                } else {
                    dispatch(facilityCodeActions.getopenDrawer(false));
                    // setFail(false);
                }
            } catch (error) {
                dispatch(facilityCodeActions.getopenDrawer(false));
            }
        }
    }


    //form 제출함수 => HTTP PUT요청 하기 : 편집
    const handleEditSubmit = async(values) => {
        console.log('편집 - PUT요청');
        const requestBody = {
            facilityCodeNo :updateData.facilityCodeNo,
            facilityCode :  values.facilityCode ,
            facilityCodeName : values.facilityCodeName,
            facilityCodeInfo : values.facilityCodeInfo ,          
        };

        //HTTP PUT Request
        try {
            // API 요청 보내기
            await editFacilityCode({ body : requestBody , siteNum: siteNo });
           dispatch(facilityCodeActions.getopenEditDrawer(false));

        } catch (error) {
           dispatch(facilityCodeActions.getopenEditDrawer(false));
        }
    };



    return(
        <Dialog
            id="Dialog"
            open={true}
            onClose={()=>toggleDrawer(false)}
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
                                        <Header title={`${updateData.facilityCodeName} 설비 코드 정보 편집`} />
                                    ) : (
                                        <Header title="설비 코드 생성" />
                                    )}
                                </div>

                                {/* Create | Edit 버튼 */}
                                <Box justifyContent="flex-end" sx={{ pl: "10px", }}>
                                    <Button
                                        type="submit"
                                        style={{ color: '#6798bf' }}
                                        variant="contained"
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
                                                    // disabled={updateData && updateData.length > 0 ? true : false}
                                                    id="facilityCode"
                                                    variant="filled"
                                                    type="text"
                                                    label="설비 코드 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityCode}
                                                    name="facilityCode"
                                                    error={touched.facilityCode && errors.facilityCode}
                                                    helperText={touched.facilityCode && errors.facilityCode}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <TextField
                                                    fullWidth
                                                    id="facilityCodeName"
                                                    variant="filled"
                                                    type="text"
                                                    label="설비 코드 이름 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityCodeName}
                                                    name="facilityCodeName"
                                                    error={touched.facilityCodeName && errors.facilityCodeName}
                                                    helperText={touched.facilityCodeName && errors.facilityCodeName}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <TextField
                                                    fullWidth
                                                    id="facilityCodeInfo"
                                                    variant="filled"
                                                    type="text"
                                                    label="설비 코드 정보 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityCodeInfo}
                                                    name="facilityCodeInfo"
                                                    error={touched.facilityCodeInfo && errors.facilityCodeInfo}
                                                    helperText={touched.facilityCodeInfo && errors.facilityCodeInfo}
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

export default FacilityCodeDialog;