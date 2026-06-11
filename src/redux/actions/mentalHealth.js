import {
  MENTAL_HEALTH_POSTS,
  MENTAL_HEALTH_PROFILE,
  MENTAL_HEALTH_DIARY,
  MENTAL_HEALTH_DAYS,
} from '../types';

const mentalHealthPosts = posts => {
  return dispatch => {
    dispatch({type: MENTAL_HEALTH_POSTS, posts: posts});
  };
};

const mentalHealthProfile = profile => {
  return dispatch => {
    dispatch({type: MENTAL_HEALTH_PROFILE, mentalProfile: profile});
  };
};

const mentalHealthDiary = statsAndrDiary => {
  return dispatch => {
    dispatch({type: MENTAL_HEALTH_DIARY, statsAndrDiary: statsAndrDiary});
  };
};

const mentalHealthDays = days => {
  return dispatch => {
    dispatch({type: MENTAL_HEALTH_DAYS, days: days});
  };
};

export const mentalHealthActions = {
  mentalHealthPosts,
  mentalHealthProfile,
  mentalHealthDiary,
  mentalHealthDays,
};
