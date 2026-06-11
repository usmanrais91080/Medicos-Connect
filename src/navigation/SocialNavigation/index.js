import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import {
  SocialPost,
  SocialHome,
  SocialSearch,
  SocialProfile,
  SocialSavedPost,
  SocialBlockAndUnblock,
  SocialFollower,
  SocialSetting1st,
  SocialSetting2nd,
  SocialDisclaimer,
  SocialPostEdit,
  SinglePostScreen,
  SocialViewUrl,
  PostFilterScreen,
  CameraScreen,
  StoryFilter,
  SocialExplore,
  SocialSplash,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';
import styles from '../MainNavigation/style';
import SocialPostSecond from '../../screens/AppsView/SocialApp/SocialPostSecond';
import {FilterImage} from '../../components';
import SocialGif from '../../screens/AppsView/SocialApp/SocialGif';

const Stack = createStackNavigator();

function SocialRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.SOCIALGIF}>
      <Stack.Screen
        name={route.FILTER}
        component={FilterImage}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.STORYFILTER}
        component={StoryFilter}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.POSTFILTER}
        component={PostFilterScreen}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.SOCIALDISCLAIMER}
        component={SocialDisclaimer}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />

      <Stack.Screen
        name={route.SOCIALGIF}
        component={SocialGif}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={route.SOCIALHOME}
        component={SocialHome}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={
          {headerShown: false}
          // headerTitle: 'Social',
          // headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          // headerTitleStyle: styles.headerTextStyle,
          // headerStyle: styles.headerStyle,
        }
      />
      <Stack.Screen
        name={route.SOCIALPOSTEDIT}
        component={SocialPostEdit}
        options={({route, navigation}) => ({
          headerTitle: 'Edit Post',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
        })}
      />

      <Stack.Screen
        name={route.SOCIALSEARCH}
        component={SocialSearch}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name={route.SOCIALEXPLORE}
        component={SocialExplore}
        options={{
          headerTitle: 'Search',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_BLACK,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALPOST}
        component={SocialPost}
        options={({route, navigation}) => ({
          headerTitle: route.params.createStory ? 'Create Story' : 'New Post',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        })}
      />
      <Stack.Screen
        name={route.SOCIALPOST1}
        component={SocialPostSecond}
        options={({route, navigation}) => ({
          headerTitle: route.params.createStory ? 'Create Story' : 'New Post',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        })}
      />
      <Stack.Screen
        name={route.SOCIALPROFILE}
        component={SocialProfile}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALSINGLEPOST}
        component={SinglePostScreen}
        options={{
          headerTitle: 'Post',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALFOLLOWER}
        component={SocialFollower}
        options={{
          headerTitle: 'Followers',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALSAVEDPOST}
        component={SocialSavedPost}
        options={{
          headerTitle: 'Saved Posts',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALBLOCK}
        component={SocialBlockAndUnblock}
        options={{
          headerTitle: 'Blocked Users',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      {/* New Routes Addition */}
      <Stack.Screen
        name={route.SOCIALSETTINGS1st}
        component={SocialSetting1st}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
        }}
      />
      <Stack.Screen
        name={route.SOCIALSETTINGS2nd}
        component={SocialSetting2nd}
        options={{
          headerTitle: 'Social',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.classifiedHeaderTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
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
    </Stack.Navigator>
  );
}

export default SocialRoutes;
