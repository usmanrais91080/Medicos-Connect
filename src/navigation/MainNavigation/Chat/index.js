import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../../lib/utils/constants';
import {ChatList} from '../../../screens';

import styles from '../style';
import themeStyle from '../../../assets/styles/theme.style';

const Stack = createStackNavigator();

function ChatRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.CHATLIST}>
      <Stack.Screen
        name={route.CHATLIST}
        component={ChatList}
        options={{
          headerTitle: 'Daak',
          headerTitleAlign: 'left',
          headerStyle: {...styles.headerStyle1},
          headerTintColor: themeStyle.COLOR_BLACK,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatRoutes;
