
const screenWidth = window.innerWidth; 
const screenHeight = window.innerHeight; 
const standardWidth =2460;
const standardHeight=1300;
const root = document.querySelector("#root");
let width = root.clientWidth;
let height = width * (standardHeight / standardWidth); 
const r = height / standardHeight; 
//좌표값 변경
export function updateXYRnD(boxes,position,id) {  
  const W= 2460 / 0.87;
  const H = 1300 / 0.76;
    const newBoxes = boxes.map((box) => {
      if (box.id === id) {
          return {
              ...box,
              id: box.id,
              // xr: position.x/ W ,
              // yr: position.y/ H,
              startxRatio: Math.ceil(position.x),
              startyRatio: Math.ceil(position.y),
  
          };
      }
      return box;
  });
  return newBoxes;
  }


//크기값 변경
export function updateWHRnD(boxes,w,h,id) {
  console.log("w: ", parseInt(w, 10)); // 10진수로 파싱

    const ratioW = parseInt(w, 10) / 2460;
    const ratioH = parseInt(h, 10) / 1300;
    console.log("크기값 변경 비율 : ",ratioW," || ",ratioH);

    const newBoxes = boxes.map((box) => {
      if (box.id === id) {
           return {
              ...box,
              widthRatio: Math.ceil(parseInt(w, 10)),
              heightRatio: Math.ceil(parseInt(w, 10))

          };
      }
      return box;
  });
    return newBoxes;
  }


  //화면 크기에 따라 변경
  export function updateRNDBOXES(createdRndBoxes,r,width,height){
    createdRndBoxes.forEach((box, index) => {
      if (box.id === id) {
      return updatedBox = {
        ...box,
        id:box.index,
        xr:box.wr*r*width,
        yr:box.yr*r*height,
        wr:box.wr*r*width,
        hr:box.hr*r*height
      };
    }
      return updatedBox;
    });

  }

  export function handleDragStop(createdRndBoxes, d, id) {
    const result = updateXYRnD(createdRndBoxes,d,id);
    return result;
  };


export function handleResizeStop(createdRndBoxes,ref,id) {
    const result = updateWHRnD(createdRndBoxes, ref.offsetWidth ,ref.offsetHeight ,id);
    return result;
  };

