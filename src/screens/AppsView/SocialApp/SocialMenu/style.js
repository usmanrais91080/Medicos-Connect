import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

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
    color: '#38474F',
    marginLeft: 20,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
    color: themeStyle.YELLOW,
    lineHeight: 28,
    fontWeight: '700',
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
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  nameText1: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  itemText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    lineHeight: 24,
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
  margin0: {margin: 0},
  container: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  leftContainer: {flex: 0.3, flexDirection: 'column'},
  rightContainer: {
    flex: 0.7,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  rightInnerContainer: {flex: 0.6, marginTop: '10%'},
  avatarStyle: {
    borderWidth: 2,
    borderColor: themeStyle.CYAN_BLUE,
  },
});
