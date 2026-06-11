import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {scaleFont} from '../../../../lib/utils/global';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  cardContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: '5%',
    borderRadius: 10,
    marginHorizontal: '2.5%',
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
    marginTop: '5%',
    fontSize: scaleFont(22),
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  gap: {
    width: 15,
  },
  designationText: {
    fontSize: scaleFont(14),
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  headingText: {
    fontSize: scaleFont(16),
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  colorHeadingText: {
    fontSize: scaleFont(16),
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
    textDecorationLine: 'underline',
  },
  colorHeadingText1: {
    fontSize: scaleFont(18),
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
  },
  colorText: {
    fontSize: scaleFont(14),
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  descText: {
    fontSize: scaleFont(12),
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  btnContainer: {
    marginVertical: '5%',
    backgroundColor: '#1DD1A1',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    fontSize: scaleFont(16),
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  btnText: {
    color: themeStyle.COLOR_BLACK,
    fontSize: scaleFont(12),
    fontFamily: themeStyle.FONT_REGULAR,
  },
  btnText1: {
    color: 'gray',
    fontSize: scaleFont(12),
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingVertical: '2.5%',
  },
});
