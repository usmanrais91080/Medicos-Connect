import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Alert, BackHandler, LogBox, Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LottieSplashScreen from 'react-native-splash-screen';
import SuperAlert from 'react-native-super-alert';
import {Provider} from 'react-redux';
import THEME from './assets/styles/theme.style';
import store from './redux/CreateStore';
import AppRoutes from './routes';
// import * as Sentry from "@sentry/react-native";
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import {PERMISSIONS, RESULTS, request, check} from 'react-native-permissions';
import {PUBLISHABLE_KEY} from './lib/utils/constants';
import {StripeProvider} from '@stripe/stripe-react-native';
import linking from './linking_config/LinkingConfiguration';
import RNScreenshotPrevent, {
  addListener,
} from 'react-native-screenshot-prevent';
// Sentry.init({
//     dsn: "https://299f4c4a563c455ab93b63a4d43ccc8b@o1119333.ingest.sentry.io/6153674",
//   });
//const store = createStore();

function App() {
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);
  /**
   * TODO:Screenshot prevent not working on new react native
   * version 0.76 will have to wait the library update
   */
  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     RNScreenshotPrevent.enabled(true);
  //     RNScreenshotPrevent.enableSecureView();
  //     const screenshotListener = addListener(() => {
  //       Alert.alert(
  //         'Screenshot Detected',
  //         'Taking screenshots of this app is not allowed due to security reasons.',
  //         [{text: 'OK'}],
  //       );
  //     });
  //     return () => {
  //       screenshotListener.remove();
  //     };
  //   }
  // }, []);

  React.useEffect(() => {
    Orientation.lockToPortrait();
    LottieSplashScreen.hide();
    LogBox.ignoreAllLogs();
    // Settings.initializeSDK();
    // Settings.setAdvertiserTrackingEnabled(true);
    // AppEventsLogger.logEvent('login',{user : 'user', email : 'email'});
  }, []);
  React.useEffect(async () => {
    if (Platform.OS === 'ios') {
      // const ATT_CHECK = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      // if (ATT_CHECK === RESULTS.DENIED) {
      //   try {
      //     const ATT = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      //     if (ATT === RESULTS.GRANTED) {
      //       Settings.setAdvertiserTrackingEnabled(true).then(() => {
      //         Settings.initializeSDK();
      //         AppEventsLogger.logEvent('test', 14, {type: 'ios'});
      //       });
      //     }
      //   } catch (error) {
      //     throw error;
      //   } finally {
      //     Settings.initializeSDK();
      //     AppEventsLogger.logEvent('test', 14, {type: 'ios'});
      //   }
      //   Settings.initializeSDK();
      //   Settings.setAdvertiserTrackingEnabled(true);
      //   AppEventsLogger.logEvent('test', 14, {type: 'ios'});
      // }
      Settings.initializeSDK();
      Settings.setAdvertiserTrackingEnabled(true);
      AppEventsLogger.logEvent('test', 14, {type: 'ios'});
    } else {
      Settings.initializeSDK();
      Settings.setAdvertiserTrackingEnabled(true);
      AppEventsLogger.logEvent('test', 12, {type: 'android'});
    }
  }, []);

  return (
    <>
      <StripeProvider
        publishableKey={PUBLISHABLE_KEY}
        merchantIdentifier="merchant.com.mainapp.medicos.connect">
        <Provider store={store}>
          <MenuProvider>
            <NavigationContainer linking={linking}>
              <SafeAreaProvider
                style={{backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR}}>
                <StatusBar
                  backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR}
                  barStyle={'dark-content'}
                />
                <AppRoutes />
                <SuperAlert />
              </SafeAreaProvider>
            </NavigationContainer>
          </MenuProvider>
        </Provider>
      </StripeProvider>
    </>
  );
}

// export default Sentry.wrap(App);
export default App;
