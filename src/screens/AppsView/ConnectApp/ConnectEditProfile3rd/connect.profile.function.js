
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
 * Create connnect Profile Data
 * @param userDataToken
 * @param userProfileData
 */

ConnectProfileFunction.prototype.createConnectProfile = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ConnectModuleServices.createUserProfile(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data); else reject(response.data); })
            .catch((err) => { logError(err); reject(err.response); })
    })
}







var GameProfile = new ConnectProfileFunction()
export default GameProfile
