import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState,useMemo,useCallback,useRef } from "react";
import { Canvas  } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Box from '@mui/material/Box';
import Facility from "./Facility";
import { siteBuildingActions } from "../../reducx/3dModeling/siteBuilding";
import { managingActions } from "../../reducx/3dModeling/table";
import { createSyncWsClient ,wsSyncDataHandler} from "../../util/WebSocket/connectSiteWS";
import { useThree } from "@react-three/fiber";


function SceneManipulator({x,y,z}) {
    const { scene } = useThree();
  
    useEffect(() => {
      scene.translateX(x); // scene을 x축으로 -1000만큼 이동
      scene.translateY(y);
      scene.translateZ(z);
    }, [scene]);
  
    return null; // 렌더링할 필요가 없으므로 null 반환
  }




const Site = () => {

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
              <Facility
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


export default Site;