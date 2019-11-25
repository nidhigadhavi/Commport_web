/**
 * purpose: create new plan.
 * 
 */

/**
 * Author : Nidhi Gadhavi
 * Purpose : Create New Salary review Plan
 */

import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';
import { CSVLink, CSVDownload } from "react-csv";
import EmployeeForm from '../../../sharedComponent/EmployeeForm';
import FormControlElement from '../../../sharedComponent/FormControl';
import { employeeActions } from '../../../../actions/employee.action';
import { setPlan } from '../../../../actions/salaryReview.action';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import { employeeCompansationService } from '../../../../services/compansation.service';
import Pagination from "../../../sharedComponent/Pagination";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';

import NotFoundPage from '../../../NotFoundPage';


class ExistingPlan extends React.Component {
    count = 0;

    columns = [
        {
            label: <div><label>S.No</label><input type="text" className="form-control planGridForm" name='sno' onChange={(e) => this.handleGridSearchChange(e)} /></div>,
            field: 'sr_no',
            sort: 'asc'
        },
        {
            label: <div><label>Plan Name</label><input type="text" className="form-control planGridForm" name='uploaded_by_name' onChange={(e) => this.handleGridSearchChange(e)} /></div>,
            field: 'plan_name',
            sort: 'asc'
        },
        {
            label: <div><label>Start Date</label><input type="text" className="form-control planGridForm" name='upload_file_name' onChange={(e) => this.handleGridSearchChange(e)} /></div>,
            field: 'start_date',
            sort: 'asc',
        },
        {
            label: <div><label>End Date</label><input type="text" className="form-control planGridForm" name='uploaded_date_time' onChange={(e) => this.handleGridSearchChange(e)} /></div>,
            field: 'end_date',
            sort: 'asc',
        },
        {
            label: 'Action',
            field: 'action',
        }
    ]

    rowsToDisplay = [];

    fileToDownload = []

    constructor(props) {

        super(props)
        this.state = {
            noRecordFound: false,
            plan_name: '',
            start_date: '',
            end_date: '',
            sr_no: 0,
            planAdd: false,
            // data: this.data,
            isLoad: false,
            columns: [],
            isValid: false,
            isInvalidMsg: '',
            rows: [],
            sectionSelect: 'Annual Salary Review Plan'
        }
        // this.getGridData();
    }

    componentDidMount() {
        this.getGridData();
    }

    getGridData() {
        console.log("into the function of rhe man");
        employeeCompansationService.getExistingAnnualSalaryReview()
            .then((data) => {
                let x = [];
                x = [{
                    Header: 'SR No',
                    accessor: 'SR_No'
                },               
                {
                    Header: 'Rule Name',
                    accessor: 'Rule_Name'
                },
                {
                    Header : 'Start Date',
                    accessor : 'Start_Date'
                },
                {
                    Header : 'End Date',
                    accessor : 'End_Date'
                },
                {
                    Header: 'Action',
                    accessor: 'Action'
                }
                ]
                _.forEach(data.row, (val, index) => {
                    console.log(val);
                    let x = {
                        "SR_No":val[0],
                        "Rule_Name":val[1],                        
                        "Start_Date": moment(val[3]).format('DD-MM-YYYY'),
                        "End_Date":moment(val[4]).format('DD-MM-YYYY'),                         
                        "Action": <div>
                        <a className="planActionLink" onClick={(e) => this.editPlan(val[0], e)} >Edit</a> |
                        <NavLink exact={true} className="planActionLink" to="/dashboard/annualSalaryReviewPlanRule">&nbsp;Annual Salary Review PLan Rules</NavLink> |
                        <a className="planActionLink">&nbsp;Employees Covered</a>
                    </div>
                    }
                    this.rowsToDisplay.push(x);
                });

                this.setState({
                    columns: x,
                    rows: this.rowsToDisplay
                })
            })
            .catch(() => { console.log("Inot the catch blcok..."); })
    }

    handleGridSearchChange(e) {
        let that = this;
        let key = e.target.name
        let tr = document.getElementsByTagName("tr");
        let filter = e.target.value.toUpperCase();
        let rowToDisplay = [];
        this.setState({
            noRecordFound: false
        })

        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    rowToDisplay.push(tr[i])
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (rowToDisplay.length == 0) {
            this.setState({
                noRecordFound: true
            })
        }
    }

    handleChange(e) {
        console.log('###handle Change');
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBlur(e) {       
        if (e.target.name == "end_date") {
            if (this.state.start_date && this.state.start_date !== "") {
                let isValidData = (this.state.start_date > this.state.end_date) ? true : false;
                let msg = "Start Date Should Not Be Grater Than End Date.";
                this.setState({
                    isValid: isValidData,
                    isInvalidMsg: (isValidData ? msg : "")
                })
            }
            else {
                let msg = "Please Enter Start Date.";
                this.setState({
                    isValid: true,
                    isInvalidMsg: msg
                })
            }
        }
    }

    editPlan(sr_no, e) {       
        e.preventDefault();
        _.filter(this.state.rows, (val, index) => {
            
            if (val.SR_No == sr_no) {
                console.log(val);
                this.setState({
                    plan_name: val.Rule_Name,
                    start_date: moment(val.Start_Date).format('YYYY-MM-DD'),
                    end_date: moment(val.End_Date).format('YYYY-MM-DD')
                })
            }
        })
    }

    addPlanToList(e) {        
        e.preventDefault();
        let that = this;
        this.setState({
            isLoad: true
        })
        this.count = this.count + 1;
        const { plan_name, sr_no, start_date, end_date } = this.state;
        let obj = {
            "SR_No":this.count,
            "Rule_Name":plan_name,                        
            "Start_Date": moment(start_date).format('DD-MM-YYYY'),
            "End_Date":moment(end_date).format('DD-MM-YYYY'),                         
            "Action": <div >
            <a className="planActionLink" onClick={(e) => this.editPlan(this.count, e)} >Edit</a> |
            <NavLink exact={true} className="planActionLink" to="/dashboard/annualSalaryReviewPlanRule">&nbsp;Annual Salary Review PLan Rules</NavLink> |
            <a className="planActionLink">&nbsp;Employees Covered</a>
        </div>
        }

        this.setState({
            rows: [...this.state.rows, obj],
            plan_name: '',
            start_date: '',
            end_date: '',
            planAdd: true,
        });
        
        let dateData = new Date();
        let reqToAPi = {
            "col": ["name", "type", "start_date", "end_date", "description", "status", "is_adhoc_cycle", "createdby", "updatedby", "updatedon", "createdon"],
            "row": [[plan_name, "1", start_date, end_date, "", "1", "2", "1", "1", dateData, dateData]]
        }

        console.log(reqToAPi);
        this.props.savePlanDetail(reqToAPi);
        // this.getGridData();
    }

    render() {
        const { noRecordFound, isLoad, columns, rows, plan_name, start_date, end_date, isValid, isInvalidMsg } = this.state;
        let data = { columns: columns, rows: rows }
        const showPagination = (rows.length > 9 ? true : false);        
        return (
            <MDBContainer fluid>
                <MDBRow between>
                    <MDBCol>
                        <MDBCard className="face back text-center existingPlanMainRow mt-3">
                            <MDBCardBody>
                                <MDBRow className="planStepsCard">
                                    <MDBCol >
                                        <div className={this.state.sectionSelect == 'Annual Salary Review Plan' ? "planSectionCard activeclass" : "planSectionCard"} onClick={() => { this.setState({ sectionSelect: 'Annual Salary Review Plan' }) }}> Annual Salary Review Plan</div>
                                    </MDBCol>
                                    <MDBCol>
                                        <div className={this.state.sectionSelect == 'Annual Bonus/Incentive Review Plan' ? "planSectionCard activeclass" : "planSectionCard"} onClick={() => { this.setState({ sectionSelect: 'Annual Bonus/Incentive Review Plan' }) }}> Annual Bonus/Incentive Review Plan </div>
                                    </MDBCol>
                                    <MDBCol>
                                        <div className={this.state.sectionSelect == 'Sales Incentive' ? "planSectionCard activeclass" : "planSectionCard"} onClick={() => { this.setState({ sectionSelect: 'Sales Incentive' }) }}> Sales Incentive </div>
                                    </MDBCol>
                                    <MDBCol>
                                        <div className={this.state.sectionSelect == 'Long Term Incentive' ? "planSectionCard activeclass" : "planSectionCard"} onClick={() => { this.setState({ sectionSelect: 'Long Term Incentive' }) }}> Long Term Incentive </div>
                                    </MDBCol>
                                    <MDBCol>
                                        <div className={this.state.sectionSelect == 'Rewards & Recognition' ? "planSectionCard activeclass" : "planSectionCard"} onClick={() => { this.setState({ sectionSelect: 'Rewards & Recognition' }) }}>  Rewards & Recognition </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    {this.state.sectionSelect == 'Annual Salary Review Plan'
                                        ?
                                        <MDBCol>
                                            {isValid
                                                ? <MDBAlert color="danger" >{isInvalidMsg}</MDBAlert>
                                                : ""
                                            }
                                            <form
                                                className="needs-validation mt-4 salaryReviewForm"
                                                onSubmit={(e) => this.addPlanToList(e)}
                                                noValidate
                                            >
                                                <FormControlElement tooltip={true} value={this.state.city}
                                                    changeHandler={(e) => this.handleChange(e)}
                                                    type="text"
                                                    id="plan_name"
                                                    ctrlFor="frmExistingElePlan"
                                                    value={plan_name}
                                                    className="form-control"
                                                    name="plan_name"
                                                    placeholder="Plan Name"
                                                    blurHandler={(e) => this.handleBlur(e)}
                                                />
                                                <FormControlElement tooltip={true} value={this.state.city}
                                                    changeHandler={(e) => this.handleChange(e)}
                                                    type="date"
                                                    value={start_date}
                                                    ctrlFor="frmExistingElePlan"
                                                    id="start_date"
                                                    className="form-control"
                                                    name="start_date"
                                                    placeholder="Start Date"
                                                    blurHandler={(e) => this.handleBlur(e)}
                                                />

                                                <FormControlElement tooltip={true} value={this.state.city}
                                                    changeHandler={(e) => this.handleChange(e)}
                                                    type="date"
                                                    value={end_date}
                                                    ctrlFor="frmExistingElePlan"
                                                    id="end_date"
                                                    className="form-control frmExistingElePlan"
                                                    name="end_date"
                                                    placeholder="End Date"
                                                    blurHandler={(e) => this.handleBlur(e)}
                                                />
                                                <MDBBtn
                                                    color="primary"
                                                    className="btn p-2 m-0 formSubmitBtn"
                                                    type="submit"
                                                >
                                                    Add
                                        </MDBBtn>
                                            </form>
                                        </MDBCol>
                                        :
                                        <MDBCol>
                                            <NotFoundPage />
                                        </MDBCol>
                                    }

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        {this.state.sectionSelect == 'Annual Salary Review Plan'
                            ?
                            <MDBCard className="mt-3" style={{ 'background': 'rgba(0,0,0,0.5)' }}>
                                <MDBCardBody >
                                    <MDBCardTitle className="text-left mb-12 font-bold" style={{ color: 'white' }}>Existing Annual Salary Review Plans :</MDBCardTitle>
                                    {/* <MDBDataTable
                                        striped
                                        bordered
                                        className="dataTable"
                                        small
                                        paging={showPagination}
                                        info={showPagination}
                                        searching={false}
                                        data={data}
                                        entriesLabel="Show"
                                        style={{ 'backgroundColor': 'white' }}
                                    /> */}
                                    <ReactTable
                                        style={{ 'background': '#fff', 'padding': '5px' }}
                                        data={rows}
                                        columns={columns}
                                        PaginationComponent={Pagination}
                                        className="-striped -highlight dataTable"
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]) === filter.value}
                                    />
                                    {
                                        noRecordFound &&
                                        <div style={{ 'color': 'white' }} >
                                            No Records Found
                                    </div>
                                    }
                                </MDBCardBody>
                            </MDBCard>
                            : ""}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
        savePlanDetail: (planDetail) => dispatch(setPlan(planDetail))
    }
}

const connectedExistingPlan = connect(null, mapDispatchToProps)(ExistingPlan);
export { connectedExistingPlan as ExistingPlan }; 
