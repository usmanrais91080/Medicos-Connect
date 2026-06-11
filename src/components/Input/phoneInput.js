import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import inputStyles from './style';
import THEME from '../../assets/styles/theme.style';

const PhoneInput = (props) => {
    return (
        <ElementInput
            {...props}
            keyboardType='number-pad'
            placeholderTextColor={THEME.PRIMARY_COLOR}
            inputContainerStyle={inputStyles.phoneInputContainerStyle}
            inputStyle={inputStyles.phoneIputStyle}
        />
    );
}
export default PhoneInput;