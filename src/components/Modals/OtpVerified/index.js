import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import Verified from '../../../assets/svg/otpverified.svg';
import styles from './styles';
import Icon from '../../Icon';

const OtpVerified = ({visible, onClose}) => {
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.modalTitle}>Two Factor Authentication</Text>
              <Icon.Entypo name={'cross'} size={24} onPress={onClose} />
            </View>
            <Verified style={styles.image} />
            <Text style={styles.text}>Two Factor Authentication Verified</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtpVerified;
