import React, {Component} from 'react';
import {Alert, Linking, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Container, LoginOrSignup} from '../../components';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import LOGO from '../../assets/svg/loader3.svg';
import Slide from '../../assets/svg/slide.svg';

import styles from './style';
import {LOCAL_STORAGE_KEYS, storeLocalData} from '../../lib/utils/localstorage';

export default class LoginorSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      signUp: false,
    };
  }

  componentDidMount = () => {
    // Geolocation.requestAuthorization();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.showModal();
    });
  };

  showModal = () => {
    this.setState({visible: true});
  };

  render() {
    const {visible} = this.state;
    const {navigation} = this.props;
    return (
      <Container>
        <View style={styles.upperContainer}>
          <View
            style={{
              marginTop: '75%',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.8,
              alignSelf: 'center',
            }}>
            <LOGO height={SCREEN_HEIGHT * 0.2} />
          </View>
        </View>
        <LoginOrSignup
          visible={visible}
          navigation={navigation}
          onPrivacy={() => {
            this.setState({visible: false}, () =>
              navigation.navigate(route.PRIVACYPOLICY),
            );
            // setTimeout(() => { navigation.navigate(route.PRIVACYPOLICY) }, 300);
          }}
          onTerms={() => {
            this.setState({visible: false}, () =>
              navigation.navigate(route.TERMANDCONDITIONS),
            );
            // setTimeout(() => { navigation.navigate(route.TERMANDCONDITIONS) }, 300);
          }}
          onSignup={() => {
            this.setState({visible: false});
            setTimeout(() => {
              navigation.navigate(route.SIGNUP);
            }, 10);
          }}
          onLogin={() => {
            this.setState({visible: false});
            setTimeout(() => {
              navigation.navigate(route.LOGIN);
            }, 10);
          }}
        />
      </Container>
    );
  }
}
