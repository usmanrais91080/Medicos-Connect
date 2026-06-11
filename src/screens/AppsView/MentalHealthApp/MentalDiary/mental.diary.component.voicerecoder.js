import moment from 'moment';
import React, { useState } from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

//BottomMenu
export const VoiceRecorder = props => {
  const {visible, onClose,onOpenCameraPress,onOpenGalleryPress} = props;
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setrecordTime] = useState(null);
  const [playTime, setplayTime] = useState(null);
  const [duration, setduration] = useState(null);
  const [currentPositionSec, setcurrentPositionSec] = useState(null);
  const [currentDurationSec, setcurrentDurationSec] = useState(null)



const audioRecorderPlayer = new AudioRecorderPlayer();

const onStartRecord = async () => {
  const result = await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener((e) => {
    setrecordSecs(e.currentPosition);
    setrecordTime(audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ))
    // this.setState({
    //   recordSecs: e.currentPosition,
    //   recordTime: audioRecorderPlayer.mmssss(
    //     Math.floor(e.currentPosition),
    //   ),
    // });
    return;
  });
};

const onStopRecord = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  setrecordSecs(0);

};

const onStartPlay = async () => {
  const msg = await audioRecorderPlayer.startPlayer();
  audioRecorderPlayer.addPlayBackListener((e) => {

    setcurrentPositionSec(e.currentPosition)
    setcurrentDurationSec(e.duration);
    setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
    setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    // this.setState({
    //   currentPositionSec: e.currentPosition,
    //   currentDurationSec: e.duration,
    //   playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //   duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    // });
    return;
  });
};

const onPausePlay = async () => {
  awaitaudioRecorderPlayer.pausePlayer();
};

const onStopPlay = async () => {
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};
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
              onPress={() =>{
                onStartRecord();
            }
            //onOpenCameraPress
        }>
              <Text style={styles.textStyleMenu}>{'start'}</Text>
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
              onPress={() =>{
                onStopRecord()
              }
                // onOpenGalleryPress
                // props.OnReset();
              }
            >
              <Text style={styles.textStyleMenu}>{'stop'}</Text>
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
              onPress={() =>{
                onStartPlay()
              }
                // onOpenGalleryPress
                // props.OnReset();
              }
            >
              <Text style={styles.textStyleMenu}>{'play'}</Text>
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
    height: SCREEN_HEIGHT * 0.35,
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
