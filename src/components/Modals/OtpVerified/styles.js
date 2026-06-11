import {StyleSheet} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 30,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_RED,
    height: 36,
    borderRadius: 6,
    marginTop: 20,
    marginBottom: 10,
  },
  close: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 15,
  },
  image: {alignSelf: 'center'},
  text: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 25,
  },
});
