import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {Icon, OtpInputs} from '../..';
import styles from './styles';

const OtpModal = ({visible, onClose, onNext, otp, setOtp}) => {
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
            <Text style={styles.modalTitle}>
              Set up two-factor authentication
            </Text>
            <Text style={styles.text}>
              For added security, please verify your identity by entering the
              code sent to your registered Email. This ensures that only you
              have access to your account
            </Text>
            <Text style={styles.modalTitle}>Verify Code</Text>
            <View style={styles.otpModalContainer}>
              <OtpInputs
                otp={otp}
                setOpt={setOtp}
                borderColor={themeStyle.COLOR_RED}
              />
            </View>

            <TouchableOpacity style={styles.resendCode}>
              <Text style={styles.modalTitle}>Resend Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNext} style={styles.nextButton}>
              <Text style={styles.next}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtpModal;
