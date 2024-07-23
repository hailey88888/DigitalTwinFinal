import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState,useMemo,useCallback,useRef } from "react";
import Component from "./Component";
import { managingActions } from "../../reducx/3dModeling/table";
import { createControlWebSocketClient, connectControlHandler } from "../../util/WebSocket/controlDataWS";
import { createWebSocketClient ,connectHandler,disconnectHandler} from "../../util/WebSocket/3dmodelingDataWS";


const Facility = ({facilityData}) =>{
    const [individualFac, setIndividualFac] = useState({});
    // const [facModelName, setFacModelName] = useState('');
    // const
  
    const { 
      "3dm_file": three_dm_file,model_path,
      pos_x,pos_y,pos_z,name,
      rotate_x,rotate_y,rotate_z
    } = facilityData;
    
    // 1) JSON : facility 데이터 
    const INDIVIDUAL_FAC_URL = useMemo(() => `/site/dt-model/${model_path}/${three_dm_file}`, [model_path,three_dm_file]);

    // const INDIVIDUAL_FAC_URL = `/site/dt-model/${model_path}/${three_dm_file}`;
    const fetchData = async () => {
    //  console.log("개별 시설 URL : ",INDIVIDUAL_FAC_URL);
      try {
        const response = await fetch(INDIVIDUAL_FAC_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIndividualFac(data);
        // setFacModelName(data.model_name);
       
      } catch (error) {
        console.error('Failed to fetch JSON:', error);
      }
    };

    // console.log("개별 시설 이름 : ",name);


    useEffect(() => {
        fetchData();
    }, [INDIVIDUAL_FAC_URL]);

  //  console.log("개별 시설 정보 : ",individualFac);


//----------------------------- 웹소캣 연결 (애니메이션 and 테이블)  --------------------------------------
// 시설 이름에 따라서 웹소켓 토픽이 달라짐
// const TOPIC_URL = `/dt/site/1/facility/${name}`;
const {wsSocketData,selectedFac,comName} = useSelector((state) => state.managingReducer); // 테이블 데이터
const {siteNo} = useSelector((state) => state.authReducer);

const dispatch = useDispatch();


//----------------------------[웹 소켓 연결 - components ] --------------------------------------------
const wsSocketDataRef = useRef([]);
const TOPIC_URL = useMemo(() => `/dt/site/${siteNo}/facility/${name}`, [name]);
const wsPatsData = useRef([]);


useEffect(() => {
  const client = createWebSocketClient();
  const handleData = (receivedData) => {
    //1. 자식 컴포넌트에게 전달할 데이터 => IndividualParts.jsx
    if(receivedData){
      const{topic,component} = receivedData;
      if(component&&component[0] && TOPIC_URL===topic){
        const {name,parts,timelaps} = component[0];

        // console.log("component[0] : ",component[0]);
        wsPatsData.current = {
          topic : topic,
          name : name,
          parts : parts,
          timelaps : timelaps
        };
      }
    }
    
    //2. 테이블에 전달할 데이터 => (In Manage)Table.jsx
    if(name===selectedFac){
      const{component} = receivedData;
      const manageTableData = component.find(component => component.name === comName)?.parts || [];
      // console.log("1",manageTableData);
      dispatch(managingActions.getTableIndivComData(manageTableData));
    }

  };



  if (name !== '') {
    connectHandler(TOPIC_URL, client, handleData);
  }

  return () => {
    disconnectHandler(client);
    wsSocketDataRef.current = [];
    dispatch(managingActions.getWsSocketData(null)); 
    dispatch(managingActions.getTableIndivComData([]));
  };
}, [name, siteNo, TOPIC_URL, dispatch,wsPatsData,selectedFac,comName]);

useEffect(() => {
  wsSocketDataRef.current = wsSocketData;
}, [wsSocketData]);



//----------------------------[웹 소켓 연결 - control ] --------------------------------------------
const wsControlDataRef = useRef([]);
const TOPIC_URL_CONTROL = useMemo(() => `/dt/site/${siteNo}/facility/${name}/control`, [siteNo,name]);
const handleControlData = useCallback((receivedData) => {
  dispatch(managingActions.getWsControlData(receivedData));
}, [dispatch]);


useEffect(() => {
  const client = createControlWebSocketClient();
  if (name !== '') {connectControlHandler(TOPIC_URL_CONTROL, client, handleControlData);}
  return () => {
    disconnectHandler(client);
    wsControlDataRef.current = [];
    dispatch(managingActions.getWsControlData(null)); 
  };
}, [ TOPIC_URL_CONTROL, handleControlData, dispatch]);


    return(
        <group
            key={`${INDIVIDUAL_FAC_URL}`}
            position={[pos_x,pos_y,pos_z]}
            rotateX={rotate_x}
            rotateY={rotate_y}
            rotateZ={rotate_z}
        >
          {/* case 1. 설비 : 컴포넌트가 있는 경우  */}
            {individualFac.component && individualFac.component.length > 0 &&
                individualFac.component.map((item,index)=>{
                    return(
                        <Component
                            partsData = {wsPatsData.current}
                            individualFacNum = {name}
                            individualComData = {individualFac.component[index]}         
                        />  
                    );
            })} 
        </group>
        // <></>
    );


}


export default Facility;