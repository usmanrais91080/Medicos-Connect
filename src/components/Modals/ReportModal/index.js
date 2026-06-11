import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import DropDown from '../../../assets/svg/dropDown.svg';
import {Text} from 'react-native';

const ReportModal = ({visible, onClose, handleReportPost}) => {
  const reportReasons = [
    'Nudity',
    'Violence',
    'Hate Speech',
    'False Information',
  ];
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={onClose}
      animationInTiming={400}
      animationOutTiming={400}
      style={styles.modal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.dropDown} onPress={onClose}>
          <DropDown />
        </TouchableOpacity>
        <Text style={styles.reportText}>Report Post</Text>
        <View style={styles.line} />
        <Text style={styles.detailText}>
          Please select the problem with this post
        </Text>
        <FlatList
          data={reportReasons}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleReportPost(item)}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: '5%',
    paddingBottom: 20,
  },
  dropDown: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 50,
    alignSelf: 'center',
    marginBottom: 5,
  },
  reportText: {
    color: themeStyle.CYAN_BLUE,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_BOLD,
  },
  line: {
    backgroundColor: themeStyle.YELLOW,
    width: '40%',
    marginTop: 7,
    height: 1,
    alignSelf: 'center',
  },
  buttonContainer: {
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeStyle.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  detailText: {
    marginTop: 13,
    marginBottom: 20,
    color: themeStyle.BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
});

export default ReportModal;
