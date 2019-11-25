/**
 * author : Nidhi Gadhavi
 * purpose : Login component  
 */

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { frontEndAlertConstants as ERROR } from '../../constants/alert.constant';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBAlert, MDBCardBody, MDBIcon, MDBCardImage } from 'mdbreact';
import { history } from '../../helpers/history';
import './login.css'
import axios from 'axios';
import { userActions } from '../../actions/user.action';
import { userService } from '../../services/user.service';
import logo from '../../assets/image/login_logo.png';
import ReCAPTCHA from 'react-google-recaptcha';
const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            togglePass: true,
            captchaValue: '',
            expired: "false",
            isValid: false,
            isInvalidMsg: ''
        }
        this._reCaptchaRef = React.createRef();
    }

    handleCaptchaChange = value => {
        this.setState({ captchaValue: value });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleToggle = (event) => {
        this.setState({ togglePass: !this.state.togglePass })
    }

    handleValidation = (event) => {
        const { email, password, isValid } = this.state;
        if (event.target.id == "email") {
            let isValidData = (email.length == 0 ? true : false)
            let msg = ERROR.EMAIL_REQUIRED;
            this.setState({
                isValid: isValidData,
                isInvalidMsg: msg
            })
        }
        else {
            let { isPasswordEmpty, isPasswordInvalid, msgInvalid, msg } = "";
            isPasswordEmpty = (password.length == 0 ? true : false);
            let PasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/);
            isPasswordInvalid = PasswordRegex.test(this.state.password);
            console.log("Password validation");
            console.log(isPasswordInvalid);
            msgInvalid = ERROR.PASSWORD_INVALID;
            msg = ERROR.PASSWORD_REQUIRED;
            this.setState({
                isValid: isPasswordEmpty,
                isInvalidMsg: (isPasswordEmpty ? msg : msgInvalid)
            })
        }
    }

    handleLoginSubmit = (e) => {
        console.log("into the submit");
        e.preventDefault();
        let { email, password } = this.state;
        
        this.props.login(email, password);
        
        // fetch('https://api.online.compport.com/api/v1/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Cache-Control': 'no-cache',
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     body: { 'username': email, 'password': password }
        // }).then(function (response) {
        //     alert("into sucess");
        //     console.log(response);
        //     response.json();
        // }).catch(error => console.error("Error:", error))


        // userService.login(email, password)
        //     .then(
        //         user => {
        //             console.log("SAVEEEEE SUCESSSS");
        //             console.log(user);
        //             history.push('/');
        //             return user;
        //         },
        //         error => {
        //             console.log("SAVEEEEE ERROR");
        //             console.log(error);
        //             // dispatch(failure(error));
        //             // dispatch(alertActions.error(error));
        //         }
        //     );

    }

    render() {
        let { email, password, isValid, isInvalidMsg } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;

        return (
            <div className="background-image">
                <MDBContainer>
                    <MDBRow className="loginContainer">
                        <MDBCol md="4"></MDBCol>
                        <MDBCol md="4">
                            <MDBCardImage className="img-fluid headerImage" src={logo} waves />
                            <MDBCard >
                                <MDBCardBody>
                                    {isValid
                                        ? <MDBAlert color="danger" >{isInvalidMsg}</MDBAlert>
                                        : ""
                                    }
                                    <form>
                                        <p className="h5 text-center py-4 userFormHeading" >Login in Your Account</p>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            placeholder="Email"
                                            className="form-control"
                                            onChange={(e) => this.handleChange(e)}
                                            onBlur={(e) => this.handleValidation(e)}
                                        />
                                        <br />
                                        <div className="passwordDiv">
                                            <input
                                                type={this.state.togglePass ? "password" : "text"}
                                                id="password"
                                                className="form-control"
                                                placeholder="password"
                                                value={password}
                                                onChange={(e) => this.handleChange(e)}
                                                onBlur={(e) => this.handleValidation(e)}
                                            />
                                            {this.state.togglePass
                                                ? <MDBIcon className="fas fa-eye eyeIcon" id="showConfirmPassword" onClick={(e) => this.handleToggle(e)} />
                                                : <MDBIcon className="fas fa-eye fa-eye-slash eyeIcon" id="showConfirmPassword" onClick={(e) => this.handleToggle(e)} />}
                                        </div>
                                        <div>
                                            <ReCAPTCHA
                                                className="captchaClass"
                                                theme="light"
                                                ref={this._reCaptchaRef}
                                                sitekey={TEST_SITE_KEY}
                                                onChange={this.handleCaptchaChange}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn
                                                disabled={!isEnabled}
                                                className="btn w-100 p-2"
                                                type="submit"
                                                onClick={(e) => this.handleLoginSubmit(e)}>
                                                Login
                                            </MDBBtn>
                                        </div>
                                    </form>
                                    <span onClick={() => this.props.history.push("/forgot-password")} className="toggleLInkForgotPass">Forgot Password</span>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        // dispatching actions returned by action creators
        login: (email, password) => userActions.login(email, password),
        logout: () => dispatch(userActions.logout())
    }
}
const connectedLoginComponent = connect(mapDispatchToProps)(LoginComponent);
export { connectedLoginComponent as LoginComponent }; 