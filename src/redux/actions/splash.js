import {ProfileServices} from '../../services';
import {FETCH_MODULES_SPLASH} from '../types';

export const fetchModulesSplash = token => {
  return async dispatch => {
    try {
      ProfileServices.getSplashModules(token).then(response => {
        dispatch(fetchModulesSplashSuccess(response.data.data));
      });
    } catch (error) {}
  };
};

const fetchModulesSplashSuccess = data => ({
  type: FETCH_MODULES_SPLASH,
  payload: data,
});

export const splashActions = {
  fetchModulesSplashSuccess,
  fetchModulesSplash,
};
