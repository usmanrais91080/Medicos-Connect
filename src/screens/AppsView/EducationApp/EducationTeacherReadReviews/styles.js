import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    paddingTop: 28,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  datingStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: themeStyle.COLOR_WHITE,
    borderWidth: 1,
  },
  headingStyle: {
    color: 'white',
    fontSize: 12,
  },
  reviews: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginLeft: 20,
    color: themeStyle.COLOR_BLACK,
    marginBottom: 5,
  },
  reviewCount: {
    color: '#8A8A8A',
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  menuButton: {marginLeft: 15},
  indicator: {
    marginTop: 30,
    marginBottom: 50,
  },
});
