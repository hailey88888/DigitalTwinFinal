import { Client } from '@stomp/stompjs';


export const createWebSocketClient  = () => {
  return new Client({
    brokerURL :'/ws',
    connectHeaders :{},
    debug:(str)=>{
   //   console.log(str);
    },
    reconnectDelay: 5000, // 연결이 끊어졌을 때 다시 연결을 시도하는 지연 시간 (ms)
    heartbeatIncoming: 4000, // 서버로부터의 심장박동 주기 (ms)
    heartbeatOutgoing: 4000, // 서버로의 심장박동 주기 (ms)
  });
}


  export const disconnectHandler = (client) => {
    console.log('웹소켓 종료');
    client.deactivate();
  };

  
  const reconnectInterval = 5000; // 재연결 시도 간격 (밀리초)
  const dataCheckInterval = 30000; // 데이터 수신 체크 간격 (밀리초)
  let isReconnecting = false;


  export const connectHandler = (TOPIC_URL,client, callback) => {
    // console.log("TOPIC_URL : ",TOPIC_URL);
    client.onConnect = () => {
      console.log("웹소켓 연결!!");  
        client.subscribe(TOPIC_URL, (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            // console.log("message : ",parsedMessage);
            const {component} = parsedMessage;
            // console.log("웹소켓 데이터:", parsedMessage);
            if (callback) {
              // console.log("TOPIC_URL : ",TOPIC_URL, component);
              callback({"topic":TOPIC_URL, component});
            }
          } catch (error) {
            console.error("오류가 발생했습니다:", error);
          }
      });

      
    };

  
    client.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };
  
    client.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
    };

    client.activate();
  };




  // export const connectHandler = (TOPIC_URL,client, siteNo, callback) => {
  //   console.log("TOPIC_URL : ",TOPIC_URL);
  //   client.onConnect = () => {
  //     console.log("웹소켓 연결!!");  
  //       // client.subscribe(`/dt/site/1/facility/line1`, (message) => {
  //       client.subscribe(TOPIC_URL, (message) => {
  //         try {
  //           const parsedMessage = JSON.parse(message.body);
  //           const {component} = parsedMessage
  //           console.log("웹소켓 데이터:", parsedMessage);
  //           if (callback) {
  //             callback(component);
  //           }
  //         } catch (error) {
  //           console.error("오류가 발생했습니다:", error);
  //         }
  //     });

      
  //   };

  
  //   client.onStompError = (frame) => {
  //     console.error('Broker reported error:', frame.headers['message']);
  //     console.error('Additional details:', frame.body);
  //   };
  
  //   client.onWebSocketError = (event) => {
  //     console.error('WebSocket error:', event);
  //   };

  //   function handleDisconnect(callback) {
  //     if (!isReconnecting) {
  //       isReconnecting = true;
  //       console.log(`웹소켓 재연결 시도 중... ${reconnectInterval / 1000}초 후 재시도합니다.`);
  //       setTimeout(() => {
  //         connectWebSocket(callback);
  //         isReconnecting = false;
  //       }, reconnectInterval);
  //     }
  //   }

  //   // client.onWebSocketClose= () => {
  //   //   console.log("웹소켓 연결이 끊겼습니다.");
  //   //   handleDisconnect(callback);
  //   // }
  
  //   client.activate();
  // };





