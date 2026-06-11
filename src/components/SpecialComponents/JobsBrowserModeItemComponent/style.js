import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 10,
    padding: '5%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginTop: '2.5%',
    marginLeft: 20,
    marginRight: -10,
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#38474F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  grayTextStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    lineHeight: 20,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginBottom: 3,
  },
  iconContainer: {
    height: 38,
    width: 50,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 7,
    position: 'absolute',
    right: 0,
    top: 5,
  },
});
