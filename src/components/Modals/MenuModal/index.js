import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../Button';
import {Icon} from '../..';
import themeStyle from '../../../assets/styles/theme.style';

const MenuModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      transparent
      backdropColor="transparent"
      animationOutTiming={200}
      style={
        (styles.modalContainer,
        {
          margin: 0,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        })
      }>
      <View style={styles.modalContainer}>
        <Button title={'Sign In'} onPress={props?.onLogin} />
        <Button title={'Sign Up'} onPress={props?.onSignup} />
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
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
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

export default MenuModal;
