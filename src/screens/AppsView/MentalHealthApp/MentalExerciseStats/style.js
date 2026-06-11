import { StyleSheet } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    flex: 1,
  },
  gif: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH * 0.9,
    paddingTop: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: "center"
  },
  grayText: {
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  textContainer: {
    backgroundColor: '#FF6B6B',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    borderRadius: 25,
  },
  textContainer1: {
    backgroundColor: 'white',
    // padding: '2%',
    height: 35,
    width: 100,
    // paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10,
  },
  blackText: {
    // textAlign: 'center',
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 15,
    marginBottom: '2%'
  },
});
