/** @format */

import React, {Component} from 'react';
import {logError} from '../../../../lib/utils/global';
import {EducationServices} from '../../../../services';

function EducationStudentPostClassFunction() {
  if (!(this instanceof EducationStudentPostClassFunction)) {
    return new EducationStudentPostClassFunction();
  }
}

/**
 * Create class
 * @param userDataToken
 * @param data
 */

EducationStudentPostClassFunction.prototype.createQuery = function (
  data,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.createQuery(data, userDataToken)
      .then(response => {
        if (response.data.code == 200) {
          resolve(response.data);
        } else reject(response);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

EducationStudentPostClassFunction.prototype.createQna = (
  data,
  userDataToken,
) => {
  return new Promise((resolve, reject) => {
    EducationServices.createQna(data, userDataToken)
      .then(response => {
        if (response.data.code == 200) {
          resolve(response.data);
        } else reject(response);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

var EducationFunction = new EducationStudentPostClassFunction();
export default EducationFunction;
