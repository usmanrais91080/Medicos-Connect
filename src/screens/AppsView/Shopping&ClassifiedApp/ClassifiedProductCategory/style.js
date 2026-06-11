import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    elevation: 0,
    height: 55,
    borderBottomWidth: 0,
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '5%',
    marginHorizontal: '8%',
  },
  containerStyle: {
    height: 40,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    borderRadius: 10,
    margin: 0,
    paddingLeft: 0,
  },
  inputStyle: {
    fontSize: 14,
    marginLeft: '2.5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  orangeText: {
    color: themeStyle.COLOR_CLASSIFIED,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 18,
  },
  blackText: {
    marginLeft: '5%',
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
  },
});
