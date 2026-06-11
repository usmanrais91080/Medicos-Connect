import {Platform, StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  datingStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: themeStyle.COLOR_WHITE,
    borderWidth: 1,
  },
  headingStyle: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: '5%',
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    borderRadius: 25,
  },
  text2Container: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: '5%',
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    borderRadius: 25,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH * 0.75,
    paddingTop: '5%',
  },
  textContainer1: {
    backgroundColor: '#FF6B6B',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    borderRadius: 10,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10,
  },
  grayText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10,
  },
  whiteText1: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  grayText1: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  nameText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
  },
  ageText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  nameText1: {
    color: '#38474F',
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
  },
  ageText1: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  image: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH,
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
  paginationContainer: {
    position: 'absolute',
    top: '65%',
    left: '20%',
  },
  paginationWrapper: {
    top: '40%',
    position: 'absolute',
    left: '35%',
    // right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroller: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.8,
  },
});
