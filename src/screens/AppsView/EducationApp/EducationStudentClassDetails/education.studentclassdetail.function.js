
/** @format */
import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { EducationServices } from "../../../../services";

function EducationStudentClassDetailsFunction() {
    if (!(this instanceof EducationStudentClassDetailsFunction)) {
        return new EducationStudentClassDetailsFunction();
    }
}

/**
 * Apply for class
* @param userDataToken
* @param id
 */

EducationStudentClassDetailsFunction.prototype.applyToClass = function (id,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.applyToClass(id,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

var EducationFunction = new EducationStudentClassDetailsFunction()
export default EducationFunction
