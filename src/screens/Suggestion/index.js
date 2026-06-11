import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList, ScrollView} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {Avatar, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {
  Container,
  DeleteModal,
  Icon,
  Button,
  UploadingModal,
} from '../../components';
import {route, SCREEN_WIDTH} from '../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {isPasswordValid} from '../../lib/utils/global';
import themeStyle1 from '../../assets/styles/common.style';
import {ProfileServices} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Slide from '../../assets/svg/appSettingBg.svg';

class Suggestion extends Component {
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
    };
  }
  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
    });
  };

  headerLeft = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => this.props.navigation.goBack()}>
          <Icon.AntDesign
            name={'arrowleft'}
            size={25}
            color={themeStyle.PRIMARY_TINT_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 20}}>
          <Text style={styles.menuHeading}>Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleContinue = () => {
    const {username, submit} = this.state;
    if (username && submit) {
      let data = {
        message: username,
      };
      this.setState({loading: true});
      ProfileServices.postFeedback(data, this.props.user.userData.token)
        .then(res => {
          this.setState({loading: false}, () => this.props.navigation.goBack());
          // Alert.alert('Success', res.message, [{
          //     text: "Cancel",
          //     onPress: () => this.props.navigation.replace(route.PROFILE),
          //     style: "cancel"
          // },
          // { text: "OK", onPress: () => this.props.navigation.replace(route.PROFILE) }])
        })
        .catch(err => {
          this.setState({
            msgToDisplay: `${err.message}`,
            alertModal: true,
            loading: false,
            submit: true,
          });
        });
    } else {
      this.setState({
        msgToDisplay: 'Please add your feedback',
        alertModal: true,
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
    } = this.state;
    return (
      <Container>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.8,
          }}>
          <View style={{alignItems: 'center'}}>
            <Slide />
          </View>
        </View>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingBottom: '30%'}}>
            <View style={{marginHorizontal: '5%'}}>
              <View style={{...styles.margin, marginTop: '45%'}}>
                {/* <Text style={styles.desc1}>Add query</Text> */}
                <View style={{marginTop: '5%'}}>
                  <Input
                    placeholder="Kindly send us your questions and feedback here. We will get back to you as soon as possible"
                    multiline={true}
                    value={username}
                    containerStyle={styles.containerStyle}
                    onChangeText={e => this.setState({username: e})}
                    placeholderTextColor={'#77777B'}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                  />
                </View>
                {submit && !username.length ? (
                  <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                    Please fill this field.
                  </Text>
                ) : null}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        {/* <Icon.Ionicons name='ios-send' size={30} style={{ color: 'white' }} */}
        <View style={styles.btnContainer}>
          <Button
            icon={
              <View style={{marginLeft: 10}}>
                <Icon.Ionicons
                  name="ios-send"
                  size={15}
                  style={{color: 'white'}}
                />
              </View>
            }
            iconRight
            loading={loading}
            title={'Send us your feedback'}
            onPress={() =>
              this.setState({submit: true}, () => this.handleContinue())
            }
          />
        </View>
        <UploadingModal visible={uploading} />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
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
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
