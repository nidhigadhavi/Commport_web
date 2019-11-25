/**
 * Author : Nidhi Gadhavi.
 * Purpose : Service for the Compansation.
 */

import { authHeader } from '../helpers/auth-head';
import data from '../assets/file/employee.json';
import axios from 'axios';
import { environmentConst } from '../constants/environment.constant';

export const employeeCompansationService = {
    addSalaryRuleDetail,
    getExistingAnnualSalaryReview,
    saveExistingAnnualSalaryReview,
    getRuleFilters,
    saveSalaryRuleFilters,
    getRuleWiseDetail,
    getBuisnessElements,
    getMarketSalaryElements
};

const urlEndPoint = environmentConst.prod;

function addSalaryRuleDetail(salaryRuleData) {
    console.log("$%^^^^^^^^^^^^");
    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;
    let details = salaryRuleData;

    const requestOptions = {
        method: 'POST',
        url: environmentConst.prod + "/addSalaryRuleDetail",
        body: salaryRuleData,
        headers: { 'authorization': authorization }
    };

    console.log(requestOptions);

    return axios(requestOptions)
        .then(result => {
            console.log("####### RESULTTTTTT SAVE RULE FILTERS... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}


function getRuleWiseDetail(ruleId) {
    console.log("inot Service");
    console.log(ruleId);
    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;

    const requestOptions = {
        method: 'GET',
        url: environmentConst.prod + "/getRuleWiseDetails?rule_id=" + ruleId,
        headers: { 'authorization': authorization }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### RESULTTTTTT... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}


function getExistingAnnualSalaryReview(salaryRuleData) {
    console.log("SERVICE CALLED FOR SALARY RULE DETAIL......");
    console.log(salaryRuleData);

    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;

    const requestOptions = {
        method: 'GET',
        url: environmentConst.prod + "/getRuleHistoricDetails",
        headers: { 'authorization': data.data.data }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### Request... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}

function getBuisnessElements(salaryRuleData) {
    console.log("SERVICE CALLED FOR SALARY RULE DETAIL......");
    console.log(salaryRuleData);

    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;

    const requestOptions = {
        method: 'GET',
        url: environmentConst.prod + "/getBuisnessElements",
        headers: { 'authorization': data.data.data }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### Request Business ELE... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}

function getMarketSalaryElements() {
    console.log("SERVICE CALLED FOR MARKET ELEMENT......");    

    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;

    const requestOptions = {
        method: 'GET',
        url: environmentConst.prod + "/getMarketSalaryElements",
        headers: { 'authorization': data.data.data }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### Request Market... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}


function getRuleFilters() {
    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;
    console.log("authorization", authorization);

    const requestOptions = {
        method: 'GET',
        url: environmentConst.prod + "/ruleFilters",
        headers: { 'authorization': authorization }
    };

    return axios(requestOptions)
        .then(
            (result) => {
                console.log("into @#@##@# the result reaponse....");
                console.log(result);
                return result.data.data
            },
            (error) => {
                console.log(".......into the errorss.....");
                console.log(error);
            }
        )
}

function saveExistingAnnualSalaryReview(BasicSalaryRuleData) {
    console.log("SERVICE CALLED FOR SALARY RULE DETAIL SAVE......");
    console.log(BasicSalaryRuleData);

    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;
    let currentPlan = 2;
    const requestOptions = {
        method: 'POST',
        url: environmentConst.prod + "/saveAnnualBasicRule?rule_id=" + currentPlan,
        body: BasicSalaryRuleData,
        headers: { 'authorization': data.data.data }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### Request... #######");
            console.log(result);
            var respone = result.data.data;
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}

function saveSalaryRuleFilters(reqBody) {
    let data = JSON.parse(localStorage.getItem('user'));
    let authorization = data.data.data;
    const requestOptions = {
        method: 'POST',
        url: environmentConst.prod + "/saveSalaryRuleFilter",
        body: reqBody,
        headers: { 'authorization': data.data.data , 'Content-Type':'application/json' }
    };

    return axios(requestOptions)
        .then(result => {
            console.log("####### RESPONSE... #######");
            console.log(result);
            alert('sucess');
            var respone = {
                "statusCode": 200,
                "status": "success",
                "rule_id": 7,
                "employee covered ": 0,
                "message": "Employee covered under these filters are : 0 and rule id is : 7"
            }
            return respone;
        })
        .catch(error => { console.log("Error :", error); });
}