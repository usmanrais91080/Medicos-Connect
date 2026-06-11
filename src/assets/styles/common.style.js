import THEME from './theme.style';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0,
    backgroundColor: THEME.HEADER_BACKGROUND_COLOR,
    justifyContent: 'space-around',
  },
  headerTransparentContainer: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0,
    justifyContent: 'space-around',
    marginVertical: -20,
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    position: 'absolute',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: THEME.FONT_SIZE_XLARGE,
  },
  errorText: {
    color: '#c30000',
    fontSize: 12,
    marginLeft: 5,
  },
  errorText1: {
    // paddingTop: '1%',
    // paddingLeft: 8,
    color: '#c30000',
    fontSize: 10,
    // marginLeft: 20,
  },
  errorText2: {
    // paddingTop: '2%',
    paddingLeft: 20,
    color: '#c30000',
    fontSize: 12,
    marginLeft: -5,
  },
  burgerMenuUserNameTextStyle: {
    fontSize: 22,
    fontFamily: THEME.FONT_MEDIUM,
    color: '#38474F',
    width: '100%',
  },
  burgerMenuViewTextStyle: {
    fontSize: 16,
    fontFamily: THEME.FONT_REGULAR,
    color: '#959FAE',
    marginTop: 2,
  },
  burgerMenuHeadingTextStyle: {
    fontSize: 23,
    fontFamily: THEME.FONT_BOLD,
    color: '#000',
  },
});
