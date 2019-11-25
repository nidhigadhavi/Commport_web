/**
 * Author : Nidhi Gadhavi
 * Purpose : Salary review Plan
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
import { employeeActions } from '../../../../actions/employee.action';
import { employeeService } from '../../../../services/employee.service';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';

class SalaryReviewPlan extends React.Component {
    data = {
        columns: [],
        rows: []
    }

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
            csvUploadComplete: false,
            gridReady: false,
            uploadCsv: false
        }
    }

    componentDidUpdate() {
        if (document.getElementsByClassName('dataTables_wrapper').length > 0) {
            document.getElementsByClassName('dataTables_wrapper')[0].children[1].setAttribute('style', 'overflow-x:auto')
            document.getElementsByTagName('thead')[1].setAttribute('style', 'display:none')
            document.getElementsByTagName('th')[10].setAttribute('class', 'no-after')
            document.getElementsByTagName('th')[10].setAttribute('style', 'width:64px')
            document.getElementsByClassName('dataTables_filter')[0].setAttribute('style', 'display:none');
            if (document.getElementsByClassName('dataTables_length')[0].children[0].innerText.search('entries') == -1) {
                document.getElementsByClassName('dataTables_length')[0].children[0].innerHTML = document.getElementsByClassName('dataTables_length')[0].children[0].innerHTML.concat("entries");
            }
            document.getElementsByClassName('dataTables_length')[0].children[0].children[0].setAttribute('style', 'margin:0 8px')
            if (this.data.rows.length < 10) {
                document.getElementsByClassName('dataTables_wrapper')[0].children[2].setAttribute('style', 'display:none')
            }
        }
    }

    alertClose() {
        this.setState({
            csvIncorrect: false,
            isLoad: false,
            csvUploadComplete: false,
            invalidMsg: []
        })
    }

    componentWillMount() {
        let that = this;
        let tempArray = [];
        let tempColumnArray = []
        EmployeeColumns.forEach((value, key) => {
            let obj = {
                label: <div><label>{value.label}</label>{value.field !== 'action' && <div><input type="text" className="form-control sm" name={value.field} onChange={(e) => this.handleGridSearchChange(e)} /></div>}</div>,
                field: value.field,
                sort: value.sort
            }
            tempColumnArray.push(obj);
        })
        this.data.columns = tempColumnArray;
        
        employeeService.getEmployeeList()
            .then(
            employee => {
                let col = employee.data.col;
                this.fileToDownload.push(col);
                _.forEach(employee.data.row, (val, index) => {
                    this.fileToDownload.push(val)
                    this.data.rows.push({
                        employee_full_name: val[2],
                        employee_email: val[4],
                        bu_level_3_area: val[10],
                        main_function: val[11],
                        designation_title: val[14],
                        grade: val[15],
                        level: val[16],
                        date_of_joining_for_salary_review_purpose: val[22],
                        performance_rating_for_this_year: val[28],
                        status: <MDBBadge color="success" pill className="statusBadge">Active</MDBBadge>,
                        action: <div><MDBIcon icon="pen-alt" onClick={() => { this.toggle() }} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
                    });
                })
                this.setState({
                    gridReady: true
                })
            }
            );
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
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

    render() {
        alert("hi");
        const { modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, uploadCsv } = this.state;
        return (
            <MDBContainer>
                <MDBRow between>
                    <MDBCol style={{ minHeight: '26rem', maxWidth: "22rem" }}>
                        <MDBCard className="face back text-center">
                            <NavLink exact={true} to="/dashboard/designCompensastionPlan">
                            <MDBCardBody>
                                <MDBCardTitle className="text-ceter font-weight-bold my-4">
                                    Use Existing
                                </MDBCardTitle>
                                <hr />
                            </MDBCardBody>
                            </NavLink>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol style={{ minHeight: '26rem', maxWidth: "22rem" }}>
                        <MDBCard className="face back text-center">
                            <MDBCardBody>
                                <MDBCardTitle className="text-ceter font-weight-bold my-4">Create New Plan
                                </MDBCardTitle>
                                <hr />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
    }
}
const connectedSalaryReviewPlan = connect(mapDispatchToProps)(SalaryReviewPlan);
export { connectedSalaryReviewPlan as SalaryReviewPlan }; 
