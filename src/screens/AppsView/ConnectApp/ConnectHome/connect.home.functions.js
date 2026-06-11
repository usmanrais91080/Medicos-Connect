
/** @format */

import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { ConnectModuleServices, ProfileServices } from "../../../../services";

function ConnectHomeFunction() {
    if (!(this instanceof ConnectHomeFunction)) {
        return new ConnectHomeFunction();
    }
}

/**
* Create User Connect Profile
* @param userDataToken
*/

ConnectHomeFunction.prototype.getUsersProfiles = function (userDataToken) {
    console.log(userDataToken)
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getConnectProfilesOfPeoples(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err.response); reject(err.response.data); })
    })
}

/**
 * get user Connect Details Data
 * @param userDataToken
 */

 ConnectHomeFunction.prototype.getUserConnectProfileSettings = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.getConnectProfileSettings(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

/**
 * Get Packages
 * @param userDataToken
 */

 ConnectHomeFunction.prototype.getPackages = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getPackages(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            })
    })
}


/**
 * Create User Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

ConnectHomeFunction.prototype.getConnectProfessionMatches = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getConnectProfessionMatches(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}


/**
 * Add Favourite Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.addFavouriteUser = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.addFavouriteProfile(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Remove Favourite Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.undoFavouriteUser = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.undoAddFavouriteProfile(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Send Match to Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.sendMatchtoProfileId = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.sendMacthProfileRequest(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Undo Send Match to Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.undoSendMatchtoProfileId = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.undoSendMacthProfileRequest(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Remove Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.removeConnectProfile = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.removeConnectProfile(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Undo Remove Connect Profile
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.undoRemoveConnectProfile = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.undoRemoveConnectProfile(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Get Connect Profile User Detail
 * @param userDataToken
 * @param userProfileId
 */

 ConnectHomeFunction.prototype.getConnectProfileUserDetail = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getConnectProfileUserDetail(userProfileId, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Change Connect Profile mode
 * @param userDataToken
 * @param userProfileMode
 */

 ConnectHomeFunction.prototype.changeConnectProfileMode = function (userProfileMode, userDataToken) {
     console.log(userDataToken)
    return new Promise((resolve, reject) => {
        ConnectModuleServices.changeConnectProfileMode(userProfileMode, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err);  reject(err.response.data); })
    })
}

/**
 * Change Connect filter
 * @param userDataToken
 * @param filterData
 */

 ConnectHomeFunction.prototype.changeConnectFilter = function (filterData, userDataToken) {
    console.log(userDataToken)
   return new Promise((resolve, reject) => {
       ConnectModuleServices.changeConnectFilter(filterData, userDataToken)
           .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
           .catch((err) => { logError(err);  reject(err.response.data); })
   })
}


var ConnectHome = new ConnectHomeFunction()
export default ConnectHome
