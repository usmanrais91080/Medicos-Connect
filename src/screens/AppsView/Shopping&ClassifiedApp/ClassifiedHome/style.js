import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  wrapper: {},
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
    paddingTop: '5%',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    paddingLeft: '1%',
    marginBottom: 5,
  },
  headerContainer: {
    backgroundColor: themeStyle.COLOR_CLASSIFIED,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '2.5%',
    marginVertical: '2.5%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.CLASSIFIED_HOME,
    paddingVertical: '2.5%',
    paddingHorizontal: '10%',
    borderRadius: 10,
    flex: 0.44,
  },
  blackText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
  },

  itemContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    overflow: 'visible',
    marginHorizontal: 5,
    width: SCREEN_WIDTH * 0.465,
    // padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth:1
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.14,
    width: '100%',
  },
  imageStyle1: {
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.95,
  },

  nameText: {
    // fontSize: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  whiteText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'white',
  },
  grayText: {
    fontSize: 16,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
  },
  rowContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adContainer: {
    marginVertical: '3%',
    backgroundColor: 'white',
    paddingVertical: '5%',
  },
  rowStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lowerContainer: {
    padding: '5%',
  },
  paginationContainer: {
    position: 'absolute',
    top: '54%',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  descStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginTop: '1%',
    width: '92%',
    textAlign: 'justify',
    alignSelf: 'center',
  },
  gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.15,
    alignSelf: 'center',
  },
  indicator: {marginBottom: 40, marginTop: 30, alignSelf: 'center'},

  //*************************************************** */
});
