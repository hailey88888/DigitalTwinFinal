import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { facilityActions } from '../../../reducx/facility';
import { useDispatch , useSelector} from 'react-redux';

export const IOSSwitch = (props) => {
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    console.log("event.target.checked ",event.target.checked );
    if(event.target.checked){
      dispatch(facilityActions.getSwitchData('Y'))
    }else dispatch(facilityActions.getSwitchData('N'))
  }

  const {yesOrNo}= useSelector((state) => state.facilityReducer);


  const StyledSwitch = styled((props) => (
    <Switch 
      focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}
      onChange={handleChange}
      checked={yesOrNo === 'Y'}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return <StyledSwitch {...props} />;
}
