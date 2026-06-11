import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';

import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style';
import {
  EducationStudentClasses,
  EducationStudentConference,
  EducationStudentSeekAClass,
} from '../../../screens';
import {createStackNavigator} from '@react-navigation/stack';
import EducationQnaDiscussion from '../../../screens/AppsView/EducationApp/EducationQnaDiscussion';
const Tab = createMaterialTopTabNavigator();

function EducationStudentTopMainNavigationRoutes({setFocusedClass}) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      screenListeners={({navigation, route}) => ({
        focus: e => {
          setFocusedClass(route.name);
        },
      })}
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color = 'white'}) => {
          let tabName;
          if (route.name === 'EducationStudentClasses') {
            tabName = 'Classes';
          } else if (route.name === 'EducationStudentCME') {
            tabName = 'Q n A';
          } else if (route.name === 'EducationStudentConferences') {
            tabName = 'CMEs';
          }
          return (
            <Text
              style={{
                fontSize: 12.25,
                color: 'white',
                fontFamily: focused ? THEME.FONT_MEDIUM : THEME.FONT_REGULAR,
                width: SCREEN_WIDTH * 0.24,
                textAlign: 'center',
              }}>
              {tabName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        style: {
          borderRadius: 20,
        },
        swipeEnabled: false,
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
          width: '25%',
          left: '4.5%',
        },
      }}>
      <Tab.Screen
        name={route.EDUCATIONSTUDENTCLASSES}
        component={EducationStudentClasses}
      />
      <Tab.Screen name={route.EDUCATIONSTUDENTCME} component={QnaStack} />
      <Tab.Screen
        name={route.EDUCATIONSTUDENTCONFERENCES}
        component={EducationStudentConference}
      />
    </Tab.Navigator>
  );
}
export default EducationStudentTopMainNavigationRoutes;

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
