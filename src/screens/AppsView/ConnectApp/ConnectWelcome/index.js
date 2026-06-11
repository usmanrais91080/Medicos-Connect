import React, {Component} from 'react';

import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Icon} from '../../../../components';

import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import ConnectMenu from '../ConnectMenu';

class ConnectWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* {this.state.boost ? <Boost /> : null}
                  <TouchableOpacity onPress={() => { this.setState({ filter: true }) }} style={{ marginLeft: 15 }} ><Filter /></TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => this.setState({ visible: true })} style={{ marginLeft: 15 }}  ><Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} /></TouchableOpacity> */}
      </View>
    );
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.svgContainer}></View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Welcome to Connect</Text>
            {/* <Text style={styles.desc}>Swipe up every time you find a person with all the qualities you
                                prefer in a bff or soulmate. Let’s get connected!.</Text> */}
          </View>
          <View style={styles.btnContainer}>
            {/* <Text style={styles.desc}>Select mode</Text> */}
            <Button
              title={'Get Started'}
              red
              onPress={() =>
                this.props.navigation.navigate(route.CONNECTDISCLAIMER, {
                  mode: 'Dating',
                  prev_screen: this.props.route?.params?.prev_screen,
                })
              }
            />
            {/* <Button title={'BFF'} red onPress={() =>
                                // this.props.navigation.navigate(route.CONNECTHOME, { bff: true, mode: 'BFF' })}
                                this.props.navigation.navigate(route.CONNECTUSERPROFILE)
                            } /> */}
            {/* <Text style={styles.desc}>You can change mode in settings as well</Text> */}
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectModes: state.connectReducer?.connectProfessions || {},
    user: state.authReducer || {},
  };
};

export default connect(mapStateToProps)(ConnectWelcome);
