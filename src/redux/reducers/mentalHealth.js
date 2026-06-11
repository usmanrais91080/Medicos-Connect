import {
  MENTAL_HEALTH_DIARY,
  MENTAL_HEALTH_POSTS,
  MENTAL_HEALTH_PROFILE,
  MENTAL_HEALTH_DAYS,
} from '../types';

const initialState = {
  posts: [],
  mentalProfile: [],
  diary: [],
  stats: {},
  mentalDays: {},
};

const mentalHealthReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENTAL_HEALTH_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case MENTAL_HEALTH_PROFILE:
      return {
        ...state,
        mentalProfile: action.mentalProfile,
      };
    case MENTAL_HEALTH_DIARY:
      return {
        ...state,
        diary: action.statsAndrDiary?.diary,
        stats: action.statsAndrDiary?.stats,
      };
    case MENTAL_HEALTH_DAYS:
      return {
        ...state,
        mentalDays: action.days,
      };

    default:
      return state;
  }
};

export default mentalHealthReducer;
