/** @format */

import React, {Component} from 'react';
import {logError} from '../../lib/utils/global';
import {ProfileServices} from '../../services';

function NotificationFunction() {
  if (!(this instanceof NotificationFunction)) {
    return new NotificationFunction();
  }
}

/**
 * Get Notifications
 * @param userDataToken
 */

NotificationFunction.prototype.getNotification = function (
  userDataToken,
  page,
  offset,
) {
  return new Promise((resolve, reject) => {
    ProfileServices.getNotification(userDataToken, page, offset)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};
/**
 * Get Anouncement
 * @param userDataToken
 */

NotificationFunction.prototype.getAnouncement = function (userDataToken) {
  return new Promise((resolve, reject) => {
    ProfileServices.getAnnouncement(userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};
/**
 *Read notification
 * @param id
 * @param userDataToken
 */

NotificationFunction.prototype.readNotification = function (id, userDataToken) {
  return new Promise((resolve, reject) => {
    ProfileServices.readNotification(id, userDataToken)
      .then(response => {
        if (response.data.code == 200) resolve(response.data.data);
        else reject(response.data);
      })
      .catch(err => {
        logError(err);
        reject(err);
      });
  });
};

var Notification = new NotificationFunction();
export default Notification;
