import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.35,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  cardContainer: {
    backgroundColor: themeStyle.WHITE_SMOKE,
    padding: '5%',
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 1,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    marginVertical: '2.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobType: {
    backgroundColor: themeStyle.CARRER_SECONDARY,
    width: 95,
    paddingVertical: 3,
    borderRadius: 7,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTypeText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  profession: {
    backgroundColor: themeStyle.CARRER_PRIMARY,
    width: 95,
    paddingVertical: 3,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  professionText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 14,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  titleText: {
    marginTop: '5%',
    fontSize: 20,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  noDataText: {
    marginHorizontal: '10%',
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
    textAlign: 'center',
  },
  gap: {
    width: 15,
  },
  designationText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  infoTitle: {
    color: themeStyle.CARRER_PRIMARY,
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
  },
  headingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  colorHeadingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
    textDecorationLine: 'underline',
  },
  colorHeadingText1: {
    fontSize: 18,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
  },
  colorText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  colorText1: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  descText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  detailButton: {
    backgroundColor: themeStyle.CARRER_SECONDARY,
    width: 150,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 8,
  },
  detailButtonText: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 20,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  iconContainer: {
    height: 38,
    width: 50,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 7,
  },
  title: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
  },
});
