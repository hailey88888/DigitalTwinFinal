


export const getSignInResizeEventHandler =() => {
    return () => {
        const standardWidth =2460;
        const standardHeight=1300;
        const root = document.querySelector("#root");

        const resizeDiv = document.querySelector("#singinBody");
    
        resizeDiv.style.height = root.clientHeight;
        resizeDiv.style.width = root.clientWidth*0.9;

        let width = root.clientWidth;
        let height = width * (standardHeight / standardWidth); 
        const zoom = height / standardHeight; 
        resizeDiv.style.zoom = zoom; 

        
    }
}