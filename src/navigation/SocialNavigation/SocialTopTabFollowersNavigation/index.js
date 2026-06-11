import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';

import {route, screen} from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style';
import {
  ConsoleServer,
  SocialExplore,
  SocialFilter,
  SocialFollowing,
  SocialRequests,
} from '../../../screens';
import themeStyle from '../../../assets/styles/theme.style';
const Tab = createMaterialTopTabNavigator();

function SocialTopTabFollowersNavigationRoutes({setHeaderTitle}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          let tabName;
          if (route.name === 'SocialRequests') {
            tabName = 'Followers';
          } else if (route.name === 'SocialFollowing') {
            tabName = screen.SOCIALFOLLOWING;
          }
          return (
            <Text
              style={{
                fontSize: focused ? 13 : 14,
                color: color,
                fontFamily: THEME.FONT_REGULAR,
              }}>
              {tabName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        swipeEnabled: true,
        activeTintColor: themeStyle.COLOR_BLACK,
        inactiveTintColor: themeStyle.COLOR_BLACK,
        indicatorContainerStyle: {
          //backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
          backgroundColor: themeStyle.YELLOW,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        indicatorStyle: {
          backgroundColor: '#000',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          height: 5,
          width: '40%',
          left: '5%',
        },
      }}>
      <Tab.Screen name={route.SOCIALREQUEST}>
        {props => <SocialRequests {...props} setHeaderTitle={setHeaderTitle} />}
      </Tab.Screen>
      <Tab.Screen name={route.SOCIALFOLLOWING}>
        {props => (
          <SocialFollowing {...props} setHeaderTitle={setHeaderTitle} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default SocialTopTabFollowersNavigationRoutes;
