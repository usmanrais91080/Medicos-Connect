import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    height: 40,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    marginLeft: 10,
    flex: 1,
    color: themeStyle.DARK_GRAY,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
});
