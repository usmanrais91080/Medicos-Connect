import React from 'react';
import themeStyle from '../../assets/styles/theme.style';
import styles from './style';
import ToggleSwitch from 'toggle-switch-react-native';
import {View, Text} from 'react-native';

const ToggleButton = props => {
  const {title, secondaryTitle, onState, onPress} = props;
  return (
    <View style={styles.rowContainer}>
      <View>
        <Text style={styles.grayText}>{title}</Text>
        {secondaryTitle != '' && (
          <Text style={styles.grayTextSecondary}>{secondaryTitle}</Text>
        )}
      </View>
      <ToggleSwitch
  animationSpeed={3}
        isOn={onState}
        onColor={'#38474F'}
        offColor={'#38474F'}
        label=""
        thumbOffStyle={{backgroundColor: '#fff'}}
        thumbOnStyle={{
          backgroundColor: props.yellow
            ? themeStyle.COLOR_YELLOW
            : props.sky
            ? '#0ABDE3'
            : props.parrot
            ? '#99CC66'
            : props.red
            ? '#FF6B6B'
            : props.redd
            ? '#D93231'
            : props.green
            ? '#1DD1A1'
            : props.grey
            ? themeStyle.COLOR_LIGHT_GREY
            : props.orange
            ? '#FF9966'
            : styles.togglePrimary,
        }}
        labelStyle={styles.labelStyle}
        size="medium"
        onToggle={isOn => onPress(isOn)}
      />
    </View>
  );
};
export default ToggleButton;
