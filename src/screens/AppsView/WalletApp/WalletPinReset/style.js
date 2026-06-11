import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 0.9,
  },
  heading: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
  },
  btnContainer: {
    justifyContent:"flex-end",
    marginHorizontal: '5%',
  },
  rowContainer2: {
    marginTop: '25%',
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // marginLeft: '2%',
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
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
    marginTop: '15%',
    marginHorizontal: "5%",
    paddingBottom: '5%',
  },

  heading: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
  },
  desc: {
    marginTop: '5%',
    marginHorizontal: '5%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  grayTextStyle: {
    textAlign: 'center',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  inputConttainer: {
    marginTop: '2.5%',
    // backgroundColor: themeStyle.COLOR_WHITE,
    // borderRadius: 10,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  darkDash: {
    backgroundColor: themeStyle.PRIMARY_TINT_COLOR,
    width: 100,
    height: 5,
    borderRadius: 5,
  },
  lightDash: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 5,
    borderRadius: 5,
  },
  minusContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 5,
    left: '72.5%',
  },
  btnYellow: {
    backgroundColor: themeStyle.COLOR_YELLOW,
    width: SCREEN_WIDTH * 0.7,
    // fontFamily: themeStyle.FONT_LIGHT,
    // fontSize: themeStyle.FONT_SIZE_SMALL,
    // marginTop:'5%'
  },
  yellowText: {
    color: themeStyle.COLOR_YELLOW,
    fontFamily: themeStyle.FONT_LIGHT,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    // marginTop:'5%'
  },
  grayText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    marginLeft: '2%',

  },
  grayTextSecondary: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    marginTop: '2%',
  },
  rowContainer: {
    marginLeft: '2%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: themeStyle.BUTTON_COLOR,
    padding: 10,
    borderRadius: 10,
  },
  box: {
    height: 19,
    width: 19,
    borderRadius: 3,
    backgroundColor: 'lightgray',
  },
  selectedbox: {
    height: 19,
    width: 19,
    borderColor: 'white',
    borderWidth: 2,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: themeStyle.BUTTON_COLOR,
  },
  rowContainer1: {
    flexDirection: 'row',
  },
  row: {
    flex: 0.37,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowStyle: {
    position: 'absolute',
    right: 0,
  },
  dropDownStyle: {
    borderTopColor: 'white',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'lightgray',
  },
  dropDownContainerStyle: {
    backgroundColor: 'lightgray',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  dropDownContainer: {
    width: 150,
    height: 40,
  },

  option: {
    marginLeft: 10,
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  selectedOption: {
    marginLeft: 10,
    fontSize: 12,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  headingText: {
    marginVertical: '2.5%',
    // fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  emptyContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginHorizontal: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  desc1: {
    marginLeft: '2%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
  desc2: {
    marginLeft: '5%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 10
},
eyeIcon: {
  marginRight:15,
  justifyContent:"center",
  alignItems:"center",
},
});
