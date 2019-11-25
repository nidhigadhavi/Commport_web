/**
 * Author : Nidhi Gadhavi
 * Purpose : Bulk Uplodation of the Employee with CSV file
 */

import React from 'react'
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBAlert, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import * as _ from 'lodash';
import { employeeService } from '../../../../services/employee.service';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';


class AddEmployeePage extends React.Component {
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

    constructor(props) {
        super(props)
        this.state = {
            isLoad: false,
            modal: false,
            noRecordFound: false,
            csvIncorrect: false,
            invalidMsg: [],
            csvUploadComplete: false
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

    handleGridSearchChange(e) {
        let that = this;
        let key = e.target.name
        let tr = document.getElementsByTagName("tr");
        let filter = e.target.value.toUpperCase();
        let rowToDisplay = [];
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
        else {
            this.setState({
                noRecordFound: false
            })
        }
    }

    handleForce(data) {
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
                    errorMsg = ["Csv File having empty value in columns" + data[0][Eid] + " at row number " + (key + 1) + ". Please Provide nonempty value for all columns"];
                    this.setState({ invalidMsg: errorMsg })
                }
                // All Validation Regarding Field Data type.
            })
        }

        if (errorMsg.length > 0) {
            // Error is there in uploaded csv file
            console.log("EROR:::::::");
            this.setState({
                csvIncorrect: true,
                csvUploadComplete: false,
                invalidMsg: errorMsg,
                isLoad: false
            })
        }
        else {
            // Sucesssfully uploaded is there in uploaded csv file
            console.log("SUCESS :::::");
            employeeService.uploadEmployee(data)
                .then(
                    employee => {
                        console.log("Rsponse Comes .....");
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

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { isLoad, invalidMsg, csvIncorrect, csvUploadComplete, noRecordFound } = this.state;
        const showPagination = (this.data.rows.length > 9 ? true : false)
        return (
            <MDBContainer fluid className="employeeWrapper pb-3">
                <MDBRow className="justify-content-center import-employee" style={{ margin: '1% 0 0 0', background: 'rgba(0,0,0,0.5)' }}>
                    <MDBCol sm="12" md="12" lg="12" className="mt-3" >
                        <CSVFileUPloadComponent
                            isLoad={isLoad}
                            csvUploadComplete={csvUploadComplete}
                            invalidMsg={invalidMsg}
                            csvIncorrect={csvIncorrect}
                            alertClose={() => this.alertClose()}
                            handleForce={(data) => this.handleForce(data)} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center" style={{ margin: '1% 0 0 0', background: 'rgba(0,0,0,0.5)' }}>
                    <MDBCol sm="12" md="12" lg="12">
                        <MDBCard className="addEmployeeCard" className="mt-3">
                            <MDBCardBody>
                                <MDBCardTitle className="text-left mb-12 font-bold"><h5>Historical Uploads :</h5></MDBCardTitle>
                                <MDBDataTable
                                    striped
                                    bordered
                                    className="dataTable"
                                    small
                                    paging={showPagination}
                                    info={showPagination}
                                    searching={false}
                                    data={this.data}
                                    entriesLabel="Show"
                                    style={{ 'backgroundColor': 'white' }}
                                />
                                {/* <ReactTable
                                    data={rows}
                                    columns={columns}
                                    PaginationComponent={Pagination}
                                    className="-striped -highlight"
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]) === filter.value}
                                /> */}
                                {noRecordFound && <div>
                                    No Resords Found
                                                </div>}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default AddEmployeePage;