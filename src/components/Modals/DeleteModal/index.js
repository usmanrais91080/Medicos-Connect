import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import Bell from '../../../assets/svg/bell';
import SendedSvg from '../../../assets/svg/sendedplane.svg';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
const UploadingModal = props => {
  const [activeSlide, setActiveSlide] = useState(0);

  function pagination() {
    return (
      <Pagination
        dotsLength={props?.topAds?.length}
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
          source={{uri: item?.logo}}
          style={styles.topAdImage}
          resizeMode="cover"
        />
        {item?.tagline != '' && (
          <Text style={styles.descStyle}>{item?.tagline}</Text>
        )}
      </View>
    );
  };

  const renderBottomAds = ({item, index}) => {
    return (
      <View style={{alignSelf: 'flex-start'}} key={index}>
        <FastImage
          source={{uri: item?.logo}}
          style={styles.bottomAdName}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={600}
      animationOutTiming={600}
      animationIn={'slideInUp'}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBackgroundContainer}>
          {props.verify ? (
            <View>
              <Carousel
                data={props?.topAds}
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
              {props?.topAds?.length > 0 && pagination}
              <View style={{alignSelf: 'center', marginTop: 15}}>
                <SendedSvg />
              </View>
            </View>
          ) : null}
          <View style={{paddingBottom: '10%', paddingHorizontal: '10%'}}>
            {(props.alert && !props.verify) || (props.text && !props.verify) ? (
              <Bell style={styles.bell} />
            ) : null}
            {props.filter ? (
              <Text style={styles.headingText}>
                Are you sure you want to go back?
              </Text>
            ) : props.deactive ? (
              <Text style={styles.headingText}>
                Are you sure you want to delete your account? All your progress
                will be lost.
              </Text>
            ) : props.signOut ? (
              <Text style={styles.headingText}>
                Are you sure you want to signout?
              </Text>
            ) : props.blockUser ? (
              <Text style={styles.headingText}>
                Are you sure you want to block the user?
              </Text>
            ) : props.class ? (
              <Text style={styles.headingText}>
                Are you sure you want to delete this class?
              </Text>
            ) : props.text ? (
              <Text
                style={props.verify ? styles.headingText3 : styles.headingText2}
              >
                {props.text}
              </Text>
            ) : (
              <Text style={styles.headingText}>
                Are you sure you want to delete this item?
              </Text>
            )}
            {props.msg ? null : (
              <View
                style={props.alert ? styles.btnContainer1 : styles.btnContainer}
              >
                <TouchableOpacity
                  onPress={() => props.confirm()}
                  style={props.verify ? styles.bluebtn : styles.brownbtn}
                >
                  <Text
                    style={props.verify ? styles.whiteText : styles.blackText}
                  >
                    {props.alert ? 'OK' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
                {props.alert ? null : (
                  <TouchableOpacity
                    onPress={() => props.cancel()}
                    style={styles.whiteBtn}
                  >
                    <Text style={styles.blackText}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        {props.verify ? (
          <View style={styles.bottomAdContainer}>
            {props.bottomAds?.length > 0 && (
              <Carousel
                data={props.bottomAds}
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
            {props.bottomAds?.length > 0 && pagination}
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  btnContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '5%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  brownbtn: {
    backgroundColor: themeStyle.EDUCATION_BROWN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  bluebtn: {
    backgroundColor: '#0B90CF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  whiteBtn: {
    backgroundColor: themeStyle.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderWidth: 2,
    color: themeStyle.COLOR_BLACK,
  },
  blackText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  whiteText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  modalBackgroundContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: SCREEN_WIDTH * 0.9,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  colorText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.BAR_COLOR,
  },
  // blackText: {
  //   fontFamily: themeStyle.FONT_MEDIUM,
  //   fontSize: 16,
  //   color: '#B2B2B2',
  // },
  headingText: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
    marginHorizontal: '5%',
    color: '#959FAE',
    textAlign: 'center',
    marginTop: 20,
  },
  headingText2: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    marginHorizontal: '5%',
    color: '#000000',
    textAlign: 'center',
    marginTop: 15,
  },
  headingText3: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 20,
    // marginHorizontal: 12,
    color: '#000000',
    textAlign: 'center',
    marginTop: 15,
  },
  descStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    marginTop: '1%',
    width: '98%',
    textAlign: 'justify',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  bell: {alignSelf: 'center', marginVertical: 25},
  topAdImage: {
    width: SCREEN_WIDTH * 0.9,
    aspectRatio: 194 / 63,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'flex-start',
  },
  bottomAdName: {
    width: SCREEN_WIDTH * 0.9,
    aspectRatio: 194 / 63,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  bottomAdContainer: {
    position: 'absolute',
    bottom: '-17%',
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
});

export default UploadingModal;
