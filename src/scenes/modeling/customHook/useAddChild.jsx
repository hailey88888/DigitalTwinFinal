import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managingActions } from '../../../reducx/3dModeling/table';
import * as THREE from 'three';



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
  
const useAddChild = () =>{
    const {wsControlData} = useSelector((state) => state.managingReducer); 
    const dispatch = useDispatch();

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
            dispatch(managingActions.getChildPosition({ pos_x:pos_x, pos_y: pox_y, pos_z: pox_z }));
        }
        }
    }
    }, []);
}

export default useAddChild;