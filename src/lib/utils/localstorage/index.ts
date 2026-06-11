import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const LOCAL_STORAGE_KEYS = {
  personalDetails: 'personalDetails',
  userToken: 'userToken',
  USER: "USER",
  appIntro: 'APP_INTRO',
  email: 'email',
  password: 'password',
  remember_me: 'remember_me',
  emailPassword: 'emailPassword',
  Location: "Location",
  swipeCount: "swipeCount",
  previousDate: "previousDate",
  MENTALSPLASH: "MS",
  CAREERSPLASH: "CS",
  CONNECTSPLASH: "COS",
  EDUCATIONSPLASH: "ES",
  CLASSIFIEDSPLASH: "CLS",
  WALLETSPLASH: "WS",
  SOCIALSPLASH: "SSS",
  METALTODO: "DATE",
  showExersiceModal: "MODAL",
  app_consent:"consent"
};

/**
 * Store local data based on key
 * @param key
 * @param value value to be stored
 */
const storeLocalData = (key: string, value: any) => {
  AsyncStorage.setItem(key, value);
};

/**
 * Get local data based on key
 * @param key
 */
const getLocalData = async (key: string) => await AsyncStorage.getItem(key);

/**
 * Clear all local data
 */
const clearAllLocalData = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }
};

/**
 * Clear local data based on key
 * @param key
 */
const clearLocalData = (key: string) => {
  AsyncStorage.removeItem(key);
};

export {
  storeLocalData,
  getLocalData,
  clearAllLocalData,
  clearLocalData,
  LOCAL_STORAGE_KEYS,
};
