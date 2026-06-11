
/** @format */
import { SocialServices } from "../../../../services";

function CareerProfileFunction() {
    if (!(this instanceof CareerProfileFunction)) {
        return new CareerProfileFunction();
    }
}

/**
 * Get user job title
 * @param userDataToken
 */
 SocialPostFunction.prototype.getUserPosts = function (userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.getPostsFeed(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data.data); })
            .catch((err) => { reject(err.response.data); })
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
            .catch((err) => {reject(err.response.data); })
    })
}



var SocialPostLib = new SocialPostFunction()
export default SocialPostLib
