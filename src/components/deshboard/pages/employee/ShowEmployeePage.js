/**
 * Author : Nidhi Gadhvi
 * Purpose : Component to show employees.
 * 
 */

import React from 'react'
import { connect } from 'react-redux';
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
import axios from 'axios';
import Pagination from "../../../sharedComponent/Pagination";
import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import

import moment from 'moment';

const ReactTableFixedColumns = withFixedColumns(ReactTable);



class ShowEmployeePage extends React.Component {
    fileToDownload = []
    rows = []
    currentEmployee = []

    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            modal: false,
            showUpload: false,
            showForm: false,
            noRecordFound: false,
            csvIncorrect: false,
            fileToDownload: [],
            invalidMsg: [],
            csvUploadComplete: false,
            gridReady: false,
            uploadCsv: false,
            columns: EmployeeColumns,
            rows: [],
            currentEmployee: [],
            data: this.props.data,
            loading: false,
            pages: 0
        }
        employeeService.downloadEmployee()
            .then(
                employee => {
                    let x = [];
                    x.push(employee.data.data.col);
                    _.forEach(employee.data.data.row, (val, index) => {
                        x.push(val);
                    });
                    this.setState({
                        fileToDownload: x
                    })

                },
                error => {
                    console.log('inot the error');
                    console.log(error);
                }
            );
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
        this.columns = tempColumnArray;
        employeeService.getEmployeeList()
            .then(
                employee => {
                    let col = [
                        {
                            Header: "Name",
                            fixed: "left",

                            columns: [
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                    width: 100
                                },
                                {
                                    Header: 'Employee Code',
                                    accessor: 'employee_code',
                                    width: 100
                                },
                                {
                                    Header: 'Employee Email',
                                    accessor: 'email',
                                    width: 100
                                }
                            ]
                        },
                        {
                            Header: "Emp Info",
                            columns: [
                                {
                                    Header: 'BULevel 3',
                                    accessor: 'business_level_3',
                                    width: 300
                                },
                                {
                                    Header: 'Employee Function',
                                    accessor: 'FUNCTION',
                                    width: 300
                                },
                                {
                                    Header: 'Employee Designation',
                                    accessor: 'designation',
                                    width: 300
                                },
                                {
                                    Header: 'Grade',
                                    accessor: 'grade',
                                    width: 300
                                },
                                {
                                    Header: 'Employee Level',
                                    accessor: 'LEVEL',
                                    width: 300
                                },
                                {
                                    Header: 'Employee Sub Function',
                                    accessor: 'subfunction',
                                    width: 300
                                },

                                {
                                    Header: 'City',
                                    accessor: 'city',
                                    width: 300
                                },
                                {
                                    Header: 'Country',
                                    accessor: 'country',
                                    width: 300
                                },

                                {
                                    Header: 'Emp Joining Date For Salary Review',
                                    accessor: 'increment_purpose_joining_date',
                                    width: 300
                                },
                                {
                                    Header: 'Emp Performance Ratings For This Year',
                                    accessor: 'performance_rating',
                                    width: 300
                                }
                            ]
                        },
                        {
                            Header: "",
                            fixed: "right",
                            columns: [
                                {
                                    Header: 'Action',
                                    accessor: 'action'
                                }
                            ]
                        }
                    ]

                    _.forEach(employee.row, (val, index) => {

                        this.rows.push({
                            employee_code: val[0],
                            email: val[7],
                            city: val[1],
                            country: val[2],
                            business_level_3: val[3],
                            LEVEL: val[4],
                            FUNCTION: val[5],
                            grade: val[8],
                            subfunction: val[9],
                            designation: val[10],
                            increment_purpose_joining_date: moment(val[11]).format('DD-MM-YYYY'),
                            performance_rating: val[13],
                            status: <MDBBadge color="success" pill className="statusBadge">{val[12] == '1' ? 'Active' : 'Pending'}</MDBBadge>,
                            action: <div><MDBIcon icon="pen-alt" onClick={() => { this.employeeEdit(val[7]) }} className="iconActionEdit" /> <MDBIcon icon="trash-alt" className="iconActionDelete" /></div>
                        });
                    })
                    this.setState({
                        gridReady: true,
                        columns: col,
                        rows: this.rows
                    })
                },
                error => {
                    console.log('inot the error');
                    console.log(error);
                }
            );
    }

    toggle = () => {
        console.log("into the main edit click");
        this.setState({
            modal: !this.state.modal
        });
    }

    employeeEdit = (id) => {
        console.log("inr or h ienokiyee edut");
        console.log(id);
        employeeService.getEmployee(id).
            then(
                employee => {
                    this.setState({
                        currentEmployee: employee,
                        modal: !this.state.modal
                    })
                }
            )
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

    handleForce(data) {
        console.log("Upload ################# Data CSV");
        console.log(data);
        // this.fileToDownload = data;

        this.setState({ isLoad: true });
        let columnsArray = data[0];
        let errorMsg = [];

        if (data[0].length !== CsvValidationConfig.cols.length) {
            // File columns are not matched.            
            let diff = _.difference(CsvValidationConfig.cols, data[0]);
            errorMsg = ["Csv File 's columns dose not match with standard CSV format.Please download Required CSV file format."];
        }
        else {
            //ittrate each coulmns are as par file exported            
            _.remove(data, (value, key) => {
                return value.length == 1 && _.isEmpty(value[0]);
            })
            // get missed records
            _.forEach(data, (value, key) => {
                // Record are empty                
                let Eid = _.findIndex(value, function (data) { return data == ''; })
                if (Eid !== -1) {
                    errorMsg = ['Csv File having empty value in columns  "' + data[0][Eid] + "' at row number  '" + (key + 1) + "' .Please Provide nonempty value for all columns"];
                    this.setState({ invalidMsg: errorMsg })
                }
                // All Validation Regarding Field Data type.
            })
        }

        if (errorMsg.length > 0) {
            // Error is there in uploaded csv file            
            this.setState({
                csvIncorrect: true,
                csvUploadComplete: false,
                invalidMsg: errorMsg,
                isLoad: false
            })
        }
        else {
            // Sucesssfully uploaded is there in uploaded csv file                       
            employeeService.uploadEmployee(data)
                .then(
                    employee => {
                        console.log("Rsponse Commes .....");
                        this.setState({
                            csvIncorrect: false,
                            isLoad: false,
                            invalidMsg: [],
                            csvUploadComplete: true,
                        })
                    },
                    error => {
                        console.log('inot the error');
                        console.log(error);
                    }
                );
        }
    }


    render() {
        const { modal, columns, rows, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, uploadCsv } = this.state;
        let data = { columns: columns, rows: rows }

        const showPagination = (data.rows.length > 9 ? true : false)
        const csvReader = <CSVFileUPloadComponent
            isLoad={isLoad}
            csvUploadComplete={csvUploadComplete}
            invalidMsg={invalidMsg}
            csvIncorrect={csvIncorrect}
            alertClose={() => this.alertClose()}
            handleForce={(data) => this.handleForce(data)} />

        return (
            <MDBContainer fluid className="employeeWrapper pb-3">
                {
                    gridReady
                        ?
                        <MDBRow className="justify-content-center" style={{ margin: '1% 0 0 0', background: 'rgba(0,0,0,0.5)' }}>
                            <MDBCol sm="12" md="12" lg="12" >
                                {modal
                                    ?
                                    <div>       <MDBBtn onClick={this.toggle} className="blue darken-2 mr-12 actionBtn"><MDBIcon icon="long-arrow-alt-left" className="pr-2" />Back</MDBBtn>
                                        <EmployeeForm formSubmited={this.toggle} employee={this.state.currentEmployee} /></div>

                                    :
                                    <div>
                                        <div className="text-right button-group"><MDBBtn className="blue darken-2 mr-12 actionBtn" onClick={this.toggle}><MDBIcon icon="plus" className="pr-2" />Add Employee</MDBBtn>
                                            <MDBBtn className="blue darken-2 mr-12 actionBtn"><MDBIcon icon="download" className="pr-2" /><CSVLink data={this.state.fileToDownload} style={{ color: 'white' }}>Download Data</CSVLink></MDBBtn>
                                            {/* <MDBBtn className="blue darken-2 mr-12 actionBtn" onClick={() => { this.setState({ uploadCsv: !uploadCsv }) }} ><MDBIcon icon="upload" className="pr-2 " />Upload Employees</MDBBtn> */}
                                        </div>
                                        <div className="mt-5 mb-5"> {uploadCsv ? csvReader : ''}</div>
                                        <MDBCard className="mt-3" className="addEmployeeCard">
                                            <MDBCardBody>
                                                <MDBCardTitle className="text-left mb-12 font-bold"><h5>Employee List :</h5></MDBCardTitle>
                                                <ReactTableFixedColumns
                                                    data={rows}
                                                    columns={columns}
                                                    PaginationComponent={Pagination}
                                                    className="-striped"

                                                    filterable
                                                    defaultFilterMethod={(filter, row) =>
                                                        String(row[filter.id]) === filter.value}
                                                />
                                                {noRecordFound && <div>
                                                    No Resords Found
                                                </div>}
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                }
                            </MDBCol>
                        </MDBRow>
                        :
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span> </div>
                }
            </MDBContainer>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
    }
}
const connectedShowEmployeePage = connect(mapDispatchToProps)(ShowEmployeePage);
export { connectedShowEmployeePage as ShowEmployeePage }; 
