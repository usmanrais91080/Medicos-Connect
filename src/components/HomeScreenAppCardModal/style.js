import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

import THEME from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    padding: '5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.24,
    marginHorizontal: '3%',
    height: SCREEN_HEIGHT * 0.4,
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 12,
    color: themeStyle.COLOR_BLACK,
    fontFamily: THEME.FONT_REGULAR,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorfulBox: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderRadius: 5,
    backgroundColor: '#4c4a58',
  },
  percentageTextStyle: {
    color: THEME.PRIMARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },

  imageStyle: {
    height: 100,
    width: 100,
  },
  justifyCenter: {
    alignItems: 'center',
  },
  priceStyle: {
    marginVertical: 5,
    color: THEME.PRIMARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});
