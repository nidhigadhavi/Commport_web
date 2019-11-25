
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

class TopNavigation extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div>
                <MDBNavbar color="default-color" className="navheader" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">Nibha Jain</strong>
                    </MDBNavbarBrand>
                </MDBNavbar>
                <MDBNavbar color="black" dark expand="md" className="navBottomDiv">
                    <MDBNavbar className="sideNavIcon">
                        <MDBNavItem ><NavLink className="navlink" exact={true} to="/dashboard/"><MDBIcon icon="home" className="mr-3" /></NavLink></MDBNavItem>
                        <MDBNavItem><MDBIcon icon="bell" className="mr-3" /></MDBNavItem>
                    </MDBNavbar>
                    <MDBNavbarNav>
                        <MDBNavItem className="navItem">
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline dropdown">
                                        <MDBIcon icon="user-alt" className="mr-3" />Employees</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/addEmployee">Add Employees</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/showEmployee">Show Employees</NavLink></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem className="navItem">
                            <MDBNavLink to="#!"><MDBIcon icon="users-cog" className="mr-3" />
                                <NavLink exact={true} to="/dashboard/designCompensastionPlan">Compensation Plans</NavLink>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className="navItem">
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline dropdown">
                                        <MDBIcon icon="user-alt" className="mr-3" /> Analytics/Reports</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Headcount Report</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Salary Increase Range Report</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Comp Positioning Report</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Employee Cost report</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Employee Productivity</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Sales Employee Productivity</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Database Report</NavLink></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem className="navItem">
                            <MDBNavLink to="#!"><MDBIcon icon="list-ul" className="mr-3" /><NavLink exact={true} to="/dashboard/pleaseSubscribe"> Surveys</NavLink></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className="navItem">
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">
                                        <MDBIcon icon="user-alt" className="mr-3" /><NavLink exact={true} to="/dashboard/pleaseSubscribe">Connect & Earn</NavLink></div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Trends</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Network</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">F2F C&B Conferences/workshops</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Policies</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Glossary of terms</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">FAQs</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Internal C&B Network</NavLink></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem className="navItem">
                            <MDBNavLink to="#!"><MDBIcon icon="user-plus" className="mr-3" /><NavLink exact={true} to="/dashboard/pleaseSubscribe"> Proxy</NavLink></MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbar className="sideNavIcon">
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="cog" className="mr-3" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" left basic>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Trends</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Network</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">F2F C&B Conferences/workshops</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">C&B Policies</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Glossary of terms</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">FAQs</NavLink></MDBDropdownItem>
                                    <MDBDropdownItem href="#!"><NavLink exact={true} to="/dashboard/pleaseSubscribe">Internal C&B Network</NavLink></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>

                        </MDBNavItem>
                        <MDBNavItem><MDBIcon icon="sign-out-alt" className="mr-3 signOutAlt" /></MDBNavItem>
                    </MDBNavbar>
                </MDBNavbar>
            </div>
        );
    }
}

export default TopNavigation;