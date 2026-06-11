import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  rowContainer: {
    marginTop: '5%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayHeading: {
    color: themeStyle.COLOR_GAMES,
    fontSize: 20,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackHeading: {
    color: '#38474F',
    fontSize: 18,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    marginTop: 2,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackText: {
    color: '#38474F',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    backgroundColor: themeStyle.BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.275,
    height: 40,
    borderRadius: 10,
  },
  blockCount: {
    color: themeStyle.COLOR_GAMES,
    fontSize: 20,
    fontFamily: themeStyle.FONT_BOLD,
  },
});
