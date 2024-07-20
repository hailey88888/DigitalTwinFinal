import { useDispatch,useSelector } from 'react-redux';
import Header from '../../Header';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box,Button} from "@mui/material";


import { useMutation } from '@tanstack/react-query';
import { facilityCodeActions } from '../../../reducx/facilityCode';
import { commonActions } from '../../../reducx/common';
import { facilityCodeQueryClient,deleteFacilityCode } from '../../../util/restAPI/siteAdmin/facilityCode';

const FacilityCodeDeleteDialog = () =>{
    const {siteNo} = useSelector((state) => state.authReducer);
    const {checkedBoxes} = useSelector((state) => state.commonReducer); // 테이블 데이터
    const dispatch = useDispatch();

    //다이얼 창 닫기(삭제알림창)
    //변화없는 이유는 삭제된 데이터가 없기때문
    const deleteClose = () => {
        dispatch(facilityCodeActions.getUserDeleteDialog(false));
        dispatch(commonActions.getCheckedBoxes([]));
    }; 


    //삭제하기
    const deleteHandle = () => {
        checkedBoxes.forEach(async (checkedID) => {
            console.log("checkedID : ",checkedID);
            mutate({ facCodeNum: checkedID, siteNum: siteNo });
            dispatch(facilityCodeActions.getUserDeleteDialog(false));
        });   
    }


    //삭제 함수 정의하기
    const { mutate } = useMutation({
        mutationFn :deleteFacilityCode,  
        onSuccess: () => {
            facilityCodeQueryClient.invalidateQueries({
            queryKey: ['getFacilityCodelists'],
            refetchType: 'none',
            });
        },
    });

    return(
        <Dialog open={true} maxWidth ='' 
        sx={{color : 'black',
            '& .MuiPaper-root': {
                  background: 'black'
                }}}>
        <IconButton
            aria-label="close"
            onClick={deleteClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                //color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
        </IconButton>
        <Box m="30px" sx={{ width : 450}}>
            <Header title="Alert"/>
            <h4 style={{width:'100%', borderTop:'1px solid #6798bf', paddingTop:'13px'}}>삭제 하시겠습니까?</h4>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button 
                        type="submit" 
                        color="secondary" 
                        variant="outlined" 
                        style={{ color: 'white' ,background:'#6798bf'}}    
                        onClick={deleteHandle}
                        >
                        확인

                </Button>
            </div>
            </Box>
    </Dialog>
    );
}

export default FacilityCodeDeleteDialog;