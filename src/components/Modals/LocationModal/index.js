import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

const LocationModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={600}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBackgroundContainer}>
          <Text style={styles.headingText}>
            Medicos Connect wants to use your location.
          </Text>

          <Text style={styles.headingText2}>
            Medicos Connect uses your location for featuers like Soical posts,
            Connect, Advertising, Career job search and more.
          </Text>

          <View
            style={props.alert ? styles.btnContainer1 : styles.btnContainer}>
            <TouchableOpacity
              onPress={() => props.confirm()}
              style={styles.greenbtn}>
              <Text style={styles.whiteText}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.cancel()}
              style={styles.redBtn}>
              <Text style={styles.whiteText}>Dont Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '5%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  greenbtn: {
    backgroundColor: themeStyle.COLOR_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  redBtn: {
    backgroundColor: themeStyle.COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  whiteText: {
    fontSize: 15,
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  modalBackgroundContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '10%',
    width: SCREEN_WIDTH * 0.9,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  colorText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.BAR_COLOR,
  },
  blackText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: '#B2B2B2',
  },
  headingText: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 15,
    marginHorizontal: '5%',
    color: themeStyle.BUTTON_COLOR,
    textAlign: 'center',
    marginBottom: '10%',
  },
  headingText2: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    marginHorizontal: '5%',
    color: '#959FAE',
    textAlign: 'center',
    marginBottom: '5%',
  },
});

export default LocationModal;
