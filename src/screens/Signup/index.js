import React, {Component} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  Container,
  AuthenticationHeader,
  Icon,
  Input,
  Button,
  Loader,
} from '../../components';
import Google from '../../assets/svg/google.svg';
import Apple from '../../assets/svg/apple.svg';
import AlertSvg from '../../assets/svg/alet.svg';
import {route, SCREEN_WIDTH} from '../../lib/utils/constants';
import {isEmailValid} from '../../lib/utils/global';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../lib/utils/localstorage';
import {AuthServices} from '../../services';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import themeStyle from '../../assets/styles/theme.style';
import themeStyle1 from '../../assets/styles/common.style';
import styles from './style';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
      email: '',
      password: '',
      emailExist: false,
      showPassword: true,
      privacyConsent: false,
      loader: false,
    };
    this.input1Ref = null;
    this.input2Ref = null;
    this.input3Ref = null;
  }

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
    this.setState({
      signUpButton: false,
      password: '',
      submit: false,
    });
  };

  handleEmailCheck = () => {
    const {email} = this.state;
    let data = {
      email: email,
    };
    AuthServices.emailCheck(data)
      .then(res => {
        if (res.data.message === 'Email is available') {
          this.setState({loader: true});
          this.handleContinueFunction();
        } else {
          this.setState({emailExist: true, loader: false});
        }
      })
      .catch(err => this.setState({loader: false}));
  };

  handleEmailExist = () => {
    const {email} = this.state;
    let data = {
      email: email,
    };
    AuthServices.emailCheck(data)
      .then(res => {
        if (res.data.message === 'Email is available') {
          this.setState({emailExist: false});
        } else {
          this.setState({emailExist: true});
        }
      })
      .catch(err => null);
  };

  handleContinueFunction = async () => {
    const {email, password, submit, agree} = this.state;
    let data = await getLocalData(LOCAL_STORAGE_KEYS.Location);
    if (email && password && submit && isEmailValid(email) && agree) {
      let deviceId = DeviceInfo.getDeviceId();
      let userData = {
        email: email,
        password: password,
        device_type: Platform.OS == 'ios' ? 'iOS' : 'Android',
        device_id: deviceId,
        gender: '',
        location: null,
        registerUser: true,
      };
      this.checkEmailExist(userData);
    } else {
      this.setState({submit: true, loader: false});
    }
  };
  checkEmailExist = userData => {
    let data = {
      email: userData.email,
    };
    AuthServices.emailCheck(data)
      .then(res => {
        if (res.data.message === 'Email is available') {
          this.setState({loading: false});
          if (this.state.signUpButton) {
            this.props.authActions.registerUser(
              userData,
              this.props.navigation.replace,
            );
          } else {
            userData.login_type == 'Google'
              ? this.googleLogin(userData, true)
              : this.appleLogin(userData, true);
          }
          // return true
        } else {
          userData.login_type == 'Google'
            ? this.googleLogin(userData, false)
            : this.appleLogin(userData, false);

          // return false
        }
      })
      .catch(err => {
        this.setState({loading: false});
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
            {...res.data.data, registerUser},
            this.props.navigation.replace,
          );
          this.setState({loading: false});
        }
      })
      .catch(err => {
        this.setState({loading: false});
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
            {...res.data.data, registerUser},
            this.props.navigation.replace,
          );
          this.setState({loading: false});
        }
      })
      .catch(err => {
        this.setState({loading: false});
      });
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
    if (this.state.signUpButton) {
      this.setState({visible: false}, () => {
        // this.props.navigation.navigate(route.SELECTGENDER, { userData })
        this.props.navigation.navigate(route.PHONENUMBER, {
          userData: this.state.userData,
        });
      });
    } else {
      this.state.userData.login_type == 'Google'
        ? this.googleLogin(this.state.userData, this.state.registerUser)
        : this.appleLogin(this.state.userData, this.state.registerUser);
    }
  };

  cancelConsent = () => {
    if (this.state.signUpButton) {
      this.setState({visible: false}, () => {
        // this.props.navigation.navigate(route.SELECTGENDER, { userData })
        this.props.navigation.navigate(route.PHONENUMBER, {
          userData: this.state.userData,
        });
      });
    } else {
      this.state.userData.login_type == 'Google'
        ? this.googleLogin(this.state.userData, this.state.registerUser)
        : this.appleLogin(this.state.userData, this.state.registerUser);
    }
  };

  signIn = () => {
    this.props.navigation.navigate(route.LOGIN);
  };
  render() {
    const {navigation} = this.props;
    const {agree, email, password, submit, emailExist, showPassword, loader} =
      this.state;
    return (
      <Container>
        {this.state.loading ? (
          <Loader />
        ) : (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: '20%'}}
          >
            <View style={styles.modalContainer}>
              <View style={{paddingHorizontal: '5%'}}>
                <AuthenticationHeader
                  onBack={() => {
                    this.setState({visible: false});
                    setTimeout(() => {
                      navigation.goBack();
                    }, 10);
                  }}
                  disabled={this.props.user.loading}
                  navigation={navigation}
                  heading={'Create'}
                  string={'Account'}
                />
              </View>
              <View
                style={{
                  marginTop: '5%',
                  marginBottom: '5%',
                  paddingHorizontal: '5%',
                }}
              >
                <Text style={styles.grayText}> </Text>
                <Input
                  silver
                  autoCorrect={false}
                  returnKeyType={'next'}
                  labelStyle={{
                    paddingBottom: '2.5%',
                    color: 'black',
                    fontWeight: 'normal',
                    fontFamily: themeStyle.FONT_MEDIUM,
                  }}
                  onBlur={() => this.handleEmailExist()}
                  label={'Email'}
                  placeholderTextColor={'#5c5c5c'}
                  inputRef={r => (this.input3Ref = r)}
                  onSubmitEditing={() => this.input3Ref.focus()}
                  value={email}
                  placeholder="Add Email"
                  autoCapitalize="none"
                  onChangeText={email => {
                    this.setState({email: email.trim()});
                    if (emailExist) {
                      this.setState({emailExist: false});
                    }
                  }}
                />
                {submit && !email ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}
                  >
                    &#9888; Add email to sign up
                  </Text>
                ) : null}
                {submit && email.length && !isEmailValid(email.trim()) ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}
                  >
                    &#9888; Email is invalid
                  </Text>
                ) : null}
                {emailExist && email.length ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}
                  >
                    &#9888; Email already in use
                  </Text>
                ) : null}
                <View>
                  <Input
                    silver
                    label={'Password'}
                    labelStyle={{
                      paddingBottom: '2.5%',
                      color: 'black',
                      fontWeight: 'normal',
                      fontFamily: themeStyle.FONT_MEDIUM,
                    }}
                    value={password}
                    placeholderTextColor={'#5c5c5c'}
                    returnKeyType={'next'}
                    inputRef={r => (this.input1Ref = r)}
                    onSubmitEditing={() =>
                      this.setState({submit: true}, () =>
                        this.handleEmailCheck(),
                      )
                    }
                    secureTextEntry={showPassword}
                    placeholder="Add Password"
                    onChangeText={password =>
                      this.setState({password: password})
                    }
                    rightIcon={
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() =>
                          this.setState({showPassword: !showPassword})
                        }
                      >
                        <Icon.Ionicons
                          name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                          size={24}
                          color={themeStyle.COLOR_BLACK}
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>
                {submit && !password ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginTop: -15, marginBottom: 5},
                    ]}
                  >
                    &#9888; Add password to sign up
                  </Text>
                ) : null}

                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <BarPasswordStrengthDisplay
                    width={SCREEN_WIDTH * 0.9}
                    password={password}
                    height={0}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#EEEEEE',
                    paddingHorizontal: '5%',
                    paddingVertical: '2.5%',
                  }}
                >
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      onPress={() => this.setState({agree: !agree})}
                    >
                      <Icon.Ionicons
                        name="checkbox"
                        size={25}
                        color={agree ? '#0B90CF' : themeStyle.COLOR_GREY}
                      />
                    </TouchableOpacity>
                    <Text style={styles.textStyle}>
                      By agreeing and continue, you agree to the
                      <Text
                        onPress={() =>
                          this.props.navigation.navigate(
                            route.TERMANDCONDITIONS,
                          )
                        }
                        style={{color: '#1169EE'}}
                      >
                        {' '}
                        Terms of Service
                      </Text>
                      . Note: The{' '}
                      <Text
                        onPress={() => navigation.navigate(route.PRIVACYPOLICY)}
                        style={{color: '#1169EE'}}
                      >
                        Privacy Policy
                      </Text>{' '}
                      describes how data is handled in this service.
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 2,
                    }}
                  >
                    <AlertSvg />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 12,
                        color: themeStyle.COLOR_BLACK_LIGHT,
                      }}
                    >
                      Medicos Connect saves your personal information i.e name,
                      dob, email, phone number to allow access to all
                      features of the app.
                    </Text>
                  </View>
                </View>

                <View style={{paddingHorizontal: '5%'}}>
                  {submit && !agree ? (
                    <Text style={[themeStyle1.errorText, {marginVertical: 5}]}>
                      &#9888; Please confirm that you have read and understood
                      the Privacy Policy
                    </Text>
                  ) : null}
                </View>
                <View style={{paddingTop: '10%'}}>
                  <View style={styles.textContainer}>
                    <Text style={styles.grayText}>or Sign in with</Text>
                  </View>

                  {Platform.OS == 'android' && (
                    <TouchableOpacity
                      style={styles.googleButton}
                      onPress={() => this._signIn('Google')}
                    >
                      <Google height={50} width={50} />
                    </TouchableOpacity>
                  )}
                  {Platform.OS == 'ios' && (
                    <View style={styles.socialLoginContainer}>
                      <TouchableOpacity
                        style={styles.googleButton1}
                        onPress={() => this._signIn('Google')}
                      >
                        <Google height={50} width={50} />
                      </TouchableOpacity>
                      {/* <Text>or</Text> */}
                      <TouchableOpacity
                        style={styles.googleButton1}
                        onPress={() => this._signIn('Apple')}
                      >
                        <Apple height={50} width={50} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.textContainer}>
                    <Text style={styles.grayText}>
                      Already have an account?{' '}
                    </Text>
                    <Text onPress={this.signIn} style={styles.linkText}>
                      Sign In
                    </Text>
                  </View>

                  <View style={{paddingTop: '5%', paddingHorizontal: '5%'}}>
                    <Button
                      loading={loader}
                      sky
                      title={'Agree & Register'}
                      onPress={() =>
                        this.setState({submit: true, signUpButton: true}, () =>
                          this.handleEmailCheck(),
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
