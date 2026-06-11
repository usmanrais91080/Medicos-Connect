import { apiHeaderConfiguration } from '../lib/utils/global';
import { EMPTY, MULTIPART, TOKEN } from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import { BASE_URL } from '../enviroments';

const Api = {
  createPost: function (data, token) {
    return axiosInstance.post('pager/create', data, apiHeaderConfiguration(token, TOKEN))
  },
  updatePost: function (data, token) {
    return axiosInstance.put(
      'pager/post/update',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likeOrUnlikePost: function (id, token) {
    return axiosInstance.put(
      `pager/post/like-unlike-post/${id}`,
      { id: id },
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deletePost: function (id, token) {
    return axiosInstance.delete(
      `pager/delete/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteComment: function (id, token) {
    return axiosInstance.delete(
      `pager/delete-comment/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteSavePager: function (id, token) {
    return axiosInstance.delete(
      `pager/delete-saved-pager/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteFavourite: function (id, token) {
    return axiosInstance.delete(
      `pager/profile/delete-favourite/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserPagerProfile: function (id, token) {
    return axiosInstance.get(
      `pager/profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMyPagerProfile: function (token) {
    return axiosInstance.get(
      `pager/profile`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserPosts: function (token) {
    return axiosInstance.get(
      'pager/post/',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostDetails: function (id, token) {
    return axiosInstance.get(
      `pager/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostsFeed: function (page, offset, token) {
    return axiosInstance.get(
      `pager/feed?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPagerFollowRequests: function (token) {
    return axiosInstance.get(
      'pager/profile/get-follow-requests',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFollowings: function (token) {
    return axiosInstance.get(
      'pager/profile/get-followings',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFavourites: function (token) {
    return axiosInstance.get(
      'pager/profile/get-favourites',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  acceptFollowRequest: function (id, token) {
    return axiosInstance.get(
      `pager/profile/accept-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  rejectFollowRequest: function (id, token) {
    return axiosInstance.get(
      `pager/profile/reject-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendFollowRequest: function (id, token) {
    return axiosInstance.get(
      `pager/profile/send-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  unFollowUser: function (id, token) {
    return axiosInstance.get(
      `pager/profile/unfollow/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  savePost: function (id, token) {
    return axiosInstance.get(
      `pager/save/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  repostPost: function (data, token) {
    return axiosInstance.post(
      `pager/repage`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  quotePost: function (data, token) {
    return axiosInstance.post(
      `pager/quote`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSavedPosts: function (token) {
    return axiosInstance.get(
      `pager/get-saved-pagers`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  commentOnPost: function (userCommentData, token) {
    return axios.post(
      `${BASE_URL}pager/add-comment`,
      userCommentData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  reportPost: function (id, token) {
    return axiosInstance.get(
      `pager/report/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserSearches: function (postData, token) {
    return axiosInstance.get(
      `pager/search-all-pager?text=${postData}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFriends:  function (token) {
    return axiosInstance.get(
      `pager/profile/get-followers-and-followings`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  // cancelFollowRequest: function (postData, token) {
  //   return axiosInstance.get(
  //     `pager/search-all-pager?text=${postData}`,
  //     apiHeaderConfiguration(token, TOKEN),
  //   );
  // },
};

export default Api;
