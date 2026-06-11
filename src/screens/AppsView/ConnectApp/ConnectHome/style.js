import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 22,
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  dropdown: {alignItems: 'center', marginBottom: 15},
  reportUser: {
    fontSize: 24,
    color: themeStyle.PINK,
    fontFamily: themeStyle.FONT_BOLD,
  },
  reportHeadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: themeStyle.BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginBottom: 5,
    marginTop: 3,
  },
  line: {
    height: 2,
    width: '50%',
    backgroundColor: themeStyle.CYAN_BLUE,
    marginTop: 10,
    marginBottom: 5,
  },
  datingStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FF6B6B',
  },
  headingStyle: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.9,
    width: SCREEN_WIDTH,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3);',

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
    width: SCREEN_WIDTH * 0.66,
    paddingTop: '5%',
  },
  textContainer1: {
    backgroundColor: themeStyle.SPANISH_PINK,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    borderRadius: 10,
  },
  textContainer2: {
    backgroundColor: themeStyle.SPANISH_PINK,
    height: 30,
    paddingHorizontal: '5%',
    justifyContent: 'center',
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
    color: themeStyle.COLOR_BLACK,
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
    height: SCREEN_HEIGHT * 0.58,
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
    top: '55%',
    left: '20%',
    zIndex: 1,
  },
  paginationWrapper: {
    top: '50%',
    position: 'absolute',
    left: '35%',
    // right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  scroller: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.8,
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: 'center',
    paddingVertical: '8%',
  },
  modalBackgroundContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    width: SCREEN_WIDTH * 0.9,
  },
  itemModalContainer: {
    borderRadius: 5,
    marginTop: '5%',
    backgroundColor: '#F4F4F4',
    borderColor: '#F2B6B6',
    borderWidth: 2,
    padding: '5%',
  },
  itemSelectedModalContainer: {
    borderRadius: 5,
    marginTop: '5%',
    backgroundColor: '#F2B6B6',
    borderColor: '#F4F4F4',
    borderWidth: 2,
    padding: '5%',
  },
  noMatchedText: {
    fontFamily: themeStyle.FONT_BOLD,
    marginHorizontal: 30,
    textAlign: 'center',
    lineHeight: 23,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
  },
  dating: {
    fontSize: 18,
  },
});
