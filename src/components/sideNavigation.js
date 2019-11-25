import React, { Component } from 'react';
import logo from "../assets/image/login_logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class TopNavigation extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { isExpand } = this.props;
        return (
            <div className="sidebar-fixed position-fixed" style={{ width: '202px' }}>

                {isExpand ?
                    <div><a href="#!" className="logo-wrapper waves-effect">
                        <img alt="MDB React Logo" className="img-fluid" src={logo} />
                    </a>
                        <span className="username">Nibha Jain</span></div>
                    : <div className="collapseProfile"><MDBIcon icon="user-circle" className="profileIcon" /></div>}

                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to="/dashboard/" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="chart-pie" className="mr-3" />
                            {isExpand ? 'Dashboard' : ""}
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/dashboard/addEmployee" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                            {isExpand ? 'Add Employees' : ""}
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/dashboard/showEmployee" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="list-alt" className="mr-3" />
                            {isExpand ? 'Employees' : ""}
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/dashboard/designCompensastionPlan" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="list-alt" className="mr-3" />
                            {isExpand ? 'Salary Plans' : ""}
                        </MDBListGroupItem>
                    </NavLink>
                    
                    {/*<NavLink activeClassName="activeClass" onClick={() => this.props.sideNavToggle()}>
                        <MDBListGroupItem>
                            {!isExpand && <MDBIcon icon="angle-double-right" className="mr-3" > </MDBIcon>}
                        </MDBListGroupItem>
                    </NavLink>*/}
                </MDBListGroup>
            </div>
        );
    }
}

export default TopNavigation;