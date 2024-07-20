// import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useSelector } from 'react-redux';
import { createWebSocketClient,connectHandler,disconnectHandler } from '../../util/WebSocket/dashboadDataWS';
import { CircularProgress} from "@mui/material";
import { useDispatch } from 'react-redux';


// const LineChartData = () => {
//   const dispatch = useDispatch();
//   const { userID, siteNo } = useSelector((state) => state.authReducer);
//   const [webSocketData, setWebSocketData] = useState([]);
//   const [chartData, setChartData] = useState({
//     labels: Array.from({ length: 20 }, (_, i) => i + 1), // 초기 x축 값
//     datasets: []
//   });

//   //웹소켓 데이터 
//   useEffect(() => {
//     const reversedData = [...webSocketData].reverse(); 
//     if (webSocketData.length > 0) {
//       setChartData({
//         labels: Array.from({ length: 20 }, (_, i) => i + 1), // 초기 x축 값
//         datasets: reversedData[0].map((item, index) => ({
//           label: item.title,
//           data: reversedData.map(data => parseInt(data[index].usage)), // 각 항목의 'usage'를 데이터로 사용
//           borderColor: 'rgba(75,192,192,1)',
//           backgroundColor: 'rgba(75,192,192,0.2)',
//           fill: true,
//         }))
//       });
//     }
//   }, [webSocketData]);


//   console.log("webSocketData : ",webSocketData);
//   console.log("webSocketData 뒤집음 : ",webSocketData.reverse());
//   //웹소켓 연결
//   useEffect(() => {
//     const client = createWebSocketClient();
//     console.log("라인 그래프");

//     connectHandler(client,siteNo, (receivedData) => {
//       const { cpu } = receivedData;
//       setWebSocketData((prevData) => {
//         const newData = [cpu, ...prevData];
//         if (newData.length > 20) {
//           newData.pop(); // 배열의 마지막 요소 제거
//         }
//         console.log("newData : ",newData);
//          return newData; // 배열을 뒤집어서 반환
//       });
//     });

//     return () => {
//       disconnectHandler(client);
//     };
//     }, [siteNo]);



//   return (
   
//     <>
//     <div style={{height:'30px', width:'100%', backgroundColor:'#2E3235', paddingLeft:'10px',paddingTop:'3px'}}>
//      CPU usage rate
//     </div>
//       {webSocketData.length > 0 
//         ?
//           <Line
//             data={chartData}
//             options={{
//               responsive: true,
//               animation: { duration: 0 },
//               scales: {
//                 y: {
//                   min: 0, // y축의 최소값
//                   max: 100 // y축의 최대값 (필요에 따라 조정)
//                 }
//               }
//             }}
//             style={{ width: '100%', height: '100%' }}
//           />
//         :
//           <CircularProgress color="success" size={100} 
//                 sx={{
//                   position: 'fixed',
//                   top: '30%',
//                   left: '35%',
//                   transform: 'translate(-50%, -50%)',
//                 }}
//             />
//         }
//     </>
//   );
// };



const LineChartData = () => {
  const dispatch = useDispatch();
  const { siteNo } = useSelector((state) => state.authReducer);
  const [webSocketData, setWebSocketData] = useState(Array(20).fill([{ usage: '', title: '' }]));

  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 20 }, (_, i) => i + 1), // x축 값 1부터 20까지
    datasets: []
  });

  // 웹소켓 데이터 처리
  useEffect(() => {
    if (webSocketData.length === 20 && webSocketData[19][0].usage !== '') { // 데이터가 20개일 때만 차트 데이터 업데이트
      setChartData({
        labels: Array.from({ length: 20 }, (_, i) => i + 1), // x축 값 1부터 20까지
        datasets: webSocketData[0].map((item, index) => ({
          label: item.title,
          data: webSocketData.map(data => parseInt(data[index].usage) || 0), // 각 항목의 'usage'를 데이터로 사용
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        }))
      });
    }
  }, [webSocketData]);

  // 웹소켓 연결
  useEffect(() => {
    const client = createWebSocketClient();
    console.log("라인 그래프");
    connectHandler(client, siteNo, (receivedData) => {
      const { cpu } = receivedData;
      setWebSocketData((prevData) => {
        const newData = [...prevData.slice(1), cpu]; // 새로운 데이터를 배열 끝에 추가하고 첫 번째 요소 제거
        return newData;
      });
    });

    return () => {
      disconnectHandler(client);
    };
  }, []);

  return (
    <>
      {/* <div style={{ height: '30px', width: '50%', backgroundColor: '#2E3235', paddingLeft: '10px', paddingTop: '3px', color: '#4A8ACA' }}>
        CPU usage rate
      </div> */}
      <h3 style={{paddingLeft:'15px', paddingTop:'7px'}}>CPU usage rate</h3>
      {webSocketData.length === 20 && webSocketData[19][0].usage !== '' 
        ? <Line
            data={chartData}
            options={{
              responsive: true,
              animation: { duration: 0 },
              scales: {
                y: {
                  min: 0, // y축의 최소값
                  max: 100 // y축의 최대값 (필요에 따라 조정)
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



export default LineChartData;

