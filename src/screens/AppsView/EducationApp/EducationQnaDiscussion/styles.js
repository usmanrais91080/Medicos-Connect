import {StyleSheet} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discussionModal: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: 105,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  discussion: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 20,
    marginBottom: 10,
    color: themeStyle.COLOR_BLACK,
    marginTop: 10,
    marginLeft: 14,
  },
  commentContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 2,
    borderColor: themeStyle.EDUCATION_BROWN,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '86%',
    color: themeStyle.COLOR_BLACK,
  },
  sendComment: {
    borderWidth: 2,
    borderColor: themeStyle.EDUCATION_BROWN,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 2,
    marginBottom: 25,
    width: '12%',
  },
  innerCommentContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  nameText: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  blueText: {
    fontSize: 12,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  grayText: {
    fontSize: 14,
    color: '#2F2F2F',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listIcon: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginRight: 10,
  },
  listLabel: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  likeButton: {
    position: 'absolute',
    right: 30,
    bottom: -6,
  },
  unlikeButton: {
    position: 'absolute',
    right: 0,
    bottom: -6,
  },
});
