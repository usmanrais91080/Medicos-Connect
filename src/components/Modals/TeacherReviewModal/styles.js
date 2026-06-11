import {StyleSheet} from 'react-native';
import {scaleImage} from '../../../lib/utils/global';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  innerContainer: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 30,
    paddingTop: 30,
  },
  crossButton: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  gif: {
    width: scaleImage(200),
    height: scaleImage(200),
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  posted: {
    color: themeStyle.COLOR_EDUCATION,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
  },
  line: {
    width: '60%',
    backgroundColor: themeStyle.EDUCATION_BROWN,
    height: 1,
    alignSelf: 'center',
    marginTop: 5,
  },
  ratingContainer: {width: '70%', alignSelf: 'center', marginTop: 15},
  textInput: {
    height: 100,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 25,
    padding: 15,
    paddingTop: 10,
    color: themeStyle.COLOR_BLACK,
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginHorizontal: 30,
  },
  skipButton: {
    height: 50,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  submitButton: {
    height: 50,
    backgroundColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
