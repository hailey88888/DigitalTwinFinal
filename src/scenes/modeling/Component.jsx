import Parts from "./Parts";
import { useEffect, useState,useMemo } from "react";


const Component = ({individualComData,individualFacNum,partsData}) => {
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
                                    <Parts
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


export default Component;