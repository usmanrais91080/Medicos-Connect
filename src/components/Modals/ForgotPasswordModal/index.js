import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import DropDown from '../../../assets/svg/dropDown.svg';
import Icon from '../../Icon';

const ForgotPasswordModal = ({
  visible,
  onClose,
  email,
  setEmail,
  // mobile,
  // setMobile,
  onSendOtp,
}) => {
  return (
    <Modal
      isVisible={visible}
      transparent={true}
      backdropColor="rgba(0,0,0,0.5)"
      animationType="slide"
      animationInTiming={600}
      animationOutTiming={600}
      onDismiss={onClose}
      style={styles.modalContainer}
      avoidKeyboard={true}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.dropdown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <Text style={styles.text}>Send an OTP on Email</Text>
        <View style={styles.inputContainer}>
          <Icon.MaterialIcons name="email" size={24} color={themeStyle.BLUE} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>
        {/* <Text style={styles.text}>Or send an OTP on Mobile</Text>
        <View style={styles.inputContainer}>
          <Icon.Entypo name="mobile" size={24} color={themeStyle.BLUE} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="decimal-pad"
          />
        </View> */}
        <TouchableOpacity style={styles.button} onPress={onSendOtp}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    elevation: 10,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  dropdown: {
    alignSelf: 'center',
    marginTop: 10,
    width: 40,
    height: 25,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeStyle.COLOR_SILVER,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginLeft: 2,
  },
  button: {
    backgroundColor: themeStyle.BLUE,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  send: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 24,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});

export default ForgotPasswordModal;
