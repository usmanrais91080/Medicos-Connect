import React, {Component} from 'react';

import {Text, TouchableOpacity, View, ScrollView, Alert} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Button,
  Container,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  Loader,
  UploadingModal,
} from '../../../../components';

import Career from '../../../../assets/svg/careerwelcome.svg';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HeaderRight} from './social.settings.component';
import SocialSettingsFunction from './social.settings.function';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';

class SocialSettings2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['Lorem ipsum dolor sit amet,  consetetur sadipscing'],
      job: '',
      selfDesc: '',
      allowQr: true,
      blockContact: true,
      uploading: false,
      messageRequest: 'Anyone',
      ielts: true,
      data: [
        {
          id: 1,
          label: 'Anyone',
          value: 'Anyone',
        },
        {id: 1, label: 'Mutual Friends', value: 'Mutual'},
      ],
      toefl: false,
      oet: false,
      alertModal: false,
      msgToDisplay:
        this.props?.route?.params?.data?.prev_screen == 'Profile'
          ? 'Social Profile Settings Updated Successfully'
          : 'New Profile Created Successfully',
    };
  }

  componentDidMount = () => {
    this.setState({
      selfDesc: this.props.route.params.data.selfDesc,
      allowQr: this.props.route.params.data.allowQr,
      messageRequest: this.props.route.params.data.messageRequest,
    });
    this.props.navigation.setOptions({
      // headerRight: () => <HeaderRight onPress={() => this.setState({ visible: true })} />,
      headerLeft: () => <HeaderLeft color navigation={this.props.navigation} />,
    });
  };

  handleContinue = () => {
    this.setState({uploading: true});
    const {
      username,
      followRequest,
      privateAccount,
      uploadImages,
      selfDesc,
      prev_screen,
    } = this.props.route.params.data;
    const {allowQr, blockContact, messageRequest} = this.state;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('account_is_private', privateAccount);
    formData.append('follow_request', followRequest);
    formData.append('message_request', messageRequest);
    formData.append('about', selfDesc);
    formData.append('is_qr_sharing_allow', allowQr);
    if (uploadImages.includes('file://')) {
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
        this.setState({uploading: false, alertModal: true});
        // Alert.alert('Success', prev_screen == "Profile" ?  "Social Profile Settings Updated Successfully" : profile_setup, [{
        //     text: "Cancel",
        //     onPress: () => {
        //         this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", "");
        //         if (prev_screen == route.HOME) {
        //             this.props.navigation.replace(route.MAIN, { screen: route.HOME })
        //         } else {
        //             this.props.navigation.replace(route.MAIN, { screen: route.PROFILE })
        //         }
        //     },
        //     style: "cancel"
        // },
        // // Need to replace navigation container too
        // {
        //     text: "OK", onPress: () => {
        //         this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", "");
        //         if (prev_screen == route.HOME) {
        //             this.props.navigation.replace(route.MAIN, { screen: route.HOME })
        //         } else {
        //             this.props.navigation.replace(route.MAIN, { screen: route.PROFILE })
        //         }
        //     }
        // }])
      })
      .catch(err => {
        this.setState({uploading: false});
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  alertConfrim = () => {
    const {prev_screen} = this.props.route.params;
    this.props.authActions.getUserProfile(
      {token: this.props.user.userData.token},
      '',
      '',
    );
    // this.props.authActions.getUserModules({ token: this.props.user.userData.token });

    if (prev_screen == route.HOME) {
      this.props.navigation.replace(route.MAIN, {screen: route.HOME});
    } else {
      this.props.navigation.replace(route.MAIN, {screen: route.PROFILE});
    }
  };

  render() {
    const {
      tags,
      job,
      allowQr,
      blockContact,
      toefl,
      ielts,
      data,
      selfDesc,
      messageRequest,
      alertModal,
      uploading,
      msgToDisplay,
    } = this.state;

    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{paddingBottom: '20%'}}>
                <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
                  <View style={styles.rowContainer}>
                    <View>
                      <Text style={styles.grayText}>Message requests</Text>
                      <Text
                        style={{
                          ...styles.desc1,
                          marginLeft: 0,
                          width: SCREEN_WIDTH * 0.4,
                        }}>
                        Choose who can send you message requests.
                      </Text>
                    </View>
                    <DropDownPicker
                      items={data}
                      disabled={true}
                      placeholder=""
                      defaultValue={messageRequest}
                      containerStyle={styles.dropDownContainer}
                      style={styles.dropDownContainerStyle}
                      globalTextStyle={{
                        fontFamily: themeStyle.FONT_REGULAR,
                        fontSize: 12,
                      }}
                      arrowStyle={styles.arrowStyle}
                      dropDownStyle={styles.dropDownStyle}
                      arrowSize={20}
                      customArrowDown={(size, color) => (
                        <Icon.FontAwesome
                          name="caret-down"
                          color={'#959FAE'}
                          size={size}
                        />
                      )}
                      customArrowUp={(size, color) => (
                        <Icon.FontAwesome
                          name="caret-up"
                          color={'#959FAE'}
                          size={size}
                        />
                      )}
                      itemStyle={{justifyContent: 'flex-start'}}
                      onChangeItem={item => {
                        // let array = [...tags];
                        // array.push(item.value)
                        this.setState({
                          messageRequest: item.value,
                        });
                      }}
                    />
                  </View>

                  <View style={styles.margin}>
                    <View style={{...styles.rowContainer, marginTop: '10%'}}>
                      <Text style={styles.grayText}>Allow QR code sharing</Text>
                      <ToggleSwitch
                        animationSpeed={3}
                        isOn={allowQr}
                        onColor={'#38474F'}
                        offColor={'#38474F'}
                        label=""
                        thumbOffStyle={{backgroundColor: '#fff'}}
                        thumbOnStyle={{backgroundColor: '#1DD1A1'}}
                        labelStyle={styles.labelStyle}
                        size="medium"
                        onToggle={isOn => this.setState({allowQr: isOn})}
                      />
                    </View>
                    {/* <Text style={styles.greenText}>View Profile</Text> */}
                  </View>
                  {/* <View style={styles.margin}>
                    <View style={styles.rowContainer}>
                        <View>
                        <Text style={styles.grayText}>Block contacts</Text>
                        <Text style={{ ...styles.desc1, marginLeft: 0, width: SCREEN_WIDTH * 0.4 }}>Choose if you want to block your phone contacts</Text>
                        </View>
                        <ToggleSwitch
  animationSpeed={3}
                            isOn={blockContact}
                            onColor={'#38474F'}
                            offColor={'#38474F'}
                            label=""
                            thumbOffStyle={{ backgroundColor: '#fff' }}
                            thumbOnStyle={{ backgroundColor: '#1DD1A1' }}
                            labelStyle={styles.labelStyle}
                            size="medium"
                            onToggle={isOn => this.setState({ blockContact: isOn })}
                        />
                    </View>
                </View> */}
                </View>
              </ScrollView>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.lightDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.darkDash}></View>
              </View>
              <Button
                title={'Continue'}
                onPress={() => this.handleContinue()}
              />
            </View>
            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.setState({alertModal: false});
                this.alertConfrim();
              }}
              text={msgToDisplay}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SocialSettings2nd);
