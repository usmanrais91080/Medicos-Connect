import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent:'center',alignItems:'center'
  },
  scrollContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.15,
  },
});
