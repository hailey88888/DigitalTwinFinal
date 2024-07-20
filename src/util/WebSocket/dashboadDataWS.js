import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

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


export const connectHandler = (client,siteNo,callback) => {
    client.onConnect = () => {
      console.log("대시보드 LINE 그래프 웹소켓 연결")
        client.subscribe(`/dt/site/${siteNo}/facility/server1`, (message) => {
          // console.log("대시보드 웹소켓 데이터 : ",message);
          try {
            const parsedMessage = JSON.parse(message.body);
            // console.log("대시보드 웹소켓 데이터 : ",parsedMessage);
            const {cpu,disk,ram} =parsedMessage;
            if (callback) {
              callback({ cpu, disk, ram });

            }
          } catch (error) {
            console.error('오류가 발생했습니다:', error)
          }
        });
      
      }

      client.activate();
  };

  export const disconnectHandler = (client) => {
    console.log('대시보드 웹소켓 종료');
    client.deactivate();
  };

  





