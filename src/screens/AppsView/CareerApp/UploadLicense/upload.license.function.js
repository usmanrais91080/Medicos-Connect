
/** @format */

import React, { Component } from "react";
import { ProfileServices } from "../../../../services";
import { logError } from "../../../../lib/utils/global";

function UploadLicenseFunction() {
    if (!(this instanceof UploadLicenseFunction)) {
        return new UploadLicenseFunction();
    }
}

/**
 * Create User Connect Profile
 * @param userProfileData 
* @param userDataToken
 */

UploadLicenseFunction.prototype.uploadLicense = function (userProfileData, userDataToken) {
    console.log(userProfileData)
    return new Promise((resolve, reject) => {
        ProfileServices.uploadLicense(userProfileData, userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(); else reject(response.data); })
            .catch((err) => { logError(err.response); reject(err.response.data); })
    })
}





var UploadLicense = new UploadLicenseFunction()
export default UploadLicense
