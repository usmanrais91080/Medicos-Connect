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
    height: 40,
    // borderColor: themeStyle.COLOR_LIGHT_GREY,
    // borderRadius: 10,
    // backgroundColor: themeStyle.COLOR_WHITE,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  lowerContainer: {
    flex: 0.6,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  itemContainer: {
    margin: '5%',
    alignSelf: 'center',
  },
  itemRowContainer: {
    paddingHorizontal: '5%',
    marginVertical: '5%',
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
    fontFamily: themeStyle.FONT_REGULAR,
  },
  labelStyle: {
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    fontWeight: 'normal',
  },
  //

  upperContainer: {
    flex: 0.35,
  },

  upperItemContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    paddingHorizontal: '5%',
    padding: '2.5%',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  floatingBtnContainer: {
    width: SCREEN_WIDTH * 0.9,
    position: 'absolute',
    // top: SCREEN_HEIGHT * 0.35,
    // left: 22,
    bottom: 80,
    alignSelf: 'center',
  },
  dateContainer: {
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    backgroundColor: '#E9E8E8',
    borderRadius: 7,
    flexDirection: 'row',
    padding: 10,
  },
  dateText: {
    color: '#424242',
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
