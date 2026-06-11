import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

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
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: themeStyle.COLOR_EDUCATION,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  role: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  line: {
    height: 1,
    width: SCREEN_WIDTH,
    backgroundColor: '#B3B3B3',
    marginVertical: 24,
  },
  reviewText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 10,
  },
  reviewCount: {
    color: '#858585',
  },
  starContainer: {
    alignSelf: 'center',
  },
  statistics: {
    marginHorizontal: 20,
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    height: 140,
    borderWidth: 1,
    borderColor: themeStyle.EDUCATION_BROWN,
    borderRadius: 9,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.WHITE_SMOKE,
  },
  buttonText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 8,
  },
});
