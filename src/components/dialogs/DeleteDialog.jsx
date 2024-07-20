import IconButton from '@mui/material/IconButton';
import { Box,Button} from "@mui/material";
import { Header } from "../../components";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { flightScheduleActions } from '../../reducx/flightSchedule';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';


import { useMutation } from '@tanstack/react-query';
import { queryClient, deleteID } from '../../util/http';

const DeleteDialog = ({checkedBox,url}) => {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));

    console.log('DeleteDialog checkedBox : ',checkedBox)

    const dispatch = useDispatch();

    //다이얼 창 닫기(삭제알림창)
    //변화없는 이유는 삭제된 데이터가 없기때문
    const deleteClose = () => {
        dispatch(flightScheduleActions.setDeleteDialogForm(false));
        dispatch(flightScheduleActions.setdeleteDialogNum(1));
    }; 
    
    //삭제하기
    const deleteHandle = () => {
        checkedBox.forEach((checkedID) => {
            mutate({ id: checkedID, url : url }); // 삭제하는 함수 호출 
        });
        dispatch(flightScheduleActions.setDeleteDialogForm(false)); //삭제알림창 닫기
        dispatch(flightScheduleActions.setSuccessDeleteDialog(true)); // 삭제완료창 열기 
    }

    //삭제 함수 정의하기
     const { mutate} = useMutation({
                            mutationFn :deleteID,  
                            onSuccess: () => {
                                queryClient.invalidateQueries({
                                queryKey: ['events'],
                                refetchType: 'none',
                                });
                            },
                            });

    return (
        <>
            <BootstrapDialog open={true} maxWidth =''>
                <IconButton
                    aria-label="close"
                    onClick={deleteClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                <Box m="30px" sx={{ width : 450}}>
                    <Header title="Alert" subtitle="Delete FlightSchedule information" />
                    <h4>삭제 하시겠습니까?</h4>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button 
                                type="submit" 
                                color="secondary" 
                                variant="outlined" 
                                onClick={deleteHandle}
                                >
                                확인

                        </Button>
                    </div>
                    </Box>
            </BootstrapDialog>
        </>
    );
}


export default DeleteDialog;