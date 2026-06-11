import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  getClassifiedProductCategories: function (token) {
    return axiosInstance.get(
      `classified/product-add/get-product-categories`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getProducts: function (token, page, limit) {
    return axiosInstance.get(
      `classified/product-add?${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getProductDetail: function (id, token) {
    return axiosInstance.get(
      `classified/product-add/product-ad-detail/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createProduct: function (data, token) {
    return axios.post(
      `${BASE_URL}classified/product-add/post`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  createUserProfile: function (data, token) {
    return axios.post(
      `${BASE_URL}connet/create-profile`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getMyAds: function (token, page, limit) {
    return axiosInstance.get(
      `classified/product-add/get-my-product-ads?page=${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMyActiveAds: function (token, page, limit) {
    return axiosInstance.get(
      `classified/product-add/get-my-active-product-ads?page=${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMyInactiveAds: function (token, page, limit) {
    return axiosInstance.get(
      `classified/product-add/get-my-inactive-product-ads?page=${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  addProductToWishlist: function (id, token) {
    return axiosInstance.get(
      `classified/product-add/add-product-ad-to-wishlist/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  removeProductFromWishlist: function (id, token) {
    return axiosInstance.get(
      `classified/product-add/remove-product-ad-to-wishlist/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getWishlistProducts: function (token) {
    return axiosInstance.get(
      `classified/product-add/get-product-ad-wishlist`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteAd: function (delAdd, token) {
    return axios.delete(
      `${BASE_URL}classified/product-add/${delAdd}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobCountries: function (token) {
    return axiosInstance.get(
      `career/profile/get-countries`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobCityByCountry: function (id, token) {
    return axiosInstance.get(
      `career/profile/get-cities/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
