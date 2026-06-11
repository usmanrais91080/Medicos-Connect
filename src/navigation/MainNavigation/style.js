import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import themeStyle from '../../assets/styles/theme.style';
export default StyleSheet.create({
  headerTitleStyle: {color: '#fff'},
  headerMentalStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_DIARY,
  },
  headerStyle: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  splashScreenTitle: {
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  educationHeaderStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_EDUCATION,
  },

  gamesHeaderStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  classifiedHeaderStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_CLASSIFIED,
  },
  headerStyleConnect: {
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_WHITE,
  },

  headerStyle1: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  headerTextStyle: {
    fontSize: themeStyle.FONT_SIZE_XLARGE,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
  },
  classifiedHeaderTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  ProfileSettingHeaderTextStyle: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_3XLARGE,
  },

  headerStyleWallet: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.COLOR_LIGHT_GREY,
  },
  headerStyleCareer: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.CARRER_PRIMARY,
  },
  headerTextStyleCareer: {
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  headerTextStyleMental: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
  },
  headerStyleMental: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.PURPLE_COLOR,
  },
  pagerHeaderStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },

  pagerHeaderTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
  },
  menuheading: {
    color: themeStyle.COLOR_BLACK,
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

  itemText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  listItemContainer: {
    margin: '2.5%',
    marginVertical: '6.5%',
    marginLeft: '5%',
  },
  listItemContainer1: {
    margin: '2.5%',
    marginBottom: '3.5%',
    marginLeft: '5%',
  },
  iconContainer: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    marginLeft: '10%',
  },

  nameText1: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    margin: '2.5%',
    marginTop: '40.5%',
    paddingHorizontal: '10%',
  },
  itemText2: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },

  btnContainer: {
    // flex:0.25,
    marginHorizontal: '5%',
    // marginTop:SCREEN_HEIGHT*0.17
  },
});
