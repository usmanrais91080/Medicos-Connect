import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {route} from '../../../lib/utils/constants';
import {
  AccountSettings2nd,
  AdvanceVerificationTier,
  WalletPinReset,
  ClassifiedSettings,
  ConnectSettings1st,
  ConnectSettings2nd,
  ConnectUserProfile,
  EducationSettings1st,
  EducationSettings2nd,
  Profile,
  SocialSetting1st,
  SocialSetting2nd,
  SuccessfullSubmission,
  UploadCNIC,
  UploadCNICBack,
  WalletSetting,
  MentalSettings,
  CareerEditProfile1st,
} from '../../../screens';

import styles from '../style';
import SocialRoutes from '../../SocialNavigation';
import CareerRoutes from '../../CareerNavigation';
import ClassifiedRoutes from '../../ClassifiedNavigation';
import ConnectRoutes from '../../ConnectNavigation';
import themeStyle from '../../../assets/styles/theme.style';
import CareerSettings1st from '../../../screens/AppsView/CareerApp/CareerSettings1st';
import CareerCreateProfile from '../../../screens/AppsView/CareerApp/CareerCreateProfile';
import {HeaderLeft} from '../../../components';

const Stack = createStackNavigator();

function ProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.PROFILE}>
      <Stack.Screen
        name={route.PROFILE}
        component={Profile}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.ACCOUNTSETTINGS2nd}
        component={AccountSettings2nd}
        options={{
          headerTitle: 'Account Settings',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.SOCIALSETTINGS1st}
        component={SocialSetting1st}
        options={{
          headerTitle: 'Social ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {borderBottomColor: themeStyle.YELLOW, borderBottomWidth: 1},
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.MENTALSETTINGS}
        component={MentalSettings}
        options={{
          headerTitle: 'MEE',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.PURPLE_COLOR},
          ],
          headerStyle: [
            styles.headerStyleMental,
            {
              backgroundColor: 'none',
              borderBottomColor: themeStyle.PURPLE_COLOR,
              borderBottomWidth: 1,
            },
          ],
        }}
      />
      <Stack.Screen
        name={route.UPLOADCNIC}
        component={UploadCNIC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.UPLOADCNICBACK}
        component={UploadCNICBack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.ADVANCEVERIFICATION}
        component={AdvanceVerificationTier}
        options={{
          headerTitle: 'Advance Identification',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.SUCCESSFULSUBMISSION}
        component={SuccessfullSubmission}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.SOCIALSETTINGS2nd}
        component={SocialSetting2nd}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.CONNECTSETTINGS1ST}
        component={ConnectSettings1st}
        options={{
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {borderBottomColor: themeStyle.PINK, borderBottomWidth: 1},
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.PINK},
          ],
        }}
      />
      <Stack.Screen
        name={route.CONNECTSETTINGS2ND}
        component={ConnectSettings2nd}
        options={{
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
        }}
      />
      <Stack.Screen
        name={route.CONNECTUSERPROFILE}
        component={ConnectUserProfile}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.CLASSIFIEDSETTINGS}
        component={ClassifiedSettings}
        options={{
          headerTitle: 'Classified ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.COLOR_CLASSIFIED,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.COLOR_CLASSIFIED},
          ],
        }}
      />
      <Stack.Screen
        name={route.CAREERSETTINGS}
        component={CareerSettings1st}
        options={{
          headerTitle: 'Career ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.CARRER_PRIMARY,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.CARRER_PRIMARY},
          ],
        }}
      />
      <Stack.Screen
        name={route.CAREEREDITPROFILE1ST}
        component={CareerEditProfile1st}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERCREATEPROFILE}
        component={CareerCreateProfile}
        options={{
          headerTitle: 'Career ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.CARRER_PRIMARY,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.CARRER_PRIMARY},
          ],
        }}
      />
      <Stack.Screen
        name={route.EDUCATIONSETTINGS}
        component={EducationSettings1st}
        options={{
          headerTitle: 'Education ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.COLOR_EDUCATION,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.COLOR_EDUCATION},
          ],
        }}
      />
      <Stack.Screen
        name={route.EDUCATIONSETTINGS2nd}
        component={EducationSettings2nd}
        options={{
          headerTitle: 'Education ',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      {/* Wallet Menu */}
      <Stack.Screen
        name={route.WALLETSETING}
        component={WalletSetting}
        options={{
          headerTitle: 'Wallet ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.COLOR_BOOK_KEEPING,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.COLOR_BOOK_KEEPING},
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
      <Stack.Screen
        name={route.CAREER}
        component={CareerRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.CLASSIFIED}
        component={ClassifiedRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.CONNECT}
        component={ConnectRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.WALLETPINRESET}
        component={WalletPinReset}
        options={{
          headerTitle: 'Wallet Pin Reset',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileRoutes;
