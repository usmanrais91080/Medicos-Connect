import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import themeStyle from '../../assets/styles/theme.style';

const ReviewCard = ({review}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: review?.image}} />
          <View>
            <Text style={styles.name}>{review?.userName}</Text>
            <Text style={styles.role}>{review?.className}</Text>
          </View>
        </View>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={review?.rating}
          starSize={22}
          starStyle={{marginRight: 5}}
          fullStarColor={themeStyle.STAR_YELLOW}
          emptyStarColor={themeStyle.STAR_YELLOW}
        />
      </View>
      <Text style={styles.review}>{review?.message}</Text>
    </View>
  );
};

export default ReviewCard;
