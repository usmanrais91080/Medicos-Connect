import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {Alert, Linking, Platform} from 'react-native';
import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Connect from '../../assets/svg/connect.svg';
import Education from '../../assets/svg/education.svg';
import Social from '../../assets/svg/social.svg';
import {route} from '../../lib/utils/constants';
import {
  clearAllLocalData,
  clearLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../lib/utils/localstorage';
import {
  AdsServices,
  AuthServices,
  MentalServices,
  ProfileServices,
} from '../../services';
import {
  EXPIRE_CODE_ERROR,
  HEALTH_AND_SEFATY_SUCCESS,
  IS_USER_VERIFIED_SUCCESS,
  LOADING_SUCCESS,
  SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
  UPDATE_LOCATION_SUCCESS,
  USER_LOGIN_MODAL_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_MODULE_SUCCESS,
  USER_UPDATE_PROFILE_INFO_SUCCESS,
  WRONG_CODE_ERROR,
  JOURNAL_DAYS_SUCCESS,
  HEALTH_DAYS_SUCCESS,
  TOPADS_SUCCESS,
  BOTTOMADS_SUCCESS,
} from '../types';
import {purgeStoredState} from 'redux-persist';
// import * as Sentry from "@sentry/react-native";

const setUserProfile = (userData, navigate, newUser) => {
  return dispatch => {
    if (userData) {
      dispatch({type: USER_LOGIN_SUCCESS, userData: userData});
      if (newUser) {
        dispatch({type: LOADING_SUCCESS, loading: false});
        navigate(route.GENERALPROFILE);
      } else if (
        userData.is_social_profile_created == true &&
        // comment out the below line to show the profile screen
        // userData.is_connect_profile_created == true &&
        // userData.is_career_profile_created == true &&
        userData.is_classified_profile_created == true &&
        userData.is_education_profile_created == true &&
        userData.is_mental_health_profile_created == true
      ) {
        if (navigate) {
          dispatch({type: LOADING_SUCCESS, loading: false});
          navigate(route.MAIN);
        }
      } else {
        if (navigate) {
          dispatch({type: LOADING_SUCCESS, loading: false});
          navigate(route.GENERALPROFILE);
        }
      }
    }
  };
};

const getUserProfile = (userData, navigate, newUser) => {
  return dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    ProfileServices.getUserProfile(userData.token)
      .then(async responseData => {
        if (
          responseData.data.success != 'undefined' &&
          responseData.data.code !== 200
        ) {
          dispatch(removeUser(navigate));
          dispatch({type: LOADING_SUCCESS, loading: !loading});
        } else {
          if (responseData.data.code == 200) {
            let data = {
              ...responseData.data.data,
              token: userData.token,
            };
            await dispatch(setUserProfile(data, navigate, newUser));
            AsyncStorage.setItem('USER', JSON.stringify(data));
            // dispatch({ type: LOADING_SUCCESS, loading: false })
          } else {
            // Alert.alert(responseData.data.message)
            alert(
              'Error!!', // This is a title
              responseData.data.message, // This is a alert message
              {
                type: 'bottomsheet',
              },
            );
            dispatch({type: LOADING_SUCCESS, loading: !loading});
          }
        }
      })
      .catch(err => {});
  };
};

const sendVerificationCode = (data, navigate) => {
  return dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    auth()
      .verifyPhoneNumber(data.phone, 60)
      .on(
        'state_changed',
        phoneAuthSnapshot => {
          switch (phoneAuthSnapshot.state) {
            case auth.PhoneAuthState.CODE_SENT:
              dispatch({
                type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
                userData: {phone: data.phone},
                loading: !loading,
              });
              navigate(route.VERIFYPHONE, {
                verificationId: phoneAuthSnapshot.verificationId,
                data,
              });
              break;
            case auth.PhoneAuthState.ERROR: // or 'error'
              // Sentry.captureException(phoneAuthSnapshot.error.code);
              // Alert.alert('Phone number is not correct')
              alert(
                '', // This is a title
                'Phone number is not correct', // This is a alert message
                {
                  type: 'bottomsheet',
                },
              );
              dispatch({type: LOADING_SUCCESS, loading: !loading});
              break;
            // case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
            //     console.log('verify time out')
            //     dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
            //     navigate('PhoneVerification', { verificationId: phoneAuthSnapshot.verificationId })
            //     break;
            case auth.PhoneAuthState.AUTO_VERIFIED: // or 'error'
              // console.log('verified', phoneAuthSnapshot)
              if (
                phoneAuthSnapshot.code == null &&
                phoneAuthSnapshot.verificationId == null
              ) {
                // Alert.alert('Phone number is already in use');
                alert(
                  '', // This is a title
                  'Phone number is already in use', // This is a alert message
                  {
                    type: 'bottomsheet',
                  },
                );
                dispatch({type: LOADING_SUCCESS, loading: !loading});
              } else {
                let userData = {
                  ...data,
                  registerUser: true,
                  code: phoneAuthSnapshot.code,
                  id: phoneAuthSnapshot.verificationId,
                };
                dispatch(verifyCode(userData, navigate));
              }
              break;
          }
        },
        error => {
          // Alert.alert(error)
          alert(
            'Error!!', // This is a title
            error, // This is a alert message
            {
              type: 'bottomsheet',
            },
          );
          dispatch({type: LOADING_SUCCESS, loading: !loading});
        },
      );
  };
};

const verifyCode = (userData, navigate) => {
  return dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    var credential = auth.PhoneAuthProvider.credential(
      userData.id,
      userData.code,
    );
    if (credential) {
      auth()
        .signInWithCredential(credential)
        .then(verify => {
          dispatch({type: IS_USER_VERIFIED_SUCCESS, loading: !loading});
          // navigate(route.WELCOME);
          dispatch(registerUser(userData, navigate));
        })
        .catch(error => {
          if (error.code == 'auth/invalid-verification-code') {
            dispatch({type: LOADING_SUCCESS, loading: !loading});
            // Alert.alert("Code Invalid", 'Your entered code is invalid')
            alert(
              'Code Invalid!!', // This is a title
              'Your entered code is invalid', // This is a alert message
              {
                type: 'bottomsheet',
              },
            );
          } else if (error.code == 'auth/session-expired') {
            dispatch({type: LOADING_SUCCESS, loading: !loading});
            // Alert.alert("Session Expired", 'Your session has been expired.\nPlease try again later!')
            alert(
              'Session Expired!!', // This is a title
              'Your session has been expired. Please try again later!', // This is a alert message
              {
                type: 'bottomsheet',
              },
            );
          }
        });
    }
  };
};

const UpdateProfileInfo = (userData, phone, navigate) => {
  return dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    AuthServices.updatePersonalInfo(userData, phone)
      .then(response => {
        if (response.data.status) {
          dispatch({
            type: USER_UPDATE_PROFILE_INFO_SUCCESS,
            userData: {
              name: userData.name,
              gender: userData.gender,
              dob: userData.dob,
              photo: userData.image,
            },
            loading: !loading,
          });
          navigate('AddYourAddress', {editAddress: false});
        } else {
          // Alert.alert(response.data.message)
          alert(
            'Session Expired!!', // This is a title
            response.data.message, // This is a alert message
            {
              type: 'bottomsheet',
            },
          );
          dispatch({type: LOADING_SUCCESS, loading: !loading});
        }
      })
      .catch(error => {
        dispatch({type: LOADING_SUCCESS, loading: !loading});
      });
  };
};

const removeUser = (token, navigate) => {
  return dispatch => {
    AuthServices.userLogout(token)
      .then(async res => {
        if (res.data.code == 200) {
          navigate(route.LOGINORSIGNUP);
          // await clearLocalData(LOCAL_STORAGE_KEYS.USER);
          await clearAllLocalData();
          setTimeout(async () => {
            await dispatch({type: USER_LOGOUT_SUCCESS});
            await clearAllLocalData();
            // await purgeStoredState()
          }, 3000);
        }
      })
      .catch(async err => {
        navigate(route.LOGINORSIGNUP);
        // await clearLocalData(LOCAL_STORAGE_KEYS.USER);
        await clearAllLocalData();
        setTimeout(async () => {
          await dispatch({type: USER_LOGOUT_SUCCESS});
          await clearAllLocalData();
        }, 3000);
      });
  };
};

const deactiveUser = (token, navigate) => {
  return dispatch => {
    AuthServices.deactivateUserAccount(token)
      .then(async res => {
        if (res.data.code == 200) {
          navigate(route.LOGINORSIGNUP);
          await clearLocalData(LOCAL_STORAGE_KEYS.USER);
          await clearAllLocalData();
          setTimeout(async () => {
            await dispatch({type: USER_LOGOUT_SUCCESS});
          }, 3000);
        }
      })
      .catch(err => {});
  };
};

const registerUser = (userData, navigate, showOtp) => {
  return async dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    await requestUserPermission(userData, dispatch, navigate, showOtp);
  };
};
const registerUserEmail = (userData, navigate) => {
  return async dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    await requestUserPermission(userData, dispatch, navigate);
  };
};

const userLogin = (userData, navigate, showPopup) => {
  return async dispatch => {
    let loading = true;
    if (loading) {
      dispatch({type: LOADING_SUCCESS, loading: loading});
    }
    await requestUserPermission(userData, dispatch, navigate, showPopup);
  };
};

const requestUserPermission = async function (
  data,
  dispatch,
  navigate,
  showPopup,
) {
  const authorizationStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: true,
    sound: true,
  });
  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
  } else {
    Alert.alert(
      'Attension',
      'You need to allow push notification from settings',
      [{text: 'OK', onPress: () => Linking.openSettings()}],
    );
  }

  const authStatus = await messaging().hasPermission();

  if (!authStatus) {
    const enabled = await messaging().requestPermission();
    if (enabled) {
      getFcmToken(data, dispatch, navigate, showPopup);
      return;
    }
  }

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken(data, dispatch, navigate, showPopup);
  } else {
    Alert.alert('Attention', 'Push notification permission is disabled');
    dispatch({type: LOADING_SUCCESS, loading: false});
  }
};

const getFcmToken = async (userData, dispatch, navigate, showPopup) => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    let cod = [-72.7498, 33.7637];
    let lowerCaseEmail = userData.email.toLowerCase();
    let data = {};
    if (userData.gender == '') {
      data = {
        name: userData.name,
        email: lowerCaseEmail,
        phone: userData.phone,
        // "gender": userData.gender,
        password: userData.password,
        device_type: userData.device_type,
        device_id: userData.device_id,
        location:
          Platform.OS == 'ios'
            ? {
                type: 'Point',
                address: 'Gujranwala, Pakistan',
                coordinates: cod,
              }
            : userData.location,
        fcm: fcmToken,
      };
    } else {
      data = {
        name: userData?.name,
        email: lowerCaseEmail,
        phone: userData?.phone,
        gender: userData?.gender,
        password: userData?.password,
        device_type: userData?.device_type,
        device_id: userData?.device_id,
        location:
          Platform.OS == 'ios'
            ? {
                type: 'Point',
                address: 'Gujranwala, Pakistan',
                coordinates: cod,
              }
            : userData?.location,
        fcm: fcmToken,
      };
    }

    if (userData?.registerUser) {
      AuthServices.registerUser(data)
        .then(async res => {
          if (res.data.message == 'Email already exists.') {
            dispatch({type: LOADING_SUCCESS, loading: false});
            alert(
              'Error', // This is a title
              'Your entered email is already exists', // This is a alert message

              {
                type: 'bottomsheet',
                textConfirm: 'Ok', // Label of button confirm
                // textCancel: 'Cancel', // Label of button cancel
                onConfirm: () => navigate(route.SIGNUP), // Call your confirm function
                // onCancel: () => cancelClick() /
              },
            );
          }
          if (
            res.data.status == 'success' &&
            res.data.message != 'Email already exists.'
          ) {
            await dispatch(getBannnerAds('top', res.data.data.token));
            await dispatch(getBannnerAds('bottom', res.data.data.token));
            dispatch(
              getUserProfile(res.data.data, navigate, userData.registerUser),
            );
            await dispatch(getUserModules(res.data.data.token));
            storeLocalData(
              LOCAL_STORAGE_KEYS.USER,
              JSON.stringify(res.data.data),
            );
          }
        })
        .catch(err => {
          dispatch({type: LOADING_SUCCESS, loading: false});
        });
    } else {
      let lowerCaseEmail = userData?.email.toLowerCase();
      let data = {
        name: userData?.name,
        email: lowerCaseEmail.trim(),
        phone: userData?.phone,
        gender: userData?.gender,
        password: userData?.password.trim(),
        device_type: userData?.device_type,
        device_id: userData?.device_id,
        location: userData?.location,
        fcm: fcmToken,
      };
      AuthServices.userLogin(data)
        .then(async res => {
          if (res.data.status == 'success') {
            await dispatch(getBannnerAds('top', res.data.data.token));
            await dispatch(getBannnerAds('bottom', res.data.data.token));
            if (!res.data.data.isTwoFactorEnabled) {
              dispatch(getUserModules(res.data.data.token));
              dispatch(getUserProfile(res.data.data, navigate));
            }
            if (res.data.data.isTwoFactorEnabled) {
              dispatch({type: LOADING_SUCCESS, loading: false});
              showPopup(res.data.data.token, res.data.data);
            }
          }
        })
        .catch(err => {
          alert(err?.response?.data?.message);
          dispatch({type: LOADING_SUCCESS, loading: false});
          // Sentry.captureException(err);
        });
    }
  } else {
  }
};

const refreshToken = (data, navigate) => {
  return async dispatch => {
    AuthServices.refreshToken(data.token)
      .then(async res => {
        if (res.data.status == 'success') {
          let userData = {
            ...data,
            token: res.data.data,
          };
          await dispatch(getBannnerAds('top', res.data.data));
          await dispatch(getBannnerAds('bottom', res.data.data));
          await dispatch(getUserModules(res.data.data));
          await dispatch(
            getUserProfile(userData, navigate, userData.registerUser),
          );
          storeLocalData(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
        }
      })
      .catch(async err => {
        navigate(route.LOGINORSIGNUP);
        await clearLocalData(LOCAL_STORAGE_KEYS.USER);
        await clearAllLocalData();
        setTimeout(async () => {
          await dispatch({type: USER_LOGOUT_SUCCESS});
          await clearAllLocalData();
        }, 3000);
      });
  };
};

const forgotPassword = async () => {};

const healthAndSafety = modal => {
  return dispatch => {
    dispatch({type: HEALTH_AND_SEFATY_SUCCESS, modal: modal});
  };
};
const onCloseModal = () => {
  return dispatch => {
    dispatch({type: USER_LOGIN_MODAL_SUCCESS, modal: false});
  };
};
const wrongCode = modal => {
  return dispatch => {
    dispatch({type: WRONG_CODE_ERROR, wrongCode: modal});
  };
};
const codeExpire = modal => {
  return dispatch => {
    dispatch({type: EXPIRE_CODE_ERROR, codeExpire: modal});
  };
};

const getUserModules = token => {
  return async dispatch => {
    ProfileServices.getUserModules(token)
      .then(async res => {
        if (res.data.code == 200) {
          let array = [];
          res.data.data?.map((item, index) => {
            if (item.module.name == 'Social') {
              return;
            } else {
              array.push(item);
            }
          });

          array.map((item, index) => {
            switch (item?.module?.name) {
              case 'Social':
                array[index] = {
                  ...array[index],
                  route: route.SOCIAL,
                  icon: <Social />,
                };
                break;
              case 'Education':
                array[index] = {
                  ...array[index],
                  route: route.EDUCATION,
                  icon: <Education />,
                };
                break;
              case 'Connect':
                array[index] = {
                  ...array[index],
                  route: route.CONNECT,
                  icon: <Connect />,
                };
                break;
              case 'Market':
                array[index] = {
                  ...array[index],
                  route: route.MARKET,
                  icon: <Classified />,
                };
                break;
              case 'Mee':
                array[index] = {
                  ...array[index],
                  route: route.MENTAL,
                  icon: <Classified />,
                };
                break;
              case 'Career':
                array[index] = {
                  ...array[index],
                  route: route.CAREER,
                  icon: <Career />,
                };
                break;
              case 'Pager':
                array[index] = {
                  ...array[index],
                  route: route.PAGER,
                  icon: <Career />,
                };
                break;
              case 'Wallet':
                array[index] = {
                  ...array[index],
                  route: route.WALLET,
                  icon: <Career />,
                };
                break;
            }
          });
          await dispatch({
            type: USER_MODULE_SUCCESS,
            userModules: array,
            loading: false,
          });
        } else {
          // Alert.alert("No user modules found!")
          alert(
            '', // This is a title
            'No user modules found!', // This is a alert message
            {
              type: 'bottomsheet',
            },
          );
        }
      })
      .catch(err => {
        // t(err.response.data.message, err.response.data.data);
      });
  };
};
const updateLocation = (location, token) => {
  return async dispatch => {
    ProfileServices.updateLocation(location, token)
      .then(async res => {
        if (res.data.code == 200) {
          await dispatch({
            type: UPDATE_LOCATION_SUCCESS,
            location: location,
          });
        } else {
          alert(
            '', // This is a title
            res.data.message, // This is a alert message
            {
              type: 'bottomsheet',
            },
          );
        }
      })
      .catch(err => {});
  };
};
const updateJournalDays = token => {
  return dispatch => {
    MentalServices.getAll(token)
      .then(async res => {
        await dispatch({
          type: JOURNAL_DAYS_SUCCESS,
          journalDays: res.data.data,
        });
      })
      .catch(err => {});
  };
};

const getBannnerAds = (id, token) => {
  return dispatch => {
    AdsServices.getAds(
      id == 'top' ? 'Main Slider Ads' : 'Bottom Slider Ads',
      id == 'top' ? 'Main Banner' : 'Bottom Banner',
      token,
    )
      .then(async res => {
        if (id == 'top') {
          await dispatch({type: TOPADS_SUCCESS, topAds: res.data.data});
        } else {
          await dispatch({type: BOTTOMADS_SUCCESS, bottomAds: res.data.data});
        }
      })
      .catch(err => {
        // console.log('Get Ads Top error>>>>>', err);
      });
  };
};

export const authActions = {
  setUserProfile,
  getUserProfile,
  removeUser,
  sendVerificationCode,
  verifyCode,
  refreshToken,
  registerUser,
  UpdateProfileInfo,
  forgotPassword,
  userLogin,
  healthAndSafety,
  codeExpire,
  wrongCode,
  getUserModules,
  onCloseModal,
  updateLocation,
  deactiveUser,
  registerUserEmail,
  updateJournalDays,
  getBannnerAds,
};
