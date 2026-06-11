import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import Icon from '../../components/Icon';
import ImagePicker from 'react-native-image-crop-picker';

import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {
  AuthenticationHeader,
  Button,
  DeleteModal,
  Input,
} from '../../components';
import {VerticalSpacer} from '../../lib/utils/global';
import {AuthServices, SocialServices} from '../../services';
import {connect} from 'react-redux';
import DefaultProfile from '../../assets/svg/defaullt_profile.svg';
import ProfileEdit from '../../assets/svg/profile_add.svg';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import commonStyle from '../../assets/styles/common.style';

const styles = StyleSheet.create({
  defaultProfile: {
    backgroundColor: '#F9F9F9',
    borderColor: '#0B90CF',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 100,
  },
  cross: {
    position: 'absolute',
    top: 0,
    right: 16,
    borderRadius: 15, // Rounded border
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  slide: {
    flex: 1,
    resizeMode: 'cover',
  },
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.35,
    alignSelf: 'center',
  },
  text: {
    color: themeStyle.COLOR_WHITE,
    textAlign: 'center',
  },
  text1: {
    textAlign: 'center',
    fontSize: 36,
    marginVertical: 10,
    marginBottom: 20,
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: '5%',
  },
  desc1: {
    color: themeStyle.COLOR_BLACK,
    fontSize: themeStyle.FONT_SIZE_LARGE,
    marginVertical: 10,
  },
  container: {
    marginTop: '5%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
});

class GeneralProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refferModal: false,
      refferalCode: '',
      loading: false,
      alertModal: false,
      msgToDisplay: '',
      privacyConsent: false,
      opened: false,
      consentModal: false,
    };
  }

  componentDidMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  _keyboardDidShow = () => {
    this.setState({opened: true});
  };

  _keyboardDidHide = () => {
    this.setState({opened: false});
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

  removeImage = () => {
    this.setState({
      uploadImages: '',
      photos: '',
    });
  };

  handleSetGeneralProfile = () => {
    const {photos, about, name, uploadImages} = this.state;
    if (photos && name && about && uploadImages) {
      this.setState({loading: true});
      let formData = new FormData();
      formData.append('username', name);
      formData.append('bio', about);

      formData.append(`dp`, {
        uri: uploadImages,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
      SocialServices.checkUniqueUsername(
        {username: name},
        this.props.user.userData.token,
      )
        .then(res => {
          AuthServices.setGeneralProfile(
            formData,
            this.props.user.userData.token,
          )
            .then(res => {
              this.setState({
                msgToDisplay: 'Your updates are live',
                alertModal: true,
              });
            })
            .catch(err => {
              this.setState({
                msgToDisplay:
                  err.response.status == 500
                    ? 'Internal Server Error 500'
                    : `${err.response.data.message}`,
                alertModal: true,
                loading: false,
              });
            });
        })
        .catch(err => {
          this.setState({
            msgToDisplay:
              err.response.status == 500
                ? 'Internal Server Error 500'
                : `${err.response.data.message}`,
            alertModal: true,
            loading: false,
          });
        });
    } else {
      this.setState({
        submit: true,
      });
    }
  };

  render() {
    const {
      msgToDisplay,
      alertModal,
      name,
      about,
      photos,
      loading,
      opened,
      submit,
    } = this.state;
    return (
      <View style={{flex: 1, paddingTop: '15%', backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: opened
              ? SCREEN_HEIGHT > 667
                ? '50%'
                : SCREEN_HEIGHT * 0.5
              : 0,
          }}>
          <View style={styles.modalContainer}>
            <View style={{alignSelf: 'center'}}>
              <AuthenticationHeader heading={'Create'} string={'Profile'} />
            </View>

            <View style={styles.container}>
              {photos?.length ? (
                <>
                  <TouchableOpacity onPress={this.chooseFile}>
                    <FastImage
                      onLoadEnd={() => this.setState({imageLoad: false})}
                      resizeMode="cover"
                      style={{
                        height: 144,
                        width: 144,
                        borderRadius: 72,
                        borderColor: '#0B90CF',
                        borderWidth: 1,
                      }}
                      source={
                        photos
                          ? {
                              uri: photos
                                ? photos
                                : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                            }
                          : require('../../assets/svg/default_profile.png')
                      }
                    />
                    {photos && (
                      <TouchableOpacity
                        onPress={this.removeImage}
                        style={styles.cross}>
                        <Icon.Entypo
                          name={'circle-with-cross'}
                          size={20}
                          color={'#0B90CF'}
                        />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={{left: 30, bottom: 20}}>
                    <ProfileEdit fill={'#0B90CF'} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={this.chooseFile}
                    style={styles.defaultProfile}>
                    <View style={{top: 10, zIndex: 0}}>
                      <DefaultProfile height={140} width={140} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.chooseFile}
                    style={{left: 30, bottom: 20}}>
                    <ProfileEdit fill={'#0B90CF'} />
                  </TouchableOpacity>
                </>
              )}
              {submit && !photos ? (
                <Text
                  style={[
                    commonStyle.errorText,
                    {marginTop: -15, marginBottom: 5},
                  ]}>
                  &#9888; Add your profile image
                </Text>
              ) : null}
            </View>
            <View style={{}}>
              <Text style={styles.desc1}>Name</Text>

              <Input
                silver
                onSubmitEditing={() => this.inputRef.focus()}
                placeholderTextColor={'#5C5C5C'}
                placeholder="Enter your username"
                value={name}
                onChangeText={e => this.setState({name: e})}
              />
              {submit && !name ? (
                <Text
                  style={[
                    commonStyle.errorText,
                    {marginTop: -15, marginBottom: 5},
                  ]}>
                  &#9888; Please enter your username
                </Text>
              ) : null}

              <Text style={styles.desc1}>Bio</Text>

              <Input
                silver
                multiline
                inputRef={e => (this.inputRef = e)}
                returnKeyType="done"
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholderTextColor={'#5C5C5C'}
                inputContainerStyle={
                  {
                    // height:200
                  }
                }
                message
                textAlignVertical="top"
                placeholder="Write something about yourself"
                value={about}
                onChangeText={e => this.setState({about: e})}
              />
              {submit && !about ? (
                <Text
                  style={[
                    commonStyle.errorText,
                    {marginTop: -15, marginBottom: 15},
                  ]}>
                  &#9888; Please write something about you
                </Text>
              ) : null}

              <View style={styles.checkboxContainer}>
                <Icon.AntDesign
                  name="exclamationcircle"
                  size={25}
                  color={'#0B90CF'}
                />

                <View style={{flex: 0.99}}>
                  <Text style={styles.textStyle}>
                    This is a general Medicos Connect profile, Incase you decide
                    to not create a General Profile you will have to create
                    profiles manually for each module, tap on the &#128100; icon
                    in toolbar of the home screen{' '}
                  </Text>
                </View>
              </View>
              <View style={{marginTop: '10%'}}>
                <Button
                  title="Cancel"
                  onPress={async () => {
                    this.props.navigation.replace(route.MAIN);
                  }}
                  custombg
                  titleColor="#0B90CF"
                />

                {VerticalSpacer()}
                {VerticalSpacer()}
                {VerticalSpacer()}
                <Button
                  disabled={name && about ? false : true}
                  loading={loading}
                  title="Create profile"
                  onPress={() => {
                    this.handleSetGeneralProfile();
                  }}
                  sky
                  titleColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
          <DeleteModal
            alert
            visible={alertModal}
            confirm={() => {
              this.setState({alertModal: false}, () => {
                if (
                  msgToDisplay == 'Please fill all the fields' ||
                  msgToDisplay == 'Internal Server Error 500'
                ) {
                } else {
                  this.props.navigation.replace(route.AUTH_LOADING);
                }
              });
            }}
            text={msgToDisplay}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

export default connect(mapStateToProps)(GeneralProfile);
