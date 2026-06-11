import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

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
  chooseModeContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  selectedStyle: {
    backgroundColor: '#99CC66',
    margin: 5,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.425,
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unSelectedStyle: {
    margin: 5,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.425,
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosedText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  unChoosedText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
});
