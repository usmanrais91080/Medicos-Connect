import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../lib/utils/constants';
import Icon from '../../Icon';

const ForgotPinModal = ({visible, onClose, confirm}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={onClose}>
              <DropDown />
            </TouchableOpacity>
            <Text style={styles.forgotPin}>Set Reminders</Text>
            <Text style={styles.text}>Send an OTP on Email</Text>
            <View style={styles.inputContainer}>
              <Icon.Ionicons
                name="mail"
                size={20}
                color={themeStyle.BOOK_KEEPING_PINK}
              />
              <TextInput placeholder="Enter Email" style={styles.input} />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={confirm}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPinModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 40,
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    elevation: 10,
  },
  modalContainer: {
    borderRadius: 26,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginBottom: 19,
  },
  dropdown: {alignSelf: 'center', marginTop: 10, width: 40, height: 40},
  forgotPin: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginBottom: 6,
    marginTop: 24,
  },
  inputContainer: {
    borderColor: '#D2D2D2',
    borderWidth: 2,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginLeft: 7,
    width: '93%',
  },
  sendButton: {
    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  send: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
});
