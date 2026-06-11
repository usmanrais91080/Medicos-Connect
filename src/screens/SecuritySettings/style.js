import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#444444',
  },
  leftContainer: {
    flex: 0.3,
    flexDirection: 'column',
  },
  rightContainer: {
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    color: themeStyle.COLOR_BLACK,
    fontSize: 15,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
    marginTop: 5,
    fontFamily: themeStyle.FONT_REGULAR,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingBottom: '5%',
  },
  button: {
    height: 40,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: themeStyle.COLOR_SILVER,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
});
