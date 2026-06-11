import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {route} from '../../../lib/utils/constants';
import {
  CareerViewApplicant,
  CareerJobPosted,
  AccountSettings1st,
  AccountSettings2nd,
  Notifications,
  SinglePostScreen,
  SocialFollower,
  SocialProfile,
  ConnectMatchedProfile,
  ConnectMatchedHistory,
  ConnectUserProfile,
} from '../../../screens';
import themeStyle from '../../../assets/styles/theme.style';

import styles from '../style';
import EducationRoutes from '../../EducationNavigation';
import {HeaderLeft} from '../../../components';
import EducationQnaDiscussion from '../../../screens/AppsView/EducationApp/EducationQnaDiscussion';

const Stack = createStackNavigator();

function NotificationRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.NOTIFICATIONSCREEN}>
      <Stack.Screen
        name={route.NOTIFICATIONSCREEN}
        component={Notifications}
        options={{
          headerTitle: 'Notifications',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTintColor: themeStyle.COLOR_BLACK,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.ACCOUNTSETTINGS}
        component={AccountSettings1st}
        options={{
          headerTitle: 'Account Settings',
          headerTitleAlign: 'left',
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
        name={route.SOCIALPROFILE}
        component={SocialProfile}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.SOCIALSINGLEPOST}
        component={SinglePostScreen}
        options={{
          headerTitle: 'Post',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.SOCIALFOLLOWER}
        component={SocialFollower}
        options={{
          headerTitle: 'Followers',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
      />

      <Stack.Screen
        name={route.CONNECTMATCHEDPROFILE}
        component={ConnectMatchedProfile}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
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
        name={route.EDUCATIONQNADISCUSSION}
        component={EducationQnaDiscussion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.CONNECTMATCHEDHISTORY}
        component={ConnectMatchedHistory}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name={route.CONNECTUSERPROFILE}
        component={ConnectUserProfile}
        options={({navigation}) => ({
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name={route.CAREERJOBPOSTED}
        component={CareerJobPosted}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Posted Jobs',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name={route.CAREERVIEWAPPLICANT}
        component={CareerViewApplicant}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'View Applicants',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        })}
      />
      {/* <Stack.Screen
        name={route.EDUCATIONSTUDENTWORKSHOPDETAIL}
        component={EducationStudentWorkshopDetails}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
        })}
      /> */}
    </Stack.Navigator>
  );
}

export default NotificationRoutes;
