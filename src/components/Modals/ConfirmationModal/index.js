import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../lib/utils/constants';

const ConfirmationModal = ({visible, onClose, confirm, confirmText, text}) => {
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
          backgroundColor: 'rgba(255,255,255,0.6)',
        }}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={onClose}>
              <DropDown />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/gifs/bin.gif')}
              style={styles.gif}
            />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={confirm} style={styles.confirm}>
                <Text style={styles.buttonText}>{confirmText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.cancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

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
  dropdown: {
    alignSelf: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
  },
  gif: {
    width: 114,
    height: 114,
    alignSelf: 'center',
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
  },
  confirm: {
    height: 53,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.YELLOW,
    borderRadius: 10,
  },
  cancel: {
    height: 53,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.YELLOW,
  },
});
