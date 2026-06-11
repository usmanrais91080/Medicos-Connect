import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';

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
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginHorizontal: 10,
    lineHeight: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    marginTop: '10%',
    paddingBottom: '5%',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeStyle.DARK_GRAY,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  resendButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    borderBottomWidth: 1,
  },
  resendCode: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 10,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  doneButton: {
    backgroundColor: '#7FC682',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  done: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 22,
  },
});
