/**
 * author : Nidhi Gadhavi
 * purpose : ForgotPassword component
 */

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardImage } from 'mdbreact';
import { frontEndAlertConstants as ERROR } from '../../constants/alert.constant';
import './login.css';
import logo from '../../assets/image/login_logo.png';


class ForgotPasswordComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="background-image">
                <MDBContainer>
                    <MDBRow className="loginContainer">
                        <MDBCol md="4"></MDBCol>
                        <MDBCol md="4">
                            <MDBCardImage className="img-fluid headerImage" src={logo} waves />
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                        <p className="h5 text-center py-4 userFormHeading">Forgot Password</p>
                                        <input
                                            type="email"
                                            id="defaultFormCardEmailEx"
                                            className="form-control"
                                            placeholder="Email"
                                        />
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
        );
    }
}

export default ForgotPasswordComponent; 