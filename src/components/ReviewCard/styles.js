import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    backgroundColor: themeStyle.WHITE_SMOKE,
    borderRadius: 10,
    padding: 15,
    marginTop: 8,
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.BLACK,
  },
  role: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#72737A',
    marginTop: 8,
  },
  review: {
    marginTop: 24,
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
