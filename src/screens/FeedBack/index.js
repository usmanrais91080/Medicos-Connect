import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList, ScrollView} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {
  Container,
  DeleteModal,
  Icon,
  Input,
  Button,
  UploadingModal,
  Loader,
} from '../../components';
import Modal from 'react-native-modal';
import Send from '../../assets/svg/send.svg';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {isPasswordValid} from '../../lib/utils/global';
import themeStyle1 from '../../assets/styles/common.style';
import {ProfileServices} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Lottie from 'lottie-react-native';

class FeedBackSettings extends Component {
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
    // this.props.navigation.setOptions({
    //   headerLeft: () => this.headerLeft(),
    // });
  };

  //   headerLeft = () => {
  //     return (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <TouchableOpacity
  //           style={{marginLeft: 15}}
  //           onPress={() => this.props.navigation.goBack()}>
  //           <Icon.AntDesign
  //             name={'arrowleft'}
  //             size={25}
  //             color={themeStyle.PRIMARY_TINT_COLOR}
  //           />
  //         </TouchableOpacity>
  //         <TouchableOpacity style={{marginLeft: 20}}>
  //           <Text style={styles.menuHeading}>Password</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };

  handleContinue = () => {
    const {username, phone, location, submit} = this.state;
    if (username && submit) {
      this.setState({loading: true});
      let data = {
        message: username,
      };
      this.setState({loading: true});
      ProfileServices.postFeedback(data, this.props.user.userData.token)
        .then(res => {
          this.setState({loading: false, visible: false});
          setTimeout(() => {
            this.props.setFeedFunc();
          }, 500);
        })
        .catch(err => {
          this.setState({loading: false, submit: true});
        });
    } else {
      this.setState({
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
      uploading,
      submit,
      loading,
      showOld,
      showNew,
      showConfirm,
    } = this.state;
    return (
      <Modal
        isVisible={this.state.visible}
        animationInTiming={1000}
        onBackdropPress={() => {
          this.setState({visible: false});
          setTimeout(() => {
            this.props.setFeedFunc();
          }, 500);
        }}
        backdropColor="transparent"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{margin: 0}}
      >
        <View
          style={{
            flexDirection: 'row',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
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
            <View style={{flex: 0.6, marginTop: '5%'}}>
              {this.state.loading ? (
                <Loader />
              ) : (
                <View style={{flex: 1}}>
                  <View style={{flex: 0.3}}>
                    <View style={styles.menuContainer}>
                      <Icon.AntDesign
                        onPress={() => {
                          this.setState({visible: false});

                          setTimeout(() => {
                            this.props.setFeedFunc();
                          }, 500);
                        }}
                        name="arrowleft"
                        size={25}
                        color={themeStyle.COLOR_BLACK}
                      />
                      <Text style={styles.menuheading}>Settings</Text>
                    </View>
                    <View style={{marginHorizontal: '5%'}}>
                      <Text style={styles.feedBackHeading}>Feedback</Text>
                      {/* <Lottie
                        source={require('../../assets/animation/feedback-letter.json')}
                        autoPlay
                        loop
                        height={SCREEN_HEIGHT * 0.5}
                        width={SCREEN_WIDTH * 0.65}
                        style={{ marginTop: '5%', }}
                      /> */}
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.feedBackText,
                      {
                        marginHorizontal: 5,
                        textAlign: 'center',
                        top: this.state.margin ? '5%' : '60%',
                      },
                    ]}
                  >
                    This is where you leave your feed back
                  </Text>
                  <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
                    <View
                      style={{
                        flexDirection: 'row',

                        // justifyContent: '',
                        alignItems: 'center',
                        top: this.state.margin ? '5%' : '80%',
                        // left: 20,
                      }}
                    >
                      <View style={styles.btnContainer}>
                        <Input
                          blackborder
                          value={username}
                          containerStyle={{height: 50}}
                          autoCapitalize="none"
                          onFocus={() => {
                            this.setState({margin: true});
                          }}
                          onBlur={() => {
                            this.setState({margin: false});
                          }}
                          width={SCREEN_WIDTH * 0.55}
                          // secureTextEntry={showOld}
                          placeholder="Enter Feedback"
                          onChangeText={job => this.setState({username: job})}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({submit: true}, () =>
                            this.handleContinue(),
                          )
                        }
                        style={{
                          backgroundColor: '#80C683',
                          padding: 15,
                          borderRadius: 30,
                          alignSelf: 'center',
                          marginTop: -20,
                          marginHorizontal: '5%',
                        }}
                      >
                        <Send />
                      </TouchableOpacity>
                    </View>
                    {submit && !username.length ? (
                      <Text
                        style={[
                          themeStyle1.errorText,
                          {top: this.state.margin ? '5%' : '60%'},
                        ]}
                      >
                        Please fill this field.
                      </Text>
                    ) : null}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
      // <Container>
      //   <View style={styles.container}>
      //     <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
      //     <View style={{ marginHorizontal: "5%" }}>
      //     <View style={{ ...styles.margin, marginTop: "5%" }}>
      //                     <Text style={styles.desc1}>Old Password</Text>
      //                     <View style={styles.inputConttainer}>
      //                         <Input colorProps value={username} autoCapitalize="none" secureTextEntry={showOld}
      //                             placeholder="" onChangeText={(job) => this.setState({ username: job })}
      //                             rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({showOld:!showOld})}><Icon.Ionicons name={showOld ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>}
      //                         />
      //                     </View>

      //                 </View>
      //                 <View style={styles.margin}>
      //                     <Text style={styles.desc1}>New Password</Text>
      //                     <View style={styles.inputConttainer}>
      //                         <Input colorProps value={phone} autoCapitalize="none" secureTextEntry={showNew}
      //                             placeholder="" onChangeText={(job) => this.setState({ phone: job })}
      //                             rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({showNew:!showNew})}><Icon.Ionicons name={showNew ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>}

      //                         />
      //                     </View>
      //                     {
      //                      submit && !phone.length ? <Text style={[themeStyle1.errorText,{marginBottom:10}]}>Please fill this field.</Text>

      //                         // submit && !phone.length ? <Text style={commonStyle.errorText}>Please fill this field.</Text>
      //                             :
      //                             null
      //                     }
      //                 </View>
      //                 <View style={styles.margin}>
      //                     <Text style={styles.desc1}>Confirm Password</Text>
      //                     <View style={styles.inputConttainer}>
      //                         <Input colorProps value={location} autoCapitalize="none" secureTextEntry={showConfirm}
      //                             placeholder="" onChangeText={(job) => this.setState({ location: job })}
      //                             rightIcon={<TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({showConfirm:!showConfirm})}><Icon.Ionicons name={showConfirm ? 'eye-sharp' : 'eye-off-sharp'} size={24} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>}
      //                         />
      //                          {
      //                         submit && !location.length ? <Text style={[themeStyle1.errorText,{marginBottom:10}]}>Please fill this field.</Text>
      //                             :
      //                             null
      //                         }
      //                     <View style={{alignSelf:'center',marginVertical:'2%',justifyContent:'center'}}><BarPasswordStrengthDisplay  width={SCREEN_WIDTH*0.9} password={phone}/></View>
      //                     </View>

      //                 </View>
      //             </View>
      //     </KeyboardAwareScrollView>
      //     </View>
      //     <View style={styles.btnContainer}>
      //         <Button loading={loading} title={'Continue'} onPress={() => this.setState({ submit: true }, () => this.handleContinue())} />
      //     </View>
      //     <UploadingModal visible={uploading} />
      //     <DeleteModal alert visible={alertModal} confirm={() => { this.setState({ alertModal: false });}} text={msgToDisplay} />
      // </Container >
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackSettings);
