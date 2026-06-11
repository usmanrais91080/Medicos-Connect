import React, {useState} from 'react';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Icon from '../../Icon';
import StarRating from 'react-native-star-rating';
import SubmitReview from '../../../assets/svg/SubmitReview.svg';
import styles from './styles';
import {EducationServices} from '../../../services';

const TeacherReviewModal = ({
  visible,
  onClose,
  id,
  token,
  class_id,
  teacher_id,
}) => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');

  const onSubmit = () => {
    Keyboard.dismiss();
    EducationServices.reviewTeacher(
      id,
      {
        rating: stars,
        message: review,
        class_id,
        teacher_id,
      },
      token,
    )
      .then(() => {
        onClose();
      })
      .catch(err => {
        console.log('class creation err', err);
      });
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      avoidKeyboard
      isVisible={visible}
      onBackdropPress={() => Keyboard.dismiss()}
      style={styles.modal}
      onModalShow={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.posted}>Submit Review</Text>
          <View style={styles.line} />
          <SubmitReview style={styles.gif} />
          <View style={styles.ratingContainer}>
            <StarRating
              maxStars={5}
              rating={stars}
              starSize={42}
              selectedStar={rating => setStars(rating)}
              starStyle={{marginRight: 5}}
              fullStarColor={themeStyle.COLOR_EDUCATION}
              emptyStarColor={themeStyle.COLOR_EDUCATION}
            />
          </View>
          <TextInput
            value={review}
            onChangeText={setReview}
            style={styles.textInput}
            placeholder="Write your review here!"
            textAlignVertical="top"
            multiline
            placeholderTextColor={'#454545'}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.skipButton}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TeacherReviewModal;
