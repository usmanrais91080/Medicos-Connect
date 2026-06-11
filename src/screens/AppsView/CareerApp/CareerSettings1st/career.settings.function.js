
/** @format */

import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { logError } from "../../../../lib/utils/global";
import { ProfileServices, CareerServices } from "../../../../services";

function CareerSettingsFunction() {
    if (!(this instanceof CareerSettingsFunction)) {
        return new CareerSettingsFunction();
    }
}

/**
 * Set user Career Details Data
 * @param userDataToken
 * @param userProfileData
 */

CareerSettingsFunction.prototype.setUserCareerProfileSettings = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.setCareerProfileSettings(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}

/**
 * get user Career Details Data
 * @param userDataToken
 */

CareerSettingsFunction.prototype.getUserCareerProfileSettings = function (userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.getCareerProfileSettings(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}







var CareerProfile = new CareerSettingsFunction()
export default CareerProfile
