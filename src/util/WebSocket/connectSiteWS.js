import { Client } from '@stomp/stompjs';

export const createSyncWsClient  = () => {
  console.log("싱크 웹소켓 생성!");
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
  

// export const wsSyncDataHandler = (client, siteNo) => {
//   const URL = `/app/dt/site/${siteNo}/control/resquest`;

//   const message = {
//     "command" : "sync"
//   }
//   const headers = {
//     "host":"digitaltwin"
//   }
//     client.onConnect = () => {
//       console.log("싱크 웹소켓 연결!");
//         client.send("/app/dt/site/1/control/resquest", headers, JSON.stringify(message));
//     };
//   }
  
  export const wsSyncDataHandler = (client, siteNo) => {
    // const URL = `/app/dt/site/${siteNo}/control/resquest`;
    
    const message = {
      "command": "sync"
    };
  
    const headers = {
      "host": "digitaltwin"
    };
  
    client.onConnect = () => {
      console.log("싱크 웹소켓 연결!");
      client.publish({
        destination: '/app/dt/site/1/control/request',
        headers: headers,
        body: JSON.stringify(message)
      });
    };
  
    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
  
    client.activate();
  };



  
  export const disconnectHandler = (client) => {
    console.log('웹소켓 종료');
    client.deactivate();
  };
