import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  getConnectInterests: function (token) {
    return axiosInstance.get(
      `connect/get-interests`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  reportUser: (data, token) => {
    return axiosInstance.post(
      `connect/report`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectModes: function (token) {
    return axiosInstance.get(
      `connect/get-mode`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateConnectProfile: function (data, token) {
    return axios.put(
      `${BASE_URL}connect/update-profile`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getConnectProfessions: function (token) {
    return axiosInstance.get(
      `connect/get-professions`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectPersonalJudgement: function (token) {
    return axiosInstance.get(
      `connect/get-personality-judgement-comparisons`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectProfessionMatches: function (token) {
    return axiosInstance.get(
      `connect/get-matches-professions`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createUserProfile: function (data, token) {
    return axios.post(
      `${BASE_URL}connect/create-profile`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getConnectProfilesOfPeoples: function (token) {
    return axiosInstance.get(
      `connect/get-connect-profiles`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectProfileUserDetail: function (id, token) {
    return axiosInstance.get(
      `connect/get-user-connect-profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  addFavouriteProfile: function (id, token) {
    return axiosInstance.get(
      `connect/add-favourite-profiles/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  undoAddFavouriteProfile: function (id, token) {
    return axiosInstance.get(
      `connect/undo-add-favourite-profiles/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  removeConnectProfile: function (id, token) {
    return axiosInstance.get(
      `connect/remove-connect-profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  undoRemoveConnectProfile: function (id, token) {
    return axiosInstance.get(
      `connect/undo-remove-connect-profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendMacthProfileRequest: function (id, token) {
    return axiosInstance.get(
      `connect/send-profile-match-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  undoSendMacthProfileRequest: function (id, token) {
    return axiosInstance.get(
      `connect/undo-send-profile-match-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMatchedProfiles: function (token) {
    return axiosInstance.get(
      `connect/get-matched-profile-requests`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMatchedProfileHistory: function (token) {
    return axiosInstance.get(
      `connect/get-accepted-matched-profiles`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  acceptMatchedProfileRequest: function (id, token) {
    return axiosInstance.get(
      `connect/accept-connect-matched-profile-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  rejectMatchedProfileRequest: function (id, token) {
    return axiosInstance.get(
      `connect/reject-connect-matched-profile-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  changeConnectProfileMode: function (mode, token) {
    let data = {mode: mode};
    return axiosInstance.put(
      `connect/update-connect-profile-mode`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  changeConnectFilter: function (data, token) {
    return axiosInstance.put(
      `connect/update-connect-search-filter`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateConnectProfessionMatches: function (data, token) {
    return axiosInstance.put(
      `connect/update-matches-professions`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFavouriteProfiles: function (token) {
    return axiosInstance.get(
      `connect/get-connect-favourite-profiles`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectProfile: function (token) {
    return axiosInstance.get(
      `connect/get-connect-profile`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPackages: function (token) {
    return axiosInstance.get(
      `paypal/get-packages`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
