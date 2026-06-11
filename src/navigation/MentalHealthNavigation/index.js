import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {route} from '../../lib/utils/constants';
import {
  ClassifiedWelcome,
  ClassifiedDisclaimer,
  SocialViewUrl,
  AllGames,
  ClassifiedHome,
  ClassifiedMyAds,
  ClassifiedPostDetail,
  ClassifiedSettings,
  ClassifiedWishList,
  GameDetail,
  GamesApp,
  SelectLocation,
  MentalHome,
  MentalMood,
  MentalWelcome,
  MentalSettings,
  MentalPostCreate,
  MentalPostDetail,
  MentalProfile,
  MentalDiary,
  MentalDiaryCreate,
  MentalPostSave,
  MentalExerciseStats,
  MentalSelfLove,
  MentalDays,
  MentalSplash,
  MentalHealthToDo,
  MentalDailyNotify,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';

import styles from '../MainNavigation/style';
import {HeaderLeft} from '../../components';
import MentalGif from '../../screens/AppsView/MentalHealthApp/MentalGif';
import MentalDiaryEntry from '../../screens/AppsView/MentalHealthApp/DiaryEntry';

const Stack = createStackNavigator();

function MentalRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.MENTALHOME}>
      <Stack.Screen
        name={route.MENTALHOME}
        component={MentalHome}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Mental Health',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALGIF}
        component={MentalGif}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={route.MENTALWELCOME}
        component={MentalWelcome}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Mee',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALPOSTCREATE}
        component={MentalPostCreate}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Create Post',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALPOSTDETAIL}
        component={MentalPostDetail}
        options={({navigation}) => ({
          headerTitle: 'Post Detail',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALPOSTSAVE}
        component={MentalPostSave}
        options={({navigation}) => ({
          headerTitle: 'Save Posts',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALMOOD}
        component={MentalMood}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      {/* <Stack.Screen
        name={route.MENTALEXERCISESTATS}
        component={MentalExerciseStats}
        options={({navigation}) => ({
          headerTitle: 'Statistics',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      /> */}
      <Stack.Screen
        name={route.MENTALPROFILE}
        component={MentalProfile}
        options={({navigation}) => ({
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALDIARY}
        component={MentalDiary}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Diary',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALDIARYENTRY}
        component={MentalDiaryEntry}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Entry',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALDIARYCREATE}
        component={MentalDiaryCreate}
        options={({navigation}) => ({
          headerTitle: 'Create',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      {/* <Stack.Screen
        name={route.MENTALSELFLOVE}
        component={MentalSelfLove}
        options={({navigation}) => ({
          headerTitle: 'Self Love',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      /> */}
      <Stack.Screen
        name={route.MENTALDAYS}
        component={MentalDays}
        options={({navigation}) => ({
          headerTitle: 'Self Love',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALTODO}
        component={MentalHealthToDo}
        options={({navigation}) => ({
          headerTitle: 'Mental Health',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />

      <Stack.Screen
        name={route.MENTALDAILYFILTER}
        component={MentalDailyNotify}
        options={({navigation}) => ({
          headerTitle: 'Mental Health',
          headerTitleAlign: 'left',
          // headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />

      <Stack.Screen
        name={route.SELECTLOCATION}
        component={SelectLocation}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />

      {/* <Stack.Screen
        name={route.MENTALSETTINGS}
        component={MentalSettings}
        options={{
          headerTitle: 'Mental settings',
          headerStyle: styles.headerStyleMental,
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      /> */}
      <Stack.Screen
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MentalRoutes;
