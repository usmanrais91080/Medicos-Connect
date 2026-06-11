import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    marginTop: '10%',
    flex:1,
    flexDirection:"column",
    // alignItems: 'center',
    // padding: 20,
    // paddingHorizontal: 20,
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
    marginTop: '2.5%',
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

  buttonflex: {
    flexDirection: 'row',
    // alignItems:"center",
    // width: '100%',
    justifyContent: 'space-between',
    // marginTop: 20,
  },
});
