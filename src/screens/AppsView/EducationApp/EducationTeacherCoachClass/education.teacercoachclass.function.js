
/** @format */

import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { EducationServices } from "../../../../services";

function EducationCoachClassFunction() {
    if (!(this instanceof EducationCoachClassFunction)) {
        return new EducationCoachClassFunction();
    }
}

/**
 * Get quereies
* @param userDataToken
 */

EducationCoachClassFunction.prototype.getStudentQueries = function (userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.getStudentQueries(userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}


var EducationFunction = new EducationCoachClassFunction()
export default EducationFunction
