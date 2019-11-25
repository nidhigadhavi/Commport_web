/**
 * Author : Nidhi gadhavi
 * Purpose : Form to create new employee / update Existing Employee.
 */

import React from 'react'
import { connect } from 'react-redux';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import CSVReader from "react-csv-reader";
import CSVFileValidator from 'csv-file-validator';
import FormControlElement from './FormControl';
import { employeeActions } from '../../../../actions/employee.action';
import ToolTip from '../sections/ToolTip';
import { employeeService } from '../../../../services/employee.service';

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            modal: false,
            showUpload: false,
            showForm: false,
            csvIncorrect: false,
            invalidMsg: [],
            csvUploadComplete: false,
            gridReady: false,
            email: "",
            password: "",
            togglePass: true,
            captchaValue: '',
            expired: "false",
            isValid: false,
            isInvalidMsg: ''
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        event.target.className += " was-validated";
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

  
    render() {
        const { isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, invalidMsg, gridReady, email, password, isValid, isInvalidMsg } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;
        return (
            <div className="p-0">
                <MDBRow className="justify-content-center ml-0 mr-0 mb-5" style={{ marginTop: '23px' }}>
                    <MDBCol sm="12" md="12" lg="12">
                        <h4 className="text-left mb-4 empFormHeader"><b>Employee Form :</b></h4>
                        <form
                            className="needs-validation"
                            onSubmit={(e) => this.handleFormSubmit(e)}
                            noValidate
                        >
                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">PERSONAL <ToolTip tolltipMsg='Personal Detail'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="employee_code"
                                            className="form-control"
                                            name="employee_code"
                                            placeholder="Employee Code"
                                        />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="employee_ull_name"
                                            className="form-control"
                                            name="employee_ull_name"
                                            placeholder="Employee Full name"
                                        />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="email"
                                            id="email_id"
                                            className="form-control"
                                            name="email_id"
                                            placeholder="Email ID" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="gender"
                                            className="form-control"
                                            name="gender"
                                            placeholder="Gender" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="education"
                                            className="form-control"
                                            name="education"
                                            placeholder="Education" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="special_category_1"
                                            className="form-control"
                                            name="special_category_1"
                                            placeholder="Special Category-1" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="date"
                                            id="date_of_joining"
                                            className="form-control"
                                            name="date_of_joining"
                                            placeholder="Date of Joining" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="date"
                                            id="role"
                                            className="form-control"
                                            name="role"
                                            placeholder="Role" />
                                    </MDBContainer>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">BUSINESS <ToolTip tolltipMsg='Business Detail'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="name_of_the_company"
                                            className="form-control"
                                            name="name_of_the_company"
                                            placeholder="Name of the company" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="country"
                                            className="form-control"
                                            name="country"
                                            placeholder="Country" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="city"
                                            className="form-control"
                                            name="city"
                                            placeholder="City" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="BU_level_1"
                                            className="form-control"
                                            name="BU_level_1"
                                            placeholder="BU Level-1 (top organisation)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="defaultFormRegisterPasswordEx4"
                                            className="form-control"
                                            name="BU_level_2"
                                            placeholder="BU Level-2 (Division)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="BU_level_3"
                                            className="form-control"
                                            name="BU_level_3"
                                            placeholder="BU Level-3 (Area)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="function"
                                            className="form-control"
                                            name="function"
                                            placeholder="Function" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="sub_function"
                                            className="form-control"
                                            name="sub_function"
                                            placeholder="Sub Function" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="sub_sub_function"
                                            className="form-control"
                                            name="sub_sub_function"
                                            placeholder="Sub Sub Function" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="designation/title"
                                            className="form-control"
                                            name="designation/title"
                                            placeholder="Designation/Title" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="grade"
                                            className="form-control"
                                            name="grade"
                                            placeholder="Grade" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="level"
                                            className="form-control"
                                            name="level"
                                            placeholder="Level" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="identified_talent"
                                            className="form-control"
                                            name="identified_talent"
                                            placeholder="Identified talent" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="critical_position_holder"
                                            className="form-control"
                                            name="critical_position_holder"
                                            placeholder="Critical Position holder" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_achievement"
                                            className="form-control"
                                            name="performance_achievement"
                                            placeholder="Performance Achievement" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="currency"
                                            className="form-control"
                                            name="currency"
                                            placeholder="Currency*" />
                                    </MDBContainer>
                                </MDBCardBody>
                            </MDBCard>


                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">SALARY <ToolTip tolltipMsg='Salary Detail'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="date"
                                            id="date_of_joining_for_salary_review_purpose"
                                            className="form-control"
                                            name="date_of_joining_for_salary_review_purpose"
                                            placeholder="Date of joining for salary review purpose" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="start_date_for_role"
                                            className="form-control"
                                            name="start_date_for_role"
                                            placeholder="Start date for role (for bonus calculation only)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="date"
                                            id="end_date_of_the_role"
                                            className="form-control"
                                            name="end_date_of_the_role"
                                            placeholder="End date of the role (for bonus calculation only)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Bonus/Incentive_applicability"
                                            className="form-control"
                                            name="Bonus/Incentive_applicability"
                                            placeholder="Bonus/ Incentive applicability" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="recently_romoted"
                                            className="form-control"
                                            name="recently_romoted"
                                            placeholder="Recently Promoted (Yes/No)" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_this_year"
                                            className="form-control"
                                            name="performance_rating_for_this_year"
                                            placeholder="Performance Rating for this year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_previous_year"
                                            className="form-control"
                                            name="performance_rating_for_previous_year"
                                            placeholder="Performance Rating for previous year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_2nd_last_year"
                                            className="form-control"
                                            name="performance_rating_for_2nd_last_year"
                                            placeholder="Performance Rating for 2nd last year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_3rd_last_year"
                                            className="form-control"
                                            name="performance_rating_for_3rd_last_year"
                                            placeholder="Performance Rating for 3rd last year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_4th_last_year"
                                            className="form-control"
                                            name="performance_rating_for_4th_last_year"
                                            placeholder="Performance Rating for 4th last year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="performance_rating_for_5th_last_year"
                                            className="form-control"
                                            name="performance_rating_for_5th_last_year"
                                            placeholder="Performance Rating for 5th last year" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base/basic"
                                            className="form-control"
                                            name="base/basic"
                                            placeholder="Base/Basic" />


                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="current_target_bonus"
                                            className="form-control"
                                            name="current_target_bonus"
                                            placeholder="Current target bonus" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="transportation"
                                            className="form-control"
                                            name="transportation"
                                            placeholder="Transportation" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="medical_allowance"
                                            className="form-control"
                                            name="medical_allowance"
                                            placeholder="Medical Allowance" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="provident_fund"
                                            className="form-control"
                                            name="provident_fund"
                                            placeholder="Provident Fund" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_compensation"
                                            className="form-control"
                                            name="total_compensation"
                                            placeholder="Total compensation" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="increment_to_be_applied_on"
                                            className="form-control"
                                            name="increment_to_be_applied_on"
                                            placeholder="Increment to be applied on" />
                                    </MDBContainer>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">PAST DATA <ToolTip tolltipMsg='Past Data'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="defaultFormRegisterPasswordEx4"
                                            className="form-control"
                                            name="effective_date_of_last_salary_increase"
                                            placeholder="Effective date of Last Salary increase" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="effective_date_of_2nd_salary_increase"
                                            className="form-control"
                                            name="effective_date_of_2nd_salary_increase"
                                            placeholder="Effective date of 2nd Salary increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="effective_date_of_3rd_last_salary_increase"
                                            className="form-control"
                                            name="effective_date_of_3rd_last_salary_increase"
                                            placeholder="Effective date of 3rd last Salary increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="effective_date_of_4th_last_salary_increase"
                                            className="form-control"
                                            name="effective_date_of_4th_last_salary_increase"
                                            placeholder="Effective date of 4th Last Salary increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="effective_date_of_5th_last_salary_increase"
                                            className="form-control"
                                            name="effective_date_of_5th_last_salary_increase"
                                            placeholder="Effective date of 5th Last Salary increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base_salary_after_last_increase"
                                            className="form-control"
                                            name="base_salary_after_last_increase"
                                            placeholder="Base Salary after last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base_salary_after_2nd_last_increase"
                                            className="form-control"
                                            name="base_salary_after_2nd_last_increase"
                                            placeholder="Base Salary after 2nd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base_salary_after_3rd_last_increase"
                                            className="form-control"
                                            name="base_salary_after_3rd_last_increase"
                                            placeholder="Base Salary after 3rd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base_salary_after_4th_last_increase"
                                            className="form-control"
                                            name="base_salary_after_4th_last_increase"
                                            placeholder="Base Salary after 4th last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="base_salary_after_5th_last_increase"
                                            className="form-control"
                                            name="base_salary_after_5th_last_increase"
                                            placeholder="Base Salary after 5th last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_salary_after_last_increase"
                                            className="form-control"
                                            name="total_salary_after_last_increase"
                                            placeholder="Total Salary after last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_salary_after_2nd_last_increase"
                                            className="form-control"
                                            name="total_salary_after_2nd_last_increase"
                                            placeholder="Total Salary after 2nd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_salary_after_3rd_last_increase"
                                            className="form-control"
                                            name="total_salary_after_3rd_last_increase"
                                            placeholder="Total Salary after 3rd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_salary_after_4th_last_increase"
                                            className="form-control"
                                            name="total_salary_after_4th_last_increase"
                                            placeholder="Total Salary after 4th last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="total_salary_after_5th_last_increase"
                                            className="form-control"
                                            name="total_salary_after_5th_last_increase"
                                            placeholder="Total Salary after 5th last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="target_salary_after_last_increase"
                                            className="form-control"
                                            name="target_salary_after_last_increase"
                                            placeholder="Target Salary after last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="target_salary_after_last_increase"
                                            className="form-control"
                                            name="target_salary_after_2nd_last_increase"
                                            placeholder="Target Salary after 2nd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="target_salary_after_3rd_last_increase"
                                            className="form-control"
                                            name="target_salary_after_3rd_last_increase"
                                            placeholder="Target Salary after 3rd last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="target_salary_after_4th_last_increase"
                                            className="form-control"
                                            name="target_salary_after_4th_last_increase"
                                            placeholder="Target Salary after 4th last increase" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="target_salary_after_5th_last_increase"
                                            className="form-control"
                                            name="target_salary_after_5th_last_increase"
                                            placeholder="Target Salary after 5th last increase" />

                                    </MDBContainer >
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">MARKET DATA <ToolTip tolltipMsg='Market Data'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MD_match_job_code"
                                            className="form-control"
                                            name="MD_match_job_code"
                                            placeholder="Market Data matching job code" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="matched_market_job_name"
                                            className="form-control"
                                            name="matched_market_job_name"
                                            placeholder="Matched market job name" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase1"
                                            className="form-control"
                                            name="MBMBase1"
                                            placeholder="MBM Base-1" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase2"
                                            className="form-control"
                                            name="MBMBase2"
                                            placeholder="MBM Base-2" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase3"
                                            className="form-control"
                                            name="MBMBase3"
                                            placeholder="MBM Base-3" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase4"
                                            className="form-control"
                                            name="MBMBase4"
                                            placeholder="MBM Base-4" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase5"
                                            className="form-control"
                                            name="MBMBase5"
                                            placeholder="MBM Base-5" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase6"
                                            className="form-control"
                                            name="MBMBase6"
                                            placeholder="MBM Base-6" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase7"
                                            className="form-control"
                                            name="MBMBase7"
                                            placeholder="MBM Base-7" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase8"
                                            className="form-control"
                                            name="MBMBase8"
                                            placeholder="MBM Base-8" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase9"
                                            className="form-control"
                                            name="MBMBase9"
                                            placeholder="MBM Base-9" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase10"
                                            className="form-control"
                                            name="MBMBase10"
                                            placeholder="MBM Base-10" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMBase11"
                                            className="form-control"
                                            name="MBMBase11"
                                            placeholder="MBM Base-11" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_1"
                                            className="form-control"
                                            name="MBMTotalComp_1"
                                            placeholder="MBM Total Comp-1" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_2"
                                            className="form-control"
                                            name="MBMTotalComp_2"
                                            placeholder="MBM Total Comp-2" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_3"
                                            className="form-control"
                                            name="MBMTotalComp_3"
                                            placeholder="MBM Total Comp-3" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_4"
                                            className="form-control"
                                            name="MBMTotalComp_4"
                                            placeholder="MBM Total Comp-4" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_5"
                                            className="form-control"
                                            name="MBMTotalComp_5"
                                            placeholder="MBM Total Comp-5" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_6"
                                            className="form-control"
                                            name="MBMTotalComp_6"
                                            placeholder="MBM Total Comp-6" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_7"
                                            className="form-control"
                                            name="MBMTotalComp_7"
                                            placeholder="MBM Total Comp-7" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_8"
                                            className="form-control"
                                            name="MBMTotalComp_8"
                                            placeholder="MBM Total Comp-8" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_9"
                                            className="form-control"
                                            name="MBMTotalComp_9"
                                            placeholder="MBM Total Comp-9" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_10"
                                            className="form-control"
                                            name="MBMTotalComp_10"
                                            placeholder="MBM Total Comp-10" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBMTotalComp_11"
                                            className="form-control"
                                            name="MBMTotalComp_11"
                                            placeholder="MBM Total Comp-11" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp1"
                                            className="form-control"
                                            name="MBM_total_target_comp1"
                                            placeholder="MBM Total Target Comp-1" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp2"
                                            className="form-control"
                                            name="MBM_total_target_comp2"
                                            placeholder="MBM Total Target Comp-2" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp3"
                                            className="form-control"
                                            name="MBM_total_target_comp3"
                                            placeholder="MBM Total Target Comp-3" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp4"
                                            className="form-control"
                                            name="MBM_total_target_comp4"
                                            placeholder="MBM Total Target Comp-4" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp5"
                                            className="form-control"
                                            name="MBM_total_target_comp5"
                                            placeholder="MBM Total Target Comp-5" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp6"
                                            className="form-control"
                                            name="MBM_total_target_comp6"
                                            placeholder="MBM Total Target Comp-6" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp7"
                                            className="form-control"
                                            name="MBM_total_target_comp7"
                                            placeholder="MBM Total Target Comp-7" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp8"
                                            className="form-control"
                                            name="MBM_total_target_comp8"
                                            placeholder="MBM Total Target Comp-8" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp9"
                                            className="form-control"
                                            name="MBM_total_target_comp9"
                                            placeholder="MBM Total Target Comp-9" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp10"
                                            className="form-control"
                                            name="MBM_total_target_comp10"
                                            placeholder="MBM Total Target Comp-10" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="MBM_total_target_comp11"
                                            className="form-control"
                                            name="MBM_total_target_comp11"
                                            placeholder="MBM Total Target Comp-11" />
                                    </MDBContainer >
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">APPROVER <ToolTip tolltipMsg='Approver Detail'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Approver_1"
                                            className="form-control"
                                            name="Approver_1"
                                            placeholder="Approver-1*" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Approver_2"
                                            className="form-control"
                                            name="Approver_2"
                                            placeholder="Approver-2*" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Approver_3"
                                            className="form-control"
                                            name="Approver_3"
                                            placeholder="Approver-3*" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Approver_4"
                                            className="form-control"
                                            name="Approver_4"
                                            placeholder="Approver-4*" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="manager_name"
                                            className="form-control"
                                            name="manager_name"
                                            placeholder="Manager Name" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="authorised_signatory"
                                            className="form-control"
                                            name="authorised_signatory"
                                            placeholder="Authorised signatory" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="authorised_signatory's_title"
                                            className="form-control"
                                            name="authorised_signatory's_title"
                                            placeholder="Authorised signatory's title" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="HR_Authorised_signatory_for_letter"
                                            className="form-control"
                                            name="HR_Authorised_signatory_for_letter"
                                            placeholder="HR Authorised signatory for letter" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="HR_authorised_signatory's_title_for_letter"
                                            className="form-control"
                                            name="HR_authorised_signatory's_title_for_letter"
                                            placeholder="HR Authorised signatory's title for letter" />
                                    </MDBContainer >
                                </MDBCardBody>
                            </MDBCard>


                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-left mb-12 font-bold h6">OTHER <ToolTip tolltipMsg='Other Detail'/></MDBCardTitle>
                                    <MDBContainer>
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="teeth/tail_ratio"
                                            className="form-control"
                                            name="teeth/tail_ratio"
                                            placeholder="Teeth/Tail Ratio" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="previous_talent_rating"
                                            className="form-control"
                                            name="previous_talent_rating"
                                            placeholder="Previous Talent Rating" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="promoted_in_2_yrs"
                                            className="form-control"
                                            name="promoted_in_2_yrs"
                                            placeholder="Promoted in 2 yrs" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="engagement_level"
                                            className="form-control"
                                            name="engagement_level"
                                            placeholder="Engagement level*" />

                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="successor_identified"
                                            className="form-control"
                                            name="successor_identified"
                                            placeholder="Successor Identified" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="readynes_level"
                                            className="form-control"
                                            name="readynes_level"
                                            placeholder="Readyness level*" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="Urban/Rural_classification"
                                            className="form-control"
                                            name="Urban/Rural_classification"
                                            placeholder="Urban/Rural classification" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="employee_movement_into_bonus_plan"
                                            className="form-control"
                                            name="employee_movement_into_bonus_plan*"
                                            placeholder="Employee Movement into Bonus Plan*" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_9"
                                            className="form-control"
                                            name="other_data_9"
                                            placeholder="Other Data-9" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_10"
                                            className="form-control"
                                            name="other_data_10"
                                            placeholder="Other Data-10" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_11"
                                            className="form-control"
                                            name="other_data_11"
                                            placeholder="Other Data-11" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_12"
                                            className="form-control"
                                            name="other_data_12"
                                            placeholder="Other Data-12" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_13"
                                            className="form-control"
                                            name="other_data_13"
                                            placeholder="Other Data-13" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_14"
                                            className="form-control"
                                            name="other_data_14"
                                            placeholder="Other Data-14" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_15"
                                            className="form-control"
                                            name="other_data_15"
                                            placeholder="Other Data-15" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_16"
                                            className="form-control"
                                            name="other_data_16"
                                            placeholder="Other Data-16" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_17"
                                            className="form-control"
                                            name="other_data_17"
                                            placeholder="Other Data-17" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_18"
                                            className="form-control"
                                            name="other_data_18"
                                            placeholder="Other Data-18" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_19"
                                            className="form-control"
                                            name="other_data_19"
                                            placeholder="Other Data-19" />
                                        <FormControlElement tolltip={false} value={this.state.city}
                                            onChange={this.handleChange}
                                            type="text"
                                            id="other_data_20"
                                            className="form-control"
                                            name="other_data_20"
                                            placeholder="Other Data-20" />

                                        <MDBBtn
                                            color="primary"
                                            className="btn w-9 formSubmitBtn"
                                            type="submit"
                                        >
                                            Submit
                                        </MDBBtn>

                                    </MDBContainer >
                                </MDBCardBody>
                            </MDBCard>
{/*
                            <MDBCard className="mb-3">
                                <MDBCardBody>
                                    <MDBContainer>
                                        <MDBBtn
                                            color="primary"
                                            className="btn  w-9"
                                            type="submit"
                                        >
                                            Submit
                                        </MDBBtn>

                                    </MDBContainer >
                                </MDBCardBody>
                            </MDBCard>*/}
                        </form>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

export default EmployeeForm;
