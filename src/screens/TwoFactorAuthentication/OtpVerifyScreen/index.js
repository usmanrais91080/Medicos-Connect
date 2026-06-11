import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {DeleteModal, Icon, OtpVerified} from '../../../components';
import styles from './styles';
import themeStyle from '../../../assets/styles/theme.style';
import {HorizontalSpacer} from '../../../lib/utils/global';
import commonStyle from '../../../assets/styles/common.style';
import {TextInput} from 'react-native-gesture-handler';
import {AuthServices} from '../../../services';

const OtpVerify = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const user = useSelector(state => state.authReducer || {});
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const onDone = () => {
    const data = {
      otp,
    };
    AuthServices.verifyOtp(data, user.userData.token)
      .then(res => {
        setShowModal(true);
      })
      .catch(err => {
        setErrMsg(err.response.data.message);
        setErrorModal(true);
      });
  };

  const resendOtp = () => {
    AuthServices.generateOtp(user.userData.token)
      .then(() => {
        setErrMsg('Otp resend');
        setErrorModal(true);
      })
      .catch(err => {
        setErrMsg(err.response.data.message);
        setErrorModal(true);
      });
  };

  const closeModal = () => {
    navigation.goBack();
    setShowModal(false);
  };

  const maskedEmail = email => {
    const [user, domain] = email.split('@');
    return `${user.slice(0, 2)}${'*'.repeat(user.length - 2)}@${domain}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}></View>
      <View style={styles.rightContainer}>
        <View style={{flex: 1, marginTop: '5%'}}>
          <View style={{flex: 1}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrowleft"
                size={25}
                color={themeStyle.COLOR_BLACK}
                style={styles.icon}
              />
              {HorizontalSpacer()}
              <Text style={commonStyle.burgerMenuHeadingTextStyle}>
                Verify Otp
              </Text>
            </View>

            <Text style={styles.title}>Enter confirmation code</Text>
            <Text style={styles.text}>
              Enter the 6-digit code we sent to{' '}
              {maskedEmail(user?.userData?.email)}
            </Text>
            <TextInput
              value={otp}
              maxLength={6}
              onChangeText={setOtp}
              style={styles.textInput}
              placeholder="Enter Code"
              placeholderTextColor={themeStyle.DARK_GRAY}
            />
            <TouchableOpacity onPress={resendOtp} style={styles.resendButton}>
              <Text style={styles.resendCode}>Resend Code</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDone} style={styles.doneButton}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
            <OtpVerified visible={showModal} onClose={closeModal} />
          </View>
          <DeleteModal
            alert
            visible={errorModal}
            confirm={() => {
              setErrorModal(false);
            }}
            text={errMsg}
          />
        </View>
      </View>
    </View>
  );
};

export default OtpVerify;
