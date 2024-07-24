
import { useFrame } from '@react-three/fiber';
import { useRef, useState,useMemo, forwardRef} from "react";
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import {  useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispatch } from 'react-redux';
import { siteBuildingActions } from '../../reducx/3dModeling/siteBuilding';
import { managingActions } from '../../reducx/3dModeling/table';
// ----------------------- GLRF 로더 -----------------------
const createGLTFLoader = async() => {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
    const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader');
    const { KTX2Loader } = await import('three/examples/jsm/loaders/KTX2Loader');

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/path/to/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('/path/to/basis/');
    loader.setKTX2Loader(ktx2Loader);
    return loader;
}

// ------------------------ 테이블에 표시되는 데이터와 관련된 모델 색상 변경 ------------------------
const SetColor = ({ object, color, originalMaterials }) => {
  useEffect(() => {
    if (object) {
      object.traverse((child) => {
        if (child.isMesh) {
          if (color === null) {
            child.material = originalMaterials[child.uuid] || child.material;
          } else {
            if (!originalMaterials[child.uuid]) {
              originalMaterials[child.uuid] = child.material;
            }
            child.material = new THREE.MeshStandardMaterial({ color });
          }
        }
      });
    }
  }, [object, color, originalMaterials]);

  return null;
};


//-------------------------------- 자식 요소 동적으로 추가 --------------------------------------------
const Parts = forwardRef(({ comName, individualPartsData, parts_path, individualFacNum, partsData }, ref) => {
  const dispatch = useDispatch();
  const {siteNo} = useSelector((state) => state.authReducer);

  //1. 받아온 파트 데이터들의 정보들 
  const {rotate_axis_x,rotate_axis_y,rotate_axis_z,
        rotate_point_x , rotate_point_y ,rotate_point_z,
        pos_x,pos_y,pos_z,name,file,parts,scale } = individualPartsData;
  
  //2. 전역 데이터들 
  const {wsSocketData,comName : selectedCom,selectedComTopic,wsControlData,childPosition} = useSelector((state) => state.managingReducer); 

// ----------------------- 1. GLB 파일 불러오기 => 로더 -----------------------
  //1. 렌더링을 위한 GLB 파일 주소
  const glbUrl = `/site/dt-model/${parts_path}/${file}`;

  //2. 랜더링 될 파트 데이터들
  const [uploadedModels, setUploadedModels] = useState({});
    const uploadModeling = async () => {
        const loader = await createGLTFLoader();
        loader.load(
            glbUrl,
            (gltf) => {
              setUploadedModels((prevModels) => ({
                ...prevModels,
                [individualPartsData.name]: gltf.scene
              }));
              // Save original materials
              const initialMaterials = {};
              gltf.scene.traverse((child) => {
                if (child.isMesh) {
                  initialMaterials[child.uuid] = child.material;
                }
              });
              setOriginalMaterials(initialMaterials);
            },

            
            undefined,
            (error) => {
                console.error('An error happened', error);
            }
        );
    };

  //3. 렌더링 되자마자 모델 데이터 가져오기
    useEffect(() => {
        uploadModeling();
    }, [glbUrl, individualPartsData.name]);
  
// ------------------------ 2. 웹소켓 데이터에서 타임랩스 , 각도 데이터 추출하기 ------------------------
//----------------------- 2-2. 웹소켓 데이터 찾아가기 ------------------------
  const wsComData = useRef({}); 
  const TIMELAPSE = useRef(0); 
  const animationDATA = useRef({}); 
  const angleDATA = useRef(0); 
  const wsTopic = useRef(''); 
  const angle = useRef(0);
  const curValue = useRef(0);
  const TOPIC_URL = `/dt/site/${siteNo}/facility/${individualFacNum}`;
  // const ref = useRef({}); 
  const colorURL = useRef('');
  const groupRef = useRef(new THREE.Group());


  //2. 새로운 웹소켓 데이터가 올때마다 각도 데이터가 있는 경우
  let totalDelta = 0;
  const rotateAxis = new THREE.Vector3(rotate_axis_x, rotate_axis_y, rotate_axis_z);
  const point = new THREE.Vector3(rotate_point_x, rotate_point_y, rotate_point_z);
  // const rotateElur = new THREE.Euler(rotate_axis_x, rotate_axis_y, rotate_axis_z, curValue.current * (Math.PI / 180));

  useEffect(()=>{
    dispatch(siteBuildingActions.getNumOfDataRetievals(0));
  },[])
  
  
  useEffect(() => {
      return () => {
        // 컴포넌트 언마운트 시 useFrame 업데이트 중단
        dispatch(siteBuildingActions.getNumOfDataRetievals(0));
        console.log("useFrame 중단");
        curValue.current = 0;
        wsComData.current = {};
        animationDATA.current=0;
        angleDATA.current=0;
        wsTopic.current=0;
        angle.current=0;
        curValue.current=0;
        TIMELAPSE.current=0;
      };
  }, []);


// ------------------------ 2. 웹소켓 데이터에서 타임랩스 , 각도 데이터 추출하기 ------------------------

const matrix = new THREE.Matrix4();
const inversePivot = point.clone().negate();

const updateRotation = () => {
  if (curValue.current !== 0 && groupRef.current) {
    matrix.makeRotationAxis(rotateAxis, curValue.current * (Math.PI / 180));
    groupRef.current.position.add(inversePivot);
    groupRef.current.applyMatrix4(matrix);
    groupRef.current.position.add(point);
  }
};


//------------------------------------[ partsData ]---------------------------------
const countNum = useRef(0);
useEffect(() => {
  if (countNum.current >= 0 && countNum.current < 3) {
        countNum.current++;
  } else if (wsSocketData && countNum.current >= 3) {
        countNum.current = 1;
  } 
  if (partsData) {
    const { name: partWSName, parts, timelaps, topic } = partsData;
    if (Array.isArray(parts) && topic === TOPIC_URL && comName === partWSName) {
      const data = parts.find((item) => item.name === name);
      // console.log(data);
      if (data && Object.keys(data).length !== 0) {
        if (Array.isArray(data.data)) {
          const angleData = data.data.find((item) => item.data_name === 'angle');
          const {cur_nvalue,nvalue} = angleData;
          curValue.current = cur_nvalue;
          angle.current = nvalue;
          TIMELAPSE.current = timelaps;
        }
      }
    }
      groupRef.current.rotation.set(0, 0, 0); // 회전 초기화
      groupRef.current.position.set(pos_x, pos_y, pos_z); // 위치 초기화
      updateRotation();
    totalDelta = 0;
  }

}, [partsData]);

//----------------------- 3. 추출 한 데이터로 애니메이션 적용하기 ------------------------
let theta = 0;
useFrame((state, delta) => {
    const deltaTime = delta * 1000;
    theta = ((deltaTime * angle.current) / (TIMELAPSE.current+100)) * (Math.PI / 180);
    if (totalDelta <= (TIMELAPSE.current+100)) {
      groupRef.current.position.add(inversePivot);
      matrix.makeRotationAxis(rotateAxis, theta);
      groupRef.current.applyMatrix4(matrix);
      groupRef.current.position.add(point);
      totalDelta += deltaTime;
    } else {
      curValue.current = 0;
      angle.current = 0;
    }
});

  
// ---------------------- 4. 자식요소 지정 및 컨트롤 --------------------------------------
const groupURL = `/dt/site/${siteNo}/facility/${individualFacNum}/${comName}/${name}`;
const { scene } = useThree();
const childRef = useRef(new THREE.Group());


// id값으로 그룹 찾기
const findGroupById = (id) => {
  let foundGroup = new THREE.Group();
  scene.traverse((child) => {
    if (child.userData && child.userData.id === id) {
      foundGroup = child;
    }
  });
  return foundGroup;
};

// 1. 웹소켓 컨트롤 데이터 올때마다 부모 + 자식 지정 
// 2. 자식 컨트롤 (위치 바꾸기)
useEffect(() => {
  if (wsControlData) {
    const { component } = wsControlData;
    if (component) {
      const { child_parts, parent_parts } = component[0];
      const { pos_x, pox_y, pox_z, name: childURL } = child_parts;
      const { name: parentURL } = parent_parts;
      const child = findGroupById(childURL);
      const parent = findGroupById(parentURL);
      if (child && parentURL === groupURL) {
        parent.add(child);
        childRef.current = child;
        groupRef.current = parent;
        dispatch(managingActions.getChildPosition({ pos_x, pos_y: pox_y, pos_z: pox_z }));
        childRef.current.position.set(pos_x, pox_y, pox_z);
      }
    }
  }
}, [wsControlData, groupURL, dispatch]);


//partsData가 wsControlData보다 더 자주 바뀜 => partsData에 맞춰서 같이 호출이 되어야함
useEffect(()=>{
  if(childRef.current){
    const { pos_x, pos_y, pos_z } = childPosition;
    childRef.current.position.set(pos_x, pos_y, pos_z);
  }

},[childPosition,partsData]);


//----------------------- 5. 색상 지정하기 ------------------------
    // 원래 색상 데이터
    const [originalMaterials, setOriginalMaterials] = useState({});
    // // 현재 색상 데이터
    const [currentColor, setCurrentColor] = useState(null);
    colorURL.current = `/dt/site/${siteNo}/facility/${individualFacNum}/${selectedCom}`
    const computedColor = useMemo(() => {

      const colorBoolean = wsComData.current && wsComData.current.name === selectedCom && colorURL.current === selectedComTopic;
      if ( colorBoolean) {
        return "#CCFF99";
      }
      return null;
    }, [selectedCom,selectedComTopic]);
    useEffect(() => {      
      setCurrentColor(computedColor);
    }, [computedColor]);


  return (
      <group
          userData={{id: groupURL}} //id값을 가지는 방법 useData 사용하기
          position={[pos_x,pos_y,pos_z]}
          name={groupURL}
          key={`${glbUrl}-${name}-${TOPIC_URL}`}
          ref={groupRef}
      >
          {uploadedModels[name] && (
            <primitive
              key={`${glbUrl}-${name}-${TOPIC_URL}`}
              object={uploadedModels[name]}
              scale={Array(3).fill(scale)}
            >
            {/* <SetColor object={uploadedModels[name]} color={currentColor} originalMaterials={originalMaterials} /> */}
            </primitive>
          )}
          {parts && parts.length > 0 &&
              <Parts
                  partsData={partsData}
                  comName={comName}
                  individualPartsData={parts[0]}
                  parts_path={parts_path}
                  individualFacNum={individualFacNum}
              />
          }
      </group>
  );
});



export default Parts;

