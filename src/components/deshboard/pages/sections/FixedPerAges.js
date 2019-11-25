
/**
 * Author: Nidhi Gahdavi
 * Purpose : Form Control for the input element in element form.
 */


import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import _ from 'lodash';

import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class FixedPerAges extends React.Component {
    paddingCls = this.props.ctrlFor == 'frmExistingElePlan' ? 'p-0' : '';
    lableCls = this.props.ctrlFor == 'frmExistingElePlan' ? 'p-2 formLablecssSmall' : 'p-2 formLablecss'
    paddingClassName = this.props.ctrlFor == 'newSalryReviewPlan' || this.props.ctrlFor == 'frmExistingElePlan' ? 'p-0' : '';
    colMdcls1 = this.props.ctrlFor == 'frmExistingElePlan' ? '3'
        :
        this.props.ctrlFor == 'newSalryReviewPlan' ? '4' : '6';
    colMdcls2 = this.props.ctrlFor == 'frmExistingElePlan' ? '9'
        :
        this.props.ctrlFor == 'newSalryReviewPlan' ? '8' : '6';
    animatedComponents = makeAnimated();

    options = this.props.options;
    selectedOptionsStyles = {
        color: "#3c763d",
        backgroundColor: "#dff0d8"
    };
    optionsListStyles = {
        backgroundColor: "#dff0d8",
        color: "#3c763d"
    };

    defaultArray = this.props.options;
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrayOfELe: [{ fromDate: '', EndDate: '', FixedAge: '' }]
        };
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
        this.props.onChange(selectedOption, this.props.placeholder);
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.selectAll) {
            this.setState({
                selectedOption: nextprops.options,

            })
        }
    }

    addElement() {
        let obj = { fromDate: '', EndDate: '', FixedAge: '' }
        let tempArr = this.state.arrayOfELe;
        tempArr.push(obj);
        this.setState({
            arrayOfELe: tempArr
        })
    }

    deleteEle(id){        
        let newEleArr = _.remove(this.state.arrayOfELe , (val, index)=>{
            return index == id;
        })
        this.setState({
            arrayOfELe: this.state.arrayOfELe
        })        
    }

    changeHandler(id ,e){
        console.log("inot the change handler" , id);
        
        var tempArr = this.state.arrayOfELe;
        _.map(tempArr , (val, index)=>{
            if(index == id){
                val[e.target.id] = e.target.value;
            }
        })
        
        this.setState({
            arrayOfELe : tempArr
        })

    }

    render() {
        var { arrayOfELe } = this.state;        
        return (
            <MDBRow className='mb-3'>
                <MDBCol md={this.colMdcls1} >
                    <p className="m-0 formLablecss basicRuleFormLable" >{this.props.placeholder}
                    <MDBIcon className='info-circle'></MDBIcon></p>
                </MDBCol>
                <MDBCol md={this.colMdcls2} className={this.paddingClassName}>
                    <MDBRow >
                        <MDBCol sm="12" className="text-right mb-2">
                            <MDBBtn className="m-0 p-0 add-dlt-btn" onClick={() => this.addElement()}> Add</MDBBtn></MDBCol>
                    </MDBRow>
                        {
                            _.map(arrayOfELe, (val, index) => {                             
                                 return <MDBRow key={index} >
                                    <MDBCol lg="3" className="pr-0 mb-1">
                                        <input
                                            value={val.fromDate}
                                            onChange={(e) => this.changeHandler(index, e)}
                                            type="date"
                                            id="fromDate"
                                            className="p-2 form-control basicRuleFormInput"
                                            name="fromDate"
                                            placeholder="Start Date"
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol lg="3" className="pr-0 mb-1">
                                        <input
                                            value={val.EndDate}
                                            onChange={(e)=> this.changeHandler(index,e)}
                                            type="date"
                                            id="EndDate"
                                            className="p-2 form-control basicRuleFormInput"
                                            name="endDate"
                                            placeholder="End Date"
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol lg="4" className="pr-0 mb-1">
                                        <input
                                            value={val.FixedAge}
                                            onChange={(e)=>this.changeHandler(index, e)}
                                            type="text"
                                            id="FixedAge"
                                            className="p-2 form-control basicRuleFormInput"
                                            name="fixedage"
                                            placeholder="Fixed % Age"
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol lg="2" className=""><MDBIcon icon="trash red-text"  onClick={()=> this.deleteEle(index)} ></MDBIcon></MDBCol>
                                </MDBRow>
                            })
                        }
                    
                    <div className="invalid-feedback">
                        Please provide a valid {this.props.placeholder}.
              </div>
                    <div className="valid-feedback">Looks good!</div>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default FixedPerAges;
