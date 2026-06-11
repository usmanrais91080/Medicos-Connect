import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Icon} from '../../../../components';
import styles from './style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import commonStyle from '../../../../assets/styles/common.style';

const SearchMenu = props => {
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
            flex: 0.8,
            flexDirection: 'column',
            backgroundColor: 'white',
          }}>
          <View style={{flex: 0.6, marginTop: '5%'}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={props.onClose}
                name="arrowleft"
                size={20}
                color={themeStyle.COLOR_CLASSIFIED}
              />
              <Text style={styles.menuheading}>Settings</Text>
            </View>
            <View style={styles.rowContainer}>
              <Avatar
                source={{
                  uri: props?.data?.classified_image
                    ? props?.data?.classified_image
                    : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                }}
                rounded
                size={60}
              />
              <View style={{marginLeft: '5%'}}>
                <Text style={commonStyle.burgerMenuUserNameTextStyle}>
                  {props?.data?.classified_username
                    ? props?.data?.classified_username?.length > 13
                      ? props?.data?.classified_username.split(' ')[0]
                      : props?.data?.classified_username
                    : '(Your Name)'}
                </Text>
                <TouchableOpacity onPress={props.onViewSetting}>
                  <Text style={commonStyle.burgerMenuViewTextStyle}>
                    View Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={props.onViewAds}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>My Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onViewWishList}
              style={styles.rowContainer}>
              <Text style={styles.itemText}>Wish List</Text>
            </TouchableOpacity>
            {/*   <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Saved jobs</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Edit profile</Text>
                        </View>
                         <View style={styles.rowContainer}>
                            <Text style={styles.itemText}>Block/Unblock</Text>
                        </View> */}
          </View>
          {/* <View style={{ flex: 0.3, justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={props.onDeactive} style={[styles.rowContainer2,]}>
                            <Text style={styles.itemText}>Deactive classified</Text>
                        </TouchableOpacity>
                    </View> */}
        </View>
      </View>
    </Modal>
  );
};
export default SearchMenu;
