import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {checkVersion} from 'react-native-check-version';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import Geocoder from 'react-native-geocoder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Modal, {ReactNativeModal} from 'react-native-modal';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../assets/styles/theme.style';
import AppText from '../../assets/svg/apptext.svg';
import {
  Container,
  CustomDropDownModal,
  DeleteModal,
  FreeTrailModal,
  HomeScreenAppCard,
  Icon,
  Loader,
  MoodTrackerModal,
  NotVerifyUserModal,
  ReportModal,
  SetupYourProfile,
  Stories,
  TierModal,
  VerificationInProgress,
} from '../../components';
import Ampules3 from '../../assets/svg/ampoules-3.svg';
import Ampules4 from '../../assets/svg/ampoules-4.svg';
import Ampules5 from '../../assets/svg/ampoules-5.svg';
import Unfollow from '../../assets/svg/unfollow.svg';
import Cont from '../../json/continents/countries.json';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {VerticalSpacer} from '../../lib/utils/global';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../lib/utils/localstorage';
import {authActions} from '../../redux/actions/auth';
import {connectActions} from '../../redux/actions/connect';
import {postActions} from '../../redux/actions/post';
import {bottomTabActions} from '../../redux/actions/bottomTab';
import {searchActions} from '../../redux/actions/search';
import SocialHomeFunction from '../AppsView/SocialApp/SocialHome/social.home.function';
import {
  MentalServices,
  ProfileServices,
  SocialServices,
  WalletServices,
} from '../../services';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from 'react-native';
import SocialHome from '../AppsView/SocialApp/SocialHome';
import {
  AmpuleModal,
  BlockUserConfirmation,
  BottomMenu,
  BuyAmpuleModal,
  HeaderRight,
  HomeButtons,
} from '../AppsView/SocialApp/SocialHome/social.home.component';
import SearchMenu from '../AppsView/SocialApp/SocialMenu';

import AddStory from '../../assets/svg/addStory.svg';
import Block from '../../assets/svg/block-new.svg';
import DropDown from '../../assets/svg/dropDown.svg';
import EditPost from '../../assets/svg/pencil.svg';
import Pin from '../../assets/svg/pin-new.svg';
import PostText from '../../assets/svg/posttext.svg';
import DeletePost from '../../assets/svg/delete1.svg';
import Poll from '../../assets/svg/poll.svg';
import Report from '../../assets/svg/report.svg';
import Save from '../../assets/svg/save-new.svg';
import Share from '../../assets/svg/share-icon.svg';
import UploadPost from '../../assets/svg/upload.svg';
import {socialActions} from '../../redux/actions/social';
import PostModal from '../../components/Modals/PostModal';
import Clipboard from '@react-native-clipboard/clipboard';
import {Avatar} from 'react-native-elements';
import {splashActions} from '../../redux/actions/splash';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_WHITE,
  iconColor: themeStyle.COLOR_WHITE,
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.pinRef = React.createRef();
    this.state = {
      tierModal: false,
      notVerifyUser: false,
      setupProfile: false,
      verificationInProgress: false,
      location: {},
      region: '',
      activeSlide: 0,
      activeSlide1: 0,
      uploading: false,
      pinModal: false,
      pinCode: '',
      alertModal: false,
      msgToDisplay: '',
      msgModal: false,
      opened: false,
      bottomLoading: true,
      topLoading: true,
      topAds: [],
      bottomAds: [],
      privacyConsent: false,
      modalVisible: false,
      // socialHome variables
      refreshing: false,
      giftArray: [
        {
          icon: Ampules3,
          name: '500',
          selected: false,
        },
        {
          icon: Ampules4,
          name: '1000',
          selected: false,
        },
        {
          icon: Ampules5,
          name: '1500',
          selected: false,
        },
      ],
      giftModal: false,
      page: 1,
      offset: 5,
      newData: [],
      stopFetchMore: true,
      endLoading: false,
      visible: false,
      loading: true,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      paused: true,
      tagSearch: '',
      ampules: 0,
      buyAmpuleModal: false,
      userList: [],
      tempUserList: [],
      postList: [...this.props?.postList?.postData],
      stories: [...(this.props?.storiesList || [])],
      postComment: '',
      smallStories: false,
      msgToDisplay: '',
      loadingPost: false,
      usersModal: false,
      blockUser: '',
      blockModal: false,
      sharePostData: null,
      likedUsers: [],
      showLikedUsers: false,
      tempLikedUsers: [],
      searchingData: false,
      reportReason: '',
      reportId: '',
      reportIndex: 0,
      showReportModal: false,
      showReportUserModal: false,
      storyMenu: false,
      postMenu: false,
      postMenu1: false,
      postItem: {},
      postItemData: [
        {
          icon: Save,
          name: 'Save post',
          onPress: () => {
            this.setState({postMenu: false});
            !this.props.user.userData.is_social_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.handleSavePost(this.state.postItem?._id);
          },
        },
        {
          icon: Report,
          name: 'Report',
          onPress: () => {
            this.setState({postMenu: false});
            !this.props.user.userData.is_social_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction()
              : setTimeout(() => {
                  this.setState({
                    showReportModal: true,
                    reportId: this.state.postItem?._id,
                    reportIndex: this.state.postIndex,
                  });
                }, 1000);
          },
        },
        {
          icon: Block,
          name: 'Block User',
          onPress: () => {
            this.setState({postMenu: false});
            !this.props.user.userData.is_social_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction()
              : setTimeout(() => {
                  this.setState({
                    blockUser: this.state.postItem,
                    blockModal: true,
                  });
                }, 1000);
          },
        },
      ],
      postIndex: -1,
      postModal: false,
      postModalType: '',
      modalTitle: '',
      modalDescription: '',
      modalImage: '',
      selectedUserName: '',
      // locationModal: false,
      newUser: false,
      newUserMessage: '',
      screenRoute: '',
      newMsgModal: false,
      newMsg: '',
      wallet_id: '',
      buyAmpules: false,
      showRemoveUserModal: false,
    };
  }

  componentDidMount = async () => {
    const {user, postActions, postList, storiesList} = this.props;
    const {token, _id, social_username, social_image, isMoodTracker} =
      user.userData;

    // Set bottom tab theme
    this.setBottomTabTheme();

    // Set navigation options
    this.setNavigationOptions();

    // Set initial state
    this.setState({
      postList: postList?.postData,
      storiesList: storiesList,
    });
    if (isMoodTracker) {
      this.checkModalVisibility();
    }

    //get splash modules
    this.getSplashModules(token);

    // Fetch initial data
    this.getInitialData();

    // Check for app update
    await this.checkForAppUpdate();

    // Add app state change listener
    AppState.addEventListener('change', this._handleAppStateChange);

    // Fetch user data
    this.fetchUserData(token);

    // Fetch location data
    this.handleLocation();

    // Fetch posts and stories
    postActions.getPosts(token);
    postActions.getStories(_id, social_username, social_image, token);

    // Add keyboard listeners
    this.addKeyboardListeners();

    // Check swipe count
    this.checkSwipeCount();

    // Update FCM
    this.updateFCM();

    // Add focus listeners
    this.addFocusListeners();
  };

  setBottomTabTheme = () => {
    const {bottomTabAction} = this.props;
    bottomTabAction.bottomTabTheme(colorTheme);
  };

  addFocusListeners = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.handleRefreshing();
      this.setBottomTabTheme();
      this.checkSwipeCount();
    });
  };

  getInitialData = () => {
    this.getShareFriends();
    this.handleRefreshing();
  };

  checkForAppUpdate = async () => {
    try {
      let version = await checkVersion();
      if (version?.needsUpdate) this.updateApp(version.url);
    } catch (error) {}
  };

  getSplashModules = token => {
    this.props.splashActions.fetchModulesSplash(token);
  };

  fetchUserData = token => {
    const {connectActions} = this.props;
    connectActions.getConnectInterests(token);
    connectActions.getConnectPersonalJudgments(token);
    connectActions.getConnectProfessions(token);
  };

  setNavigationOptions = () => {
    const {navigation} = this.props;
    navigation.setOptions({
      headerLeft: () => this.headerLeft(),
      headerRight: () => (
        <HeaderRight
          newUser={
            !this.props.user.userData.is_social_profile_created ||
            this.state.unverifiedUser
          }
          showNewUserAlert={() => this.showNewUserAlertFunction()}
          onPressMenu={() => this.setState({visible: true})}
        />
      ),
    });
  };

  addKeyboardListeners = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  showNewUserAlertFunction = () => {
    this.setState({
      alertModal: true,
      msgToDisplay:
        'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.',
    });
  };

  /**
   * Checks if a modal should be displayed to the user based on the last time it was shown.
   * If the last time the modal was shown is more than one day ago or if it has never been shown before,
   * the function sets the `modalVisible` state to `true`.
   */
  checkModalVisibility = async () => {
    try {
      const lastModalTime = await AsyncStorage.getItem('lastModalTime');
      if (!lastModalTime) {
        this.setState({modalVisible: true});
      } else {
        const currentTime = new Date();
        const lastTime = new Date(lastModalTime);
        const differenceInDays = Math.floor(
          (currentTime - lastTime) / (1000 * 3600 * 24),
        );
        if (differenceInDays >= 1) {
          this.setState({modalVisible: true});
        }
      }
    } catch (error) {}
  };

  /**
   * Handles the closing of a modal by setting the 'modalVisible' state to false
   * and saving the current time as the 'lastModalTime' in AsyncStorage.
   *
   * @returns {Promise<void>} A promise that resolves when the modal is closed.
   */
  handleCloseModal = async () => {
    try {
      const lastModalTime = new Date().toString();
      await AsyncStorage.setItem('lastModalTime', lastModalTime);
      this.setState({modalVisible: false});
    } catch (error) {}
  };

  /**
   * Displays an alert to the user informing them that an app update is required.
   * The alert gives the user the option to either quit the app or proceed with the update.
   * @param {string} val - The URL of the app update.
   */
  updateApp = val => {
    // Alert.alert(
    //   'Update Required',
    //   'We are sorry for the inconvenience.\nPlease update the app to the latest version to continue.',
    //   [
    //     {
    //       text: 'Quit',
    //       onPress: () => BackHandler.exitApp(),
    //     },
    //     {
    //       text: 'Update',
    //       onPress: () => {
    //         Linking.openURL(val).then(() => BackHandler.exitApp());
    //       },
    //     },
    //   ],
    // );
  };

  _handleAppStateChange = async nextAppState => {
    if (nextAppState == 'active') {
      let version = await checkVersion();
      if (version?.needsUpdate) this.updateApp(version.url);
    }
  };

  _keyboardDidShow = () => {
    this.setState({opened: true});
  };

  _keyboardDidHide = () => {
    this.setState({opened: false});
  };

  updateFCM = async () => {
    const fcmToken = await messaging().getToken();
    let data = {
      fcm_token: fcmToken,
      device_type: Platform.OS == 'ios' ? 'iOS' : 'Android',
      device_id: DeviceInfo.getDeviceId(),
    };
    ProfileServices.updateFcm(data, this.props.user.userData.token)
      .then(res => {})
      .catch(err => {});
  };

  checkSwipeCount = async () => {
    let previousDate = await getLocalData(LOCAL_STORAGE_KEYS.previousDate);
    if (previousDate) {
      let momentObj = moment(previousDate.toString(), 'DD-MM-YYYY');
      let showDate = moment(momentObj).format('DD-MM-YYYY');
      if (showDate < moment().format('DD-MM-YYYY')) {
        storeLocalData(
          LOCAL_STORAGE_KEYS.previousDate,
          JSON.stringify(moment().format('DD-MM-YYYY')),
        );
        storeLocalData(LOCAL_STORAGE_KEYS.swipeCount, JSON.stringify(0));
      }
    } else {
      storeLocalData(
        LOCAL_STORAGE_KEYS.previousDate,
        JSON.stringify(moment().format('DD-MM-YYYY')),
      );
      storeLocalData(LOCAL_STORAGE_KEYS.swipeCount, JSON.stringify(0));
    }
  };

  handleLocation = () => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            this.findCoordinates();
          } else {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
              if (result == RESULTS.GRANTED) {
                this.findCoordinates();
              } else {
                // this.setState({locationModal: true});
              }
            });
          }
        })
        .catch(error => {
          // console.log(error);
          // this.setState({locationModal: true});
        });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            this.findCoordinates();
          } else {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
              if (result == RESULTS.GRANTED) {
                this.findCoordinates();
              } else {
                this.setState({
                  msgToDisplay:
                    'To proceed forward please enable your GPS service from device settings or app setting',
                  alertModal: true,
                });
              }
            });
          }
        })
        .catch(error => {
          this.setState({
            msgToDisplay:
              'To proceed forward please enable your GPS service from device settings or app setting',
            alertModal: true,
          });
        });
    }
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({location: location});
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        try {
          Geocoder.fallbackToGoogle('AIzaSyAGWemhFK6mZr-3HEff1ATuBhZLn0-z9lo');
          Geocoder.geocodePosition(pos)
            .then(res => {
              let temp = Cont[res[0].countryCode].continent;
              this.setState({
                region: temp,
                address: res[0].formattedAddress,
              });
              this.props.searchActions.regionAdd(temp);
              let locationData = {
                location: res[0].formattedAddress,
                lat: location.latitude,
                long: location.longitude,
              };
              this.props.authActions.updateLocation(
                locationData,
                this.props.user.userData.token,
              );
            })
            .catch(error => null);
        } catch (error) {
          // console.log('res : ', error);
        }
      },
      err => {
        // console.log('err : ', err);

        if (err.PERMISSION_DENIED == 1) {
          this.setState({
            msgToDisplay:
              'To proceed forward please enable your GPS service from device settings or app setting',
            alertModal: true,
          });
        }
      },
      {timeout: 5000000},
    );
  };

  headerLeft = () => {
    return (
      <View style={styles.headerLeft}>
        {this.state.smallStories ? (
          <Text style={styles.socialTitleHeader}>Social</Text>
        ) : (
          <AppText />
        )}
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    return (
      <View>
        <FastImage
          source={{
            uri: item?.logo,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.banner}
          resizeMode="cover"
        />
        {item?.tagline != '' && (
          <Text style={styles.descStyle}>{item?.tagline}</Text>
        )}
      </View>
    );
  };

  get pagination() {
    const {topAds, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={this.props.user.topAds.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  get pagination1() {
    const {bottomAds, activeSlide1} = this.state;
    return (
      <Pagination
        dotsLength={this.props.user.bottomAds.length}
        activeDotIndex={activeSlide1}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  handleClickOnModule = async item => {
    const {userData} = this.props.user;
    if (item.status == 'Activated') {
      switch (item?.module?.name) {
        case 'Book keeping':
          if (!userData.is_pager_profile_created) {
            this.props.navigation.navigate(route.BOOKKEEPING, {
              prev_screen: route.HOME,
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_pager_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.setState({verificationInProgress: true});
          } else {
            this.props.navigation.navigate(item.route);
          }
        case 'Mee':
          if (
            userData.medical_license != '' &&
            !userData.is_mental_health_profile_created
          ) {
            this.setState({
              newUser: true,
              newUserMessage: 'To proceed forward please complete your profile',
              screenRoute: route.MENTALSETTINGS,
            });
          } else if ((await this.checkModuleSplash('Mee')) == false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Mee',
              title:
                'Mental health tools & resources for medicos - safe, reliable, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: () => this.updateModuleSplash('Mee', item.route),
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_mental_health_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.props.navigation.navigate(item.route);
          } else {
            this.props.navigation.navigate(item.route);
          }
          break;
        case 'Career':
          if (
            userData.medical_license != '' &&
            !userData.is_career_profile_created
          ) {
            this.props.navigation.navigate(item.route, {
              screen: route.CAREERCHOOSEOPTIONS,
            });
          } else if ((await this.checkModuleSplash('Career')) === false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Career',
              title:
                'Global jobs and scholarship postings for medicos - simple, worldwide, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: () => this.updateModuleSplash('Career', item.route),
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_career_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.props.navigation.navigate(item.route);
          } else {
            this.props.navigation.navigate(item.route);
          }
          break;

        case 'Social':
          if (
            userData.medical_license != '' &&
            userData.is_social_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.props.navigation.navigate(item.route);
          } else {
            this.props.navigation.navigate(item.route);
          }
          break;

        case 'Connect':
          if (userData.age == null && userData.image == null) {
            this.setState({setupProfile: true});
          } else if (
            !userData.medical_license_is_verified ||
            userData.is_trail
          ) {
            this.setState({
              newMsgModal: true,
              newMsg:
                'To use this feature please wait until your verification is completed',
            });
          } else if (
            userData.medical_license != '' &&
            !userData.is_connect_profile_created
          ) {
            this.props.navigation.navigate(item.route, {
              screen: route.CONNECTPROFILE1ST,
              params: {prev_screen: route.HOME},
            });
          } else if (userData.connect_selfie == null) {
            this.props.navigation.navigate(item.route, {
              screen: route.CONNECTEDITPROFILE4TH,
              params: {update_selfie: true},
            });
          } else if (!userData.connect_selfie_is_verified) {
            this.setState({
              newMsgModal: true,
              newMsg:
                'Your Selfie is not verified yet. Please wait until your verification is completed',
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_connect_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.setState({verificationInProgress: true});
          } else if ((await this.checkModuleSplash('Connect')) === false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Connect',
              title: 'Dating platform for Medicos - safe, easy, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: () =>
                this.updateModuleSplash('Connect', item.route),
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_connect_profile_created &&
            userData.medical_license_is_verified &&
            userData.profession &&
            !userData.profession_matches.length
          ) {
            this.props.navigation.navigate(item.route);
          } else {
            this.props.navigation.navigate(item.route);
          }
          break;

        case 'Market':
          if (
            userData.medical_license != '' &&
            !userData.is_classified_profile_created
          ) {
            this.setState({
              newUser: true,
              newUserMessage: 'To proceed forward please complete your profile',
              screenRoute: route.CLASSIFIEDSETTINGS,
            });
          } else if ((await this.checkModuleSplash('Market')) === false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Market',
              title: 'Buy, sell and trade with medicos - quick, easy, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: () =>
                this.updateModuleSplash('Market', route.CLASSIFIED),
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_classified_profile_created &&
            !userData.medical_license_is_verified
          ) {
            this.props.navigation.navigate(route.CLASSIFIED);
          } else {
            this.props.navigation.navigate(route.CLASSIFIED);
          }
          break;

        case 'Education':
          if (
            userData.medical_license != '' &&
            !userData.is_education_profile_created
          ) {
            this.setState({
              newUser: true,
              newUserMessage: 'To proceed forward please complete your profile',
              screenRoute: route.EDUCATIONSETTINGS,
            });
          } else if ((await this.checkModuleSplash('Education')) === false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Education',
              title:
                'Online learning platform for medicos - free, convenient, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: async () =>
                this.updateModuleSplash('Education', item.route),
            });
          } else if (userData?.education_mode == 'Teacher') {
            this.props.navigation.navigate(route.EDUCATIONTEACHER);
          } else {
            this.props.navigation.navigate(route.EDUCATIONSTUDENT);
          }
          break;

        case 'Wallet':
          if (userData.medical_license != '' && !userData.is_wallet_created) {
            this.props.navigation.navigate(route.WALLETSETING, {
              prev_screen: route.HOME,
            });
          } else if (
            userData.medical_license != '' &&
            userData.is_wallet_created
          ) {
            this.setState({pinModal: true});
          } else {
            this.setState({pinModal: true});
          }
          break;
      }
    } else {
      this.setState({uploading: true});

      ProfileServices.activateUserModule(
        {id: item?._id},
        this.props.user.userData.token,
      )
        .then(async res => {
          if (res.data.code == 200) {
            await this.props.authActions.getUserModules(
              this.props.user.userData.token,
            );
            this.setState({uploading: false});
            if (userData.age == null && userData.image == '') {
              this.setState({setupProfile: true});
            } else if (userData.medical_license == '') {
              this.setState({setupProfile: true});
            } else if (userData.medical_license != '') {
              switch (item?.module?.name) {
                case 'Mee':
                  if (!userData.is_mental_health_profile_created) {
                    this.setState({
                      newUser: true,
                      newUserMessage:
                        'To proceed forward please complete your profile',
                      screenRoute: route.MENTALSETTINGS,
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_mental_health_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
                case 'Wallet':
                  if (
                    userData.medical_license != '' &&
                    !userData.is_wallet_created
                  ) {
                    this.props.navigation.navigate(route.WALLETSETING, {
                      prev_screen: route.HOME,
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_wallet_created
                  ) {
                    this.setState({pinModal: true});
                  } else {
                    this.setState({pinModal: true});
                  }
                  break;
                case 'Social':
                  if (
                    userData.medical_license != '' &&
                    userData.is_social_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
                case 'Career':
                  if (!userData.is_career_profile_created) {
                    this.props.navigation.navigate(item.route, {
                      screen: route.CAREERCHOOSEOPTIONS,
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_career_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
                case 'Connect':
                  if (userData.age == null && userData.image == null) {
                    this.setState({setupProfile: true});
                  } else if (!userData.medical_license_is_verified) {
                    this.setState({
                      newMsgModal: true,
                      newMsg:
                        'To use this feature please wait until your verification is completed',
                    });
                  } else if (
                    userData.medical_license != '' &&
                    !userData.is_connect_profile_created
                  ) {
                    this.props.navigation.navigate(item.route, {
                      screen: route.CONNECTPROFILE1ST,
                      params: {prev_screen: route.HOME},
                    });
                  } else if (!userData.connect_selfie_is_verified) {
                    this.setState({
                      newMsgModal: true,
                      newMsg:
                        'Your Selfie is not verified yet. Please wait until your verification is completed',
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_connect_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.setState({verificationInProgress: true});
                  } else if (
                    (await this.checkModuleSplash('Connect')) === false
                  ) {
                    this.props.navigation.navigate(route.SPLASH, {
                      headerTitle: 'Connect',
                      title:
                        'Dating platform for Medicos - safe, easy, perfect!',
                      videoDescription:
                        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                      link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
                      onStartPress: async () =>
                        this.updateModuleSplash('Connect', item.route),
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_connect_profile_created &&
                    userData.medical_license_is_verified &&
                    userData.profession &&
                    !userData.profession_matches.length
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
                case 'Education':
                  if (!userData.is_education_profile_created) {
                    this.setState({
                      newUser: true,
                      newUserMessage:
                        'To proceed forward please complete your profile',
                      screenRoute: route.EDUCATIONSETTINGS,
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_education_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
                case 'Classified':
                  if (!userData.is_classified_profile_created) {
                    this.setState({
                      newUser: true,
                      newUserMessage:
                        'To proceed forward please complete your profile',
                      screenRoute: route.CLASSIFIEDSETTINGS,
                    });
                  } else if (
                    userData.medical_license != '' &&
                    userData.is_classified_profile_created &&
                    !userData.medical_license_is_verified
                  ) {
                    this.props.navigation.navigate(item.route);
                  } else {
                    this.props.navigation.navigate(item.route);
                  }
                  break;
              }
            }
          } else {
            // console.log('Error Home Screen>>>>>', res.data.message);
          }
        })
        .catch(err => {
          this.setState({uploading: false});
        });
    }
  };

  _renderAppsItem = ({item, index}) => {
    return (
      <HomeScreenAppCard
        item={item}
        userData={this.props.user.userData}
        onPress={() => {
          this.handleClickOnModule(item);
        }}
      />
    );
  };

  _checkCode = code => {
    let data = {
      pincode: code,
    };
    const {buyAmpules} = this.state;
    WalletServices.checkPin(data, this.props.user.userData.token)
      .then(async val => {
        if (val.data.message == 'Wallet pin is not correct') {
          this.pinRef?.current
            ?.shake()
            .then(() => this.setState({pinCode: ''}));
        }
        if (val.data.message == 'Wallet pin verified successfully') {
          this.setState({pinCode: '', pinModal: false});

          if ((await this.checkModuleSplash('Wallet')) === false) {
            this.props.navigation.navigate(route.SPLASH, {
              headerTitle: 'Wallet',
              title:
                'Bookkeeping for medicos - personalized, efficient, perfect!',
              videoDescription:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
              onStartPress: async () => this.updateModuleSplash('Wallet'),
            });
          } else {
            this.props.navigation.navigate(route.WALLET, {
              screen: buyAmpules ? route.WALLETHOME : route.WALLETGIF,
              params: {buyAmpules},
            });
          }
        }
      })
      .catch(err => {
        this.pinRef?.current.shake().then(() => this.setState({pinCode: ''}));
      });
  };

  handleMoodSubmit = moodId => {
    const token = this.props.user.userData.token;
    MentalServices.storeUserMood(token, {
      moodId,
    }).catch(err => {
      // console.log('Error submitting mood:', err);
    });
  };

  cancelLocation = () => {
    this.setState(
      {
        region: 'Default',
        // locationModal: false,
      },
      () => {
        this.props.authActions.getBannnerAds(
          'top',
          this.props.user.userData.token,
        );
        this.props.authActions.getBannnerAds(
          'bottom',
          this.props.user.userData.token,
        );
      },
    );
    this.props.searchActions.regionAdd('Default');
  };

  /**
   * Fetches more user posts when the end of the list is reached in the Social Home screen.
   * @returns {void}
   */
  endReached = async () => {
    const {stopFetchMore, page, offset} = this.state;
    const {token} = this.props.user.userData;

    if (!stopFetchMore) {
      try {
        const res = await SocialHomeFunction.getUserPosts(page, offset, token);
        this.setState(prevState => ({
          stopFetchMore: res.length === 0,
          postList: [...prevState.postList, ...res],
          newData: res,
          page: res.length === 0 ? prevState.page : prevState.page + 1,
          loadingPost: false,
          refreshing: false,
        }));
      } catch (err) {
        this.setState({loadingPost: false, refreshing: false});
      }
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  changeStoriesLayout = val => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({smallStories: val});
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
    });
  };

  onScrollBeginDrag = () => {
    this.setState({stopFetchMore: false});
  };

  /**
   * Handles the scroll event in the component.
   * Checks if the user has scrolled to the bottom of the content and updates the page state accordingly.
   * Also checks the scroll position to determine whether to change the layout of the stories.
   *
   * @param {Object} event - The event object containing information about the scroll event.
   */
  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent)) {
      this.setState({page: this.state.page + 1, loadingPost: true}, () =>
        this.endReached(),
      );
    }
    if (nativeEvent.contentOffset.y > 296) {
      this.changeStoriesLayout(true);
    } else {
      this.changeStoriesLayout(false);
    }
  };

  handlePollVoting = (postId, choiceId, index) => {
    if (
      !this.props.user.userData.is_social_profile_created ||
      this.state.unverifiedUser
    ) {
      this.showNewUserAlertFunction();
      return;
    }
    let tempPostList = [...this.state.postList];
    if (tempPostList[index].user._id == this.props.user.userData._id) {
      this.setState({
        newMsgModal: true,
        newMsg: 'You cannot vote on your own poll',
      });
      return;
    }
    tempPostList[index].polls = tempPostList[index].polls || [];

    const found = tempPostList[index]?.polls?.some(
      val => val.user._id === this.props.user.userData._id,
    );
    if (!found) {
      tempPostList[index]?.polls?.push({
        _id: Math.random().toString(25).substring(7),
        user: {
          _id: this.props.user.userData._id,
        },
      });
      tempPostList[index].choices.forEach(val => {
        if (val._id == choiceId) {
          val.votes = val.votes + 1;
        }
      });
      tempPostList[index].total_votes = tempPostList[index].total_votes + 1;
      this.setState({postList: tempPostList});

      SocialServices.votePoll(
        postId,
        {choice_id: choiceId},
        this.props.user.userData.token,
      )
        .then(res => {})
        .catch(err => {
          this.setState({
            newMsgModal: true,
            newMsg: `${err?.response.data.message}`,
          });
        });
    } else {
      this.setState({
        newMsgModal: true,
        newMsg: 'You have already voted for this poll',
      });
    }
  };

  handleLikeFunction = (item, index) => {
    const {postList} = this.state;
    let tempLike = {
      _id: this.props?.user?.userData?._id,
      username: this.props?.user?.userData?.social_username,
      image: this.props?.user?.userData?.social_image,
    };
    if (item.likes.length > 0) {
      let likeFound = item.likes.filter(
        val => val._id === this.props?.user?.userData?._id,
      );
      if (likeFound.length > 0) {
        let posts = [...postList];
        let newLike = posts[index].likes.filter(val => {
          if (val._id != this.props?.user?.userData?._id) return val;
        });
        posts[index].likes = newLike;
        this.setState({postList: posts});
      } else {
        let posts = [...postList];
        posts[index].likes.push(tempLike);
        this.setState({postList: posts});
        this.playLikeSound();
      }
    } else {
      let posts = [...postList];
      posts[index].likes.push(tempLike);
      this.setState({postList: posts});
      this.playLikeSound();
    }
    SocialHomeFunction.likeOrUnlikePost(
      item._id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.handleRefreshing1();
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
      });
  };

  getMyLike = (likes, socialProfile) => {
    if (likes) {
      return false;
    } else {
      return false;
    }
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  handleUnFollowUser = item => {
    const {postList, postItemData} = this.state;
    SocialServices.unFollowUser(item?.user?._id, this.props.user.userData.token)
      .then(res => {
        let tempItem = [...postItemData];
        tempItem = tempItem.filter((_, index) => index !== 1);

        let tempPostList = [...postList];
        tempPostList = tempPostList.map(post => {
          if (post.user._id === item.user._id) {
            post.user.is_followed = false;
          }
          return post;
        });
        this.setState({
          showRemoveUserModal: false,
          postList: tempPostList,
          postItemData: tempItem,
        });

        setTimeout(() => {
          this.setState({
            newMsgModal: true,
            newMsg: `You have unfollowed ${item.user?.social_username}`,
          });
        }, 800);
      })
      .catch(err => {});
  };

  handleRefreshing = async () => {
    const {user, authActions} = this.props;
    const {_id, social_username, social_image, token} = user.userData;
    const {offset, postList} = this.state;

    this.getStories(_id, social_username, social_image);
    authActions.getUserProfile({token}, '', '');
    SocialHomeFunction.refreshingPosts(1, offset, token)
      .then(res => {
        this.setState({
          postList: res.length == 0 ? postList : res,
          page: 1,
          stopFetchMore: false,
          refreshing: false,
        });
      })
      .catch(err => {
        this.setState({refreshing: false});
      });
  };

  handleSavePost = postId => {
    SocialHomeFunction.savePost(postId, this.props.user.userData.token)
      .then(res => {
        this.setState({
          postModal: true,
          modalTitle: 'Post Saved',
          modalDescription: 'Your post is saved for future viewing',
          modalImage: require('../../assets/gifs/post-saved.gif'),
        });
      })
      .catch(err => {
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  handleAddComment = (id, value) => {
    let data = {
      post_id: id,
      text: value,
    };
    SocialHomeFunction.commentOnPost(data, this.props.user.userData.token)
      .then(res => {
        alert(
          'Success!!', // This is a title
          `${res}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
        this.handleRefreshing();
      })
      .catch(err => {
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  handleDeletePost = postId => {
    SocialHomeFunction.deletePost(postId, this.props.user.userData.token)
      .then(res => {
        this.setState({msgToDisplay: `${res}`, alertModal: true});
      })
      .catch(err => {
        this.handleRefreshing();
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  checkModuleSplash = moduleName => {
    const filteredModule = this.props.splashModules.filter(
      module => module.name === moduleName,
    );
    return filteredModule[0].enabled;
  };

  updateModuleSplash = (moduleName, routeName) => {
    const data = {
      modulesSplash: [
        {
          name: moduleName,
          enabled: true,
        },
      ],
    };
    ProfileServices.uploadSplashModule(
      data,
      this.props.user.userData.token,
    ).then(() => {
      if (moduleName == 'Wallet') {
        this.props.navigation.navigate(route.WALLET, {
          screen: route.WALLETHOME,
        });
      } else {
        this.props.navigation.navigate(routeName);
      }
      this.getSplashModules(this.props.user.userData.token);
    });
  };

  handleReportPost = reportReason => {
    let postData = {
      post_id: this.state.reportId,
      description: reportReason,
      type: 'Post',
    };
    this.setState({showReportModal: false});
    SocialHomeFunction.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        this.setState({
          postModal: true,
          modalTitle: 'Report Submitted',
          modalDescription:
            'Thank you! Your report has been submitted and will be reviewed to ensure platform’s integrity.',
          modalImage: require('../../assets/gifs/user-blocked.gif'),
        });
        this.handleRefreshing();
      })
      .catch(err => {
        // console.log('err : ', err);
      });
  };

  handleReportBlockUser = () => {
    SocialServices.blockUser(
      this.state.blockUser?.user?._id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          postModal: true,
          modalTitle: 'User Blocked',
          modalDescription: `This user is now blocked and won’t be able to contact or see you. They’ve officially disappeared from your medicos world!`,
          modalImage: require('../../assets/gifs/user-blocked.gif'),
        });
        this.handleRefreshing();
      })
      .catch(err => null);
  };

  handleVideoLayout = e => {
    this.position.start = e.nativeEvent.layout.y - SCREEN_HEIGHT * 0.8 + 100;
    this.position.end =
      e.nativeEvent.layout.y + e.nativeEvent.layout.height + -100;
  };

  seacrhTagFriendsFunction = text => {
    const newData = this.state.userList.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempUserList: newData});
    } else {
      this.setState({searchingData: false});
    }
  };

  handleRepost = repost => {
    SocialServices.repost({repost}, this.props.user.userData.token)
      .then(res => {
        this.setState({msgToDisplay: `${res.data.message}`, alertModal: true});
        this.handleRefreshing();
      })
      .catch(err => {
        // console.log('repost Error : ', err);
      });
  };

  seacrhLikeFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.likedUsers.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempLikedUsers: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  showNewUserAlertFunction = () => {
    if (!this.props.user.userData.is_social_profile_created)
      this.setState({
        alertModal: true,
        msgToDisplay:
          'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
      });
    else
      this.setState({
        alertModal: true,
        msgToDisplay:
          'Your 7-day trial just wrapped up. Want to keep the good times rolling on Medicos Connect? Time to verify!',
      });
  };

  getShareFriends = () => {
    SocialServices.getTagUsers(this.props.user.userData.token)
      .then(res => {
        this.setState({userList: res.data.data, tempUserList: res.data.data});
      })
      .catch(err => null);
  };

  getPostFeeds = (page, offset) => {
    SocialHomeFunction.getUserPosts(
      page,
      offset,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          postList: res.length == 0 ? this.state.postList : res,
          page: res.length == 0 ? page : page + 1,
          offset: offset,
          newData: res,
          loading: false,
          loadingPost: false,
        });
      })
      .catch(err => {
        this.setState({postList: this.state.postList});
      });
  };

  getStories = (id, name, img) => {
    SocialHomeFunction.getStories(id, name, img, this.props.user.userData.token)
      .then(res => {
        this.setState({stories: res, loading: false}, () =>
          this.getPostFeeds(this.state.page, this.state.offset),
        );
      })
      .catch(err => {
        // console.log('err', err);
        this.setState({stories: [], loading: false, refreshing: false}, () =>
          this.getPostFeeds(this.state.page, this.state.offset),
        );
      });
  };

  updateStories = (id, name, img) => {
    SocialHomeFunction.getStories(id, name, img, this.props.user.userData.token)
      .then(res => {
        this.setState({stories: res, loading: false});
      })
      .catch(err => {
        // console.log(err);
        this.setState({stories: []});
      });
  };

  playLikeSound = () => {
    var soundTrack = new Sound(
      require('../../assets/sounds/like.mp3'),
      (error, sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        soundTrack.play(success => {
          soundTrack.release();
        });
      },
    );
  };

  render() {
    const {
      tierModal,
      uploading,
      pinModal,
      pinCode,
      alertModal,
      msgToDisplay,
      msgModal,
      opened,
      modalVisible,
      buyAmpuleModal,
      searchingData,
      showLikedUsers,
      tempLikedUsers,
      postList,
      stories,
      smallStories,
      unverifiedUser,
      // locationModal,
      newUser,
      newUserMessage,
      screenRoute,
      newMsgModal,
      newMsg,
      loadingPost,
      refreshing,
      postItem,
      postItemData,
      postMenu1,
      postMenu,
      postIndex,
      giftModal,
      giftArray,
      selectedUserName,
      ampules,
      modalDescription,
      modalImage,
      wallet_id,
      blockModal,
      postModal,
      modalTitle,
      showReportModal,
      usersModal,
      tagSearch,
      tempUserList,
      userList,
      sharePostData,
      notVerifyUser,
      visible,
      setupProfile,
      verificationInProgress,
      storyMenu,
      showRemoveUserModal,
    } = this.state;
    return (
      <Container color={true}>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <>
          {uploading ? (
            <Loader />
          ) : (
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={300}
              ref={ref => (this.scroll = ref)}
              onScroll={this.onScroll}
              stickyHeaderIndices={[3]}
              onScrollBeginDrag={this.onScrollBeginDrag}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    this.isRefreshing(true);
                    this.handleRefreshing();
                  }}
                />
              }
              contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={styles.carousel}>
                <Carousel
                  data={this.props?.user?.topAds}
                  layout="default"
                  autoplay={true}
                  enableMomentum={false}
                  lockScrollWhileSnapping={true}
                  loop={true}
                  renderItem={this._renderItem}
                  sliderWidth={SCREEN_WIDTH}
                  itemWidth={SCREEN_WIDTH * 0.87}
                  itemHeight={SCREEN_HEIGHT * 0.15}
                  onSnapToItem={index => this.setState({activeSlide: index})}
                />
                {this.props?.user?.topAds?.length > 0 && this.pagination}
              </View>

              <FlatList
                data={this.props.user?.userModules}
                numColumns={3}
                renderItem={this._renderAppsItem}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={item => item.route}
                ItemSeparatorComponent={VerticalSpacer}
              />
              <Text style={styles.socialTitle}>Social</Text>
              <View style={styles.colorWhite}>
                <Stories
                  data={stories}
                  smallStories={smallStories}
                  navigation={this.props?.navigation}
                  reloadComponent={this.handleRefreshing}
                  user={this.props.user}
                />

                <HomeButtons
                  newUser={
                    !this.props.user.userData?.is_social_profile_created ||
                    unverifiedUser
                  }
                  openModel={() => this.setState({storyMenu: true})}
                  showNewUserAlert={this.showNewUserAlertFunction}
                  diableHome={postList.length == 0 ? true : false}
                  onPressSearch={() =>
                    this.props.navigation.navigate(route.SOCIALEXPLORE)
                  }
                  onPressAddPost={() => {
                    this.props.navigation.navigate(route.SOCIALPOSTPICKER, {
                      data: this.props.user.userData._id,
                    });
                  }}
                  onPressHomeBox={() =>
                    this.scroll.scrollTo({animated: true, y: 0})
                  }
                  onPressAvatar={() =>
                    this.props.navigation.navigate(route.SOCIALPROFILE, {
                      data: this.props.user.userData._id,
                    })
                  }
                  onPressCreateStory={() =>
                    this.props.navigation.navigate(route.SOCIALCAMERA, {
                      createStory: true,
                    })
                  }
                  onPressFollowing={() =>
                    this.props.navigation.navigate(route.SOCIALFOLLOWER, {
                      screen: route.SOCIALFOLLOWING,
                    })
                  }
                />
              </View>

              <SocialHome
                navigation={this.props?.navigation}
                user={this.props?.user}
                handleLikeFunction={this.handleLikeFunction}
                handleRepost={this.handleRepost}
                handlePollVoting={this.handlePollVoting}
                postList={postList}
                unverifiedUser={unverifiedUser}
                showNewUserAlertFunction={this.showNewUserAlertFunction}
                openModal={() => this.setState({storyMenu: true})}
                openGiftModal={(wallet_id, social_username) => {
                  this.setState({
                    giftModal: true,
                    wallet_id,
                    selectedUserName: social_username,
                  });
                }}
                onPressHomeBox={() => {
                  this.scroll.scrollTo({animated: true, y: 0});
                }}
                openDaakiModal={item => {
                  this.setState({
                    usersModal: true,
                    sharePostData: item,
                  });
                }}
                postMenu={(item, index) => {
                  if (item.is_followed && postItemData.length == 3) {
                    let tempData = [...postItemData];
                    tempData.splice(1, 0, {
                      name: 'Unfollow User',
                      icon: Unfollow,
                      onPress: () => {
                        this.setState({postMenu: false});
                        setTimeout(() => {
                          this.setState({
                            showRemoveUserModal: true,
                          });
                        }, 800);
                      },
                    });
                    this.setState({postItemData: tempData});
                  }
                  setTimeout(() => {
                    this.setState({
                      postIndex: index,
                      postItem: item,
                      postMenu: true,
                    });
                  }, 500);
                }}
                postMenu1={(item, index) => {
                  this.setState({
                    postIndex: index,
                    postItem: item,
                    postMenu1: true,
                  });
                }}
                copyLink={link => {
                  Clipboard.setString(link);
                  this.setState({
                    msgToDisplay: 'Link copied to clipboard',
                    alertModal: true,
                  });
                }}
                loadingPost={loadingPost}
              />
              <View></View>
            </ScrollView>
          )}
        </>
        <TierModal
          visible={tierModal}
          onContinue={() => {
            this.setState({tierModal: false}, () =>
              this.props.navigation.navigate(route.CAREER),
            );
          }}
        />

        {/* Mood Tracking Modal */}
        <MoodTrackerModal
          modalVisible={modalVisible}
          token={this.props.user?.userData?.token}
          handleCloseModal={this.handleCloseModal}
          handleMoodSubmit={this.handleMoodSubmit}
        />

        {/* Pin Code Modal */}
        <Modal
          animationInTiming={400}
          animationOutTiming={200}
          style={
            (styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})
          }
          onBackdropPress={() => this.setState({pinModal: false})}
          visible={pinModal}>
          <View style={styles.modalContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={{marginTop: opened ? '20%' : 0}}>
              <Pressable
                onPress={() => this.setState({pinModal: false})}
                style={styles.closeWallet}>
                <Icon.FontAwesome
                  name="angle-down"
                  size={30}
                  color={'#38474F'}
                />
              </Pressable>
              <View style={styles.loc}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/gifs/Loc.gif')}
                  style={styles.gif}
                />
              </View>
              <View style={styles.unlockWalletTextContainer}>
                <Text style={styles.unlockWalletText}>Unlock Wallet</Text>
              </View>
              <View style={styles.unlockWalletTextContainer}>
                <SmoothPinCodeInput
                  ref={this.pinRef}
                  cellStyle={styles.cellStyle}
                  cellStyleFocused={styles.cellStyleFocused}
                  mask={<View style={styles.maskView}></View>}
                  maskDelay={500}
                  password={true}
                  value={pinCode}
                  onTextChange={code => this.setState({pinCode: code})}
                  onFulfill={code => this._checkCode(code)}
                />
                <View style={styles.enterPinView}>
                  <Text style={styles.enterYourPin}>Enter your pin</Text>
                </View>
              </View>
              <View style={styles.unlockWalletTextContainer}>
                <Pressable
                  onPress={() =>
                    this.setState({pinModal: false}, () =>
                      this.props.navigation.navigate(route.WALLETSETING, {
                        prev_screen: 'Reset',
                      }),
                    )
                  }>
                  <Text style={styles.resetYourPin}>Reset your pin</Text>
                </Pressable>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        <DeleteModal msg visible={msgModal} text={msgToDisplay} />
        <NotVerifyUserModal
          visible={notVerifyUser}
          onContinue={() =>
            this.setState({notVerifyUser: false}, () =>
              this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
                showVerifyReason: true,
              }),
            )
          }
        />
        <SetupYourProfile
          visible={setupProfile}
          onContinue={() =>
            this.setState({setupProfile: false}, () =>
              this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
                showVerifyReason: true,
              }),
            )
          }
        />
        <VerificationInProgress
          visible={verificationInProgress}
          onContinue={() => this.setState({verificationInProgress: false})}
        />
        <SearchMenu
          visible={visible}
          onSavedPosts={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALSAVEDPOST);
          }}
          onProfile={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALPROFILE);
          }}
          onBlock={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALBLOCK);
          }}
          onFollower={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALFOLLOWER, {
              screen: route.SOCIALFOLLOWING,
            });
          }}
          onFollowRequest={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALFOLLOWER, {
              screen: route.SOCIALREQUEST,
            });
          }}
          onClose={() => this.setState({visible: false})}
        />

        <BottomMenu
          visible={storyMenu}
          onClose={() => this.setState({storyMenu: false})}
          data={[
            {
              icon: AddStory,
              name: 'Create Story',
              onPress: () => {
                this.setState({storyMenu: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALCAMERA, {
                      createStory: true,
                    });
              },
            },
            {
              icon: UploadPost,
              name: 'Post Picture',
              onPress: () => {
                this.setState({storyMenu: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALPOSTPICKER, {
                      data: this.props.user.userData._id,
                    });
              },
            },
            {
              icon: PostText,
              name: 'Post Text',
              onPress: () => {
                this.setState({storyMenu: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALPOST1, {
                      removeMedia: true,
                      createStory: false,
                      createText: true,
                    });
              },
            },
            {
              icon: Poll,
              name: 'Create Poll',
              onPress: () => {
                this.setState({storyMenu: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.CREATEPOLL, {
                      removeMedia: true,
                      createStory: false,
                      token: this.props.user.userData.token,
                    });
              },
            },
          ]}
        />

        <BottomMenu
          visible={postMenu}
          onClose={() => this.setState({postMenu: false})}
          data={postItemData}
        />
        <BottomMenu
          visible={postMenu1}
          onClose={() => this.setState({postMenu1: false})}
          data={[
            {
              icon: Pin,
              name: `${postItem.is_pinned ? 'Unpin' : 'Pin'} Post`,
              onPress: () => {
                this.setState({postMenu1: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : SocialServices.pinUnpinPost(
                      postItem?._id,
                      this.props.user.userData.token,
                    )
                      .then(() => {
                        this.setState({
                          postModal: true,
                          modalTitle: `Post ${
                            postItem.is_pinned ? 'Unpinned' : 'Pinned'
                          }`,
                          modalDescription: `${
                            postItem.is_pinned
                              ? 'You have unpinned this post to your profile. It will not be shown on the top of your profile'
                              : 'Your post is now right where it belongs—top and center!'
                          }`,
                          modalImage: require('../../assets/gifs/post-saved.gif'),
                          postList: postList.map(post => {
                            if (post._id === postItem._id) {
                              post.is_pinned = !post.is_pinned;
                            }
                            return post;
                          }),
                        });
                      })
                      .catch(err => {
                        // console.log('pin post error', err);
                      });
              },
            },
            {
              icon: EditPost,
              name: 'Edit post',
              onPress: () => {
                this.setState({postMenu1: false});
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALPOSTEDIT, {
                      postId: postItem?._id,
                      caption: postItem?.description,
                    });
              },
            },
            {
              icon: DeletePost,
              name: 'Delete post',
              onPress: () => {
                this.setState({postMenu1: false});
                this.handleDeletePost(postItem._id);
              },
            },
          ]}
        />

        <AmpuleModal
          visible={giftModal}
          onClose={() => this.setState({giftModal: false})}
          data={giftArray}
          userName={selectedUserName}
          onSendGift={() => {
            this.setState({giftModal: false});
            setTimeout(() => {
              if (ampules == 0) {
                this.setState({
                  alertModal: true,
                  msgToDisplay: 'Please select ampules to send.',
                });
                return;
              }
              if (ampules < 250) {
                this.setState({
                  alertModal: true,
                  msgToDisplay: 'You can send minimum 250 ampules.',
                });
                return;
              }

              let data = {
                receiver_id: wallet_id,
                ampules: ampules,
              };
              WalletServices.sendAmpules(data, this.props.user.userData.token)
                .then(res => {
                  if (res?.data?.message == 'Insufficent Ampules') {
                    this.setState({
                      alertModal: true,
                      msgToDisplay: 'Entered amount exceeds account balance.',
                      buyAmpuleModal: true,
                      selectedUserName: '',
                    });
                  } else {
                    this.setState({
                      alertModal: true,
                      msgToDisplay: 'Ampules successfully shared',
                    });
                    this.props.authActions.getUserProfile(
                      {token: this.props.user.userData.token},
                      '',
                      '',
                    );
                  }
                })
                .catch(error => {
                  alert('Oh, shit! Try again');
                });
            }, 1000);
          }}
          setCustomAmpules={num => {
            this.setState({ampules: num});
          }}
          ampules={ampules}
          totalAmpules={this.props.user.userData.ampules}
          onPress={item => {
            let arrayData = [...giftArray];
            arrayData.map((e, i) => {
              if (item.name == e.name) {
                arrayData[i] = {...arrayData[i], selected: true};
                this.setState({ampules: item.name});
              } else {
                arrayData[i] = {...arrayData[i], selected: false};
              }
            });
            this.setState({giftArray: arrayData});
          }}
        />

        <BlockUserConfirmation
          visible={showRemoveUserModal}
          isBlock={false}
          onAccept={() => this.handleUnFollowUser(postItem)}
          onClose={() => this.setState({showRemoveUserModal: false})}
          username={postItem?.user?.social_username}
        />

        <BuyAmpuleModal
          visible={buyAmpuleModal}
          onClose={() => {
            this.setState({buyAmpuleModal: false});
          }}
          ampules={this.props.user.userData.ampules}
          buyAmpules={() => {
            this.setState({buyAmpuleModal: false, buyAmpules: true});
            setTimeout(() => {
              this.setState({
                pinModal: true,
              });
            }, 1000);
          }}
        />

        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            this.setState({newMsgModal: false});
          }}
          text={newMsg}
        />

        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_social_profile_created) {
                this.props.navigation.navigate(route.SOCIALSETTINGS1st, {
                  prev_screen: route.HOME,
                });
              } else if (msgToDisplay.includes('verified')) {
                this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
                  data: 0,
                });
              } else if (ampules) {
              } else this.handleRefreshing();
            });
          }}
          text={msgToDisplay}
        />
        <DeleteModal
          visible={blockModal}
          confirm={() => {
            this.setState({blockModal: false});
            this.handleReportBlockUser();
          }}
          cancel={() => this.setState({blockModal: false})}
          blockUser
        />
        <PostModal
          isVisible={postModal}
          topAds={this.props.user?.topAds}
          bottomAds={this.props.user?.bottomAds}
          onClose={() => this.setState({postModal: false})}
          title={modalTitle}
          description={modalDescription}
          gifFile={modalImage}
        />
        <ReportModal
          visible={showReportModal}
          handleReportPost={this.handleReportPost}
          onClose={() => this.setState({showReportModal: false})}
        />
        <FreeTrailModal navigation={this.props.navigation} />
        <ReactNativeModal
          useNativeDriver={false}
          hideModalContentWhileAnimating={true}
          animationIn={'slideInUp'}
          backdropColor={'#E9E9E9'}
          animationInTiming={800}
          animationOutTiming={800}
          style={styles.userModalContainer}
          isVisible={usersModal}>
          <View style={styles.userModalInnerContainer}>
            <Pressable
              onPress={() => this.setState({usersModal: false})}
              style={styles.dropDownIcon}>
              <DropDown />
            </Pressable>
            <Text style={styles.searchText}>Search</Text>
            <View style={styles.searchContainer}>
              <TextInput
                colorProps
                style={styles.container}
                value={tagSearch}
                placeholder="Search friends"
                onChangeText={job => {
                  this.setState({tagSearch: job});
                  this.seacrhTagFriendsFunction(job);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    this.setState({
                      tempUserList: userList,
                      tagSearch: '',
                    });
                  }
                }}
              />
              <Share height={20} width={30} />
            </View>
            <FlatList
              data={tempUserList}
              ItemSeparatorComponent={VerticalSpacer}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.chatListContainer}>
                    <Pressable
                      onPress={() => {
                        this.setState({
                          usersModal: false,
                          tempUserList: userList,
                          tagSearch: '',
                        });

                        this.props.navigation.navigate(route.CHATSCREEN, {
                          data: {
                            id: `${item?._id}`,
                            name: item?.username,
                            seen: false,
                            type: 'Social',
                            email: '',
                            is_post: true,
                            post_id: sharePostData._id,
                            profile_url: item?.image
                              ? item?.image
                              : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
                            last_message: 'Shared With you',
                            last_message_time: '2021-08-12 17:00:00',
                          },
                        });
                      }}
                      style={styles.chatUserButton}>
                      <Avatar
                        source={{
                          uri: item?.image
                            ? `${item?.image}`
                            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                        }}
                        rounded
                        size={60}
                      />
                      <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                          {item.username ? item.username : 'John Doe'}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
        </ReactNativeModal>
        <CustomDropDownModal
          tagFriends
          like
          loading={searchingData}
          isVisible={showLikedUsers}
          onClose={() => this.setState({showLikedUsers: false})}
          data={tempLikedUsers}
          OnReset={() => this.setState({tempLikedUsers: likedUsers})}
          onSearch={text => this.seacrhLikeFunction(text)}
          onPress={data =>
            this.setState({showLikedUsers: false}, () =>
              this.props.navigation.navigate(route.SOCIALPROFILE, {
                data: data._id,
              }),
            )
          }
        />
        {/* New alert */}
        <DeleteModal
          alert
          visible={newUser}
          confirm={() => {
            this.setState({newUser: false}, () => {
              this.props.navigation.navigate(screenRoute, {
                prev_screen: 'Home',
              });
            });
          }}
          text={newUserMessage}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    postList: state.postReducer || [],
    storiesList: state.postReducer.stories,
    splashModules: state.splashReducer.splash,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    connectActions: bindActionCreators(connectActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
    socialAction: bindActionCreators(socialActions, dispatch),
    splashActions: bindActionCreators(splashActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
