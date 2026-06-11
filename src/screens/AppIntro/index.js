import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Share,
  Image,
  Alert,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import themeStyle from '../../assets/styles/theme.style';
import Icon from '../../components/Icon';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Button, Input} from '../../components';
import {VerticalSpacer} from '../../lib/utils/global';
import {AuthServices} from '../../services';
import {connect} from 'react-redux';

const data = [
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/1.png'),
  // },
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/2.png'),
  // },
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/3.png'),
  // },
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/4.png'),
  // },
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/5.png'),
  // },
  // {
  //   text: '',
  //   image: require('../../assets/images/tourHubScreen/6.png'),
  // },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    resizeMode: 'cover',
  },
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.35,
    alignSelf: 'center',
  },
  text: {
    color: themeStyle.COLOR_WHITE,
    // marginTop: 92,
    textAlign: 'center',
  },
  text1: {
    textAlign: 'center',
    fontSize: themeStyle.FONT_SIZE_XLARGE,
    marginVertical: 10,
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: '5%',
    margin: '5%',
    borderRadius: 15,
  },
  desc1: {
    // textAlign: 'center',
    color: themeStyle.COLOR_BLACK,
    fontSize: themeStyle.FONT_SIZE_LARGE,
    marginVertical: 10,
  },
});

class AppIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refferModal: false,
      refferalCode: '',
    };
  }

  _renderDoneButton = () => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => {
          // this.setState({ refferModal: true })
          this.props.navigation.replace(route.GENERALPROFILE);
        }}
      >
        <Icon.Ionicons
          name="md-checkmark-done-circle"
          color={themeStyle.COLOR_WHITE}
          size={24}
        />
      </TouchableOpacity>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>{'Next'}</Text>
      </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>{'Skip'}</Text>
      </View>
    );
  };
  _renderItem = ({item}) => {
    return (
      <ImageBackground
        resizeMode="contain"
        style={styles.slide}
        source={item.image}
      >
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    );
  };

  _keyExtractor = item => item.text;

  render() {
    const {refferModal, refferalCode} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          showSkipButton
          data={data}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderSkipButton={this._renderSkipButton}
        />
        {/* <View
          style={
            (styles.modalContainer, { margin: 0, justifyContent: 'center' })
          }>
          <View style={styles.modalContainer}>
            <>

              <View style={styles.container}>
                <Image
                  source={require('../../assets/gifs/refer-a-friend.gif')}
                  resizeMode="contain"
                  style={styles.gif}
                />
                <Text style={[styles.text1, { fontFamily: themeStyle.FONT_MEDIUM }]}>
                  Have been referred by someone?
                </Text>
                <Text style={styles.text1}>
                  If you have a referral code, enter it down below
                </Text>
              </View>
              <View style={{}}>
                <Text style={styles.desc1}>Enter Refferal Code</Text>
                <Input silver placeholder="Enter code here" value={refferalCode} onChangeText={(e) => this.setState({ refferalCode: e })} />
                <Button title="Enter" onPress={() => {
                  if (refferalCode != "") {
                    AuthServices.redeemRefferalReward({ code: refferalCode }, this.props.user.userData.token)
                      .then((res) => {
                        Alert.alert("Invitation code accepted","",[{
                          text:"Ok",
                          onPress:()=>this.props.navigation.replace(route.GENERALPROFILE)
                        }])
                      })
                      .catch((err) => Alert.alert(err.response.data.message))
                  } else {
                    Alert.alert("Please add refferal code.")
                  }
                }} pinkbg titleColor="#D95591" />
                {VerticalSpacer()}
                <Button title="Skip" onPress={async () => {
                  this.setState({refferModal:false})
                  // this.props.navigation.replace(route.MAIN)
                  this.props.navigation.replace(route.GENERALPROFILE)
                }} pagerbg titleColor="#000000" />
              </View>
            </>
          </View>
        </View> */}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

export default connect(mapStateToProps)(AppIntro);
