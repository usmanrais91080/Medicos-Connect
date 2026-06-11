import {apiHeaderConfiguration} from '../lib/utils/global';
import {EMPTY, MULTIPART, TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  getHelplines: function (token) {
    return axiosInstance.get(
      `mental-health/helpline`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  // Diary APIs start
  createDiary: function (data, token) {
    return axios.post(
      `${BASE_URL}mental-health/diary/add`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  updateDairy: function (id, data, token) {
    return axios.put(
      `${BASE_URL}mental-health/diary/update/${id}`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  getDiary: function (data, token) {
    return axiosInstance.post(
      `mental-health/diary/getYearlyDiary`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getDiaryStats: function (token) {
    return axiosInstance.get(
      `mental-health/diary/stats`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteDiary: function (postData, token) {
    return axiosInstance.delete(
      `mental-health/diary/delete/${postData}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  // Diary APIs end

  //Exercise APIs start
  getExerciseQuestions: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/questions/`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  giveAnswer: function (id, data, token) {
    return axios.post(
      `${BASE_URL}mental-health/exercise/answer/${id}`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getExerciseQuestionStats: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/question-stats/63601429136d2613dc461f4b`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getExerciseAnswerStreak: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/question-answers-streaks`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getExercisePlans: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/mode`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getDayChallenge: function (id, token) {
    return axiosInstance.get(
      `mental-health/exercise/mode/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getExercisePlanDetails: function (id, token) {
    return axiosInstance.get(
      `mental-health/exercise/plan/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  saveExerciseProgress: function (data, token) {
    return axiosInstance.post(
      `mental-health/exercise/save-progress`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  //Exercise APIs end

  getStreakQuestions: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/questions/daily`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getNotificationSettings: function (token) {
    return axiosInstance.get(
      `mental-health/exercise/get-notifications-setting`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  createPost: function (data, token) {
    // return axiosInstance.post('social/post/create', data, apiHeaderConfiguration(token, TOKEN))
    return axios.post(
      `${BASE_URL}mental-health/post/create`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  updatePost: function (data, token) {
    return axiosInstance.put(
      'mental-health/post/update',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likeOrUnlikePost: function (id, token) {
    return axiosInstance.get(
      `mental-health/post/like-unlike-post/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deletePost: function (postData, token) {
    return axiosInstance.delete(
      `mental-health/post/delete/${postData}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserSocialProfile: function (id, token) {
    return axiosInstance.get(
      `social/get-user-social-profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMentalProfile: function (token) {
    return axiosInstance.get(
      `mental-health/profile/get-profile`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserPosts: function (token) {
    return axiosInstance.get(
      'mental-health/post/get-my-posts',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostDetails: function (id, token) {
    return axiosInstance.get(
      `mental-health/post/get-post-detail/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostsFeed: function (page, offset, token) {
    return axiosInstance.get(
      `mental-health/post/get-feed`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  savePost: function (id, token) {
    return axiosInstance.post(
      `mental-health/post/save-post/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  pinPost: function (id, token) {
    return axiosInstance.post(
      `mental-health/post/pin-unpin-post/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSavedPosts: function (token) {
    return axiosInstance.get(
      `mental-health/post/get-saved-posts`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteSavetPost: function (postData, token) {
    return axiosInstance.delete(
      `mental-health/post/delete-saved-post/${postData}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteComment: function (id, token) {
    return axiosInstance.delete(
      `mental-health/post/delete-comment/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  commentOnPost: function (userCommentData, token) {
    return axios.post(
      `${BASE_URL}mental-health/post/comment-post`,
      userCommentData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostComments: function (id, token) {
    return axiosInstance.get(
      `social/post/get-comments/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  reportPost: function (postData, token) {
    return axiosInstance.post(
      `mental-health/post/report-post-comment`,
      postData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  progressJournal: function (postData, token) {
    return axiosInstance.post(
      `admin/mental-health/journal/progress`,
      postData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  userProgress: function (category, token) {
    return axiosInstance.get(
      `admin/mental-health/journal/progress/${category}`,

      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getSingle: function (token, id) {
    return axiosInstance.get(
      `admin/mental-health/journal/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  toggleStreak: function (data, token) {
    return axiosInstance.post(
      `mental-health/exercise/set-notifications-setting`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getAll: function (token) {
    return axiosInstance.get(
      `admin/mental-health/journal/list/63c69becf13fb82f44b8f1d0`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getGoalCatagories: token => {
    return axiosInstance.get(
      `mental-health/goal/categories`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  createGoal: (data, token) => {
    return axiosInstance.post(
      `mental-health/goal`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getGoals: (token, fromDate, toDate, categoryId) => {
    return axiosInstance.get(
      `mental-health/goal?fromDate=${fromDate}&toDate=${toDate}&category=${categoryId}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getAllMoods: token => {
    return axiosInstance.get(
      `mental-health/mood`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getMoodsTracker: (token, days) => {
    return axiosInstance.get(
      `mental-health/mood/track${days ? `?days=${days}` : ''}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  storeUserMood: (token, data) => {
    return axiosInstance.post(
      `mental-health/mood`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  updateGoal: (token, id, data) => {
    return axiosInstance.patch(
      `mental-health/goal/${id}`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getMyProgress: token => {
    return axiosInstance.get(
      `mental-health/profile/progress`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getBreatheExercises: token => {
    return axiosInstance.get(
      `mental-health/breath-exercise`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  createBreathSession: (token, data) => {
    return axiosInstance.post(
      `mental-health/breath-exercise`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
