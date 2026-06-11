import React, {useState} from 'react';
import {Modal, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import Icon from '../../Icon';
import themeStyle from '../../../assets/styles/theme.style';
import {Text} from 'react-native';

const ImagesModal = ({modalVisible, onClose, images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      animationInTiming={600}
      animationOutTiming={600}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <TouchableOpacity
              disabled={currentIndex === 0}
              onPress={previous}
              style={styles.buttonContainer}>
              <Icon.MaterialIcons
                name="arrow-left"
                size={24}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
            <Image
              source={{uri: images[currentIndex]?.file}}
              style={styles.image}
            />
            <TouchableOpacity
              disabled={currentIndex === images?.length - 1}
              onPress={next}
              style={styles.buttonContainer}>
              <Icon.MaterialIcons
                name="arrow-right"
                size={24}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagesModal;
