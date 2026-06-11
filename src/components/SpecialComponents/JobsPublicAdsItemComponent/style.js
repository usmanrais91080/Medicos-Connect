import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: '5%',
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
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayTextStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginTop: 8,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  textStyle1: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.CARRER_PRIMARY,
  },
  image2Style: {
    height: SCREEN_HEIGHT * 0.228,
    width: SCREEN_WIDTH * 0.9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: themeStyle.WHITE_SMOKE,
  },
});
