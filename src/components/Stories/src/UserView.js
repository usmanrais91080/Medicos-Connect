/* eslint-disable */
import moment from 'moment';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import Cancel from '../../../assets/svg/cancel.svg';
import Bin from '../../../assets/svg/bin.svg';
import Eye from '../../../assets/svg/eye.svg';

const UserView = props => {
  return (
    <View style={styles.userView}>
      <Image source={{uri: props.profile}} style={styles.image} />
      <View style={{flex: 1}}>
        <View style={styles.barUsername}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <Text style={styles.time}>
          {!!props.datePublication &&
            ` ${moment(props.datePublication).fromNow()}`}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        {props.isMyProfile && (
          <>
            <TouchableOpacity onPress={props.handleStoryView}>
              <Eye />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.handleDelete}
              style={{marginHorizontal: 10}}>
              <Bin />
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={props.onClosePress}>
          <Cancel />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barUsername: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  verifyIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: Platform.OS == 'ios' ? '7%' : 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 11,
  },
  name: {
    fontSize: 22,
    marginLeft: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  time: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 12,
    color: themeStyle.COLOR_WHITE,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default UserView;
