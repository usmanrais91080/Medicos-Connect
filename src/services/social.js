import {apiHeaderConfiguration} from '../lib/utils/global';
import {MULTIPART, TOKEN, TOKEN_ONLY} from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import {BASE_URL} from '../enviroments';

const Api = {
  createPost: function (data, token) {
    return axios.post(
      `${BASE_URL}social/post/create`,
      data,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  updatePost: function (data, token) {
    return axiosInstance.put(
      'social/post/update',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likeOrUnlikePost: function (id, token) {
    return axiosInstance.put(
      `social/post/like-unlike-post/${id}`,
      {id: id},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deletePost: function (postData, token) {
    return axiosInstance.delete(
      `social/post/destroy/${postData}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserSocialProfile: function (id, token) {
    return axiosInstance.get(
      `social/get-user-social-profile/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getMySocialProfile: function (token) {
    return axiosInstance.get(
      `social/get-my-social-profile`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserPosts: function (token) {
    return axiosInstance.get(
      'social/post/',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostDetails: function (id, token) {
    return axiosInstance.get(
      `social/post/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostsFeed: function (page, offset, token) {
    return axiosInstance.get(
      `social/post/feeds?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostsFeed1: function (token) {
    return axiosInstance.get(
      `social/post/feeds`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getNearByUsers: function (token) {
    return axiosInstance.get(
      'social/get-new-nearby-and-mutuals',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFollowersAndRequests: function (token) {
    return axiosInstance.get(
      'social/social-requests/get-follow-requests-and-followers',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getFollowings: function (token) {
    return axiosInstance.get(
      'social/social-requests/get-followings-users',
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  acceptFollowRequest: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/accept-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  pinUnpinPost: function (id, token) {
    return axiosInstance.post(
      `social/post/pin-unpin-post/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  rejectFollowRequest: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/reject-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendFollowRequest: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/send-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  sendFollowRequestCompany: function (id, token) {
    return axiosInstance.post(
      `profile/follow-company/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  cancelFollowRequest: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/cancel-follow-request/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  followBackRequest: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/follow-back/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  unFollowUser: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/unfollow-user/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  blockUser: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/block-user/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getBlockedUsers: function (token) {
    return axiosInstance.get(
      `social/social-requests/get-blocked-users`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  unBlockUser: function (id, token) {
    return axiosInstance.get(
      `social/social-requests/unblock-user/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  savePost: function (id, token) {
    return axiosInstance.post(
      `social/post/save-post/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getSavedPosts: function (token) {
    return axiosInstance.get(
      `social/post/get-saved-post`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  createStory: function (storyData, token) {
    return axios.post(
      `${BASE_URL}social/story/create`,
      storyData,
      apiHeaderConfiguration(token, MULTIPART),
    );
  },
  deleteStory: function (id, token) {
    return axiosInstance.delete(
      `social/story/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  voteStory: function (id, data, token) {
    return axiosInstance.post(
      `social/story/${id}/vote`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  deleteComment: function (id, token) {
    return axiosInstance.delete(
      `social/post/delete-comment/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getStories: function (token) {
    return axiosInstance.get(
      `social/story`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  viewStory: function (id, token) {
    return axiosInstance.put(
      `social/story/view/${id}`,
      {},
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  commentOnPost: function (userCommentData, token) {
    return axios.post(
      `${BASE_URL}social/post/comment`,
      userCommentData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getTagUsers: function (token) {
    return axiosInstance.get(
      `social/post/get-tag-users`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getPostComments: function (id, token) {
    return axiosInstance.get(
      `social/post/get-comments/${id}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  likePostComment: function (data, token) {
    return axiosInstance.put(
      'social/post/like-unlike-comment',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },

  getExplorePosts: function (page, offset, token) {
    return axiosInstance.get(
      `social/post/explore?page=${page}&limit=${offset}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  getUserNameSearch: function (name, token) {
    return axiosInstance.get(
      `social/post/search?name=${name}`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  reportPost: function (postData, token) {
    return axiosInstance.post(
      `social/post/report-post-comment`,
      postData,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  votePoll: (id, data, token) => {
    return axiosInstance.post(
      `social/post/${id}/vote`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  replyComment: (data, token) => {
    return axiosInstance.post(
      `social/post/reply-comment`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  repost: (data, token) => {
    return axiosInstance.post(
      `social/post/repost`,
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
  checkUniqueUsername: (data, token) => {
    return axiosInstance.post(
      'social/setting/check-unique-name',
      data,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
