import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {scaleFont, scaleImage} from '../../lib/utils/global';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  image: {
    borderRadius: 13,
    position: 'absolute',
    top: -15,
    right: -20,
    zIndex: 1,
    borderWidth: 2,
    borderColor: themeStyle.COLOR_BLACK,
  },
  title: {
    color: themeStyle.COLOR_WHITE,
    fontSize: scaleFont(24),
    marginTop: '5%',
    fontFamily: themeStyle.FONT_BOLD,
  },
  text: {
    fontSize: scaleFont(20),
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_WHITE,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: '5%',
    lineHeight: 30,
  },
  youtubeVideoContainer: {
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  box: {
    height: 67,
    width: 67,
    borderRadius: 7,
    backgroundColor: themeStyle.COLOR_WHITE,
    marginRight: 17,
  },
  videoTitle: {
    color: themeStyle.COLOR_WHITE,
    fontSize: scaleFont(20),
    fontFamily: themeStyle.FONT_BOLD,
  },
  videoDescription: {
    fontSize: scaleFont(14),
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    marginRight: 8,
  },
  startButton: {
    width: '100%',
    backgroundColor: themeStyle.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: '6%',
    borderRadius: 10,
    marginBottom: 60,
  },
  start: {
    fontSize: scaleFont(22),
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  imageContainer1: {
    backgroundColor: '#BFA7A7',
    width: scaleImage(SCREEN_WIDTH * 0.45),
    height: scaleImage(SCREEN_WIDTH * 0.45),
    borderRadius: 13,
    marginTop: '15%',
  },
  imageContainer2: {
    backgroundColor: '#282828',
    width: scaleImage(SCREEN_WIDTH * 0.45),
    height: scaleImage(SCREEN_WIDTH * 0.45),
    borderRadius: 13,
    position: 'absolute',
    top: -15,
    right: -20,
    zIndex: 1,
  },
  icon: {marginLeft: 10},
});
