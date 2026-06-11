import { StyleSheet } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: '5%',
  },
  headerContainer: {
    backgroundColor: themeStyle.COLOR_CLASSIFIED,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
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
    paddingHorizontal: '5%',
    borderRadius: 10,
    flex: 0.25,
  },
  blackText: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    borderRadius: 10,
    // 
    marginHorizontal: "5%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
  },
  grayText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  grayText1:{
    fontSize: 12,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blackText: {
    // marginLeft: 10,
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  headingText: {
    color: themeStyle.COLOR_CLASSIFIED,
    fontFamily: themeStyle.FONT_REGULAR,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  rowStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  margin: {
    marginTop: 10
  },
  lowerContainer: {
    flex:0.8,
    // justifyContent: 'space-between',
    padding: '2.5%',
  },
  imageStyle: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
