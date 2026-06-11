import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    padding: 25,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
    alignItems: 'center',
    borderRadius: 25,
  },
  header: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_MEDIUM,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 60,
    lineHeight: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  progressLine: {
    width: 20,
    backgroundColor: 'rgba(11, 144, 207, 0.4)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  iconCircle: {
    height: 62,
    backgroundColor: '#f97b3c',
  },
  textContainer: {
    marginLeft: 20,
  },
  dayText: {
    marginBottom: 15,
    marginRight: 20,
  },
  dayTitle: {
    fontSize: 18,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  daySubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    fontFamily: themeStyle.FONT_REGULAR,
    lineHeight: 18,
  },
  footerText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: themeStyle.FONT_REGULAR,
    lineHeight: 23,
  },
  boldText: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: themeStyle.BLUE,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
  },
  cross: {
    alignSelf: 'flex-end',
  },
});
