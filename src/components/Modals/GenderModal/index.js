import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import Button from '../../Button';
import {Icon} from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import {route} from '../../../lib/utils/constants';
import AuthenticationHeader from '../../AuthenticationHeader';

const LoginOrSignup = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={2500}
      transparent
      backdropColor="transparent"
      animationOutTiming={1000}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <AuthenticationHeader
          navigation={props.navigation}
          heading={'Select Gender'}
        />
        <View style={{marginTop: '5%', marginBottom: '10%'}}>
          <Text style={styles.grayText}>Please select you gender</Text>
          <View>
            <TouchableOpacity
              onPress={() => props.onSelect('male', true)}
              style={
                props.male
                  ? styles.selectedButtonContainer
                  : styles.buttonContainer
              }>
              <Text style={styles.textStyle}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onSelect('female', true)}
              style={
                props.female
                  ? styles.selectedButtonContainer
                  : styles.buttonContainer
              }>
              <Text style={styles.textStyle}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onSelect('nonBinary', true)}
              style={
                props.nonBinary
                  ? styles.selectedButtonContainer
                  : styles.buttonContainer
              }>
              <Text style={styles.textStyle}>Non Binary</Text>
            </TouchableOpacity>
          </View>
          <Button title={'Continue'} onPress={props.onContinue} />
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
    textAlign: 'left',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    padding: '5%',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: '5%',
    borderColor: '#959FAE',
  },
  selectedButtonContainer: {
    padding: '5%',
    borderWidth: 0.5,
    backgroundColor: '#959FAE',
    borderRadius: 10,
    marginTop: '5%',
    borderColor: '#959FAE',
  },
  textContainer: {
    // justifyContent: "flex-start",
    marginTop: '5%',
    marginBottom: '15%',
  },
});

export default LoginOrSignup;
