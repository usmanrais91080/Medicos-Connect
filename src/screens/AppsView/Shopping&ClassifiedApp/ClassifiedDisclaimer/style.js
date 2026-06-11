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
    justifyContent: 'flex-start',
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  textContainer: {
    // flex: 0.3,
    // justifyContent: "center",
    // marginTop: "5%",
    marginHorizontal: '5%',
  },
  heading: {
    color: '#38474F',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 20,
  },
  desc: {
    marginTop: '5%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    textAlign: 'left',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10,
  },
  bulletpoint: {
    marginTop: '5%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    textAlign: 'left',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10,
    marginLeft: '2%',
  },
});
