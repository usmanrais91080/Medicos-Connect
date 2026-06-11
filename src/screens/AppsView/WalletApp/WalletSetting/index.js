import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import {
  Icon,
  DeleteModal,
  Container,
  Button,
  Loader,
  HeaderLeftProfile,
} from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './style';
import {ProfileServices} from '../../../../services';
import {route} from '../../../../lib/utils/constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import ForgotPinModal from '../../../../components/Modals/ForgotPinModal';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_BOOK_KEEPING,
  iconColor: themeStyle.COLOR_WHITE,
};

class WalletSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      username: '',
      opened: false,
      alertModal: false,
      uploading: false,
      loading: true,
      errorAlert: false,
      pinCode: '',
      confirmPinCode: '',
      enablePin: true,
      confirmPinModal: false,
      msgToDisplay:
        this.props?.route?.params?.prev_screen == 'Profile'
          ? 'Wallet Profile Settings Updated Successfully'
          : 'New Profile Created Successfully',
    };
  }

  componentDidMount = () => {
    this._getWalletProfile();
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftProfile
          color={themeStyle.COLOR_BOOK_KEEPING}
          strokeColor={themeStyle.COLOR_BOOK_KEEPING}
          navigation={this.props.navigation}
        />
      ),
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

  _keyboardDidShow = () => {
    this.setState({opened: true});
  };

  _keyboardDidHide = () => {
    this.setState({opened: false});
  };

  _getWalletProfile = () => {
    ProfileServices.getWalletProfileSettings(this.props.user.userData.token)
      .then(res => {
        this.setState({
          oldPin: res.data.data.pincode != null ? res.data.data.pincode : '',
          username: this.props.user.userData.name,
          loading: false,
          enablePin: res.data.data.pincode_enabled,
        });
      })
      .catch(err => {
        this.setState({
          errorAlert: true,
          msgToDisplay: 'Oh, shoot! Try again',
          loading: false,
        });
      });
  };

  handleContinue = () => {
    const {pinCode, confirmPinCode, enablePin} = this.state;
    if (pinCode.length) {
      if (pinCode == confirmPinCode) {
        let data = {
          pincode: pinCode,
          pincode_enabled: enablePin,
        };

        ProfileServices.setWalletProfileSettings(
          data,
          this.props.user.userData.token,
        )
          .then(res => {
            this.setState({
              uploading: false,
              alertModal: true,
              msgToDisplay:
                this.props?.route?.params?.prev_screen == 'Profile'
                  ? 'Wallet Profile Settings Updated Successfully'
                  : 'New Profile Created Successfully',
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
          msgToDisplay: `Pin code doesn't match`,
          submit: true,
          alertModal: true,
          uploading: false,
        });
      }
    } else {
      this.setState({
        errorAlert: true,
        msgToDisplay: 'Please add your pin',
        submit: true,
        alertModal: true,
        uploading: false,
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

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.PRIMARY_TINT_COLOR}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      username,
      alertModal,
      msgToDisplay,
      loading,
      uploading,
      oldPin,
      enablePin,
    } = this.state;
    return (
      <Container>
        {loading | uploading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <KeyboardAwareScrollView>
                <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
                  <Text style={styles.heading2}>
                    {oldPin.length ? 'Set Pin For' : 'Create'} Your {'\n'}Wallet{' '}
                    <Text
                      style={[
                        styles.heading,
                        {
                          color: themeStyle.COLOR_BOOK_KEEPING,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {username}
                    </Text>
                  </Text>
                  <View style={{marginTop: 40, ...styles.rowContainer}}>
                    <Text style={styles.desc1}>Enable Pin</Text>
                    <ToggleSwitch
                      animationSpeed={3}
                      isOn={enablePin}
                      onColor={themeStyle.COLOR_BOOK_KEEPING}
                      offColor={'#38474F'}
                      label=""
                      thumbOffStyle={{backgroundColor: '#fff'}}
                      thumbOnStyle={{backgroundColor: '#fff'}}
                      labelStyle={styles.labelStyle}
                      size="medium"
                      onToggle={isOn => this.setState({enablePin: isOn})}
                    />
                  </View>
                  {enablePin ? (
                    <>
                      <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change Pin</Text>
                      </TouchableOpacity>
                      <View style={{...styles.margin, marginTop: '5%'}}>
                        <Text style={styles.desc1}>Enter Pin</Text>
                        <View style={styles.inputConttainer}>
                          <View style={{}}>
                            <SmoothPinCodeInput
                              cellSize={60}
                              cellStyle={{
                                borderWidth: 2,
                                borderRadius: 8,
                                borderColor: themeStyle.COLOR_BLACK,
                              }}
                              cellStyleFocused={{
                                borderColor: themeStyle.COLOR_BLACK,
                              }}
                              mask={
                                <View
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 25,
                                    backgroundColor:
                                      themeStyle.COLOR_BLACK_LIGHT,
                                  }}></View>
                              }
                              maskDelay={500}
                              password={true}
                              value={this.state.pinCode}
                              onTextChange={code =>
                                this.setState({pinCode: code})
                              }
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{...styles.margin, marginTop: '5%'}}>
                        <Text style={styles.desc1}>Confirm Pin</Text>
                        <View style={styles.inputConttainer}>
                          <View style={{}}>
                            <SmoothPinCodeInput
                              // ref={this.pinRef}
                              cellSize={60}
                              cellStyle={{
                                borderWidth: 2,
                                borderRadius: 8,
                                borderColor: themeStyle.COLOR_BLACK,
                              }}
                              cellStyleFocused={{
                                borderColor: themeStyle.COLOR_BLACK,
                              }}
                              mask={
                                <View
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 25,
                                    backgroundColor:
                                      themeStyle.COLOR_BLACK_LIGHT,
                                  }}></View>
                              }
                              maskDelay={500}
                              password={true}
                              value={this.state.confirmPinCode}
                              onTextChange={code =>
                                this.setState({confirmPinCode: code})
                              }
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() =>
                            this.setState({confirmPinModal: true})
                          }>
                          <Text style={styles.buttonText}>Forgot Pin?</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : null}
                </View>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              <Button
                titleColor={themeStyle.COLOR_BLACK}
                walletbg
                title={
                  this.props.route.params.prev_screen == route.PROFILE ||
                  this.props.route.params.prev_screen == 'Reset'
                    ? 'Update'
                    : 'Register'
                }
                onPress={() => {
                  this.setState({uploading: true}, () => this.handleContinue());
                }}
              />
            </View>
          </>
        )}
        <ForgotPinModal
          visible={this.state.confirmPinModal}
          onClose={() => this.setState({confirmPinModal: false})}
          confirm={() => this.setState({confirmPinModal: false})}
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
export default connect(mapStateToProps, mapDispatchToProps)(WalletSetting);
