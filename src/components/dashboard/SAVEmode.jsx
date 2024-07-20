import { Component } from "react";
import { Rnd } from "react-rnd";
import { getResizeEventListener } from "./handlers/resizeEventHandler";
import { connect } from "react-redux";
import { dashboardActions } from "../../reducx/dashboard";
import LineChartData from "../dataList/LineChartData";
import BarChartData from "../dataList/BarChartData";
import ConnectNulls from "../dataList/ConnectNulls";
import DashedLineChart from "../dataList/DashedLineChart";
import PieChartWithPaddingAngle from "../dataList/PieChartWithPaddingAngle";
import TableScroll from "../dataList/TableScroll";
import LineChartDataRAM from "../dataList/LineChartDataRAM";


//모니터링 용도 => SAVE 모드

class SAVEmode extends Component{

    componentDidMount(){
        //----------리사이징 이벤트 
        const {zoom,siteNo} = this.props;
        const FixRatio = getResizeEventListener();
        window.onresize = FixRatio;
        FixRatio();
        console.log("siteNo",siteNo);
    }


    render(){
        const { items } = this.props; 
        return (
            <>
            <div id="dashBody"
                style={{
                    position: 'relative', 
                    width:'100%', height:'100%',
                    top: top,
                }} >
                {items && items.length !== 0 
                ? items.map((box,index) => (
                    <Rnd
                            id={`rnd-${index}`}
                            key={index}
                            position={{
                                x : box.startxRatio ,
                                y : box.startyRatio ,
                            }}
                            size={{
                                // width: parseInt(box.wr * 2460),
                                // height: parseInt(box.hr * 1300),
                                width: parseInt(box.widthRatio ),
                                height: parseInt(box.heightRatio),
                            }}
                            disableDragging={true} // 드래그 비활성화
                            enableResizing={false}  
                            style={{borderRadius:'5px'}}
                            >
                            <div
                                style={{
                                    // width:parseInt(box.wr * 2460  ),
                                    // height:parseInt(box.hr * 1300 ),
                                    width: parseInt(box.widthRatio ),
                                    height: parseInt(box.heightRatio),
                                    // background: '#191A1B',
                                    background : 'rgba(62, 69, 112, 0.3)',

                                    borderRadius:'5px',
                                    // border :'1px solid gray'
                                }}
                                >  
                                    {box.auxData==="CPU 사용률"  && <LineChartData/>}
                                    {box.auxData==="DISK 사용률" && <BarChartData/>}
                                    {box.auxData==="RAM 사용률" && <LineChartDataRAM/>}

                                    
                                    {box.auxData==="ConnectNulls" && <ConnectNulls/>}
                                    {box.auxData==="DashedLineChart" && <DashedLineChart/>}
                                    {box.auxData==="PieChartWithPaddingAngle" && <PieChartWithPaddingAngle/>}
                                    {box.auxData==="TableScroll" && <TableScroll/>}
                            </div>
                    </Rnd>    
                    
                    
                    
               ))
                :
                <h1>대시보드를 생성하세요</h1>}
            </div>
                        {/* <Rnd
                            size={{
                                width: "80%",
                                height: "800px",
                            }}
                            style={{
                                x : "50%",
                                y : "50%"
                            }}
                            disableDragging={false} 
                            enableResizing={true}
                            >
                            <div
                                style={{
                                    width: "80%",
                                    height: "800px",
                                    border:'1px solid white',
                                }}
                                >  
                            
                                
                                    <ModelData/>


                                    
                            </div>

                        </Rnd> */}
           </>
            );
        }

   
}


const mapStateToProps = (state) => ({
    items:state.dashboardItemReducer.items,
    lastBoxNumber: state.dashboardReducer.lastBoxNumber,
    closeIcon: state.dashboardReducer.closeIcon,
    zoom : state.dashboardReducer.zoom,
    siteNo:state.authReducer.siteNo,

});

const mapDispatchToProps = (dispatch) => ({
    getLastBoxNumber: (newLastBoxNumber) => dispatch(dashboardActions.getLastBoxNumber(newLastBoxNumber)),
    getRndBoxes: (rndBoxes) => dispatch(dashboardActions.getRndBoxes(rndBoxes)),
    getZoom : (rndBoxes) => dispatch(dashboardActions.getZoom(rndBoxes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SAVEmode);

