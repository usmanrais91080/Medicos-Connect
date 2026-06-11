import {FETCH_MODULES_SPLASH} from '../types';

const initialState = {
  splash: [],
};

const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES_SPLASH:
      return {
        ...state,
        splash: action.payload,
      };

    default:
      return state;
  }
};

export default socialReducer;
