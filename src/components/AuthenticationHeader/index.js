import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '../../components';
import Logo from '../../assets/svg/logo-1.svg';
import themeStyle from '../../assets/styles/theme.style';

const AuthenticationHeader = props => {
  return (
    <View style={styles.rowContainer}>
      {props.onBack && (
        <TouchableOpacity
          disabled={props.disabled}
          onPress={() => props.onBack()}
          style={styles.iconContainer}>
          <Icon.Entypo name="chevron-small-left" size={25} color={'#959FAE'} />
        </TouchableOpacity>
      )}
      {!props.show ? <Logo width={120} /> : null}
      <View style={{marginHorizontal: '5%'}}>
        <Text style={styles.headingText}>{props.heading}</Text>
        <Text style={styles.headingText2}>{props.string}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 20,
    color: '#313131',
  },
  headingText2: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 25,
    color: '#0B90CF',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthenticationHeader;
