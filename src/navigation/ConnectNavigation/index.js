import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import {
  SocialViewUrl,
  ConnectWelcome,
  ConnectDisclaimer,
  ConnectProfile3rd,
  ConnectProfile2nd,
  ConnectProfile1st,
  ConnectHome,
  ConnectAdvanceFilter,
  ConnectMatchedProfile,
  ConnectProfile4th,
  ConnectUserProfile,
  ConnectFavourites,
  ConnectSettings1st,
  ConnectSettings2nd,
  ConnectEditProfile1st,
  ConnectEditProfile2nd,
  ConnectEditProfile3rd,
  ConnectEditProfile4th,
  ConnectMatchedHistory,
  ConnectSplash,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';

import styles from '../MainNavigation/style';
import {HeaderLeft} from '../../components';
import ConnectGif from '../../screens/AppsView/ConnectApp/ConnectGif';

const Stack = createStackNavigator();

function ConnectRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.CONNECTHOME}>
      {/* <Stack.Screen
        name={route.CONNECTWELCOME}
        component={ConnectWelcome}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerStyleConnect,
          headerStyle: styles.classifiedHeaderTextStyle,
        })}
      />
      <Stack.Screen
        name={route.CONNECTDISCLAIMER}
        component={ConnectDisclaimer}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerStyleConnect,
          headerStyle: styles.headerStyle1,
        })}
      /> */}
      <Stack.Screen
        name={route.CONNECTPROFILE3RD}
        component={ConnectProfile3rd}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTFAVOURITEPROFILE}
        component={ConnectFavourites}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerStyleConnect,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name={route.CONNECTPROFILE2ND}
        component={ConnectProfile2nd}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTPROFILE4TH}
        component={ConnectProfile4th}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTUSERPROFILE}
        component={ConnectUserProfile}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
          // headerTitleStyle: styles.headerStyleConnect,
          // headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name={route.CONNECTPROFILE1ST}
        component={ConnectProfile1st}
        options={({navigation}) => ({
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation}  />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTMATCHEDPROFILE}
        component={ConnectMatchedProfile}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTMATCHEDHISTORY}
        component={ConnectMatchedHistory}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTHOME}
        component={ConnectHome}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerStyle: [styles.headerStyle, {backgroundColor: themeStyle.PINK}],
        })}
      />
      <Stack.Screen
        name={route.CONNECTGIF}
        component={ConnectGif}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name={route.CONNECTSETTINGS1ST}
        component={ConnectSettings1st}
        options={{
          headerTitle: 'Connect',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyleConnect,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
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
          headerTitleStyle: styles.headerStyleConnect,
        }}
      />
      <Stack.Screen
        name={route.CONNECTEDITPROFILE1ST}
        component={ConnectEditProfile1st}
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
        name={route.CONNECTEDITPROFILE2ND}
        component={ConnectEditProfile2nd}
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
        name={route.CONNECTEDITPROFILE3RD}
        component={ConnectEditProfile3rd}
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
        name={route.CONNECTEDITPROFILE4TH}
        component={ConnectEditProfile4th}
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
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ConnectRoutes;
