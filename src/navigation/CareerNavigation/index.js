import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import {
  SocialPost,
  CareerHome,
  UploadCNIC,
  TierSystem,
  UploadLicense,
  AdvanceVerificationTier,
  SuccessfullSubmission,
  UploadCNICBack,
  SocialViewUrl,
  CareerWelcome,
  CareerProfile1st,
  CareerProfile2nd,
  CareerJobApplied,
  CareerUploadYourPhoto,
  CareerResearchProfile,
  CareerProfile,
  CareerJobCreate,
  CareerJobFav,
  CareerJobPosted,
  CareerViewApplicant,
  CareerEditProfile,
  CareerEditProfile1st,
  CareerSplash,
  CareerJobDetail,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';
import styles from '../MainNavigation/style';
import {HeaderLeft} from '../../components';
import CareerGif from '../../screens/AppsView/CareerApp/CareerGif';
import CareerChooseOptions from '../../screens/AppsView/CareerApp/CareerChooseOptions';
import CareerCreateProfile from '../../screens/AppsView/CareerApp/CareerCreateProfile';

const Stack = createStackNavigator();

function CareerRoutes(props) {
  return (
    <Stack.Navigator initialRouteName={props.route?.params?.screen ? props.route?.params?.screen: route.CAREERHOME}>
      <Stack.Screen
        name={route.CAREERTIER}
        component={TierSystem}
        options={{
          headerTitle: 'Tier System',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        }}
      />
      <Stack.Screen
        name={route.UPLOADLICENSE}
        component={UploadLicense}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.UPLOADCNIC}
        component={UploadCNIC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.UPLOADCNICBACK}
        component={UploadCNICBack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.CAREERJOBDETAIL}
        component={CareerJobDetail}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.ADVANCEVERIFICATION}
        component={AdvanceVerificationTier}
        options={{
          headerTitle: 'Advance Identification',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
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
        name={route.CAREERCHOOSEOPTIONS}
        component={CareerChooseOptions}
        options={({navigation, route}) => ({
          headerLeft: () => null,
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERCREATEPROFILE}
        component={CareerCreateProfile}
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
        name={route.CAREERUPLOADYOURPHOTO}
        component={CareerUploadYourPhoto}
        options={{
          headerShown: false,
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
        name={route.CAREERJOBAPPLIED}
        component={CareerJobApplied}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Jobs applied',
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
        name={route.CAREEREDITPROFILE1ST}
        component={CareerEditProfile1st}
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
        name={route.CAREEREDITPROFILE}
        component={CareerEditProfile}
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
        name={route.CAREERRESEARCHPROFILE}
        component={CareerResearchProfile}
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
        name={route.CAREERPROFILE}
        component={CareerProfile}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERJOBCREATE}
        component={CareerJobCreate}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Create Job',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERJOBFAV}
        component={CareerJobFav}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Favorite Jobs',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERJOBPOSTED}
        component={CareerJobPosted}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Posted Jobs',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERVIEWAPPLICANT}
        component={CareerViewApplicant}
        options={({navigation, route}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'View Applicants',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      <Stack.Screen
        name={route.CAREERHOME}
        component={CareerHome}
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
        name={route.CAREERGIF}
        component={CareerGif}
        options={({navigation, route}) => ({
          headerShown: false,
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

export default CareerRoutes;
