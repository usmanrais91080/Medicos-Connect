import {Dimensions, StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  headingContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
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
    marginLeft: '6%',
    justifyContent: 'center',

    width: 500,
    paddingBottom: 10,
  },
  seperatorStyle: {
    width: 25,
  },
  listItemText: {
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginTop: '2%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  listItemText1: {
    fontSize: 12,
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginTop: '2%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  timeContainer: {
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  upperContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    paddingBottom: 20,
    paddingLeft: 10,
    borderBottomWidth: 0.2,
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#38474F',
  },
  itemContainer1: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    maxWidth: 100,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  itemText1: {
    fontSize: 14,
    textTransform:"capitalize",
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
    paddingVertical: '2%',
    marginHorizontal: '5%',
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
});
