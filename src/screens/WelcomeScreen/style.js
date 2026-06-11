import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    paddingHorizontal: '5%',
  },
  headingStyle: {
    marginVertical: '10%',
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.BLUE,
  },
  rowContainer: {
    // marginBottom: "5%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxView: {
    // flex: 0.5,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    elevation: 0.5,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginHorizontal: '1%',
  },
  buttonContainer: {
    marginBottom: '10%',
    marginTop: '5%',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: '5%',
  },
  textStyle: {
    color: '#292A2B',
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'justify',
    fontSize: 14,
  },
});
