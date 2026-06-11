import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  svgContainer: {
    // flex: 0.4,
    marginTop: '10%',
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  btnContainer: {
    // flex: 0.2,
    justifyContent: 'flex-start',
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
    color: '#99CC66',
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
  },
  desc: {
    marginTop: '10%',
    color: themeStyle.COLOR_YELLOW,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 15,
  },
  gif: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    backgroundColor: 'white',
    // marginVertical: 40,
  },
});
