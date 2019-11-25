/**
 * Author: Nidhi Gadhavi
 * Purpose: Create basic rule for making slary rule.
 */

import React from 'react'
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import SimpleProration from '../../../sharedComponent/SimpleProration';
import FixedPerAges from '../../../sharedComponent/FixedPerAges';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';
import { CSVLink, CSVDownload } from "react-csv";
import EmployeeForm from '../../../sharedComponent/EmployeeForm';
import FormControlElement from '../../../sharedComponent/FormControl';
import AdditionalFormControlElement from '../../../sharedComponent/AdditionalFormControlElement';
import EmployeePopulationDistribution from '../../../sharedComponent/EmployeePopulationDistribution';
import SalaryIncRangeOnAge from '../../../sharedComponent/SalaryIncRangeOnAge';
import { employeeActions } from '../../../../actions/employee.action';
import { getFlagTarget, getPlan, getBuisnessElements, getMarketSalaryElements } from '../../../../actions/salaryReview.action';
import { employeeService } from '../../../../services/employee.service';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import { basicRuleForm } from '../../../../constants/formLable.constant';
import ToolTip from '../../../sharedComponent/ToolTip';
import { stat } from 'fs';

class BasicSalaryRule extends React.Component {
    optionsProratedINC = [
        { value: 'simpleProration', label: 'Simple Proration' },
        { value: 'no', label: 'No' },
        { value: 'fixed%ages', label: 'Fixed %ages' }
    ]

    optionsBool = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]

    optionsSalaryIncModel = [
        { value: 'distance', label: 'Distance' },
        { value: 'quartile', label: 'Quartile' }
    ]

    optionsSalary = [
        { value: 'simpleProration', label: 'Simple Proration' },
        { value: 'no', label: 'No' },
        { value: 'fixed%ages', label: 'Fixed %ages' }
    ]

    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            applyProratedIncreaseCalculations: '',
            buisnessElements: [],
            marketSalaryElements: [],
            dataFatchDone: false,
            selectedlabel: 'Distance'
        }
        props.getPlan();
        props.getBuisnessElements();
        props.getMarketSalaryElements();
    }

    handleChange(selectedOption, label, e) {
        console.log("Inot the handle change...");
        console.log(selectedOption)
        if (selectedOption.label == "Quartile") {
            this.setState({
                selectedlabel: "Quartile"
            })
        }
        else {
            this.setState({
                selectedlabel: "Distance"
            })
        }

        if (label == 'Apply prorated increase calculations') {
            this.setState({
                applyProratedIncreaseCalculations: selectedOption.value
            })
        }
    }

    componentWillMount() {
        setTimeout(() => {            
            this.setState({
                dataFatchDone: true,
                buisnessElements: this.props.BuisnessElements.businessEle,
                marketSalaryElements: this.props.BuisnessElements.marketEle
            })
            console.log(this.props.BuisnessElements.marketEle);
        }, 1000);
    }


    saveBasicRules() {
        console.log("into the save basic rulesss...");
        console.log(this.state.applyProratedIncreaseCalculations);
        alert("Basic Rule Sucessfully Save.");
        this.props.history.push('/dashboard/salaryReviewGrid');
    }

    render() {
        const { salaryPlanDetail, ctrlFor } = this.props;
        const { applyProratedIncreaseCalculations, buisnessElements, marketSalaryElements } = this.state;
        const style = (ctrlFor == 'viewSalaryRuleGrid' ? { 'color': 'white', 'background': 'none', 'box-shadow': 'none' } : { 'color': 'white', 'background': 'rgba(0,0,0,0.5)' })
        console.log("into reder");
        console.log(this.state);
        const showScreen = (this.state.dataFatchDone ? false : true);
        return (
            <MDBContainer fluid>
                <MDBRow between>
                    <MDBCol>
                        <MDBCard className="mt-3 mb-3" style={style}>
                            <MDBCardBody className="m-3 body-bg-clr">
                                <MDBRow >
                                    <MDBCol><p className="success-msg"><b>You are covering 0 employees under this rule. </b>
                                        0 Employee(s) under your responsibility are not covered in any rule as yet. Click Here to see the list.</p></MDBCol>
                                </MDBRow>
                                <MDBRow><MDBCol><h4 className="basic-rule">Define Basic Rule <ToolTip tolltipMsg="Basic Rules" /></h4> </MDBCol></MDBRow>
                                <MDBRow>
                                    {showScreen
                                        ? <MDBCol>
                                            <div className="spinner-grow text-primary" role="status">
                                                <span className="sr-only">Loading...</span> </div>
                                        </MDBCol>
                                        : <MDBCol>
                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                onChange={(e) => this.handleChange(e)}
                                                type="text"
                                                value="test Plan"
                                                id="planName"
                                                className="form-control"
                                                name="planName"
                                                placeholder={basicRuleForm.PLAN_NAME} />

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                onChange={(e) => this.handleChange(e)}
                                                type="text"
                                                id="salaryRuleName"
                                                className="form-control"
                                                name="salaryRuleName"
                                                placeholder={basicRuleForm.SALARY_RULE_NAME} />

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                onChange={(e) => this.handleChange(e)}
                                                type="select"
                                                tooltip={true}
                                                options={this.optionsBool}
                                                id="includeInactiveEmployeesF"
                                                className="form-control"
                                                name="includeInactiveEmployees"
                                                placeholder="Include inactive employees" />

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                                                type="select"
                                                options={this.optionsProratedINC}
                                                id="applyProratedIncreaseCalculations"
                                                className="form-control"
                                                name="applyProratedIncreaseCalculations"
                                                placeholder={basicRuleForm.APPLY_PRORATED_INCREASE_CALC} />
                                            {
                                                applyProratedIncreaseCalculations == 'simpleProration'
                                                    ?
                                                    <SimpleProration
                                                        onChange={(e) => this.handleChange(e)}
                                                        type="text"
                                                        id="performancePeriodForProCalculation"
                                                        className="form-control"
                                                        name="performancePeriodForProCalculation"
                                                        placeholder={basicRuleForm.PERFORMANCE_PERIOD_FOR_PRO_RATED_CALC} />

                                                    : applyProratedIncreaseCalculations == 'fixed%ages'
                                                        ?
                                                        <FixedPerAges placeholder={basicRuleForm.FIXED_AGES} />
                                                        : applyProratedIncreaseCalculations == 'no'
                                                            ? ""
                                                            : ""
                                            }

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                tooltip={true}
                                                onChange={(e) => this.handleChange(e)}
                                                type="select"
                                                id="Salary elements to be reviewed"
                                                isMulti='true'
                                                options={this.state.buisnessElements}
                                                className="form-control"
                                                name="Salary elements to be reviewed"
                                                placeholder="Salary elements to be reviewed" />

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                tooltip={true}
                                                onChange={(e) => this.handleChange(e)}
                                                type="select"
                                                options={this.optionsBool}
                                                id="performanceBasedSalaryIncrease"
                                                className="form-control"
                                                name="performanceBasedSalaryIncrease"
                                                placeholder="Performance based salary increase" />

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="manager’sCanChangeTheRatings"
                                            className="form-control"
                                            name="manager’sCanChangeTheRatings"
                                            placeholder="Manager’s can change the ratings" /> */}
                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                tooltip={true}
                                                onChange={(e) => this.handleChange(e)}
                                                type="select"
                                                options={this.optionsBool}
                                                id="payRangeComparisonAfterMeritIncrese"
                                                className="form-control"
                                                name="payRangeComparisonAfterMeritIncrese"
                                                placeholder="Pay range comparison after merit increase" />


                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            tooltip={true}
                                            options={this.optionsBool}
                                            id="calculateSalaryPositionAfterPerfomanceBasedINC"
                                            className="form-control"
                                            name="calculateSalaryPositionAfterPerfomanceBasedINC"
                                            placeholder="Calculate salary positioning after applying performance based increase" /> */}

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                tooltip={true}
                                                onChange={(e) => this.handleChange(e)}
                                                type="select"
                                                options={this.optionsSalaryIncModel}
                                                id="payRangeComparisonModel"
                                                className="form-control"
                                                name="payRangeComparisonModel"
                                                placeholder="Pay Range comparison model" />

                                            {this.state.selectedlabel == "Distance"
                                                ? <div><FormControlElement
                                                    ctrlFor="basicRule"
                                                    onChange={(e) => this.handleChange(e)}
                                                    type="select"
                                                    tooltip={true}
                                                    options={this.state.marketSalaryElements}
                                                    id="selectTargetPositioning"
                                                    className="form-control"
                                                    name="selectTargetPositioning"
                                                    placeholder="Select target positioning" />

                                                <EmployeePopulationDistribution
                                                    ctrlFor="basicRule"
                                                    tooltip={true}
                                                    onChange={(e) => this.handleChange(e)}
                                                    type="text"
                                                    id="createComparativeRatio"
                                                    className="form-control"
                                                    name="createComparativeRatio"
                                                    placeholder="Create comparative ratios" />
                                                </div>
                                                :
                                                <FormControlElement
                                                    ctrlFor="basicRule"
                                                    onChange={(e) => this.handleChange(e)}
                                                    type="checkBox"
                                                    isMulti='true'
                                                    tooltip={true}
                                                    options={this.state.marketSalaryElements}
                                                    id="comparativeRatioRanges"
                                                    className="form-control"
                                                    name="comparativeRatioRanges"
                                                    placeholder="Choose comparative ratio ranges to see employee population distribution" />

                                            }

                                            <SalaryIncRangeOnAge
                                                ctrlFor="basicRule"
                                                onChange={(e) => this.handleChange(e)}
                                                type="text"
                                                tooltip={true}
                                                id="managerFlexibility"
                                                className="form-control"
                                                name="managerFlexibility"
                                                placeholder="Manager’s Flexibility" />

                                            <FormControlElement
                                                ctrlFor="basicRule"
                                                onChange={(e) => this.handleChange(e)}
                                                type="text"
                                                id="stdPromotionIncreaseAge"
                                                className="form-control"
                                                name="stdPromotionIncreaseAge"
                                                placeholder="Standard promotion increase %age" />

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsSalaryIncModel}
                                            id="promotionBasedon"
                                            className="form-control"
                                            name="promotionBasedon"
                                            placeholder="Promotion Based On" /> */}

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="Grade/level/DesignationEditableByManagers"
                                            className="form-control"
                                            name="Grade/level/DesignationEditableByManagers"
                                            placeholder="Grade/level/Designation editable by managers" /> */}

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="showPerformanceAchievementToManagers"
                                            className="form-control"
                                            name="showPerformanceAchievementToManagers"
                                            placeholder="Show Performance Achievement To Managers" /> */}

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="showVariableSalaryToManagers"
                                            className="form-control"
                                            name="showVariableSalaryToManagers"
                                            placeholder="Show Variable Salary To Managers" /> */}

                                            {/* <AdditionalFormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="text"
                                            id="additionalRecommendationField1"
                                            className="form-control"
                                            name="additionalRecommendationField1"
                                            placeholder="Additional Recommendation Field 1 (Optional)" />

                                        <AdditionalFormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="additionalRecommendationField2"
                                            className="form-control"
                                            name="additionalRecommendationField2"
                                            placeholder="Additional Recommendation Field 2 (Optional)" />

                                        <AdditionalFormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="select"
                                            options={this.optionsBool}
                                            id="additionalRecommendationField3"
                                            className="form-control"
                                            name="additionalRecommendationField3"
                                            placeholder="Additional Recommendation Field 3 (Optional)" /> */}

                                            {/* <FormControlElement
                                            ctrlFor="basicRule"
                                            onChange={(e) => this.handleChange(e)}
                                            type="text"
                                            id="selectBonusRule"
                                            className="form-control"
                                            name="selectBonusRule"
                                            placeholder="Select Bonus Rule" /> */}
                                            {ctrlFor == 'viewSalaryRuleGrid'
                                                ? ""
                                                : <div className="text-right m-3">
                                                    <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/createAnnualSalaryReviewPlanRule') }}>Back</MDBBtn>
                                                    <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.saveBasicRules() }}>Edit & Next Step</MDBBtn>
                                                    <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/salaryReviewGrid') }}>Next Step</MDBBtn>
                                                </div>}
                                        </MDBCol>
                                    }
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    console.log("#MAPSTATETO PROPSSSS");
    console.log(state);
    return {
        salaryPlanDetail: state.salaryReview.salaryPlanDetail,
        flagForTargetSet: state.salaryReview.flagForTargetSet,
        BuisnessElements: state.salaryReview,
        MarketSalaryElements: state.salaryReview
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
        getFlagTarget: () => dispatch(getFlagTarget()),
        getPlan: () => dispatch(getPlan()),
        getBuisnessElements: () => dispatch(getBuisnessElements()),
        getMarketSalaryElements: () => dispatch(getMarketSalaryElements())
    }
}
const connectedBasicSalaryRule = connect(mapStateToProps, mapDispatchToProps)(BasicSalaryRule);
export { connectedBasicSalaryRule as BasicSalaryRule };


