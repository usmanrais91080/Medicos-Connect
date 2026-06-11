import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    paddingHorizontal: 20,
    paddingTop: 34,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerTextStyle: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  datingStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: themeStyle.COLOR_WHITE,
    borderWidth: 1,
  },
  headingStyle: {
    color: 'white',
    fontSize: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  statsContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '32%',
    backgroundColor: themeStyle.COLOR_WHITE,
    elevation: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statsCardText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    marginVertical: 10,
    color: '#3F3F3F',
    textAlign: 'center',
  },
  statsCount: {
    fontSize: 36,
    fontFamily: themeStyle.FONT_BOLD,
    color: '#3F3F3F',
    lineHeight: 37,
  },
  statsDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  colorBox: {
    width: 9,
    height: 9,
    marginRight: 6,
  },
  detailTitle: {
    fontSize: 12,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});
