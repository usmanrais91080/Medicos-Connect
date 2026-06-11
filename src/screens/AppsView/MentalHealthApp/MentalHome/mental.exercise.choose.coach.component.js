import moment from 'moment';
import React, { useState } from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import Emoji from '../../../../assets/svg/happy.svg';
import FemaleCoach from '../../../../assets/svg/femalecoach.svg';
import MaleCoach from '../../../../assets/svg/malecoach.svg';

export const ChooseCoach = props => {
  const { visible, onClose, onPressButton, emojiImage, emojiOnPress, done } = props;
  const [male, setMale] = useState(true);
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInRight'}
      backdropColor={'#E9E9E9'}
      animationOut={'slideOutRight'}
      animationInTiming={800}
      animationOutTiming={800}
      style={(styles.modalContainer, { margin: 0, justifyContent: 'flex-end' })}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%', marginHorizontal: '2%' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={onClose}>
              <Icon.AntDesign
                name={'arrowleft'}
                size={20}
                color={'#303030'}
              />
            </TouchableOpacity>
            <Text style={[styles.textStyle, { marginHorizontal: '2%' }]}>{'Exercise'}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={emojiOnPress}
              style={{ marginRight: 5 }}>
              {emojiImage != '' ? (
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15
                    // backgroundColor: 'red',
                  }}
                  source={{ uri: emojiImage?.image }}
                />
              ) : (
                <Emoji />
              )}
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ marginVertical: '15%', marginHorizontal: '2%' }}>
          <Text style={styles.textStyleMenu}>{'Choose Your Coach'}</Text>
        </View>
        <>
          <View
            style={{
              // marginHorizontal: '5%',
              marginVertical: '3%',
            }}></View>
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[styles.buttonStyle, {
                // borderWidth: male ? 1 : 0,
                borderRadius: 15,
                backgroundColor: male ? themeStyle.COLOR_EXERCISE_BUTTON : 'white',
              }]}
              onPress={() => setMale(true)}
            >
              <MaleCoach />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {
                // borderWidth: male === false ? 1 : 0,
                borderRadius: 15,
                backgroundColor: male === false ? themeStyle.COLOR_EXERCISE_BUTTON : 'white',
              }]}
              onPress={() => setMale(false)}
            >
              <FemaleCoach />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.buttonStyleDone}
            onPress={() => done(male)}
          >
            <Text style={[styles.textStyleMenu, styles.textCenter]}>{'Done'}</Text>
          </TouchableOpacity>
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
    fontSize: 13,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  modalContainer: {
    padding: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '70%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontWeight: '700'
    // textDecorationLine: 'underline',
  },
  buttonStyle: {
    padding: 10,
    marginTop: '15%',
    marginBottom: '6%',
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.4,
    alignItems: 'center',

  },
  buttonStyleDone: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_EXERCISE_BUTTON,
    marginTop: '40%',
    height: 45,
    width: SCREEN_WIDTH * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON,

  },
  textCenter: {
    alignSelf: 'center',
    textAlign: 'center'
  }
});
