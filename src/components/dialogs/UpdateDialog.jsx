import FlightInputForm from '../../scenes/form/FlightInputForm';
import { useDispatch } from 'react-redux';
import { flightScheduleActions } from '../../reducx/flightSchedule';
import { Box } from "@mui/material";


const UpdateDialog = ({url,updateData}) => {
    const dispatch = useDispatch();
    // 업데이트완료 되었습니다
    const createClose = () => {
        dispatch(flightScheduleActions.setCreateDialogForm(false));
    };  

    console.log('UpdateDialog-updateData : ',updateData)
    return (
        <>
            <Box>
                {url === 'flightSchedule' 
                    && <FlightInputForm 
                            updateData = {updateData}
                            routeId = {updateData.route_id}
                        />
                }
            </Box>
        </>
    );
}
export default UpdateDialog;