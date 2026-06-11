import React, {Component} from 'react';

import {Text, TouchableOpacity, View, ScrollView, Alert} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Button,
  Container,
  HeaderLeft,
  Icon,
  Input,
  Loader,
  DeleteModal,
  HeaderLeftProfile,
} from '../../../../components';
import {bindActionCreators} from 'redux';
import DefaultProfile from '../../../../assets/svg/defaullt_profile.svg';
import ProfileEdit from '../../../../assets/svg/profile_edit.svg';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {HorizontalSpacer, isPhoneValid} from '../../../../lib/utils/global';
import EducationSettingsFunction from './education.settings.function';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';
import ImagePicker from 'react-native-image-crop-picker';
import {HeaderRight} from './education.setting.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_EDUCATION,
  iconColor: themeStyle.COLOR_WHITE,
};
class EducationSetting1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineStatus: true,
      uploading: false,
      classInvites: true,
      connectProfile: true,
      feedback: true,
      shareQr: true,
      notification: true,
      submit: false,
      photos: '',
      uploadImages: '',
      loading: true,
      username: '',
      firstName: '',
      teacher: true,
      student: false,
      alertModal: false,
      errorAlert: false,
      preferredPaymentMethod: '',
      deactivate: false,
      msgToDisplay:
        this.props?.route?.params?.prev_screen == 'Profile'
          ? 'All set! Your education details have been updated.'
          : 'New Profile Created Successfully',
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.getEducationSettings();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.COLOR_EDUCATION}
          strokeColor={themeStyle.COLOR_EDUCATION}
          navigation={this.props.navigation}
        />
      ),
    });
  };

  getEducationSettings = () => {
    EducationSettingsFunction.getUserEducationProfileSettings(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          photos: res?.image,
          uploadImages: res?.image,
          username: res?.username,
          firstName: res?.firstname,
          teacher: res?.mode == 'Teacher' ? true : false,
          student: res?.mode == 'Student' ? true : false,
          classInvites: res?.class_invities,
          shareQr: res?.allow_qr_code_sharing,
          notification: res?.allow_notifications,
          loading: false,
          preferredPaymentMethod:
            res?.preferred_payment_method !== 'null'
              ? res?.preferred_payment_method
              : '',
          deactivate: res?.profile_deactivate,
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
                let array = [...this.state.photos];
                array.map((_, i) => {
                  if (i == index) {
                    array[index] = {...array[index], image: ''};
                    this.setState({
                      uploadImages: this.state.uploadImages.filter(
                        (item, ind) => {
                          item.image != _;
                        },
                      ),
                    });
                  }
                });
                this.setState({photos: array});
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
            <Icon.Entypo name="plus" size={30} color={'#99CC66'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  handleContinue = () => {
    const {
      username,
      firstName,
      classInvites,
      notification,
      submit,
      uploadImages,
      deactivate,
      preferredPaymentMethod,
    } = this.state;
    if (uploadImages.length && username.length && submit) {
      this.setState({uploading: true});
      let formData = new FormData();
      formData.append('username', username);
      formData.append('firstname', firstName);
      formData.append('allow_notifications', notification);
      formData.append('class_invities', classInvites);
      formData.append('profile_deactivate', deactivate);
      formData.append('preferred_payment_method', preferredPaymentMethod);
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
      }
      EducationSettingsFunction.setUserEducationProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({
            uploading: false,
            alertModal: true,
            msgToDisplay: this.props.user.userData.is_education_profile_created
              ? 'All set! Your education details have been updated.'
              : 'New Profile Created Successfully',
          });
        })
        .catch(err => {
          console.log(err.response);
          this.setState({
            errorAlert: true,
            msgToDisplay: 'Oh, shoot! Try again',
            alertModal: true,
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
    const {prev_screen} = this.props.route.params;
    if (this.state.errorAlert) {
      this.setState({alertModal: false, errorAlert: false});
    } else {
      this.setState({alertModal: false});
      this.props.authActions.getUserProfile(
        {token: this.props.user.userData.token},
        '',
        '',
      );
      if (prev_screen == route.PROFILE) {
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
  render() {
    const {
      username,
      firstName,
      classInvites,
      shareQr,
      uploading,
      loading,
      alertModal,
      msgToDisplay,
      feedback,
      notification,
      onlineStatus,
      student,
      teacher,
      submit,
      uploadImages,
      photos,
      deactivate,
      preferredPaymentMethod,
    } = this.state;
    return (
      <Container>
        {loading || uploading ? (
          <Loader color="#99CC66" />
        ) : (
          <>
            <View style={styles.container}>
              <ScrollView>
                <KeyboardAwareScrollView contentInset={{top: 0, bottom: 0}}>
                  <View style={{marginHorizontal: '5%'}}>
                    <Text style={styles.heading}>
                      {this.props.user.userData.is_education_profile_created
                        ? 'Update'
                        : 'Create'}{' '}
                      Your {'\n'}Profile{' '}
                      <Text
                        style={[
                          styles.heading,
                          {
                            color: themeStyle.COLOR_EDUCATION,
                            fontWeight: 'bold',
                          },
                        ]}
                      >
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
                            size={80}
                            containerStyle={{
                              borderColor: themeStyle.COLOR_EDUCATION,
                              borderWidth: 1,
                            }}
                          ></Avatar>
                          <TouchableOpacity
                            onPress={this.chooseFile}
                            style={{left: 55, bottom: 20}}
                          >
                            <ProfileEdit fill={themeStyle.COLOR_EDUCATION} />
                          </TouchableOpacity>
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
                            <ProfileEdit fill={themeStyle.COLOR_EDUCATION} />
                          </TouchableOpacity>
                        </>
                      )}

                      <View>
                        <Text
                          style={[
                            styles.desc1,
                            {color: themeStyle.COLOR_EDUCATION},
                          ]}
                        >
                          Add your profile photo
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
                    <View style={{...styles.margin, marginTop: '2.5%'}}>
                      <Text style={styles.desc1}>Given Name</Text>
                      <View style={styles.inputConttainer}>
                        <Input
                          silver
                          value={firstName}
                          disabled={true}
                          placeholder=""
                          onChangeText={job => this.setState({firstName: job})}
                        />
                      </View>
                    </View>
                    <View style={{...styles.margin}}>
                      <Text style={styles.desc1}>Username</Text>
                      <View style={styles.inputConttainer}>
                        <Input
                          silver
                          value={username}
                          placeholder=""
                          onChangeText={job => this.setState({username: job})}
                        />
                      </View>
                    </View>
                    <View style={{...styles.margin}}>
                      <Text style={styles.desc1}>Preferred Payment Method</Text>
                      <View style={styles.inputConttainer}>
                        <Input
                          silver
                          value={preferredPaymentMethod}
                          placeholder="Bank/Merchant Details"
                          onChangeText={text =>
                            this.setState({preferredPaymentMethod: text})
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.grayText}>Class invites</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={classInvites}
                        onColor={themeStyle.EDUCATION_BROWN}
                        offColor={'#38474F'}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#fff'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn => this.setState({classInvites: isOn})}
                      />
                    </View>

                    <View style={{marginTop: 24, ...styles.rowContainer}}>
                      <Text style={styles.grayText}>Notifications</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={notification}
                        onColor={themeStyle.EDUCATION_BROWN}
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
                        onColor={themeStyle.EDUCATION_BROWN}
                        offColor={'#38474F'}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#fff'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn => this.setState({deactivate: isOn})}
                      />
                    </View>
                  </View>

                  <View style={{marginHorizontal: '5%'}}></View>
                </KeyboardAwareScrollView>
                <View style={styles.btnContainer}>
                  <Button
                    purplebg
                    titleColor={themeStyle.COLOR_BLACK}
                    title={
                      this.props.user.userData.is_education_profile_created
                        ? 'Update Profile'
                        : 'Register'
                    }
                    onPress={() =>
                      this.setState({submit: true}, () => this.handleContinue())
                    }
                  />
                </View>
              </ScrollView>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EducationSetting1st);
