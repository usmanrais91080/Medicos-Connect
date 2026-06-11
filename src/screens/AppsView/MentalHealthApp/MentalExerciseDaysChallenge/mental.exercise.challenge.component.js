import React from 'react';
import Modal from 'react-native-modal';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import VideoIcon from '../../../../assets/svg/video-icon.svg';

//BottomMenu
export const ChallengeComponent = props => {
  const {visible, onClose, uri, name, description, youtube_link, onPressVideo} =
    props;

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInRight'}
      backdropColor={'#E9E9E9'}
      animationOut={'slideOutRight'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={styles.modalContainer}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
          elevation: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 5,
              borderRadius: 5,
              backgroundColor: themeStyle.ORANGE,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon.AntDesign
              name="arrowleft"
              color={themeStyle.COLOR_WHITE}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH * 0.75,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              marginTop: '5%',
              alignSelf: 'center',
              height: SCREEN_HEIGHT * 0.35,
              width: SCREEN_WIDTH * 0.73,
              borderRadius: 15,
              backgroundColor: themeStyle.COLOR_WHITE,
            }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.35,
                width: SCREEN_WIDTH * 0.73,
                resizeMode: 'contain',
              }}
              source={{uri: uri}}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: '5%',
            }}>
            <Text style={styles.textStyleMenu}>{name}</Text>
          </View>
          <View style={{marginHorizontal: '5%', marginBottom: 20}}>
            <Text style={styles.textStyle}>{description}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.playVideoButton}
          onPress={() => {
            if (youtube_link) {
              onPressVideo();
            }
          }}>
          <VideoIcon />
          <Text style={styles.playButtonText}>Play Video</Text>
        </TouchableOpacity>
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
  playVideoButton: {
    backgroundColor: themeStyle.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: SCREEN_WIDTH * 0.7,
    borderRadius: 11,
    flexDirection: 'row',
  },
  playButtonText: {
    color: themeStyle.WHITE_SMOKE,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 9,
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
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  modalContainer: {
    padding: '5%',
    borderRadius: 15,
    height: SCREEN_HEIGHT * 0.75,
    alignSelf: 'center',
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_BOLD,
    // width: '70%',
    fontSize: 25,
    textTransform: 'capitalize',
    color: themeStyle.COLOR_BLACK_LIGHT,
    // fontWeight: '700'
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
    textAlign: 'center',
  },
});
