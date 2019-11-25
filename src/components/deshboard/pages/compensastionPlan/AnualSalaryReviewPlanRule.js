/**
 * Author : Nidhi Gadhavi
 * Purpose : Salary review Plan
 */
import React from 'react'
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';
import { CSVLink, CSVDownload } from "react-csv";
import EmployeeForm from '../../../sharedComponent/EmployeeForm';
import { employeeActions } from '../../../../actions/employee.action';
import { getFlagTarget, getRuleWiseDetail } from '../../../../actions/salaryReview.action';
import { employeeService } from '../../../../services/employee.service';
import { employeeCompansationService } from '../../../../services/compansation.service';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';
import ReactTable from "react-table";
import Pagination from "../../../sharedComponent/Pagination";
import "react-table/react-table.css";
import moment from 'moment';

class AnualSalaryReviewPlanRule extends React.Component {

    count = 0;
    columns = [
        {
            label: <div><label>S.No</label><div><input type="text" className="form-control sm" name='sno' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'sr_no',
            sort: 'asc',
        },
        {
            label: <div><label>Plan Name</label><div><input type="text" className="form-control sm" name='paln_name' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'plan_name',
            sort: 'asc',
        },
        {
            label: <div><label>Rule Name</label><div><input type="text" className="form-control sm" name='rule_name' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'rule_name',
            sort: 'asc',
        },
        {
            label: <div><label>Total Employee</label><div><input type="text" className="form-control sm" name='total_employee' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'total_employee',
            sort: 'asc',
        },
        {
            label: <div><label>Start Date</label><div><input type="text" className="form-control sm" name='start_date' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'start_date',
            sort: 'asc',
        },
        {
            label: <div><label>End Date</label><div><input type="text" className="form-control sm" name='end_date' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'end_date',
            sort: 'asc',
        },
        {
            label: <div><label>Status</label><div><input type="text" className="form-control sm" name='status' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'status',
            sort: 'asc',
        },
        {
            label: <div><label>Created By</label><div><input type="text" className="form-control sm" name='created_by' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'created_by',
            sort: 'asc',
        },
        {
            label: <div><label>Created On</label><div><input type="text" className="form-control sm" name='created_on' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
            field: 'created_on',
            sort: 'asc',
        },
        {
            label: 'Action',
            field: 'action',
        }
    ];

    rows = [];
    columnsToDisplay = [];
    rowsToDisplay = [];

    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            columns: this.columns,
            rows: [],
            columns: []
        }
    }

    componentDidMount() {
        employeeCompansationService.getExistingAnnualSalaryReview()
            .then((data) => {
                let x = [];
                x = [{
                    Header: 'SR No',
                    accessor: 'SR No'
                },
                {
                    Header: 'Plan Name',
                    accessor: 'Plan Name'
                },
                {
                    Header: 'Rule Name',
                    accessor: 'Rule Name'
                },
                {
                    Header: 'Total Employee',
                    accessor: 'Total Employee'
                },
                {
                    Header: 'Start Date',
                    accessor: 'Start Date'
                },
                {
                    Header: 'End Date',
                    accessor: 'End Date'
                },
                {
                    Header: 'Status',
                    accessor: 'Status'
                },
                {
                    Header: 'Created By',
                    accessor: 'Created By'
                },
                {
                    Header: 'Created On',
                    accessor: 'Created On'
                },
                {
                    Header: 'Action',
                    accessor: 'Action'
                }
                ]
                _.forEach(data.row, (val, index) => {
                    console.log(val);
                    let x = {
                        "SR No": val[0],
                        "Rule Name": val[1],
                        "Plan Name": val[2],
                        "Start Date": moment(val[3]).format('DD-MM-YYYY'),
                        "End Date": moment(val[4]).format('DD-MM-YYYY'),
                        "Total Employee": 120,  //static data                     
                        "Status": val[6],
                        "Created By": val[8],
                        "Created On": moment(val[11]).format('DD-MM-YYYY'),
                        "Action": <div>
                            <a className="planActionLink" onClick={(e) => this.props.history.push('/dashboard/viewSalaryRuleDetail')} ><MDBIcon icon="eye" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="list" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => this.print(val,e)} ><MDBIcon icon="print" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => this.copy(val, e)} ><MDBIcon icon="copy" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="envelope" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="trash-alt" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => this.editPlan(val[0], e)} ><MDBIcon icon="edit" /></a> |&nbsp;
                            <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="thumbs-up" /></a>
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

    componentWillMount() {
        const { salaryPlanDetail } = this.props;
        let obj = {
            sr_no: 1,
            plan_name: salaryPlanDetail.plan_name,
            rule_name: 'Rule 1',
            total_employee: 100,
            start_date: salaryPlanDetail.start_date,
            end_date: salaryPlanDetail.end_date,
            status: 'Active',
            createdBy: 'Nibha Jain',
            created_on: '29/07/2019',
            action: <div>
                <a className="planActionLink" onClick={(e) => this.props.history.push('/dashboard/viewSalaryRuleDetail')} ><MDBIcon icon="eye" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="list" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="print" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="copy" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="envelope" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="trash-alt" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="edit" /></a> |&nbsp;
                <a className="planActionLink" onClick={(e) => alert("comming soon.")} ><MDBIcon icon="thumbs-up" /></a>
            </div>
        }

        this.rows.push(obj);
        this.setState({
            rows: this.rows
        });
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
        // Loop through all table rows, and hide those who don't match the search query        
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

    copy(){
        console.log('Copy of plan');
    }

    print(){
        console.log("printing of the main scren");
    }

    editPlan(id, e) {
        console.log("intot the edit plan function....");
        console.log(id);
        this.props.getRuleWiseDetail(id);
    }

    render() {
        const { salaryPlanDetail } = this.props;
        const { noRecordFound, isLoad, columns, rows, plan_name, start_date, end_date } = this.state;
        let data = { columns: columns, rows: rows }
        const showPagination = (rows.length > 9 ? true : false)

        return (
            <MDBContainer fluid>
                <MDBRow between>
                    <MDBCol>
                        <MDBCard className="face back text-center existingPlanMainRow">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol className='text-right'>
                                        <MDBBtn className='p-2' onClick={() => { this.props.history.push("/dashboard/createAnnualSalaryReviewPlanRule") }}> Create New Salary Rule</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mt-3" style={{ 'background': 'rgba(0,0,0,0.5)' }}>
                            <MDBCardBody>
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
                                {rows.length == 0 &&
                                    <div style={{ 'color': 'white' }} >
                                        No Records Found
                                    </div>}
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
        salaryPlanDetail: state.salaryReview.salaryPlanDetail,
        flagForTargetSet: state.salaryReview.flagForTargetSet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
        getFlagTarget: () => dispatch(getFlagTarget()),
        getRuleWiseDetail: (id) => dispatch(getRuleWiseDetail(id))
    }
}
const connectedAnualSalaryReviewPlanRule = connect(mapStateToProps, mapDispatchToProps)(AnualSalaryReviewPlanRule);
export { connectedAnualSalaryReviewPlanRule as AnualSalaryReviewPlanRule };

