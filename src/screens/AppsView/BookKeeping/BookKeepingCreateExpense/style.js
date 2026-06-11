import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  linearGradient: {
    marginHorizontal: '10%',
    height: 149,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
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
    marginHorizontal: '5%',
    marginVertical: 20,
  },
  inputContainerStyle1: {
    height: 50,
    borderColor: themeStyle.COLOR_BOOK_KEEPING,
    borderWidth: 2,
    borderBottomWidth: 2,
    // borderColor: themeStyle.COLOR_LIGHT_GREY,
    borderRadius: 10,
    // backgroundColor: themeStyle.COLOR_WHITE,
  },
  inputStyle1: {
    fontSize: 14,
    marginLeft: '2.5%',
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
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer1: {
    // padding: "7.5%",
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
    fontFamily: themeStyle.FONT_BOLD,
  },
  labelStyle: {
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    fontWeight: 'normal',
    marginBottom:5
  },
});
