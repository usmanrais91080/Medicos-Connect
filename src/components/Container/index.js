import React from 'react';
import {View} from 'react-native';
import THEME from '../../assets/styles/theme.style';
const Container = ({children, color}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
      }}>
      {children}
    </View>
  );
};

export default Container;
