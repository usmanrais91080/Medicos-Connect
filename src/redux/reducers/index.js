import authReducer from './auth';
import searchReducer from './search';
import connectReducer from './connect';
import paymentReducer from './payment';
import {combineReducers} from 'redux';
import postReducer from './post';
import socialReducer from './social';
import mentalHealthReducer from './mentalHealth';
import bottomTabReducer from './bottomTab';
import splashReducer from './splash';

export default combineReducers({
  authReducer,
  searchReducer,
  connectReducer,
  postReducer,
  paymentReducer,
  socialReducer,
  mentalHealthReducer,
  bottomTabReducer,
  splashReducer,
});
