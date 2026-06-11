
/** @format */

import React, { Component } from "react";
import { ProfileServices } from "../../../../services";
import { logError } from "../../../../lib/utils/global";

function UploadCNICFunction() {
    if (!(this instanceof UploadCNICFunction)) {
        return new UploadCNICFunction();
    }
}

/**
 * Create User Connect Profile
 * @param userProfileData
* @param userDataToken
 */

UploadCNICFunction.prototype.uploadCNIC = function (userProfileData, userDataToken) {
    return new Promise((resolve, reject) => {
        ProfileServices.uploadCnic(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(); else reject(response.data); })
            .catch((err) => { logError(err.response); reject(err); })
    })
}





var UploadCNIC = new UploadCNICFunction()
export default UploadCNIC
