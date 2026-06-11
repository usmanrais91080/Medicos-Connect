import {
    POST_FILTER_UPDATE,
    FETCH_POST_SUCCESS,
    FETCH_PAGER_POST_SUCCESS,
    PAGER_USER_PROFILE,
    PAGER_PROFILE,
    SOCIAL_REQUEST,
    SOCIAL_LIST,
    SOCIAL_STORIES

} from '../types';
import { SocialServices, PagerServices } from '../../services';

const updateFilters = (filters) => {
    return (dispatch) => {
        dispatch({ type: POST_FILTER_UPDATE, filterData: filters })

    }
};

const getPosts = (userDataToken) => {
    return (dispatch) => {

        SocialServices.getPostsFeed(1, 5, userDataToken)
            .then((response) => {
                if (response.data.code == 200) {
                    dispatch({ type: FETCH_POST_SUCCESS, postData: response.data.data })
                }

            })
            .catch((err) => { dispatch({ type: FETCH_POST_SUCCESS, postData: [] }) })
    }
};

const getStories = (id,name,img,userDataToken) => {
    return (dispatch) => {

        SocialServices.getStories( userDataToken)
            .then((response) => {
                if (response.data.code == 200) {
                    let arrayData=[];
                    if(response.data.data.my_stories.length>0)
                    {
                        let data={
                            _id:id,
                            username:name,
                            image:img,
                            stories:[...response.data.data.my_stories]
                        };
                      arrayData = [data, ...response.data.data.social_stories]
                    }
                    else
                    {
                     arrayData = [...response.data.data.social_stories]

                    }
                    dispatch({ type: SOCIAL_STORIES, stories: arrayData })
                }

            })
            .catch((err) => { dispatch({ type: SOCIAL_STORIES, stories: [] }) })
    }
};

const getPagerPosts = (userDataToken) => {
    return (dispatch) => {

        PagerServices.getPostsFeed(1, 5, userDataToken)
            .then((response) => {
                if (response.data.code == 200) {
                    dispatch({ type: FETCH_PAGER_POST_SUCCESS, pagerData: response.data.data })
                }

            })
            .catch((err) => { dispatch({ type: FETCH_PAGER_POST_SUCCESS, pagerData: [] }) })
    }
};

const getUserProfile = profile => {
    return dispatch => {
        dispatch({ type: PAGER_USER_PROFILE, profile: profile });
    };
};

const getPagerProfile = profile => {
    return dispatch => {
        dispatch({ type: PAGER_PROFILE, profile: profile });
    };
};

const getSocailRequest = socialRequest => {
    return dispatch => {
        dispatch({ type: SOCIAL_REQUEST, socialRequest: socialRequest });
    };
};

const getPostList = postList => {
    return dispatch => {
        dispatch({ type: SOCIAL_LIST, postList: postList });
    };
};

export const postActions = {
    updateFilters,
    getPosts,
    getPagerPosts,
    getUserProfile,
    getPagerProfile,
    getSocailRequest,
    getPostList,
    getStories
};