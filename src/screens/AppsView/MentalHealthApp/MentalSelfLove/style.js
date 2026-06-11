import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  text: {
    fontSize: themeStyle.FONT_SIZE_3XLARGE,
  },
  header: {
    paddingHorizontal: '5%',
    marginTop: '3%',
    color: themeStyle.PURPLE_COLOR,
    fontSize: 32,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  leftIcon: {
    paddingLeft: 15,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCardContainer: {
    backgroundColor: themeStyle.COLOR_YELLOWISH,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  progressHeader: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
    marginBottom: 8,
  },
  progressText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  progressHeader: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
    marginBottom: 8,
  },
  progressText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  inActiveday: {
    width: SCREEN_WIDTH * 0.16,
    height: SCREEN_HEIGHT * 0.071,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  dateText: {
    fontFamily: themeStyle.FONT_REGULAR,
  },
  progressflex: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  daysRemain: {
    backgroundColor: themeStyle.MENTAL_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  daysRemainText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
  },

  progressCard: {
    // backgroundColor: themeStyle.COLOR_MENTAL,
    marginHorizontal: '5%',
    padding: 10,
    borderRadius: 10,
  },
  dayCount: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 23,
  },
});
