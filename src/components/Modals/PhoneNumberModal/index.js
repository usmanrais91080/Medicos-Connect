import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import Button from '../../Button';
import {Icon} from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import {route} from '../../../lib/utils/constants';
import AuthenticationHeader from '../../AuthenticationHeader';

const LoginOrSignup = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={2500}
      transparent
      backdropColor="transparent"
      animationOutTiming={1000}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <AuthenticationHeader
          navigation={props.navigation}
          heading={'Enter your mobile number'}
        />
        <View
          style={[
            {
              marginTop: '5%',
              borderWidth: 0.5,
              borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              paddingTop: '5%',
              borderRadius: 10,
              paddingHorizontal: '5%',
            },
          ]}>
          <PhoneInput
            ref={e => props.onRef(e)}
            onPressFlag={() => props.onPressFlag()}
            autoFormat={true}
            initialCountry="us"
            initialValue={'+1'}
            disabled={false}
            allowZeroAfterCountryCode={false}
            textStyle={[
              {paddingLeft: 0, fontFamily: themeStyle.FONT_REGULAR},
              Platform.OS && {lineHeight: 18},
            ]}
            onChangePhoneNumber={phone => props.onChangePhoneNumber(phone)}
            value={props.phone}
            textProps={{
              placeholder: '',
              placeholderTextColor: 'rgb(76,76,76)',
              selectionColor: '#000000',
            }}
          />
          <CountryPicker
            visible={props.modalVisible}
            withAlphaFilter
            withFilter
            placeholder=""
            onSelect={value => props.selectCountry(value)}
            onClose={() => props.onClose()}>
            <View />
          </CountryPicker>
        </View>
        <View style={{marginTop: '25%', marginBottom: '10%'}}>
          <Button title={'Continue'} onPress={() => props.onContinue()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  grayText: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    padding: '5%',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: '5%',
    borderColor: '#959FAE',
  },
  selectedButtonContainer: {
    padding: '5%',
    borderWidth: 0.5,
    backgroundColor: '#959FAE',
    borderRadius: 10,
    marginTop: '5%',
    borderColor: '#959FAE',
  },
  textContainer: {
    // justifyContent: "flex-start",
    marginTop: '5%',
    marginBottom: '15%',
  },
});

export default LoginOrSignup;
