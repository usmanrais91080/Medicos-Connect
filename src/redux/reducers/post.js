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

const initialState = {
    filterData: [],
    postData: [],
    pagerData: [],
    userProfile: {},
    pagerProfile: {},
    socialRequest: [],
    postList:[]

};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_FILTER_UPDATE:
            return {
                ...state,
                filterData: action.filterData
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                postData: action.postData
            }
        case FETCH_PAGER_POST_SUCCESS:
            return {
                ...state,
                pagerData: action.pagerData
            }
        case PAGER_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile
            }
        case PAGER_PROFILE:
            return {
                ...state,
                pagerProfile: action.profile
            }
        case SOCIAL_REQUEST:
            return {
                ...state,
                socialRequest: action.socialRequest
            }
        case SOCIAL_LIST:
            return {
                ...state,
                postList: action.postList
            }
            case SOCIAL_STORIES:
            return {
                ...state,
                stories: action.stories
            }
        default:
            return state;
    }
};

export default postReducer;
