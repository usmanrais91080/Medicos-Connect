import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../lib/utils/constants';
import themeStyle from '../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: themeStyle.COLOR_LIGHT_GREY,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  rowContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grayText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginVertical: 2,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: 5,
    marginTop: "5%"
  },
  cardSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainerLeft: {
    // marginHorizontal:10,
    alignItems: 'center',
  },
  cardTextContainerRight: {
    // marginHorizontal:10
    // alignItems:'center',
    // justifyContent:'center',
    // textAlign:'right'
  },
  imageIcon: {
    height: 30,
    width: 30,
    marginRight: SCREEN_WIDTH * 0.04,
  },
  cardTextPrimary_1: {
    color: themeStyle.PRIMARY_TINT_COLOR_INACTIVE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    // fontWeight:'bold',
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
  },
  cardTextSecondaryLeft: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_LIGHT,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
    alignItems: 'center',
  },
  cardTextSecondaryRight: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_LIGHT,
    textAlign: 'right',
  },
  cardTextCardNumber: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
  },
  iconStyleCardLeft: {
    // paddingLeft:10
  },
});
