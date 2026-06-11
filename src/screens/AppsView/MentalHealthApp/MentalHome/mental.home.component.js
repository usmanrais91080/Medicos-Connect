import moment from 'moment';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {HorizontalSpacer, moneyFormat} from '../../../../lib/utils/global';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import Like from '../../../../assets/svg/like.svg';
import Comment from '../../../../assets/svg/comment-icon.svg';
import Save from '../../../../assets/svg/save.svg';
import Hide from '../../../../assets/svg/hide.svg';
import Block from '../../../../assets/svg/block.svg';
import Pin from '../../../../assets/svg/pin.svg';
import PinMain from '../../../../assets/svg/pinMain.svg';
import Pencil from '../../../../assets/svg/pencilBottomMenu.svg';
import Delete from '../../../../assets/svg/deleteBottomMenu.svg';
import Dropdown from '../../../../assets/svg/dropDown.svg';
import Ampules from '../../../../assets/svg/ampules-black.svg';
// Post Component
export const PostComponent = props => {
  const {
    item,
    unverifiedUser,
    showAlert,
    showNewUserAlertFunction,
    clickPost,
    clickMenu,
    index,
    clickLike,
    clickAmpules,
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
            avatarStyle={styles.avatarStyle}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: SCREEN_WIDTH * 0.6,
              }}
            >
              <Text
                ellipsizeMode="tail"
                // numberOfLines={1}
                style={{...styles.textStyle}}
              >
                {item?.is_anonymous ? 'Anonymous' : item?.user?.username}
              </Text>
              {/* {item?.mood != "" ?
                <Avatar
                  source={{
                    uri:
                      item?.mood?.image
                  }}
                  rounded
                  size={20}
                /> : <Emoji />} */}
              <View style={{marginLeft: 10, width: 20}}>
                {item?.is_pinned && <PinMain />}
              </View>
            </View>
            <Text
              style={{
                ...styles.textStyle,
                color: themeStyle.COLOR_BLACK,
                fontFamily: themeStyle.FONT_REGULAR,
                fontSize: 12,
                marginTop: 5,
              }}
            >
              {moment(item?.created_at).format('ll, LT')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              unverifiedUser ? showNewUserAlertFunction() : clickMenu()
            }
            style={{marginLeft: SCREEN_WIDTH * 0.01, zIndex: 2, marginTop: 5}}
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
            <Text style={[styles.grayTextStyle1, {marginVertical: '2%'}]}>
              {item.description}
            </Text>
          </ReadMore>
        ) : (
          <Text style={[styles.grayTextStyle1, {marginVertical: '2%'}]}>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
              onPress={() =>
                unverifiedUser
                  ? showNewUserAlertFunction()
                  : clickLike(item, index)
              }
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
              <Text style={styles.blackText}>
                {moneyFormat(item.likes ? item.likes.length : 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                unverifiedUser ? showNewUserAlertFunction() : clickPost()
              }
              // onPress={clickPost}
              style={{
                marginLeft: '10%',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Comment />
              <Text style={styles.blackText}>
                {moneyFormat(item?.comment_count ? item?.comment_count : 0)}
              </Text>
            </TouchableOpacity>
          </View>
          {!item.my_post && (
            <TouchableOpacity
              onPress={() =>
                unverifiedUser ? showNewUserAlertFunction() : clickAmpules()
              }
              // onPress={clickPost}
              style={{
                marginLeft: '10%',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Ampules height={20} width={25} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

//BottomMenu
export const BottomMenu = props => {
  const {
    visible,
    onClose,
    user,
    post,
    savePost,
    pinPost,
    index,
    blockUser,
    reportPost,
    deleteModal,
    editPost,
  } = props;
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
          height: post?.my_post ? SCREEN_HEIGHT * 0.23 : SCREEN_HEIGHT * 0.23,
        }}
      >
        <TouchableOpacity
          onPress={() => onClose()}
          style={{
            alignSelf: 'center',
          }}
        >
          <Dropdown />
        </TouchableOpacity>
        <>
          {/* <View
            style={{
              // marginHorizontal: '5%',
              marginVertical: '2%',
            }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: "center" }}>
              <Avatar
                source={{
                  uri:
                    user.mental_health_image != ''
                      ? user.mental_health_image
                      :
                      'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                }}
                rounded
                size={60}></Avatar>
              <Text
                style={{
                  // marginLeft: 10,
                  marginVertical: '2%',
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_MEDIUM,
                  color: themeStyle.COLOR_BLACK_LIGHT,
                  fontSize: 15,
                }}>
                {user?.mental_health_username !== "" ? user?.mental_health_username : 'Khalida'}
              </Text>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: SCREEN_HEIGHT * 0.04,
            }}
          >
            {/* {
              post?.my_post === false && <TouchableOpacity
                style={styles.bottomMenuButton}
                onPress={() => {
                  onClose();
                  setTimeout(() => {
                    reportPost()
                  }, 500);
                }}
              >
                <Text style={styles.textStyleMenu}>{'Report Post'}</Text>
                <Report />
              </TouchableOpacity>
            } */}

            <TouchableOpacity
              style={[
                styles.bottomMenuButton,
                post?.my_post == false && styles.bottomMenuButton2,
              ]}
              onPress={() => {
                onClose();
                pinPost(post, index);
              }}
            >
              <Text style={styles.textStyleMenu}>{'Pin'}</Text>
              {<Pin />}
            </TouchableOpacity>

            {post?.my_post === false && (
              <>
                {HorizontalSpacer()}

                <TouchableOpacity style={styles.bottomMenuButton2}>
                  <Text style={styles.textStyleMenu}>{'Hide'}</Text>
                  {<Hide />}
                </TouchableOpacity>
              </>
            )}
            {post?.my_post == false && (
              <>
                {HorizontalSpacer()}

                <TouchableOpacity
                  style={styles.bottomMenuButton2}
                  onPress={() => {
                    onClose();
                    savePost(post?._id);
                  }}
                >
                  <Text style={styles.textStyleMenu}>{'Save'}</Text>
                  {<Save fill={themeStyle.COLOR_WHITE} />}
                </TouchableOpacity>
              </>
            )}
            {post?.my_post == true && (
              <>
                {HorizontalSpacer()}
                <TouchableOpacity
                  style={styles.bottomMenuButton}
                  onPress={() => {
                    onClose();
                    editPost();
                  }}
                >
                  <Text style={styles.textStyleMenu}>{'Edit'}</Text>
                  {<Pencil />}
                </TouchableOpacity>
              </>
            )}
            {post?.my_post == true && (
              <>
                {HorizontalSpacer()}
                <TouchableOpacity
                  style={styles.bottomMenuButton}
                  onPress={() => {
                    deleteModal && deleteModal(), onClose();

                    // pinPost(post, index);
                  }}
                >
                  <Text style={[styles.textStyleMenu]}>{'Delete'}</Text>
                  {<Delete />}
                </TouchableOpacity>
              </>
            )}

            {post?.my_post == false && (
              <>
                {HorizontalSpacer()}
                <TouchableOpacity
                  style={styles.bottomMenuButton2}
                  onPress={() => {
                    onClose();
                    blockUser(post?.user?._id);
                  }}
                >
                  <Text style={styles.textStyleMenu}>{'Block'}</Text>
                  {<Block fill={themeStyle.COLOR_WHITE} />}
                </TouchableOpacity>
              </>
            )}
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
    fontSize: 14,
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
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
    textTransform: 'capitalize',
  },
  modalContainer: {
    padding: '2%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 2,
    borderColor: '#A287AF',
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    // width: '0%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontSize: 14,
    textAlign: 'center',
    color: themeStyle.COLOR_WHITE,
    // textDecorationLine: 'underline',
  },
  avatarStyle: {
    // backgroundColor:themeStyle.MENTAL_DARK
    borderColor: themeStyle.MENTAL_SECONDARY,
    borderWidth: 2,
  },
  blackText: {
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
    paddingHorizontal: SCREEN_WIDTH * 0.025,
    paddingBottom: SCREEN_HEIGHT * 0.001,
  },
  bottomMenuButton: {
    padding: 15,
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.095,
    width: SCREEN_WIDTH * 0.25,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.MENTAL_PRIMARY,
  },
  bottomMenuButton2: {
    padding: 15,
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.095,
    width: SCREEN_WIDTH * 0.2,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.MENTAL_PRIMARY,
  },
});
