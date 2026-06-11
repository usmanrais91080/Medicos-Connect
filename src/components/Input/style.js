import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  containerStyle: {
    height: null,
    marginBottom: 0,
    paddingHorizontal: 0,
    borderColor: themeStyle.COLOR_WHITE,
  },
  inputContainerStyle: {
    borderWidth: 0.5,
    borderColor: themeStyle.SLATE_GRAY,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    margin: 0,
    paddingLeft: 0,
    borderColor: themeStyle.COLOR_WHITE,
  },
  inputStyle: {
    fontSize: 14,
    marginLeft: '2.5%',
    color: 'red',
    fontFamily: themeStyle.FONT_REGULAR,
    borderColor: themeStyle.COLOR_WHITE,
  },
  labelStyle: {
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
  },
  phoneInputContainerStyle: {
    height: 54,
    width: '100%',
    borderBottomWidth: 0,
    // backgroundColor: '#171717',
  },
  phoneIputStyle: {
    flex: 1,
    // textAlign: 'center',
    // marginLeft: "5%",
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },
  commentContainerStyle: {
    height: 60,
    marginBottom: 0,
    paddingHorizontal: 0,
    borderColor: themeStyle.COLOR_WHITE,
  },
  inputContainerCommentStyle: {
    marginVertical: '2.5%',
    borderWidth: 0.5,
    height: 45,
    borderColor: '#E9E9E9',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    margin: 0,
    paddingLeft: 5,
    borderColor: themeStyle.COLOR_WHITE,
  },
  selfLogInputContainerStyle: {
    color: '#7E7E7E',
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});
