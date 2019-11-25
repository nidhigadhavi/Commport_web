/**
 * author : Nidhi Gadhavi.
 * purpose : Catch Actions of user activity.
 */

import { userConstants } from '../constants/user.constant';
import { userService } from '../services/user.service';
import { alertActions } from './alert.action';
import { history } from '../helpers/history';

export const userActions = {
    login,
    logout    
};

function login(username, password) {    
    console.log("into login Action");    
    // dispatch => {
    //     console.log("into the action211212");
    //     console.log(dispatch);
        // dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    console.log("login sucessfully");
                    console.log(user);
                    // dispatch(success(user));
                    history.push('/dashboard');
                },
                error => {
                    console.log("SAVEEEEE ERROR");
                    console.log(error);
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    // };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
