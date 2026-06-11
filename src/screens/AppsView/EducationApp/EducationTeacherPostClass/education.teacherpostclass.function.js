/** @format */

import React, {Component} from 'react';
import {logError} from '../../../../lib/utils/global';
import {CareerServices, EducationServices} from '../../../../services';

function EducationTeacherPostClassFunction() {
  if (!(this instanceof EducationTeacherPostClassFunction)) {
    return new EducationTeacherPostClassFunction();
  }
}

/**
 * Get class languages
 * @param userDataToken
 */

EducationTeacherPostClassFunction.prototype.getJobLanguages = function (
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    CareerServices.getJobLanguages(userDataToken)
      .then(response => {
        if (response.data.code == 200) {
          let array = [];
          let data = [...response.data.data];
          data.map((item, index) => {
            array.push({
              id: item._id,
              label: item.name,
              value: item._id,
            });
          });
          resolve(array);
        } else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

/**
 * Create class
 * @param userDataToken
 * @param data
 */

EducationTeacherPostClassFunction.prototype.createClass = function (
  data,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.createClass(data, userDataToken)
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

var EducationFunction = new EducationTeacherPostClassFunction();
export default EducationFunction;
