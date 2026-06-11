import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    backgroundColor: themeStyle.COLOR_WHITE,
    height: 350,
    borderRadius: 10,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 24,
    height: 24,
    backgroundColor: themeStyle.COLOR_EDUCATION,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: '75%', height: 220, borderRadius: 8, resizeMode: 'contain'},
  closeButton: {
    marginTop: 24,
    width: '100%',
    height: 50,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderWidth: 2,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
