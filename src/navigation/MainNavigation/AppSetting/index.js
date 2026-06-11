import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {route} from '../../../lib/utils/constants';
import {
  Suggestion,
  AppSettings,
  FAQS,
  PrivacyPolicy,
  TermsConditions,
  TwoFactorAuth,
} from '../../../screens';

import styles from '../style';
import SocialRoutes from '../../SocialNavigation';
import {HeaderLeft} from '../../../components';
import FeedBack from '../../../screens/FeedBack';
import DeleteAccount from '../../../screens/DeleteAccount';
import InviteFriend from '../../../screens/InviteFriend';
import themeStyle from '../../../assets/styles/theme.style';
import Tutorials from '../../../screens/Tutorials';
import TutorialDetail from '../../../screens/TutorialDetail';
import Support from '../../../screens/Support';
import Reviewapp from '../../../screens/Reviewapp';
import ChangePassword from '../../../screens/TwoFactorAuthentication/ChangePassword';
import OtpVerify from '../../../screens/TwoFactorAuthentication/OtpVerifyScreen';

const Stack = createStackNavigator();

function AppSettingRoutes() {
  return (
    <Stack.Navigator
      initialRouteName={route.APPSETTINGS}
      screenOptions={{
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal"
    >
      <Stack.Screen
        name={route.APPSETTINGS}
        component={AppSettings}
        options={{
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.CHANGEPASSWORD}
        component={ChangePassword}
        options={{
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.TWOFACTORAUTH}
        component={TwoFactorAuth}
        options={{
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.OTPVERIFY}
        component={OtpVerify}
        options={{
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.TERMANDCONDITIONS}
        component={TermsConditions}
        options={({navigation, route}) => ({
          headerTitle: 'Terms & Conditions',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => (
            <HeaderLeft
              navigation={navigation}
              color={themeStyle.COLOR_BLACK}
            />
          ),
        })}
      />
      <Stack.Screen
        name={route.SUGGESTION}
        component={Suggestion}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name={route.PRIVACYPOLICY}
        component={PrivacyPolicy}
        options={({navigation, route}) => ({
          headerTitle: 'Privacy Policy',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => (
            <HeaderLeft
              navigation={navigation}
              color={themeStyle.COLOR_BLACK}
            />
          ),
        })}
      />
      <Stack.Screen
        name={route.FAQS}
        component={FAQS}
        options={({navigation, route}) => ({
          headerShown: false,
          headerTitle: 'FAQS',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
        })}
      />

      <Stack.Screen
        name={route.TUTORIALS}
        component={Tutorials}
        options={({navigation, route}) => ({
          headerShown: false,
          headerTitle: 'Tutorials',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
        })}
      />
      <Stack.Screen
        name={route.TUTORIALDETAIL}
        component={TutorialDetail}
        options={({navigation, route}) => ({
          headerShown: false,
          headerTitle: 'Tutorial Details',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
        })}
      />

      <Stack.Screen
        name={route.FEEDBACK}
        component={FeedBack}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.SUPPORT}
        component={Support}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.REVIEWAPP}
        component={Reviewapp}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.DELETEACCOUNT}
        component={DeleteAccount}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.INVITEFRIEND}
        component={InviteFriend}
        options={{
          headerTitle: 'Invite a Friend',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTitleStyle: [
            styles.headerTitleStyle,
            {
              color: themeStyle.COLOR_BLACK,
              fontSize: themeStyle.FONT_SIZE_2XLARGE,
            },
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIAL}
        component={SocialRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppSettingRoutes;
