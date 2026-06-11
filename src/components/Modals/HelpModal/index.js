import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../lib/utils/constants';
import Help from '../../../assets/svg/question-mark-outline.svg';
import HelpFaq from '../../../assets/svg/help-faq.svg';

const HelpModal = ({visible, onClose, confirm, onPress}) => {
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Help />
              <Text style={styles.needHelp}>Need Help</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.card}>
              <Text style={styles.text}>
                For more Information on identification, please click here
              </Text>
              <Text style={styles.textStyle}>
                For more Information on identification, please click here For
                more Information on identification, please click here
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Text style={styles.infoText}>
                For more Information please click here
              </Text>
              <TouchableOpacity
                onPress={onPress}
                style={{
                  backgroundColor: themeStyle.CYAN_BLUE,
                  borderRadius: 5,
                  marginLeft: 6,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 4,
                }}>
                <HelpFaq />
                <Text style={styles.faq}>FAQ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HelpModal;

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
  line: {
    height: 1,
    backgroundColor: themeStyle.CYAN_BLUE,
    width: '54%',
    marginVertical: 7,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  dropdown: {alignSelf: 'center', marginTop: 10, width: 40, height: 40},
  text: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    alignSelf: 'flex-start',
    marginTop: 13,
    marginBottom: 6,
  },
  card: {
    borderColor: themeStyle.CYAN_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#EEE',
    marginTop: 20,
  },
  needHelp: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    color: '#0B90CF',
    marginLeft: 7,
  },
  faq: {
    fontSize: 17,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    padding: 4,
  },
  infoText: {
    fontSize: 13,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
});
