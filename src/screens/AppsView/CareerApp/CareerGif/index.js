import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
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
import {connect} from 'react-redux';
import {Loader} from '../../../../components';

const CareerGif = props => {
  const {userData} = props.user;
  useEffect(() => {
    if (!userData.is_career_profile_created) {
      setTimeout(() => {
        props.navigation.navigate(route.CAREERCHOOSEOPTIONS);
      }, 500);
    } else {
      navigate();
    }
  }, []);

  function navigate() {
    const userData = getLocalData(LOCAL_STORAGE_KEYS.CAREERSPLASH);
    setTimeout(async () => {
      if (userData._W != null) {
        props.navigation.navigate(route.CAREERHOME);
      } else {
        props.navigation.navigate(route.SPLASH, {
          headerTitle: 'Career',
          title:
            'Global jobs and scholarship postings for medicos - simple, worldwide, perfect!',
          videoDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
          onStartPress: async () => {
            await storeLocalData(
              LOCAL_STORAGE_KEYS.CAREERSPLASH,
              JSON.stringify(true),
            );
            props.navigation.navigate(route.CAREERHOME);
          },
        });
      }
    }, 100);
  }

  return (
    <>
      <Loader />
      {/* <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../../../../assets/gifs/Career.gif')}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.65,
            alignSelf: 'center',
          }}
        />
      </View> */}
    </>
  );
};

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerGif);
