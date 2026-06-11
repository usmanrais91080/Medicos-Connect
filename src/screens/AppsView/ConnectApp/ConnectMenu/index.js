import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Icon} from '../../../../components';
import Search from '../../../../assets/svg/search.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import Boost from '../../../../assets/svg/boost1.svg';
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
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View style={{flex: 0.6, marginTop: '10%'}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={props.onClose}
                name="arrowleft"
                size={25}
                color={themeStyle.PINK}
              />
              <Text style={styles.menuheading}>Setting</Text>
            </View>
            {/* <TouchableOpacity onPress={props.onBoost} style={{ ...styles.rowContainer1, backgroundColor: props.boost ? 'lightgrey' : '#FF6B6B' }}>
                            <Boost />
                            <View style={{ width: 20 }}></View>
                            <Text style={props.boost ? styles.itemText : styles.itemText1}>Boost Profile</Text>
                        </TouchableOpacity> */}
            {/* <View style={styles.chooseContainer}>
                            <Text style={styles.chooseText}>Choose Mode</Text>
                        </View> */}
            {/* <View style={styles.chooseModeContainer} >
                            <TouchableOpacity onPress={props.onDate} style={props.data ? styles.unSelectedStyle : styles.selectedStyle} >
                                <Text style={props.data ? styles.unChoosedText : styles.choosedText}>{'Date'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.onBFF} style={props.data ? styles.selectedStyle : styles.unSelectedStyle} >
                                <Text style={props.data ? styles.choosedText : styles.unChoosedText}>{'BFF'}</Text>
                            </TouchableOpacity>
                        </View> */}

            <TouchableOpacity
              onPress={props.onViewProfile}
              style={styles.rowContainer}>
              <Avatar
                source={{
                  uri: userInfo?.connect_image
                    ? userInfo?.connect_image
                    : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                }}
                avatarStyle={{
                  borderWidth: 2,
                  borderColor: themeStyle.CYAN_BLUE,
                }}
                rounded
                size={60}
              />
              <View style={{marginLeft: '5%'}}>
                <Text style={commonStyle.burgerMenuUserNameTextStyle}>
                  {userInfo?.connect_username}
                </Text>
                <Text style={commonStyle.burgerMenuViewTextStyle}>
                  See your profile{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onMatchedProfile}
              style={styles.rowContainer}>
              <Text style={[styles.itemText, {color: themeStyle.COLOR_BLACK}]}>
                Matched Requests
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={props.onFavouriteProfile} style={styles.rowContainer}>
                            <Text style={styles.itemText}>Favourite Profiles</Text>
                        </TouchableOpacity> */}
            <TouchableOpacity
              onPress={props.onMatchHistory}
              style={styles.rowContainer}>
              <Text style={[styles.itemText, {color: themeStyle.COLOR_BLACK}]}>
                Matched history
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onEditProfile}
              style={styles.rowContainer}>
              <Text style={[styles.itemText, {color: themeStyle.COLOR_BLACK}]}>
                Edit profile
              </Text>
            </TouchableOpacity>
            {/*
                        <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Nofitification settings</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Blocking & Incogniti settings</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Security & Privacy</Text>
                        </View> */}
            {/* <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Block/Unblock</Text>
                        </View> */}
          </View>
          {/* <View style={{ flex: 0.3, justifyContent: "flex-end" }}>
                        <View style={[styles.rowContainer2,]}>
                            <Text style={styles.itemText}>   </Text>
                        </View>
                        <TouchableOpacity onPress={props.onDeactivateModule} style={[styles.rowContainer2, { justifyContent: "flex-end" }]}>
                            <Text style={[styles.itemText,, { color: themeStyle.COLOR_BLACK }]}>Deactivate connect</Text>
                        </TouchableOpacity>
                    </View> */}
        </View>
      </View>
    </Modal>
  );
};
export default SearchMenu;
