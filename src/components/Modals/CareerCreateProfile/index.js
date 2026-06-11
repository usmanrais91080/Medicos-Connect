import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';

const CareerCreateProfile = ({visible, onClose, onNext, text}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={onClose}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 40,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.FONT_BOLD,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: themeStyle.CARRER_PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  skipButton: {
    borderWidth: 2,
    borderColor: themeStyle.CARRER_PRIMARY,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  buttonText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  skip: {
    color: themeStyle.CARRER_PRIMARY,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});

export default CareerCreateProfile;
