
/** @format */

import React, { Component } from "react";
import { logError } from "../../../../lib/utils/global";
import { ConnectModuleServices } from "../../../../services";

function ConnectProfileFunction() {
    if (!(this instanceof ConnectProfileFunction)) {
        return new ConnectProfileFunction();
    }
}

/**
 * Create User Connect Profile
 * @param userProfileData
* @param userDataToken
 */

ConnectProfileFunction.prototype.createProfile = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.createUserProfile(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response.data); })
    })
}


/**
 * Create User Connect Profile
 * @param userDataToken
 */

ConnectProfileFunction.prototype.getConnectProfessionMatches = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getConnectProfessionMatches(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            })
    })
}

/**
 * Update User Match professions Connect Profile
 * @param userDataToken
 * @param profession_matches
 */

ConnectProfileFunction.prototype.updateConnectProfessionMatches = function (profession_matches, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.updateConnectProfessionMatches(profession_matches, userDataToken)
            .then((response) => { if (response.data.code == 200) {
                resolve(response.data.data);
             } else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            })
    })
}

/**
 * Get Packages
 * @param userDataToken
 */

ConnectProfileFunction.prototype.getPackages = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.getPackages(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            })
    })
}




var ConnectProfile = new ConnectProfileFunction()
export default ConnectProfile
