
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import { useSelector } from "react-redux";
import { dshItemActions } from "../../../reducx/dashboardItem";
import { deleteDshboardItem } from "../../../util/restAPI/siteAdmin/dashITEM";
import Header from "../../Header";


const DeleteDataItemDialog = () => {
const dispatch = useDispatch();
const {deleteBoxId}= useSelector((state) => state.dashboardItemReducer);
const {siteNo,userID } = useSelector((state) => state.authReducer);
const {dashNo } = useSelector((state) => state.dashboardReducer);


    const handleDelete = async() => {
        console.log("userID : ",userID);
        console.log("deleteBoxId : ",deleteBoxId);
        await deleteDshboardItem({siteNum :siteNo , dashCode:dashNo, userId :userID, dashItem:deleteBoxId});
        dispatch(dshItemActions.getDeleteItemDialog(false));


    }


    const handleClose = () => {
        dispatch(dshItemActions.getDeleteItemDialog(false));
    }

    return(
        <>
           <Box p="25px" sx={{ width : 450,
            // color : 'black',
            backgroundColor:'black', 
            // border:'1px solid gray'
            }}>
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
            <Header title="Alert"/>        
              <h4 style={{width:'100%', borderTop:'1px solid #6798bf', paddingTop:'13px'}}>대시보드 아이템을 삭제하시겠습니까?</h4>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button 
                type="submit" 
                style={{ color: 'white' ,background:'#6798bf'}}                                
                variant="outlined" 
                onClick={handleDelete}
                >
                확인
              </Button>
              </div>
          </Box>
        </>
    );

}

export default DeleteDataItemDialog;