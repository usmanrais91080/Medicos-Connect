import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import {
  Container,
  AuthenticationSlide,
  Button,
  AuthenticationHeader,
} from '../../components';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

import styles from './style';

export default class SelectGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      male: false,
      female: false,
      nonBinary: false,
    };
  }

  // componentDidMount = () => {
  //     this.focusListener = this.props.navigation.addListener('focus', () => {
  //         this.showModal()
  //     })
  // }

  // showModal = () => {
  //     this.setState({ visible: true })
  // }

  setGender = (key, value) => {
    switch (key) {
      case 'male':
        this.setState({male: value, female: false, nonBinary: false});
        break;
      case 'female':
        this.setState({male: false, female: value, nonBinary: false});
        break;
      case 'nonBinary':
        this.setState({male: false, female: false, nonBinary: value});
        break;

      default:
        break;
    }
  };

  handleContinueFunction = () => {
    const {male, female, nonBinary} = this.state;
    let userData = {
      ...this.props.route.params.userData,
      gender: male ? 'Male' : female ? 'Female' : nonBinary ? 'Non Binary' : '',
    };
    this.props.navigation.navigate(route.PHONENUMBER, {userData});
  };

  render() {
    const {navigation} = this.props;
    const {male, female, nonBinary, gender, visible} = this.state;
    return (
      <Container>
        <View style={styles.upperContainer}>
          {/* <AuthenticationSlide /> */}
          {/* <Video
          repeat={true}
          source={require('../../assets/gifs/video.mp4')}
          controls={false}
          style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT}}
          resizeMode={'stretch'}/>                     */}
        </View>
        <View
          style={[
            styles.lowerContainer,
            {height: this.state.expandView == true ? null : 0},
          ]}
        >
          <View style={styles.modalContainer}>
            <AuthenticationHeader
              onBack={() => navigation.goBack()}
              navigation={navigation}
              heading={'Select Gender'}
            />
            <View style={{marginTop: '5%', marginBottom: '10%'}}>
              <Text style={styles.grayText}>
                Please select your gender (optional)
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => this.setGender('male', true)}
                  style={
                    male
                      ? styles.selectedButtonContainer
                      : styles.buttonContainer
                  }
                >
                  <Text style={styles.textStyle}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setGender('female', true)}
                  style={
                    female
                      ? styles.selectedButtonContainer
                      : styles.buttonContainer
                  }
                >
                  <Text style={styles.textStyle}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setGender('nonBinary', true)}
                  style={
                    nonBinary
                      ? styles.selectedButtonContainer
                      : styles.buttonContainer
                  }
                >
                  <Text style={styles.textStyle}>Non Binary</Text>
                </TouchableOpacity>
              </View>
              <Button
                title={'Continue'}
                onPress={() => this.handleContinueFunction()}
              />
            </View>
          </View>
        </View>
        {/* <GenderModal
                    visible={visible}
                    navigation={navigation}
                    male={male}
                    female={female}
                    nonBinary={nonBinary}
                    onSelect={(key, value) => this.setGender(key, value)}
                    onContinue={() => {
                        this.setState({ visible: false });
                        navigation.navigate(route.VERIFYPHONE)
                    }} /> */}
      </Container>
    );
  }
}
