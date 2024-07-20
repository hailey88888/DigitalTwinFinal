import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';

const ConnectNulls = () => {
    const [connectNulls, setConnectNulls] = useState(true);
    return (
        // <Stack sx={{ width: '100%', height:'90%' }}>
        <div style={{height:'90%', width:'100%'}}>
          <h3 style={{paddingLeft:'15px', paddingTop:'7px'}}>ConnectNulls</h3>
          <div style={{height:'60%', width:'100%', paddingLeft:'15px'}}>
            <FormControlLabel
              checked={connectNulls}
              control={
                <Checkbox onChange={(event) => setConnectNulls(event.target.checked)} />
              }
              label="connectNulls"
              labelPlacement="end"
            />
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20] }]}
              series={[
                {
                  data: [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8],
                },
                {
                  data: [null, null, 5.5, 2, null, null, 8.5, 1.5, 5],
                  connectNulls,
                  area: true,
                },
              ]}
              sx={{width:'100%',height:'100%'}}

              margin={{ top: 10, bottom: 20 }}
              skipAnimation
            />
          </div>
        {/* </Stack> */}
        </div>
      );
    }


export default ConnectNulls;
