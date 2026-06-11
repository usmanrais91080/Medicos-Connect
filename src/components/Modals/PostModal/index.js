import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Modal, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import themeStyle from '../../../assets/styles/theme.style';
import Icon from '../../Icon';

const PostModal = ({
  isVisible,
  topAds,
  gifFile,
  description,
  title,
  onClose,
  text,
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
      <View style={{alignSelf: 'flex-start'}} key={index}>
        <FastImage
          source={{
            uri: item?.logo,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
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
      <View style={{alignSelf: 'flex-start'}} key={index}>
        {item?.tagline != '' && (
          <Text style={styles.descStyle}>{item?.tagline}</Text>
        )}
        <FastImage
          source={{
            uri: item?.logo,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.bottomBanner}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: themeStyle.COLOR_WHITE,
            width: SCREEN_WIDTH - 30,
            borderRadius: 10,
          }}
        >
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
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.closeBtn}>
              <Icon.Ionicons
                name="close"
                size={25}
                color={themeStyle.COLOR_BLACK}
                onPress={onClose}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <FastImage source={gifFile} style={styles.image} />
          {description && <Text style={styles.description}>{description}</Text>}
          {text && <Text style={styles.text}>{text}</Text>}
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

export default PostModal;
