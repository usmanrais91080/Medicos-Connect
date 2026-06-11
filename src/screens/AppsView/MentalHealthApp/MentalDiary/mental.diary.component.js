import moment from 'moment';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {HorizontalSpacer, moneyFormat} from '../../../../lib/utils/global';
import themeStyle from '../../../../assets/styles/theme.style';
import Emoji from '../../../../assets/svg/happy.svg';
import Icon from '../../../../components/Icon';
import Like from '../../../../assets/svg/like-button.svg';
import Comment from '../../../../assets/svg/comment-icon.svg';
import Save from '../../../../assets/svg/save.svg';
import Report from '../../../../assets/svg/report.svg';
import Hide from '../../../../assets/svg/hide.svg';
import Block from '../../../../assets/svg/block.svg';
import Pin from '../../../../assets/svg/pin.svg';

//BottomMenu
export const BottomMenu = props => {
  const {visible, onClose,onOpenCameraPress,onOpenGalleryPress} = props;
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
        }}>
        <View
          style={{
            height: 2,
            width: 25,
            backgroundColor: themeStyle.COLOR_GREY,
            alignSelf: 'center',
          }}
        />
        <>
          <View
            style={{
              // marginHorizontal: '5%',
              marginVertical: '2%',
            }}></View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              onPress={onOpenCameraPress}
            >
              <Text style={styles.textStyleMenu}>{'Open Camera'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                marginHorizontal: '2%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              onPress={
                onOpenGalleryPress
                // props.OnReset();
              }
            >
              <Text style={styles.textStyleMenu}>{'Choose Photos'}</Text>
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
    height: SCREEN_HEIGHT * 0.25,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '70%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    // textDecorationLine: 'underline',
  },
});
