import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import {BASE_URL} from '../enviroments';
import axios from 'axios';

const Api = {
  getUserProfile: function (token) {
    return axiosInstance.get('profile', apiHeaderConfiguration(token, TOKEN));
  },
  updateFcm: function (data, token) {
    return axiosInstance.put(
      'profile/update-fcm',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updatePassword: function (data, token) {
    return axiosInstance.put(
      'profile/update-password',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getDays: token => {
    return axiosInstance.get(
      'profile/get-days',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateProfile: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  uploadLicense: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/update-medical-license`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  uploadCnic: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/update-id-card`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setPushNotifications: function (token) {
    return axiosInstance.get(
      'profile/set-push-notification',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserModules: function (token) {
    return axiosInstance.get(
      'profile/get-user-modules',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  activateUserModule: function (data, token) {
    return axiosInstance.put(
      'profile/activate-user-module',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deactivateUserModule: function (data, token) {
    return axiosInstance.put(
      'profile/deactivate-user-module',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSocialProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/social/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getCareerProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/career/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getClassifiedProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/classified/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getGamesProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/games/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getConnectProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/connect/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getEducationProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/education/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getWalletProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/wallet/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setWalletProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/wallet-settings/update`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setSocialProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/social-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  updateMentalProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/mee-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  setMentalProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}mental-health/profile/create-profile`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getMentalProfileSettings: function (token) {
    return axiosInstance.get(
      'profile/mee/settings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMentalMoods: function (token) {
    return axiosInstance.get(
      'mental-health/profile/get-mood',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setConnectProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/connect-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  setClassifiedProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/classified-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  setCareerProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/career-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  setGameProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/games-settings/update`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setEducationProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/education-settings/update`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getNotification: function (token, page, limit) {
    return axiosInstance.get(
      `notifications?page=${page}limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getAnnouncement: function (token) {
    return axiosInstance.get(
      `profile/get-announcement`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  readNotification: function (id, token) {
    return axios.put(
      `${BASE_URL}notifications/read/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateLocation: function (data, token) {
    return axios.put(
      `${BASE_URL}profile/update-location`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendChatNotifications: function (data, token) {
    return axiosInstance.post(
      `notifications/send-chat-notification`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  resetPassword: function (data, token) {
    return axiosInstance.put(
      `profile/update-password`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  postFeedback: function (postData, token) {
    return axiosInstance.post(
      `feedback/create`,
      postData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  addSupport: function (postData, token) {
    return axiosInstance.post(
      'profile/add-support',
      postData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  addReview: function (body, token) {
    return axiosInstance.post(
      'review/create',
      body,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  importContacts: function (contacts, token) {
    return axiosInstance.post(
      `profile/import-contacts`,
      contacts,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPagerProfileSettings: function (token) {
    return axiosInstance.get(
      'pager/profile/',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getTransactionsModule: function (token) {
    return axiosInstance.get(
      'profile//get-transactions-module',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createPagerProfileSettings: function (data, token) {
    return axios.post(
      `${BASE_URL}pager/profile/create`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  setPagerProfileSettings: function (data, token) {
    return axios.put(
      `${BASE_URL}pager/profile/update`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  uploadSplashModule: (data, token) => {
    return axiosInstance.put(
      `profile/update-modules-splash`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSplashModules: token => {
    return axiosInstance.get(
      `profile/modules-splash`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateTrial: token => {
    return axiosInstance.put(
      'profile/update-trail',
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
