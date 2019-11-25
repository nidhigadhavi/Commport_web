/**
 * author : Nidhi Gadhavi
 * purpose : ResetPassword component
 */

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { frontEndAlertConstants as ERROR } from '../../constants/alert.constant';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardImage, MDBAlert } from 'mdbreact';
import './login.css';
import logo from '../../assets/image/login_logo.png';

class ResetPasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            newPassword: "",
            confirmPassword: "",
            confirmTogglePass: true,
            newTogglePass: true,
            isValid: false,
            isInvalidMsg: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleToggle = (event) => {
        let toggleVal = this.state['' + event.target.id + ''];
        this.setState({
            [event.target.id]: !toggleVal
        })
    }

    handleValidation = (event) => {
        const { email, newPassword, confirmPassword, isValid } = this.state;
        if (event.target.id == "email") {
            let isValidData = (email.length == 0 ? true : false)
            let msg = ERROR.EMAIL_REQUIRED;
            this.setState({
                isValid: isValidData,
                isInvalidMsg: msg
            })
        }
        else if (event.target.id == "newPassword") {
            let isPasswordEmpty = (newPassword.length == 0 ? true : false)
            let PasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/);
            let isPasswordInvalid = PasswordRegex.test(newPassword);
            let msgInvalid = ERROR.PASSWORD_INVALID;
            let msg = ERROR.PASSWORD_REQUIRED
            this.setState({
                isValid: isPasswordEmpty || isPasswordInvalid,
                isInvalidMsg: (isPasswordEmpty ? msg : msgInvalid)
            })
        }
        else {
            let isConfirmPasswordEmpty = (confirmPassword.length == 0 ? true : false);
            let isConfirmMatchPass = (!isConfirmPasswordEmpty && this.state.confirmPassword !== this.state.newPassword ? true : false);
            let msg = ERROR.CONFIRM_PASSWORD_REQUIRED;
            let msgmatch = ERROR.PASSWORD_MISMATCH;

            this.setState({
                isValid: isConfirmPasswordEmpty || isConfirmMatchPass,
                isInvalidMsg: (isConfirmPasswordEmpty ? msg : msgmatch)
            })
        }
    }

    render() {
        let { email, isValid, confirmPassword, newPassword, newTogglePass, confirmTogglePass, isInvalidMsg } = this.state;
        return (
            <div className="background-image">
                <MDBContainer>
                    <MDBRow className="loginContainer">
                        <MDBCol md="4"></MDBCol>
                        <MDBCol md="4">
                            <MDBCardImage className="img-fluid headerImage" src={logo} waves />
                            <MDBCard>
                                <MDBCardBody>
                                    {
                                        isValid
                                            ? <MDBAlert color="danger" >{isInvalidMsg}</MDBAlert>
                                            : ""
                                    }
                                    <form>
                                        <p className="h5 text-center py-4 userFormHeading">Reset Password</p>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            value={email}
                                            className="form-control"
                                            onChange={(e) => this.handleChange(e)}
                                            onBlur={(e) => this.handleValidation(e)}
                                        />

                                        <br />
                                        <div className="resetPasswordDiv">
                                            <input
                                                type={newTogglePass ? "password" : "text"}
                                                value={newPassword}
                                                placeholder="New Password"
                                                id="newPassword"
                                                className="form-control"
                                                onChange={(e) => this.handleChange(e)}
                                                onBlur={(e) => { this.handleValidation(e) }}
                                            />

                                            {this.state.newTogglePass
                                                ? <MDBIcon className=" fas fa-eye eyeIcon" id="newTogglePass" onClick={(e) => this.handleToggle(e)} />
                                                : <MDBIcon className="fas fa-eye fa-eye-slash eyeIcon" id="newTogglePass" onClick={(e) => this.handleToggle(e)} />}

                                        </div>
                                        <br />
                                        <div className="resetPasswordDiv">
                                            <input
                                                type={confirmTogglePass ? "password" : "text"}
                                                value={confirmPassword}
                                                placeholder="Confirm Password"
                                                id="confirmPassword"
                                                className="form-control"
                                                onChange={(e) => this.handleChange(e)}
                                                onBlur={(e) => { this.handleValidation(e) }}
                                            />
                                            {this.state.confirmTogglePass
                                                ? <MDBIcon className="fas fa-eye eyeIcon" id="confirmTogglePass" onClick={(e) => this.handleToggle(e)} />
                                                : <MDBIcon className="fas fa-eye fa-eye-slash eyeIcon" id="confirmTogglePass" onClick={(e) => this.handleToggle(e)} />}


                                        </div>
                                        <div className="text-center py-2 mt-3">
                                            <MDBBtn type="submit" className="btn w-100 p-2">
                                                Send
                                        </MDBBtn>
                                        </div>
                                    </form>
                                    <span className="toggleLInk" onClick={() => this.props.history.push("/login")}>Login</span>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default ResetPasswordComponent; 