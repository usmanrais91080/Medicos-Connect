import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../../assets/styles/theme.style';
import Add from '../../../../assets/svg/add-button.svg';
import Following from '../../../../assets/svg/following-button.svg';
import HomeBox from '../../../../assets/svg/home-button2.svg';
import QR from '../../../../assets/svg/qr.svg';
import Search from '../../../../assets/svg/search-button.svg';
import User from '../../../../assets/svg/user-button.svg';
import DropDown from '../../../../assets/svg/dropDown.svg';
import {Button, Icon} from '../../../../components';
import Search2 from '../../../../assets/svg/search.svg';
import styles from './style';
import {scaleImage} from '../../../../lib/utils/global';

export const HeaderRight = ({
  onPressMenu,
  onQR,
  newUser,
  showNewUserAlert,
  onPressSearch,
}) => {
  return (
    <View style={styles.headerRightContainer}>
      {onQR && (
        <Pressable onPress={() => (newUser ? showNewUserAlert() : onQR())}>
          <QR />
        </Pressable>
      )}

      {onPressMenu && (
        <Pressable
          onPress={() => (newUser ? showNewUserAlert() : onPressMenu())}
          style={styles1.marginLeft15}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_BLACK}
          />
        </Pressable>
      )}

      {onPressSearch && (
        <Pressable
          onPress={() => (newUser ? showNewUserAlert() : onPressSearch())}
          style={styles1.marginLeft15}>
          <Search2 fill={themeStyle.COLOR_BLACK} />
        </Pressable>
      )}
    </View>
  );
};

export const HomeButtons = ({
  newUser,
  openModel,
  showNewUserAlert,
  onPressSearch,
  onPressHomeBox,
  onPressAvatar,
  onPressFollowing,
  diableHome,
}) => {
  return (
    <View style={styles1.homeButtonContainer}>
      <Pressable
        disabled={diableHome}
        onPress={onPressHomeBox}
        style={styles1.homeButton}>
        <HomeBox width={30} height={30} />
      </Pressable>
      <Pressable
        onPress={() => (newUser ? showNewUserAlert() : onPressAvatar())}
        style={styles1.userIcon}>
        <User width={16.51} height={22.344} />
      </Pressable>
      <Pressable onPress={openModel} style={styles1.userIcon}>
        <Add width={21.09} height={21.27} />
      </Pressable>
      <Pressable
        onPress={() => (newUser ? showNewUserAlert() : onPressFollowing())}
        style={styles1.userIcon}>
        <Following width={29.48} height={29.73} />
      </Pressable>
      <Pressable
        onPress={() => (newUser ? showNewUserAlert() : onPressSearch())}
        style={styles1.searchIcon}>
        <Search width={22.11} height={22.3} />
      </Pressable>
    </View>
  );
};

export const HeaderLeft = ({goBack}) => {
  return (
    <TouchableOpacity style={styles1.marginLeft15} onPress={() => goBack()}>
      <Icon.AntDesign
        name="arrowleft"
        size={25}
        color={themeStyle.COLOR_BLACK}
      />
    </TouchableOpacity>
  );
};

export const BottomMenu = props => {
  const {visible, onClose, data} = props;
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={400}
      animationOutTiming={400}
      style={styles1.modal}>
      <View style={styles1.modalContainer}>
        <TouchableOpacity style={styles1.dropDown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles1.icon} onPress={item.onPress}>
              <View style={styles1.iconContainer}>
                <View style={styles1.flex3}>
                  {item.name == 'Follow User' ? (
                    <Icon.AntDesign name="pluscircleo" size={20} color="#000" />
                  ) : (
                    <item.icon
                      fill={
                        !item.icon == 'Poll'
                          ? themeStyle.COLOR_BLACK
                          : themeStyle.YELLOW
                      }
                    />
                  )}
                </View>
                <View style={styles1.flex7}>
                  <Text style={styles1.name}>{item?.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export const BlockUserConfirmation = ({
  visible,
  onClose,
  onAccept,
  isBlock,
  username,
}) => {
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={400}
      animationOutTiming={400}
      style={styles1.modal}>
      <View style={styles1.modalContainer}>
        <TouchableOpacity style={styles1.dropDown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <Image
          source={
            isBlock
              ? require('../../../../assets/gifs/user-blocked.gif')
              : require('../../../../assets/gifs/bin.gif')
          }
          style={styles1.blockGif}
        />
        <Text style={styles1.blockModalDescription}>
          Are you sure you want to {isBlock ? 'block' : 'remove'} {username}?
        </Text>
        <View style={styles.rowButtonContainer}>
          <TouchableOpacity onPress={onAccept} style={styles1.acceptButton}>
            <Text style={styles.text}>{isBlock ? 'Block' : 'Delete'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles1.cancelButton}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const AmpuleModal = props => {
  const {
    visible,
    onClose,
    data,
    onPress,
    pager,
    mental,
    onSendGift,
    setCustomAmpules,
    ampules,
    userName,
    totalAmpules,
  } = props;
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={styles1.modal}
      avoidKeyboard={true}>
      <View style={styles1.ampuleModalContainer}>
        <TouchableOpacity style={styles1.dropDown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <Text style={styles1.sendGift}>Send Gift</Text>
        <View style={styles1.descriptionContainer} />
        <Text style={styles1.description}>
          Appreciate creators and show love to your friends by sending them
          ampule gifts You can send as many ampule gifts as you like!
        </Text>
        <View style={styles1.ampuleBalanceContainer}>
          <Text style={styles1.ampulesBalance}>Current Ampules Balance</Text>
          <Text style={styles1.ampules}>{totalAmpules}</Text>
        </View>
        <Text style={styles1.selectAmpules}>Select Ampules Amount</Text>
        <View style={styles1.ampulesItemContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                borderWidth: 1,
                marginHorizontal: '2%',
                marginBottom: 10,
                height: 80,
                width: 100,
                alignItems: 'center',
                borderColor: pager
                  ? '#90CDBF'
                  : mental
                  ? themeStyle.SPANISH_PINK
                  : themeStyle.YELLOW,
                justifyContent: 'center',
                borderRadius: 8,
                backgroundColor: item.selected
                  ? pager
                    ? '#90CDBF'
                    : mental
                    ? themeStyle.SPANISH_PINK
                    : themeStyle.YELLOW
                  : themeStyle.COLOR_WHITE,
              }}>
              <View>
                <item.icon />
              </View>
              <View style={styles1.marginTop5}>
                <Text style={styles1.ampuleItem}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Enter Custom Amount"
          value={ampules}
          onChangeText={text => setCustomAmpules(text)}
          placeholderTextColor={themeStyle.COLOR_GREY}
          style={styles1.amountInput}
          keyboardType="numeric"
        />
        <View style={{marginHorizontal: '2%', marginTop: 24}}>
          {pager ? (
            <Button
              customColor={'#90CDBF'}
              titleColor={themeStyle.COLOR_BLACK}
              title={'Send Gift'}
              onPress={onSendGift}
            />
          ) : mental ? (
            <Button
              customColor={themeStyle.SPANISH_PINK}
              titleColor={themeStyle.COLOR_BLACK}
              title={'Send Gift'}
              onPress={onSendGift}
            />
          ) : (
            <Button
              yellowbg
              customColor={'#FFA700'}
              titleColor={themeStyle.COLOR_BLACK}
              title={'Send Gift'}
              height={60}
              onPress={onSendGift}
            />
          )}
        </View>
        <Text style={styles1.minimumAmount}>Minimum amount 250 ampules</Text>
        <Text style={styles1.giftedUser}>
          Only {userName} can see your gift
        </Text>
      </View>
    </Modal>
  );
};

export const BuyAmpuleModal = ({visible, onClose, buyAmpules, ampules}) => {
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={styles1.modal}>
      <View style={styles1.ampuleModalContainer}>
        <TouchableOpacity style={styles1.dropDown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <Text style={styles1.sendGift}>Buy Ampules</Text>
        <View style={styles1.buyAmpulesDescriptionContainer} />
        <Text style={styles1.buyAmpulesDescription}>
          Appreciate creators and show love to your friends by sending them
          ampule gifts You can send as many ampule gifts as you like!
        </Text>
        <View style={styles1.buyAmpulesBalanceContainer}>
          <Text style={styles1.buyAmpulesText}>Current Ampules Balance</Text>
          <Text style={styles1.buyAmpulesText}>{ampules}</Text>
        </View>
        <Text style={styles1.zeroAmpulesText}>
          You have {ampules} ampules in your wallet. To buy ampules tap the buy
          ampules button
        </Text>
        <View style={styles1.cancelButtonContainer}>
          <TouchableOpacity onPress={onClose} style={styles1.cancel}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={buyAmpules} style={styles1.accept}>
            <Text style={styles.text}>Buy Ampules</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles1 = StyleSheet.create({
  homeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  homeButton: {
    width: 40,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 40,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  marginLeft15: {marginLeft: 15},
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: '5%',
    paddingBottom: 20,
  },
  dropDown: {alignItems: 'center', marginBottom: 20},
  icon: {
    padding: 10,
    marginHorizontal: '2%',
    marginBottom: 10,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: themeStyle.YELLOW,
  },
  iconContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  flex3: {
    flex: 0.3,
  },
  flex7: {
    flex: 0.7,
  },
  name: {fontFamily: themeStyle.FONT_MEDIUM},
  ampuleModalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    paddingTop: 24,
  },
  sendGift: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.YELLOW,
    alignSelf: 'center',
    marginBottom: 7,
  },
  descriptionContainer: {
    height: 1,
    backgroundColor: themeStyle.BAR_COLOR,
    width: 124,
    alignSelf: 'center',
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginBottom: 24,
    marginHorizontal: '2%',
    color: themeStyle.COLOR_BLACK,
  },
  ampuleBalanceContainer: {
    backgroundColor: themeStyle.YELLOW,
    marginHorizontal: '2%',
    paddingVertical: 6.5,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ampulesBalance: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
  },
  ampules: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
  },
  selectAmpules: {
    marginHorizontal: '2%',
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  ampulesItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  marginTop5: {marginTop: '5%'},
  ampuleItem: {fontSize: 16, fontFamily: themeStyle.FONT_MEDIUM},
  amountInput: {
    borderWidth: 1,
    marginHorizontal: '2%',
    height: 43,
    alignItems: 'center',
    borderColor: themeStyle.YELLOW,
    justifyContent: 'center',
    borderRadius: 3,
    textAlign: 'center',
  },
  minimumAmount: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 6,
    color: '#848484',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  giftedUser: {
    alignSelf: 'center',
    color: '#848484',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buyAmpulesDescriptionContainer: {
    height: 1,
    backgroundColor: themeStyle.BAR_COLOR,
    width: 190,
    alignSelf: 'center',
    marginBottom: 24,
  },
  buyAmpulesDescription: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginBottom: 24,
    marginHorizontal: '2%',
    color: themeStyle.COLOR_BLACK,
  },
  buyAmpulesBalanceContainer: {
    backgroundColor: themeStyle.YELLOW,
    marginHorizontal: '2%',
    paddingVertical: 6.5,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyAmpulesText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
  },
  zeroAmpulesText: {
    marginHorizontal: '8%',
    color: themeStyle.COLOR_BLACK,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
    lineHeight: 19,
  },
  cancelButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 45,
    marginBottom: 12,
  },
  cancel: {
    width: '48%',
    height: 65,
    borderWidth: 1,
    borderColor: themeStyle.YELLOW,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept: {
    width: '48%',
    height: 65,
    backgroundColor: themeStyle.YELLOW,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockGif: {
    height: scaleImage(114),
    width: scaleImage(114),
    alignSelf: 'center',
    marginTop: -15,
  },
  blockModalDescription: {
    textAlign: 'center',
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginHorizontal: '15%',
    marginBottom: 20,
    lineHeight: 22,
  },
  acceptButton: {
    height: 53,
    width: '48.5%',
    backgroundColor: themeStyle.YELLOW,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    height: 53,
    width: '48.5%',
    borderColor: themeStyle.YELLOW,
    borderWidth: 1,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
