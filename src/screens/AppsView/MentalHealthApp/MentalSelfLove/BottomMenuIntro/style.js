import {StyleSheet} from 'react-native';
import themeStyle from '../../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../../lib/utils/constants';

export default StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#D9D9D9',
    height: 60,
    elevation: 1,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
  },
});
