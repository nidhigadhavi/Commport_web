/**
 * Author: Nidhi Gahdavi
 * Purpose : Form Control for the input element in element form.
 */


import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ToolTip from './ToolTip';

import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class FormControlElement extends React.Component {
    paddingCls = this.props.ctrlFor == 'frmExistingElePlan' ? 'p-0' : '';
    lableCls = 'pr-0'
    paddingClassName = this.props.ctrlFor == 'newSalryReviewPlan' || this.props.ctrlFor == 'frmExistingElePlan' ? 'p-0' : '';
    colMdcls1 = this.props.ctrlFor == 'frmExistingElePlan' ? '3'
        :
        this.props.ctrlFor == 'newSalryReviewPlan' ? '4' : '6';
    colMdcls2 = this.props.ctrlFor == 'frmExistingElePlan' ? '9'
        :
        this.props.ctrlFor == 'newSalryReviewPlan' ? '8' : '6';
    animatedComponents = makeAnimated();
    selectInput = React.createRef();

    options = this.props.options;
    colourStyles = {
        control: (styles, state) => ({ ...styles, fontSize: '13px !important', lineHeight: '14px !important', minHeight: '30px !important', height: '30px !important', overflow: 'hidden !important', borderRadius: '0 !important' }),
        option: styles => ({
            ...styles,
            color: "#3c763d",
            fontSize: '14px',
        }),
    };

    colourByClickStyles = {
        control: styles => ({ ...styles, fontSize: '13px !important', lineHeight: '14px !important', minHeight: '30px !important', height: 'auto !important', overflow: 'hidden !important', borderRadius: '0 !important' }),
        option: styles => ({
            ...styles,
            color: "#3c763d",
            fontSize: '14px',
        })
    };

    inputClass = "form-control basicRuleFormInput"

    defaultArray = this.props.options;
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            toggleFocused: false
        };
    }

    handleChange = (selectedOption) => {
        console.log("into the ... handle change....");
        console.log(selectedOption);
        this.setState({
            selectedOption: selectedOption
        })
        this.props.onChange(selectedOption, this.props.placeholder);
    }

    selectClick = () => {
        this.setState({
            toggleFocused: true
        })
    }

    blurOfSelect = () => {
        this.setState({
            toggleFocused: false
        })
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.selectAll) {
            this.setState({
                selectedOption: nextprops.options
            })
        }
    }

    render() {
        var toggleStyle = this.state.toggleFocused ? this.colourByClickStyles : this.colourStyles;
        console.log("FORM CTRL>>>>");
        console.log(this.props.options);

        return (
            <MDBRow className='mb-3'>
                <MDBCol md={this.colMdcls1} className={this.lableCls}>
                    <p className="m-0 formLablecss basicRuleFormLable" >{this.props.placeholder}
                        {this.props.tooltip ? <ToolTip tolltipMsg={this.props.placeholder} /> : ""} </p>
                </MDBCol>
                <MDBCol md={this.colMdcls2} className={this.paddingClassName}>
                    {this.props.type == 'select'
                        ? <Select
                            closeMenuOnSelect={false}
                            components={this.animatedComponents}
                            onFocus={this.selectClick}
                            onBlur={this.blurOfSelect}
                            onChange={this.handleChange}
                            value={this.state.selectedOption}
                            isMulti={this.props.isMulti ? true : false}
                            options={this.options}
                            required
                            styles={toggleStyle}
                            closeMenuOnSelect={this.props.isMulti ? false : true}
                        />
                        :
                        (this.props.type == "checkBox"
                            ?
                            <div>
                                <MDBRow>
                                    {this.props.options.map(element => {
                                        return (
                                            <MDBCol sm="6">
                                                <div className="target-list">
                                                    <input type="checkbox" name={element.name} id={element.id} value={element.value} />
                                                    <p className="checkBoxLabel">{element.name}.</p>
                                                </div>
                                            </MDBCol>
                                        )
                                    })}
                                </MDBRow>
                            </div>
                            : <input
                                value={this.props.value}
                                onChange={this.props.changeHandler || this.props.onChange}
                                type={this.props.type}
                                id={this.props.id}
                                className={this.inputClass}
                                name={this.props.name}
                                placeholder={this.props.placeholder}
                                required
                                disabled={this.props.disable}
                                onBlur={this.props.blurHandler ? this.props.blurHandler : console.log("blur")}
                            />)
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

export default FormControlElement;
