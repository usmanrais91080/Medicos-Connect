import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Icon} from '../../../../components';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';

const SearchMenu = props => {
  const profile = useSelector(state => {
    return {user: state.authReducer || {}};
  });
  const [userInfo] = useState(profile?.user?.userData);
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={800}
      animationOutTiming={600}
      onBackdropPress={() => {
        props.onClose;
      }}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={styles.margin0}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}></View>
        <View style={styles.rightContainer}>
          <View style={styles.rightInnerContainer}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={props.onClose}
                name="arrowleft"
                size={25}
                color={themeStyle.YELLOW}
              />
              <Text style={styles.menuheading}>Profile Setting</Text>
            </View>
            <View style={styles.rowContainer}>
              <Avatar
                source={{
                  uri:
                    userInfo?.social_image != ''
                      ? userInfo?.social_image
                      : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                }}
                rounded
                avatarStyle={styles.avatarStyle}
                size={60}
              />
              <TouchableOpacity
                onPress={props.onProfile}
                style={{
                  marginLeft: '5%',
                  width: '70%',
                }}
              >
                <Text
                  numberOfLines={1}
                  style={commonStyle.burgerMenuUserNameTextStyle}
                >
                  {userInfo?.social_username?.length > 12
                    ? userInfo?.social_username.split(' ')[0]
                    : userInfo?.social_username
                    ? userInfo?.social_username
                    : 'User'}
                </Text>
                <Text style={commonStyle.burgerMenuViewTextStyle}>
                  See your profile{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={props.onFollowRequest}
              style={styles.rowContainer}
            >
              <Text style={styles.itemText}>Follow requests</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={props.onFollower}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>Following</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={props.onSavedPosts}
              style={styles.rowContainer}
            >
              <Text style={styles.itemText}>Saved posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onBlock}
              style={styles.rowContainer}
            >
              <Text style={styles.itemText}>Block/Unblock</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{flex: 0.3, justifyContent: 'flex-end'}}> */}
          {/* <View onPress={() => props.onAppSettings} style={[styles.rowContainer2,]}>
                            <Text style={styles.itemText}>App settings</Text>
                        </View> */}
          {/* <TouchableOpacity
              onPress={props.onDeactive}
              style={[styles.rowContainer2, {justifyContent: 'flex-end'}]}>
              <Text style={styles.itemText}>Deactive Social</Text>
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
};
export default SearchMenu;
