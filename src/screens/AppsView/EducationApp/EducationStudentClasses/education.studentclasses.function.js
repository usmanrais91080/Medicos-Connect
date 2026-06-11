/** @format */

import React, {Component} from 'react';
import {logError} from '../../../../lib/utils/global';
import {EducationServices} from '../../../../services';

function EducationStudentClassesFunction() {
  if (!(this instanceof EducationStudentClassesFunction)) {
    return new EducationStudentClassesFunction();
  }
}

/**
 * Get classes
 * @param userDataToken
 */

EducationStudentClassesFunction.prototype.getClassesStudent = function (
  userDataToken,
  page,
  limit,
) {
  return new Promise((resolve, reject) => {
    EducationServices.getClassesStudent(userDataToken, page, limit)
      .then(response => {
        if (response.data.code == 200) {
          resolve(response.data);
        } else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

var EducationFunction = new EducationStudentClassesFunction();
export default EducationFunction;
