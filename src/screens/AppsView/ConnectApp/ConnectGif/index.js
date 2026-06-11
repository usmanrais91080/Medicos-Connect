import React from 'react';
import {View, Image} from 'react-native';
import {Container, Loader} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../../../lib/utils/localstorage';

const ConnectGif = props => {
  function navigate() {
    const userData = getLocalData(LOCAL_STORAGE_KEYS.CONNECTSPLASH);
    setTimeout(async () => {
      if (userData._W != null) {
        props.navigation.navigate(route.CONNECTHOME);
      } else {
        props.navigation.navigate(route.SPLASH, {
          headerTitle: 'Connect',
          title: 'Dating platform for Medicos - safe, easy, perfect!',
          videoDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
          onStartPress: async () => {
            await storeLocalData(
              LOCAL_STORAGE_KEYS.CONNECTSPLASH,
              JSON.stringify(true),
            );
            props.navigation.navigate(route.CONNECTHOME);
          },
        });
      }
    }, 500);
  }

  return (
    <>
      <Loader />
      {/* <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../../../../assets/gifs/connect.gif')}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.65,
            alignSelf: 'center',
          }}
        />
      </View> */}
      {navigate()}
    </>
  );
};

export default ConnectGif;
