/**
 * File : Compoennt for the makinf the prorated increse calculation
 */



import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class AdditionalFormControlElement extends React.Component {
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

    options = [
        { value: 'numeric', label: 'Numeric' },
        { value: 'alphaNumeric', label: 'Alpha Numeric' },
        { value: 'percentage', label: 'Percentage' }
    ]

    optionsApprover = [
        { value: 'approver1', label: 'Approver1' },
        { value: 'approver2', label: 'Approver2' },
        { value: 'approver3', label: 'Approver3' },
        { value: 'approver4', label: 'Approver4' }
    ]

    optionsBonusRule = [{value:'noBonusSelected', label:'No Bonus Rule Selected'}]

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };
    }

    handleChange = (selectedOption) => {
        console.log("inot the handle chanfge");
        console.log(selectedOption);
        this.setState({
            selectedOption: selectedOption.value
        })
    }

    render() {

        console.log("#render ApplyProratedInc");
        console.log(this.state.selectedOption);
        return (
            <MDBRow className='mb-3'>
                <MDBCol md={this.colMdcls1} >
                    <p className="m-0 formLablecss basicRuleFormLable" >{this.props.placeholder}
                        <MDBIcon className='info-circle'></MDBIcon></p>
                </MDBCol>
                <MDBCol md={this.colMdcls2} className={this.paddingClassName}>
                    <MDBRow>
                        <MDBCol>
                            <input
                                value={this.props.value}
                                onChange={this.props.onChange}
                                type='text'
                                id={this.props.id}
                                className="p-2 form-control basicRuleFormInput"
                                name={this.props.name}
                                placeholder='Additional Recommendation'
                                required
                            />
                        </MDBCol>
                        <MDBCol>
                            <Select
                                closeMenuOnSelect={false}
                                components={this.animatedComponents}
                                onChange={this.handleChange}
                                value={this.state.selectedOption}
                                isMulti={this.props.isMulti ? true : false}
                                options={this.options}
                                required
                                styles={this.colourStyles}
                                closeMenuOnSelect={this.props.isMulti ? false : true}
                            />
                        </MDBCol>
                        <MDBCol>
                            <Select
                                closeMenuOnSelect={false}
                                components={this.animatedComponents}
                                onChange={this.handleChange}
                                value={this.state.selectedOption}
                                isMulti={this.props.isMulti ? true : false}
                                options={this.optionsApprover}
                                required
                                styles={this.colourStyles}
                                closeMenuOnSelect={this.props.isMulti ? false : true}
                            />
                        </MDBCol>
                    </MDBRow>
                    <div className="invalid-feedback">
                        Please provide a valid {this.props.placeholder}.
              </div>
                    <div className="valid-feedback">Looks good!</div>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default AdditionalFormControlElement;
