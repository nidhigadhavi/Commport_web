/**
 * author : Nidhi Gadhavi.
 * purpose : Catch Actions of user activity.
 */

import { employeeConstants } from '../constants/employee.constant';
import { employeeService } from '../services/employee.service';
import { alertActions } from './alert.action';
import { history } from '../helpers/history';

export const employeeActions = {
    getEmployeeList
};

function getEmployeeList() {    
    return dispatch => {
        employeeService.getEmployeeList()
            .then(
                employee => {
                    console.log("@#@#@@#into the reaponse of the get list....");
                    console.log(employee);
                    dispatch(success(employee));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(employee) { return { type: employeeConstants.GETLIST_REQUEST, employee } }
    function success(employee) { return { type: employeeConstants.GETLIST_SUCCESS, employee } }
    function failure(error) { return { type: employeeConstants.GETLIST_FAILURE, error } }
}

