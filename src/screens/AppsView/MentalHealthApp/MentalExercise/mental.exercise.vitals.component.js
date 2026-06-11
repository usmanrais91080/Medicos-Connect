import React, { useRef, useState } from 'react';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import { TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import { VerticalSpacer } from '../../../../lib/utils/global';
import Lottie from 'lottie-react-native';


//BottomMenu
const homedata2 = [
  {
    id: 1,
    category: 'Water Intake Today?',
    amount: 30,
  },
  {
    id: 2,
    category: 'Me Time',
    amount: 30
  },
  {
    id: 3,
    category: 'How Many Hours Have You Slept?',
    amount: 30
  },
  {
    id: 4,
    category: 'Wrote A Journal?',
    amount: 30
  },
  {
    id: 5,
    category: 'Being Nice To Someone?',
    amount: 30
  },
  {
    id: 6,
    category: 'Did You Make A Friend Today?',
    amount: 30
  }
]
export const MentalExerciseVitals = props => {

  const flatlistRef = useRef()
  const { visible, onClose, data, ans } = props;
  const [currentPage, setCurrentPage] = useState(0)

  const setSliderPage = event => {
    const x = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x.x / Math.floor(SCREEN_WIDTH));
    if (indexOfNextScreen !== currentPage) {
      setCurrentPage(indexOfNextScreen)
    }
  };

  const _renderAdsItem = ({ item, index }) => {
    // console.log(">>>>>", item);
    let newIndex = index + 1;
    let close = newIndex === data?.length ? true : false

    return (
      <View style={{ width: SCREEN_WIDTH, alignItems: 'center' }}>
        <View style={{ height: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.9, backgroundColor: 'white', marginTop: SCREEN_HEIGHT * 0.06, borderRadius: 15, alignItems: 'center' }}>
          <View style={{ width: SCREEN_HEIGHT * 0.15, height: SCREEN_HEIGHT * 0.15, top: -SCREEN_HEIGHT * 0.09 }}>
            <Lottie
              source={require('../../../../assets/animation/74194-sleepy-sleep.json')}
              autoPlay
              loop
            // style={{ marginLeft: SCREEN_WIDTH * 0.15, marginTop: '5%', }}
            />
          </View>
          <View style={{ alignSelf: 'flex-start', marginLeft: SCREEN_WIDTH * 0.1, top: -SCREEN_HEIGHT * 0.05 }}>
            {/* <Text style={[styles.grayTextStyle, { fontSize: 15 }]}>
              Have You
            </Text> */}
            <Text style={[styles.grayTextStyle, { fontSize: 20, fontWeight: '700' }]}>
              {item?.question}
            </Text>
            {/* <Text style={[styles.grayTextStyle, { fontSize: 20 }]}>
              Today ?
            </Text> */}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.7 }}>
            <TouchableOpacity
              style={styles.buttonStyleDone}
              onPress={() => nextSlide(close, newIndex, false, item?._id)}
            >
              <Text style={[styles.textStylebutton]}>{'Yes'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleDone}
              onPress={() => nextSlide(close, newIndex, false, item?._id)}
            >
              <Text style={[styles.textStylebutton]}>{'No'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const nextSlide = (close, newIndex, answer, id) => {
    ans(answer, id)
    if (close) {
      onClose()
    }
    else {
      flatlistRef.current.scrollToIndex({ index: newIndex, animated: true });

    }
  }
  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInRight'}
      backdropColor={'#E9E9E9'}
      animationOut={'slideOutRight'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={(styles.modalContainer)}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON,
        }}>

        <>
          {/* <View style={{ alignItems: 'center', marginTop: '5%', alignSelf: 'center', height: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.73, borderRadius: 15, backgroundColor: themeStyle.COLOR_WHITE }}> */}
          <FlatList
            ref={flatlistRef}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={_renderAdsItem}
            ItemSeparatorComponent={VerticalSpacer}
            pagingEnabled={true}
            onScroll={event => setSliderPage(event)}
            bounces={true}
            snapToInterval={SCREEN_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON, height: SCREEN_HEIGHT * 0.45, justifyContent: 'center', alignItems: 'center' }}
          />
          <View style={styles.paginationWrapper}>
            {data.map((val, index) => (
              <View
                style={
                  currentPage === index
                    ? styles.dotStyle
                    : styles.inactiveDotStyle
                }
              />
            ))}
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
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
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
    fontSize: 11,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.45,
    width: SCREEN_WIDTH,
    alignSelf: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '70%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontWeight: '700'
    // textDecorationLine: 'underline',
  },
  buttonStyle: {
    padding: 10,
    marginTop: '15%',
    marginBottom: '6%',
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.4,
    alignItems: 'center',

  },
  buttonStyleDone: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#F7F0E7',
    height: SCREEN_HEIGHT * 0.055,
    marginBottom: '10%',
    width: SCREEN_WIDTH * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7F0E7',

  },
  textStylebutton: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,

  },
  dotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON,
  },
  inactiveDotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },
  paginationContainer: {
    position: 'absolute',
    top: '65%',
    left: '20%',
  },
  paginationWrapper: {
    bottom: '10%',
    position: 'absolute',
    // left: '35%',
    // right: 0,
    // marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    // width: SCREEN_WIDTH,
    // height: 50
  },
});
