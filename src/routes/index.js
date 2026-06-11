import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import themeStyle from '../assets/styles/theme.style';
import {FilterImage, HeaderLeft} from '../components';
import {route} from '../lib/utils/constants';
import MainRoutes from '../navigation/MainNavigation';
import {
  AppIntro,
  AuthLoading,
  CameraScreen,
  CareerJobDetail,
  CareerLocumsDetail,
  CareerSearch,
  Chat,
  ClassifiedPostAd,
  ClassifiedPostDetail,
  ClassifiedProductCategory,
  ClassifiedSearch,
  ConnectAdvanceFilter,
  EducationStudentPostClass,
  EducationStudentWorkshopDetails,
  EducationStudentYourClassDetail,
  EducationTakeClass,
  EducationTeacherEditClassDetail,
  EducationTeacherMakeClass,
  EducationTeacherPostClass,
  EducationTeacherYourClassDetail,
  ForgotPassword,
  GalleryPicker,
  GenerateQR,
  GenerateWalletQR,
  Login,
  LoginOrSignup,
  MentalDiaryCamera,
  MentalDiaryGallery,
  MentalExercise,
  MentalExerciseDayChallengeStart,
  MentalExerciseDays,
  MentalExerciseDaysChallenge,
  MentalExerciseTimerReset,
  MentalHealthExerciseDaysSkip,
  PhoneNumber,
  PrivacyPolicy,
  ScanQrCode,
  ScanWalletQr,
  SelectGender,
  Signup,
  SinglePostScreen,
  SocialPostPicker,
  TermsConditions,
  UploadLicense,
  VerifyPhone,
  WelcomeScreen,
  InviteFriend,
  MentalSelfLove,
  MentalDays,
  SecuritySettings,
  WalletPinReset,
  GeneralProfile,
  MentalViewUrl,
  AppPrivacyConsent,
  AccountSettings1st,
  FAQS,
  SocialBlockAndUnblock,
  SocialSavedPost,
  SocialSearch,
  SocialPostEdit,
  EducationStudentMyClasses,
} from '../screens';
import SocialViewUrl from '../screens/AppsView/SocialApp/SocialViewUrl';
import styles from './style';
import CreatePoll from '../screens/AppsView/SocialApp/CreatePoll';
import SocialExplore from '../screens/AppsView/SocialApp/SocialExplore';
import SocialProfile from '../screens/AppsView/SocialApp/SocialProfile';
import SocialFollowers from '../screens/AppsView/SocialApp/SocialFollower';
import SocialPostSecond from '../screens/AppsView/SocialApp/SocialPostSecond';
import SocialHome from '../screens/AppsView/SocialApp/SocialHome';
import StoryFilterScreen from '../screens/AppsView/SocialApp/StoryFilterScreen';
import MentalGoalsHome from '../screens/AppsView/MentalHealthApp/MentalGoals/MentalGoalsHome';
import MentalCreateGoal from '../screens/AppsView/MentalHealthApp/MentalGoals/MentalCreateGoal';
import MentalMoodTracker from '../screens/AppsView/MentalHealthApp/MoodTracker';
import MentalMyProgress from '../screens/AppsView/MentalHealthApp/MentalMyProgress';
import MentalBreatheHome from '../screens/AppsView/MentalHealthApp/MentalBreathe/MentalBreatheHome';
import MentalEqualBreathing from '../screens/AppsView/MentalHealthApp/MentalBreathe/MentalEqualBreathing';
import MentalBoxBreathing from '../screens/AppsView/MentalHealthApp/MentalBreathe/MentalBoxBreathing';
import Mental478Breathing from '../screens/AppsView/MentalHealthApp/MentalBreathe/Mental478breathing';
import EducationTeacherStats from '../screens/AppsView/EducationApp/EducationTeacherStats';
import EducationTeacherReviews from '../screens/AppsView/EducationApp/EducationTeacherReviews';
import EducationTeacherReadReviews from '../screens/AppsView/EducationApp/EducationTeacherReadReviews';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName={route.AUTH_LOADING}
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen
        name={route.TERMANDCONDITIONS}
        component={TermsConditions}
        options={({navigation, route}) => ({
          headerTitle: 'Terms & Conditions',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => (
            <HeaderLeft
              navigation={navigation}
              color={themeStyle.COLOR_BLACK}
            />
          ),
        })}
      />
      <Stack.Screen
        name={route.PRIVACYPOLICY}
        component={PrivacyPolicy}
        options={({navigation, route}) => ({
          headerTitle: 'Privacy Policy',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => (
            <HeaderLeft
              navigation={navigation}
              color={themeStyle.COLOR_BLACK}
            />
          ),
        })}
      />
      <Stack.Screen
        name={route.APPPRIVACYCONSENT}
        component={AppPrivacyConsent}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={route.AUTH_LOADING}
        component={AuthLoading}
        options={{
          headerShown: false,
        }}
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
        name={route.LOGIN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.LOGINORSIGNUP}
        component={LoginOrSignup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={route.SIGNUP}
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.MENTALSELFLOVE}
        component={MentalSelfLove}
        options={({navigation}) => ({
          headerTitle: 'Self Help Journal',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      {/* <Stack.Screen
        name={route.MENTALDAYS}
        component={MentalDays}
        options={({ navigation }) => ({
          headerTitle: 'Self Love',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      /> */}
      <Stack.Screen
        name={route.FORGOTPASSWORD}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.GENERATEQR}
        component={GenerateQR}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name={route.ACCOUNTSETTINGS}
        component={AccountSettings1st}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={route.FAQS}
        component={FAQS}
        options={({navigation, route}) => ({
          headerShown: false,
          headerTitle: 'FAQS',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle1,
          headerTitleStyle: styles.headerTextStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
        })}
      />
      <Stack.Screen
        name={route.GENERATEWALLETQR}
        component={GenerateWalletQR}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
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
        name={route.SOCIALPOSTPICKER}
        component={SocialPostPicker}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.SOCIALCAMERA}
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.CREATEPOLL}
        component={CreatePoll}
        options={({route, navigation}) => ({
          headerTitle: 'Poll',
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
        name={route.STORYFILTER}
        component={StoryFilterScreen}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
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
        name={route.GALLERYPICKER}
        component={GalleryPicker}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.SELECTGENDER}
        component={SelectGender}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.SOCIALFOLLOWER}
        component={SocialFollowers}
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
        name={route.SPLASH}
        component={Splash}
        options={{
          headerTitle: 'Splash',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: [
            styles.splashScreenTitle,
            {color: themeStyle.COLOR_WHITE},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_RED},
          ],
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
        name={route.PHONENUMBER}
        component={PhoneNumber}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={route.VERIFYPHONE}
        component={VerifyPhone}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={route.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={route.APPINTRO}
        component={AppIntro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.GENERALPROFILE}
        component={GeneralProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.MAIN}
        component={MainRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.EDUCATIONTAKECLASS}
        component={EducationTakeClass}
        options={
          {headerShown: false}
          // headerTitle: 'Social',
          // headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          // headerTitleStyle: styles.headerTextStyle,
          // headerStyle: styles.headerStyle,
        }
      />
      <Stack.Screen
        name={route.CHATSCREEN}
        component={Chat}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleAlign: 'left',
        })}
      />

      <Stack.Screen
        name={route.CAREERSEARCH}
        component={CareerSearch}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      />
      {/* <Stack.Screen
        name={route.CAREERJOBDETAIL}
        component={CareerJobDetail}
        options={({ navigation }) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTitle: 'Career',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleCareer,
          headerStyle: styles.headerStyleCareer,
        })}
      /> */}
      <Stack.Screen
        name={route.CAREERLOCUMDETAIL}
        component={CareerLocumsDetail}
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
        name={route.EDUCATIONSTUDENTWORKSHOPDETAIL}
        component={EducationStudentWorkshopDetails}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTPOSTCLASS}
        component={EducationStudentPostClass}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERPOSTCLASS}
        component={EducationTeacherPostClass}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERSTATS}
        component={EducationTeacherStats}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERREVIEWS}
        component={EducationTeacherReviews}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERREADREVIEWS}
        component={EducationTeacherReadReviews}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: 'Education',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDPRODUCTCATEGORY}
        component={ClassifiedProductCategory}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: 'Post Classified',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.postClassifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDPOSTAD}
        component={ClassifiedPostAd}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: 'Post Classified',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.postClassifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDSEARCH}
        component={ClassifiedSearch}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitleAlign: 'left',
          headerStyle: styles.postClassifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CONNECTADVANCEFILTER}
        component={ConnectAdvanceFilter}
        options={({navigation}) => ({
          headerStyle: styles.headerStyle1,
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONSTUDENTYOURCLASSEDETAIL}
        component={EducationStudentYourClassDetail}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERYOURCLASSEDETAIL}
        component={EducationTeacherYourClassDetail}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.SCANQRCODE}
        component={ScanQrCode}
        options={{
          headerTitle: '',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
          headerStyle: styles.headerStyle,
        }}
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
        name={route.SOCIALPOSTEDIT}
        component={SocialPostEdit}
        options={({route, navigation}) => ({
          headerTitle: 'Edit Post',
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
        name={route.SCANWALLETQR}
        component={ScanWalletQr}
        options={{
          headerTitle: '',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHERMAKECLASS}
        component={EducationTeacherMakeClass}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.EDUCATIONTEACHEREDITCLASSDETAIL}
        component={EducationTeacherEditClassDetail}
        options={({navigation}) => ({
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerStyle: styles.educationHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDPRODUCTDETAIL}
        component={ClassifiedPostDetail}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.postClassifiedHeaderTextStyle,
          headerStyle: styles.postClassifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.SOCIALSINGLEPOST}
        component={SinglePostScreen}
        options={{
          headerTitle: 'Post',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.headerTextStyle,
            {color: themeStyle.COLOR_BLACK},
          ],
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.YELLOW},
          ],
        }}
      />
      <Stack.Screen
        name={route.MENTALDIARYCAMERA}
        component={MentalDiaryCamera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.MENTALDIARYGALLERY}
        component={MentalDiaryGallery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={route.MENTALEXERCISE}
        component={MentalExercise}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          title: 'Workout',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
      />
      <Stack.Screen
        name={route.MENTALEXERCISEDAYS}
        options={({navigation}) => ({
          title: 'Workout',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalExerciseDays}
      />
      <Stack.Screen
        name={route.MENTALEXERCISEDAYSCHALLENGE}
        options={({navigation}) => ({
          title: 'Workout',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalExerciseDaysChallenge}
      />
      <Stack.Screen
        name={route.MENTALEXERCISEDAYSSKIP}
        options={({navigation}) => ({
          title: 'Workout',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalHealthExerciseDaysSkip}
      />
      <Stack.Screen
        name={route.WALLETPINRESET}
        component={WalletPinReset}
        options={{
          headerShown: false,
          headerTitle: 'Wallet Pin Reset',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyle,
        }}
      />
      <Stack.Screen
        name={route.SECURITYSETTINGS}
        component={SecuritySettings}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.MENTALEXERCISEDAYCHALLENGESTART}
        options={({navigation}) => ({
          title: 'Exercise',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalExerciseDayChallengeStart}
      />
      <Stack.Screen
        name={route.MENTALEXERCISETIMERRESET}
        options={({navigation}) => ({
          title: 'Workout',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalExerciseTimerReset}
      />
      <Stack.Screen
        name={route.MENTALGOALSHOME}
        options={({navigation}) => ({
          title: 'Goals',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalGoalsHome}
      />
      <Stack.Screen
        name={route.MENTALMOODTRACKER}
        options={({navigation}) => ({
          title: 'Mood Tracker',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalMoodTracker}
      />
      <Stack.Screen
        name={route.MENTALCREATEGOAL}
        options={({navigation}) => ({
          title: 'Goals',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalCreateGoal}
      />
      <Stack.Screen
        name={route.MENTALMYPROGRESS}
        options={({navigation}) => ({
          title: 'My Progress',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalMyProgress}
      />
      <Stack.Screen
        name={route.MENTALBREATHEHOME}
        options={({navigation}) => ({
          title: 'Breathe',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalBreatheHome}
      />
      <Stack.Screen
        name={route.MENTALEQUALBREATHING}
        options={({navigation}) => ({
          title: 'Breathe',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalEqualBreathing}
      />
      <Stack.Screen
        name={route.MENTALBOXBREATHING}
        options={({navigation}) => ({
          title: 'Breathe',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={MentalBoxBreathing}
      />
      <Stack.Screen
        name={route.MENTAL478BREATHING}
        options={({navigation}) => ({
          title: 'Breathe',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.headerTextStyleMental,
          headerStyle: styles.headerStyleMental,
        })}
        component={Mental478Breathing}
      />
      <Stack.Screen
        name={route.INVITEFRIEND}
        component={InviteFriend}
        options={{
          headerTitle: 'Invite a Friend',
          headerTitleAlign: 'left',
          headerStyle: styles.headerStyle,
          headerTitleStyle: [
            styles.headerTitleStyle,
            {
              color: themeStyle.COLOR_BLACK,
              fontSize: themeStyle.FONT_SIZE_2XLARGE,
            },
          ],
        }}
      />
      <Stack.Screen
        name={route.MENTALVIEWURL}
        component={MentalViewUrl}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
