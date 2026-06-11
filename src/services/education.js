import {apiHeaderConfiguration} from '../lib/utils/global';
import {MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  // Set Mode
  setMode: function (data, token) {
    return axiosInstance.put(
      `${BASE_URL}education/set-mode`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  // Teacher Apis
  createClass: function (classData, token) {
    return axios.post(
      `${BASE_URL}education/class/create`,
      classData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getClasses: function (token, page, offset) {
    return axiosInstance.get(
      `education/class?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getClassesHistory: token => {
    return axiosInstance.get(
      'education/class/get-previous-classes',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getClassApplicants: function (id, token) {
    return axiosInstance.get(
      `education/class/get-class-applicants/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateClass: function (classData, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/update`,
      classData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteClass: function (id, token) {
    return axiosInstance.delete(
      `education/class/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getStudentQueries: function (token) {
    return axiosInstance.get(
      `education/class/query/get-all-quries`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendClassRequest: function (id, data, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/query/send-teach-request/${id}`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateTeacherEntered: function (classData, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/updateEnteredStatus`,
      classData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  // Student Apis
  getClassesStudent: function (token, page, limit) {
    return axiosInstance.get(
      `education/class/all?page=${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  applyToClass: function (id, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/apply/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createQuery: function (queryData, token) {
    return axios.post(
      `${BASE_URL}education/class/query/create`,
      queryData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMyQueries: function (token) {
    return axiosInstance.get(
      `education/class/query/get-my-quries`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMeetUrl: function (token) {
    return axiosInstance.get(
      `education/class/generate-meet-url`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getCME: function (token, page, limit) {
    return axiosInstance.get(
      `education/class/get-cmes?page=${page}&limit=${limit}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getCMEDetail: function (id, token) {
    return axiosInstance.get(
      `education/class/get-cmes-detail/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  applyToCME: function (data, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/apply-cme`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getAppliedClasses: function (token) {
    return axiosInstance.get(
      `education/class/applied-classes`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUpcomingClasses: function (token) {
    return axiosInstance.get(
      `education/class/get-upcoming-classes`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getQueryRequests: function (id, token) {
    return axiosInstance.get(
      `education/class/query/get-class-tech-requests/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  acceptQueryRequest: function (data, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/query/accept-class-tech-request`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  rejectQueryRequest: function (data, token) {
    return axiosInstance.put(
      `${BASE_URL}education/class/query/reject-class-tech-request`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createQna: (data, token) => {
    return axios.post(
      `${BASE_URL}education/qna`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getQnaCatagories: token => {
    return axiosInstance.get(
      `education/qna/categories`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getQnAs: (page, offset, token) => {
    return axiosInstance.get(
      `education/qna/feed?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likeOrUnlikeQna: (id, token) => {
    return axiosInstance.put(
      `education/qna/like-remove-like-qna/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  dislikeQna: (id, token) => {
    return axiosInstance.put(
      `education/qna/dislike-remove-dislike-qna/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getQnaById: (id, token) => {
    return axiosInstance.get(
      `education/qna/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  commentQna: (data, token) => {
    return axiosInstance.post(
      `education/qna/comment`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getQnaComments: (id, token) => {
    return axiosInstance.get(
      `education/qna/get-comments/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  replyComment: (data, token) => {
    return axiosInstance.post(
      `education/qna/reply-comment`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  onVotePoll: (id, data, token) => {
    return axiosInstance.post(
      `education/qna/${id}/vote`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteQna: (id, token) => {
    return axiosInstance.delete(
      `education/qna/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteQnaComment: (id, token) => {
    return axiosInstance.delete(
      `education/qna/delete-comment/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updateQna: (id, data, token) => {
    return axiosInstance.put(
      `education/qna/${id}`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likeUnlikeComment: (data, token) => {
    return axiosInstance.put(
      `education/qna/like-unlike-comment`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getCurrencies: token => {
    return axiosInstance.get(
      `education/class/currency`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  startClassSession: (data, token) => {
    return axiosInstance.post(
      `education/class/start-class-session`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  finishClassSession: (data, token) => {
    return axiosInstance.post(
      `education/class/finish-class-session`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getTeacherStats: (teacherId, token) => {
    return axiosInstance.get(
      `education/class/class-session-statistics?teacher_id=${teacherId}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  reviewTeacher: (id, data, token) => {
    return axiosInstance.post(
      'review/create-teacher-review',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getTeacherReviews: (page, limit, teacher_id, token) => {
    return axiosInstance.get(
      `review/get-teacher-review?page=${page}&limit=${limit}&teacher_id=${teacher_id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
