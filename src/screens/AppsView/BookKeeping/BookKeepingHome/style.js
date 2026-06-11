import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  card: {
    marginHorizontal: '10%',
    marginVertical: '5%',
    height: 149,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
  },
  buttonText: {
    color: '#424242',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
    // marginBottom: "5%",
  },
  buttonText1: {
    color: '#424242',
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
    top: -10,
  },
  rowContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20%',
    top: -20,
  },
  inputContainer: {
    marginHorizontal: '15%',
    marginTop: '-10%',
  },
  inputContainerStyle1: {
    height: 40,
    borderColor: themeStyle.COLOR_LIGHT_GREY,
    borderRadius: 10,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  inputStyle1: {
    fontSize: 14,
    marginLeft: '2.5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  itemContainer: {
    padding: '5%',
    alignSelf: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  itemRowContainer: {
    // marginBottom: "5%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer1: {
    // padding: "7.5%",
    height: SCREEN_HEIGHT * 0.85,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalContainer2: {
    justifyContent: 'center',
    padding: '7.5%',
    height: SCREEN_HEIGHT * 0.25,
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
  },
  selectCategory: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  titleText: {
    color: '#424242',
    textTransform: 'capitalize',
    fontFamily: themeStyle.FONT_BOLD,
  },
  rightSwipeItem: {
    padding: '5%',
  },
  rightSwipeRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#FDDE83',
    padding: '5%',
  },
  dropDown: {
    alignSelf: 'center',
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  line: {
    width: SCREEN_WIDTH * 0.5,
    height: 2,
    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
    alignSelf: 'center',
    marginTop: 7,
  },
  checkBoxSelected: {
    width: 18,
    height: 16,
    borderRadius: 2,
    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
  },
  checkBoxUnselected: {
    width: 18,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#ECECEC',
  },
});
