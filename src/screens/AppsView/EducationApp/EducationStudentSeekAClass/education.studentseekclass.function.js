/** @format */

import React, {Component} from 'react';
import {logError} from '../../../../lib/utils/global';
import {CareerServices, EducationServices} from '../../../../services';

function EducationStudentSeekAClassFunction() {
  if (!(this instanceof EducationStudentSeekAClassFunction)) {
    return new EducationStudentSeekAClassFunction();
  }
}

/**
 * Get my queries
 * @param userDataToken
 */

EducationStudentSeekAClassFunction.prototype.getMyQueries = function (
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.getMyQueries(userDataToken)
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

/**
 * Get query requests
 * @param userDataToken
 * @param id
 */

EducationStudentSeekAClassFunction.prototype.getQueryRequests = function (
  id,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.getQueryRequests(id, userDataToken)
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

/**
 * Accept requests
 * @param userDataToken
 * @param requestData
 */

EducationStudentSeekAClassFunction.prototype.acceptQueryRequest = function (
  requestData,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.acceptQueryRequest(requestData, userDataToken)
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

/**
 * Reject requests
 * @param userDataToken
 * @param requestData
 */

EducationStudentSeekAClassFunction.prototype.rejectQueryRequest = function (
  requestData,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    EducationServices.rejectQueryRequest(requestData, userDataToken)
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

EducationStudentSeekAClassFunction.prototype.getQnAs = (
  page,
  offset,
  userDataToken,
) => {
  return new Promise((resolve, reject) => {
    EducationServices.getQnAs(page, offset, userDataToken)
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

EducationStudentSeekAClassFunction.prototype.createQna = (
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

var EducationFunction = new EducationStudentSeekAClassFunction();
export default EducationFunction;
