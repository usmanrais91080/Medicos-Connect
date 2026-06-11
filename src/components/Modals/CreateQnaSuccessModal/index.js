import React from 'react';
import Modal from 'react-native-modal';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';
import themeStyle from '../../../assets/styles/theme.style';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import Icon from '../../Icon';
import {scaleImage} from '../../../lib/utils/global';
import Clipboard from '@react-native-clipboard/clipboard';

const CreateQnaSuccessModal = ({visible, onClose}) => {
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      isVisible={visible}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.crossButton} onPress={onClose}>
            <Icon.Entypo
              name="cross"
              size={25}
              color="black"
              onPress={onClose}
            />
          </TouchableOpacity>
          <Text style={styles.posted}>Posted</Text>
          <View style={styles.line} />
          <Image
            source={require('../../../assets/gifs/post-saved.gif')}
            style={styles.gif}
          />
          {/* <Text style={styles.shareLink}>Share link</Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString('https://www.careerapp.com/');
              Alert.alert('Link copied!');
            }}
            style={styles.linkContainer}>
            <Text style={styles.link} numberOfLines={1}>
              https://www.careerapp.com/
            </Text>
            <Icon.MaterialIcons
              name="content-copy"
              size={26}
              color={themeStyle.DARK_GRAY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareLinkButton}
            onPress={() => {
              Share.share({
                message: 'https://www.careerapp.com/',
              });
            }}>
            <Icon.Entypo
              name="share"
              size={16}
              color={themeStyle.COLOR_BLACK}
            />
            <Text style={styles.shareLinkText}>Share Link</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default CreateQnaSuccessModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  innerContainer: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 30,
  },
  crossButton: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  gif: {
    width: scaleImage(200),
    height: scaleImage(200),
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  posted: {
    color: themeStyle.COLOR_EDUCATION,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
  },
  line: {
    width: '40%',
    backgroundColor: themeStyle.EDUCATION_BROWN,
    height: 1,
    alignSelf: 'center',
    marginTop: 5,
  },
  shareLink: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 20,
  },
  linkContainer: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    borderColor: themeStyle.ORANGE_LIGHT,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  link: {
    color: themeStyle.DARK_GRAY,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    width: '85%',
  },
  shareLinkButton: {
    backgroundColor: themeStyle.EDUCATION_BROWN,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  shareLinkText: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    marginLeft: 8,
  },
});
