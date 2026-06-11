import React from 'react';
import {Keyboard} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import themeStyle from '../../assets/styles/theme.style';
const OtpInput = ({otp, setOpt, borderColor}) => {
  return (
    <SmoothPinCodeInput
      value={otp}
      onTextChange={setOpt}
      editable={true}
      cellSpacing={5}
      cellStyleFocused={{
        borderColor: borderColor
          ? borderColor
          : themeStyle.PRIMARY_BACKGROUND_COLOR,
        width: 36,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
      }}
      cellStyle={{
        width: 36,
        height: 40,
        borderColor: borderColor
          ? borderColor
          : themeStyle.PRIMARY_BACKGROUND_COLOR,
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 12,
      }}
      codeLength={6}
      textStyle={{
        color: '#000000',
        fontSize: 24,
      }}
      animated={false}
      restrictToNumbers={true}
      onFulfill={code => {
        setOpt(code);
        Keyboard.dismiss();
      }}
    />
  );
};

export default OtpInput;
