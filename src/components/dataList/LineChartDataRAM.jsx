
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useSelector } from 'react-redux';
import { createWebSocketClient,connectHandler,disconnectHandler } from '../../util/WebSocket/dashboadDataWS';
import { CircularProgress} from "@mui/material";
import { useDispatch } from 'react-redux';

const LineChartDataRAM = () => {
    const { siteNo } = useSelector((state) => state.authReducer);
    const [webSocketData, setWebSocketData] = useState(Array(20).fill({ usage: '', title: '' }));
    const [chartData, setChartData] = useState({
      labels: Array.from({ length: 20 }, (_, i) => i + 1), // x축 값 1부터 20까지
      datasets: []
    });
  
    // 웹소켓 데이터 처리
    useEffect(() => {
      if (webSocketData.length === 20 && webSocketData[19].usage !== '') { // 데이터가 20개일 때만 차트 데이터 업데이트
        setChartData({
          labels: Array.from({ length: 20 }, (_, i) => i + 1), // x축 값 1부터 20까지
          datasets: [{
            label: 'RAM Usage',
            data: webSocketData.map(data => parseInt(data.usage) || 0), // 각 항목의 'usage'를 데이터로 사용
            borderColor: 'rgba(150,170,233,1)',
            backgroundColor: 'rgba(150,170,233,0.3)',
            fill: true,
          }]
        });
      }
    }, [webSocketData]);
  
    // 웹소켓 연결
    useEffect(() => {
      const client = createWebSocketClient();
      console.log("라인 그래프");
      connectHandler(client, siteNo, (receivedData) => {
        const { ram } = receivedData;
        setWebSocketData((prevData) => {
          const newData = [...prevData.slice(1), ram]; // 새로운 데이터를 배열 끝에 추가하고 첫 번째 요소 제거
          return newData;
        });
      });
  
      return () => {
        disconnectHandler(client);
      };
    }, [siteNo]);
  
    return (
      <>
        <h3 style={{ paddingLeft: '15px', paddingTop: '7px' }}>RAM usage rate</h3>
        {webSocketData.length === 20 && webSocketData[19].usage !== ''
          ? <Line
            data={chartData}
            options={{
              responsive: true,
              animation: { duration: 0 },
              scales: {
                y: {
                  min: 12000, // y축의 최소값
                  max: 12100 // y축의 최대값 (필요에 따라 조정)
                }
              }
            }}
            style={{ width: '100%', height: '90%' }}
          />
          : <CircularProgress color="success" size={100}
            sx={{
              position: 'fixed',
              top: '30%',
              left: '35%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        }
      </>
    );
  };
  
  export default LineChartDataRAM;