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
import { getFlagTarget, getPlan, getBuisnessElements, getMarketSalaryElements } from '../../../../actions/salaryReview.action';

import ToolTip from '../../../sharedComponent/ToolTip';

class SalaryReviewGridPage extends React.Component {
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
            baseinc: '',
            maxIncreaseForRecentlyPromotedCases: '',
            overallMaxinc: '',
            lt12: '',
            gt12: ''
        }
        
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillMount() {
        setTimeout(() => {            
            // this.setState({
            //     marketSalaryElements: this.props.BuisnessElements.marketEle
            // })
            //  console.log(this.props.BuisnessElements.marketEle);
        }, 1000);
    }

    handleChange = (e) => {
        if(e.target.id == "overallMaxinc" || e.target.id == "maxIncForRecentPromotedCase"){
            if(e.target.value < this.state.baseinc){
                alert("This Value should not be less than baseIncrease");
            }
            else{
                this.setState({
                    [e.target.id]: e.target.value
                })  
            }
        }
        else{
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        
    }

    render() {
        const { modal, isLoad, showUpload, showForm, csvUploadComplete, csvIncorrect, noRecordFound, invalidMsg, gridReady, uploadCsv } = this.state;
        const { ctrlFor } = this.props;
        const style = (ctrlFor == 'viewSalaryRuleGrid' ? { 'color': 'white', 'background': 'none', 'box-shadow': 'none' } : { 'color': 'white', 'background': 'rgba(0,0,0,0.5)' })
        let dataviewSalaryRuleGrid = {
            columns: [
                {
                    label: 'Base Increase',
                    field: 'baseIncrease',
                },
                {
                    label: 'Target Position In Market BM',
                    field: 'targetPositionInMarketBM',
                },
                {
                    label: '< 12 CR',
                    field: 'lt12cr',
                },
                {
                    label: '> 12 CR',
                    field: 'gt12cr',
                },
                {
                    label: '< 75 CR',
                    field: 'gt75cr',
                },
                {
                    label: '75 to < 100 CR',
                    field: 'from75tolt100cr',
                },
                {
                    label: '100 to < 120 CR',
                    field: 'from100tolt120cr',
                },
                {
                    label: '< 125 CR',
                    field: 'gt125cr',
                },
                {
                    label: 'Overall Max Increase',
                    field: 'overallMaxIncrease',
                },
                {
                    label: 'Max Increase For Recently Promoted Cases',
                    field: 'maxIncreaseForRecentlyPromotedCases',
                }
            ],
            rows: [
                {
                    baseIncrease: <input type="text" id="baseinc" value={this.state.baseinc} onChange={(e) => this.handleChange(e)} />,
                    targetPositionInMarketBM: <div><select value='option1'><option>options1</option><option>options2</option><option>options3</option></select></div>,
                    lt12cr: <div className="th-per"><input type="text" id="lt12" value={this.state.lt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.lt12}%</span><p>11%</p></div>,
                    gt12cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    gt75cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p><p className="th-per-blue">11%</p></div>,
                    from75tolt100cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    from100tolt120cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    gt125cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12}%</span><p>11%</p></div>,
                    overallMaxIncrease: <input type="text" id="overallMaxinc" value={this.state.overallMaxinc} onChange={(e) => this.handleChange(e)} />,
                    maxIncreaseForRecentlyPromotedCases: <input type="text" id="maxIncForRecentPromotedCase" onChange={(e) => this.handleChange(e)} value={this.state.maxIncreaseForRecentlyPromotedCases} />,
                }
            ]
        };

        let dataGrid = {
            columns: [
                {
                    label: 'Base Increase',
                    field: 'baseIncrease',
                },
                {
                    label: 'Target Position In Market BM',
                    field: 'targetPositionInMarketBM',
                },
                {
                    label: '< 12 CR',
                    field: 'lt12cr',
                },
                {
                    label: '> 12 CR',
                    field: 'gt12cr',
                },
                {
                    label: 'Overall Max Increase',
                    field: 'overallMaxIncrease',
                },
                {
                    label: 'Max Increase For Recently Promoted Cases',
                    field: 'maxIncreaseForRecentlyPromotedCases',
                }
            ],
            rows: [
                {
                    baseIncrease: <input type="text" id="baseinc" value={this.state.baseinc} onChange={(e) => this.handleChange(e)} />,
                    targetPositionInMarketBM: <div><select value='option1'><option>options1</option><option>options2</option><option>options3</option></select></div>,
                    lt12cr: <div className="th-per"><input type="text" id="lt12" value={this.state.lt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.lt12 ? (parseInt(this.state.lt12) + parseInt(this.state.baseinc)): (this.state.lt12)}%</span><p>11%</p></div>,
                    gt12cr: <div className="th-per"><input type="text" id="gt12" value={this.state.gt12} onChange={(e) => this.handleChange(e)} /><span>{this.state.gt12 ? (parseInt(this.state.gt12) + parseInt(this.state.baseinc)): (this.state.gt12)}%</span><p>11%</p></div>,
                    overallMaxIncrease: <input type="text" id="overallMaxinc" value={this.state.overallMaxinc} onChange={(e) => this.handleChange(e)} />,
                    maxIncreaseForRecentlyPromotedCases: <input type="text" id="maxIncForRecentPromotedCase" onChange={(e) => this.handleChange(e)} value={this.state.maxIncreaseForRecentlyPromotedCases} />,
                }
            ]
        };

        let data = (ctrlFor == 'viewSalaryRuleGrid' ? dataviewSalaryRuleGrid : dataGrid);

        const showPagination = (data.rows.length > 9 ? true : false)

        return (
            <MDBContainer fluid>
                <MDBCard className="mt-3" style={style}>
                    {ctrlFor == 'viewSalaryRuleGrid'
                        ? ""
                        : <MDBCardBody className="m-3 body-bg-clr">
                            <MDBRow>
                                <MDBCol sm="12">
                                    <p className="success-msg m-0">0 Employee(s) under your responsibility are not covered in any rule as yet. Click Here to see the list.
                                    </p>
                                </MDBCol>
                                <MDBCol sm="12"><hr></ hr></MDBCol>
                                <MDBCol sm="12"><h5 className="salary-review-grid-header">DEFINE BASIC RULES :-TEST RULE INFORMATION <ToolTip tolltipMsg="Define Basic Rule:- Test Rule Salary" /></h5>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>}
                    <MDBCardBody className="mb-3 ml-3 mr-3 mt-0 body-bg-clr">
                        <MDBRow>
                            {ctrlFor == 'viewSalaryRuleGrid' ?
                                <MDBCol sm="4"><h5 className="salary-review-grid-header">DEFINE SALARY REVIEW GRID <ToolTip tolltipMsg="Define Salary Review Grid" /></h5>  </MDBCol> :
                                <MDBCol sm="8"><h5 className="salary-review-grid-header">DEFINE SALARY REVIEW GRID <ToolTip tolltipMsg="Define Salary Review Grid" /></h5> </MDBCol>}
                            <MDBCol sm="4">
                                <div className="distribution-box">
                                    <p className="mb-2"><span></span>Pre increase population distribution</p>
                                    <p><span></span>Post increase population distribution</p>
                                </div>
                            </MDBCol>
                            {ctrlFor == 'viewSalaryRuleGrid' ?
                                <MDBCol sm="4">
                                    <div className="distribution-box distribution-yellow-box">
                                        <p className="mb-2"><span>158.97%</span>Pre increase population distribution</p>
                                        <p className="mb-2"><span>158.97%</span>Pre increase population distribution</p>
                                        <p><span>158.97%</span>Post increase population distribution</p>
                                    </div>
                                </MDBCol> : ''}
                            <MDBCol sm="12">
                                <MDBDataTable
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
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/basicRule') }}>Back</MDBBtn>
                        
                        <MDBBtn className="p-0 add-dlt-btn W-100" onClick={() => { this.props.history.push('/dashboard/salaryReviewGridWithBudget') }}>Next Step</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer >
        );
    }
}

function mapStateToProps(state) {
    console.log("#MAPSTATETO PROPSSSS");
    console.log(state);
    return {       
        MarketSalaryElements: state.salaryReview
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getEmployeeList: () => dispatch(employeeActions.getEmployeeList()),       

    }
}
const connectedSalaryReviewGridPage = connect(mapDispatchToProps)(SalaryReviewGridPage);
export { connectedSalaryReviewGridPage as SalaryReviewGridPage }; 
