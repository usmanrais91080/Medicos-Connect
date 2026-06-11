import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  minusContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 5,
    left: '100%',
  },
  textContainer: {
    backgroundColor: themeStyle.BUTTON_COLOR,
    padding: 10,
    borderRadius: 10,
  },
  containerStyle: {
    height: 110,
    marginBottom: 0,
    width: '100%',
    color: themeStyle.INPUT_TEXT,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    paddingHorizontal: 10,
  },
  inputContainerStyle: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: themeStyle.CYAN_BLUE,
    backgroundColor: '#FFFF',
    borderRadius: 8,
    height: 230,
    padding: 5,
  },
  headingText: {
    marginBottom: 8,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginHorizontal: '10%',
  },
  linkContainer: {
    borderWidth: 2,
    borderColor: '#BBD7EC',
    height: 36,
    borderRadius: 7,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkInput: {
    height: 36,
    fontSize: 14,
    color: themeStyle.INPUT_TEXT,
    fontFamily: themeStyle.FONT_REGULAR,
    justifyContent: 'center',
    width: '90%',
  },
});
