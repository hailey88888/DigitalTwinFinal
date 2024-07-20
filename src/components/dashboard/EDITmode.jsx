import {
  Menu, MenuItem,
} from "@mui/material";
import { dashboardActions } from "../../reducx/dashboard";
import { dshItemActions } from "../../reducx/dashboardItem";
import { Component } from "react";
import { getResizeEventListener } from "./handlers/resizeEventHandler";
import { connect } from "react-redux";
import { Rnd } from "react-rnd";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import ConnectNulls from "../dataList/ConnectNulls";
import DashedLineChart from "../dataList/DashedLineChart";
import PieChartWithPaddingAngle from "../dataList/PieChartWithPaddingAngle";
import TableScroll from "../dataList/TableScroll";
import LineChartData from "../dataList/LineChartData";
import BarChartData from "../dataList/BarChartData";
import Dialog from '@mui/material/Dialog';
import DeleteDataItemDialog from "../dialogs/dashboard/DeleteDataItemDialog";
import { dshcodeActions } from "../../reducx/dashboardCode";
import { toDataBase } from "./handlers/itemboxeshandler";
import { editDshboardItem } from "../../util/restAPI/siteAdmin/dashITEM";
import { QueryClient } from '@tanstack/react-query';
import { createDshboardItem } from "../../util/restAPI/siteAdmin/dashITEM";
import ModelData from "../dataList/ModelData";
import LineChartDataRAM from "../dataList/LineChartDataRAM";




class EDITmode extends Component {
    componentDidMount(){
        // Set up the resize event listener
    const resizeHandler = getResizeEventListener();
    window.onresize = resizeHandler;
       window.addEventListener('resize', this.handleResize);
    const initialZoom = resizeHandler();
    console.log("Initial zoom value:", initialZoom);
    this.setState({
            zoomValue : initialZoom
        });




        // window.addEventListener('resize', this.getResizeEventListener1());
    }

    // componentWillUnmount() {
    //     window.removeEventListener('resize',  this.getResizeEventListener1());
    //   }
    


//추가 1.
    constructor(props) {
        super(props);
        this.state = {
            rndboxes: props.items || [],
            contextMenu: {mouseX:null, mouseY:null},
            rndboxIndex: props.lastBoxNumber || 0,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            queryClient: new QueryClient(),
            location : {mouseX:null, mouseY:null},
            zoomValue : null,
        };
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.selectData = this.selectData.bind(this);
        this.handleDragStop=this.handleDragStop.bind(this);
        this.handleResizeStop = this.handleResizeStop.bind(this);

        this.deleteClose = this.deleteClose.bind(this);

        this.handleResize = this.handleResize.bind(this);
        
    }

    // handleContextMenu(event) {
    //     event.preventDefault();
    //     console.log("handleContextMenu 실행");
    //     this.setState({
    //         contextMenu: {
    //             mouseX: event.clientX,
    //             mouseY: event.clientY,
    //         }
    //     });
    // }


    handleContextMenu(event) {
        event.preventDefault();
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        this.setState({
            contextMenu: {
                mouseX: event.clientX,
                mouseY: event.clientY,
            },
            location : {mouseX:mouseX, mouseY:mouseY},
        });
    }


    handleCloseMenu() {
        this.setState({ contextMenu: null });
    }

    handleResize = (ref, id) => {
        this.setState(prevState => {
          const newBoxes = prevState.rndboxes.map((box) => {
            if (box.dashboardItemNo === id) {
              return {
                ...box,
                widthRatio: Math.ceil(parseInt(ref.style.width, 10)),
                heightRatio: Math.ceil(parseInt(ref.style.height, 10))
              };
            }
            return box;
          });
          //this.props.getItems(newBoxes);
          return { rndboxes: newBoxes };
        });
      }
      
    handleResizeStop = (ref, id) => {
        const updatedBox = this.state.rndboxes.find(box => box.dashboardItemNo === id);
        if (updatedBox) {
          editDshboardItem({ 
            siteNum: this.props.siteNo, 
            body: updatedBox, 
            userId: this.props.userID, 
            dashCode: this.props.dashNo 
          })
          .then(code => {
            console.log("리사이즈 POST 결과 : ", code);
          })
          .catch(error => {
            console.error("Error posting dashboard item:", error);
          });
        } else {
          console.error("해당하는 박스를 찾을 수 없습니다.");
        }
      }

    // handleResizeStop = (ref, id) => {
    //     //   // 상태 업데이트 및 콜백 함수로 HTTP 요청 수행
    //       this.setState(prevState => {
    //         const newBoxes = prevState.rndboxes.map((box) => {
    //             if (box.dashboardItemNo === id) {
    //                 return {
    //                     ...box,
    //                     widthRatio: Math.ceil(parseInt(ref.offsetWidth, 10)),
    //                     heightRatio: Math.ceil(parseInt(ref.offsetHeight, 10))
    //                 };
    //             }
    //             return box;
    //         });
    //         this.props.getItems(newBoxes);
    //         return { rndboxes: newBoxes };
    //     }, () => {
    //         const updatedBox = this.state.rndboxes.find(box => box.dashboardItemNo === id);
         
    //         if (updatedBox) {
    //             editDshboardItem({ 
    //                 siteNum: this.props.siteNo, 
    //                 body: updatedBox, 
    //                 userId: this.props.userID, 
    //                 dashCode: this.props.dashNo 
    //             })
    //             .then(code => {
    //                 console.log("리사이즈 POST 결과 : ", code);
    //             })
    //             .catch(error => {
    //                 console.error("Error posting dashboard item:", error);
    //             });
    //         } else {
    //             console.error("해당하는 박스를 찾을 수 없습니다.");
    //         }
    //     });
    // }
    
    handleDragStop = (e, data, id) => {
        console.log("handleDragStop 실행 :", data.x, data.y);
        const root = document.querySelector("#root");
        const rootRect = root.getBoundingClientRect();
        const relativeX = (data.x / window.innerWidth) * rootRect.width;
        const relativeY = (data.y / window.innerHeight) * rootRect.height;

        this.setState(prevState => {
            const newBoxes = prevState.rndboxes.map((box) => {
                if (box.dashboardItemNo === id) {
                    return {
                        ...box,
                        // startxRatio: Math.ceil(parseInt(data.x, 10)),
                        // startyRatio: Math.ceil(parseInt(data.y, 10))
                        startxRatio: Math.ceil(parseInt(relativeX, 10)),
                        startyRatio: Math.ceil(parseInt(relativeY, 10))
                    };
                }
                return box;
            });

            return { rndboxes: newBoxes };
        }, () => {
            const updatedBox = this.state.rndboxes.find(box => box.dashboardItemNo === id);
            this.props.getItems(this.state.rndboxes);
            if (updatedBox) {
                editDshboardItem({ 
                    siteNum: this.props.siteNo, 
                    body: updatedBox, 
                    userId: this.props.userID, 
                    dashCode: this.props.dashNo 
                })
                .then(code => {
                    console.log("드래그 POST 결과 : ", code);
                })
                .catch(error => {
                    console.error("Error posting dashboard item:", error);
                });
            } else {
                console.error("해당하는 박스를 찾을 수 없습니다.");
            }
        });
    }


    selectData = async (data, dataType, dashboardCodeNo) => {
        // console.log("대시보드 아이템 생성");
        // console.log("data : ", data);

        // 새로운 rndBox 객체 생성
        const newRndBox = {
            dashboardCodeNo: dashboardCodeNo,
            auxData: data,
            startxRatio: Math.round(this.state.location.mouseX) ,
            startyRatio: Math.round(this.state.location.mouseY) ,
            widthRatio: 200,
            heightRatio: 200,
            created: "No",
            dataType: dataType
        };
    
        // 상태 업데이트
        this.setState((prevState) => ({
            rndboxes: prevState.rndboxes.concat(newRndBox),
            rndboxIndex: prevState.rndboxIndex + 1,
        }), async () => {
            // 상태가 업데이트된 후 POST 요청 실행
            const newBoxes = toDataBase(newRndBox);
    
            try {
                const code = await createDshboardItem({
                    siteNum: this.props.siteNo,
                    body: newBoxes[0],
                    userId: this.props.userID,
                    dashNo: this.props.dashNo,
                });
                console.log('POST 결과 : ', code);
            } catch (error) {
                console.error('Error posting dashboard item:', error);
            }
            this.props.getItems([]);
            
        });


    };
    

    deleteClose = (id) => {
        console.log("삭제 : ", id ," 번");
        this.props.getDeleteItemDialog(true);
        this.props.getDeleteBoxId(id);
     }

     componentDidUpdate(prevProps, prevState) {
        if (prevProps.lastBoxNumber !== this.props.lastBoxNumber) {
                        console.log('lastBoxNumber has changed:', this.props.lastBoxNumber);
            prevState.rndboxIndex = this.props.lastBoxNumber;
        }

        if (prevProps.items !== this.props.items) {
            console.log('lastBoxNumber has items:', this.props.items);
            this.setState({ rndboxes: this.props.items });
        }

        if(prevProps.deleteItemDialog!== this.props.deleteItemDialog){
            prevState.queryClient.invalidateQueries('getDshboardItem',{ refetchInactive: true });

        }

        if (prevProps.dashCode) {
        }
    }
 


    render(){
        const { contextMenu,cpu,disk,ram,rndboxes,location,zoomValue } = this.state;
        const { tableData, closeIcon,deleteItemDialog,items} = this.props; 
        return (
            <>
        {closeIcon &&
            <div id="dashBody"
                style={{
                    position: 'relative', 
                    top: top, 
                    background: '#24303d',
                    width:'100%', height:'100%',
                    borderRadius: '12px',
                }} 
                onContextMenu={this.handleContextMenu}>
                {rndboxes&&rndboxes.map((box,index) => (
                        <Rnd
                            id={`rnd-${index}`}
                            key={box.dashboardItemNo}
                            default={{
                                x : box.startxRatio ,
                                y : box.startyRatio ,
                                //borderRadius:'5px'
                            }}
                            size={{
                                width: parseInt(box.widthRatio ),
                                height: parseInt(box.heightRatio),
                            }}
                            disableDragging={false} 
                            enableResizing={true}
                           // onDrag={(event, data) => this.handleDrag( data, box.dashboardItemNo)}
                            onDragStop={(e, data) => this.handleDragStop(e, data, box.dashboardItemNo)}
                            onResize={(event, direction, ref, delta, position) => 
                              this.handleResize(ref,  box.dashboardItemNo)  
                            }   
                            onResizeStop={(event, direction, ref, delta, position) => 
                                this.handleResizeStop(ref,  box.dashboardItemNo)  
                              }    
                            onContextMenu={this.handleContextMenu}
                            >
                            <div
                                style={{
                                    width:parseInt(box.widthRatio),
                                    height:parseInt(box.heightRatio),
                                    //borderRadius:'5px',
                                    border:'1px solid white',
                                }}
                                >  
                                {closeIcon &&
                                    <IconButton
                                        aria-label="close"
                                        // onClick={()=>this.deleteClose(box.id)}
                                        onClick={()=>this.deleteClose(box.dashboardItemNo)}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                                    {box.auxData==="CPU 사용률" && <LineChartData/>}
                                    {box.auxData==="DISK 사용률" && <BarChartData/>}
                                    {box.auxData==="RAM 사용률" && <LineChartDataRAM/>}

                                    {box.auxData==="ConnectNulls" && <ConnectNulls/>}
                                    {box.auxData==="DashedLineChart" && <DashedLineChart/>}
                                    {box.auxData==="PieChartWithPaddingAngle" && <PieChartWithPaddingAngle/>}
                                    {box.auxData==="TableScroll" && <TableScroll/>}
                                    
                            </div>

                        </Rnd>


                ))}


                    <Menu
                        open={closeIcon && contextMenu !== null}
                        onClose={this.handleCloseMenu}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            contextMenu !== null
                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                : undefined
                        }
                    >
                      
                                {tableData.map((item, index) => (
                                    <MenuItem key={index}
                                        onClick={(event) => this.selectData(item.dashboardCodeName,'', item.dashboardCodeNo)}
                                    >
                                        {item.dashboardCodeName || `Item ${index + 1}`}
                                    </MenuItem>
                                ))}
                           
                    </Menu> 

                     {/* --------------- [삭제 알림창] ---------------------- */}
                        {deleteItemDialog&&
                            <Dialog open= {true}>
                            <DeleteDataItemDialog/>
                            </Dialog> 
                        }
            </div>
        }
            </>        
            );
    
    }
}


const mapStateToProps = (state) => ({
    //-------dashboardReducer
    createdRndBoxes: state.dashboardReducer.createdRndBoxes,
    lastBoxNumber: state.dashboardReducer.lastBoxNumber,
    closeIcon: state.dashboardReducer.closeIcon,
    // dataList: state.dashboardReducer.dataList,
    deleteBoxId: state.dashboardReducer.deleteBoxId,
    dashNo:state.dashboardReducer.dashNo,

    deleteItemDialog:state.dashboardItemReducer.deleteItemDialog,
    items:state.dashboardItemReducer.items,

    dashCode:state.dshcodeReducer.dashCode,

    siteNo:state.authReducer.siteNo,
    userID:state.authReducer.userID,

    tableData:state.commonReducer.tableData,

});

const mapDispatchToProps = (dispatch) => ({
    getLastBoxNumber: (newLastBoxNumber) => dispatch(dashboardActions.getLastBoxNumber(newLastBoxNumber)),
    getRndBoxes: (rndBoxes) => dispatch(dashboardActions.getRndBoxes(rndBoxes)),
    getZoom : (rndBoxes) => dispatch(dashboardActions.getZoom(rndBoxes)),
    getDeleteItemDialog : (boolean) => dispatch(dshItemActions.getDeleteItemDialog(boolean)),
    getDeleteBoxId : (id) => dispatch(dshItemActions.getDeleteBoxId(id)),

    getItems : (rndBoxes) => dispatch(dshItemActions.getItems(rndBoxes)),

    getDashCode : (num) => dispatch(dshcodeActions.getDashCode(num)),



});


export default connect(mapStateToProps, mapDispatchToProps)(EDITmode);







// const EDITmode = () =>{
// const dispatch = useDispatch();
// const { deleteBoxId,dataList,lastBoxNumber,createdRndBoxes,closeIcon }
//          = useSelector((state) => state.dashboardReducer);
// const [rndboxes, setRndBoxes] = useState(createdRndBoxes); // 생성한 rnd 박스 배열들 
// const [contextMenu, setContextMenu] = useState(null); // 마우스가 우클릭한 위치
// const [selectedData, setSelectedData] = useState(); // 우클릭 해서 선택한 데이터
// //const [selectedRow, setSelectedRow] = useState(); 
// const [rndboxIndex, setRndboxIndex] = useState(lastBoxNumber); // rnd box ID
// console.log("createdRndBoxes : ",createdRndBoxes);

// // ------------ 우클릭 해서 메뉴 열기 --------------------
// const handleContextMenu = (event) => {
//     event.preventDefault(); // 기본 컨텍스트 메뉴 방지
//     // 마우스의 클릭 위치에서 선택창을 표시합니다.
//     setContextMenu({
//         mouseX: event.clientX,
//         mouseY: event.clientY,
//     });
//             // setOpenMenu(true);
// };

// // ------------ 우클릭 해서 메뉴 사라짐 --------------------
// const handleCloseMenu = () => {
//     setContextMenu(null);
// };



// //-------------- 메뉴에 있는 데이터 선택 하고 RnD 박스 생성 -------------------
// const selectData = (data,key) => {
//         setRndboxIndex((prevIndex) => {
//             const newIndex = prevIndex;
//         // 고유한 초기 위치를 계산합니다.
//             const initialX = 150 + (newIndex * 20); // x 위치를 각 박스마다 약간씩 이동시킵니다.
//             const initialY = 205 + (newIndex * 20); // y 위치를 각 박스마다 약간씩 이동시킵니다. 
//             // `newIndex`를 사용하여 새로운 `RndBox` 객체를 생성합니다.
//             const newRndBox = { 
//                     id: lastBoxNumber,
//                     data : data,
//                     row : key,
//                     xr:initialX/screenWidth,
//                     yr:initialY/screenHeight,
//                     wr:200/screenWidth,
//                     hr:200/screenHeight
//                     };
//             if(createdRndBoxes){
//               setRndBoxes([...createdRndBoxes, newRndBox]);
//             }else setRndBoxes([newRndBox]);
//             return newIndex;
//         });
//         dispatch(dashboardActions.getLastBoxNumber(lastBoxNumber+1)); // 전역 : 인덱스 번호 증가
//     }

   
// //-------------------------------------RnD Box 삭제------------------------------------------
// //-------------------------------------RnD Box 배열 데이터 전역에 전달------------------------------------------
// useEffect(() => {
// dispatch(dashboardActions.getRndBoxes(rndboxes)); // 전역에 : 업데이트된 박스 배열 데이터  
// }, [lastBoxNumber]);


// //-------------------------------화면 크기가 바뀔때마다------------------------
// const [screenWidth, setScreenWidth] = useState(window.innerWidth);
// const [screenHeight, setScreenHeight] = useState(window.innerHeight);



// useEffect(()=>{

// },[]);



// return (
// <>
// {/* //EDIT 모드  */}
//                 <div
//                   id='Dashboard body'
//                   style={{
//                     width:'100%', 
//                     height:'96%',
//                     background: '#24303d',
//                     position: 'relative', // 절대 위치 지정
//                     top: top, // `top` 상태를 `top` 속성에 적용
//                   }}
//                   onContextMenu={handleContextMenu}
//                 >
//           {/* ----------------[ 1. RnD 컴포넌트 ]--------------- */}
//                 {createdRndBoxes&&createdRndBoxes.map((box,index) => (   
//                     <div id="div1" key={index}>
//                         <RnDBox
//                         idvalue={box.id}
//                         initialX={parseInt(box.xr * 2460)}
//                         initialY={parseInt(box.yr * 1300)}
//                         initialW={parseInt(box.wr * 2460)}
//                         initialH={parseInt(box.hr * 1300)}
//                         ratioData ={box.xr}
//                         data = {box.data}
//                         />
//                      </div>
//                 ))}
//           {/* ----------------[ 2. 우클릭 메뉴창 ]--------------- */}
//                     <Menu
//                         open={closeIcon && contextMenu !== null }
//                         onClose={handleCloseMenu}
//                         anchorReference="anchorPosition"
//                         anchorPosition={
//                             contextMenu !== null
//                                 ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
//                                 : undefined
//                         }
//                     >
//                             {Object.entries(dataList).map(([key, list]) => (
//                                 <div key={key}>
//                                         {list.map((item, index) => (
//                                             <MenuItem key={index} 
//                                                     onClick={() => selectData(item.data,key)}
//                                             >
//                                                 {item.data || `Item ${index + 1}`} {/* `name` 속성을 사용하여 항목 이름을 표시 */}
//                                             </MenuItem>
//                                         ))}
//                                     </div>
//                                 ))}

//                     </Menu>
//                 </div>
            

// </>
// )
// }


// export default EDITmode;