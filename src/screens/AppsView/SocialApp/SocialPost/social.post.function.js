
/** @format */
import { logError } from "../../../../lib/utils/global";
import { SocialServices } from "../../../../services";

function SocialPostFunction() {
    if (!(this instanceof SocialPostFunction)) {
        return new SocialPostFunction();
    }
}

/**
 * Get user Posts Data
 * @param userDataToken
 */
 SocialPostFunction.prototype.getUserPosts = function (userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.getPostsFeed(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data.data); })
            .catch((err) => { logError(err); 
reject(err.response.data); })
    })
}

/**
 * Get Near by Users 
 * @param userDataToken
 */
 SocialPostFunction.prototype.getNearByUsers = function (userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.getNearByUsers(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => { logError(err); 
reject(err.response.data); })
    })
}



var SocialPostLib = new SocialPostFunction()
export default SocialPostLib
