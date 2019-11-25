
/**
 * Author : Nidhi Gadhavi
 * Purpose : Salary review Plan
 */


import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
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
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import FormControlElement from '../../../sharedComponent/FormControl';
import ToolTip from '../../../sharedComponent/ToolTip';

const animatedComponents = makeAnimated();
class BudgetAllocation extends React.Component {
    data = {
        columns: [],
        rows: []
    }
    selectedTargetPopulation = [];
    fileToDownload = []
    optionsBool = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }];
    optionsCurrency = [{ value: 'USD', label: 'USD' }, { value: 'usd$', label: 'USD$' }, { value: 'inr', label: 'INR' }, { value: 'try', label: 'TRY' }];
    optionLimit = [{ value: 'nolimit', label: 'No limit' }, { value: 'automated_locked', label: 'Automated Locked' }, { value: 'automated_but_x_can_exceed', label: 'Automated But x% can exceed' }]

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
            date: ''
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

    render() {
        const { modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, selectAll } = this.state;
        const data = {
            columns: [
                {
                    label: '#',
                    field: 'id',

                },
                {
                    label: 'First',
                    field: 'first',

                },
                {
                    label: 'Last',
                    field: 'last',

                },
                {
                    label: 'Handle',
                    field: 'handle',

                }
            ],
            rows: [
                {
                    'id': 1,
                    'first': 'Mark',
                    'last': 'Otto',
                    'handle': '@mdo'
                },
                {
                    'id': 2,
                    'first': 'Jacob',
                    'last': 'Thornton',
                    'handle': '@fat'
                },
                {
                    'id': 3,
                    'first': 'Larry',
                    'last': 'the Bird',
                    'handle': '@twitter'
                },
                {
                    'id': 4,
                    'first': 'Mark',
                    'last': 'Otto',
                    'handle': '@mdo'
                },
                {
                    'id': 5,
                    'first': 'Jacob',
                    'last': 'Thornton',
                    'handle': '@fat'
                },
                {
                    'id': 6,
                    'first': 'Larry',
                    'last': 'the Bird',
                    'handle': '@twitter'
                }
            ]
        };

        let dataviewSalaryRuleGrid = {
            columns: [
                {
                    label: 'Base Increase',
                    field: 'baseIncrease',
                },
                {
                    label: 'Target Position In Market BM',
                    field: 'targetPositionInMarketBM',
                },
                {
                    label: '< 12 CR',
                    field: 'lt12cr',
                },
                {
                    label: '> 12 CR',
                    field: 'gt12cr',
                },
                {
                    label: '< 75 CR',
                    field: 'gt75cr',
                },
                {
                    label: '75 to < 100 CR',
                    field: 'from75tolt100cr',
                },
                {
                    label: '100 to < 120 CR',
                    field: 'from100tolt120cr',
                },
                {
                    label: '< 125 CR',
                    field: 'gt125cr',
                },
                {
                    label: 'Overall Max Increase',
                    field: 'overallMaxIncrease',
                },
                {
                    label: 'Max Increase For Recently Promoted Cases',
                    field: 'maxIncreaseForRecentlyPromotedCases',
                }
            ],
            rows: [
                {
                    baseIncrease: <input type="text" id="baseinc" value={this.state.baseinc} onChange={(e) => this.handleChange(e)} />,
                    targetPositionInMarketBM: <div><select value='option1'><option>options1</option><option>options2</option><option>options3</option></select></div>,
                    lt12cr: <div className="th-per"><input type="text" id="lt12" value={this.state.lt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.lt12}%</span><p>11%</p></div>,
                    gt12cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    gt75cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p><p className="th-per-blue">11%</p></div>,
                    from75tolt100cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    from100tolt120cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    gt125cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    overallMaxIncrease: <input type="text" id="overallMaxinc" value={this.state.overallMaxinc} onChange={(e) => this.handleChange(e)} />,
                    maxIncreaseForRecentlyPromotedCases: <input type="text" id="maxIncForRecentPromotedCase" onChange={(e) => this.handleChange(e)} value={this.state.maxIncreaseForRecentlyPromotedCases} />,
                }
            ]
        };

        const showPagination = (data.rows.length > 9 ? true : false)
        return (
            <MDBContainer fluid>
                <MDBRow className="justify-content-center" style={{ margin: '1% 0 0 0', background: 'rgba(0,0,0,0.5)' }}>
                    <MDBCol>
                        <MDBCard className="mt-3 mb-3">
                            <MDBCardBody className="m-3 body-bg-clr">
                                <MDBRow>
                                    <MDBCol sm="12">
                                        <p className="success-msg m-0">0 Employee(s) under your responsibility are not covered in any rule as yet. Click Here to see the list.
                                    </p>
                                    </MDBCol>
                                    <MDBCol sm="12"><hr></ hr></MDBCol>
                                    <MDBCol sm="12"><h5 className="salary-review-grid-header">DEFINE BASIC RULES :-TEST RULE INFORMATION <ToolTip tolltipMsg="Define Basic Rule:- Test Rule Salary" /></h5>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                            <MDBCardBody className="mb-3 ml-3 mr-3 mt-0 body-bg-clr">
                                <MDBRow>
                                    <MDBRow><MDBCol><h5 className="basicBudgetAllocation">DEFINE BUDGET ALLOCATION <ToolTip tolltipMsg="Define Budget Allocation" /></h5> </MDBCol></MDBRow>
                                    <MDBCol sm="4">
                                        <div className="distribution-box">
                                            <p className="mb-2"><span></span>Pre increase population distribution</p>
                                            <p><span></span>Post increase population distribution</p>
                                        </div>
                                    </MDBCol>

                                    <MDBCol sm="4">
                                        <div className="distribution-box distribution-yellow-box">
                                            <p className="mb-2"><span>158.97%</span>Pre increase population distribution</p>
                                            <p className="mb-2"><span>158.97%</span>Pre increase population distribution</p>
                                            <p><span>158.97%</span>Post increase population distribution</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="12">
                                        <MDBDataTable
                                            striped
                                            bordered
                                            className="dataTable"
                                            small
                                            paging={showPagination}
                                            info={showPagination}
                                            searching={false}
                                            data={dataviewSalaryRuleGrid}
                                            entriesLabel="Show"
                                            style={{ 'backgroundColor': 'white' }}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <FormControlElement
                                            tooltip={true}
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionBool}
                                            id="budgetAccumulation"
                                            className="form-control"
                                            name="budgetAccumulation"
                                            placeholder="Budget accumulation" />

                                        <FormControlElement
                                            tooltip={true}
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionBool}
                                            id="PromotionBudgetToBePartofTheOverallBudget"
                                            className="form-control"
                                            name="PromotionBudgetToBePartofTheOverallBudget"
                                            placeholder="Promotion budget to be part of the Overall Budget" />

                                        <FormControlElement
                                            tooltip={true}
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionBool}
                                            id="managerCanCrossLimits"
                                            className="form-control"
                                            name="managerCanCrossLimits"
                                            placeholder="Managers can cross the individual limits but not the team budget" />

                                        <FormControlElement
                                            tooltip={true}
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionLimit}
                                            id="overallBudgetAllocation"
                                            className="form-control"
                                            name="overallBudgetAllocation"
                                            placeholder="Overall Budget Allocation" />

                                    </MDBCol>
                                </MDBRow>
                                <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/salaryReviewGrid') }}>Back</MDBBtn>
                                <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/viewSalaryRuleDetail') }}>Review The Plan</MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFlagTarget: (flag) => dispatch(setFlagTarget(flag))
    }
}
const connectedBudgetAllocation = connect(null, mapDispatchToProps)(BudgetAllocation);
export { connectedBudgetAllocation as BudgetAllocation }; 
