
/** @format */
import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { EducationServices } from "../../../../services";

function EducationTeacherYourClassFunction() {
    if (!(this instanceof EducationTeacherYourClassFunction)) {
        return new EducationTeacherYourClassFunction();
    }
}


/**
 * Delete class 
* @param userDataToken
* @param id
 */

EducationTeacherYourClassFunction.prototype.deleteClass = function (id,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.deleteClass(id,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

/**
 * Get class Applicants
* @param userDataToken
* @param id
 */

EducationTeacherYourClassFunction.prototype.getClassApplicants = function (id,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.getClassApplicants(id,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

var EducationFunction = new EducationTeacherYourClassFunction()
export default EducationFunction
