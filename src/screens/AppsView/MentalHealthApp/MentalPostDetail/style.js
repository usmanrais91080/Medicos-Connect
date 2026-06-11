import { StyleSheet } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';

export default StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginTop: '2.5%'
  },
  rowContainer: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer1: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowStyle: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyle.BUTTON_COLOR,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.4,
    height: 40,
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.15,
    height: 40,
    borderRadius: 10,
  },
  profileName: {
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayTier: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#959FAE',
  },
  grayTier1: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#959FAE',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
  },
  descContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
  },
  descText: {
    color: '#313131',
    fontSize: 12,
    marginTop: 5,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  nameText: {
    // fontSize: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
  },
  hashText: {
    // fontSize: 10,
    color: themeStyle.COLOR_GREEN,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
  },
  whiteText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'white',
  },
  grayText: {
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blueText: {
    fontSize: 12,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  blackText: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_BOLD,
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH,
  },
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listIcon: {
    // fontSize: 26,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginRight: 10,
    // width: 30
  },
  listLabel: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
});
