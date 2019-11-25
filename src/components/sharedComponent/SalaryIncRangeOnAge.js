/**
 * File : Compoennt for the makinf the prorated increse calculation
 */



import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class SalaryIncRangeOnAge extends React.Component {
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
        color: "black !important"
    };

    defaultArray = this.props.options;

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
        const options = [
            { value: 'simpleProration', label: 'Simple Proration' },
            { value: 'no', label: 'No' },
            { value: 'fixed%ages', label: 'Fixed %ages' }
        ]
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
                            <div className="salaryRangeWrapper">
                                <span className="salaryincSpan">Can go </span>
                                <input
                                    value={this.props.value}
                                    onChange={this.props.onChange}
                                    type='text'
                                    id={this.props.id + "startDate"}
                                    className="p-2 form-control basicRuleFormInput salaryincInput"
                                    name={this.props.name}
                                    required
                                />
                                <span className="salaryincSpan2"> % age lower than recommended increase</span>
                            </div>
                            <div className="salaryRangeWrapper mt-2">
                                <span className="salaryincSpan">Can go </span>
                                <input
                                    value={this.props.value}
                                    onChange={this.props.onChange}
                                    type='text'
                                    id={this.props.id + "startDate"}
                                    className="p-2 form-control basicRuleFormInput salaryincInput"
                                    name={this.props.name}                                    
                                    required
                                />
                                <span className="salaryincSpan2"> % age higher than recommended increase</span>
                            </div>
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

export default SalaryIncRangeOnAge;
