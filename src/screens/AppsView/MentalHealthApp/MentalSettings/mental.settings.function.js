
/** @format */

import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { logError } from "../../../../lib/utils/global";
import { ProfileServices, ClassifiedServices } from "../../../../services";

function ClassifiedSettingsFunction() {
    if (!(this instanceof ClassifiedSettingsFunction)) {
        return new ClassifiedSettingsFunction();
    }
}

/**
 * Get user Saved Posts Data
 * @param userDataToken
 * @param userProfileData
 */

ClassifiedSettingsFunction.prototype.setUserClassifiedProfileSettings = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.setClassifiedProfileSettings(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}


/**
 * get user Classified Details Data
 * @param userDataToken
 */

 ClassifiedSettingsFunction.prototype.getUserClassifiedProfileSettings = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.getClassifiedProfileSettings(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}








var ClassifiedProfile = new ClassifiedSettingsFunction()
export default ClassifiedProfile
