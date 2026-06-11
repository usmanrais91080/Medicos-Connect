import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '..';
import Image from 'react-native-image-progress';
import THEME from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {HorizontalSpacer} from '../../lib/utils/global';
import {Avatar} from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
const CheckedBox = ({
  data,
  userList,
  onPress,
  classified,
  video,
  ad,
  stories,
  gameImage,
}) => {
  const _renderItems = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onPress()}>
        {/* <Image
          resizeMode="cover"
          source={{uri: 'https://wallpapercave.com/wp/wp3396910.jpg'}}
          style={styles.contentContainer}
        /> */}
        <View style={styles.cardContainer}>
          <View>
            {/* <Image resizeMode={"contain"} source={require('../../assets/images/icon1.png')} style={styles.iconImage} /> */}
          </View>
          <View style={styles.cardTextContainer}>
            {/* <Text style={styles.textStyle}>Product Name Lorem ipsum dor Set ...</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderVideosItems = (item, index) => {
    return <></>;
  };

  const _renderGamesImagesItems = (item, index) => {
    return (
      <>
        <Image
          resizeMode="cover"
          source={{uri: item.image}}
          style={styles.imageStyle2}
        />
      </>
    );
  };

  const _renderUsers = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{
          height: SCREEN_HEIGHT * 0.175,
          width: SCREEN_WIDTH * 0.3,
        }}
      >
        {ad ? null : (
          <>
            <View>
              <Avatar source={{uri: item.avatar}} rounded size={60} />
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Text style={styles.whiteTextStyle}>{item.username}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const _renderStories = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{borderRadius: 10}}
          source={{uri: item?.multi_media[0]?.file}}
          style={styles.userContentContainer}
        >
          <View>
            <Avatar
              source={{uri: item.social_profile.avatar}}
              rounded
              size={60}
            />
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={styles.whiteTextStyle}>
              {item.social_profile.username}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const _renderClassifiedAds = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onPress()} style={styles.itemContainer}>
        <View>
          <ImageBackground source={{uri: item.image}} style={styles.imageStyle}>
            <View style={{alignItems: 'flex-end', padding: '5%'}}>
              <Icon.AntDesign name="heart" size={20} color="#FF9966" />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.grayText}>{item.name}</Text>
          <Text style={styles.blackText}>{item.price}</Text>
          <View style={styles.rowStyle}>
            <Text style={styles.grayText}>{item.address}</Text>
            <Text style={styles.grayText}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const classifiedSpacer = () => {
    return <View style={{width: 5}} />;
  };
  return (
    <FlatList
      data={data}
      horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: video ? 10 : gameImage ? 10 : classified ? 5 : 0,
        paddingRight: classified ? '50%' : 5,
        paddingBottom: '5%',
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) =>
        classified
          ? _renderClassifiedAds(item, index)
          : userList
          ? _renderUsers(item, index)
          : stories
          ? _renderStories(item, index)
          : video
          ? _renderVideosItems(item, index)
          : gameImage
          ? _renderGamesImagesItems(item, index)
          : _renderItems(item, index)
      }
      ItemSeparatorComponent={classified ? classifiedSpacer : HorizontalSpacer}
    />
  );
};

const styles = StyleSheet.create({
  whiteTextStyle1: {
    fontFamily: THEME.FONT_MEDIUM,
    color: THEME.COLOR_WHITE,
    marginHorizontal: 5,
    textTransform: 'uppercase',
  },
  whiteTextStyle2: {
    fontFamily: THEME.FONT_MEDIUM,
    color: THEME.COLOR_WHITE,
    marginHorizontal: 5,
    textTransform: 'uppercase',
  },
  cardContainer: {
    backgroundColor: THEME.COLOR_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: SCREEN_WIDTH * 0.65,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    height: SCREEN_HEIGHT * 0.103,
    width: SCREEN_WIDTH * 0.65,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  userContentContainer: {
    // flex: 1,
    height: SCREEN_HEIGHT * 0.175,
    width: SCREEN_WIDTH * 0.3,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userContainer: {
    // padding: 15,
  },
  contentVideoContainer: {
    backgroundColor: THEME.DASH_LIGHT,
    borderRadius: 25,
    padding: '5%',
    overflow: 'hidden',
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.7,
  },
  imageStyle1: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.7,
  },
  imageStyle2: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.7,
  },
  iconImage: {
    height: 38,
    width: 38,
  },
  cardTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  textStyle: {
    fontSize: 10,
    fontFamily: THEME.FONT_REGULAR,
  },
  whiteTextStyle: {
    fontSize: 12,
    fontFamily: THEME.FONT_REGULAR,
    color: 'white',
  },
  colorTextStyle: {
    fontSize: 10,
    fontFamily: THEME.FONT_REGULAR,
    color: THEME.PRIMARY_TINT_COLOR,
  },
  itemContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    width: SCREEN_WIDTH * 0.465,
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.14,
    width: '100%',
  },
  nameText: {
    // fontSize: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText: {
    fontSize: 10,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackText: {
    marginLeft: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  rowStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerContainer: {
    padding: 5,
  },
});

export default CheckedBox;
