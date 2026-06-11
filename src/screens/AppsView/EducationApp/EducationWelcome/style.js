import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  svgContainer: {
    // flex: 0.4,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    // flex: 0.2,
    flexDirection:"column",
    justifyContent: 'space-between',
    marginTop: '10%',
    marginHorizontal: '15%',
  },
  textContainer: {
    // flex: 0.3,
    justifyContent: 'center',
    marginTop: '10%',
    marginHorizontal: '10%',
  },
  heading: {
    color: themeStyle.COLOR_EDUCATION,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
  },
  desc: {
    marginTop: '10%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 11,
  },
});
