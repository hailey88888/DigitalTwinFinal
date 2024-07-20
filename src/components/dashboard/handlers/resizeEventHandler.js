
 const screenWidth = window.innerWidth; 
 const screenHeight = window.innerHeight; 


export const getResizeEventListener = () => {

        return () => {
          const standardWidth =2460;
          const standardHeight=1300;
          const root = document.querySelector("#root");

          const resizeDiv = document.querySelector("#dashBody");
      
          resizeDiv.style.height = root.clientHeight;
          resizeDiv.style.width = root.clientWidth*0.9;

          let width = root.clientWidth;
          let height = width * (standardHeight / standardWidth); 

          const zoom = height / standardHeight; 
          console.log("비율 : ",zoom);
          resizeDiv.style.zoom = zoom; 

      }
  }



export const getResizeEventListener1 = () => {
    return () => {
      const standardWidth = window.innerWidth;
      const standardHeight=1300;
      const root = document.querySelector("#root");

      const resizeDiv = document.querySelector("#dashBody");
  
      resizeDiv.style.height = root.clientHeight;
      resizeDiv.style.width = root.clientWidth*0.9;

      let width = window.innerWidth;
      let height = width * (window.innerHeight / window.innerWidth); 

      const zoom = height / window.innerHeight; 
      console.log("비율 : ",zoom);
      resizeDiv.style.zoom = zoom; 
      return zoom;

  }
}

// export const getResizeEventListener1 = () => {
//   let zoom = 1; // Initialize zoom value
//   return () => {
//     const root = document.querySelector("#root");
//     const resizeDiv = document.querySelector("#dashBody");

//     const standardWidth = window.innerWidth; // Use the current window width as the standard width
//     const standardHeight = window.innerHeight; // Use the current window height as the standard height

//     resizeDiv.style.height = root.clientHeight + "px";
//     resizeDiv.style.width = (root.clientWidth * 0.9) + "px";

//     let width = root.clientWidth;
//     let height = width * (standardHeight / standardWidth);

//     zoom = height / standardHeight;
//     resizeDiv.style.zoom = zoom;

//     console.log("zoom : ",zoom);
//     return zoom;
//   };
// };







export const changeRoot = (h,w,zoom) => {
  const dashBody = document.querySelector("#dashBody");
  dashBody.style.height = h/zoom;
  dashBody.style.width = w/zoom;
}

