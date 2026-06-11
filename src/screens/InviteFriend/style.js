import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    marginTop: '10%',
    alignItems: 'center',
    padding: 20,
    // paddingHorizontal: 20,
  },
   gif: {
    width: SCREEN_WIDTH * 0.87,
    height: SCREEN_HEIGHT * 0.35,
    alignSelf: 'center',
  },

  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
    marginVertical: 10,
  },
  inputConttainer: {
    marginVertical: '2.5%',
    borderColor: themeStyle.COLOR_SILVER,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    // backgroundColor: themeStyle.COLOR_WHITE,
    // borderRadius: 10,
  },
});
