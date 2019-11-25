
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
import { setTargetPopulation, getAllFilters } from '../../../../actions/salaryReview.action';
import { employeeService } from '../../../../services/employee.service';
import { setFlagTarget , saveRuleFilters} from '../../../../actions/salaryReview.action';
import ToolTip from '../../../sharedComponent/ToolTip';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import FormControlElement from '../../../sharedComponent/FormControl';
import { selectTargetPopulationForm } from '../../../../constants/formLable.constant';
import { stat } from 'fs';
import { allFiltersContants } from '../../../../constants/target_population.constant';

const animatedComponents = makeAnimated();
class NewSalaryReviewPlanRule extends React.Component {
  data = {
    columns: [],
    rows: []
  }
  selectedTargetPopulation = [];
  fileToDownload = [];
  staticData = allFiltersContants;

  constructor(props) {
    super(props)
    this.state = {
      filterArray: [],
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
      responsedata: []
    }    
  }

  componentDidMount(){
    this.getAllFilters();
  }

  componentWillMount(){
    console.log("into the will mount....");
    setTimeout(()=>{      
      this.setState({
        filterArray : this.props.allRuleFilters.allRuleFilters 
      })
    }, 3000)
  }
  
  confirmTargetPopulation() {
    // //set all the popular set array to the redux state
    console.log("into the main click of the main popuktaion");
    console.log(this.selectedTargetPopulation);
    let requestBody = {
      "empBULevel1":[1,2,3],
      "empBULevel2": [1,2,3],
      "empBULevel3": [1,2,3],
      "empCountry": [1,2,3],
      "empCity": [1,2,3],
      "empFunction":[1,2,3],
      "empSubFunction": [1,2,3],
      "empSubSubFunction":[1,2,3],
      "empDesignation":[1,2,3],
      "empGrade":[1,2,3],
      "empLevel": [1,2,3],
      "empEducation": [1,2,3],
      "empIdentifiedTalent":[1,2,3],
      "empCriticalPositionHolder": [1,2,3],
      "empPerformanceAchievement":[1,2,3],
      "empSpclCat":[1,2,3],
      "empTenureRole" : [1,2,3],
      "empTenureCompany" : [1,2,3],
      "cutoff_date":"2019-24-09",
      "performance_cycle_id":"1"
    }
    this.props.saveRuleFilters(requestBody);
    this.props.setFlagTarget(true);
    this.props.history.push('/dashboard/basicRule')
  }

  getAllFilters() {    
    this.props.getAllFilters();
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
    const { ctrlFor } = this.props;
    const { modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, selectAll } = this.state;
    const ContainerClass = (ctrlFor == 'viewSalaryRuleGrid' ? 'viewSalaryGridNewSalaryReviewContainer' : 'newSalaryReviewContainer')
    // const dropDownData = this.state.filterArray;
    const dropDownData = this.staticData.data;
    console.log(dropDownData);
    return (
      <MDBContainer fluid className={ContainerClass}>
      <MDBRow className="justify-content-center" style={{ margin: '1% 0 1% 0', background: 'rgba(0,0,0,0.5)' }}>
        <MDBCol>
        {ctrlFor == 'viewSalaryRuleGrid' ? ""
          : <MDBCard className='mb-4 mt-4 text-center'>
            <MDBCardBody>
              <h6 className="m-0"><strong>MID YEAR REVIEW 2019 <ToolTip tolltipMsg="Mid Year Review 2019" /></strong></h6>
            </MDBCardBody>
          </MDBCard>}

        <MDBCard  className="mb-3">
          <MDBCardBody>
            {ctrlFor == 'viewSalaryRuleGrid' 
              ? " "
              : <MDBRow>
                <MDBCol sm="12" className='mb-3'>
                  <MDBCardTitle className="text-left mb-0 font-bold salary-title">
                    Select Target population for this plan <ToolTip tolltipMsg="Select Target" />
                  </MDBCardTitle>
                  <MDBBtn
                    color="primary"
                    onClick={() => {
                      this.setState({ selectAll: !this.state.selectAll }, function () {
                        this.handleChange(null, '')
                      });
                    }}
                    className="btn pt-1 pl-3 pb-1 pr-3 selectAll-btn"
                  >Select All </MDBBtn>
                </MDBCol>
                <MDBCol sm="12"><hr className="mt-0" /></MDBCol>
              </MDBRow>}
              { dropDownData.length == 0 
              ? <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span> </div> 
              : 
            <MDBRow className=''>
              <MDBCol className="col pl-4 pr-4">
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  ctrlFor="newSalryReviewPlan"
                  type="select"
                  isMulti='true'
                  selectAll={selectAll}
                  options={dropDownData.empCountry}
                  id="country"
                  className="form-control"
                  name="country"
                  placeholder={selectTargetPopulationForm.COUNTRY} />

                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true'
                  selectAll={selectAll}
                  id="city"
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empCity}
                  className="form-control"
                  name="city"
                  placeholder={selectTargetPopulationForm.CITY} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true'
                  selectAll={selectAll}
                  id="business_level_1"
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empBULevel1}
                  className="form-control"
                  name="business_level_1"
                  placeholder={selectTargetPopulationForm.BUSINESS_LEVEL_1} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  ctrlFor="newSalryReviewPlan"
                  id="business_level_2"
                  className="form-control"
                  name="business_level_2"
                  options={dropDownData.empBULevel2}
                  placeholder={selectTargetPopulationForm.BUSINESS_LEVEL_2} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  options={dropDownData.empBULevel3}
                  ctrlFor="newSalryReviewPlan"
                  id="business_level_2"
                  className="form-control"
                  name="business_level_3"
                  placeholder={selectTargetPopulationForm.BUSINESS_LEVEL_3} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  options={dropDownData.empFunction}
                  ctrlFor="newSalryReviewPlan"
                  id="function"
                  className="form-control"
                  name="Function"
                  placeholder={selectTargetPopulationForm.FUNCTION} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  options={dropDownData.empSubFunction}
                  id="sub_function"
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="sub_function"
                  placeholder={selectTargetPopulationForm.SUB_FUNCTION} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  id="sub__sub_function"
                  options={dropDownData.empSubSubFunction}
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="sub__sub_function"
                  placeholder={selectTargetPopulationForm.SUB_SUB_FUNCTION} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  id="designation"
                  options={dropDownData.empDesignation}
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="designation"
                  placeholder={selectTargetPopulationForm.DESTINATION} />
              </MDBCol>
              <MDBCol className="col pl-4 pr-4">
                <FormControlElement

                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empGrade}
                  id="grade"
                  className="form-control"
                  name="grade"
                  placeholder={selectTargetPopulationForm.GRADE} />

                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  id="level"
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empLevel}
                  className="form-control"
                  name="level"
                  placeholder={selectTargetPopulationForm.LEVEL} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empEducation}
                  id="education"
                  className="form-control"
                  name="education"
                  placeholder={selectTargetPopulationForm.EDUCATION} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  id="critical_talent"
                  ctrlFor="newSalryReviewPlan"
                  options={dropDownData.empCriticalPositionHolder}
                  className="form-control"
                  name="critical_talent"
                  placeholder={selectTargetPopulationForm.CRITICAL_TALET} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true'
                  selectAll={selectAll}
                  options={dropDownData.empCriticalPositionHolder}
                  id="critical_position"
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="critical_position"
                  placeholder={selectTargetPopulationForm.CRITICAL_POSITION} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true'
                  selectAll={selectAll}
                  id="special_category"
                  options={SocialCategoryOptions}
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="special_category"
                  placeholder={selectTargetPopulationForm.SPECIAL_CATEGORY} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  options={TenureInTheCompany}
                  id="Tenure_in_company"
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="Tenure_in_company"
                  placeholder={selectTargetPopulationForm.TENURE_IN_COMPANY} />
                <FormControlElement
                  onChange={(selectedOption, label) => this.handleChange(selectedOption, label)}
                  type="select"
                  isMulti='true' selectAll={selectAll}
                  options={TenureInTheRole}
                  id="tenure_in_company"
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="tenure_in_company"
                  placeholder={selectTargetPopulationForm.TENURE_IN_ROLE} />
                <FormControlElement
                  changeHandler={(e) => { this.setState({ date: e.target.value }) }}
                  type="date"

                  value={this.state.date}
                  id="Tenure_in_company"
                  ctrlFor="newSalryReviewPlan"
                  className="form-control"
                  name="Tenure_in_company"
                  placeholder={selectTargetPopulationForm.CUTOFF_DATE} />
                {ctrlFor == 'viewSalaryRuleGrid'
                  ? " "
                  : <div className='text-right'><MDBBtn
                    color="primary"
                    className="btn m-0 pt-1 pl-3 pb-1 pr-3"
                    onClick={() => this.confirmTargetPopulation()}
                  >Continue</MDBBtn></div>}

              </MDBCol>
            </MDBRow>
              }
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      </MDBRow>
      </MDBContainer>

    );
  }
}

function mapStateToProps(state) {    
  return {
    allRuleFilters: state.salaryReview,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFlagTarget: (flag) => dispatch(setFlagTarget(flag)),
    getAllFilters: () => dispatch(getAllFilters()),
    saveRuleFilters: (reqBody) => dispatch(saveRuleFilters(reqBody))
  }
}
const connectedNewSalaryReviewPlanRule = connect(mapStateToProps, mapDispatchToProps)(NewSalaryReviewPlanRule);
export { connectedNewSalaryReviewPlanRule as NewSalaryReviewPlanRule }; 
