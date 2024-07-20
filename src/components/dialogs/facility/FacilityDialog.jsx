import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { Box, Button, TextField } from "@mui/material";
import Header from '../../Header';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import DialogContent from '@mui/material/DialogContent';
import BusinessIcon from '@mui/icons-material/Business';
import BallotIcon from '@mui/icons-material/Ballot';
import { Formik,Form } from "formik";
import * as yup from "yup";
import { editFacility, createFacility } from '../../../util/restAPI/siteAdmin/facility';
import { facilityActions } from '../../../reducx/facility';
import { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from './IOSSwitch';

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

const FacilityDialog = () => {
    const dispatch = useDispatch();
    const {siteNo} = useSelector((state) => state.authReducer);
    const {updateData}= useSelector((state) => state.commonReducer);
    const {yesOrNo}= useSelector((state) => state.facilityReducer);

    const toggleDrawer = (newOpen) => {
        if(Object.keys(updateData).length !== 0){
          dispatch(facilityActions.getopenEditDrawer(newOpen));
          
        } else {
          dispatch(facilityActions.getopenDrawer(newOpen));
        }
    };
    

    console.log("업데이트 데이터 : ",updateData);
//-----------------------[ Formik ]-----------------------------
    //초기 데이터 
    const initialValues 
    =  {
        facilityId : updateData ? updateData.facilityId :'',
        facilityName : updateData ? updateData.facilityName :'',
        facilityCodeNo : updateData ? updateData.facilityCodeNo :'',
        // dataSaveYn : updateData ? updateData.dataSaveYn :'',
        };


    //유효성 검사 
    const checkoutSchema = yup.object().shape({
        facilityId: yup.string().required("required"),
        facilityName:  yup.string().required("required"),
        facilityCodeNo : yup.string().required("required"),       
        // dataSaveYn : yup.string().required("required"),       
    }); 


    //form 제출함수 => HTTP POST요청 하기 : 생성
    const handleSubmit = async(values) => {
        if (updateData) {
            await handleEditSubmit(values);
        } else {
            console.log('생성 - POST 요청');
            console.log(values);
            const requestBody = {
                facilityId :  values.facilityId ,
                facilityName : values.facilityName,
                facilityCodeNo : values.facilityCodeNo ,
                dataSaveYn :  yesOrNo ,
            };
            // HTTP POST Request
         
            try {
                // API 요청 보내기
                const code = await createFacility({ body: requestBody , siteNum: siteNo });
                console.log("POST 결과 : ", code);
                if (code === 'ERROR') {
                    // setFail(true);
                } else {
                    dispatch(facilityActions.getopenDrawer(false));
                    // setFail(false);
                }
            } catch (error) {
                dispatch(facilityActions.getopenDrawer(false));
            }
        }
    }


    //form 제출함수 => HTTP PUT요청 하기 : 편집
    const handleEditSubmit = async(values) => {
        console.log('편집 - PUT요청');
        const requestBody = {
            facilityNo : updateData.facilityNo,
            facilityId :  values.facilityId ,
            facilityName : values.facilityName,
            facilityCodeNo : updateData.facilityCodeNo ,
            dataSaveYn :  yesOrNo ,           
        };
        
        //HTTP PUT Request
        try {
            // API 요청 보내기
            await editFacility({ body : requestBody , siteNum: siteNo });
           dispatch(facilityActions.getopenEditDrawer(false));

        } catch (error) {
           dispatch(facilityActions.getopenEditDrawer(false));
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
                    // backgroundColor: 'gray',
                    // color :'black'
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
                                    marginBottom: '15px',
                                    paddingBottom: '15px',
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
                                        <Header title={`${updateData.facilityName} 설비 정보 편집`} />
                                    ) : (
                                        <Header title="설비 생성" />
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
                                        gridTemplateColumns="repeat(2, 1fr)" // 3열 구성
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
                                                <h3 style={{width:'150px'}}>설비 아이디 : </h3>
                                                <TextField
                                                    fullWidth
                                                    // disabled={updateData && updateData.length > 0 ? true : false}
                                                    id="facilityId"
                                                    variant="filled"
                                                    type="text"
                                                    // label="설비 아이디 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityId}
                                                    name="facilityId"
                                                    error={touched.facilityId && errors.facilityId}
                                                    helperText={touched.facilityId && errors.facilityId}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <h3 style={{width:'150px'}}>설비 이름 :  </h3>
                                                <TextField
                                                    fullWidth
                                                    id="facilityName"
                                                    variant="filled"
                                                    type="text"
                                                    // label="설비 이름 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityName}
                                                    name="facilityName"
                                                    error={touched.facilityName && errors.facilityName}
                                                    helperText={touched.facilityName && errors.facilityName}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <h3 style={{width:'150px'}}>설비 코드 :</h3>
                                                <TextField
                                                    fullWidth
                                                    id="facilityCodeNo"
                                                    variant="filled"
                                                    type="text"
                                                    // label="설비 코드 입력"
                                                    onChange={handleChange}
                                                    value={values.facilityCodeNo}
                                                    name="facilityCodeNo"
                                                    error={touched.facilityCodeNo && errors.facilityCodeNo}
                                                    helperText={touched.facilityCodeNo && errors.facilityCodeNo}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BallotIcon sx={{ mr: '10px', color: 'gray' }} />
                                                <h3 style={{width:'150px'}}>데이터 저장 : </h3>
                                                {/* <TextField
                                                    fullWidth
                                                    id="dataSaveYn"
                                                    variant="filled"
                                                    type="text"
                                                    // label="데이터 저장 여부"
                                                    onChange={handleChange}
                                                    value={values.dataSaveYn}
                                                    name="dataSaveYn"
                                                    error={touched.dataSaveYn && errors.dataSaveYn}
                                                    helperText={touched.dataSaveYn && errors.dataSaveYn}
                                                /> */}

                                                    <FormControlLabel
                                                            name="dataSaveYn"
                                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                            label="Y / N"
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

export default FacilityDialog;