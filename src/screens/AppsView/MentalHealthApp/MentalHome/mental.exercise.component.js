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
import Emoji from '../../../../assets/svg/clock.svg';
import { StatusBar } from 'react-native';
import { LOCAL_STORAGE_KEYS, storeLocalData, getLocalData } from '../../../../lib/utils/localstorage';

//BottomMenu
export const ExerciseMenu = props => {
  const { visible, onClose, onPressButton, emojiImage, emojiOnPress, done } =
    props;
  const [intervalExer, setIntervalExer] = useState('');

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      animationInTiming={800}
      animationOutTiming={100}
      style={(styles.modalContainer, { margin: 0 })}>
      {props.tab == 1 ?
        <View
          style={{
            ...styles.modalContainer,
            backgroundColor: themeStyle.COLOR_WHITE,
          }}>
          <StatusBar backgroundColor={themeStyle.COLOR_EXERCISE_TEXT} />
          <View
            style={{
              height: 2,
              width: 25,
              backgroundColor: themeStyle.COLOR_GREY,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              padding: '2%',
              width: '100%',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => onClose()}>
                <Icon.AntDesign name={'down'} size={20} color={'#303030'} />
              </TouchableOpacity>
            </View>
            {/* <View>
              <TouchableOpacity onPress={emojiOnPress} style={{ marginRight: 5 }}>
                {emojiImage != '' ? (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      // backgroundColor: 'red',
                    }}
                    source={{ uri: emojiImage?.image }}
                  />
                ) : (
                  <Emoji />
                )}
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={{ marginVertical: '10%', marginHorizontal: '7%' }}>
            <Text style={[styles.textStyle, { fontSize: 20 }]}>
              {'How Often Do You\n'}
              <Text style={{ color: themeStyle.COLOR_EXERCISE_TEXT, fontFamily: themeStyle.FONT_BOLD }}>
                {'Sprint?'}
              </Text>{' '}
            </Text>
          </View>
          <>
            <View
              style={{
                // marginHorizontal: '5%',
                marginVertical: '3%',
              }}></View>
            <View style={{ marginHorizontal: "10%" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle1,
                    {
                      backgroundColor:
                        intervalExer === 'Less than 50 Meters'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('Less than 50 Meters')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Less than 50'}
                  </Text>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Meters'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle1,
                    {
                      backgroundColor:
                        intervalExer === '50 - 100 Meters'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('50 - 100 Meters')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'50 - 100 '}
                  </Text>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Meters'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle1,
                    {
                      backgroundColor:
                        intervalExer === '100 - 150 Meters'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('100 - 150 Meters')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'100 - 150'}
                  </Text>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Meters'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle1,
                    {
                      backgroundColor:
                        intervalExer === 'More than 200 Meters'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('More than 200 Meters')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'More than 200'}

                  </Text>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Meters'}
                  </Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity
                style={styles.buttonStyleDone}
                onPress={() => onPressButton(intervalExer)}>
                <Text style={[styles.textStyleMenu, styles.textCenter]}>
                  {'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </View>

        :
        props?.tab == 2 ?
          <View
            style={{
              ...styles.modalContainer,
              backgroundColor: themeStyle.COLOR_WHITE,
            }}>
            <StatusBar backgroundColor={themeStyle.COLOR_EXERCISE_TEXT} />
            <View
              style={{
                height: 2,
                width: 25,
                backgroundColor: themeStyle.COLOR_GREY,
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                padding: '2%',
                width: '100%',
                flexDirection: 'row',
                height: 45,
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 10,
                  width: '100%',
                }}>
                <TouchableOpacity onPress={() => onClose()}>
                  <Icon.AntDesign name={'down'} size={20} color={'#303030'} />
                </TouchableOpacity>
              </View>
              <View>


              </View>
            </View>
            <View style={{ marginVertical: '10%', marginHorizontal: '7%' }}>
              <Text style={[styles.textStyle, { fontSize: 20 }]}>
                {'Set'} <Text style={{ color: themeStyle.COLOR_EXERCISE_TEXT, fontFamily: themeStyle.FONT_BOLD }}>
                  {'Reminder?'}
                </Text>{' '}

              </Text>
            </View>
            <>

              <View
                style={{
                  // marginHorizontal: '5%',
                  marginVertical: '3%',
                }}></View>
              <View style={{ alignItems: 'center' }}>

                <Emoji />
                <Text style={[styles.textStyle, styles.textCenter]}>
                  {'Set workout reminder'}
                </Text>
                <TouchableOpacity style={styles.timeContainer}>
                  <Text style={[styles.textStyle, styles.textCenter, { fontSize: 30 }]}>
                    {'07:00 pm'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyleDone}
                  onPress={async () => {
                    await storeLocalData(LOCAL_STORAGE_KEYS.showExersiceModal, JSON.stringify(true));
                    onClose();
                     props.navigation.navigate(route.MENTALEXERCISE)
                    // await storeLocalData(LOCAL_STORAGE_KEYS.showExersiceModal, JSON.stringify(true));
                    // setTimeout(() => {
                    //   console.log(getLocalData(LOCAL_STORAGE_KEYS.showExersiceModal));
                    // }, 5000);
                  }}>
                  <Text style={[styles.textStyleMenu, styles.textCenter]}>
                    {'Finish'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
          :
          <View
            style={{
              ...styles.modalContainer,
              backgroundColor: themeStyle.COLOR_WHITE,
            }}>
            <StatusBar backgroundColor={themeStyle.COLOR_EXERCISE_TEXT} />
            <View
              style={{
                height: 2,
                width: 25,
                backgroundColor: themeStyle.COLOR_GREY,
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                padding: '2%',
                width: '100%',
                flexDirection: 'row',
                height: 45,
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 10,
                  width: '100%',
                }}>
                <TouchableOpacity onPress={() => onClose()}>
                  <Icon.AntDesign name={'down'} size={20} color={'#303030'} />
                </TouchableOpacity>
              </View>
              {/* <View>
                <TouchableOpacity onPress={emojiOnPress} style={{ marginRight: 5 }}>
                  {emojiImage != '' ? (
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        // backgroundColor: 'red',
                      }}
                      source={{ uri: emojiImage?.image }}
                    />
                  ) : (
                    <Emoji />
                  )}
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={{ marginVertical: '10%', marginHorizontal: '7%' }}>
              <Text style={[styles.textStyle, { fontSize: 20 }]}>
                {'How Often Do You\n'}
                <Text style={{ color: themeStyle.COLOR_EXERCISE_TEXT, fontFamily: themeStyle.FONT_BOLD }}>
                  {'Exercise?'}
                </Text>{' '}
              </Text>
            </View>
            <>
              <View
                style={{
                  // marginHorizontal: '5%',
                  marginVertical: '3%',
                }}></View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        intervalExer === 'Never'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('Never')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Never'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        intervalExer === 'Rarely'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('Rarely')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Rarely'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        intervalExer === 'Regularly'
                          ? themeStyle.MENTAL_DARK
                          : 'white',
                    },
                  ]}
                  onPress={() => setIntervalExer('Regularly')}>
                  <Text style={[styles.textStyle, styles.textCenter]}>
                    {'Regularly'}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor:
                    intervalExer === 'Over 4 Times A Week'
                      ? themeStyle.COLOR_EXERCISE_BUTTON
                      : 'white',
                },
              ]}
              onPress={() => setIntervalExer('Over 4 Times A Week')}>
              <Text style={[styles.textStyleMenu, styles.textCenter]}>
                {'Over 4 Times A Week'}
              </Text>
            </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.buttonStyleDone}
                  onPress={() => onPressButton(intervalExer)}>
                  <Text style={[styles.textStyleMenu, styles.textCenter]}>
                    {'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>}
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
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  modalContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    // width: '70%',
    color: themeStyle.COLOR_WHITE,
    // fontWeight: '700',
    // textDecorationLine: 'underline',
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.MENTAL_DARK,
    marginBottom: '6%',
    height: 60,
    width: SCREEN_WIDTH * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle1: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.MENTAL_DARK,
    marginBottom: '6%',
    height: 100,
    width: SCREEN_WIDTH * 0.375,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyleDone: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_EXERCISE_BUTTON,
    marginTop: '30%',
    height: 45,
    width: SCREEN_WIDTH * 0.8,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: 'center',
    backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON,
  },
  textCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  timeContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: themeStyle.MENTAL_DARK,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    marginTop: "5%",
    paddingHorizontal: "5%"
  }
});
