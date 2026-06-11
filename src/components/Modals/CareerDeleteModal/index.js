import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {Text} from 'react-native';

const CareerDeleteModal = ({visible, cancel, removeJob}) => {
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      animationInTiming={100}
      animationOutTiming={100}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
        }}>
        <Image
          source={require('../../../assets/gifs/bin.gif')}
          style={styles.image}
        />
        <Text style={styles.text}>Are you sure you want to delete this?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={removeJob} style={styles.delete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancel} style={styles.cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // height: SCREEN_HEIGHT * 0.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 24,
  },
  delete: {
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 53,
  },
  cancel: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderWidth: 1,
    borderColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 53,
  },
  buttonText: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});

export default CareerDeleteModal;
