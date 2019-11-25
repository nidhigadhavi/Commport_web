/**
 *  Author : Nidhi Gadhvi
 *  Purpose : Component to show employees.
 */

import { authHeader } from '../helpers/auth-head';
import axios from 'axios';
import { environmentConst } from '../constants/environment.constant';

export const userService = {
    login,
    logout
};

const urlEndPoint = environmentConst.prod;

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        url: urlEndPoint + "/login",
        body: { 'username': username, 'password': password }
    };
    console.log(requestOptions);

    return axios(requestOptions)
        .then(result => {
            console.log("result");
            console.log(result);
            localStorage.setItem('user', JSON.stringify(result));
            return result;
        })
        .catch(error => this.setState({
            error,
            isLoading: false
        }));


    // return fetch(endPoint + `api/v1/login`, requestOptions)        
    //     .then(user => {
    //         localStorage.setItem('user', JSON.stringify(user));
    //         return user;
    // })
}

function logout() {
    console.log("logout works");
}

function handleResponse(response) {
    return response.then(text => {
        if (response.statusCode === 400) {
            const error = response.message;
            return Promise.reject(error);
        }
        else {
            return response;
        }
    });
}