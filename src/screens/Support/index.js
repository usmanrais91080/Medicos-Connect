import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {DeleteModal, Icon, Input, Loader} from '../../components';
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import styles from './styles';
import themeStyle from '../../assets/styles/theme.style';
import themeStyle1 from '../../assets/styles/common.style';
import {ProfileServices} from '../../services';
import {Image} from 'react-native';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: false,
      msgToDisplay: '',
      message: '',
      submit: false,
      loading: false,
      visible: false,
    };
  }
  componentDidMount = () => {
    this.setState({visible: true});
  };

  handleContinue = () => {
    const {message, submit} = this.state;
    if (message && submit) {
      this.setState({loading: true});
      let data = {
        message,
      };
      ProfileServices.addSupport(data, this.props.user.userData.token)
        .then(res => {
          this.setState({
            loading: false,
            submit: false,
            message: '',
            alertModal: true,
            msgToDisplay: 'Your message has been submitted successfully.',
          });
        })
        .catch(err => {
          this.setState({
            loading: false,
            submit: true,
            alertModal: true,
            msgToDisplay: 'Error occured while submitting message.',
          });
        });
    } else {
      this.setState({
        submit: true,
      });
    }
  };
  render() {
    const {message, submit, alertModal, msgToDisplay} = this.state;
    return (
      <Modal
        isVisible={this.state.visible}
        animationInTiming={1000}
        onBackdropPress={() => {
          this.setState({visible: false});
          setTimeout(() => {
            this.props.navigation.goBack();
          }, 500);
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
              padding: 10,
              paddingLeft: 17,
            }}>
            <View style={{flex: 0.6, marginTop: '5%'}}>
              {this.state.loading ? (
                <Loader />
              ) : (
                <View style={{flex: 1}}>
                  <View style={styles.menuContainer}>
                    <Icon.AntDesign
                      onPress={() => {
                        this.setState({visible: false});

                        setTimeout(() => {
                          this.props.navigation.goBack();
                        }, 500);
                      }}
                      name="arrowleft"
                      size={25}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <Text style={styles.menuheading}>Settings</Text>
                  </View>
                  <View style={styles.rowContainer1}>
                    <Icon.AntDesign
                      onPress={() => this.props.navigation.goBack()}
                      name="arrowleft"
                      size={20}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <Text style={styles.feedBackHeading}>Support</Text>
                  </View>
                  <Image
                    source={require('../../assets/images/support_image.png')}
                    style={{
                      height: 206,
                      width: 170,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={styles.feedBackText}>Submit your Message</Text>
                  <Text style={styles.enterMessage}>Enter message</Text>
                  <Input
                    blackborder
                    value={message}
                    autoCapitalize="none"
                    onFocus={() => {
                      this.setState({margin: true});
                    }}
                    onBlur={() => {
                      this.setState({margin: false});
                    }}
                    height={150}
                    width={SCREEN_WIDTH * 0.67}
                    placeholder="Message"
                    onChangeText={job => this.setState({message: job})}
                  />
                  {submit && message.trim().length == 0 ? (
                    <Text style={[themeStyle1.errorText, {marginTop: -10}]}>
                      Please fill this field.
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({submit: true}, () =>
                        this.handleContinue(),
                      );
                    }}
                    style={styles.sendButton}>
                    <Text style={styles.buttonText}>Send</Text>
                  </TouchableOpacity>
                  <Text style={styles.supportText}>
                    Support team will contact you on your registered Email
                  </Text>
                </View>
              )}
            </View>
          </View>
          <DeleteModal
            alert
            visible={alertModal}
            text={msgToDisplay}
            confirm={() => {
              this.setState({alertModal: false});
            }}
          />
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
