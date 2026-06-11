import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../lib/utils/constants';

export default StyleSheet.create({
  upperContainer: {
    flex: 0.1,
  },
  lowerContainer: {
    flex: 0.9,
    elevation: 2,
  },
  container: {
    flex: 1,
  },
  menuHeading: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginLeft: 20,
  },
  menuHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: "2%"
  },
  profileContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: themeStyle.PRIMARY_TINT_COLOR,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
  },
  nameContainer: {
    marginLeft: '5%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#38474F',
  },
  seeProfileText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  flatListContainer: {
    // borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: '5%',
  },
  itemText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    // marginLeft: 20,
  },
  listItemContainer: {
    // margin: '2.5%',
    marginVertical: '5%',
    // marginLeft: '5%',
  },

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listItemContainer1: {
    margin: '2.5%',
    marginBottom: '3.5%',
    marginLeft: '5%',
  },
  iconStyle: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  headingText: {
    marginTop: 15,
    marginLeft: '5%',
    fontSize: 20,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  btnPrimary: {
    height: 51,
    borderRadius: 12,
    backgroundColor: themeStyle.COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '2.5%',
    // marginTop: '40.5%',
    paddingHorizontal: '10%',
  },
  itemText2: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },

  btnContainer: {
    // flex:0.25,
    // marginHorizontal: '5%',
    marginTop: '10%',
    // marginTop:SCREEN_HEIGHT*0.17
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
    marginLeft: 10,
    paddingBottom: '2%',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    marginLeft: '-1%',
  },

  nameText1: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  flex: {
    // flex:0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
