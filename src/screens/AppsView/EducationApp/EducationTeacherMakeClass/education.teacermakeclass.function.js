
/** @format */

import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { EducationServices } from "../../../../services";

function EducationTeacherMakeClassFunction() {
    if (!(this instanceof EducationTeacherMakeClassFunction)) {
        return new EducationTeacherMakeClassFunction();
    }
}


/**
 * Send query request
* @param userDataToken
* @param queryID
* @param requestData
 */

EducationTeacherMakeClassFunction.prototype.sendClassRequest = function (queryID,requestData,userDataToken) {
    return new Promise((resolve, reject) => {
        EducationServices.sendClassRequest(queryID,requestData,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                {resolve(response.data);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}


var EducationFunction = new EducationTeacherMakeClassFunction()
export default EducationFunction
