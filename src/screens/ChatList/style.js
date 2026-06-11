import {Dimensions, StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  headingContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  container: {
    // padding: '',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.27,
    // paddingHorizontal: '5%',
    marginHorizontal: '1%',
    height: 90,
  },
  container2: {
    // padding: '',
    flexDirection: 'row',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.84,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '1%',
  },

  titleStyle: {
    // marginTop: 10,
    fontSize: 12,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  contentContainer2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH * 0.8,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  nameContainer: {
    justifyContent: 'center',
    marginTop: 10,
  },
  nameContainerConversation: {
    flex: 0.85,
    paddingLeft: '10%',
    justifyContent: 'center',

    paddingBottom: 15,
  },
  seperatorStyle: {
    width: 25,
  },
  listItemText: {
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginTop: '2%',
    marginLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  listItemText1: {
    fontSize: 14,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginTop: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  timeContainer: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  upperContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    paddingBottom: 20,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#38474F',
  },
  itemText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  itemText1: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  seperator: {
    height: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
  },
  contentContainerConversation: {
    flex: 1,
    paddingTop: '5%',
    // paddingVertical: '2%',
    marginHorizontal: '3%',
    flexDirection: 'row',
  },
  teamImageHeightStyle: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.45,
  },
  talkImageHeightStyle: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.33,
  },
  buttonStyle: {
    margin: 20,
    backgroundColor: 'rgb( 30, 199, 178)',
    width: screenWidth * 0.4,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  searchInput: {
    width: screenWidth * 0.55,
    height: 40,
    paddingLeft: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
    alignSelf: 'flex-start',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
