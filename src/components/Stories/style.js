import {StyleSheet} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';

const styles = StyleSheet.create({
  boxStory: {
    margin: 10,
  },
  ItemSeparator: {height: 1, backgroundColor: '#ccc'},
  container: {
    // marginTop: 15,
    // paddingBottom: 5,
    paddingLeft: '5%',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#0ABDE3',
    overflow: 'hidden',
  },
  superCircle: {
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 60,
  },
  modal: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontFamily: 'Gotham-Book',
    fontSize: 13,
    textAlign: 'center',
  },
  userContentContainer: {
    height: SCREEN_HEIGHT * 0.16,
    width: SCREEN_WIDTH * 0.34,
    padding: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: themeStyle.CYAN_BLUE,
  },
  whiteTextStyle: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_BOLD,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
