/** @format */

import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {logError} from '../../../../lib/utils/global';
import {SocialServices} from '../../../../services';

function SocialProfileFunction() {
  if (!(this instanceof SocialProfileFunction)) {
    return new SocialProfileFunction();
  }
}

/**
 * Get user Social Profile Data
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.getUserSocialProfile = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getUserSocialProfile(userProfileId, userDataToken)
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
 * Get My Social Profile Data
 * @param userDataToken
 */

SocialProfileFunction.prototype.getMySocialProfile = function (userDataToken) {
  return new Promise((resolve, reject) => {
    SocialServices.getMySocialProfile(userDataToken)
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
 * Refreshing the user Social Profile
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.refreshingSocialProfile = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getUserSocialProfile(userProfileId, userDataToken)
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
 * Accept User Request For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.acceptFollowRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.acceptFollowRequest(userProfileId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        // logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Follow back request for following user back directly
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.followBackRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.followBackRequest(userProfileId, userDataToken)
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

SocialProfileFunction.prototype.rejectFollowRequest = function (
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

SocialProfileFunction.prototype.sendFollowRequest = function (
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
 * Send Follow Request to Company For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.sendFollowRequestCompany = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.sendFollowRequestCompany(userProfileId, userDataToken)
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
 * Cancel Follow Request for cancel user following
 * @param userProfileId
 * @param userDataToken
 */

SocialProfileFunction.prototype.cancelFollowRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.cancelFollowRequest(userProfileId, userDataToken)
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

SocialProfileFunction.prototype.unFollowUser = function (
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

SocialProfileFunction.prototype.unFollowUser = function (
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
SocialProfileFunction.prototype.savePost = function (
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

/**
 * Save User Post
 * @param userPostId
 * @param userDataToken
 */
SocialProfileFunction.prototype.savePost = function (
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

/**
 * Create User Story
 * @param storyData
 * @param userDataToken
 */
SocialProfileFunction.prototype.createStory = function (
  storyData,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.createStory(storyData, userDataToken)
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
 * Delete User Story
 * @param storyId
 * @param userDataToken
 */
SocialProfileFunction.prototype.deleteStory = function (
  storyId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    let data = {id: storyId};
    SocialServices.deleteStory(data, userDataToken)
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
 * Delete User post
 * @param userPostId
 * @param userDataToken
 */
SocialProfileFunction.prototype.deletePost = function (
  userPostId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    let data = {id: userPostId};
    SocialServices.deletePost(data, userDataToken)
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
 * Post a comment
 * @param userCommentData
 * @param userDataToken
 */
SocialProfileFunction.prototype.commentOnPost = function (
  userCommentData,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.commentOnPost(userCommentData, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve(res.data.message);
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

/**
 * Like or Unlike User Post
 * @param userPostId
 * @param userDataToken
 */
SocialProfileFunction.prototype.likeOrUnlikePost = function (
  userPostId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.likeOrUnlikePost(userPostId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

var SocialProfile = new SocialProfileFunction();
export default SocialProfile;
