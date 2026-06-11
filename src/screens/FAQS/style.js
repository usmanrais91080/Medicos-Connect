import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '30%',
    paddingLeft: '2.5%',
  },
  helpContainer: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  faqs: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  headingText: {
    fontSize: 20,
    fontFamily: themeStyle.FONT_BOLD,
  },
  cardContainer: {
    // marginHorizontal: '5%',
    // padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.6,
    // height: SCREEN_HEIGHT * 0.15,
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingVertical: '5%',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1%',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: themeStyle.PRIMARY_TINT_COLOR,
  },
  itemText: {
    fontSize: 16,
    marginRight: '15%',
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    width: 100,
  },
  menuheading: {
    color: '#38474F',
    marginLeft: 20,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 22,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingBottom: '5%',
  },
  btnPrimary: {
    height: 51,
    borderRadius: 12,
    backgroundColor: themeStyle.COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
    marginTop: '2.5%',
    paddingHorizontal: '10%',
  },
  itemText2: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },

  btnContainer: {
    marginTop: '10%',
    marginRight: '5%',
  },
  iconContainer: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
  },
  listItemContainer1: {
    // margin: '2.5%',
    marginLeft: '5%',
  },
  iconStyle: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
});
