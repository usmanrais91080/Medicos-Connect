import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import {
  Icon,
  DeleteModal,
  Container,
  Input,
  Button,
  ToggleButton,
  HeaderLeft,
  Loader,
} from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './style';
import {ProfileServices} from '../../../../services';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

class WalletSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      username: '',
      originalPin: '',
      newPin: '',
      conPin: '',
      lock: true,
      face_id: true,
      fingerprint: true,
      shareQr: true,
      hidePassword: true,
      hidePassword2: true,
      hidePassword3: true,
      notification: true,
      alertModal: false,
      uploading: false,
      loading: true,
      errorAlert: false,
      msgToDisplay: 'Wallet Pin Updated Successfully',
      pinModalConfirm: false,
    };
  }

  componentDidMount = () => {
    this._getWalletProfile();
    this.props.navigation.setOptions({
      headerLeft: () => <HeaderLeft navigation={this.props.navigation} />,
    });
  };

  _getWalletProfile = () => {
    ProfileServices.getWalletProfileSettings(this.props.user.userData.token)
      .then(res => {
        this.setState({
          username: res.data.data.pincode != null ? res.data.data.pincode : '',
          fingerprint: res.data.data.fingerprint_enabled,
          face_id: res.data.data.faceid_enabled,
          shareQr: res.data.data.qr_sharing_is_allow,
          notification: res.data.data.allow_notifications,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          errorAlert: true,
          msgToDisplay: 'Oh, shoot! Try again',
          loading: false,
        });
        // Alert.alert('Error', err.message);
      });
  };

  handleContinue = () => {
    const {
      username,
      notification,
      shareQr,
      fingerprint,
      face_id,
      originalPin,
      newPin,
      conPin,
    } = this.state;
    if (originalPin?.length && newPin?.length && conPin?.length) {
      if (originalPin === username) {
        if (newPin === conPin) {
          let data = {
            pincode: newPin,
            fingerprint_enabled: fingerprint,
            faceid_enabled: face_id,
            qr_sharing_is_allow: shareQr,
            allow_notifications: notification == true ? 'true' : 'false',
          };

          ProfileServices.setWalletProfileSettings(
            data,
            this.props.user.userData.token,
          )
            .then(res => {
              this.setState({
                uploading: false,
                pinModalConfirm: true,
                msgToDisplay: 'Wallet Pin Updated Successfully',
                originalPin: '',
                newPin: '',
                conPin: '',
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
            msgToDisplay: 'Pins do not match',
            submit: true,
            alertModal: true,
            uploading: false,
          });
        }
      } else {
        this.setState({
          errorAlert: true,
          msgToDisplay: 'Old pin is not correct',
          submit: true,
          alertModal: true,
          uploading: false,
        });
      }
    } else {
      this.setState({
        errorAlert: true,
        msgToDisplay:
          conPin == '' && newPin == ''
            ? 'Please add your pin'
            : 'Please add your new pin',
        submit: true,
        alertModal: true,
        uploading: false,
      });
    }
  };

  alertConfrim = () => {
    const {prev_screen} = this.props?.route?.params;
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
        <TouchableOpacity
        // onPress={()=> this.props.navigation.navigate(route.WALLET)}
        >
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  updateToggleLock = value => {
    this.setState({
      lock: value,
    });
  };
  updateToggleFinger = value => {
    this.setState({
      fingerprint: value,
    });
  };
  updateToggleFace = value => {
    this.setState({
      face_id: value,
    });
  };
  updateToggleQR = value => {
    this.setState({
      shareQr: value,
    });
  };
  updateToggleNotify = value => {
    this.setState({
      notification: value,
    });
  };
  render() {
    const {
      username,
      alertModal,
      msgToDisplay,
      loading,
      uploading,
      notification,
      lock,
      shareQr,
      fingerprint,
      face_id,
      hidePassword,
      originalPin,
      newPin,
      conPin,
      hidePassword2,
      hidePassword3,
      pinModalConfirm,
    } = this.state;
    return (
      <Container>
        {loading | uploading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                backgroundColor: '#444444',
              }}>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'column',
                }}></View>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 30,
                  borderTopLeftRadius: 30,
                  padding: 10,
                }}>
                <View style={styles.container}>
                  <View style={styles.menuContainer}>
                    <Icon.AntDesign
                      onPress={() => {
                        this.props.navigation.goBack();
                        // this.props.setVisible(true)

                        // setTimeout(() => {
                        //   this.setState({visible: false});
                        // }, 500);
                      }}
                      name="arrowleft"
                      size={20}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <Text style={styles.menuheading}>
                      Reset your wallet pin
                    </Text>
                  </View>
                  <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
                    <View style={{marginHorizontal: '5%'}}>
                      {/* <ToggleButton
                  onPress={this.updateToggleLock}
                  yellow
                  onState={lock}
                  title={'Lock Wallet'}
                  secondaryTitle={''}
                /> */}

                      <View style={{...styles.margin, marginTop: '5%'}}>
                        <Text style={styles.desc1}>Old Pin</Text>
                        <View style={{marginTop: '5%'}}>
                          <SmoothPinCodeInput
                            // ref={this.pinRef}
                            cellSize={50}
                            cellStyle={{
                              borderWidth: 2,
                              borderRadius: 8,
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            cellStyleFocused={{
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            mask={
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 25,
                                  backgroundColor: themeStyle.COLOR_BLACK_LIGHT,
                                }}></View>
                            }
                            maskDelay={500}
                            password={true}
                            value={this.state.originalPin}
                            onTextChange={code =>
                              this.setState({originalPin: code})
                            }
                            // onFulfill={code => this._checkCode(code)}
                          />
                        </View>

                        {/* <View style={styles.inputConttainer}>
                            <Input
                              wallet
                              keyboardType='numeric' maxLength={4} secureTextEntry={hidePassword} value={originalPin} placeholder="" onChangeText={job => this.setState({ originalPin: job })}
                              rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({ hidePassword: !hidePassword })}><Icon.Ionicons name={hidePassword ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>} />
                          </View> */}
                      </View>

                      <View style={{...styles.margin, marginTop: '5%'}}>
                        <Text style={styles.desc1}>New Pin</Text>
                        <View style={{marginTop: '5%'}}>
                          <SmoothPinCodeInput
                            // ref={this.pinRef}
                            cellSize={50}
                            cellStyle={{
                              borderWidth: 2,
                              borderRadius: 8,
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            cellStyleFocused={{
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            mask={
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 25,
                                  backgroundColor: themeStyle.COLOR_BLACK_LIGHT,
                                }}></View>
                            }
                            maskDelay={500}
                            password={true}
                            value={this.state.newPin}
                            onTextChange={code => this.setState({newPin: code})}
                            // onFulfill={code => this._checkCode(code)}
                          />
                        </View>
                        {/* <View style={styles.inputConttainer}>
                            <Input
                              wallet
                              keyboardType='numeric' maxLength={4} secureTextEntry={hidePassword2} value={newPin} placeholder="" onChangeText={job => this.setState({ newPin: job })}
                              rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({ hidePassword2: !hidePassword2 })}><Icon.Ionicons name={hidePassword2 ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>}
                            />
                          </View> */}
                      </View>

                      <View style={{...styles.margin, marginTop: '5%'}}>
                        <Text style={styles.desc1}>Confirm Pin</Text>
                        <View style={{marginTop: '5%'}}>
                          <SmoothPinCodeInput
                            // ref={this.pinRef}
                            cellSize={50}
                            cellStyle={{
                              borderWidth: 2,
                              borderRadius: 8,
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            cellStyleFocused={{
                              borderColor: themeStyle.COLOR_BOOK_KEEPING,
                            }}
                            mask={
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 25,
                                  backgroundColor: themeStyle.COLOR_BLACK_LIGHT,
                                }}></View>
                            }
                            maskDelay={500}
                            password={true}
                            value={this.state.conPin}
                            onTextChange={code => this.setState({conPin: code})}
                            // onFulfill={code => this._checkCode(code)}
                          />
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#CECCCC',
                              paddingHorizontal: 15,
                              marginTop: '5%',
                              paddingVertical: 7.5,
                              borderRadius: 20,
                            }}
                            onPress={() => {
                              this.props.navigation.navigate(
                                route.WALLETSETING,
                                {
                                  prev_screen: 'Reset',
                                },
                              );
                            }}>
                            <Text style={{color: '#004E47'}}>
                              Forgot your old pin?
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* <View style={styles.inputConttainer}>
                            <Input
                              wallet
                              keyboardType='numeric' maxLength={4} secureTextEntry={hidePassword3} value={conPin} placeholder="" onChangeText={job => this.setState({ conPin: job })}
                              rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({ hidePassword3: !hidePassword3 })}><Icon.Ionicons name={hidePassword3 ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>}
                            />
                          </View> */}
                      </View>

                      {/* <ToggleButton
                  onPress={this.updateToggleFinger}
                  yellow
                  onState={fingerprint}
                  title={'Enable Fingerprint'}
                  secondaryTitle={''}
                />

                <ToggleButton
                  onPress={this.updateToggleFace}
                  yellow
                  onState={face_id}
                  title={'Enable Face ID'}
                  secondaryTitle={''}
                />

                <ToggleButton
                  onPress={this.updateToggleQR}
                  yellow
                  onState={shareQr}
                  title={'Show QR Code'}
                  secondaryTitle={''}
                /> */}

                      {/* <View style={styles.rowContainer}>
                          <View>
                          <Text style={styles.grayText}>Notifications</Text>
                          <Text
                          style={{
                            ...styles.desc2,
                            marginLeft: '2%',
                            width: SCREEN_WIDTH * 0.6,
                          }}>
                          Allow MC Wallet to send you notifications
                        </Text>
                          </View>
                          <ToggleSwitch
  animationSpeed={3}
                            isOn={notification}
                            onColor={'#38474F'}
                            offColor={'#38474F'}
                            label=""
                            thumbOffStyle={{backgroundColor: '#fff'}}
                            thumbOnStyle={{backgroundColor: themeStyle.COLOR_YELLOW}}
                            labelStyle={styles.labelStyle}
                            size="medium"
                            onToggle={isOn => this.setState({notification: isOn})}
                          />
                        </View> */}
                      {/* <View style={styles.rowContainer}>
                  <Text style={styles.yellowText}>Delete Card Detials</Text>
                </View> */}
                    </View>
                  </ScrollView>
                </View>
                <View style={styles.btnContainer}>
                  <Button
                    customColor={themeStyle.BOOK_KEEPING_PINK}
                    title={'Update'}
                    onPress={() => {
                      this.setState({uploading: true}, () =>
                        this.handleContinue(),
                      );
                      // this.handleContinue()
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        )}

        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({
              alertModal: false,
            });
          }}
          text={msgToDisplay}
        />
        <DeleteModal
          alert
          visible={pinModalConfirm}
          confirm={() => {
            this.setState({
              alertModal: false,
            });
            this.props.navigation.goBack();
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletSetting);
