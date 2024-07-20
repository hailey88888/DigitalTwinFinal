import { Component } from "react";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import { loadSlim } from "tsparticles-slim";
import { particles } from "./particles";
import { signIn } from "../../util/restAPI/common/auth";
import { connect } from "react-redux";
import { userActions } from '../../reducx/user';
import { authActions } from "../../reducx/auth";
import { useCallback } from "react";
import { getSignInResizeEventHandler } from "./resizeHandler";
import logo from "../../assets/images/skybluelogo.png";
import img from "../../assets/images/GettyImages-1303435496-Print-1600x1066.webp";
// import Particles from "react-tsparticles";
import { BlueBar } from "./BlueBar";
import { ParticlesCom } from "./ParticlesCom";
import "./LoginFormCss.css";

class SignInClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                username: '',
                password: ''
            },
            validationSchema: yup.object().shape({
                username: yup.string().required('required'),
                password: yup.string().required('required')
            }),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.particlesInit = this.particlesInit.bind(this);
    }

    componentDidMount() {
        const FixRatio = getSignInResizeEventHandler();
        window.onresize = FixRatio;
        FixRatio();
    }

    particlesInit(engine) {
        loadSlim(engine);
    }

    async handleSubmit(values) {
        const { username, password } = values;
        const { name, auth, userPw, siteNo, siteName, data, userId } = await signIn({ userID: username });
        if (password === userPw) {
            localStorage.setItem('name', name);
            localStorage.setItem('auth', auth);
            localStorage.setItem('siteNum', siteNo);
            localStorage.setItem('siteName', siteName);
            localStorage.setItem('userId', userId);

            this.props.getUserName(name);
            this.props.getAuthorization(auth);
            this.props.getUserID(userId);
            this.props.getSiteManagerInfo(data);
        }
    }


    render() {
        const { initialValues,validationSchema } = this.state;

        return (
        <div id="signin" style={{ width: '100%', height: '100%' ,
            display: 'flex', // Flexbox 사용
            justifyContent: 'space-around', // 자식 요소들 사이에 여백을 줌
            alignItems: 'center', // 자식 요소들을 수직으로 가운데 정렬


            // color: 'black', 
            // background: 'linear-gradient(to bottom, rgb(0, 30, 60), rgb(0, 105, 148))' 
        // backgroundColor: 'black'
        // backgroundColor: 'linear-gradient(to bottom, rgb(0, 30, 60), rgb(0, 105, 148))' 
        }}>
            <img
                src={img}
                alt="profilePic"
                style={{
                    display: "block",
                    // margin: "0 auto",
                        // height: "1300px",
                    width: "65%",
                    height : "100%",
                    filter: "contrast(1.2) brightness(1.1) saturate(1.1)" // filter 속성 값 인용부호
                }}
            />
              <div className="gradient-overlay" />
              <div className="gradient-overlay" /> 
              <div className="gradient-overlay" />
              <div className="gradient-overlay" />

            <div id="singinBody"  
                 style={{ width: '35%', height : '100%' ,
                        // position:'absolute',
                        // background: 'linear-gradient(to bottom, rgb(0, 30, 60), rgb(0, 105, 148))' 
                        background:'white'
             }}
            >      
                  <ParticlesCom/>
                 <div
                 style={{ 
                    height : '100%' ,
                     position:'relative',
                     backgroundColor: 'white',
                     width:'100%'

                 }}>
                    <div 
                        style={{ 
                            display: 'flex', flexDirection: 'column', 
                            position:'relative',
                            height:'60%',
                            top:'20%', 
                            width:'50%',
                            margin: "0 auto",
                            alignItems: 'center' , 
                        }}
                    >
                        
                        <h1 style={{
                                // color:"white",
                                fontSize :'35px'
                            }}>
                            Digital Twin
                        </h1>
                            <h3
                                style={{
                                    marginTop:'-2%',
                                    // color:"white",
                                    fontSize :'20px'
                                    }}>
                                LOGIN
                                </h3>
                            <Box 
                                display="grid" 
                                // gridTemplateColumns="repeat(2, 1fr)" 
                                gap={2}
                                width={"80%"}
                                left={"50%"}
                                height={"60%"}
                                marginTop={"17px"}
                            >

                        {/* -----[ Formik 폼을 사용합니다 ]-------*/}
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={this.handleSubmit}
                            >
                                {({ values, handleChange, handleSubmit, errors, touched }) => (
                                    <Form style={{ width: '100%', display: 'grid', gap: '2px' }}>
                                        {/* <div className="hide-textField"> */}
                                        <div>
                                            <BlueBar/>
                                            <TextField
                                                fullWidth
                                                name="username"
                                                            label="Name"
                                                            // variant="standard"
                                                            onChange={handleChange}
                                                            value={values.username}
                                                            InputProps={{ style: { color: 'gray' } }}
                                                            InputLabelProps={{ style: { color: 'gray' } }}
                                                            error={touched.username && Boolean(errors.username)}
                                                            helperText={touched.username && errors.username}
                                                            color="primary"
                                                            sx={{
                                                                mt:'2%',
                                                                mb:'2%'
                                                                    //width: isSmallScreenW & isSmallScreenH ?'50%':'100%', 
                                                                    // mb: '10%',
                                                                    //height: isSmallScreenW?'50%':'100%', 
                                                                }}
                                            />
                                            <BlueBar/>

                                            <div style={{height:"20px", width:'20px', backgroundColor:'white'}}/>

                                            <BlueBar/>
                                            <TextField
                                                fullWidth
                                                name="password"
                                                            label="Password"
                                                            type="password"
                                                            // variant="standard"
                                                            onChange={handleChange}
                                                            value={values.password}
                                                            InputProps={{ style: { color: 'gray' } }}
                                                            InputLabelProps={{ style: { color: 'gray' } }}
                                                            error={touched.password && Boolean(errors.password)}
                                                            helperText={touched.password && errors.password}
                                                            sx={{
                                                                mt:'2%',
                                                                mb:'2%'
                                                                //width: isSmallScreenW & isSmallScreenH ?'50%':'100%' 
                                                                
                                                            }}
                                            />
                                            <BlueBar/>


                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ 
                                                    width:'100%',
                                                    height: '50px', 
                                                     marginTop: '10%',
                                                     backgroundColor:'#6798bf'
                                                }}
                                                onClick={handleSubmit}
                                            >
                                                <h3
                                                style={{
                                                    color:"white",
                                                    fontSize : '20px'
                                                }}> 
                                                    LOG IN
                                                </h3>
                                            </Button>
                                        </div>

                                           
                                    
                                    </Form>
                                )}
                            </Formik>
                        </Box>


                </div>

                 </div>
            </div>




                <div>

                </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => ({
 

});

const mapDispatchToProps = (dispatch) => ({
    getUserName: (name) => dispatch(authActions.getUserName(name)),
    getAuthorization: (authList) => dispatch(authActions.getAuthorization(authList)),
    getUserID: (userId) => dispatch(authActions.getUserID(userId)),
    getUserName: (data) => dispatch(userActions.getSiteManagerInfo(data)),
  
    


});

export default connect(mapStateToProps, mapDispatchToProps)(SignInClass);


