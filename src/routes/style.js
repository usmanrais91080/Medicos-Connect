import {StyleSheet} from 'react-native';
import themeStyle from '../assets/styles/theme.style';
export default StyleSheet.create({
  headerTitleStyle: {color: '#fff'},
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    paddingHorizontal: '5%',
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },
  classifiedHeaderStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_CLASSIFIED,
  },
  headerStyle1: {
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  headerTextStyle: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  headerTextStyle2: {
    width: 300,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  headerStyleCareer: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    paddingHorizontal: '5%',
    backgroundColor: themeStyle.CARRER_PRIMARY,
  },
  headerTextStyleCareer: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
  },

  postClassifiedHeaderStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    paddingHorizontal: '5%',
    backgroundColor: themeStyle.COLOR_CLASSIFIED,
  },
  educationHeaderStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_EDUCATION,
  },
  postClassifiedHeaderTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  headerTextStyleMental: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  headerStyleMental: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.PURPLE_COLOR,
  },
  classifiedHeaderTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  splashScreenTitle: {
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
});
