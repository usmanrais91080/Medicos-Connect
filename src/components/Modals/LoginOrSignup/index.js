import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import Button from '../../Button';
import { Icon } from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import { SCREEN_HEIGHT } from '../../../lib/utils/constants';

const LoginOrSignup = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      transparent
      backdropColor="transparent"
      animationOutTiming={200}
      style={(styles.modalContainer, { margin: 0, justifyContent: 'flex-end' })}>
      <View style={styles.modalContainer}>
        <View style={{ flex: 1,flexDirection:"row" }}>
          <TouchableOpacity onPress={props.onSignup} style={styles.signUpButton}>
            <Text style={styles.grayText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onLogin} style={styles.signInButton}>
            <Text style={styles.whiteText} >Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title={'Sign In'} onPress={props.onLogin} />
        <Button title={'Sign Up'} onPress={props.onSignup} />
        <View style={styles.textContainer}>
          <Text style={styles.grayText}>
            By creating new account you agree{' '}
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.grayText}>with our</Text>
            <Text onPress={() => props.onTerms()} style={styles.linkText}>
              {' '}
              Terms & Conditions
            </Text>
            <Text style={styles.grayText}> and </Text>
            <Text onPress={() => props.onPrivacy()} style={styles.linkText}>
              Privacy Policy
            </Text>
          </View>
        </View> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // padding: '5%',
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: "row",
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,

  },
  signUpButton: {
    flex: 0.5,
    backgroundColor: "#BAD7E9",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.2
  },
  signInButton: {
    flex: 0.5,
    backgroundColor: "#0B90CF",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    height: SCREEN_HEIGHT * 0.2
  },
  grayText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
  },
  whiteText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: themeStyle.FONT_BOLD,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '10%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginOrSignup;
