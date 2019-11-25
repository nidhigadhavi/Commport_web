/**
 * File : Compoennt for the makinf the prorated increse calculation
 */



import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import _ from 'lodash';
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class EmployeePopulationDistribution extends React.Component {
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

    colourStyles = {
        control: styles => ({ ...styles, fontSize: '13px !important', lineHeight: '14px !important', minHeight: '1px !important', height: '30px !important', borderRadius: '0 !important' }),
        option: styles => ({
            ...styles,
            color: "#3c763d",
            fontSize: '14px',
        })
    };


    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrayOfELe: []
        };
    }

    handleChange = (selectedOption) => {
        console.log("inot the handle chanfge");
        console.log(selectedOption);
        this.setState({
            selectedOption: selectedOption.value
        })
    }

    addElement() {
        let obj = { Range: '' }
        let tempArr = this.state.arrayOfELe;
        tempArr.push(obj);
        this.setState({
            arrayOfELe: tempArr
        })
    }

    deleteEle(id) {
        console.log("Into Delete");
        console.log(id);
        let newEleArr = _.remove(this.state.arrayOfELe, (val, index) => {
            return index == id;
        })
        this.setState({
            arrayOfELe: this.state.arrayOfELe
        })
    }

    render() {
        const options = [
            { value: 'simpleProration', label: 'Simple Proration' },
            { value: 'no', label: 'No' },
            { value: 'fixed%ages', label: 'Fixed %ages' }
        ];
        var { arrayOfELe } = this.state;        
        return (
            <MDBRow className='mb-3'>
                <MDBCol md={this.colMdcls1} >
                    <p className="m-0 formLablecss basicRuleFormLable" >{this.props.placeholder}
                        <MDBIcon className='info-circle'></MDBIcon></p>
                </MDBCol>
                <MDBCol md={this.colMdcls2} className={this.paddingClassName}>
                    <MDBRow>
                        <MDBCol md="9">
                            <input
                                value={this.props.value}
                                onChange={this.props.onChange}
                                type='text'
                                id={this.props.id + "startDate"}
                                className="p-2 form-control basicRuleFormInput"
                                name={this.props.name}
                                placeholder='Range'
                                required
                            />
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBBtn className="m-0 p-0 add-dlt-btn W-100" onClick={() => this.addElement()}>ADD CRR</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    {
                        _.map(arrayOfELe, (val, index) => {
                            console.log(index);
                            return <MDBRow className="mt-2" key={index}>
                                <MDBCol md="9">
                                    <input
                                        value={this.props.value}
                                        onChange={this.props.onChange}
                                        type='text'
                                        id={this.props.id + "startDate"}
                                        className="p-2 form-control basicRuleFormInput"
                                        name={this.props.name}
                                        placeholder='Range'
                                        required
                                    />
                                </MDBCol>
                                <MDBCol md="3">
                                    <MDBBtn className="m-0 p-0 add-dlt-btn W-100" onClick={() => this.deleteEle(index)}>DELETE CRR</MDBBtn>
                                </MDBCol>
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

export default EmployeePopulationDistribution;
