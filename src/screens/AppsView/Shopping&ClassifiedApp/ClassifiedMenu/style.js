import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyle.BAR_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  btnText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 12,
    marginLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  menuheading: {
    color: themeStyle.COLOR_CLASSIFIED,
    marginLeft: 20,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 22,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginLeft: 10,
    paddingBottom: '5%',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    marginLeft: '10%',
  },
  nameText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginVertical: 5,
  },
  nameText1: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  itemText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  rowContainer1: {
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    marginLeft: '10%',
  },
  rowContainer2: {
    marginTop: '10%',
    justifyContent: 'flex-end',
    marginLeft: '10%',
  },
});
