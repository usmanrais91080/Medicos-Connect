import React, {Component} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
import ConnectSettingsFunction from './connect.settings.function';
import commonStyle from '../../../../assets/styles/common.style';
import {connect} from 'react-redux';
import ConnectMenu from '../ConnectMenu';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import ToggleSwitch from 'toggle-switch-react-native';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.PINK,
  iconColor: themeStyle.COLOR_WHITE,
};
class SocialSetting1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      uploading: false,
      loading: true,
      blockContact: false,
      submit: false,
      selfDesc: '',
      men: false,
      women: true,
      any: false,
      photos: '',
      photoList: [],
      uploadImages: '',
      alertModal: false,
      prefer: 'Male',
      deactivate: false,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.getConnectSettings();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.PINK}
          strokeColor={themeStyle.PINK}
          navigation={this.props.navigation}
        />
      ),
    });
  };

  getConnectSettings = () => {
    ConnectSettingsFunction.getUserConnectProfileSettings(
      this.props.user.userData.token,
    )
      .then(res => {
        switch (res.gender_preference) {
          case 'Female':
            this.onWomen();
            break;
          case 'Male':
            this.onMen();
            break;
          case 'Non Binary':
            this.onAny();
            break;
        }

        this.setState({
          photos: res.connect_image0 == null ? '' : res.connect_image0,
          uploadImages: res.connect_image0 == null ? '' : res.connect_image0,
          photoList: res.image,
          selfDesc: res.about == null ? '' : res.about,
          username: res.username,
          blockContact: res.block_phone_contacts,
          loading: false,
          deactivate: res.profile_deactivate,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  chooseFile = index => {
    ImagePicker.openPicker({
      width: SCREEN_WIDTH,
      height: 300,
      compressImageQuality: 0.3,
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
                this.setState({index: index});
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
            <Icon.Entypo name="plus" size={30} color={'#FF6B6B'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  onMen = () => {
    this.setState({men: true, women: false, any: false, prefer: 'Male'});
  };
  onWomen = () => {
    this.setState({men: false, women: true, any: false, prefer: 'Female'});
  };
  onAny = () => {
    this.setState({men: false, women: false, any: true, prefer: 'Non Binary'});
  };

  handleContinue = () => {
    const {username, selfDesc, submit, uploadImages, prefer, deactivate} =
      this.state;
    if (username && uploadImages && submit) {
      this.setState({uploading: true});
      let formData = new FormData();
      formData.append('username', username);
      formData.append('gender_preference', prefer);
      formData.append('about', selfDesc);
      formData.append('profile_deactivate', deactivate);
      if (
        uploadImages.includes('file://') ||
        uploadImages.includes('/private')
      ) {
        formData.append(`connect_image0`, {
          uri: uploadImages,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      }

      ConnectSettingsFunction.setUserConnectProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({uploading: false, alertModal: true});
        })
        .catch(err => {
          this.setState({uploading: true});
          alert('Error!!', `${err}`, {
            type: 'bottomsheet',
          });
        });
    } else {
      this.setState({submit: true});
    }
  };

  alertConfrim = () => {
    this.props.authActions.getUserProfile(
      {token: this.props.user.userData.token},
      '',
      '',
    );
    this.props.navigation.goBack();
  };
  render() {
    const {
      loading,
      username,
      selfDesc,
      submit,
      uploadImages,
      photos,
      data,
      uploading,
      alertModal,
      blockContact,
      deactivate,
    } = this.state;
    return (
      <Container>
        {uploading || loading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: '15%'}}
                showsVerticalScrollIndicator={false}
              >
                <View style={{marginHorizontal: '5%'}}>
                  <Text style={styles.heading}>
                    {this.props.user.userData.is_connect_profile_created
                      ? 'Update'
                      : 'Create'}{' '}
                    Your {'\n'}Profile{' '}
                    <Text
                      style={[
                        styles.heading,
                        {color: themeStyle.PINK, fontWeight: 'bold'},
                      ]}
                    >
                      {username}
                    </Text>
                  </Text>
                  <View style={{marginVertical: '2.5%'}}>
                    {photos ? (
                      <Avatar
                        source={{
                          uri: photos
                            ? photos
                            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                        }}
                        rounded
                        size={80}
                        containerStyle={{
                          borderColor: themeStyle.PINK,
                          borderWidth: 1,
                        }}
                      ></Avatar>
                    ) : (
                      <TouchableOpacity
                        style={styles.defaultProfile}
                        onPress={() => this.chooseFile()}
                      >
                        <DefaultProfile />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={{left: 55, bottom: 20}}
                      onPress={() => this.chooseFile()}
                    >
                      <ProfileEdit fill={themeStyle.PINK} />
                    </TouchableOpacity>
                    <View>
                      <Text style={[styles.desc1, {color: themeStyle.PINK}]}>
                        Add your profile photo
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tagline}>
                    {submit && !uploadImages ? (
                      <Text style={commonStyle.errorText}>
                        Please add your photo.
                      </Text>
                    ) : null}
                  </View>
                  <View style={{marginTop: '2.5%'}}>
                    <Text style={styles.desc1}>Username</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        silver
                        value={username}
                        editable={false}
                        placeholder=""
                        inputContainerStyle={{
                          height: 60,
                        }}
                        onChangeText={job => this.setState({username: job})}
                      />
                    </View>
                    {submit && !username.length ? (
                      <Text style={commonStyle.errorText}>
                        Please fill this field.
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.margin}>
                    <Text style={styles.desc1}>Tell us about yourself</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        silver
                        multiline={true}
                        profile
                        value={selfDesc}
                        placeholder="Describe who you are; your dreams, passion, hobbies, anything that you dislike. Let people see through you!"
                        onChangeText={job => this.setState({selfDesc: job})}
                      />
                    </View>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: '5%',
                        // marginTop: '2.5%',
                        backgroundColor: '#E9E9E9',
                        borderRadius: 10,
                        height: 54,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.onMen()}
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                          backgroundColor: this.state.men
                            ? themeStyle.PINK_BACKGROUND
                            : 'transparent',
                          height: 45,
                          justifyContent: 'center',
                          borderRadius: 10,
                        }}
                      >
                        <Text style={styles.optionText}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onWomen()}
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                          backgroundColor: this.state.women
                            ? themeStyle.PINK_BACKGROUND
                            : 'transparent',
                          height: 45,
                          justifyContent: 'center',
                          borderRadius: 10,
                        }}
                      >
                        <Text style={styles.optionText}>Female</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onAny()}
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                          backgroundColor: this.state.any
                            ? themeStyle.PINK_BACKGROUND
                            : 'transparent',
                          height: 45,
                          justifyContent: 'center',
                          borderRadius: 10,
                        }}
                      >
                        <Text style={styles.optionText}>Non Binary</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.desc2}>Deactivate profile</Text>
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
                </View>
                <View style={styles.btnContainer}>
                  {/* <View style={styles.rowContainer2}>
                <View style={styles.darkDash}></View>
                <View style={{ width: 10 }}></View>
                <View style={styles.lightDash}></View>
            </View> */}
                  <Button
                    pinkbg
                    titleColor={themeStyle.COLOR_BLACK}
                    title={`${
                      this.props.user.userData.is_connect_profile_created
                        ? 'Update'
                        : 'Create'
                    } Profile`}
                    onPress={() =>
                      this.setState({submit: true}, () => this.handleContinue())
                    }
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>

            <ConnectMenu
              data={this.props.route?.params?.bff}
              visible={this.state.visible}
              boost={this.state.boost}
              onDate={() => {
                this.props.navigation.setParams({
                  bff: false,
                });
                this.changeProfileMode('Dating');
              }}
              onDeactivateModule={() => {}}
              onViewProfile={() =>
                this.props.navigation.navigate(route.CONNECTUSERPROFILE)
              }
              onFavouriteProfile={() =>
                this.setState({visible: false}, () =>
                  this.props.navigation.navigate(
                    route.CONNECTFAVOURITEPROFILE,
                    {bff: this.props.route?.params?.bff},
                  ),
                )
              }
              onBoost={() =>
                this.setState({boost: true}, () => this.componentDidMount())
              }
              onBFF={() => {
                this.props.navigation.setParams({
                  bff: true,
                });
                this.changeProfileMode('BFF');
              }}
              onMatchedProfile={() =>
                this.setState({visible: false}, () =>
                  this.props.navigation.navigate(route.CONNECTMATCHEDPROFILE, {
                    bff: this.props.route?.params?.bff,
                  }),
                )
              }
              onClose={() => this.setState({visible: false})}
            />
            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.setState({alertModal: false});
                this.alertConfrim();
              }}
              text="Profile updated successfully! Start swiping to meet someone special."
            />
          </Container>
        )}
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
