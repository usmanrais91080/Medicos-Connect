/** @format */

import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {logError} from '../../../../lib/utils/global';
import {SocialServices} from '../../../../services';

function SocialSavedPostFunction() {
  if (!(this instanceof SocialSavedPostFunction)) {
    return new SocialSavedPostFunction();
  }
}

/**
 * Get user Saved Posts Data
 * @param userDataToken
 */

SocialSavedPostFunction.prototype.getPostDetails = function (
  id,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getPostDetails(id, userDataToken)
      .then(response => {
        if (response.data.code == 200) {
          if (
            response.data.message == 'Invalid Post ID' ||
            response.data.message == 'Post not found'
          ) {
            resolve(response.data.message);
          } else {
            resolve(response.data.data);
          }
        } else reject(response.data.data);
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Refreshing the user Saved Posts
 * @param userDataToken
 */

SocialSavedPostFunction.prototype.refreshingSavedPosts = function (
  id,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getPostDetails(id, userDataToken)
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

SocialSavedPostFunction.prototype.acceptFollowRequest = function (
  userProfileId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.acceptFollowRequest(userProfileId, userDataToken)
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

SocialSavedPostFunction.prototype.rejectFollowRequest = function (
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

SocialSavedPostFunction.prototype.sendFollowRequest = function (
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

SocialSavedPostFunction.prototype.unFollowUser = function (
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

SocialSavedPostFunction.prototype.unFollowUser = function (
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
SocialSavedPostFunction.prototype.savePost = function (
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
 * Post a comment
 * @param userCommentData
 * @param userDataToken
 */
SocialSavedPostFunction.prototype.commentOnPost = function (
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
 * Post a comment
 * @param postId
 * @param userDataToken
 */
SocialSavedPostFunction.prototype.getPostComments = function (
  postId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getPostComments(postId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve(res.data.data);
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

/**
 * Delete a comment
 * @param data
 * @param userDataToken
 */
SocialSavedPostFunction.prototype.replyComment = function (
  data,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.replyComment(data, userDataToken)
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
SocialSavedPostFunction.prototype.likeOrUnlikePost = function (
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

var SocialProfile = new SocialSavedPostFunction();
export default SocialProfile;
