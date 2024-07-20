import { Client } from '@stomp/stompjs';


export const createControlWebSocketClient  = () => {
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


  export const connectControlHandler = (TOPIC_URL,client, callback) => {
    client.onConnect = () => {
      console.log("컨트롤 웹소켓 연결!!");  
        // client.subscribe(`/dt/site/1/facility/line1`, (message) => {
        client.subscribe(TOPIC_URL, (message) => {
          // console.log("message : ",message);
          try {
            const parsedMessage = JSON.parse(message.body);
            const {component} = parsedMessage;
            // console.log(" 컨트롤 웹소켓 데이터:", parsedMessage);
            if (callback) {
              //  console.log("TOPIC_URL : ",TOPIC_URL, component);
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


  export const disconnectHandler = (client) => {
    console.log('웹소켓 종료');
    client.deactivate();
  };
