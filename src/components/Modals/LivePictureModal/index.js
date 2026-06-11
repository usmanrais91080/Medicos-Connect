import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import Tier from '../../../assets/svg/verifyPic.svg';

import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';

const UploadingModal = props => {
  return (
    <Modal isVisible={props.visible}>
      <View style={styles.modalContainer}>
        <View style={{top: 60, zIndex: 1}}>
          {/* <Image source={require('../../../assets/images/picmModal.jpeg')} style={{height:100,width:100,borderRadius:50}}/> */}
        </View>
        <View style={styles.modalBackgroundContainer}>
          <View style={{padding: '5%', marginTop: '20%'}}>
            <Text style={{fontSize: 10}}>
              <Text style={styles.blackText1}>
                Kindly take a selfie with the document you just uploaded.
              </Text>
            </Text>
            {/* <Text style={{fontSize:10}}>- <Text style={styles.blackText1}>Make sure your whole face is visible, centered and your eyes are open.</Text> </Text>   */}
            {/* <Text style={{fontSize:10}}>- <Text style={styles.blackText1}>Do not hide or alter parts of your face (no hats/beauty images/headgear).</Text> </Text>   */}

            {/* <Text style={styles.linkText}>Agree with terms and condition.</Text>    */}
          </View>
          <View style={styles.btnContainer1}>
            <TouchableOpacity
              onPress={() => props.confirm()}
              style={styles.greenbtn}
            >
              <Text style={styles.whiteText}>Continue</Text>
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
    marginTop: '10%',
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
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  modalBackgroundContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '5%',
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
  blackText1: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  linkText: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
    color: themeStyle.DASH_DARK,
    marginTop: '10%',
  },
  blackText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: '#B2B2B2',
  },
  headingText: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
    marginHorizontal: '5%',
    color: '#959FAE',
    textAlign: 'center',
  },
  headingText2: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    marginHorizontal: '5%',
    color: '#959FAE',
    textAlign: 'center',
  },
});

export default UploadingModal;
