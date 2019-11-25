/**
 * Author : Nidhi Gadhavi
 * Purpose : Salary review Plan
 */


import React from 'react'
import { connect } from 'react-redux';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import * as _ from 'lodash';
import { NavLink } from 'react-router-dom';
import CSVFileUPloadComponent from '../../../sharedComponent/CsvFileUpload';
import CsvValidationConfig from '../../../sharedComponent/csvFileValidation';
import { CSVLink, CSVDownload } from "react-csv";
import EmployeeForm from '../../../sharedComponent/EmployeeForm';
import { employeeActions } from '../../../../actions/employee.action';
import { employeeService } from '../../../../services/employee.service';
import { EmployeeColumns } from '../../../sharedComponent/EmployeeGridColumns';

class DesignCompensastionPlan extends React.Component {
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
            uploadCsv: false,
            toggleList: false
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

    toggleList() {
        console.log("into toggle", this.state.toggleList);
        console.log(!this.state.expandList)
        this.setState({
            expandList: !this.state.expandList
        })
    }

    render() {
        const { expandList, modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, uploadCsv } = this.state;
        const toggleClass = (expandList ? { height: '156px', transition: '0.5s', overflow: 'hidden' } : { height: '0px', transition: '0.5s', overflow: 'hidden' })
        return (
            <div className="stepper-main">
                <div className="container stepper">
                    <MDBRow>
                        <MDBCol></MDBCol>

                        <MDBCol>
                            <div className="stepper-box p-2" >
                                <MDBIcon icon="clipboard-list" className="stepper-icon">
                                </MDBIcon>
                                <h6>Ready to Use plans</h6>
                                <hr/> 
                                <div onClick={() => this.toggleList()}>
                                    <span style={{ color: '#000', paddingBottom: '4px', display: 'inline-block',cursor:'pointer' }}>Select Plan</span>
                                    {expandList ? <MDBIcon icon="angle-down" style={{ marginLeft: '5px', color: '#000' }} />
                                        : <MDBIcon icon="angle-up" style={{ marginLeft: '5px', color: '#000' }} onClick={() => this.toggleList()} />}
                                    <div style={toggleClass} className="showList">
                                        <ul>
                                            <li><NavLink to="/dashboard/viewSalaryRuleDetail">High Performance + Market Performance</NavLink></li>
                                            <li><NavLink to="/dashboard/viewSalaryRuleDetail">Moderate Performance + Market Correction</NavLink></li>
                                            <li><NavLink to="/dashboard/viewSalaryRuleDetail">Low Performance + Market Correction</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </MDBCol >
                        <MDBCol>
                            <NavLink exact={true} to="/dashboard/useExistingPaln" >    <div className="stepper-box">
                                <MDBIcon icon="newspaper" className="stepper-icon">
                                </MDBIcon>
                                <h6>Create salary Plan</h6>
                            </div></NavLink>
                        </MDBCol >
                        <MDBCol>
                        </MDBCol >

                    </MDBRow>
                </div>
            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),
    }
}
const connectedDesignCompensastionPlan = connect(mapDispatchToProps)(DesignCompensastionPlan);
export { connectedDesignCompensastionPlan as DesignCompensastionPlan }; 
