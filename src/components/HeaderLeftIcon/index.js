import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../Icon';
import themeStyle from '../../assets/styles/theme.style';

const HeaderLeftIcon = ({onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.leftIcon}>
      <Icon.AntDesign
        name="arrowleft"
        size={25}
        color={color ? color : themeStyle.COLOR_BLACK}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftIcon;

const styles = StyleSheet.create({
  leftIcon: {
    paddingLeft: 15,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
