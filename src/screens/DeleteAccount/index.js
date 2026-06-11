import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {Icon, Loader} from '../../components';
import Modal from 'react-native-modal';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {HorizontalSpacer} from '../../lib/utils/global';
import {AuthServices} from '../../services';
import commonStyle from '../../assets/styles/common.style';
import {clearAllLocalData} from '../../lib/utils/localstorage';

class DeleteAccount extends Component {
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
    this.setState({loading: true});
    AuthServices.deleteAccount(this.props.user.userData.token)
      .then(async res => {
        this.setState({loading: false});
        this.props.navigation.replace(route.LOGINORSIGNUP);
        await clearAllLocalData();
      })
      .catch(async err => {
        this.setState({loading: false});
      });
  };
  render() {
    const {loading} = this.state;
    return (
      <Modal
        isVisible={this.state.visible}
        animationInTiming={1000}
        onBackdropPress={() => {
          this.setState({visible: false});
          this.props.setVisible(false);
        }}
        backdropColor="transparent"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{margin: 0}}>
        <View
          style={{
            flexDirection: 'row',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
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
              paddingHorizontal: '5%',
              paddingVertical: '5%',
            }}>
            {loading ? (
              <Loader />
            ) : (
              <View style={{flex: 1, marginTop: '5%'}}>
                <View style={styles.menuContainer}>
                  <Icon.AntDesign
                    onPress={() => {
                      // this.setState({ visible: false });
                      this.props.navigation.goBack();

                      // setTimeout(() => {
                      //   this.setState({visible: false})
                      // }, 500);
                      // this.props.setVisible(true)
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
                <View
                  style={{marginHorizontal: '5%', marginTop: 30, flex: 0.8}}>
                  <View style={styles.rowContainer1}>
                    <Icon.AntDesign
                      onPress={() => this.props.navigation.goBack()}
                      name="arrowleft"
                      size={20}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <Text style={styles.deleteHeading}>
                      Delete your Account
                    </Text>
                  </View>
                  <Text style={styles.deleteText}>
                    Click on Delete Account button to delete your Medicos
                    Connect Account and erase all of your personal data stored
                    by Medicos Connect.
                  </Text>
                  <Text style={styles.deleteText}>
                    Once completed this action cannot be undone.
                  </Text>
                </View>
                <View style={{flex: 0.1}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.handleContinue();
                    }}
                    style={styles.btnPrimary}>
                    <Text style={styles.itemText2}>
                      {'Delete Your Account'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
      //                     {
      //                         submit && !username.length ? <Text style={[themeStyle1.errorText,{marginBottom:10}]}>Please fill this field.</Text>
      //                             :
      //                             null
      //                     }
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
