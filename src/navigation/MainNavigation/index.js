import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import THEME from '../../assets/styles/theme.style';
import ChatHome from '../../assets/svg/chat-icon.svg';
import Home from '../../assets/svg/home.svg';
import {route} from '../../lib/utils/constants';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import AppSettingHome from '../../assets/svg/appsetting.svg';
import NotificationHome from '../../assets/svg/notification.svg';
import NotificationIndicator from '../../assets/svg/notificationindicator.svg';
import ProfileHome from '../../assets/svg/profile.svg';
import Loader from '../../components/Loader';
import AppSettingRoutes from './AppSetting';
import ChatRoutes from './Chat';
import HomeRoutes from './Home';
import NotificationRoutes from './Notification';
import ProfileRoutes from './Profile';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from '../../redux/actions/search';
import themeStyle from '../../assets/styles/theme.style';
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader = props => (
  <LinearGradient
    colors={['#2C034B', '#570A58', '#A9107A', '#E465BE']}
    style={{
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 80,
    }}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
  />
);
var Sound = require('react-native-sound');
const Bottom = createBottomTabNavigator();

Sound.setCategory('Playback');
const playLikeSound = () => {
  var soundTrack = new Sound(
    require('../../assets/sounds/notification-bell.mp3'),
    (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      soundTrack.play(success => {
        soundTrack.release();
      });
    },
  );
};

function MainRoutes(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => {
    return {search: state.searchReducer || {}};
  });
  const {theme} = useSelector(state => state.bottomTabReducer);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [initialRoute, setInitialRoute] = useState(route.HOME);

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      playLikeSound();
      dispatch(searchActions.notificationAdd(true));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      dispatch(searchActions.notificationAdd(true));
      navigation.navigate(route.NOTIFICATION);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // ding.play();
          dispatch(searchActions.notificationAdd(true));
          setInitialRoute(route.NOTIFICATION);
        }
        setLoading(false);
      });
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  if (loading) {
    return <Loader />;
  }
  const selectIcon = () => {
    try {
      return theme?.backgroundColor === themeStyle.COLOR_WHITE;
    } catch (error) {}
  };
  return (
    <>
      <Bottom.Navigator
        initialRouteName={initialRoute}
        screenOptions={({route}) => ({
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            paddingBottom: '5%',
            height: 80,
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            backgroundColor:
              theme?.backgroundColor == 'gradient_color'
                ? 'white'
                : theme?.backgroundColor,
          },
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (route.name === 'Home') {
              icon = (
                <View style={{marginTop: isKeyboardVisible ? 10 : -50}}>
                  <Home />
                </View>
              );
            } else if (route.name === 'Profile') {
              icon = selectIcon() ? (
                <ProfileHome fill="#8B8B8B" />
              ) : (
                <ProfileHome fill={theme?.iconColor} />
              );
            } else if (route.name === 'Notification') {
              icon = profile?.search?.notificationShow ? (
                <NotificationIndicator />
              ) : selectIcon() ? (
                <NotificationHome fill="#8B8B8B" />
              ) : (
                <NotificationHome fill={theme?.iconColor} />
              );
            } else if (route.name === 'AppSetting') {
              icon = selectIcon() ? (
                <AppSettingHome fill="#8B8B8B" />
              ) : (
                <AppSettingHome fill={theme?.iconColor} />
              );
            } else if (route.name === 'Chat') {
              icon = selectIcon() ? (
                <ChatHome fill="#8B8B8B" />
              ) : (
                <ChatHome fill={theme?.iconColor} />
              );
            }
            return icon;
          },
          tabBarBackground: () =>
            theme?.backgroundColor == 'gradient_color' && <GradientHeader />,
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: theme?.activeTintColor,
          inactiveTintColor: theme?.inactiveTintColor,
          style: {
            backroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
          },
          onTabPress: () => {},
        }}
      >
        <Bottom.Screen name={route.PROFILE} component={ProfileRoutes} />
        <Bottom.Screen name={route.CHAT} component={ChatRoutes} />
        <Bottom.Screen name={route.HOME} component={HomeRoutes} />
        <Bottom.Screen
          name={route.NOTIFICATION}
          component={NotificationRoutes}
        />
        <Bottom.Screen name={route.APPSETTING} component={AppSettingRoutes} />
      </Bottom.Navigator>
    </>
  );
}

export default MainRoutes;
