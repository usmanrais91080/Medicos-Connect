import moment from 'moment';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  route,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../../../lib/utils/constants';
import {HorizontalSpacer, moneyFormat} from '../../../../lib/utils/global';
import themeStyle from '../../../../assets/styles/theme.style';
import Emoji from '../../../../assets/svg/happy.svg';
import Icon from '../../../../components/Icon';
import Like from '../../../../assets/svg/like-button.svg';
import Comment from '../../../../assets/svg/comment-icon.svg';
import Delete from '../../../../assets/svg/delete.svg';
import Report from '../../../../assets/svg/report.svg';
import Hide from '../../../../assets/svg/hide.svg';
import Block from '../../../../assets/svg/block.svg';
import Pin from '../../../../assets/svg/pin.svg';

export const PostComponent = props => {
  const {
    item,
    unverifiedUser,
    showAlert,
    showAlertFunc,
    clickPost,
    clickMenu,
    index,
    clickLike,
  } = props;
  const _renderTruncatedFooter = handlePress => {
    return (
      <Text
        style={{
          color: themeStyle.COLOR_BLACK_LIGHT,
          fontFamily: themeStyle.FONT_MEDIUM,
          fontSize: 10,
          marginTop: 5,
        }}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{
          color: themeStyle.COLOR_BLACK_LIGHT,
          fontFamily: themeStyle.FONT_MEDIUM,
          fontSize: 10,
          marginTop: 5,
        }}
        onPress={handlePress}
      >
        Read less
      </Text>
    );
  };
  let spaces = item.description.split('\n');

  return (
    <TouchableOpacity disabled style={styles.container}>
      {/* Top */}
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                item.user?.image != '' && item?.is_anonymous === false
                  ? item.user?.image
                  : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
            }}
            rounded
            size={40}
          />
          {HorizontalSpacer()}
          <View style={{justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{...styles.textStyle, width: SCREEN_WIDTH * 0.2}}
              >
                {item?.is_anonymous ? 'Anonymous' : item?.user?.username}
              </Text>
              {item?.mood != '' ? (
                <Avatar
                  source={{
                    uri: item?.mood?.image,
                  }}
                  rounded
                  size={20}
                />
              ) : (
                <Emoji />
              )}
              <View style={{marginLeft: 10, width: 20}}>
                {item?.is_pinned && <Pin />}
              </View>
            </View>
            <Text
              style={{
                ...styles.textStyle,
                color: themeStyle.COLOR_GREY,
                fontFamily: themeStyle.FONT_MEDIUM,
                fontSize: 10,
              }}
            >
              {moment(item?.created_at).format('ll, LT')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => clickMenu()}
            style={{marginLeft: SCREEN_WIDTH * 0.285, zIndex: 2}}
          >
            <Icon.Entypo
              name="dots-three-vertical"
              size={15}
              color={themeStyle.COLOR_BLACK_LIGHT}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowStyle, {marginBottom: '10%'}]}></View>
      </View>
      {/* Middle */}
      <View style={[styles.rowContainer, {marginTop: '2.5%'}]}>
        {/* <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
          {item.description}
        </Text> */}
        {item.description.length > 100 || spaces.length > 2 ? (
          <ReadMore
            numberOfLines={2}
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}
            // onReady={this._handleTextReady}
          >
            <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
              {item.description}
            </Text>
          </ReadMore>
        ) : (
          <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
            {item.description}
          </Text>
        )}
      </View>
      {/* Bottom */}
      <View
        style={{
          marginTop: '2.5%',
          flexDirection: 'row',
          alignItems: 'center',
          // padding: 10,
          // paddingBottom: item?.likes.length > 0 ? '0%' : '5%',
          justifyContent: 'space-between',
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => clickLike(item, index)}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            {item?.is_post_liked ? (
              <Like width={20} height={20} />
            ) : (
              <Like width={20} height={20} />
            )}
            {/* <Text style={styles.blackText}>
              {moneyFormat(item.likes ? item.likes.length : 0)}
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() =>
            //   unverifiedUser ? this.showNewUserAlertFunction() : clickPost()
            // }
            onPress={clickPost}
            style={{
              marginLeft: '10%',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Comment />
            {/* <Text style={styles.blackText}>
              {moneyFormat(item?.comment_count ? item?.comment_count : 0)}
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//BottomMenu
export const BottomMenu = props => {
  const {visible, onClose, user, post, deletePost, pinPost, index} = props;
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}
    >
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
          height: post?.my_post ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.6,
        }}
      >
        <View
          style={{
            height: 2,
            width: 25,
            backgroundColor: themeStyle.COLOR_GREY,
            alignSelf: 'center',
          }}
        />
        <>
          <View
            style={{
              // marginHorizontal: '5%',
              marginVertical: '2%',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                source={{
                  uri:
                    user.mental_health_image != ''
                      ? user.mental_health_image
                      : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                }}
                rounded
                size={60}
              ></Avatar>
              <Text
                style={{
                  // marginLeft: 10,
                  marginVertical: '2%',
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_MEDIUM,
                  color: themeStyle.COLOR_BLACK_LIGHT,
                  fontSize: 15,
                }}
              >
                {user?.mental_health_username !== ''
                  ? user?.mental_health_username
                  : 'Khalida'}
              </Text>
            </View>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderTopLeftRadius: post?.my_post ? 20 : 0,
                borderTopRightRadius: post?.my_post ? 20 : 0,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              onPress={() => {
                onClose();
                pinPost(post, index);
              }}
            >
              <Text style={styles.textStyleMenu}>{'Pin Post'}</Text>
              {<Pin />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                borderBottomLeftRadius: post?.my_post ? 20 : 0,
                borderBottomRightRadius: post?.my_post ? 20 : 0,
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              onPress={() => {
                onClose();
                deletePost(post?._id);
              }}
            >
              <Text style={styles.textStyleMenu}>{'Remove from saved'}</Text>
              {<Delete />}
            </TouchableOpacity>
          </View>
        </>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_MENTAL,
    borderRadius: 10,
    padding: '4%',
    marginBottom: '1%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  grayTextStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  grayTextStyle1: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  modalContainer: {
    padding: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.322,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '70%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    // textDecorationLine: 'underline',
  },
});
