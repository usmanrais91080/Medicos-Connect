import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.15,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  upcomingClasses: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginTop: '5%',
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
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  gap: {
    width: 15,
  },
  designationText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
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
    fontSize: 18,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
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
    marginVertical: '5%',
    backgroundColor: '#1DD1A1',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  btnText1: {
    color: 'gray',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingVertical: '2.5%',
  },
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
  headingStyle: {
    color: 'white',
    fontSize: 12,
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
  text: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 3,
  },
});
