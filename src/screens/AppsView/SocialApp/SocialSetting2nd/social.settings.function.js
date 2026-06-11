
/** @format */

import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { logError } from "../../../../lib/utils/global";
import { ProfileServices, SocialServices } from "../../../../services";

function SocialSettingsFunction() {
    if (!(this instanceof SocialSettingsFunction)) {
        return new SocialSettingsFunction();
    }
}

/**
 * Get user Saved Posts Data
 * @param userDataToken
 * @param userProfileData
 */

SocialSettingsFunction.prototype.setUserSocialProfileSettings = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.setSocialProfileSettings(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}







var SocialProfile = new SocialSettingsFunction()
export default SocialProfile
