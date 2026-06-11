
/** @format */

import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { logError } from "../../../../lib/utils/global";
import { ProfileServices, EducationServices } from "../../../../services";

function EducationSettingsFunction() {
    if (!(this instanceof EducationSettingsFunction)) {
        return new EducationSettingsFunction();
    }
}

/**
 * Get user Saved Posts Data
 * @param userDataToken
 * @param userProfileData
 */

EducationSettingsFunction.prototype.setUserEducationProfileSettings = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.setEducationProfileSettings(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}







var EducationProfile = new EducationSettingsFunction()
export default EducationProfile
