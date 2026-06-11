import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  line: {
    height: 1,
    backgroundColor: themeStyle.COLOR_SILVER,
    marginTop: 3,
    marginBottom: 12,
  },
  date: {
    paddingTop: 20,
    paddingLeft: 20,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
  },
  title: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    paddingLeft: 20,
  },
  body: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  image: {
    width: '90%',
    height: 320,
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 8,
  },
});
