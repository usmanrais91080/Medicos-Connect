import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  userLogin: function (data) {
    return axiosInstance.post(
      'auth/login',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  emailCheck: function (data) {
    return axiosInstance.post(
      'profile/check-unique-email',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  sendEmailOtp: function (data) {
    return axiosInstance.post(
      'auth/email-otp',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  verifyEmailOtp: function (data) {
    return axiosInstance.post(
      'auth/verify-otp',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  registerUser: function (data) {
    return axiosInstance.post(
      'auth/register',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  forgetPassword: function (data) {
    return axiosInstance.post(
      'auth/forgot-account',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  refreshToken: function (token) {
    return axiosInstance.get(
      'auth/refresh-token',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  userLogout: function (token) {
    return axiosInstance.get(
      'auth/logout',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deactivateUserAccount: function (token) {
    return axiosInstance.get(
      'profile/deactivate-account',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  googleSign: function (data) {
    return axiosInstance.post(
      'auth/google-apple-login',
      data,
      apiHeaderConfiguration(EMPTY, EMPTY),
    );
  },
  getRefferalCode: function (token) {
    return axiosInstance.get(
      'auth/referral',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  redeemRefferalReward: function (data, token) {
    return axiosInstance.post(
      'auth/referral/redeem',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteAccount: function (token) {
    return axiosInstance.get(
      'auth/delete-account',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  setGeneralProfile: function (data, token) {
    return axios.post(
      `${BASE_URL}profile/general-profile`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  enable2fa: token => {
    return axiosInstance.post(
      `auth/enable-2fa`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  disable2fa: token => {
    return axiosInstance.post(
      `auth/disable-2fa`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  generateOtp: token => {
    return axiosInstance.post(
      `auth/regenerate-otp`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  verifyOtp: (data, token) => {
    return axiosInstance.post(
      `auth/verify-2fa`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
