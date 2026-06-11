import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {route, screen} from '../../../lib/utils/constants';
import {
  WalletPinReset,
  WalletSetting,
  AccountSettings1st,
  AccountSettings2nd,
  CareerProfile1st,
  CareerProfile2nd,
  CareerWelcome,
  ClassifiedSettings,
  EducationSettings1st,
  EducationStudent,
  EducationTeacher,
  HomeScreen,
  SocialSetting1st,
  SocialSetting2nd,
  SuccessfullSubmission,
  MentalSettings,
  MentalSplash,
} from '../../../screens';
import themeStyle from '../../../assets/styles/theme.style';
import styles from '../style';
import SocialRoutes from '../../SocialNavigation';
import BookKeepingRoutes from '../../BookKeepingNavigation';
import CareerRoutes from '../../CareerNavigation';
import ClassifiedRoutes from '../../ClassifiedNavigation';
import ConnectRoutes from '../../ConnectNavigation';
import EducationRoutes from '../../EducationNavigation';
import QrRoutes from '../../QrNavigation';
import WalletRoutes from '../../WalletNavigation';

import CareerSettings1st from '../../../screens/AppsView/CareerApp/CareerSettings1st';
import {HeaderLeft} from '../../../components';
import MentalRoutes from '../../MentalHealthNavigation';
import SocialSplash from '../../../screens/AppsView/SocialApp/SocialSplash';
import ConnectSplash from '../../../screens/AppsView/ConnectApp/ConnectSplash';
import EducationSplash from '../../../screens/AppsView/EducationApp/EducationSplash';
import CareerSplash from '../../../screens/AppsView/CareerApp/CareerSplash';
import WalletSplash from '../../../screens/AppsView/WalletApp/WalletSplash';
import ClassifiedSplash from '../../../screens/AppsView/Shopping&ClassifiedApp/ClassifiedSplash';

const Stack = createStackNavigator();

function HomeRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.HOMESCREEN}>
      <Stack.Screen
        name={route.HOMESCREEN}
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.WALLET}
        component={WalletRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.WALLETSPLASH}
        component={WalletSplash}
        options={{
          headerTitle: 'Wallet Settings',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.ACCOUNTSETTINGS}
        component={AccountSettings1st}
        options={{
          headerTitle: 'Account Settings',
          headerTitleAlign: 'left',
          headerShown: false,
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
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
        name={route.SUCCESSFULSUBMISSION}
        component={SuccessfullSubmission}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.SOCIALSETTINGS1st}
        component={SocialSetting1st}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.YELLOW},
          ],
          headerStyle: [
            styles.headerStyle,
            {borderBottomColor: themeStyle.YELLOW, borderBottomWidth: 1},
          ],
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
        name={route.WALLETSETING}
        component={WalletSetting}
        options={{
          headerTitle: 'Wallet settings',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      {/* <Stack.Screen
        name={route.WALLETPINRESET}
        component={WalletPinReset}
        options={{
          headerTitle: 'Wallet Pin Reset',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      /> */}
      <Stack.Screen
        name={route.CLASSIFIEDSETTINGS}
        component={ClassifiedSettings}
        options={{
          headerTitle: 'Classified settings',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.CAREERSETTINGS}
        component={CareerSettings1st}
        options={{
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.CARRER_PRIMARY,
              borderBottomWidth: 1,
              backgroundColor: themeStyle.CARRER_PRIMARY,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {
              color: themeStyle.COLOR_WHITE,
            },
          ],
        }}
      />
      <Stack.Screen
        name={route.CAREERWELCOME}
        component={CareerWelcome}
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
        name={route.CAREERPROFILE1ST}
        component={CareerProfile1st}
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
        name={route.CAREERPROFILE2ND}
        component={CareerProfile2nd}
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
        name={route.QR}
        component={QrRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.MENTAL}
        component={MentalRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.MENTALSPLASH}
        component={MentalSplash}
        options={({navigation}) => ({
          headerTitle: 'Mental Health',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.SOCIAL}
        component={SocialRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.SOCIALSPLASH}
        component={SocialSplash}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPING}
        component={BookKeepingRoutes}
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
        name={route.CAREERSPLASH}
        component={CareerSplash}
        options={({navigation, route}) => ({
          // headerLeft: () => (<HeaderLeft navigation={navigation} white />),
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIED}
        component={ClassifiedRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.CLASSIFIEDSPLASH}
        component={ClassifiedSplash}
        options={{
          headerTitle: 'Classified',
          headerStyle: styles.classifiedHeaderStyle,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
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
        name={route.CONNECTSPLASH}
        component={ConnectSplash}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.headerStyleConnect,
            {color: themeStyle.COLOR_WHITE},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.EDUCATION}
        component={EducationRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.EDUCATIONSPLASH}
        component={EducationSplash}
        options={({navigation}) => ({
          headerTitle: 'Education',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHER}
        component={EducationTeacher}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerTitleAlign: 'left',
          headerStyle: [
            styles.educationHeaderStyle,
            {backgroundColor: themeStyle.COLOR_EDUCATION},
          ],
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENT}
        component={EducationStudent}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: [
            styles.educationHeaderStyle,
            {backgroundColor: themeStyle.COLOR_EDUCATION},
          ],
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSETTINGS}
        component={EducationSettings1st}
        options={{
          headerTitle: 'Education settings',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.MENTALSETTINGS}
        component={MentalSettings}
        options={{
          headerTitle: 'Mental Settings',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeRoutes;
