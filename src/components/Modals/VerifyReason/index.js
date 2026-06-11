import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
// import Tier from '../../../assets/svg/setupprofile.svg'
// import Tier from '../../../assets/svg/verifyPost.svg'
import {AuthenticationHeader, Icon, Input, Button} from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../lib/utils/constants';

const VerifyReason = props => {
  return (
    <Modal isVisible={props.visible}>
      <View style={styles.modalContainer}>
        <View style={{marginBottom: '10%'}}>
          <View style={{alignItems: 'center', marginHorizontal: '5%'}}>
            {/* <Tier /> */}
            {/* <Text style={styles.grayText1}>Verify Profile</Text>
                        <Text style={styles.grayText}>Please upload your documents to get verified with Medicos Connect.</Text> */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '45%'}}>
              <Button success title={'Continue'} onPress={props.onContinue} />
            </View>
            <View style={{width: '45%'}}>
              <Button red title={'Cancel'} onPress={props.onCancel} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  lowerContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    elevation: 2,
  },
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 15,
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText1: {
    color: '#959FAE',
    textAlign: 'center',
    marginTop: '1%',
    fontSize: 22,
    marginBottom: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
});

export default VerifyReason;
