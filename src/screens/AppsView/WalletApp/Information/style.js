import { StyleSheet } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.15,
  },
  btnGroup: {
    flexDirection: 'row',
    marginHorizontal: "6.5%",
    paddingVertical: "3.5%",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#F8D2D2",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  btnText2: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    // color: "#FF9D9D",
  },
  bottomBar: {
    height: 0.5,
    marginTop: 10,
    backgroundColor: themeStyle.COLOR_GREY
  },
  btn_1: {
    flex: 1,
    marginHorizontal: "5%",
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    textAlign: 'center',
  },
  btnText_1: {
    textAlign: 'center',
    // paddingVertical: 16,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
 
});
