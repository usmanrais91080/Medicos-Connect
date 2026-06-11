import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    padding: '1%',
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
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.4,
    backgroundColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer3: {
    marginTop: '2.5%',
    flexDirection: 'row',
    borderWidth:1,
    borderColor:themeStyle.EDUCATION_BROWN,
    height: 30,
    width: SCREEN_WIDTH * 0.4,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  grayTextStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  grayTextStyle1: {
    fontSize: 8.5,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
    textAlign: 'center',
  },
  blackText2: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
    textAlign: 'center',
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#313131',
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_LIGHT_GREY,
    // height:SCREEN_HEIGHT*0.60,
    borderRadius: 15,
    maxHeight: SCREEN_HEIGHT * 0.6,
    // flex:1
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  sliderStyle: {
    backgroundColor: themeStyle.COLOR_LIGHT_GREY,
    alignSelf: 'center',
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: '2%',
    width: SCREEN_WIDTH * 0.85,
    borderRadius: 5,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#313131',
    textAlign: 'center',
  },
  blackText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
});
