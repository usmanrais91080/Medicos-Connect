import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../lib/utils/constants';

export default StyleSheet.create({
  headerTextStyle: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 22,
  },
  container: {
    flex: 1,
  },

  padding: {
    paddingHorizontal: 16,
  },

  flex: {
    flexDirection: 'row',
  },
  rowContainer: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: '1%',
    // marginTop: '2%',
    backgroundColor: themeStyle.COLOR_WHITE,
    // borderRadius: 10,
    // padding: '3%',
    // width: SCREEN_WIDTH * 0.29,
    // height: 120,
    // borderColor: '#D0D0D0',
    // borderWidth: 2,
    height: SCREEN_HEIGHT * 0.125,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: {
      width: 0.1,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 0.50,
    elevation:0.75,
    marginHorizontal: '1.5%',
    marginVertical: '2%',
    // padding: '1.5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.275,
  },
  rowStyle: {
    flex:0.8
    // flexDirection: 'column',
    // height: 90,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  titleStyle: {
    // marginTop: 10,
    fontSize: 14,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#313131',
  },
  activeText: {
    color: '#0ABDE3',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  activeText1: {
    color: '#454545',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
    maxWidth: 250,
  },
  deactiveText: {
    color: '#D93231',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText: {
    color: '#959FAE',
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: themeStyle.PRIMARY_TINT_COLOR,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
  },
  nameContainer: {
    marginTop: '1%',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
  },
  seeProfileText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  modalView: {
    alignSelf: 'center',
    height: SCREEN_HEIGHT * 0.5,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'white',
    marginTop: SCREEN_HEIGHT * 0.2,
    marginHorizontal: SCREEN_WIDTH * 0.1,
    borderRadius: 20,
    borderColor: themeStyle.PRIMARY_TINT_COLOR,
    borderWidth: 1,
  },
  iconStyleClose: {
    paddingLeft: SCREEN_WIDTH * 0.82,
    paddingTop: 5,
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SCREEN_HEIGHT * 0.15,
    alignSelf: 'center',
  },
  pinTitle: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginVertical: SCREEN_HEIGHT * 0.02,
    // fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  pinBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical:deviceHeight*0.02
  },
  pinBtnText: {
    color: themeStyle.COLOR_YELLOW,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
