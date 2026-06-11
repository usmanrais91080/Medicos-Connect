import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Imag,
  Appearance,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {
  Container,
  AuthenticationSlide,
  AuthenticationHeader,
  Button,
  PhoneNumberModal,
} from '../../components';
import styles from './style';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import themeStyle from '../../assets/styles/theme.style';
import themeStyle1 from '../../assets/styles/common.style';
import {isPhoneValid} from '../../lib/utils/global';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AuthServices} from '../../services';
const colorScheme = Appearance.getColorScheme();

class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      countryCode: '+1',
      visible: false,
      female: false,
      nonBinary: false,
      modalVisible: false,
      submit: false,
      opened: false,
    };
  }

  componentDidMount = () => {
    // this.focusListener = this.props.navigation.addListener('focus', () => {
    // this.showModal()
    // })
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

  // showModal = () => {
  //     this.setState({ modalVisible: true })
  // }

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

  handleVerifyPhoneFunction = () => {
    const {phone} = this.state;
    if (phone && isPhoneValid(phone)) {
      let userData = {
        ...this.props.route.params.userData,
        phone: phone,
      };
      this.props.authActions.sendVerificationCode(
        userData,
        this.props.navigation.navigate,
      );
    } else {
      this.setState({submit: true});
    }
    // navigation.navigate(route.VERIFYPHONE)
  };

  handleSendEmail = () => {
    let data = {
      // email: this.props.route.params.data.email
      email: this.props?.route?.params?.userData?.email,
    };
    AuthServices.sendEmailOtp(data)
      .then(res => {
        this.props.navigation.navigate(route.VERIFYPHONE, {
          verificationId: '',
          data: this.props.route.params.userData,
          phone: '',
        });
      })
      .catch(err => {
        // console.log('err : ', err.response.data);
        // this.setState({msgToDisplay:`${err.message}`,alertModal:true})
      });
    // this.setState({ resendingCode: false, code: "" })
  };

  render() {
    const {navigation} = this.props;
    const {phone, visible, submit, opened} = this.state;
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
        <View
          style={[
            styles.lowerContainer,
            {height: this.state.expandView == true ? null : 0},
          ]}
        >
          <View style={styles.modalContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={{marginTop: opened ? '5%' : 0}}
            >
              <AuthenticationHeader
                onBack={() => navigation.goBack()}
                navigation={navigation}
                show={true}
                heading={'Enter your mobile number'}
              />
              <View
                style={[
                  {
                    backgroundColor: themeStyle.COLOR_WHITE,
                    marginTop: '5%',
                    borderWidth: 0.5,
                    borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                    paddingTop: '5%',
                    borderRadius: 10,
                    paddingHorizontal: '5%',
                  },
                ]}
              >
                <PhoneInput
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
                    {
                      paddingLeft: 0,
                      fontFamily: themeStyle.FONT_REGULAR,
                      color: '#000000',
                    },
                    Platform.OS && {lineHeight: 18},
                  ]}
                  onChangePhoneNumber={phoneno =>
                    this.setState({phone: phoneno})
                  }
                  value={phone}
                  textProps={{
                    placeholder: '',
                    placeholderTextColor: 'rgb(76,76,76)',
                    selectionColor: '#000000',
                  }}
                />

                <CountryPicker
                  visible={visible}
                  withAlphaFilter
                  withFilter
                  placeholder=""
                  onSelect={value => this.selectCountry(value)}
                  onClose={() => this.setState({visible: false})}
                >
                  <View />
                </CountryPicker>
              </View>
              {/* </KeyboardAwareScrollView> */}
              {submit && !phone ? (
                <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                  Please fill this field
                </Text>
              ) : null}
              {submit && phone.length && !isPhoneValid(phone) ? (
                <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                  Please enter a correct phone number
                </Text>
              ) : null}
              <Text style={styles.grayText1}>
                <Text
                  onPress={() => this.handleSendEmail()}
                  style={styles.linkText}
                >
                  {'Send Email OTP'}
                </Text>
              </Text>

              <View style={{marginTop: '25%', marginBottom: '10%'}}>
                <Button
                  loading={this.props.user.loading}
                  title={'Continue'}
                  onPress={() => this.handleVerifyPhoneFunction()}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
        {/* <PhoneNumberModal
                    visible={modalVisible}
                    modalVisible={visible}
                    navigation={navigation}
                    phone={phone}
                    onContinue={() => { this.setState({ modalVisible: false }); navigation.navigate(route.VERIFYPHONE) }}
                    onPressFlag={() => this.onPressFlag()}
                    onRef={(e) => { this.phoneRef = e }}
                    onChangePhoneNumber={phone => this.setState({ phone: phone })}
                    onSelectCountry={(value) => this.selectCountry(value)} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
