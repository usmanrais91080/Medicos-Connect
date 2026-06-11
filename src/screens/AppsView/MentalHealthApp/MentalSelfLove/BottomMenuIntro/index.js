import React from 'react';
import Modal from 'react-native-modal';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import themeStyle from '../../../../../assets/styles/theme.style';

import styles from './style';
import {SCREEN_HEIGHT} from '../../../../../lib/utils/constants';
import {BlurView} from '@react-native-community/blur';

export const BottomMenuIntro = props => {
  const {visible, onClose, data, onButtonPress, buttonTitle} = props;
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'transparent'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={{
        margin: 0,
      }}>
      <View
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingVertical: 10,
          paddingBottom: 20,
          height: SCREEN_HEIGHT,

          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <BlurView
          blurType="light"
          blurAmount={16}
          blurRadius={10}
          reducedTransparencyFallbackColor="white"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: '20%',
              height: SCREEN_HEIGHT * 0.65,
            }}>
            {data?.day && (
              <View
                style={{
                  borderColor: themeStyle.PURPLE_COLOR,
                  backgroundColor: themeStyle.COLOR_YELLOWISH,
                  padding: 10,
                  borderWidth: 2,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: themeStyle.FONT_MEDIUM,
                    color: themeStyle.COLOR_BLACK,
                  }}>
                  DAY {data.day}
                </Text>
              </View>
            )}
            <View
              style={{
                borderColor: themeStyle.COLOR_YELLOWISH,
                padding: 10,
                borderWidth: 2,
                borderRadius: 6,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: '#f8f8f8',
              }}>
              <Text
                style={{
                  fontFamily: themeStyle.FONT_MEDIUM,
                  textAlign: 'center',
                }}>
                {data.title}
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontFamily: themeStyle.FONT_MEDIUM,
                  fontSize: 20,
                  lineHeight: 28,
                  marginTop: 18,
                  marginHorizontal: '2%',
                  textAlign: 'justify',
                }}>
                {data.text}
              </Text>
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onButtonPress}>
          <Text style={styles.buttonTitle}>
            {buttonTitle ? buttonTitle : "Let's Begin"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
