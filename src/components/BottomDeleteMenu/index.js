import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import themeStyle from '../../assets/styles/theme.style';

import DropDown from '../../assets/svg/dropDown.svg';
import Button from '../Button';

export const BottomDeleteMenu = props => {
  const { visible, onClose, data, theme } = props;
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={1000}
      animationOutTiming={800}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          backgroundColor: themeStyle.COLOR_WHITE,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        {data?.icon  ? <data.icon /> : null}
        <Text
          style={{
            fontFamily: themeStyle.FONT_REGULAR,
            textAlign: 'center',
            marginBottom:data?.icon?10:"10%",
            marginVertical: 10,
          }}>
          {data.text}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            marginBottom: 20,
          }}>
          <Button
            title={data.buttonText}
            titleColor={themeStyle.COLOR_BLACK}
            customColor={
              theme == 'classified'
                ? themeStyle.CLASSIFIED_HOME
                : theme == 'education'
                  ? themeStyle.EDUCATION_BROWN
                  : theme == 'wallet'
                    ? themeStyle.BOOK_KEEPING_PINK
                    : theme == 'pager'
                      ? '#90CDBF'
                      : theme == 'mental'
                        ? themeStyle.MENTAL_DARK
                        : 'null'
            }
            width={150}
            height={50}
            bottomMenu
            onPress={() => {
              data.onPress();
            }}
          />
          <Button
            title="Cancel"
            titleColor={themeStyle.COLOR_BLACK}
            customColor="transparent"
            width={150}
            height={50}
            bottomMenu
            borderColor={
              theme == 'classified'
                ? themeStyle.CLASSIFIED_HOME
                : theme == 'education'
                  ? themeStyle.EDUCATION_BROWN
                  : theme == 'wallet'
                    ? themeStyle.BOOK_KEEPING_PINK
                    : theme == 'pager'
                      ? '#90CDBF'
                      : theme == 'mental'
                        ? themeStyle.MENTAL_DARK
                        : 'null'
            }
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};
