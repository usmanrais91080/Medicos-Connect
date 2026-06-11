import React, {Component} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import ProfileEdit from '../../../../assets/svg/profile_edit.svg';
import DefaultProfile from '../../../../assets/svg/defaullt_profile.svg';

import {
  Button,
  Container,
  DeleteModal,
  HeaderLeftProfile,
  Icon,
  Input,
  Loader,
} from '../../../../components';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {ProfileServices} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import MentalHealthSetReminder from '../../../../components/Modals/MentalHealthProfileSettingsModal';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.PURPLE_COLOR,
  iconColor: themeStyle.COLOR_WHITE,
};
class MentalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: false,
      notification: false,
      loading: false,
      submit: false,
      photos: '',
      uploadImages: '',
      username: '',
      visible: false,
      date: new Date(),
      alertModal: false,
      msgToDisplay:
        this.props?.route?.params?.prev_screen == 'Profile'
          ? 'Classified Profile Settings Updated Successfully'
          : 'New Profile Created Successfully',
      moodTracker: false,
      deactivate: false,
      exerciseReminder: false,
      journalReminder: false,
      exerciseModal: false,
      journalModal: false,
      exercise_reminder_type: '',
      exercise_reminder_days: [],
      exercise_reminder_time: new Date(),
      journal_reminder_type: '',
      journal_reminder_days: [],
      journal_reminder_time: new Date(),
      quickSettings: ['Everyday', 'Weekdays', 'Weekends'],
      daysData: [],
    };
  }

  componentDidMount = () => {
    if (this.props.route.params.prev_screen == route.PROFILE) {
      this.getMetalSettings();
    }
    this.getDays();
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.PURPLE_COLOR}
          strokeColor={themeStyle.PURPLE_COLOR}
          navigation={this.props.navigation}
        />
      ),
      headerTitle: 'Mental Health',
    });
  };

  getDays = () => {
    ProfileServices.getDays(this.props.user.userData.token)
      .then(res => {
        this.setState({daysData: res.data.data});
      })
      .catch(err => {
        // console.log('Mental Profile err>>>>>', err);
      });
  };

  getMetalSettings = () => {
    ProfileServices.getMentalProfileSettings(this.props.user.userData.token)
      .then(res => {
        this.setState({
          uploadImages: res.data.data.image,
          photos: res.data.data.image,
          username: res.data.data.username,
          notification: res.data.data?.allow_notifications || false,
          exerciseReminder: res.data.data?.excercise_reminder || false,
          journalReminder:
            res.data.data?.journal_reminder !== 'null'
              ? res.data.data?.journal_reminder
              : false,
          moodTracker: res.data.data?.isMoodTracker,
          deactivate: res.data.data?.profile_deactivate,
          exercise_reminder_type: res.data.data?.excercise_reminder_type,
          exercise_reminder_days: res.data.data?.excercise_reminder_days || [],
          exercise_reminder_time:
            res.data.data?.excercise_reminder_time || new Date(),
          journal_reminder_type: res.data.data?.journal_reminder_type,
          journal_reminder_days: res.data.data?.journal_reminder_days,
          journal_reminder_time:
            res.data.data?.journal_reminder_time || new Date(),
        });
        if (res.data.data?.journal_reminder_type) {
          this.journalReminderType(res.data.data?.journal_reminder_type);
        }
        if (res.data.data?.excercise_reminder_type) {
          this.exerciseReminderType(res.data.data?.excercise_reminder_type);
        }
      })
      .catch(err => {
        this.setState({loading: false});
        // console.log('Mental Profile err>>>>>', err);
      });
  };
  chooseFile = index => {
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
      notification,
      submit,
      uploadImages,
      journalReminder,
      exerciseReminder,
      exercise_reminder_time,
      exercise_reminder_days,
      exercise_reminder_type,
      journal_reminder_time,
      journal_reminder_days,
      journal_reminder_type,
      moodTracker,
      deactivate,
    } = this.state;
    if (username && submit) {
      this.setState({uploading: true});
      let formData = new FormData();
      formData.append('username', username);
      formData.append('allow_notifications', notification);
      if (
        uploadImages?.length &&
        (uploadImages.includes('file://') || uploadImages.includes('/private'))
      ) {
        formData.append(`image`, {
          uri: uploadImages?.length
            ? uploadImages
            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      } else {
        formData.append(`image`, '');
      }
      formData.append('excercise_reminder', exerciseReminder);
      formData.append('journal_reminder', journalReminder);
      if (exerciseReminder) {
        formData.append('excercise_reminder_type', exercise_reminder_type);
        exercise_reminder_days?.map((item, index) => {
          formData.append('excercise_reminder_days[]', item._id);
        });
        formData.append('excercise_reminder_time', exercise_reminder_time);
      }
      if (journalReminder) {
        formData.append('journal_reminder_type', journal_reminder_type);
        journal_reminder_days?.map(item => {
          formData.append('journal_reminder_days[]', item._id);
        });
        formData.append('journal_reminder_time', journal_reminder_time);
      }
      formData.append('isMoodTracker', moodTracker);
      formData.append('profile_deactivate', deactivate);

      ProfileServices.updateMentalProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(async res => {
          await this.props.authActions.getUserProfile(
            this.props.user.userData.token,
          );
          this.setState({
            uploading: false,
            alertModal: true,
            msgToDisplay: this.props.user.userData
              .is_mental_health_profile_created
              ? 'Mental Profile Settings Updated Successfully'
              : 'New Profile Created Successfully',
          });
        })
        .catch(err => {
          // console.log('err>>>>>>', err);
          this.setState({
            errorAlert: true,
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
        this.props.navigation.replace(route.MENTALMOOD);
      } else {
        this.props.navigation.replace(route.MAIN, {
          screen: route.HOME,
        });
      }
    }
  };

  journalReminderType = type => {
    const {daysData} = this.state;
    this.setState({journal_reminder_type: type});
    switch (type) {
      case 'Everyday':
        this.setState({
          journal_reminder_days: daysData.map(item => item),
        });
        break;
      case 'Weekdays':
        this.setState({
          journal_reminder_days: daysData.filter(
            item => item.name !== 'Saturday' && item.name !== 'Sunday',
          ),
        });
        break;
      case 'Weekends':
        this.setState({
          journal_reminder_days: daysData.filter(
            item => item.name === 'Saturday' || item.name === 'Sunday',
          ),
        });
        break;
    }
  };

  exerciseReminderType = type => {
    const {daysData} = this.state;
    this.setState({exercise_reminder_type: type});
    switch (type) {
      case 'Everyday':
        this.setState({
          exercise_reminder_days: daysData.map(item => item),
        });
        break;
      case 'Weekdays':
        this.setState({
          exercise_reminder_days: daysData.filter(
            item => item.name !== 'Saturday' && item.name !== 'Sunday',
          ),
        });
        break;
      case 'Weekends':
        this.setState({
          exercise_reminder_days: daysData.filter(
            item => item.name === 'Saturday' || item.name === 'Sunday',
          ),
        });
        break;
    }
  };

  render() {
    const {
      username,
      notification,
      submit,
      uploadImages,
      photos,
      alertModal,
      uploading,
      msgToDisplay,
      exerciseModal,
      journalModal,
      exerciseReminder,
      journalReminder,
      moodTracker,
      deactivate,
      quickSettings,
      daysData,
    } = this.state;

    return (
      <Container>
        {this.state.loading || uploading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: '15%'}}
              >
                <View style={{marginHorizontal: '5%', paddingBottom: '5%'}}>
                  <Text style={styles.heading2}>
                    {this.props.user.userData.is_mental_health_profile_created
                      ? 'Update'
                      : 'Create'}{' '}
                    Your{'\n'}Profile
                    <Text
                      style={[
                        styles.heading,
                        {
                          color: themeStyle.PURPLE_COLOR,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {` ${username || ''}`}
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
                            borderColor: themeStyle.PURPLE_COLOR,
                            borderWidth: 1,
                          }}
                        ></Avatar>
                        <View style={{left: 55, bottom: 20}}>
                          <ProfileEdit fill={themeStyle.PURPLE_COLOR} />
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
                          <ProfileEdit fill={themeStyle.MENTAL_PRIMARY} />
                        </TouchableOpacity>
                      </>
                    )}

                    <View>
                      <Text
                        style={[styles.desc1, {color: themeStyle.PURPLE_COLOR}]}
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

                  <View
                    style={{
                      ...styles.margin,
                      marginTop: '2.5%',
                      marginBottom: -10,
                    }}
                  >
                    <Text style={styles.desc1}>Username</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        silver
                        value={username}
                        placeholder="Add username"
                        onChangeText={job => this.setState({username: job})}
                      />
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>Notifications</Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={notification}
                      onColor={themeStyle.ORANGE_DARK}
                      offColor={themeStyle.PRIMARY_TINT_COLOR}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({notification: isOn})}
                    />
                  </View>
                  <View style={{marginTop: 25}}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.grayText}>Exercise Reminder</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={exerciseReminder}
                        onColor={themeStyle.ORANGE_DARK}
                        offColor={themeStyle.PRIMARY_TINT_COLOR}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#fff'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn =>
                          this.setState({exerciseReminder: isOn})
                        }
                      />
                    </View>
                    {exerciseReminder ? (
                      <TouchableOpacity
                        onPress={() => this.setState({exerciseModal: true})}
                        style={styles.reminderButton}
                      >
                        <Icon.Feather
                          name="clock"
                          size={24}
                          color={themeStyle.COLOR_BLACK}
                        />
                        {this.state.exercise_reminder ? (
                          <Text style={styles.reminder}>
                            Set at {this.state.exercise_reminder_time}
                          </Text>
                        ) : (
                          <Text
                            onPress={() => this.setState({exerciseModal: true})}
                            style={styles.reminder}
                          >
                            Set Reminder
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  <View style={{marginTop: 25}}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.grayText}>Journal Reminder</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={journalReminder}
                        onColor={themeStyle.ORANGE_DARK}
                        offColor={themeStyle.PRIMARY_TINT_COLOR}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#fff'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn =>
                          this.setState({journalReminder: isOn})
                        }
                      />
                    </View>
                    {journalReminder ? (
                      <TouchableOpacity
                        onPress={() => this.setState({journalModal: true})}
                        style={styles.reminderButton}
                      >
                        <Icon.Feather
                          name="clock"
                          size={24}
                          color={themeStyle.COLOR_BLACK}
                        />
                        {this.state.journal_reminder ? (
                          <Text style={styles.reminder}>
                            Set at {this.state.journal_reminder_time}
                          </Text>
                        ) : (
                          <Text style={styles.reminder}>Set Reminder</Text>
                        )}
                      </TouchableOpacity>
                    ) : null}
                    <View style={{...styles.rowContainer, marginTop: 24}}>
                      <Text style={styles.grayText}>Mood Tracker</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={moodTracker}
                        onColor={themeStyle.ORANGE_DARK}
                        offColor={themeStyle.PRIMARY_TINT_COLOR}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#fff'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn => this.setState({moodTracker: isOn})}
                      />
                    </View>
                    {this.props.route.params.prev_screen == route.PROFILE ? (
                      <View style={{...styles.rowContainer, marginTop: 24}}>
                        <Text style={styles.grayText}>Deactivate profile</Text>
                        <ToggleSwitch
                          animationSpeed={3}
                          isOn={deactivate}
                          onColor={themeStyle.ORANGE_DARK}
                          offColor={themeStyle.PRIMARY_TINT_COLOR}
                          label=""
                          thumbOffStyle={{backgroundColor: '#fff'}}
                          thumbOnStyle={{backgroundColor: '#fff'}}
                          labelStyle={styles.labelStyle}
                          size="medium"
                          onToggle={isOn => this.setState({deactivate: isOn})}
                        />
                      </View>
                    ) : null}
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <Button
                    title={
                      this.props.user.userData.is_mental_health_profile_created
                        ? 'Update Profile'
                        : 'Register'
                    }
                    titleColor={themeStyle.COLOR_BLACK}
                    mentalbg
                    onPress={() =>
                      this.setState({submit: true}, () => this.handleContinue())
                    }
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
            <MentalHealthSetReminder
              visible={exerciseModal}
              onClose={() => this.setState({exerciseModal: false})}
              daysData={daysData}
              quickSettings={quickSettings}
              remainderType={this.state.exercise_reminder_type}
              setReminderType={type => this.exerciseReminderType(type)}
              selectedDays={this.state.exercise_reminder_days}
              setDaysData={data => {
                try {
                  let arr = [...this.state.exercise_reminder_days];
                  if (!arr.includes(data)) {
                    arr.push(data);
                  } else {
                    arr = arr.filter(item => item !== data);
                  }
                  this.setState({exercise_reminder_days: arr});
                } catch (e) {
                  // console.log('error', e);
                }
              }}
              time={this.state.exercise_reminder_time}
              setTime={time => {
                this.setState({exercise_reminder_time: time});
              }}
            />
            <MentalHealthSetReminder
              visible={journalModal}
              onClose={() => this.setState({journalModal: false})}
              daysData={daysData}
              quickSettings={quickSettings}
              remainderType={this.state.journal_reminder_type}
              setReminderType={type => this.journalReminderType(type)}
              selectedDays={this.state.journal_reminder_days}
              setDaysData={data => {
                try {
                  let arr = [...this.state.journal_reminder_days];
                  if (!arr.includes(data)) {
                    arr.push(data);
                  } else {
                    arr = arr.filter(item => item !== data);
                  }
                  this.setState({journal_reminder_days: arr});
                } catch (e) {
                  // console.log('error', e);
                }
              }}
              time={this.state.journal_reminder_time}
              setTime={time => {
                this.setState({journal_reminder_time: time});
              }}
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(MentalSettings);
