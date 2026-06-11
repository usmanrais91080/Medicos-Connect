import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View} from 'react-native';

import {route, screen} from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style';
import {EducationTeacherMyClasses} from '../../../screens';
import themeStyle from '../../../assets/styles/theme.style';
import {createStackNavigator} from '@react-navigation/stack';
import EducationStudentSeekAClass from '../../../screens/AppsView/EducationApp/EducationStudentSeekAClass';
import EducationQnaDiscussion from '../../../screens/AppsView/EducationApp/EducationQnaDiscussion';
const Tab = createMaterialTopTabNavigator();

function EducationTeacherTopMainNavigationRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          let tabName;
          if (route.name === 'EducationTeacherClasses') {
            tabName = screen.EDUCATIONCLASSES;
          } else if (route.name === 'EducationStudentCME') {
            tabName = 'Q n A';
          }
          return (
            <Text
              style={{
                fontSize: focused ? 13 : 14,
                color: themeStyle.COLOR_WHITE,
                fontFamily: focused ? THEME.FONT_MEDIUM : THEME.FONT_REGULAR,
              }}>
              {tabName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        swipeEnabled: false,
        style: {
          borderRadius: 20,
        },
        activeTintColor: '#38474F',
        inactiveTintColor: THEME.PRIMARY_TINT_COLOR,
        indicatorContainerStyle: {
          backgroundColor: THEME.COLOR_EDUCATION,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        indicatorStyle: {
          backgroundColor: THEME.EDUCATION_BROWN,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          height: 5,
          width: '40%',
          left: '5%',
        },
      }}>
      <Tab.Screen
        name={route.EDUCATIONTEACHERCLASSES}
        component={EducationTeacherMyClasses}
      />
      <Tab.Screen name={route.EDUCATIONSTUDENTCME} component={QnaStack} />
    </Tab.Navigator>
  );
}
export default EducationTeacherTopMainNavigationRoutes;

const Stack = createStackNavigator();

function QnaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.EDUCATIONCREATEQNA}
        component={EducationStudentSeekAClass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.EDUCATIONQNADISCUSSION}
        component={EducationQnaDiscussion}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
