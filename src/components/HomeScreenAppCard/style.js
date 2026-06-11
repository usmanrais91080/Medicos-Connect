import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

import THEME from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    marginHorizontal: '1.5%',
    marginVertical: '2%',
    padding: '1.5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.275,

    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 0.5,

    height: SCREEN_HEIGHT * 0.125,
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
  titleStyle: {
    marginTop: -8,
    fontSize: 14,
    color: THEME.COLOR_BLACK,
    fontFamily: THEME.FONT_REGULAR,
    textAlign: 'center',
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
  icon: {flex: 0.7, justifyContent: 'center'},
  nameContainer: {flex: 0.7, justifyContent: 'center'},
});
