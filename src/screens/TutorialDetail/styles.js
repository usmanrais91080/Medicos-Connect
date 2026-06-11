import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '30%',
    paddingLeft: '2.5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 40,
    marginBottom: 20,
  },
  tutorials: {
    fontSize: 22,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 8,
  },
  menuheading: {
    color: '#38474F',
    marginLeft: 20,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 22,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingBottom: '5%',
  },
  title: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginTop: 11,
  },
  description: {
    fontSize: 12,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginBottom: 9,
  },
  video: {
    width: '90%',
    height: 300,
    backgroundColor: themeStyle.CYAN_BLUE,
    borderRadius: 15,
  },
});
