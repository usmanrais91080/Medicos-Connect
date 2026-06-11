import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../redux/actions/auth';
import {DeleteModal, Icon, Input} from '../../../components';
import styles from './styles';
import themeStyle from '../../../assets/styles/theme.style';
import {HorizontalSpacer} from '../../../lib/utils/global';
import themeStyle1 from '../../../assets/styles/common.style';
import {AuthServices, ProfileServices} from '../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActivityIndicator} from 'react-native-paper';
import commonStyle from '../../../assets/styles/common.style';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: false,
      msgToDisplay: '',
      username: '',
      phone: '',
      location: '',
      uploading: false,
      submit: false,
      loading: false,
      done: false,
      showOld: true,
      showNew: true,
      showConfirm: true,
      visible: false,
    };
  }
  componentDidMount = () => {
    this.setState({visible: true});
  };

  handleContinue = () => {
    const {username, location, submit, phone} = this.state;
    if (username && location && submit && phone) {
      if (phone === location) {
        let data = {
          old_password: username,
          new_password: phone,
        };
        this.setState({loading: true});
        ProfileServices.resetPassword(data, this.props.user.userData.token)
          .then(res => {
            if (res?.data?.message == 'Old Password is not correct.') {
            } else {
              this.setState({loading: false}, () =>
                this.props.navigation.goBack(),
              );
            }
          })
          .catch(err => {
            this.setState({
              msgToDisplay: `${err.response?.data?.message}`,
              alertModal: true,
              loading: false,
              submit: true,
            });
          });
      } else {
        this.setState({
          msgToDisplay: 'Password does not match',
          alertModal: true,
          submit: true,
        });
      }
    } else {
      alert('Fill all fields');
      this.setState({
        // msgToDisplay: 'Fill all fields',
        // alertModal: true,
        submit: true,
      });
    }
  };
  render() {
    const {
      alertModal,
      msgToDisplay,
      phone,
      location,
      username,
      submit,
      loading,
      showOld,
      showNew,
      showConfirm,
    } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: '#444444',
        }}
      >
        <View
          style={{
            flex: 0.3,
            flexDirection: 'column',
          }}
        ></View>
        <View
          style={{
            flex: 0.8,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
          }}
        >
          <View style={{flex: 1, marginTop: '5%'}}>
            <View style={{flex: 1}}>
              <View style={styles.menuContainer}>
                <Icon.AntDesign
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  name="arrowleft"
                  size={25}
                  color={themeStyle.COLOR_BLACK}
                />
                {HorizontalSpacer()}
                <Text style={commonStyle.burgerMenuHeadingTextStyle}>
                  Settings
                </Text>
              </View>
              <View style={styles.rowContainer1}>
                <Text style={styles.securityHeading}>Change Password</Text>
              </View>

              <Text
                style={[
                  styles.desc1,
                  {
                    marginVertical: '3%',
                    marginLeft: '5%',
                    fontFamily: themeStyle.FONT_MEDIUM,
                  },
                ]}
              >
                Change Your Password
              </Text>
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: '10%'}}
              >
                <View style={{marginHorizontal: '5%'}}>
                  <View style={{...styles.margin, marginTop: '2.5%'}}>
                    <Text style={styles.desc1}>Old Password</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        blackborder
                        value={username}
                        autoCapitalize="none"
                        secureTextEntry={showOld}
                        placeholder=""
                        onChangeText={job => this.setState({username: job})}
                        rightIcon={
                          <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => this.setState({showOld: !showOld})}
                          >
                            <Icon.Ionicons
                              name={showOld ? 'eye-sharp' : 'eye-off-sharp'}
                              size={24}
                              color={themeStyle.COLOR_BLACK}
                            />
                          </TouchableOpacity>
                        }
                      />
                    </View>
                    {submit && !username.length ? (
                      <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                        Please fill this field.
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.margin}>
                    <Text style={styles.desc1}>New Password</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        blackborder
                        value={phone}
                        autoCapitalize="none"
                        secureTextEntry={showNew}
                        placeholder=""
                        onChangeText={job => this.setState({phone: job})}
                        rightIcon={
                          <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => this.setState({showNew: !showNew})}
                          >
                            <Icon.Ionicons
                              name={showNew ? 'eye-sharp' : 'eye-off-sharp'}
                              size={24}
                              color={themeStyle.COLOR_BLACK}
                            />
                          </TouchableOpacity>
                        }
                      />
                    </View>
                    {submit && !phone.length ? (
                      <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                        Please fill this field.
                      </Text>
                    ) : // submit && !phone.length ? <Text style={commonStyle.errorText}>Please fill this field.</Text>
                    null}
                  </View>
                  <View style={styles.margin}>
                    <Text style={styles.desc1}>Confirm Password</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        blackborder
                        value={location}
                        autoCapitalize="none"
                        secureTextEntry={showConfirm}
                        placeholder=""
                        onChangeText={job => this.setState({location: job})}
                        rightIcon={
                          <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() =>
                              this.setState({showConfirm: !showConfirm})
                            }
                          >
                            <Icon.Ionicons
                              name={showConfirm ? 'eye-sharp' : 'eye-off-sharp'}
                              size={24}
                              color={themeStyle.COLOR_BLACK}
                            />
                          </TouchableOpacity>
                        }
                      />
                      {submit && !location.length ? (
                        <Text
                          style={[themeStyle1.errorText, {marginBottom: 10}]}
                        >
                          Please fill this field.
                        </Text>
                      ) : null}
                      <View style={{alignItems: 'flex-end'}}>
                        <View>
                          <Text style={{color: '#004E47', marginVertical: 10}}>
                            Forgot your old Password?
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            let data = {
                              email: this.props.user.userData.email,
                            };
                            AuthServices.forgetPassword(data)
                              .then(res => {
                                if (res.data.code == 200) {
                                  this.setState({
                                    alertModal: true,
                                    msgToDisplay: res.data.message,
                                  });
                                } else {
                                  this.setState({
                                    alertModal: true,
                                    msgToDisplay: res.data.message,
                                  });
                                }
                              })
                              .catch(err => {
                                this.setState({
                                  loading: false,
                                  alertModal: true,
                                  msgToDisplay: err.response.data.message,
                                });
                              });
                          }}
                          style={{
                            backgroundColor: '#CECCCC',
                            paddingHorizontal: 15,
                            paddingVertical: 7.5,
                            borderRadius: 20,
                          }}
                        >
                          <Text>Send Email</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                disabled={loading}
                title={'Continue'}
                onPress={() =>
                  this.setState({submit: true}, () => this.handleContinue())
                }
                style={styles.btnPrimary}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.itemText2}>{'Update'}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
