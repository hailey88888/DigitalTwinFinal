
import { Box, Button } from "@mui/material";
import Header from "../../Header";
import { deleteDshboard } from "../../../util/restAPI/siteAdmin/dashboard";
import { dashboardCRUDActions } from "../../../reducx/dashboardCRUD";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import { useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';


const DeleteDialog = ({selectedDashCodes}) => {
    const dispatch = useDispatch();
    const {userID,siteNo}= useSelector((state) => state.authReducer);

    const handleDelete = async() => {
        try {
            await deleteDshboard({ dashCode : selectedDashCodes,siteNum : siteNo, userId:userID});            
            dispatch(dashboardCRUDActions.getDeleteDialog(false));
            dispatch(dashboardCRUDActions.getSuccess(true));
        } catch (error) {
            dispatch(dashboardCRUDActions.getDeleteDialog(false));
        }
    }
    const handleClose = () => {
        dispatch(dashboardCRUDActions.getDeleteDialog(false));
    }

    return(
        <>
           <Dialog open={true} maxWidth ='' 
            sx={{color : 'black',
                '& .MuiPaper-root': {
                    background: 'black'
                    }
            }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                    <Header title="Alert"/>
                    <h4 style={{width:'100%', borderTop:'1px solid #6798bf', paddingTop:'13px'}}>삭제 하시겠습니까?</h4>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button variant="outlined" 
                                type="submit" 
                                style={{ color: 'white' ,background:'#6798bf'}}                                
                                onClick={handleDelete}
                                >
                                확인

                        </Button>
                    </div>
                </Box>
            </Dialog>
        </>
    );

}

export default DeleteDialog;