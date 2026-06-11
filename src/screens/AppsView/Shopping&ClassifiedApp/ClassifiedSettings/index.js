import React, {Component} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Button,
  Container,
  DeleteModal,
  HeaderLeftProfile,
  Icon,
  Input,
  Loader,
} from '../../../../components';
import DefaultProfile from '../../../../assets/svg/defaullt_profile.svg';
import ProfileEdit from '../../../../assets/svg/profile_edit.svg';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import ClassifiedSettingsFunction from './classified.settings.function';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {ClassifiedServices} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_CLASSIFIED,
  iconColor: themeStyle.COLOR_WHITE,
};
class SocialSetting1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineStatus: true,
      errorAlert: false,
      uploading: false,
      commentAndRating: true,
      notification: true,
      loading: true,
      submit: false,
      photos: '',
      uploadImages: '',
      username: '',
      location: this.props.user.userData?.location?.location,
      phone: '',
      countryCode: '+1',
      visible: false,
      cityData: [
        {
          id: 1,
          label: 'Select Country First',
          value: 'Select Country First',
        },
      ],
      jobCity: [],
      countryData: [],
      jobCountry: [],
      alertModal: false,
      msgToDisplay:
        this.props?.route?.params?.prev_screen == 'Profile'
          ? 'Classified Profile Settings Updated Successfully'
          : 'New Profile Created Successfully',
      deactivate: false,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.getClassifiedSettings();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.COLOR_CLASSIFIED}
          navigation={this.props.navigation}
        />
      ),
      headerTitle: 'Market Settings',
    });
  };

  getClassifiedSettings = () => {
    ClassifiedSettingsFunction.getUserClassifiedProfileSettings(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          photos: res.image,
          uploadImages: res.image,
          username: res.username != null ? res.username : '',
          phone: res.phone_number,
          notification: res.allow_notifications,
          deactivate: res?.profile_deactivate,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };
  chooseFile = () => {
    ImagePicker.openPicker({
      width: SCREEN_WIDTH,
      height: 300,
      compressImageQuality: 0.5,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      let source = image;
      this.setState({
        uploadImages: source.path,
        photos: source.path,
      });
    });
  };

  renderItem = (item, drag, isActive, index) => {
    return (
      <>
        {item.image ? (
          <>
            <TouchableOpacity
              onPress={() => {
                this.setState({deleteModal: true, index: index});
              }}
              style={styles.minusContainer}
            >
              <Icon.AntDesign
                name="minus"
                size={15}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 30}}
              onLongPress={() => drag()}
              disabled={isActive}
            >
              <Avatar source={{uri: item.image}} rounded size={100} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onLongPress={() => drag()}
            disabled={isActive}
            onPress={() => this.chooseFile(index)}
            style={styles.emptyContainer}
          >
            <Icon.Entypo name="plus" size={30} color={'#FF9966'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  handleContinue = () => {
    const {
      username,
      phone,
      onlineStatus,
      commentAndRating,
      submit,
      uploadImages,
      deactivate,
      notification,
    } = this.state;
    if (phone && username.length && submit && uploadImages.length) {
      this.setState({uploading: true});
      let formData = new FormData();
      formData.append('username', username);
      formData.append('phone_number', phone);
      formData.append('online_status', onlineStatus);
      formData.append('allow_comment_ratings', commentAndRating);
      formData.append('allow_notifications', notification);
      formData.append(
        'location',
        this.props.user.userData?.location?.location
          ? this.props.user.userData?.location?.location
          : 'Islamabad, Pakistan',
      );
      formData.append(
        'longitude',
        this.props.user.userData?.location?.long
          ? this.props.user.userData?.location?.long
          : 0,
      );
      formData.append(
        'latitude',
        this.props.user.userData?.location?.lat
          ? this.props.user.userData?.location?.lat
          : 0,
      );
      if (
        uploadImages.includes('file://') ||
        uploadImages.includes('/private')
      ) {
        formData.append(`image`, {
          uri: uploadImages,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      } else {
        formData.append(`image`, '');
      }
      formData.append('profile_deactivate', deactivate);

      ClassifiedSettingsFunction.setUserClassifiedProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({
            uploading: false,
            alertModal: true,
            msgToDisplay: this.props.user.userData.is_classified_profile_created
              ? 'Classified Profile Settings Updated Successfully'
              : 'New Profile Created Successfully',
          });
        })
        .catch(err => {
          // console.log('setUserClassifiedProfileSettings error', err);
          this.setState({
            alertModal: true,
            msgToDisplay: 'Oh, shoot! Try again',
            uploading: false,
          });
        });
    } else {
      this.setState({submit: true});
      this.setState({
        errorAlert: true,
        msgToDisplay: 'Please fill all fields',
        submit: true,
        alertModal: true,
      });
    }
  };

  alertConfrim = () => {
    if (this.state.errorAlert) {
      this.setState({alertModal: false, errorAlert: false});
    } else {
      this.setState({alertModal: false});
      this.props.authActions.getUserProfile(
        {token: this.props.user.userData.token},
        '',
        '',
      );
      if (this.props.route.params?.prev_screen == route.PROFILE) {
        this.props.navigation.replace(route.MAIN, {
          screen: route.PROFILE,
        });
      } else {
        this.props.navigation.replace(route.MAIN, {
          screen: route.HOME,
        });
      }
    }
  };

  onPressFlag = () => {
    this.setState({visible: true});
  };

  selectCountry = country => {
    // this.phoneRef.updater.isMounted()
    this.setState({
      countryCode: '+' + country.callingCode[0],
      phone: '+' + country.callingCode[0],
      country: country,
      visible: false,
    });
    var state = {
      disabled: false,
      displayValue: '+' + country.callingCode[0],
      iso2: country.cca2,
      value: '+' + country.callingCode[0],
    };
    this.phoneRef.setValue('+' + country.callingCode[0]);
  };
  getJobCountry = () => {
    ClassifiedServices.getJobCountries(this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({countryData: array});
      })
      .catch(err => console.log(err));
  };
  getJobCity = id => {
    ClassifiedServices.getJobCityByCountry(id, this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({cityData: array});
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      username,
      phone,
      notification,
      submit,
      uploadImages,
      photos,
      alertModal,
      uploading,
      msgToDisplay,
      deactivate,
    } = this.state;

    return (
      <Container>
        {this.state.loading || uploading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <KeyboardAwareScrollView>
                <View style={{marginHorizontal: '5%'}}>
                  <Text style={styles.heading}>
                    {this.props.user.userData.is_classified_profile_created
                      ? 'Update'
                      : 'Create'}{' '}
                    Your {'\n'}Profile
                    <Text
                      style={[
                        styles.heading,
                        {
                          color: themeStyle.COLOR_CLASSIFIED,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {' '}
                      {username}
                    </Text>
                  </Text>
                  <View style={{marginVertical: '2.5%'}}>
                    {photos ? (
                      <>
                        <Avatar
                          source={{
                            uri: photos
                              ? photos
                              : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                          }}
                          rounded
                          onPress={this.chooseFile}
                          size={80}
                          containerStyle={{
                            borderColor: themeStyle.COLOR_CLASSIFIED,
                            borderWidth: 1,
                          }}
                        ></Avatar>
                        <View style={{left: 55, bottom: 20}}>
                          <ProfileEdit fill={themeStyle.COLOR_CLASSIFIED} />
                        </View>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={this.chooseFile}
                          style={styles.defaultProfile}
                        >
                          <DefaultProfile />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.chooseFile}
                          style={{left: 50, bottom: 20}}
                        >
                          <ProfileEdit fill={themeStyle.COLOR_CLASSIFIED} />
                        </TouchableOpacity>
                      </>
                    )}

                    <View>
                      <Text
                        style={[
                          styles.desc1,
                          {color: themeStyle.COLOR_CLASSIFIED},
                        ]}
                      >
                        Add your profile picture
                        {/* This picture will be displayed in your messages only */}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tagline}>
                    {submit && !uploadImages ? (
                      <Text style={commonStyle.errorText}>
                        Please add at least one photo.
                      </Text>
                    ) : null}
                  </View>

                  <View style={{...styles.margin, marginTop: '3%'}}>
                    <Text style={styles.desc1}>Username</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        silver
                        value={username}
                        placeholder="Add username"
                        onChangeText={job => this.setState({username: job})}
                      />
                    </View>
                    {/* {submit && !username.length ? (
                      <Text style={commonStyle.errorText}>
                        Please fill this field.
                      </Text>
                    ) : null} */}
                  </View>
                  <Text style={styles.desc1}>Phone number</Text>
                  <View style={styles.inputConttainer}>
                    <Input
                      silver
                      value={phone}
                      keyboardType={'numeric'}
                      placeholder="Add Phone number"
                      onChangeText={job => this.setState({phone: job})}
                    />
                  </View>
                  {/* <View style={styles.margin}>
                    <View
                      style={[
                        {
                          marginVertical: '2%',
                          borderWidth: 0.5,
                          borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                          paddingTop: '5%',
                          borderRadius: 10,
                          paddingHorizontal: '5%',
                          backgroundColor: themeStyle.COLOR_WHITE,
                        },
                      ]}> */}
                  {/* <PhoneInput
                        ref={e => {
                          this.phoneRef = e;
                        }}
                        onPressFlag={() => this.onPressFlag()}
                        autoFormat={false}
                        initialCountry="us"
                        initialValue={'+1'}
                        disabled={false}
                        allowZeroAfterCountryCode={false}
                        textStyle={[
                          { paddingLeft: 0, fontFamily: themeStyle.FONT_REGULAR, color: "#000000" },
                          Platform.OS && { lineHeight: 18 },
                        ]}
                        onChangePhoneNumber={phone =>
                          this.setState({ phone: phone })
                        }
                        value={phone}
                        textProps={{
                          placeholder: '',
                          placeholderTextColor: 'rgb(76,76,76)',
                          selectionColor: '#000000',
                        }}
                      /> */}
                  {/* <CountryPicker
                        visible={visible}
                        withAlphaFilter
                        withFilter
                        placeholder=""
                        onSelect={value => this.selectCountry(value)}
                        onClose={() => this.setState({ visible: false })}>
                        <View />
                      </CountryPicker> */}
                  {/* </View> */}
                  {/* {submit && !location.length ? (
                      <Text style={commonStyle.errorText}>
                        Please fill this field.
                      </Text>
                    ) : null} */}
                  {/* </View> */}

                  <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>Notifications</Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={notification}
                      onColor={themeStyle.CLASSIFIED_HOME}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({notification: isOn})}
                    />
                  </View>
                  <View style={{...styles.rowContainer, marginTop: 24}}>
                    <Text style={styles.grayText}>Deactivate profile</Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={deactivate}
                      onColor={themeStyle.PINK_BACKGROUND}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({deactivate: isOn})}
                    />
                  </View>
                  {/* <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>Online Status</Text>
                    <ToggleSwitch
  animationSpeed={3}
                      isOn={onlineStatus}
                      onColor={themeStyle.COLOR_CLASSIFIED}
                      offColor={themeStyle.PRIMARY_TINT_COLOR}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({onlineStatus: isOn})}
                    />
                  </View>
                  <TouchableOpacity style={styles.btonContainer}>
                    <Text
                      style={[
                        styles.blackText,
                        {
                          textAlign: 'center',
                        },
                      ]}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                  {/* <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>Allow Comments/Ratings</Text>
                    <ToggleSwitch
  animationSpeed={3}
                      isOn={commentAndRating}
                      onColor={'#38474F'}
                      offColor={themeStyle.PRIMARY_TINT_COLOR}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#FF9966'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({commentAndRating: isOn})}
                    />
                  </View> */}
                </View>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              <Button
                titleColor={themeStyle.COLOR_BLACK}
                orangebg
                title={
                  this.props.user.userData.is_classified_profile_created
                    ? 'Update Profile'
                    : 'Register'
                }
                onPress={() =>
                  this.setState({submit: true}, () => this.handleContinue())
                }
              />
            </View>
          </>
        )}
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.alertConfrim();
          }}
          text={msgToDisplay}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SocialSetting1st);
