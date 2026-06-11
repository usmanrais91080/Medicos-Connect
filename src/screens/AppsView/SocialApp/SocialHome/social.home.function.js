/** @format */

import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {logError} from '../../../../lib/utils/global';
import {SocialServices} from '../../../../services';

function SocialHomeFunction() {
  if (!(this instanceof SocialHomeFunction)) {
    return new SocialHomeFunction();
  }
}

/**
 * Get user Posts Data
 * @param userDataToken
 * @param page
 * @param offset
 */
SocialHomeFunction.prototype.getUserPosts = function (
  page,
  offset,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getPostsFeed(page, offset, userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

/**
 * Get Near by Users
 * @param userDataToken
 */
SocialHomeFunction.prototype.getNearByUsers = function (userDataToken) {
  return new Promise((resolve, reject) => {
    SocialServices.getNearByUsers(userDataToken)
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
 * Get Stories
 * @param userDataToken
 */
SocialHomeFunction.prototype.getStories = function (
  id,
  name,
  img,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getStories(userDataToken)
      .then(response => {
        if (response.data.code == 200) {
          let arrayData = [];
          if (response.data.data.my_stories.length > 0) {
            let data = {
              _id: id,
              username: name,
              image: img,
              stories: [...response.data.data.my_stories],
            };
            arrayData = [data, ...response.data.data.social_stories];
          } else {
            arrayData = [...response.data.data.social_stories];
          }
          resolve(arrayData);
        } else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

/**
 * Save User Post
 * @param userPostId
 * @param userDataToken
 */
SocialHomeFunction.prototype.savePost = function (userPostId, userDataToken) {
  return new Promise((resolve, reject) => {
    SocialServices.savePost(userPostId, userDataToken)
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
SocialHomeFunction.prototype.likeOrUnlikePost = function (
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

/**
 * Post a comment
 * @param userCommentData
 * @param userDataToken
 */
SocialHomeFunction.prototype.commentOnPost = function (
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
 * Delete post
 * @param userPostId
 * @param userDataToken
 */
SocialHomeFunction.prototype.deletePost = function (userPostId, userDataToken) {
  return new Promise((resolve, reject) => {
    SocialServices.deletePost(userPostId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve(res.data.message);
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Report post
 * @param userPostData
 * @param userDataToken
 */
SocialHomeFunction.prototype.reportPost = function (
  userPostData,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.reportPost(userPostData, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve(res.data.message);
      })
      .catch(err => {
        logError(err);
        reject(err.response.data);
      });
  });
};

/**
 * Refreshing user Posts Data
 * @param userDataToken
 * @param page
 * @param offset
 */
SocialHomeFunction.prototype.refreshingPosts = function (
  page,
  offset,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.getPostsFeed(page, offset, userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data.data);
      })
      .catch(err => {
        logError(err.response);
        reject(err.response);
      });
  });
};

/**
 * Reject User Request For Following
 * @param userProfileId
 * @param userDataToken
 */
SocialHomeFunction.prototype.rejectFollowRequest = function (
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
SocialHomeFunction.prototype.sendFollowRequest = function (
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
SocialHomeFunction.prototype.unFollowUser = function (
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
 * Delete story
 * @param userStoryId
 * @param userDataToken
 */
SocialHomeFunction.prototype.deleteStory = function (
  userStoryId,
  userDataToken,
) {
  return new Promise((resolve, reject) => {
    SocialServices.deleteStory(userStoryId, userDataToken)
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
 * View User Story
 * @param userStoryId
 * @param userDataToken
 */
SocialHomeFunction.prototype.viewStory = function (userStoryId, userDataToken) {
  return new Promise((resolve, reject) => {
    let data = {id: userStoryId};
    SocialServices.viewStory(userStoryId, userDataToken)
      .then(res => {
        if (res.data.code == 200) resolve();
      })
      .catch(err => {
        logError(err);
        reject();
      });
  });
};

var SocialProfile = new SocialHomeFunction();
export default SocialProfile;
