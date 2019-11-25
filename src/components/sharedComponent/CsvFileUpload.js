/**
 * Author: Nidhi Gahdavi
 * Purpose : Form Control for the input element in element form.
 */

import React from 'react';
import * as _ from 'lodash';
import { MDBCol, MDBIcon, MDBRow, MDBCard, MDBCardBody, MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import CSVReader from "react-csv-reader";
// import demoCsvFile from '../../assets/file/demoCsvFile';
import { CSVLink, CSVDownload } from "react-csv";
import ToolTip from './ToolTip';
import csvData from '../../constants/demoCsvFileData';

class CSVFileUPloadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileTypeInvalid: false

        }
    }

    handleFileUPload(data) {
        this.setState({ fileTypeInvalid: false })
        if (document.getElementById("csvFile").files[0].name.split('.').pop() == 'csv') {
            document.getElementById("path").value = document.getElementById("csvFile").files[0].name;
            this.props.handleForce(data)
        }
        else {
            console.log("File Type : !CSV");
            this.setState({
                fileTypeInvalid: true
            })
        }
    }

    render() {
        return (
            <MDBCard>
                <MDBCardBody>
                    {this.state.fileTypeInvalid
                        ? <MDBAlert color="danger" dismiss> File Should be CSV File.</MDBAlert>
                        : ""
                    }
                    {this.props.csvUploadComplete
                        ?
                        <MDBAlert color="success" dismiss>Csv Uploaded Sucessfully.</MDBAlert>
                        : this.props.invalidMsg.length > 0
                            ?
                            <MDBAlert className="custom-alert" color="danger" >
                                {
                                    _.forEach(this.props.invalidMsg, function (value, key) {
                                        return <p>{value}</p>
                                    })
                                }<MDBIcon icon="window-close alertClose" onClick={() => this.props.alertClose()} /></MDBAlert>
                            : ""
                    }
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12">
                            <h5 style={{ display: 'inline-block' }}>Import Employees : <ToolTip tolltipMsg="Ensure that all the columns in your CSV File have a heading as sample." /></h5>                            
                            <span className=" ml-2 p-0 import_employee_card"><CSVLink data={csvData} target="_blank" >
Download File Format.</CSVLink></span>
                        </MDBCol>
                    </MDBRow>


                    <MDBRow className="mt-3">
                        <p className="fileUpload">
                            <input type="text" id="path" placeholder="Select CSV file" />
                            <label className="add-photo-btn blue darken-2"><MDBIcon icon="upload" className="pr-2" />Choose File
                            <CSVReader
                                    cssClass="justify-content-left "
                                    onFileLoaded={(data) => { this.handleFileUPload(data) }}
                                    inputId="csvFile"
                                />
                            </label>
                        </p>
                    </MDBRow>
                    {this.props.isLoad ? <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span> </div> : ""}
                </MDBCardBody>
            </MDBCard>
        )
    }
}

export default CSVFileUPloadComponent;
