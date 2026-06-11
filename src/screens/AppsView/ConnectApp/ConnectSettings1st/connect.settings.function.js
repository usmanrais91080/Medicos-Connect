
/** @format */

import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { logError } from "../../../../lib/utils/global";
import { ProfileServices, ConnectServices } from "../../../../services";

function ConnectSettingsFunction() {
    if (!(this instanceof ConnectSettingsFunction)) {
        return new ConnectSettingsFunction();
    }
}

/**
 * Set user Connect Details
 * @param userDataToken
 * @param userProfileData
 */

ConnectSettingsFunction.prototype.setUserConnectProfileSettings = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.setConnectProfileSettings(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}

/**
 * get user Connect Details Data
 * @param userDataToken
 */

 ConnectSettingsFunction.prototype.getUserConnectProfileSettings = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.getConnectProfileSettings(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err); })
    })
}










var ConnectProfile = new ConnectSettingsFunction()
export default ConnectProfile
