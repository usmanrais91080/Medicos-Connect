/** @format */

import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {logError} from '../../../../lib/utils/global';
import {SocialServices} from '../../../../services';

function SocialBlockandUnblockFunction() {
  if (!(this instanceof SocialBlockandUnblockFunction)) {
    return new SocialBlockandUnblockFunction();
  }
}

/**
 * Get Blocked users Data
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.getBlockedUsers = function (
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getBlockedUsers(userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Refreshing the Blocked users Data
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.refreshingBlockedUser = function (
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getBlockedUsers(userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data.blocked);
        else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Un Block a user
 * @param userProfileId
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.unblockUser = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.unBlockUser(userProfileId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Reject User Request For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.rejectFollowRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.rejectFollowRequest(userProfileId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Send Follow Request to User For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.sendFollowRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.sendFollowRequest(userProfileId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * UnFollow User From Following
 * @param userProfileId
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.unFollowUser = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.unFollowUser(userProfileId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

/**
 * Save User Post
 * @param userPostId
 * @param userDataToken
 */

SocialBlockandUnblockFunction.prototype.unFollowUser = function (
  userPostId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.savePost(userPostId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

/**
 * Save User Post
 * @param userPostId
 * @param userDataToken
 */
SocialBlockandUnblockFunction.prototype.savePost = function (
  userPostId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    let data = {id: userPostId};
    SocialServices.savePost(data, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

var SocialProfile = new SocialBlockandUnblockFunction();
export default SocialProfile;
