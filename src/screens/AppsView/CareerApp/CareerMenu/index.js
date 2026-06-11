import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Icon} from '../../../../components';
import styles from './style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';

const SearchMenu = props => {
  const profile = useSelector(state => {
    return {user: state.authReducer || {}};
  });
  const [userInfo, setUserInfo] = useState(profile?.user?.userData);
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={1000}
      onBackdropPress={() => {
        props.onClose;
      }}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{margin: 0}}>
      <View
        style={{
          flexDirection: 'row',
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        }}>
        <View style={{flex: 0.3, flexDirection: 'column'}}></View>
        <View
          style={{
            flex: 0.7,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderTopStartRadius: 20,
            borderBottomStartRadius: 20,
          }}>
          <View style={{flex: 0.6, marginTop: '15%'}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={props.onClose}
                name="arrowleft"
                size={20}
                color={themeStyle.CARRER_PRIMARY}
              />
              <Text style={styles.menuheading}>Settings</Text>
            </View>
            <TouchableOpacity
              onPress={props.onProfile}
              style={styles.rowContainer}>
              <View
                style={{
                  borderColor: themeStyle.CARRER_PRIMARY,
                  borderWidth: 2,
                  borderRadius: 60,
                }}>
                <Avatar
                  source={{
                    uri:
                      userInfo?.career_image != ''
                        ? userInfo?.career_image
                        : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                  }}
                  rounded
                  size={60}
                />
              </View>

              <View style={{marginLeft: '5%'}}>
                <Text style={commonStyle.burgerMenuUserNameTextStyle}>
                  {userInfo?.career_username
                    ? userInfo?.career_username?.length > 13
                      ? userInfo?.career_username?.split(' ')[0]
                      : userInfo?.career_username
                    : '(Your Name)'}
                </Text>
                <Text style={commonStyle.burgerMenuViewTextStyle}>
                  View Settings
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={props.onEditProfile}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>Edit Preferences</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={props.onViewJobs}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>View jobs applied</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onFavJobs}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>Saved jobs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={props.onPostedJobs}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>Posted jobs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default SearchMenu;
