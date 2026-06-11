import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import ArrowLeft from '../../assets/svg/material-arrow_back.svg';
import {route} from '../../lib/utils/constants';

export const NavigationHeaderLeftButtonProfile = props => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        if (props.prev_screen == route.SOCIALPROFILE) {
          props.navigation.navigate(route.SOCIALPROFILE);
          return;
        }
        props?.navigation?.goBack();
      }}>
      <ArrowLeft
        fill={props?.color ? props.color : 'white'}
        stroke={props?.strokeColor}
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
    borderRadius: 20,
  },
});
