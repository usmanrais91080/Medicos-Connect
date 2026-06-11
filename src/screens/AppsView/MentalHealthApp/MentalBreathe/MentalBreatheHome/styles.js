import {StyleSheet} from 'react-native';
import themeStyle from '../../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  breathe: {
    fontSize: 32,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PURPLE_COLOR,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 14,
  },
  exercise: {
    fontFamily: themeStyle.FONT_BOLD,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  exerciseContainer: {
    backgroundColor: themeStyle.ORANGE_LIGHT,
    borderRadius: 6,
    padding: 20,
    height: 150,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseImage: {
    height: 50,
  },
  exerciseText: {
    fontSize: 16,
    color: '#151515',
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 2,
  },
});
