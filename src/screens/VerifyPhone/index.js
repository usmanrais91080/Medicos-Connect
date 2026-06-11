import React, {Component} from 'react';
import {View, Text, Image, Keyboard} from 'react-native';
import {
  Container,
  OtpInputs,
  AuthenticationHeader,
  Button,
  AuthenticationSlide,
  VerifyPhoneModal,
} from '../../components';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {authActions} from '../../redux/actions/auth';
import styles from './style';
import themeStyle1 from '../../assets/styles/common.style';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AuthServices} from '../../services';

class VerifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: '',
      visible: false,
      submit: false,
      resendingCode: false,
      opened: false,
      timer: 30,
      phone: '',
    };
  }

  componentDidMount = () => {
    if (this.props.route.params?.phone != '')
      this.setState({phone: this.props.route.params.phone});

    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.showModal();
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }

  decrementClock = () => {
    if (this.state.timer === 0) return clearInterval(this.clockCall);
    this.setState(prevstate => ({timer: prevstate.timer - 1}));
  };

  _keyboardDidShow = () => {
    this.setState({opened: true});
  };

  _keyboardDidHide = () => {
    this.setState({opened: false});
  };

  showModal = () => {
    this.setState({visible: true, resendingCode: false});
  };

  handleVerifyCodeFunction = () => {
    const {visible, code, submit} = this.state;

    if (code && code.length == 6 && submit) {
      let userData = {
        ...this.props.route.params.data,
        registerUser: true,
        id: this.props.route.params.verificationId,
        code: code,
      };
      this.props.authActions.verifyCode(
        userData,
        this.props.navigation.navigate,
      );
    } else {
      this.setState({submit: true});
    }
  };
  handleVerifyCodeEmail = () => {
    const {visible, code, submit} = this.state;

    if (code && code.length == 6 && submit) {
      let data = {
        email: this.props.route.params.data.email,
        otp: parseInt(code),
      };
      AuthServices.verifyEmailOtp(data)
        .then(res => {
          if (res.data.message == 'OTP is not valid') {
            alert(
              'Code Invalid!!', // This is a title
              'Your entered code is invalid', // This is a alert message
              {
                type: 'bottomsheet',
              },
            );
          } else if (res.data.message == 'OTP Not Found') {
            alert(
              'Code Expired!!', // This is a title
              'Your entered code is expired', // This is a alert message
              {
                type: 'bottomsheet',
              },
            );
          } else {
            let userData = {
              ...this.props.route.params.data,
              registerUser: true,
              id: this.props.route.params.verificationId,
              code: code,
            };
            this.props.authActions.registerUserEmail(
              userData,
              this.props.navigation.navigate,
            );
          }
        })
        .catch(err => {
          // this.setState({msgToDisplay:`${err.message}`,alertModal:true})
        });
    } else {
      this.setState({submit: true});
    }
  };

  handleResendCode = async () => {
    this.setState({resendingCode: true, code: ''});
    let userData = {
      ...this.props.route.params.data,
    };
    await this.props.authActions.sendVerificationCode(
      userData,
      this.props.navigation.navigate,
    );
    this.setState({resendingCode: false, code: ''});
  };
  handleSendEmail = async () => {
    let data = {
      email: this.props.route.params?.data?.email,
    };
    AuthServices.sendEmailOtp(data)
      .then(res => {})
      .catch(err => {});
  };

  render() {
    const {navigation} = this.props;
    const {error, code, nonBinary, gender, submit, opened, timer, phone} =
      this.state;
    return (
      <Container>
        <View style={styles.upperContainer}>
          {/* <AuthenticationSlide /> */}
          {/* <Video
            repeat={true}
            source={require('../../assets/gifs/video.mp4')}
            controls={false}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            resizeMode={'stretch'}
          /> */}
        </View>
        <View style={[styles.lowerContainer]}>
          <View style={styles.modalContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={{marginBottom: opened ? '20%' : 0}}
            >
              <AuthenticationHeader
                onBack={() => navigation.goBack()}
                navigation={navigation}
                show={true}
                heading={
                  phone != ''
                    ? 'Verify your phone number'
                    : 'Verify your email address'
                }
              />
              <View>
                <Text style={styles.grayText}>
                  Enter code we sent at{' '}
                  {phone != ''
                    ? this.props.route.params?.data?.phone
                    : this.props.route.params?.data?.email}
                </Text>
                <View style={styles.inputContainer}>
                  <OtpInputs
                    length={6}
                    editable={!this.state.resendingCode}
                    otpValue={code}
                    setOtpValue={code => this.setState({code: code})}
                    error={error != '' ? error : ''}
                    onFocus={() => {
                      this.setState({error: ''});
                    }}
                  />
                  {submit && !code ? (
                    <Text
                      style={[
                        themeStyle1.errorText,
                        {marginBottom: 10, marginTop: 10, textAlign: 'center'},
                      ]}
                    >
                      Please fill all the fields
                    </Text>
                  ) : null}
                  {submit && code.length < 6 ? (
                    <Text
                      style={[
                        themeStyle1.errorText,
                        {marginBottom: 10, marginTop: 10, textAlign: 'center'},
                      ]}
                    >
                      Please fill all the fields
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {timer > 0 && (
                  <Text style={styles.grayText}>
                    If you don't receive OTP in{' '}
                    <Text style={styles.linkText}>{timer}</Text> sec(s), {'\n'}
                    wait for email OTP.
                  </Text>
                )}
                {timer == 0 && (
                  <Text style={styles.grayText}>
                    <Text
                      onPress={() =>
                        this.setState({phone: ''}, () => this.handleSendEmail())
                      }
                      style={styles.linkText}
                    >
                      {'Send Email OTP'}
                    </Text>
                  </Text>
                )}
                {/* <Text style={styles.grayText}>didn't receive code? <Text onPress={() => this.handleResendCode()} style={styles.linkText}>Resend code</Text></Text> */}
                <Button
                  disabled={this.state.resendingCode}
                  loading={this.props.user.loading}
                  title={'Continue'}
                  onPress={() => {
                    this.setState({submit: true}, () =>
                      phone != ''
                        ? this.handleVerifyCodeFunction()
                        : this.handleVerifyCodeEmail(),
                    );
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
        {/* <VerifyPhoneModal
                    code={code}
                    loading={this.props.user.loading}
                    error={error}
                    onClose={() => { this.setState({ visible: false }); setTimeout(() => { navigation.goBack() }, 300); }}
                    onContinue={() => { this.setState({ submit: true }, () => this.handleVerifyCodeFunction()); }}
                    setCode={(code) => this.setState({ code: code })}
                    setError={(error) => this.setState({ error: error })}
                    visible={visible}
                    navigation={navigation} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);
