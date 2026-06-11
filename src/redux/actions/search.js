import {
  CAREER_SEARCH_SUCCESS,
  CLASSIFIED_SEARCH_SUCCESS,
  NOTIFICATION_VALUE,
  REGION_ADD,
  STRIPE_OBJECT_CREATE,
  USER_CURRENCY,
} from '../types';

const careerSearch = value => {
  return async dispatch => {
    dispatch({ type: CAREER_SEARCH_SUCCESS, careerSearch: !value });
  };
};

const classifiedSearch = () => {
  return async dispatch => {
    dispatch({ type: CLASSIFIED_SEARCH_SUCCESS, classifiedSearch: !value });
  };
};

const notificationAdd = value => {
  return async dispatch => {
    dispatch({ type: NOTIFICATION_VALUE, notificationShow: value });
  };
};

const regionAdd = value => {
  return async dispatch => {
    dispatch({ type: REGION_ADD, regionValue: value });
  };
};

const userCurrency = value => {
  return async dispatch => {
    dispatch({ type: USER_CURRENCY, currency: value });
  };
};

const stripeObj = value => {
  return async dispatch => {
    dispatch({type: STRIPE_OBJECT_CREATE, stripe: value});
  };
};

export const searchActions = {
  careerSearch,
  classifiedSearch,
  notificationAdd,
  regionAdd,
  userCurrency,
  stripeObj,
};
