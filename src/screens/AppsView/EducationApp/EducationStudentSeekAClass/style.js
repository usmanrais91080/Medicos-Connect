import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  cardContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: '5%',
    borderRadius: 10,
    marginHorizontal: '2.5%',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: '5%',
    fontSize: 22,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  gap: {
    width: 15,
  },
  designationText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  headingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#38474F',
  },
  colorHeadingText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
    textDecorationLine: 'underline',
  },
  colorHeadingText1: {
    fontSize: 18,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: '#1DD1A1',
  },
  colorText: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  descText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  btnContainer: {
    marginVertical: '5%',
    backgroundColor: '#1DD1A1',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  btnText: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  btnText1: {
    color: 'gray',
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingVertical: '2.5%',
  },
  discussion: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  discussionModal: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: 105,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  cross: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#90CDBF',
    marginRight: 25,
  },
  profileDetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 35,
  },
  myDiscussion: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});
