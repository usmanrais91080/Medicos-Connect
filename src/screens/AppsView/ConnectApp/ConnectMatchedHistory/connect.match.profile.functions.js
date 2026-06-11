/** @format */

import React, {Component} from 'react';
import {ConnectModuleServices} from '../../../../services';

function ConnectMatchProfileFunction() {
  if (!(this instanceof ConnectMatchProfileFunction)) {
    return new ConnectMatchProfileFunction();
  }
}

/**
 * Get User Connect Matched Profile
 * @param userDataToken
 */

ConnectMatchProfileFunction.prototype.getMatchedProfiles = function (
  userDataToken,
) {
  console.log(userDataToken);
  return new Promise((resolve, reject) => {
    ConnectModuleServices.getMatchedProfileHistory(userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Create User Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

ConnectMatchProfileFunction.prototype.acceptMatchedProfileRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    ConnectModuleServices.acceptMatchedProfileRequest(
      userProfileId,
      userDataToken,
    )
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Add Favourite Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

ConnectMatchProfileFunction.prototype.rejectMatchedProfileRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    ConnectModuleServices.rejectMatchedProfileRequest(
      userProfileId,
      userDataToken,
    )
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

var ConnectMatchProfile = new ConnectMatchProfileFunction();
export default ConnectMatchProfile;
