import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  emojiContainer: {
    padding: 5,
    marginBottom: 7,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    width: SCREEN_WIDTH * 0.165,
    height: SCREEN_WIDTH * 0.165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyle.BAR_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  btnText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 12,
    marginLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 428,
    width: SCREEN_WIDTH,
  },
  nameText: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  whiteText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'white',
  },
  grayText: {
    fontSize: 10,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blueText: {
    fontSize: 10,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  blackText: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_BOLD,
  },
  rowContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adContainer: {
    marginVertical: '3%',
    backgroundColor: 'white',
    paddingVertical: '5%',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginBottom: '2.5%',
  },
  centeredContaienr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_text_style: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  iconStyleClose: {
    paddingLeft: SCREEN_WIDTH * 0.75,
    marginVertical: 5,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeading: {
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
  },
  textModal: {
    width: SCREEN_WIDTH * 0.85,
    // height:SCREEN_HEIGHT * 0.5,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 20,
    marginTop: 70,
    padding: 20,
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  innerTextModal: {
    width: '100%',
    // height: SCREEN_HEIGHT * 0.22,
    borderRadius: 10,
    // backgroundColor: '#F4F4F4',
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  innerBackgroundModal: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.32,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  containerStyle1: {
    height: 40,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  inputContainerStyle1: {
    height: 45,
    borderBottomWidth: 0,
    borderRadius: 10,
    margin: 0,
    width: '100%',
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  inputStyle1: {
    fontSize: 14,
    marginLeft: '2.5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  innerLocationModal: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.32,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
});
