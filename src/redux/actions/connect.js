import {ConnectModuleServices} from '../../services';
import {
  CONNECT_INTERESTS_SUCCESS,
  CONNECT_PERSONALJUDGEMENT_SUCCESS,
  CONNECT_PROFESSIONS_SUCCESS,
} from '../types';


const getConnectInterests = token => {
  return async dispatch => {
    ConnectModuleServices.getConnectInterests(token)
      .then(res => {
        if (res.data.code == 200) {
          let hobbies = [...res.data.data.hobbies];
          hobbies.map((item, index) => {
            hobbies[index] = {...hobbies[index], selected: false};
          });
          let lifestyles = [...res.data.data.lifestyles];
          lifestyles.map((item, index) => {
            lifestyles[index] = {...lifestyles[index], selected: false};
          });
          let likes = [...res.data.data.likes];
          likes.map((item, index) => {
            likes[index] = {...likes[index], selected: false};
          });
          let personalities = [...res.data.data.personalities];
          personalities.map((item, index) => {
            personalities[index] = {...personalities[index], selected: false};
          });
          dispatch({
            type: CONNECT_INTERESTS_SUCCESS,
            personalities,
            likes,
            lifestyles,
            hobbies,
          });
        }
      })
      .catch(err => null);
  };
};

const getConnectProfessions = token => {
  return dispatch => {
    ConnectModuleServices.getConnectProfessions(token)
      .then(res => {
        if (res.data.code == 200) {
          dispatch({
            type: CONNECT_PROFESSIONS_SUCCESS,
            professions: res.data.data,
          });
        }
      })
      .catch(err => null);
  };
};

const getConnectPersonalJudgments = token => {
  return dispatch => {
    ConnectModuleServices.getConnectPersonalJudgement(token)
      .then(res => {
        if (res.data.code == 200) {
          let array = res.data.data;
          array.map((item, index) => {
            array[index].comparison_one = {
              ...array[index].comparison_one,
              selected: 0,
            };
            array[index].comparison_two = {
              ...array[index].comparison_two,
              selected: 0,
            };
          });
          dispatch({
            type: CONNECT_PERSONALJUDGEMENT_SUCCESS,
            professions: array,
          });
        }
      })
      .catch(err => {
        // console.log('getConnectPersonalJudgement>>>>>>>>', err)
        }
      );
  };
};

export const connectActions = {
  getConnectInterests,
  getConnectProfessions,
  getConnectPersonalJudgments,
};
