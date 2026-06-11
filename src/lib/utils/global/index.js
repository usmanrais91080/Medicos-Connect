import React from 'react';
import {View, PixelRatio} from 'react-native';
import {SCREEN_WIDTH} from '../constants';

/**
 * Return APi configured header with bearer token for APi calls
 * @param token
 * @param type
 */
export const apiHeaderConfiguration = (token, type) => {
  switch (type) {
    case 'token':
      return {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      };
      break;

    case 'multipart':
      return {
        headers: {
          'x-access-token': token,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      break;
    case 'tokenOnly':
      return {
        headers: {
          'x-access-token': token,
        },
      };
      break;

    default:
      return {headers: {'Content-Type': 'application/json'}};
      break;
  }
};

/**
 * Return Object After Parsing
 *  @param data
 */

export const ParseTheData = data => {
  return JSON.parse(data);
};

/**
 * Return Vertical Space of 10 Px
 */
export const VerticalSpacer = () => {
  return <View style={{height: 10}}></View>;
};
export const HorizontalSpacer = () => {
  return <View style={{width: 10}}></View>;
};

/**
 * Return True if email enter is correct
 * @param count
 */
export const moneyFormat = count => {
  return Math.abs(Number(count)) >= 1.0e9
    ? Math.abs(Number(count)) / 1.0e9 + 'B'
    : Math.abs(Number(count)) >= 1.0e6
    ? Math.abs(Number(count)) / 1.0e6 + 'M'
    : Math.abs(Number(count)) >= 1.0e3
    ? Math.abs(Number(count)) / 1.0e3 + 'K'
    : Math.abs(Number(count));
};

/**
 * Return True if email enter is correct
 * @param email
 */
export const isEmailValid = email => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

/**
 * Return True if name enter is correct
 * @param name
 */
export const isNameValid = name => {
  return /^[A-Za-z\.\s]{3,25}$/.test(name);
};
/**
 * Return True if password has one capital one lower one number and one special and length must greater or equal to 8
 * @param password
 */
export const isPasswordValid = password => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/.test(
    password,
  );
};

/**
 * Return True if email enter is correct
 * @param phone
 */
export const isPhoneValid = phone => {
  return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(phone);
};

/**
 * Return True if email enter is correct
 * @param errorResponse
 */
export const logError = errorResponse => {
  console.log(errorResponse);
};

/**
 * It will return responsive font size
 * @param size
 */

export function scaleFont(size) {
  const newSize = size * (SCREEN_WIDTH / 375);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * It will return responsive image size
 * @param size
 */

export function scaleImage(size) {
  return size * (SCREEN_WIDTH / 375);
}
