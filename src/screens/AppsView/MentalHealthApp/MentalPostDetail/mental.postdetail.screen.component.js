import moment from 'moment';
import Swipeable from 'react-native-swipeable';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
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
import Save from '../../../../assets/svg/save.svg';
import Report from '../../../../assets/svg/report.svg';
import Hide from '../../../../assets/svg/hide.svg';
import Block from '../../../../assets/svg/block.svg';
import Pin from '../../../../assets/svg/pinMain.svg';
import Delete from '../../../../assets/svg/delete.svg';
import Ampules from '../../../../assets/svg/ampules-black.svg';

export const HeaderRight = ({onPress}) => {
  return (
    <View style={styles.headerRightContainer}>
      {/* <TouchableOpacity onPress={() => { }} ><QR /></TouchableOpacity> */}
      <TouchableOpacity onPress={() => onPress()} style={{marginLeft: 15}}>
        <Emoji />
      </TouchableOpacity>
    </View>
  );
};

export const PostComponent = props => {
  const {item, clickMenu, index, clickLike, clickAmpules} = props;
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
  console.log('item', item);
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
            avatarStyle={{
              borderColor: themeStyle.MENTAL_SECONDARY,
              borderWidth: 2,
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
              {item?.is_pinned && (
                <View style={{marginLeft: 10}}>
                  <Pin />
                </View>
              )}
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
          {/* <TouchableOpacity
            onPress={() => clickMenu()}
            style={{ marginLeft: SCREEN_WIDTH * 0.375, zIndex: 2 }}>
            <Icon.Entypo
              name="dots-three-vertical"
              size={15}
              color={themeStyle.COLOR_BLACK_LIGHT}
            />
          </TouchableOpacity> */}
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
              <Text style={styles.blackText}>
                {moneyFormat(item.likes ? item.likes.length : 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled
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
              onPress={() => clickAmpules()}
              // onPress={clickPost}
              style={{
                marginLeft: '10%',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Ampules />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CommentComponent = props => {
  const {
    item,
    clickComment,
    reportComment,
    showDelete,
    showReport,
    deleteComment,
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
  const rightButtons = [
    <TouchableOpacity
      onPress={deleteComment}
      disabled={!showDelete}
      style={[styles.rightSwipeItem, {backgroundColor: 'pink'}]}
    >
      <Delete />
    </TouchableOpacity>,
    // <TouchableHighlight
    //   style={[styles.rightSwipeItem, { backgroundColor: 'pink' }]}>
    //   <Pin />
    // </TouchableHighlight>,
    <TouchableOpacity
      onPress={reportComment}
      disabled={showReport}
      style={[
        styles.rightSwipeItem,
        {
          backgroundColor: 'pink',
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
        },
      ]}
    >
      <Report />
    </TouchableOpacity>,
  ];
  let spaces = item.text.split('\n');
  return (
    <Swipeable rightButtons={rightButtons}>
      <TouchableOpacity
        onLongPress={clickComment}
        style={styles.containerComment}
      >
        {/* Top */}
        <View style={styles.rowContainer}>
          <View style={styles.rowStyle}>
            <Avatar
              avatarStyle={{
                borderColor: themeStyle.MENTAL_SECONDARY,
                borderWidth: 2,
              }}
              source={{
                uri:
                  item.comment_by?.image != ''
                    ? // && item.comment_by?.anonymous === false
                      item.comment_by?.image
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
                  {item.comment_by?.anonymous
                    ? 'Anonymous'
                    : item?.comment_by?.username}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.textStyle,
                  color: themeStyle.COLOR_GREY,
                  fontFamily: themeStyle.FONT_MEDIUM,
                  fontSize: 10,
                }}
              >
                {item.text.length > 100 || spaces.length > 2 ? (
                  <ReadMore
                    numberOfLines={2}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                    // onReady={this._handleTextReady}
                  >
                    <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
                      {item.text}
                    </Text>
                  </ReadMore>
                ) : (
                  <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
                    {item.text}
                  </Text>
                )}
              </Text>
            </View>
          </View>
          <View style={[styles.rowStyle, {marginBottom: '10%'}]}></View>
        </View>
        {/* Middle */}
        {/* <View style={[styles.rowContainer, {marginTop: '2.5%'}]}>
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
      </View> */}
      </TouchableOpacity>
    </Swipeable>
  );
};

//BottomMenu
export const BottomMenu = props => {
  const {visible, onClose} = props;
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
            <View style={{alignSelf: 'center'}}>
              <Avatar
                source={{
                  uri:
                    // this.props.user.userData.social_image != ''
                    //   ? this.props.user.userData.social_image
                    //   :
                    'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                }}
                avatarStyle={{
                  borderColor: themeStyle.MENTAL_SECONDARY,
                  borderWidth: 2,
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
                {'Khalida'}
              </Text>
            </View>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              // onPress={() => {
              //   props.onPress(item);
              //   props.OnReset();
              // }}
            >
              <Text style={styles.textStyleMenu}>{'Report Post'}</Text>
              {<Report />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              // onPress={() => {
              //   props.onPress(item);
              //   props.OnReset();
              // }}
            >
              <Text style={styles.textStyleMenu}>{'Hide Post'}</Text>
              {<Hide />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              // onPress={() => {
              //   props.onPress(item);
              //   props.OnReset();
              // }}
            >
              <Text style={styles.textStyleMenu}>{'Save Post'}</Text>
              {<Save />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: '2%',
                marginBottom: '0.5%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              // onPress={() => {
              //   props.onPress(item);
              //   props.OnReset();
              // }}
            >
              <Text style={styles.textStyleMenu}>{'Pin Post'}</Text>
              {<Pin />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                marginHorizontal: '2%',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
              // onPress={() => {
              //   props.onPress(item);
              //   props.OnReset();
              // }}
            >
              <Text style={styles.textStyleMenu}>{'Block User'}</Text>
              {<Block />}
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
  blackText: {
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
    paddingHorizontal: SCREEN_WIDTH * 0.025,
    paddingBottom: SCREEN_HEIGHT * 0.001,
  },
  containerComment: {
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
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  modalContainer: {
    padding: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.6,
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
  rightSwipeItem: {
    // flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 10,
    height: '95%',
    // width: '20%',
    // alignItems: 'center',
    // paddingRight: 20,
  },
});
