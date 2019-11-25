/**
 * author : Nidhi Gadhavi
 * purpose : File to Route component
 */

import React from 'react';
import { Router, Route, IndexRoute, Switch } from 'react-router-dom';
import { history } from '../helpers/history';
import { LoginComponent } from '../components/login_components/login.component';
import ForgotPasswordComponent from '../components/login_components/forgotpasword.component';
import ResetPasswordComponent from '../components/login_components/resetpassword.component';
import DeshboardComponent from '../components/deshboard/deshboard.component';
import SettingComponent from '../components/settings/setting.component';

class Routers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Route exact path="/" component={LoginComponent} />
                    <Route path="/login" component={LoginComponent} />
                    <Route path="/forgot-password" component={ForgotPasswordComponent} />
                    <Route path="/reset-password" component={ResetPasswordComponent} />
                    <Route path="/dashboard" component={DeshboardComponent} />
                    <Route path="/setting" component={SettingComponent} />
                </Router>
            </div>
        );
    }
}

export default Routers; 