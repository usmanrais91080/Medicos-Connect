import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  container: {
    paddingTop: '5%',
    marginHorizontal: '5%',
  },
  cardContainer: {
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    padding: '5%',
    borderRadius: 10,
    flex: 1,
    marginBottom: 30,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginVertical: '1%',
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  titleText1: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  gap: {
    width: 15,
  },
  designationText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  headingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  colorHeadingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
    textDecorationLine: 'underline',
  },
  colorHeadingText1: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.CARRER_PRIMARY,
    textAlign: 'center',
  },
  colorText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  descText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  btnContainer: {
    // position: 'absolute',
    // bottom: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  blueText: {
    fontSize: 10,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  leftText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.CARRER_PRIMARY,
  },
  rightText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
});
