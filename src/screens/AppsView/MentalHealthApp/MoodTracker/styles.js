import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  title: {
    fontSize: 32,
    color: themeStyle.PURPLE_COLOR,
    fontFamily: themeStyle.FONT_BOLD,
    marginTop: 26,
    marginLeft: 20,
  },
  flatlist: {
    marginHorizontal: 20,
    paddingBottom: 30,
  },
  moodContainer: {
    backgroundColor: themeStyle.ORANGE_LIGHT,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodImage: {
    backgroundColor: themeStyle.COLOR_YELLOWISH,
    borderRadius: 9,
    marginRight: 10,
    height: 68,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mood: {
    fontSize: 20,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  progressContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    height: 30,
    borderRadius: 8,
    padding: 3,
    marginTop: 14,
  },
  progress: {
    backgroundColor: themeStyle.COLOR_YELLOWISH,
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 20,
    color: themeStyle.PURPLE_COLOR,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'flex-end',
    marginBottom: 3,
    width: '16%',
    textAlign: 'right',
  },
  button: {
    backgroundColor: themeStyle.ORANGE_LIGHT,
    height: 26,
    marginRight: 7,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 22,
  },
  buttonText: {
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    paddingHorizontal: 20,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
