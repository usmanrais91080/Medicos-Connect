import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';

import {route} from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style';
import {BookKeepingHome, Wallet} from '../../../screens';
import themeStyle from '../../../assets/styles/theme.style';
const Tab = createMaterialTopTabNavigator();

function PagerTopTabFollowersNavigationRoutes({activeBankScreen}) {
  return (
    <Tab.Navigator
      initialRouteName={activeBankScreen ? route.WALLET : route.BOOKKEEPINGHOME}
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          let tabName;
          if (route.name === 'BookKeepingHome') {
            tabName = 'BookKeeping';
          } else if (route.name === 'Wallet') {
            tabName = 'Vault';
          }
          return (
            <Text
              style={{
                fontSize: focused ? 13 : 14,
                color: color,
                fontFamily: THEME.FONT_REGULAR,
              }}
            >
              {tabName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        swipeEnabled: false,
        activeTintColor: themeStyle.BOOK_KEEPING_PINK,
        inactiveTintColor: themeStyle.COLOR_WHITE,

        indicatorContainerStyle: {
          //backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
          backgroundColor: themeStyle.COLOR_BOOK_KEEPING,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        indicatorStyle: {
          backgroundColor: themeStyle.BOOK_KEEPING_PINK,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          height: 5,
          width: '40%',
          left: '5%',
        },
      }}
    >
      <Tab.Screen name={route.BOOKKEEPINGHOME} component={BookKeepingHome} />
      <Tab.Screen name={route.WALLET} component={Wallet} />
    </Tab.Navigator>
  );
}
export default PagerTopTabFollowersNavigationRoutes;
