import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  cardCotainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    paddingVertical: '5%',
  },
  imageStyle: {height: 200, width: SCREEN_WIDTH * 0.9},
  imageStyle2: {
    height: 100,
    width: 130,
    borderRadius: 20,
    margin: 10,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: '5%',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  whiteText1: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  descContainer: {
    marginLeft: '2.5%',
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  descContainer1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal:"5%"
  },
  grayText: {
    fontSize: 16,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    // width: SCREEN_WIDTH * 0.7,
  },
  grayText1: {
    fontSize: 14,
    // marginTop: '5%',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
  },
  blackText: {
    fontSize: 20,
    color: '#38474F',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackText1: {
    fontSize: 16,
    color: '#000000',
    fontFamily: themeStyle.FONT_BOLD,
  },
  btonContainer: {
    flexDirection: 'row',
    backgroundColor: themeStyle.CLASSIFIED_HOME,
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
  },
  gap: {
    width: 10,
  },
  imageStyle1: {
    marginTop: '5%',
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.9,
  },
  blueText: {
    fontSize: 10,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 22,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontStyle: 'italic',
  },
  addName: {
    fontSize: 22,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  description: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 10,
  },
});
