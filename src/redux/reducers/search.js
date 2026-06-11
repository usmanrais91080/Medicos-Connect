import {
  CAREER_SEARCH_SUCCESS,
  CLASSIFIED_SEARCH_SUCCESS,
  NOTIFICATION_VALUE,
  REGION_ADD,
  STRIPE_OBJECT_CREATE,
  USER_CURRENCY,
} from '../types';

const initialState = {
  careerSearch: false,
  classifiedSearch: false,
  notificationShow: false,
  regionValue: '',
  currency: {
    symbol: 'USD',
    _id: '62a870f85e4548174048e5de',
    name: 'dollar',
  },
  stripeFunc: undefined,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAREER_SEARCH_SUCCESS:
      return {
        ...state,
        careerSearch: action.careerSearch,
      };
    case NOTIFICATION_VALUE:
      return {
        ...state,
        notificationShow: action.notificationShow,
      };
    case CLASSIFIED_SEARCH_SUCCESS:
      return {
        ...state,
        classifiedSearch: action.classifiedSearch,
      };
    case REGION_ADD:
      return {
        ...state,
        regionValue: action.regionValue,
      };
    case USER_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    case STRIPE_OBJECT_CREATE:
      return {
        ...state,
        stripeFunc: action.stripe,
      };
    default:
      return state;
  }
};

export default searchReducer;
