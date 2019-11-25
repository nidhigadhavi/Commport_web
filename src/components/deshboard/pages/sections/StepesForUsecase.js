/**
 * Author: Nidhi Gahdavi
 * Purpose : File to Add Inital DEscription to use the System
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Stepper from 'react-stepper-horizontal';
import { Redirect, NavLink } from 'react-router-dom';
import { history } from '../../../../helpers/history';

import { MDBRow, MDBCol, MDBView, MDBIcon, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

class StepesForUsecase extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };

        return (
            <div className="stepper-main">
                <div className="container stepper">

                    <MDBRow>
                        <MDBCol></MDBCol>
                        <MDBCol>
                            <NavLink exact={true} to="/dashboard/showEmployee"><div className="stepper-box">
                                <MDBIcon icon="cog" className="stepper-icon">
                                </MDBIcon>
                                <h6>Manage Employee</h6>
                            </div></NavLink>
                        </MDBCol >
                        <MDBCol>
                            <NavLink exact={true} to="/dashboard/designCompensastionPlan"><div className="stepper-box">
                                <MDBIcon icon="paper-plane" className="stepper-icon">
                                </MDBIcon>
                                <h6>Setup Compensation Plan</h6>
                            </div></NavLink>
                        </MDBCol >
                        <MDBCol>
                            <div className="stepper-box">
                                <MDBIcon icon="tools" className="stepper-icon">
                                </MDBIcon>
                                <h6>Manage Role Setup</h6>
                            </div>
                        </MDBCol >
                        <MDBCol></MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol></MDBCol>
                        <MDBCol>
                            <div className="stepper-box">
                                <MDBIcon icon="clipboard-list" className="stepper-icon">
                                </MDBIcon>
                                <h6>Manage Surveys</h6>
                            </div>
                        </MDBCol >
                        <MDBCol>
                            <div className="stepper-box">
                                <MDBIcon icon="chart-line" className="stepper-icon">
                                </MDBIcon>
                                <h6>Analytics And Reports</h6>
                            </div>
                        </MDBCol >
                        <MDBCol>
                            <div className="stepper-box">
                                <MDBIcon icon="info-circle" className="stepper-icon">
                                </MDBIcon>
                                <h6>Manage Tooltips</h6>
                            </div>
                        </MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>
                </div>
            </div>

        );
    }
};

export default StepesForUsecase; 