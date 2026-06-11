import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
  Share,
} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import Clipboard from '@react-native-clipboard/clipboard';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {Button, Container, HeaderLeft, Input, Loader} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import InviteFriendsvg from '../../assets/svg/Invite_Friend.svg';
import Copy from '../../assets/svg/copy.svg';
import {Image} from 'react-native';
import {AuthServices} from '../../services';

class InviteFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      loading: true,
    };
  }
  componentDidMount = () => {
    this.getRefferalCode();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft color={'#000'} navigation={this.props.navigation} />
      ),
    });
  };

  getRefferalCode = () => {
    AuthServices.getRefferalCode(this.props.user.userData.token)
      .then(res => {
        this.setState({code: res.data.data.code, loading: false});
      })
      .catch(err => {
        //  console.log(err.response);
      });
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <InviteFriendsvg />
              {/* <Image
                  source={require('../../assets/gifs/refer-a-friend.gif')}
                  resizeMode="contain"
                  style={styles.gif}
                /> */}
              <Text style={[styles.text, {fontFamily: themeStyle.FONT_MEDIUM}]}>
                Invite a friend
              </Text>
              <Text style={styles.text}>
                Share with your friends in medical profession and help the
                community grow.
              </Text>
            </View>
            <View style={{padding: 20}}>
              <Text style={styles.desc1}>Share link</Text>
              <View style={styles.inputConttainer}>
                <Text style={{color: themeStyle.PRIMARY_TINT_COLOR}}>
                  {this.state.code}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(`Hey there! Have you heard about Medicos Connect yet? It's a great platform for connecting with other medical professionals and staying up to date with the latest news and trends in the field.\nPlus, they offer a range of valuable resources and tools to help you advance your career.\n
                    www.medicosconnect.com\n\n\nYou can also use my referral code ${this.state.code} to sign up!`);
                  }}>
                  <Copy />
                </TouchableOpacity>
              </View>
              <Button
                title="Share"
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message: `Hey there! Have you heard about Medicos Connect yet? It's a great platform for connecting with other medical professionals and staying up to date with the latest news and trends in the field.\nPlus, they offer a range of valuable resources and tools to help you advance your career.\n
                      www.medicosconnect.com\n\n\nYou can also use my referral code ${this.state.code} to sign up!`,
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                      }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                pinkbg
                titleColor="#D95591"
              />
            </View>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
