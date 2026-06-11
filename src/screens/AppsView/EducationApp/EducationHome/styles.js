import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_EDUCATION,
    marginTop: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {width: 175, height: 175},
  text: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginBottom: '15%',
  },
  selectMode: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
  },
  studentButton: {
    backgroundColor: themeStyle.EDUCATION_BROWN,
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  teacherButton: {
    borderColor: themeStyle.EDUCATION_BROWN,
    width: '90%',
    borderWidth: 2,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 11,
  },
});
