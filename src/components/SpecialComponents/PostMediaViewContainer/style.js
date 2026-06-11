import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

export default StyleSheet.create({
  contentContainer: {
    width: SCREEN_WIDTH,
  },
  imageStyle: {
    width: SCREEN_WIDTH,
  },
  paginationWrapper: {
    top: 10,
    // left: 0,
    // right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 6,
    width: 6,
    borderRadius: 24 / 2,
    // margin: 11,
    // marginHorizontal: 5,
    // marginLeft:10
  },
});
