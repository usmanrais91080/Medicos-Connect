import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  linearGradient: {
    marginHorizontal: '10%',
    height: 149,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  enterAmount: {
    fontSize: 16,
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    marginBottom: 3,
  },
  buttonText: {
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
    // marginBottom: "5%",
  },
  buttonText1: {
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
    top: -10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20%',
    top: -20,
  },
  inputContainer: {
    marginHorizontal: '10%',
    marginVertical: 20,
  },
  inputContainerStyle1: {
    height: 60,
    borderColor: themeStyle.COLOR_BOOK_KEEPING,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  inputStyle1: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  itemContainer: {
    margin: '5%',
    alignSelf: 'center',
  },
  itemRowContainer: {
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRowContainer2: {
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer1: {
    // paddingHorizontal: "7.5%",
    height: SCREEN_HEIGHT * 0.85,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalContainer2: {
    justifyContent: 'center',
    padding: '7.5%',
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 30,
  },
  titleText: {
    color: '#424242',
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginBottom: 3,
  },
  titleText2: {
    color: '#424242', //marginRight: "25%",
    fontFamily: themeStyle.FONT_REGULAR,
  },
  perText: {
    color: '#424242',
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
  },
  labelStyle: {
    color: '#424242',
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    fontWeight: 'normal',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    paddingVertical: '5%',
    // paddingLeft: '2.5%',
  },
  selectedOption: {
    height: 40,
    width: SCREEN_WIDTH * 0.25,
    backgroundColor: '#FDDE83',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  unSelectedOption: {
    height: 40,
    backgroundColor: 'lightgray',
    width: SCREEN_WIDTH * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  whiteText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  grayText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  floatingBtnContainer: {
    position: 'relative',
    bottom: '5%',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
  },
});
