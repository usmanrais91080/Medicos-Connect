import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import themeStyle from '../../assets/styles/theme.style';

export const NavigationHeaderLeftButton = props => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => props?.navigation?.goBack()}>
      <Icon.AntDesign
        name="arrowleft"
        size={25}
        color={props?.color ? props.color : themeStyle.COLOR_WHITE}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 15,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
