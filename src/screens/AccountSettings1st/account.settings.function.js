/** @format */
import React, { Component } from "react";
import { ProfileServices } from "../../services";

function AccountSettingFunction() {
    if (!(this instanceof AccountSettingFunction)) {
        return new AccountSettingFunction();
    }
}

/**
 * Create User Connect Profile
 * @param userProfileData
* @param userDataToken
 */

AccountSettingFunction.prototype.updateProfile = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.updateProfile(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(); else reject(response.data); })
            .catch((err) => { reject(err); })
    })
}

/**
 * Upload User Medical License
 * @param userProfileData
* @param userDataToken
 */

AccountSettingFunction.prototype.uploadLicense = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.uploadLicense(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(); else reject(response.data); })
            .catch((err) => { reject(err); })
    })
}




var AccountSetting = new AccountSettingFunction()
export default AccountSetting
