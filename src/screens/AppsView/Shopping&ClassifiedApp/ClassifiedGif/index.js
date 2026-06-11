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

const ClassifiedGif = props => {
  function navigate() {
    const userData = getLocalData(LOCAL_STORAGE_KEYS.CLASSIFIEDSPLASH);
    setTimeout(async () => {
      if (userData._W != null) {
        props.navigation.navigate(route.CLASSIFIEDHOME);
      } else {
        props.navigation.navigate(route.SPLASH, {
          headerTitle: 'Classified',
          title: 'Buy, sell and trade with medicos - quick, easy, perfect!',
          videoDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
          onStartPress: async () => {
            await storeLocalData(
              LOCAL_STORAGE_KEYS.CLASSIFIEDSPLASH,
              JSON.stringify(true),
            );
            props.navigation.navigate(route.CLASSIFIEDHOME);
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
          source={require('../../../../assets/gifs/classified.gif')}
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

export default ClassifiedGif;
