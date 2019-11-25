

/**
 * Author : Nidhi Gadhavi
 * Purpose : Salary review Plan
 */


import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBCollapse, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';
import { CSVLink, CSVDownload } from "react-csv";
import EmployeeForm from '../../../sharedComponent/EmployeeForm';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { countryOptions, cityOptions, BL1Options, BL2Options, BL3Options, FunctionOptions, SubFuncitonOptions, SubSubFuncitonOptions, DesignationOptions, GreadOptions, LevelOptions, EducationOptions, CriticalTalentOptions, CriticalPositionOptions, SocialCategoryOptions, TenureInTheCompany, TenureInTheRole } from '../../../sharedComponent/AnualSalaryRuleOptions';
import { employeeActions } from '../../../../actions/employee.action';
import { setTargetPopulation } from '../../../../actions/salaryReview.action';
import { employeeService } from '../../../../services/employee.service';
import { setFlagTarget } from '../../../../actions/salaryReview.action';
import { BasicSalaryRule } from './BasicSalaryRule';
import { SalaryReviewGridPage } from './SalaryReviewGridPage';
import { BudgetAllocation } from './BudgetAllocation';
import { NewSalaryReviewPlanRule } from './NewSalaryReviewPlanRule';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import FormControlElement from '../../../sharedComponent/FormControl';

const animatedComponents = makeAnimated();
class ViewSalaryRuleDetail extends React.Component {
    data = {
        columns: [],
        rows: []
    }
    selectedTargetPopulation = [];
    fileToDownload = []

    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            modal: false,
            showUpload: false,
            showForm: false,
            noRecordFound: false,
            csvIncorrect: false,
            invalidMsg: [],
            selectAll: false,
            csvUploadComplete: false,
            gridReady: false,
            uploadCsv: false,
            date: '',
            collapseID: ""
        }
    }

    confirmTargetPopulation() {
        //set all the popular set array to the redux state
        console.log("into the main click of the main popuktaion");
        this.props.setFlagTarget(true);
        this.props.history.push('/dashboard/basicRule')
    }

    handleChange(selectedOption, label) {
        if (this.state.selectAll) {
            this.selectedTargetPopulation.push({
                country: countryOptions,
                city: cityOptions,
                BL1O: BL1Options,
                BL2: BL2Options,
                BL3: BL3Options,
                function: FunctionOptions,
                subFunction: SubFuncitonOptions,
                subsubFunction: SubSubFuncitonOptions,
                designation: DesignationOptions,
                gread: GreadOptions,
                level: LevelOptions,
                education: EducationOptions,
                criticalTalent: CriticalTalentOptions,
                criticalPosition: CriticalPositionOptions,
                socialCategory: SocialCategoryOptions,
                tenureInCompnay: TenureInTheCompany,
                tenureInRole: TenureInTheRole
            })
        }
        else {
            let obj = { key: label, value: selectedOption }
            this.selectedTargetPopulation.push(obj)
        }
    }

    toggleCollapse = collapseID => () => {
        console.log("inot the main toggle collapse");
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        const { modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, selectAll } = this.state;
        return (
            <MDBContainer fluid>
                <MDBCard className="mt-3" style={{ 'color': 'white', 'background': 'rgba(0,0,0,0.5)' }}>
                    <MDBContainer fluid>
                        <MDBCardBody className="ml-3 mr-3 mb-0 mt-3 body-bg-clr">
                            <h4
                                color="primary"
                                onClick={this.toggleCollapse("basicCollapse")}
                                className="m-0 collapse-btn"
                            >
                                {this.state.collapseID ? <MDBIcon icon="minus" />
                                    :  <MDBIcon icon="plus" />}
                                COLLAPSE BUTTON
                        </h4>
                            <MDBCollapse id="basicCollapse" className="mt-3" isOpen={this.state.collapseID}>
                                <NewSalaryReviewPlanRule ctrlFor='viewSalaryRuleGrid' />
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBContainer >
                    <BasicSalaryRule ctrlFor='viewSalaryRuleGrid' />
                    <SalaryReviewGridPage ctrlFor="viewSalaryRuleGrid" />
                    <BudgetAllocation ctrlFor="viewSalaryRuleGrid" />
                </MDBCard>
            </MDBContainer>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFlagTarget: (flag) => dispatch(setFlagTarget(flag))
    }
}
const connectedViewSalaryRuleDetail = connect(null, mapDispatchToProps)(ViewSalaryRuleDetail);
export { connectedViewSalaryRuleDetail as ViewSalaryRuleDetail }; 
