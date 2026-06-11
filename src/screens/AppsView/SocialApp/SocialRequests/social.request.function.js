
/** @format */

import { logError } from "../../../../lib/utils/global";
import { SocialServices } from "../../../../services";

function SocialRequestFunction() {
    if (!(this instanceof SocialRequestFunction)) {
        return new SocialRequestFunction();
    }
}

/**
 * Get user Follow Request and Followers
 * @param userDataToken
 */

SocialRequestFunction.prototype.getFollowersAndRequests = function (userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.getFollowersAndRequests(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            });
    });
};

/**
 * Refreshing the user Followers and Requests
 * @param userDataToken
 */

SocialRequestFunction.prototype.refreshingSocialRequests = function (userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.getFollowersAndRequests(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data); })
            .catch((err) => {
                logError(err);
                reject(err.response.data);
            });
    });
};

/**
 * Accept User Request For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialRequestFunction.prototype.acceptFollowRequest = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.acceptFollowRequest(userProfileId, userDataToken)
            .then((res) => {
                if (res.data.code == 200) resolve(res);
            }).catch((err) => {
                logError(err);
                reject(err.response.data);
            });
    });
};

/**
 * Reject User Request For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialRequestFunction.prototype.rejectFollowRequest = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.rejectFollowRequest(userProfileId, userDataToken)
            .then((res) => { if (res.data.code == 200) resolve(); }).catch((err) => {
                logError(err);
                reject(err.response.data);
            });
    });
};

/**
 * Send Follow Request to User For Following
 * @param userProfileId
 * @param userDataToken
 */

SocialRequestFunction.prototype.sendFollowRequest = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.sendFollowRequest(userProfileId, userDataToken)
            .then((res) => { if (res.data.code == 200) resolve(); }).catch((err) => {
                logError(err);
                reject(err.response.data);
            });
    });
};

/**
 * UnFollow User From Following
 * @param userProfileId
 * @param userDataToken
 */

SocialRequestFunction.prototype.unFollowUser = function (userProfileId, userDataToken) {
    return new Promise((resolve, reject) => {
        SocialServices.unFollowUser(userProfileId, userDataToken)
            .then((res) => { if (res.data.code == 200) resolve(); }).catch((err) => {
                logError(err);
                reject();
            });
    });
};





var SocialRequest = new SocialRequestFunction();
export default SocialRequest;
