import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  getPackages: function (token) {
    return axiosInstance.get(
      `paypal/get-packages`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createPayment: function (packageID, userID, token) {
    return axiosInstance.get(
      `paypal/payment/${packageID}/${userID}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createTransaction: function (data, token) {
    return axiosInstance.put(
      `paypal/transaction`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getTransactions: function (token) {
    return axiosInstance.get(
      `paypal/transaction`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendAmpules: function (data, token) {
    return axiosInstance.post(
          `paypal/send-ampules`,
          data,
          apiHeaderConfiguration(token, TOKEN),
        )
  },
  checkPin: function (data, token) {
    return axios.post(
      `${BASE_URL}profile/verify-wallet-pin`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  stripePayment: function (data, token) {
    return axios.post(
      `${BASE_URL}stripe/transaction`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  stripeCreatePayment: function (data, token) {
    return axios.post(
      `${BASE_URL}stripe/create-payment-intent`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
