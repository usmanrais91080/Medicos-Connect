/** @format */

import React from 'react';
import {logError} from '../../../../lib/utils/global';
import {EducationServices} from '../../../../services';

function EducationMyClassFunction() {
  if (!(this instanceof EducationMyClassFunction)) {
    return new EducationMyClassFunction();
  }
}

/**
 * Get classes
 * @param userDataToken
 */

EducationMyClassFunction.prototype.getClasses = function (
  userDataToken,
  page,
  offset,
) {
  return new Promise((resolve, reject) => {
    EducationServices.getClasses(userDataToken, page, offset)
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

var EducationFunction = new EducationMyClassFunction();
export default EducationFunction;
