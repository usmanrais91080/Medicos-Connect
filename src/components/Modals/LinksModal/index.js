import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT} from '../../../lib/utils/constants';
import Icon from '../../Icon';

const LinksModal = ({
  visible,
  onClose,
  confirm,
  facebook,
  setFacebook,
  instagram,
  setInstagram,
  twitter,
  setTwitter,
  tiktok,
  setTiktok,
  linkedin,
  setLinkedin,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={onClose}>
              <DropDown />
            </TouchableOpacity>
            <Text style={styles.title}>Add Social media links</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Facebook"
                value={facebook}
                onChangeText={setFacebook}
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              />
              <Icon.FontAwesome
                name="facebook"
                size={21}
                color={themeStyle.CYAN_BLUE}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={instagram}
                onChangeText={setInstagram}
                placeholder="Add Link"
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              />
              <Icon.FontAwesome
                name="instagram"
                size={21}
                color={themeStyle.CYAN_BLUE}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={twitter}
                onChangeText={setTwitter}
                placeholder="Add Link"
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              />
              <Icon.FontAwesome6
                name="x-twitter"
                size={26}
                color={themeStyle.CYAN_BLUE}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={tiktok}
                onChangeText={setTiktok}
                placeholder="Add Link"
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              />
              <Icon.FontAwesome6
                name="tiktok"
                size={23}
                color={themeStyle.CYAN_BLUE}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={linkedin}
                onChangeText={setLinkedin}
                placeholder="Add Link"
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              />
              <Icon.FontAwesome6
                name="linkedin-in"
                size={21}
                color={themeStyle.CYAN_BLUE}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.cancel}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirm} style={styles.confirm}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LinksModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 40,
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    elevation: 10,
  },
  modalContainer: {
    borderRadius: 26,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  dropdown: {
    alignSelf: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginBottom: 2,
  },
  inputContainer: {
    borderWidth: 2,
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    borderColor: themeStyle.COLOR_SILVER,
    marginTop: 8,
  },
  input: {
    width: '90%',
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
  },
  confirm: {
    height: 53,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.YELLOW,
    borderRadius: 10,
  },
  cancel: {
    height: 53,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.YELLOW,
  },
});
