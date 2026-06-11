import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyle.BAR_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  percentage: {
    position: 'absolute',
    bottom: 5,
    right: 30,
    zIndex: 1,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 24,
  },
  myProgress: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    zIndex: 1,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 18,
  },
  btnText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 12,
    marginLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    paddingLeft: '1%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2.5%',
    marginVertical: '2.5%',
    marginBottom: '5%',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38474F',
    paddingVertical: '2.5%',
    paddingHorizontal: '14%',
    borderRadius: 10,
  },
  orangeText: {
    color: '#FF9966',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  itemContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.14,
    width: SCREEN_WIDTH * 0.46,
  },
  imageStyle1: {
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.95,
  },

  nameText: {
    // fontSize: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  whiteText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'white',
  },
  grayText: {
    fontSize: 10,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
  },
  blackText: {
    // marginLeft: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  rowContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adContainer: {
    marginVertical: '3%',
    backgroundColor: 'white',
    paddingVertical: '5%',
  },
  rowStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerContainer: {
    padding: 5,
  },
  headerContainer: {marginHorizontal: '5%', marginTop: '5%'},
  headerText: {
    fontSize: 32,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PURPLE_COLOR,
  },
  headerBoldText: {
    fontSize: 32,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.PURPLE_COLOR,
  },
  emptyText: {
    marginTop: 10,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginHorizontal: '5%',
  },
  mainItemContainer: {
    borderRadius: 10,
    marginVertical: '3%',
    marginHorizontal: '5%',
    height: 145,
    backgroundColor: themeStyle.WHITE_SMOKE,
  },
  bannerImage: {
    position: 'absolute',
    width: 230,
    height: 80,
    marginTop: 10,
    marginLeft: 12,
  },
  progressBarContainer: {
    marginTop: 100,
    alignSelf: 'center',
  },
  loaderContainer: {height: SCREEN_HEIGHT},
});
