
/** @format */
import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { EducationServices } from "../../../../services";

function EducationStudentYourClassDetailFunction() {
    if (!(this instanceof EducationStudentYourClassDetailFunction)) {
        return new EducationStudentYourClassDetailFunction();
    }
}

/**
 * Get query requests
* @param userDataToken
* @param id
 */

EducationStudentYourClassDetailFunction.prototype.getQueryRequests = function (id,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.getQueryRequests(id,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

/**
 * Accept requests
* @param userDataToken
* @param requestData
 */

EducationStudentYourClassDetailFunction.prototype.acceptQueryRequest = function (requestData,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.acceptQueryRequest(requestData,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

/**
 * Reject requests
* @param userDataToken
* @param requestData
 */

EducationStudentYourClassDetailFunction.prototype.rejectQueryRequest = function (requestData,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.rejectQueryRequest(requestData,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

var EducationFunction = new EducationStudentYourClassDetailFunction()
export default EducationFunction
