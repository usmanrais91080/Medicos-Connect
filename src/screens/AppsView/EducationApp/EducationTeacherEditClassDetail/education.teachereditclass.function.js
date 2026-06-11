
/** @format */

import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { CareerServices, EducationServices } from "../../../../services";

function EducationTeacherEditClassDetailFunction() {
    if (!(this instanceof EducationTeacherEditClassDetailFunction)) {
        return new EducationTeacherEditClassDetailFunction();
    }
}

/**
 * Get class languages
* @param userDataToken
 */

EducationTeacherEditClassDetailFunction.prototype.getJobLanguages = function (userDataToken) {
    console.log(userDataToken)
    return new Promise((resolve, reject) => {
        CareerServices.getJobLanguages(userDataToken)
            .then((response) => { if (response.data.code == 200) 
                { let array = [];
                    let data = [...response.data.data];
                    data.map((item, index) => {
                      array.push({
                        id: item._id,
                        label: item.name,
                        value: item._id,
                      });
                    });
                    resolve(array);}
                 else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}


/**
 * Update class details
* @param userDataToken
* @param data
 */

EducationTeacherEditClassDetailFunction.prototype.updateClass = function (data,userDataToken) {
    // console.log(data,userDataToken);
    return new Promise((resolve, reject) => {
        EducationServices.updateClass(data,userDataToken)
            .then((response) => { if (response.data.code == 200) 
                { resolve(response.data);}
                 else reject(response); })
            .catch((err) => { logError(err); reject(err); })
    })
}



var EducationFunction = new EducationTeacherEditClassDetailFunction()
export default EducationFunction
