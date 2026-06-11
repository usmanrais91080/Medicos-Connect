import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteModal, Icon} from '../../../components';
import {route} from '../../../lib/utils/constants';
import styles from './styles';
import themeStyle from '../../../assets/styles/theme.style';
import {HorizontalSpacer} from '../../../lib/utils/global';
import commonStyle from '../../../assets/styles/common.style';
import ToggleSwitch from 'toggle-switch-react-native';
import {AuthServices} from '../../../services';
import {authActions} from '../../../redux/actions/auth';

const TwoFactorAuth = ({navigation}) => {
  const user = useSelector(state => state.authReducer || {});
  const dispatch = useDispatch();
  const [errorModal, setErrorModal] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [isTwoFactor, setIsTwoFactor] = useState(
    user.userData.isTwoFactorEnabled,
  );
  const sendPhoneOtp = () => navigation.navigate(route.OTPVERIFY);

  const sendEmailOtp = () => {
    AuthServices.generateOtp(user.userData.token)
      .then(() => {
        navigation.navigate(route.OTPVERIFY);
      })
      .catch(err => {
        setErrMsg(err.response.data.message || 'Error while sending otp');
        setErrorModal(true);
      });
  };

  const onToggle = value => {
    const {token} = user.userData;
    if (value) {
      AuthServices.enable2fa(token)
        .then(async () => {
          setIsTwoFactor(value);
          await dispatch(authActions.getUserModules(token));
        })
        .catch(err => {
          setErrMsg(err.response.data.message || 'Error while enabling 2FA');
          setErrorModal(true);
        });
    } else {
      AuthServices.disable2fa(token)
        .then(async () => {
          setIsTwoFactor(value);
          await dispatch(authActions.getUserModules(token));
        })
        .catch(err => {
          setErrMsg(err.response.data.message || 'Error while disabling 2FA');
          setErrorModal(true);
        });
    }
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
                Two-factor{'\n'}authentication
              </Text>
            </View>

            <ToggleSwitch
              isOn={isTwoFactor}
              onColor="green"
              offColor={themeStyle.COLOR_BLACK}
              style={styles.switch}
              size="small"
              onToggle={isOn => onToggle(isOn)}
            />
            {isTwoFactor ? (
              <>
                <Text style={styles.title}>
                  Two Factor authentication is on.
                </Text>
                <Text style={styles.text}>
                  We’ll now ask for a login code whenever you log in on a
                  device,
                </Text>
                <Text style={styles.title}>How to get login codes</Text>
                <TouchableOpacity
                  disabled
                  style={styles.button}
                  onPress={sendPhoneOtp}>
                  <Text style={styles.buttonText}>SMS</Text>
                  <Icon.MaterialIcons
                    name="navigate-next"
                    size={20}
                    color={themeStyle.COLOR_BLACK}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={sendEmailOtp} style={styles.button}>
                  <Text style={styles.buttonText}>Email</Text>
                  <Icon.MaterialIcons
                    name="navigate-next"
                    size={20}
                    color={themeStyle.COLOR_BLACK}
                  />
                </TouchableOpacity>
              </>
            ) : null}
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

export default TwoFactorAuth;
