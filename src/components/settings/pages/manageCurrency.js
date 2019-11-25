/**
 * Author : Nidhi Gadhavi
 * Purpose : Manage Currency
 */

import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';

import ReactTable from "react-table";
import "react-table/react-table.css";
import FormControlElement from './section/FormControl';

class ManageCurrencyPage extends React.Component {
    count = 0;

    columns = [{
        Header: 'SR No',
        accessor: 'SR_No'
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Code',
        accessor: 'code'
    },
    {
        Header: 'Status',
        accessor: 'status'
    },
    {
        Header: 'Action',
        accessor: 'action'
    }];

    rows = [{
        SR_No: 1,
        name:"United States Dolar",
        code: "$",
        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
        action: <div><MDBIcon icon="pen-alt" onClick={() => { console.log("edit clicked....");}} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
    },
    {
        SR_No: 2,
        name:"United States Dolar",
        code: "$",
        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
        action: <div><MDBIcon icon="pen-alt" onClick={() => { console.log("edit clicked....");}} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
    },
    {
        SR_No: 3,
        name:"United States Dolar",
        code: "$",
        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
        action: <div><MDBIcon icon="pen-alt" onClick={() => { console.log("edit clicked....");}} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
    },{
        SR_No: 4,
        name:"United States Dolar",
        code: "$",
        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
        action: <div><MDBIcon icon="pen-alt" onClick={() => { console.log("edit clicked....");}} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
    },{
        SR_No: 5,
        name:"United States Dolar",
        code: "$",
        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
        action: <div><MDBIcon icon="pen-alt" onClick={() => { console.log("edit clicked....");}} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
    }]

    data = {
        columns: [
            {
                label: <div><label>S.No</label><div><input type="text" className="form-control sm" name='sno' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
                field: 'sno',
                sort: 'asc',
            },
            {
                label: <div><label>Uploaded By Name</label><div><input type="text" className="form-control sm" name='uploaded_by_name' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
                field: 'uploaded_by_name',
                sort: 'asc',
            },
            {
                label: <div><label>Uploaded File Name</label><div><input type="text" className="form-control sm" name='upload_file_name' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
                field: 'upload_file_name',
                sort: 'asc',
            },
            {
                label: <div><label>Uploaded DateTime</label><div><input type="text" className="form-control sm" name='uploaded_date_time' onChange={(e) => this.handleGridSearchChange(e)} /></div></div>,
                field: 'uploaded_date_time',
                sort: 'asc',
            },
            {
                label: 'Action',
                field: 'action',
            }
        ],
        rows: [
            {
                sno: '1',
                uploaded_by_name: 'Nidhi Gahdavi',
                upload_file_name: 'EmployeeJuneINtake.csv',
                uploaded_date_time: '12/07/2019, 5:46PM',
                action: <div><MDBIcon icon="pen-alt" className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
            },
            {
                sno: '2',
                uploaded_by_name: 'Nidhi Gahdavi',
                upload_file_name: 'EmployeeJuneINtake.csv',
                uploaded_date_time: '12/07/2019, 5:46PM',
                action: <div><MDBIcon icon="pen-alt" className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
            },
            {
                sno: '3',
                uploaded_by_name: 'Nidhi Gahdavi',
                upload_file_name: 'EmployeeJuneINtake.csv',
                uploaded_date_time: '12/07/2019, 5:46PM',
                action: <div><MDBIcon icon="pen-alt" className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
            }
            ,
            {
                sno: '4',
                uploaded_by_name: 'Nidhi Gahdavi',
                upload_file_name: 'EmployeeJuneINtake.csv',
                uploaded_date_time: '12/07/2019, 5:46PM',
                action: <div><MDBIcon icon="pen-alt" className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
            },

            {
                sno: '5',
                uploaded_by_name: 'Nidhi Gahdavi',
                upload_file_name: 'EmployeeJuneINtake.csv',
                uploaded_date_time: '12/07/2019, 5:46PM',
                action: <div><MDBIcon icon="pen-alt" className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
            }
        ]
    }

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
            columns: this.columns,
            isValid: false,
            isInvalidMsg: '',
            rows: [],
            sectionSelect: 'Annual Salary Review Plan'
        }
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
        console.log("intot he blur of the inouts..");
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
            console.log(val);
            if (val.sr_no == sr_no) {
                this.setState({
                    plan_name: val.plan_name,
                    start_date: val.start_date,
                    end_date: val.end_date
                })
            }
        })
    }

    addPlanToList(e) {
        console.log("into the add plan to list");
        console.log(e);
        e.preventDefault();
        let that = this;
        this.setState({
            isLoad: true
        })
        this.count = this.count + 1;
        const { plan_name, sr_no, start_date, end_date } = this.state;
        let obj = {
            sr_no: this.count,
            plan_name: plan_name,
            start_date: start_date,
            end_date: end_date,
            action: <div>
                <a className="planActionLink" onClick={(e) => this.editPlan(sr_no + 1, e)} >Edit</a> |
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
        console.log("Inot SAVE plan Details..");
        let dateData = new Date();
        // console.log(dateData.toLocaleFormat('%A, %B %e, %Y'));

        let reqToAPi = {
            "col": ["name", "type", "start_date", "end_date", "description", "status", "is_adhoc_cycle", "createdby", "updatedby", "updatedon", "createdon"],
            "row": [[plan_name, "1", start_date, end_date, "", "1", "2", "1", "1", dateData, dateData]]
        }

        console.log(reqToAPi);
        this.props.savePlanDetail(reqToAPi);
    }

    render() {
        const { noRecordFound, isLoad, columns, rows, plan_name, start_date, end_date, isValid, isInvalidMsg } = this.state;
        let data = { columns: columns, rows: rows }
        return (
            <MDBContainer>
                <MDBRow between>
                    <MDBCol>
                        <MDBCard className="face back text-center existingPlanMainRow mt-3">
                            <MDBCardBody>
                                <MDBRow>
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
                                                placeholder="Name"
                                                blurHandler={(e) => this.handleBlur(e)}
                                            />
                                            <FormControlElement tooltip={true} value={this.state.city}
                                                changeHandler={(e) => this.handleChange(e)}
                                                type="text"
                                                value={start_date}
                                                ctrlFor="frmExistingElePlan"
                                                id="start_date"
                                                className="form-control"
                                                name="start_date"
                                                placeholder="Code"
                                                blurHandler={(e) => this.handleBlur(e)}
                                            />

                                            <FormControlElement tooltip={true} value={this.state.city}
                                                changeHandler={(e) => this.handleChange(e)}
                                                type="text"
                                                value={end_date}
                                                ctrlFor="frmExistingElePlan"
                                                id="end_date"
                                                className="form-control frmExistingElePlan"
                                                name="end_date"
                                                placeholder="Status"
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
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <ReactTable
                                            style={{ 'background': '#fff', 'padding': '5px' }}
                                            data={this.rows}
                                            defaultPageSize = "5"
                                            showPagination = "false"
                                            columns={this.columns}                                            
                                            className="-striped -highlight dataTable"
                                            filterable
                                            defaultFilterMethod={(filter, row) =>
                                                String(row[filter.id]) === filter.value}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
//         savePlanDetail: (planDetail) => dispatch(setPlan(planDetail))
//     }
// }

// const connectedExistingPlan = connect(null, mapDispatchToProps)(ManageCurrencyPage);
// export { connectedExistingPlan as ManageCurrencyPage }; 
export default ManageCurrencyPage;


