/**
 * Author: Nidhi Gadhavi
 * Purpose : Tool Tip for Application.
 */


import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactTooltip from 'react-tooltip'

import { MDBTooltip, MDBIcon, MDBBtn } from 'mdbreact';

class ToolTip extends React.Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <div className="tooltip-btn">
                <p data-tip={this.props.tolltipMsg}><MDBIcon icon="info-circle"></MDBIcon></p>
                <ReactTooltip />
            </div>
        )
    }
}

export default ToolTip;
