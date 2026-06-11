import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../assets/styles/theme.style';
import Button from '../Button';

export const PostedModal = props => {
  const {visible, onClose, data} = props;
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={{
        justifyContent: 'center',
        margin: 0,
        marginHorizontal: 20,
      }}>
      <View
        style={{
          backgroundColor: themeStyle.COLOR_WHITE,
          borderRadius: 18,
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: 20,
          alignItems: 'center',
        }}>
        <Text>{data.text}</Text>
        <data.icon />
      </View>
    </Modal>
  );
};
