import { Header } from "..";
import { Box,Button} from "@mui/material";
import { queryClient } from "../../util/http";
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { flightScheduleActions } from '../../reducx/flightSchedule';

const SuccessDelete = () => {
    const dispatch = useDispatch();

     // 다이얼 컴포넌트 디자인 
     const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));


      //삭제완료창닫기
      const completeDeleteDialog = () => {
        dispatch(flightScheduleActions.setSuccessDeleteDialog(false));
        queryClient.refetchQueries(['getlists', { max: 3 }]); //새로운 데이터 불러오기 
      }

    return (
        <>
        <BootstrapDialog open={true} maxWidth =''>
            <Box m="30px" sx={{ width : 450}}>
              <Header title="Success" subtitle="Delete FlightSchedule information" />
              <h4>삭제완료되었습니다</h4>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button 
                type="submit" 
                color="secondary" 
                variant="outlined" 
                onClick={completeDeleteDialog}
                >
                확인
  
              </Button>
              </div>
            </Box>
        </BootstrapDialog>
        </>
    );
}

export default SuccessDelete;