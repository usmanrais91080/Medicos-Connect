import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import {
  EducationTeacherMakeClass,
  EducationStudentClassesAndRequests,
  EducationWelcome,
  EducationDisclaimer,
  EducationStudent,
  EducationTeacher,
  EducationStudentClassDetails,
  EducationStudentAppliedClasses,
  EducationStudentAppliedClassDetail,
  EducationTeacherClassesAndRequests,
  EducationSplash,
  EducationStudentMyClasses,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';

import styles from '../MainNavigation/style';
import {HeaderLeft} from '../../components';
import EducationGif from '../../screens/AppsView/EducationApp/EducationGif';
import EducationHome from '../../screens/AppsView/EducationApp/EducationHome';

const Stack = createStackNavigator();

function EducationRoutes(props) {
  return (
    <Stack.Navigator
      initialRouteName={route.EDUCATIONHOME}
    >
      <Stack.Screen
        name={route.EDUCATIONGIF}
        component={EducationGif}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHER}
        component={EducationTeacher}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
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
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONHOME}
        component={EducationHome}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
          headerTitle: 'Education',
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTCLASSDETAIL}
        component={EducationStudentClassDetails}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTMYCLASSES}
        component={EducationStudentMyClasses}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTAPPLIEDCLASSES}
        component={EducationStudentAppliedClasses}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTCLASSESANDREQUESTS}
        component={EducationStudentClassesAndRequests}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERCLASSESANDREQUESTS}
        component={EducationTeacherClassesAndRequests}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTAPPLIEDCLASSESDETAIL}
        component={EducationStudentAppliedClassDetail}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export default EducationRoutes;
