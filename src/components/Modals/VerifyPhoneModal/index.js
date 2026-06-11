import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {AuthenticationHeader, Button, OtpInputs} from '../..';
// import { OtpInputs, AuthenticationHeader, Button } from '../../../';
import {route} from '../../../lib/utils/constants';
import themeStyle from '../../../assets/styles/theme.style';
const VerifyPhoneModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      transparent
      backdropColor="transparent"
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <AuthenticationHeader
          onBack={props.onClose}
          navigation={props.navigation}
          heading={'Verify your phone number'}
        />
        <View>
          <Text style={styles.grayText}>
            Enter code we sent you at +92 334 8776220
          </Text>
          <View style={styles.inputContainer}>
            <OtpInputs
              length={6}
              otpValue={props.code}
              setOtpValue={code => props.setCode(code)}
              error={props.error != ''}
              onFocus={() => {
                props.setError('');
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.grayText}>
            didn't receive code?{' '}
            <Text style={styles.linkText}>Resend code</Text>
          </Text>
          <Button
            loading={props.loading}
            title={'Continue'}
            onPress={() => props.onContinue()}
          />
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
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayText: {
    textAlign: 'center',
    color: '#959FAE',
    fontSize: 14,
    marginVertical: '5%',
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    color: themeStyle.BAR_COLOR,
    fontFamily: themeStyle.FONT_MEDIUM,
    textDecorationLine: 'underline',
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    marginTop: '25%',
    marginBottom: '10%',
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
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  inputContainer: {
    alignSelf: 'center',
    marginTop: '5%',
  },
});

export default VerifyPhoneModal;
