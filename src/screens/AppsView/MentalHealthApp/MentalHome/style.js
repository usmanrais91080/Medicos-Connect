import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    width: '49%',
    backgroundColor: themeStyle.ORANGE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    marginBottom: 8,
    borderRadius: 8,
  },
  icon: {
    height: 75,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  flatlist: {
    paddingHorizontal: 20,
    paddingTop: 12,
    width: '100%',
  },
  title: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 10,
  },
  leftIcon: {
    paddingLeft: 15,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
