import { Box, Button, TextField } from "@mui/material";
import Header from "../../Header";
import BusinessIcon from '@mui/icons-material/Business';
import DashboardCodeForm from "../../form/dashboardCode/DashboardCodeForm";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from 'react';
import { dshcodeActions } from "../../../reducx/dashboardCode";
import DialogContent from '@mui/material/DialogContent';


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



const DashboardCodeDialog = () => {
    const {updateData}= useSelector((state) => state.commonReducer);
    const dispatch = useDispatch();


    const toggleDrawer = (newOpen) => {
        dispatch(updateData? dshcodeActions.getopenEditDrawer(newOpen) : dshcodeActions.getopenDrawer(newOpen) );
      
        };

    return (
        <Dialog
            id="Dialog"
            open={true}
            onClose={()=>toggleDrawer(false)}
            fullWidth={true}
            //maxWidth="xl"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            sx={{
                '& .MuiPaper-root': {
                  background: 'black'
                },
              }}
        

            PaperProps={{
                sx: {
                width: '80%', // 다이얼로그의 너비를 80%로 설정 (필요에 따라 조정 가능)
                maxWidth: '1800px', // 다이얼로그의 최대 너비를 800px로 설정 (필요에 따라 조정 가능)
                pl:'20px',
                pr:'-50px',
                }
            }}
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
                                  style={{ color: '#6798bf', }} 
                                  variant="contained"
                              //onClick={handleEditSubmit}
                              >
                                  Edit
                              </Button>
                          ) : (
                              <Button
                                  type="submit"
                                  style={{ color: '#6798bf', }} 
                                  variant="contained"
                                  //onClick={handleSubmit}
                              >
                                  Create
                              </Button>
                          )}
                      </Box>
                  </div>
          </DialogTitle>

          <DialogContent sx={{ overflow: 'auto', width:'100%' }}>
            <DashboardCodeForm/>
          </DialogContent>

        </Dialog>
    );
}

export default DashboardCodeDialog;