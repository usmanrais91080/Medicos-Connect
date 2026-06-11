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
  container: {
    flex: 1,
  },
  heading: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  rowContainer2: {
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    marginTop: '5%',
    marginHorizontal: '5%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  inputConttainer: {
    marginTop: '2.5%',
    // backgroundColor: themeStyle.COLOR_WHITE,
    // borderRadius: 10,
  },
  whiteText: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
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
    left: '100%',
  },
  grayText: {
    marginTop: '2.5%',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
  },
  rowContainer: {
    marginTop: '2.5%',
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
    borderTopColor: 'gray',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'white',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  dropDownContainer: {
    width: 100,
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
  desc1: {
    marginHorizontal: '2.5%',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  inputConttainer1: {
    marginTop: '2.5%',
    height: 60,
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: themeStyle.CARRER_PRIMARY,
    borderWidth: 2,
  },
  margin: {
    // marginVertical: 10
  },
});
