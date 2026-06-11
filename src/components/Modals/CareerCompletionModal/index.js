import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import Icon from '../../Icon';
import themeStyle from '../../../assets/styles/theme.style';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

const CareerCompletionModal = ({
  visible,
  onClose,
  saved,
  applied,
  updateProfile,
  savedText,
  topAds,
  bottomAds,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  function pagination() {
    return (
      <Pagination
        dotsLength={topAds?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.topBannerContainer} key={index}>
        <FastImage
          source={{uri: item?.logo}}
          style={styles.topBanner}
          resizeMode="cover"
        />
        {item?.tagline != '' && (
          <Text style={styles.descStyle}>{item?.tagline}</Text>
        )}
      </View>
    );
  };

  renderBottomAds = ({item, index}) => {
    return (
      <View style={styles.bottomBannerContainer} key={index}>
        {item?.tagline != '' && (
          <Text style={styles.descStyle}>{item?.tagline}</Text>
        )}
        <FastImage
          source={{uri: item?.logo}}
          style={styles.bottomBanner}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      isVisible={visible}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {topAds?.length > 0 ? (
            <Carousel
              data={topAds}
              layout="default"
              autoplay={true}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              loop={true}
              renderItem={renderItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              itemHeight={SCREEN_HEIGHT * 0.15}
              onSnapToItem={index => setActiveSlide(index)}
            />
          ) : null}
          {topAds?.length > 0 && pagination}
          <TouchableOpacity style={styles.crossButton} onPress={onClose}>
            <Icon.Entypo
              name="cross"
              size={25}
              color="black"
              onPress={onClose}
            />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/gifs/post-saved.gif')}
            style={styles.gif}
          />
          <Text style={styles.title}>
            {saved
              ? savedText
              : updateProfile
              ? 'Your preferences have been'
              : applied
              ? 'Best of Luck'
              : null}
          </Text>
          <Text style={styles.description}>
            {saved
              ? 'Great choice! This job is now in your saved list'
              : updateProfile
              ? 'Great choice! This job is now in your saved list'
              : applied
              ? 'The job is created and ready for applications'
              : null}
          </Text>
          {applied ? (
            <Text style={styles.text}>
              Concerned person will contact you either directly or through{' '}
              <Text style={{color: themeStyle.CARRER_PRIMARY}}>MC daak</Text>
            </Text>
          ) : null}
          {bottomAds?.length > 0 && (
            <Carousel
              data={bottomAds}
              layout="default"
              autoplay={true}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              loop={true}
              renderItem={renderBottomAds}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              itemHeight={SCREEN_HEIGHT * 0.15}
              onSnapToItem={index => setActiveSlide(index)}
            />
          )}
          {bottomAds?.length > 0 && pagination}
        </View>
      </View>
    </Modal>
  );
};

export default CareerCompletionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  adsPlaceholder: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  paginationContainer: {
    position: 'absolute',
    top: '70%',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  descStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    marginTop: '1%',
    width: '98%',
    textAlign: 'justify',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 5,
  },
  innerContainer: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  crossButton: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  gif: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
  },
  description: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.CARRER_PRIMARY,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  text: {
    marginTop: 24,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  topBanner: {
    width: SCREEN_WIDTH - 40,
    aspectRatio: 194 / 63,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: 'flex-start',
  },
  bottomBanner: {
    width: SCREEN_WIDTH - 40,
    aspectRatio: 194 / 63,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'flex-start',
  },
  topBannerContainer: {alignSelf: 'flex-start'},
  bottomBannerContainer: {alignSelf: 'flex-start', marginTop: 15},
});
