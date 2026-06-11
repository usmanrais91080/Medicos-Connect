import React from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Delete from '../../../../assets/svg/bin.svg';
import Share from '../../../../assets/svg/pencilBottomMenu.svg';
import CloseIcon from '../../../../assets/svg/close-icon.svg';

//BottomMenu
export const ShareMenu = props => {
  const {visible, onClose, onPressButton} = props;
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
          height: SCREEN_HEIGHT * 0.25,
          borderWidth: 2,
          borderColor: themeStyle.PURPLE_COLOR,
        }}>
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <>
          <View
            style={{
              marginVertical: '2%',
            }}></View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: SCREEN_WIDTH * 0.15,
            }}>
            <TouchableOpacity
              style={styles.bottomMenuButton}
              onPress={() => onPressButton('share')}>
              <Share />
              <Text style={styles.textStyleMenu}>{'Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomMenuButton}
              onPress={() => onPressButton('trash')}>
              <Delete width={20} height={19} />
              <Text style={styles.textStyleMenu}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_MENTAL,
    borderRadius: 10,
    padding: '4%',
    marginBottom: '1%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  grayTextStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  grayTextStyle1: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  modalContainer: {
    padding: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.3,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 24,
    color: themeStyle.COLOR_WHITE,
    fontSize: 16,
    width: 65,
  },
  bottomMenuButton: {
    padding: 12,
    borderRadius: 10,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: themeStyle.PURPLE_COLOR,
    marginBottom: 10,
  },
  close: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});
