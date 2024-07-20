// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Slider from '@mui/material/Slider';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createWebSocketClient,connectHandler,disconnectHandler } from '../../util/WebSocket/dashboadDataWS';
import { CircularProgress} from "@mui/material";
import { dashboardActions } from '../../reducx/dashboard';
import { useDispatch } from 'react-redux';

export default function BarChartData(){
  const dispatch = useDispatch();
  const { userID, siteNo } = useSelector((state) => state.authReducer);
  const [webSocketData, setWebSocketData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [], // x축 값
    series: []  // 시리즈 데이터
  });

  // 웹소켓 연결
  useEffect(() => {
    const client = createWebSocketClient();

    console.log("바그래프");
    connectHandler(client,siteNo, (receivedData) => {
      const { disk } = receivedData;
      setWebSocketData((prevData) => {
        const newData = [disk, ...prevData];
        if (newData.length > 20) {
          newData.pop(); // 배열의 마지막 요소 제거
        }
        return newData;
      });
    });

    return () => {
      disconnectHandler(client);
    };
    }, [siteNo]);

  // 웹소켓 데이터 처리
  useEffect(() => {
    if (webSocketData.length > 0) {
      const labels = webSocketData.map((item) => item.title);
      const series = webSocketData[0].map((item, index) => ({
        label: item.title,
        data: webSocketData.map(data => parseInt(data[index].usage))
      }));
      setChartData({ labels, series });
    }
  }, [webSocketData]);


  


  return (
    <div style={{marginRight:'30px', height:'100%'}}>

    {/* <div style={{height:'30px', width:'50%', backgroundColor:'#2E3235',paddingLeft:'10px', paddingTop:'3px', color:'#4A8ACA'}}>
    Disk usage rate
    </div> */}
    <h3 style={{paddingLeft:'15px', paddingTop:'7px'}}>Disk usage rate</h3>
    {webSocketData.length > 0 
    ? 
     <BarChart
     xAxis={[
       {
         scaleType: 'band',
         data: chartData.labels,
       },
     ]}
     series={chartData.series.map((seriesData, index) => ({
       label: seriesData.label,
       data: seriesData.data,
     }))}
     //width={500}
     //sx={{pt:'50px'}}
      height={230}
   />
     :
    <CircularProgress color="success" size={100} 
          sx={{
             position: 'fixed',
             top: '30%',
             left: '35%',
             transform: 'translate(-50%, -50%)',
          }}
      />
    }
    
      
    </div>
     
  );
}