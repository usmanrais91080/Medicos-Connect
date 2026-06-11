import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StripeHook} from '../../components';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {getLocalData, LOCAL_STORAGE_KEYS} from '../../lib/utils/localstorage';
import {authActions} from '../../redux/actions/auth';
import Video from 'react-native-video';
import analytics from '@react-native-firebase/analytics';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: true,
    };
    analytics().logEvent('app_download_initiated');
  }

  componentDidMount = () => {
    setTimeout(async () => {
      let {navigation} = this?.props;
      const userData = await getLocalData(LOCAL_STORAGE_KEYS.USER);
      if (userData) {
        await this.props.authActions.refreshToken(
          JSON.parse(userData),
          navigation.replace,
        );
      } else {
        await navigation.replace(route.LOGINORSIGNUP);
      }
    }, 100);
  };

  render() {
    return (
      <>
        <Video
          repeat={false}
          source={require('../../assets/Main-Splash.mp4')}
          controls={false}
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          resizeMode={'stretch'}
        />
        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View style={{ borderRadius: 20, width: "80%", padding: "5%", backgroundColor: themeStyle.COLOR_WHITE }}>
              <Text style={{ fontSize: 18 }}>Medicos Connect App collects and stores your name, email, phone, medical ID, pictures and contact list to enable all features and to get you verified on our platform</Text>
              <View style={{ marginTop: "5%", flexDirection: "row", justifyContent: "space-between" }}>
                <Button title={"Cancel"} width={SCREEN_WIDTH * 0.3} onPress={() => this.setState({ alertModal: true }, () => this.moveToHome())} />

                <Button parrot title={"Accept"} width={SCREEN_WIDTH * 0.3} onPress={() => this.setState({ alertModal: true }, () => this.acceptConsent())} />

              </View>
            </View>

          </View> */}
        {/* <FastImage
          loop={false}
          // onLoad={async () => {
          //   if (Platform.OS == "android") {
          //     let { navigation, user } = this?.props;

          //     const userData = await getLocalData(LOCAL_STORAGE_KEYS.USER);
          //     if (userData) {
          //       await this.props.authActions.refreshToken(JSON.parse(userData), navigation.replace);
          //     } else {
          //       setTimeout(async () => {
          //         await navigation.replace(route.LOGINORSIGNUP);
          //       }, 5000);
          //     }
          //   }
          // }}
          style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, position: "absolute" }} source={require("../../assets/gifs/splash-1.gif")} /> */}

        <StripeHook />
      </>

      // <View style={styles.container}>
      //     <ActivityIndicator color={THEME.COLOR_BLACK} size={"small"} />
      //     <Text style={styles.textStyle}>Loading...</Text>
      // </View>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
