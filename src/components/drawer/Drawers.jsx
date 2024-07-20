import { Box,Button } from "@mui/material";
import SiteForm from '../form/site/SiteForm';
import UserForm from "../form/user/UserForm";
import DashboardCodeForm from "../form/dashboardCode/DashboardCodeForm";
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector , useDispatch} from 'react-redux';
import BusinessIcon from '@mui/icons-material/Business';
import Header from "../Header";


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

  
const Drawers = ({url}) => {
    const {updateData}= useSelector((state) => state.commonReducer);

    return (
        <>
            {url === 'site' &&
                <Box 
                    id="생성 drawer"
                    sx={{backgroundColor:'black', pl:"350px", pr:"350px", pb:"60px", pt:'30px',
                    }}>
                        <SiteForm/>
                </Box>
            }
            {url ==='user' &&
                <Box 
                id="생성 drawer"
                sx={{backgroundColor:'black', pl:"350px", pr:"350px", pb:"60px", pt:'30px',
                }}>
                    <UserForm/>
                </Box>
            }
            {url ==='dshCode' &&
                <Dialog
                    // id="draggable-dialog-body"
                    open={true}
                    fullWidth={true}
                    maxWidth="lg"
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {/* -----------------[ Header 부분 ]-------------------- */}
                    <div
                        id='dshCodeHeader'
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
                                <Header title={`No. ${updateData.dashboardCodeNo} 대시보드코드 편집`} 
                                />
                            ) : (
                                <Header title="대시보드코드 생성" />
                            )}
                        </div>

                        {/* Create | Edit 버튼 */}
                        <Box
                            justifyContent="flex-end"
                            sx={{ pl: "10px" }}
                        >
                            {updateData ? (
                                <Button
                                    type="submit"
                                    style={{ color: '#6798bf' }} 
                                    variant="contained"
                                //onClick={handleEditSubmit}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    style={{ color: '#6798bf' }} 
                                    variant="contained"
                                    //onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            )}
                        </Box>
                    </div>
                    </DialogTitle>

                    <DashboardCodeForm/>
                </Dialog>
            }
          
        </>
    );
}

export default Drawers;