import React from 'react';
import {View, Image} from 'react-native';
import {Container} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
} from '../../../../lib/utils/localstorage';

const SocialGif = props => {
  function navigate() {
    const userData = getLocalData(LOCAL_STORAGE_KEYS.SOCIALSPLASH);
    setTimeout(async () => {
      if (userData._W != null) {
        props.navigation.navigate(route.SOCIALHOME);
      } else {
        props.navigation.navigate(route.SOCIALSPLASH);
      }
    }, 4500);
  }

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}></View>
      {navigate()}
    </>
  );
};

export default SocialGif;
