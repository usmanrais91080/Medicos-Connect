import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  getJobs: function (token, page, offset) {
    return axiosInstance.get(
      `career/job?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPublicAds: function (token) {
    return axiosInstance.get(
      `career/job/get-public-ads`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobDetail: function (id, token) {
    return axiosInstance.get(
      `career/job/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  applyJob: function (applyData, token) {
    return axios.post(
      `${BASE_URL}career/job/apply`,
      applyData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  jobAddRemoveFav: function (id, token) {
    return axiosInstance.get(
      `career/job/add-remove-favourite/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  jobAddRemove: function (id, token) {
    return axiosInstance.get(
      `career/job/remove-job/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  jobSearch: function (jobData, token) {
    // return axiosInstance.get(`${BASE_URL}career/job/search-jobs`,data,  apiHeaderConfiguration(token, TOKEN))
    return axios.post(
      `${BASE_URL}career/job/search-jobs`,
      jobData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobProfile: function (token) {
    return axiosInstance.get(
      `career/job`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobTitles: function (token) {
    return axiosInstance.get(
      `career/profile/get-job-titles`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobCities: function (token) {
    return axiosInstance.get(
      `career/job/get-search-cities`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobFilters: function (token) {
    return axiosInstance.get(
      `career/job/get-search-filters`,
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
  getJobTypes: function (token) {
    return axiosInstance.get(
      `career/profile/get-job-types`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createJob: function (jobData, token) {
    return axios.post(
      `${BASE_URL}career/job/create`,
      jobData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getAppliedJobs: function (token) {
    return axiosInstance.get(
      `career/job/get-applied-jobs`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFavJobs: function (token) {
    return axiosInstance.get(
      `career/job/get-favourite-jobs`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSavedJobs: function (token) {
    return axiosInstance.get(
      `career/job/get-saved-jobs`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  addRemoveSavedJob: function (id, token) {
    return axiosInstance.get(
      `career/job/save-job/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getCreatedJobs: function (token) {
    return axiosInstance.get(
      `career/job/get-my-jobs`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobApplicants: function (id, token) {
    return axiosInstance.get(
      `career/job/get-job-applicants/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobProfile: function (token) {
    return axiosInstance.get(
      `career/profile`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobDepartment: function (token) {
    return axiosInstance.get(
      `career/profile/get-departments`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobLanguages: function (token) {
    return axiosInstance.get(
      `career/profile/get-languages`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createUpdateProfile: function (data, token) {
    return axios.post(
      `${BASE_URL}career/profile/create`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  closeJob: function (id, token) {
    return axiosInstance.put(
      `career/job/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getJobProfessions: function (token) {
    return axiosInstance.get(
      `connect/get-professions`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createFreelancerProfile: (token, data) => {
    return axiosInstance.put(
      `career/profile/freelancer`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createInfluencerProfile: (token, data) => {
    return axiosInstance.put(
      'career/profile/influencer',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFreelancerProfile: token => {
    return axiosInstance.get(
      'career/profile/freelancer',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getInfluencerProfile: token => {
    return axiosInstance.get(
      'career/profile/influencer',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
