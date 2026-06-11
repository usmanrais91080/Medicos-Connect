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
    marginTop: '2%',
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
    color: themeStyle.BUTTON_COLOR,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackHeading: {
    color: themeStyle.BUTTON_COLOR,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackText: {
    color: '#000',
    fontSize: 16,
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
  rowContainer1: {
    marginTop: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.335,
    height: 40,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  graybtnText: {
    color: '#959FAE',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.335,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeStyle.CYAN_BLUE,
  },
  bold: {
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});
