import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCard, MDBCol, MDBRow, MDBView, MDBDataTable, MDBMask, MDBCardImage, MDBCardBody, MDBBadge, MDBAlert, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink } from 'react-router-dom';

class ManageRatingsPage extends Component {

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


    constructor(props) {
        super(props)
        console.log("%c red" , "hello this is reddd")
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow between>
                    <MDBCol>
                        <ReactTable
                            style={{ 'background': '#fff', 'padding': '5px' }}
                            data={this.rows}
                            defaultPageSize="5"
                            showPagination="false"
                            columns={this.columns}
                            className="-striped -highlight dataTable"
                            filterable
                            defaultFilterMethod={(filter, row) =>
                                String(row[filter.id]) === filter.value}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default ManageRatingsPage;