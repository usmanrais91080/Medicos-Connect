import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeviceInfo from 'react-native-device-info';
import {authActions} from '../../redux/actions/auth';
import {
  AuthenticationHeader,
  Icon,
  Input,
  Button,
  Container,
  Loader,
  ForgotPasswordModal,
  DeleteModal,
  OtpModal,
  OtpVerified,
} from '../../components';
import styles from './style';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../lib/utils/localstorage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthServices} from '../../services';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import themeStyle from '../../assets/styles/theme.style';
import themeStyle1 from '../../assets/styles/common.style';
import {isEmailValid} from '../../lib/utils/global';
import {route} from '../../lib/utils/constants';
import Google from '../../assets/svg/google.svg';
import Apple from '../../assets/svg/apple.svg';
import {AppPrivacyConsent} from '..';
class Login extends Component {
  constructor(props) {
    super(props);
    this.isUnmounted = false;
    this.state = {
      visible: false,
      email: '',
      password: '',
      submit: false,
      opened: false,
      showPassword: true,
      privacyConsent: false,
      forgotPasswordModal: false,
      loading: false,
      forgotPasswordEmail: '',
      forgotPasswordPhone: '',
      newMsgModal: false,
      newMsg: '',
      showOtpPopup: false,
      otpSuccessPopup: false,
      token: '',
      otp: '',
      loginData: null,
    };
    this.input1Ref = null;
    this.input2Ref = null;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkEmailExist = userData => {
    let data = {
      email: userData.email,
    };
    AuthServices.emailCheck(data)
      .then(res => {
        if (res.data.message === 'Email is available') {
          userData.login_type == 'Google'
            ? this.googleLogin(userData, true)
            : this.appleLogin(userData, true);
          // this.checkAppPrivacyConsent(userData, true)
          // return true
        } else {
          userData.login_type == 'Google'
            ? this.googleLogin(userData, false)
            : this.appleLogin(userData, false);

          // return false
        }
      })
      .catch(err => {
        // console.log(err.response);
      });
  };

  googleLogin = (userData, registerUser) => {
    this.setState({loading: true, visible: false});

    AuthServices.googleSign(userData)
      .then(async res => {
        if (res.data.status == 'success') {
          GoogleSignin.signOut();
          await this.props.authActions.getBannnerAds(
            'top',
            res.data.data.token,
          );
          await this.props.authActions.getBannnerAds(
            'bottom',
            res.data.data.token,
          );
          await this.props.authActions.getUserModules(res.data.data.token);
          await this.props.authActions.getUserProfile(
            res.data.data,
            this.props.navigation.replace,
            registerUser,
          );
          this.setState({loading: false});
        }
      })
      .catch(err => {
        this.setState({loading: false});
        // console.log(err);
      });
  };

  _signIn = async login_type => {
    try {
      if (login_type == 'Google') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: false,
        });
        const userInfo = await GoogleSignin.signIn();
        let deviceId = DeviceInfo.getDeviceId();
        let userData = {
          email: userInfo.user.email,
          uid: userInfo.user.id,
          displayName: userInfo.user.name,
          photoURL: userInfo.user.photo,
          login_type: login_type,
          device_type: Platform.OS == 'ios' ? 'iOS' : 'Android',
          device_id: deviceId,
          fcm: 'elDQalftSbWhkLxb4eCpUm:APA91bHiJW3pfZt2ZgKD9FKRsyPIlC6OpceUnG4MwbEEXGzDJBfJ5NMtqthEMGpT6djrJAJF-bkNf2GGuOhYT2HHTr-quQcvTQ0FAmlkzvwRYMy0_AjESPPQfjlRLbh0O_L4hB4LLiK_',
        };

        this.checkEmailExist(userData);
      } else {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );
        // use credentialState response to ensure the user is authenticated
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );
        // Sign the user in with the credential
        auth().signInWithCredential(appleCredential);
        const response = auth().currentUser;

        let deviceId = DeviceInfo.getDeviceId();
        this.setState({loading: true});
        let userData = {
          email: response._user.email,
          uid: response._user.uid,
          displayName: response._user.displayName,
          photoURL: response._user.photoURL,
          login_type: login_type,
          device_type: Platform.OS == 'ios' ? 'iOS' : 'Android',
          device_id: deviceId,
          fcm: 'elDQalftSbWhkLxb4eCpUm:APA91bHiJW3pfZt2ZgKD9FKRsyPIlC6OpceUnG4MwbEEXGzDJBfJ5NMtqthEMGpT6djrJAJF-bkNf2GGuOhYT2HHTr-quQcvTQ0FAmlkzvwRYMy0_AjESPPQfjlRLbh0O_L4hB4LLiK_',
        };
        this.checkEmailExist(userData);
      }
    } catch (error) {
      if (login_type == 'Google') {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
          this.setState({loading: false});
        }
      } else {
        this.setState({loading: false});
      }
    }
  };

  appleLogin = (userData, registerUser) => {
    this.setState({loading: true, visible: false});
    AuthServices.googleSign(userData)
      .then(async res => {
        if (res.data.status == 'success') {
          auth()
            .signOut()
            .then(() => null);
          await this.props.authActions.getBannnerAds(
            'top',
            res.data.data.token,
          );
          await this.props.authActions.getBannnerAds(
            'bottom',
            res.data.data.token,
          );
          await this.props.authActions.getUserModules(res.data.data.token);
          await this.props.authActions.getUserProfile(
            res.data.data,
            this.props.navigation.replace,
            registerUser,
          );
          this.setState({loading: false});
        }
      })
      .catch(err => {
        this.setState({loading: false});
        // console.log(err);
      });
  };

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.showModal();
    });
    GoogleSignin.configure({
      //webClientId is required if you need offline access
      offlineAccess: false,
      webClientId:
        '224975131232-p8kovhp34m73pg30q7bmr98gu1lt8hv5.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  };

  showModal = () => {
    this.setState({visible: true});
  };

  showOtpPopup = (token, data) => {
    this.setState({
      showOtpPopup: true,
      token: token,
      loginData: data,
    });
  };

  handleLoginFunction = async () => {
    if (this.isUnmounted) return;
    const {email, password, submit} = this.state;
    let data = await getLocalData(LOCAL_STORAGE_KEYS.Location);
    if (email && password.length >= 4 && submit && isEmailValid(email.trim())) {
      let deviceId = DeviceInfo.getDeviceId();
      let userData = {
        email: email.trim(),
        password: password,
        device_type: Platform.OS == 'ios' ? 'iOS' : 'Android',
        device_id: deviceId,
        location: JSON.parse(data),
      };
      await this.props.authActions.userLogin(
        userData,
        this.props.navigation.replace,
        this.showOtpPopup,
      );
      // this.setState({ visible: false });
    } else {
      this.setState({submit: true});
    }
  };

  signIn = () => {
    this.props.navigation.navigate(route.SIGNUP);
  };

  checkAppPrivacyConsent = async (userData, registerUser) => {
    const data = await getLocalData(LOCAL_STORAGE_KEYS.app_consent);
    if (data) {
      this.setState({
        privacyConsent: false,
        userData: userData,
        registerUser: registerUser,
      });
    } else {
      this.setState({
        privacyConsent: true,
        userData: userData,
        registerUser: registerUser,
      });
    }
  };
  acceptConsent = async () => {
    await storeLocalData(LOCAL_STORAGE_KEYS.app_consent, JSON.stringify(true));
    this.state.userData.login_type == 'Google'
      ? this.googleLogin(this.state.userData, this.state.registerUser)
      : this.appleLogin(this.state.userData, this.state.registerUser);
  };

  cancelConsent = () => {
    this.state.userData.login_type == 'Google'
      ? this.googleLogin(this.state.userData, this.state.registerUser)
      : this.appleLogin(this.state.userData, this.state.registerUser);
  };

  setEmail = email => {
    this.setState({forgotPasswordEmail: email});
  };

  // setMobile = mobile => {
  //   this.setState({forgotPasswordPhone: mobile.replace(/[^0-9]/g, '')});
  // };

  sendOtp = () => {
    const {forgotPasswordEmail, forgotPasswordPhone} = this.state;
    let data = {
      email: forgotPasswordEmail,
      // phone: forgotPasswordPhone,
    };

    AuthServices.forgetPassword(data)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({forgotPasswordModal: false});
          setTimeout(() => {
            this.setState({
              newMsgModal: true,
              newMsg: res.data.message,
            });
          }, 1000);
        }
      })
      .catch(err => {
        this.setState({forgotPasswordModal: false});
      });
  };

  closeForgotPasswordModal = () => {
    this.setState({forgotPasswordModal: false});
  };

  onSubmitOtp = () => {
    const {otp, token, loginData} = this.state;
    const data = {
      otp,
    };
    AuthServices.verifyOtp(data, token)
      .then(async () => {
        this.setState({
          showOtpPopup: false,
        });
        setTimeout(() => {
          this.setState({
            otpSuccessPopup: true,
          });
        }, 500);
        setTimeout(async () => {
          await this.props.authActions.getUserModules(token);
          await this.props.authActions.getUserProfile(
            loginData,
            this.props.navigation.replace,
          );
        }, 1300);
      })
      .catch(err => {
        this.setState({
          newMsgModal: true,
          newMsg: err.response.data.message,
          otp: '',
        });
      });
  };

  setOpt = otp => {
    this.setState({
      otp,
    });
  };

  render() {
    const {
      submit,
      email,
      password,
      showPassword,
      privacyConsent,
      forgotPasswordModal,
      loading,
      forgotPasswordEmail,
      forgotPasswordPhone,
      newMsgModal,
      newMsg,
      showOtpPopup,
      otpSuccessPopup,
      token,
      otp,
    } = this.state;
    const {navigation, user} = this.props;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : privacyConsent ? (
          <AppPrivacyConsent
            onCancel={() =>
              this.setState({privacyConsent: false}, () => this.cancelConsent())
            }
            onAccept={() =>
              this.setState({privacyConsent: false}, () => this.acceptConsent())
            }
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalContainer}>
              <AuthenticationHeader
                onBack={() => {
                  this.setState({visible: false});
                  setTimeout(() => {
                    navigation.goBack();
                  }, 10);
                }}
                disabled={user.loading}
                navigation={navigation}
                heading={'Sign Into Your'}
                string={'Account'}
              />
              <View
                style={{
                  marginTop: submit ? '15%' : '25%',
                  marginBottom: '10%',
                }}>
                <Text style={styles.grayText}> </Text>
                <Input
                  autoCorrect={false}
                  silver
                  label={'Email'}
                  labelStyle={{
                    paddingBottom: '2.5%',
                    color: 'black',
                    fontWeight: 'normal',
                    fontFamily: themeStyle.FONT_MEDIUM,
                  }}
                  value={email}
                  // keyboardType="visible-password"
                  returnKeyType="next"
                  onSubmitEditing={() => this.input1Ref.focus()}
                  inputRef={r => (this.input1Ref = r)}
                  placeholder="Add email"
                  placeholderTextColor={'#5C5C5C'}
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email: email})}
                />
                {submit && !email ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}>
                    &#9888; Incorrect Email
                  </Text>
                ) : null}
                {submit && email.length && !isEmailValid(email.trim()) ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}>
                    &#9888; Email is invalid
                  </Text>
                ) : null}
                <View>
                  <Input
                    returnKeyType="next"
                    value={password}
                    silver
                    labelStyle={{
                      paddingBottom: '2.5%',
                      color: 'black',
                      fontWeight: 'normal',
                      fontFamily: themeStyle.FONT_MEDIUM,
                    }}
                    label={'Password'}
                    inputRef={r => (this.input2Ref = r)}
                    onSubmitEditing={async () => {
                      this.setState({submit: true}, () =>
                        this.handleLoginFunction(),
                      );
                    }}
                    secureTextEntry={showPassword}
                    placeholder="Add password"
                    placeholderTextColor={'#5C5C5C'}
                    onChangeText={password =>
                      this.setState({password: password})
                    }
                    rightIcon={
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() =>
                          this.setState({showPassword: !showPassword})
                        }>
                        <Icon.Ionicons
                          name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                          size={24}
                          color={themeStyle.COLOR_BLACK}
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>
                {/* <Input color secureTextEntry={true} placeholder="Password" onChangeText={(password) => onPassword(password)} /> */}
                {submit && !password ? (
                  <View style={{}}>
                    <Text
                      style={[
                        themeStyle1.errorText,
                        {marginTop: -15, marginBottom: 5},
                      ]}>
                      &#9888;{'  Incorrect Password'}
                    </Text>
                  </View>
                ) : null}
                {/* {submit && password && password.length <= 4 ? (
                    <Text style={[themeStyle1.errorText, { marginTop: -15, marginBottom: 5 }]}>
                       &#9888; {' Password cannot be less than 4 characters'}
                    </Text>
                  ) : null} */}

                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    onPress={() => {
                      this.setState({
                        visible: false,
                        forgotPasswordModal: true,
                      });
                    }}
                    style={styles.linkText}>
                    Forgot Password?
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.grayText}>Or Sign in with</Text>
                </View>
                {/* <Text style={{ justifyContent: "center", alignItems: "center", textAlign: "center", paddingVertical: "5%" }}>or</Text> */}
                {Platform.OS == 'android' && (
                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={() => this._signIn('Google')}>
                    <Google height={50} width={50} />
                  </TouchableOpacity>
                )}
                {Platform.OS == 'ios' && (
                  <View style={styles.socialLoginContainer}>
                    <TouchableOpacity
                      style={styles.googleButton1}
                      onPress={() => this._signIn('Google')}>
                      <Google height={50} width={50} />
                    </TouchableOpacity>
                    {/* <Text>or</Text> */}
                    <TouchableOpacity
                      style={styles.googleButton1}
                      onPress={() => this._signIn('Apple')}>
                      <Apple height={50} width={50} />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.grayText}>Don't have an account? </Text>
                  <Text onPress={this.signIn} style={styles.linkText}>
                    Sign up
                  </Text>
                </View>
                <Button
                  sky
                  loading={user.loading}
                  title={'Sign In'}
                  onPress={async () => {
                    this.setState({submit: true}, () =>
                      this.handleLoginFunction(),
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
        <OtpModal
          visible={showOtpPopup}
          onClose={() => this.setState({showOtpPopup: false})}
          token={token}
          otp={otp}
          setOtp={this.setOpt}
          onNext={this.onSubmitOtp}
        />
        <OtpVerified
          visible={otpSuccessPopup}
          onClose={() => this.setState({otpSuccessPopup: false})}
        />

        <ForgotPasswordModal
          visible={forgotPasswordModal}
          email={forgotPasswordEmail}
          // mobile={forgotPasswordPhone}
          onClose={this.closeForgotPasswordModal}
          onSendOtp={this.sendOtp}
          setEmail={this.setEmail}
          // setMobile={this.setMobile}
        />
        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            this.setState({newMsgModal: false});
          }}
          text={newMsg}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
