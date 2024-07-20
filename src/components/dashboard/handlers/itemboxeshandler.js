

export const fromDataBase = (contents) => {
    let newBoxes = [];
    let dataType;
    for (let i = 0; i < contents.length; i++) {
  
        const {dash_type} = JSON.parse(contents[i].dashboardCodeData);
        
        newBoxes.push({
            id:contents[i].dashboardItemNo,
            dataType : dash_type,
            dashboardCodeNo:contents[i].dashboardCodeNo,
            auxData: contents[i].auxData,
            startxRatio: contents[i].startxRatio,
            startyRatio: contents[i].startyRatio,
            widthRatio: contents[i].widthRatio,
            heightRatio:contents[i].heightRatio,
            created : "yes",
        })
    }
    return newBoxes;
}


export const toDataBase = (items) => {

    if (!Array.isArray(items)) {
        items = [items];
    }
    
    let newBoxes = [];
    for (let i = 0; i < items.length; i++) {
        newBoxes.push({
            dashboardItemNo: items[i].created === "yes" ? items[i].id : "",
            dashboardCodeNo: items[i].dashboardCodeNo,
            auxData: items[i].auxData,
            startxRatio: items[i].startxRatio,
            startyRatio: items[i].startyRatio,
            widthRatio: items[i].widthRatio,
            heightRatio: items[i].heightRatio,
        });
    }
    return newBoxes;
}


//박스 ID를 생성하기
export const getBoxIdFromContents = (contents) =>{
   let boxId;
   console.log("contents : ",contents);
   if(contents){
    const maxIdElement = contents.reduce((max, current) => (current.dashboardItemNo > max.dashboardItemNo ? current : max));
    boxId = maxIdElement.dashboardItemNo
  }
  return parseInt(boxId);
}


//ver 2
export const toDataBase2 = (items) => {
    let newBoxes = [];
    for (let i = 0; i < items.length; i++) {
        newBoxes.push({
            dashboardItemNo :items[i].created ==="yes" ? items[i].id : "",
            dashboardCodeNo:items[i].dashboardCodeNo,
            auxData: items[i].auxData,
            startxRatio: items[i].startxRatio,
            startyRatio: items[i].startyRatio,
            widthRatio: items[i].widthRatio,
            heightRatio:items[i].heightRatio,
        })
    }
    return newBoxes;
}