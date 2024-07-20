import { useSelector, useDispatch} from "react-redux";
import IndividualParts from "./IndividualParts";
import { useEffect, useState,useMemo,useCallback,useRef } from "react";
import { Canvas ,useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { siteBuildingActions } from "../../../reducx/3dModeling/siteBuilding";
import Box from '@mui/material/Box';
import { createWebSocketClient ,connectHandler,disconnectHandler } from "../../../util/WebSocket/3dmodelingDataWS";
import { managingActions } from "../../../reducx/3dModeling/table";
import { createControlWebSocketClient, connectControlHandler } from "../../../util/WebSocket/controlDataWS";
import { createSyncWsClient ,wsSyncDataHandler } from "../../../util/WebSocket/connectSiteWS";
//--------------------------- 3. 개별 컴포넌트 생성-------------------------------------
const IndividualComponent = ({individualComData,individualFacNum,partsData}) => {
    const { "3dm_file": three_dm_file,model_path,name ,pos_x,pos_y,pos_z,
            rotate_x,rotate_y,rotate_z
          } = individualComData;


    const[indPartsData,setIndPartsData] = useState([]);
    useEffect(()=>{
      setIndPartsData(partsData);
    },[partsData])

    const INDIVIDUAL_COM_URL = useMemo(() => `/site/dt-model/${model_path}/${three_dm_file}`, [model_path,three_dm_file]);

    // const INDIVIDUAL_COM_URL = `/site/dt-model/${model_path}/${three_dm_file}`; 

    const [individualCom, setIndividualCom] =useState({});

    useEffect(() => {
     // console.log("개별 컴포넌트 URL :",INDIVIDUAL_COM_URL);
        const fetchData = async () => {
          try {
            const response = await fetch(INDIVIDUAL_COM_URL);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setIndividualCom(data);
          } catch (error) {
            console.error('Failed to fetch JSON:', error);
          }
        };
        fetchData();
    }, [INDIVIDUAL_COM_URL]);

    // console.log("개별 컴포넌트 정보 : ",individualCom);
    // console.log("individualFacNum : ",individualFacNum);

    // console.log("IndividualComponent partsData",partsData);
    // useEffect(()=>{

    // },[partsData]);

    return(
        <>
            <group 
              key={`${INDIVIDUAL_COM_URL}-${name}`}
              position={[pos_x,pos_y,pos_z]}
              rotateX={rotate_x}
              rotateY={rotate_y}
              rotateZ={rotate_z}
            >
              {individualCom.parts && individualCom.parts.length > 0 
                    ? 
                    individualCom.parts.map((item)=>{
                            return(
                                    <IndividualParts
                                        comName = {name}
                                        individualPartsData = {item}
                                        parts_path = {model_path}
                                        individualFacNum={individualFacNum}
                                        partsData = {indPartsData}
                                    />
                            )
                        })
                    :
                        null
                        
                }
            </group>
        </>
    )
}


//--------------------------- 2. 개별 [facility == components]시설(라인 or Base) 생성 -------------------------------------
//= > site Json 데이터의 facility데이터를 순회해서 개별 facility json 파일데이터를 HTTP 요청하기 
const FacilityModel = ({facilityData}) =>{
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
                        <IndividualComponent
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

function SceneManipulator({x,y,z}) {
    const { scene } = useThree();
  
    useEffect(() => {
      scene.translateX(x); // scene을 x축으로 -1000만큼 이동
      scene.translateY(y);
      scene.translateZ(z);
    }, [scene]);
  
    return null; // 렌더링할 필요가 없으므로 null 반환
  }



//---------------------------- 1. 사이트 생성 -------------------------------------
const BuildSite = () => {

  const dispatch = useDispatch();
  const [siteJsonData, setSiteJsonData] = useState(null); // 초기값을 null로 설정
  // 카메라
  const [camera, setCamera] = useState(null); // 초기값을 null로 설정
  // 조명
  const [light, setLight] = useState([]); // 초기값을 빈 배열로 설정
  // 시설
  const [facility, setFacility] = useState([]); // 초기값을 빈 배열로 설정
  // translate 
  const [translate, setTranslate] = useState(null); // 초기값을 null로 설정
  // 위치
  const [position, setPosition] = useState([0, 0, 0]); // 기본 위치 설정
  const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);


  const { siteNo } = useSelector((state) => state.authReducer);

  // ------------------------- JSON 요청 : site (JSON) -------------------------------------
  const SITE_URL = `/site/dt-model/site/${siteNo}/site-3dm.json`;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(SITE_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        setCamera(data.camera[0]);
        setLight(data.light);
        setFacility(data.facility);
        setTranslate(data.translate);
        setSiteJsonData(data);
        setPosition([data.origin_x, data.origin_y, data.origin_z]);
        dispatch(siteBuildingActions.getSiteModelName(data.model_name)); // 사이트 모델명
      }
    } catch (error) {
      console.error('Failed to fetch JSON:', error);
    }
  },SITE_URL,dispatch);


  useEffect(() => {   
    fetchData();
  }, [fetchData]);
  

  // Update aspect ratio on window resize
  useEffect(() => {
    const handleResize = () => {
      setAspect(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // --------------------------- 웹소켓 연결 : 싱크 데이터 --------------------------------------------
  useEffect(()=>{
    const syncClient = createSyncWsClient();
    wsSyncDataHandler(syncClient,siteNo);
  },[])

  // ------------------------------ JSON 요청 : 웹 소켓 데이터 와꾸 -----------------------------------
  /*
    useCallback을 사용하여 fetchHandler 함수를 메모이제이션합니다. 
    이렇게 하면 fetchHandler 함수가 불필요하게 재생성되지 않으며, 종속성 배열에 포함되어 있을 때만 다시 생성됩니다.
    useEffect의 종속성 배열에 fetchHandler를 포함하여, fetchHandler가 변경될 때만 useEffect가 실행됨
  */

  const WS_DATA_URL = `/site/dt-model/site/${siteNo}/site-dm.json`; 

  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(WS_DATA_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        const { facility } = data;
        const updatedData = facility.map((item) => ({
          name: item.name,
          topic: `/dt/site/${siteNo}/facility/${item.name}`,
          components: []
        }));
        dispatch(managingActions.getWsSocketData(updatedData));
      } 
    } catch (error) {
      console.error('Failed to fetch JSON:', error);
    }
  }, [WS_DATA_URL, dispatch]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);


  // ------------------------------- 로딩 ---------------------------------------
  if (!siteJsonData || !camera || !light || !translate || !position) {
    return (
      <Box sx={{ width: '100%' , paddingTop :'10%'}}>
        <h2 style={{paddingLeft:'45%'}}>Loading ..... </h2>
      {/* <LinearProgress color="success" sx={{width:'100%'}}/> */}
    </Box>
    );
  }

  return (
    <div style={{ height: '100%' }}>
      <Canvas
        style={{ height: '100%' }}
        camera={{
          position: [camera.pos_x, camera.pos_y, camera.pos_z],
          fov: camera.fov,
          far: camera.far,
          aspect: aspect,
          near: camera.near,
        }}
      >
        {translate && <SceneManipulator x={translate.pos_x} y={translate.pos_y} z={translate.pos_z} />}

        {light.length > 0 && light.map((item) => (
          <directionalLight
            key={item.name}
            intensity={item.intensity}
            position={[item.pos_x, item.pos_y, item.pos_z]}
            color={item.color}
          />
        ))}
        {/* <ambientLight intensity={2} /> */}
        <group
          position={position}
          key={siteJsonData.description}
        >
          {facility.length > 0 && facility.map((item, index) => (
            <FacilityModel
              key={item.model_name}
              facilityData={facility[index]}
            />
          ))}
        </group>

        <OrbitControls />
        <axesHelper args={[5]} />
        <gridHelper />


      </Canvas>
    </div>
  );
};


export default BuildSite;


