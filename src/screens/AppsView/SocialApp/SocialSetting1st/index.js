import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleSwitch from 'toggle-switch-react-native';
import commonStyle from '../../../../assets/styles/common.style';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  Container,
  DeleteModal,
  HeaderLeftProfile,
  HeaderLeft,
  Icon,
  Input,
  Loader,
} from '../../../../components';
import Help from '../../../../assets/svg/need-help.svg';
import DefaultProfile from '../../../../assets/svg/defaullt_profile.svg';
import ProfileEdit from '../../../../assets/svg/profile_edit.svg';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';
import SocialSettingsFunction from './social.settings.function';
import styles from './style';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import HelpModal from '../../../../components/Modals/HelpModal';
import ConfirmationModal from '../../../../components/Modals/ConfirmationModal';
import PostModal from '../../../../components/Modals/PostModal';
import LinksModal from '../../../../components/Modals/LinksModal';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.YELLOW,
  iconColor: themeStyle.DAVY_GRAY,
};
class SocialSetting1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev_screen: this.props?.route?.params
        ? this.props?.route?.params?.prev_screen == 'Profile'
          ? route.PROFILE
          : route.SOCIALPROFILE
        : 'Home',
      username: '',
      privateAccount: null,
      submit: false,
      followRequest: 'Anyone',
      messageRequest: 'Anyone',
      photos: '',
      uploadImages: '',
      selfDesc: '',
      allowQr: true,
      deleteModal: false,
      loading: true,
      autoPlay: false,
      deactivateModal: false,
      data: [
        {
          id: 1,
          label: 'Anyone',
          value: 'Anyone',
        },
        {id: 1, label: 'Mutual Friends', value: 'Mutual'},
      ],
      alertModal: false,
      errorAlert: false,
      uploading: false,
      imageLoad: true,
      deactivate: false,
      help: false,
      msgToDisplay:
        this.props?.route?.params?.prev_screen == 'Profile'
          ? 'Social Profile Settings Updated Successfully'
          : 'New Profile Created Successfully',
      tiktok_link: '',
      instagram_link: '',
      facebook_link: '',
      twitter_link: '',
      linkedin_link: '',
      badgeData: [
        'Teacher',
        'Student',
        'Mentor',
        'Creator',
        'Gamer',
        'Blogger',
        'Artist',
        'Entertainer',
        'Activist',
        'Entrepreneur',
        'Life Coach',
      ],
      selectedBadges: [],
      showLinkModal: false,
      deactivateConfirmModal: false,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.getSocialSettings();
    this.props.navigation.setOptions({
      // headerRight: () => <HeaderRight onPress={() => this.setState({ visible: true })} />,
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.YELLOW}
          strokeColor={themeStyle.YELLOW}
          navigation={this.props.navigation}
          prev_screen={
            this.props?.route?.params?.prev_screen == route.SOCIALPROFILE
              ? route.SOCIALPROFILE
              : null
          }
        />
      ),
    });
  };

  getSocialSettings = () => {
    SocialSettingsFunction.getUserSocialProfileSettings(
      this.props.user.userData.token,
    )
      .then(res => {
        console.log('Deactivate', res.account_is_private);
        this.setState({
          photos: res.image,
          uploadImages: res.image,
          username: res.username != null ? res.username : '',
          followRequest: res.follow_request,
          privateAccount: res.account_is_private,
          messageRequest: res.message_request,
          selfDesc: res.about,
          allowQr: res.is_qr_sharing_allow,
          loading: false,
          autoPlay: res.autoplay_video,
          deactivate: res.profile_deactivate,
          tiktok_link: res.tiktok_link,
          instagram_link: res.insta_link,
          facebook_link: res.fb_link,
          twitter_link: res.x_link,
          linkedin_link: res.linkedin_link,
          selectedBadges: res.badges ? res.badges?.split(',') : [],
        });
      })
      .catch(err => {
        this.setState({loading: false});
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
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

  handleDeleteItem = index => {
    let array = [...this.state.photos];
    array.map((_, i) => {
      if (i == index) {
        array[index] = {...array[index], image: ''};
        this.setState({
          uploadImages: this.state.uploadImages.filter((item, ind) => {
            item.image != _;
          }),
        });
      }
    });
    this.setState({photos: array, deleteModal: false, index: ''});
  };

  renderItem = (item, drag, isActive, index) => {
    return (
      <>
        {item.image ? (
          <>
            <TouchableOpacity
              onPress={() => {
                this.setState({deleteModal: false, index: index});
              }}
              style={styles.minusContainer}>
              <Icon.AntDesign
                name="minus"
                size={15}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 30}}
              onLongPress={() => drag()}
              disabled={isActive}>
              <Avatar source={{uri: item.image}} rounded size={100} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onLongPress={() => drag()}
            disabled={isActive}
            onPress={() => this.chooseFile(index)}
            style={styles.emptyContainer}>
            <Icon.Entypo name="plus" size={30} color={'#1DD1A1'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  handleContinue = modal => {
    const {
      selfDesc,
      username,
      privateAccount,
      submit,
      uploadImages,
      autoPlay,
      deactivate,
      tiktok_link,
      instagram_link,
      facebook_link,
      twitter_link,
      linkedin_link,
      selectedBadges,
    } = this.state;
    if (
      uploadImages &&
      username.length &&
      selfDesc.length &&
      selectedBadges.length &&
      submit
    ) {
      let formData = new FormData();
      formData.append('username', username);
      formData.append('account_is_private', privateAccount);
      formData.append('about', selfDesc);
      formData.append('autoplay_video', autoPlay);
      formData.append('profile_deactivate', deactivate);
      formData.append('tiktok_link', tiktok_link);
      formData.append('insta_link', instagram_link);
      formData.append('fb_link', facebook_link);
      formData.append('x_link', twitter_link);
      formData.append('linkedin_link', linkedin_link);
      formData.append('badges', selectedBadges.join(','));

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
      SocialSettingsFunction.setUserSocialProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          if (modal) {
            this.setState({deactivateModal: true});
            return;
          }
          this.setState({
            uploading: false,
            alertModal: true,
            msgToDisplay: username
              ? 'Social Profile Settings Updated Successfully'
              : 'New Profile Created Successfully',
            deactivateModal: false,
          });
        })
        .catch(err => {
          this.setState({
            errorAlert: true,
            msgToDisplay: 'Oh, shoot! Try again',
            uploading: false,
            alertModal: true,
          });
        });
    } else {
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
      this.setState({alertModal: false, errorAlert: false, uploading: false});
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
      } else if (prev_screen == route.SOCIALPROFILE) {
        this.props.navigation.goBack();
      } else {
        this.props.navigation.replace(route.MAIN, {
          screen: route.HOME,
        });
      }
    }
  };

  render() {
    const {
      uploading,
      username,
      selfDesc,
      privateAccount,
      submit,
      uploadImages,
      photos,
      alertModal,
      msgToDisplay,
      deactivate,
      autoPlay,
      help,
      deactivateModal,
      badgeData,
      selectedBadges,
      showLinkModal,
      facebook_link,
      instagram_link,
      tiktok_link,
      twitter_link,
      linkedin_link,
      deactivateConfirmModal,
    } = this.state;
    return (
      <Container>
        {this.state.loading | uploading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                // contentInset={{ top: 0, bottom: 0 }}
                showsVerticalScrollIndicator={false}>
                <View style={{marginHorizontal: '5%'}}>
                  <Text style={styles.heading}>
                    {username ? 'Update' : 'Create'} Your {'\n'}Profile{' '}
                    <Text
                      style={[
                        styles.heading,
                        {color: themeStyle.YELLOW, fontWeight: 'bold'},
                      ]}>
                      {username}
                    </Text>
                  </Text>
                  <View style={{marginVertical: '2.5%'}}>
                    {photos?.length ? (
                      <>
                        <Avatar
                          ImageComponent={() => (
                            <FastImage
                              onLoadEnd={() =>
                                this.setState({imageLoad: false})
                              }
                              resizeMode="cover"
                              style={{
                                height: 80,
                                width: 80,
                              }}
                              source={{
                                uri: photos
                                  ? photos
                                  : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                              }}
                            />
                          )}
                          onPress={this.chooseFile}
                          rounded
                          size={80}
                          containerStyle={{
                            borderColor: themeStyle.YELLOW,
                            borderWidth: 1,
                          }}></Avatar>
                        <TouchableOpacity style={{left: 55, bottom: 20}}>
                          <ProfileEdit fill={themeStyle.YELLOW} />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={this.chooseFile}
                          style={styles.defaultProfile}>
                          <DefaultProfile />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.chooseFile}
                          style={{left: 50, bottom: 20}}>
                          <ProfileEdit fill={themeStyle.YELLOW} />
                        </TouchableOpacity>
                      </>
                    )}

                    <View>
                      <Text style={[styles.desc1, {color: themeStyle.YELLOW}]}>
                        This picture will be displayed in your messages only
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tagline}>
                    {submit && !uploadImages?.length ? (
                      <Text style={commonStyle.errorText}>
                        Add your profile photo
                      </Text>
                    ) : null}
                  </View>
                  <View style={{marginTop: '5%'}}>
                    <Text style={styles.grayText}>Username</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        silver
                        value={username}
                        placeholder=""
                        onChangeText={job => this.setState({username: job})}
                      />
                    </View>
                    {submit && !username.length ? (
                      <Text style={commonStyle.errorText}>
                        Please fill this field.
                      </Text>
                    ) : null}
                  </View>
                  <Text style={styles.grayText}>Bio</Text>
                  <View style={styles.bioInputContainer}>
                    <TextInput
                      style={styles.input}
                      value={selfDesc}
                      multiline
                      textAlignVertical="top"
                      placeholder="Add Bio"
                      onChangeText={job => {
                        if (job.length <= 50) this.setState({selfDesc: job});
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        color: '#646262',
                        fontFamily: themeStyle.FONT_REGULAR,
                        fontSize: 12,
                      }}>
                      {50 - selfDesc.length + '/50'}
                    </Text>
                  </View>
                  <View style={{...styles.row, marginTop: '5%'}}>
                    <Text style={{...styles.grayText, marginRight: 5}}>
                      Select Badge
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({help: true})}>
                      <Help />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.badgeContainer}>
                    {badgeData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={
                          selectedBadges.includes(item)
                            ? styles.badgeItem
                            : styles.badgeUnselectedItem
                        }
                        onPress={() => {
                          if (selectedBadges.includes(item)) {
                            this.setState({
                              selectedBadges: selectedBadges.filter(
                                badge => badge != item,
                              ),
                            });
                          } else {
                            if (selectedBadges.length < 3) {
                              this.setState({
                                selectedBadges: [...selectedBadges, item],
                              });
                            }
                          }
                        }}>
                        <Text style={styles.badgeText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.badgeInfo}>(can only select 3)</Text>

                  <View style={{...styles.row, marginTop: '5%'}}>
                    <Text style={{...styles.grayText, marginRight: 5}}>
                      Add Social media links
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({help: true})}>
                      <Help />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({showLinkModal: true})}
                    style={styles.addLinkButton}>
                    <Text style={styles.grayText}>Add links</Text>
                  </TouchableOpacity>
                  <View style={styles.rowContainer}>
                    <View style={styles.row}>
                      <Text style={{...styles.grayText, marginRight: 5}}>
                        Private Account
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.setState({help: true})}>
                        <Help />
                      </TouchableOpacity>
                    </View>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={privateAccount}
                      onColor={'#91BFE1'}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({privateAccount: isOn})}
                    />
                  </View>

                  {/* <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>Auto PlayVideos</Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={autoPlay}
                      onColor={'#91BFE1'}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({autoPlay: isOn})}
                    />
                  </View> */}

                  <View style={styles.rowContainer}>
                    <Text style={styles.grayText}>
                      {deactivate ? 'Reactivate' : 'Deactivate'} Account
                    </Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={deactivate}
                      onColor={'#E91B1B'}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={() =>
                        this.setState({
                          deactivateConfirmModal: true,
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <Button
                    yellowbg
                    titleColor={themeStyle.COLOR_BLACK}
                    title={username ? 'Update Profile' : 'Register'}
                    onPress={() =>
                      this.setState({submit: true, uploading: true}, () =>
                        this.handleContinue(),
                      )
                    }
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </>
        )}
        <PostModal
          isVisible={deactivateModal}
          title={`${!deactivate ? 'Reactivate' : 'Deactivate'} Profile`}
          description={`Your Social profile has been ${
            !deactivate ? 'reactivated' : 'deactivated'
          }`}
          gifFile={require('../../../../assets/gifs/post-saved.gif')}
          text={`You can ${
            !deactivate ? 'Deactivate' : 'Reactivate'
          } your profile from profile settings`}
          onClose={() =>
            this.setState({deactivateModal: false}, () => {
              this.props.navigation.goBack();
            })
          }
        />
        <LinksModal
          visible={showLinkModal}
          onClose={() => this.setState({showLinkModal: false})}
          confirm={() => this.setState({showLinkModal: false})}
          facebook={facebook_link}
          setFacebook={text => this.setState({facebook_link: text})}
          instagram={instagram_link}
          setInstagram={text => this.setState({instagram_link: text})}
          twitter={twitter_link}
          setTwitter={text => this.setState({twitter_link: text})}
          tiktok={tiktok_link}
          setTiktok={text => this.setState({tiktok_link: text})}
          linkedin={linkedin_link}
          setLinkedin={text => this.setState({linkedin_link: text})}
        />
        <ConfirmationModal
          visible={deactivateConfirmModal}
          text={`Are you sure you want to ${
            deactivate ? 'Reactivate' : 'Deactivate'
          } ${username}?`}
          confirmText={deactivate ? 'Reactivate' : 'Deactivate'}
          onClose={() => this.setState({deactivateConfirmModal: false})}
          confirm={() => {
            this.setState(
              {
                deactivateConfirmModal: false,
                submit: true,
                deactivate: !deactivate,
              },
              () => {
                this.handleContinue(true);
              },
            );
          }}
        />
        <HelpModal
          visible={help}
          onClose={() => this.setState({help: false})}
        />
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
