import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import styles from './styles';

const EditQnaModal = ({modalVisible, setModalVisible, onEdit, onDelete}) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      animationInTiming={600}
      animationOutTiming={600}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dropdown} onPress={setModalVisible}>
          <DropDown />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default EditQnaModal;
