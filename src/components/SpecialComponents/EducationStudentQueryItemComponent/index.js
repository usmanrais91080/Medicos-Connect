import React from 'react';
import {TouchableOpacity, View, Text, Image, Pressable} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from '../..';
import {route} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';
import Like from '../../../assets/svg/like-education.svg';
import Comment from '../../../assets/svg/comment-education.svg';
import DisLike from '../../../assets/svg/dislike-education.svg';
import Gift from '../../../assets/svg/gift-education.svg';
import moment from 'moment';
import styles from './style';

const EducationStudentQueryItemComponent = ({
  item,
  navigation,
  token,
  image,
  showAlertForProfile,
  showAlertFunc,
  viewDiscussion,
  discussion,
  onLikePress,
  onDislikePress,
  onVotePoll,
  showMenu,
  onPressImage,
  onGiftPress,
  user_id,
}) => {
  return (
    <View
      onPress={() =>
        showAlertForProfile
          ? showAlertFunc()
          : navigation.navigate(route.EDUCATIONSTUDENTYOURCLASSEDETAIL, {
              item,
              token,
              image,
              userName: item?.user?.education_username,
            })
      }
      style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                item?.user?.education_image != ''
                  ? item?.user?.education_image
                  : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={50}
          />
          {HorizontalSpacer()}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.textStyle}>
              {item?.user?.education_username}
            </Text>
            <Text style={styles.blackText}>
              {moment(item?.created_at).format('DD MMMM')} at{' '}
              {moment(item?.created_at).format('h:mm a')}
            </Text>
          </View>
        </View>
        {user_id ? (
          user_id == item?.user?._id ? (
            <TouchableOpacity
              onPress={showMenu}
              style={{paddingRight: 5, paddingVertical: 10, paddingLeft: 20}}>
              <Icon.Entypo name="dots-three-vertical" size={15} color="gray" />
            </TouchableOpacity>
          ) : null
        ) : null}
      </View>
      <View style={[styles.rowContainer, {marginTop: '2.5%'}]}>
        <View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.textStyle, {marginTop: 24}]}>
            {item?.topic}{' '}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
            {item?.description}{' '}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPressImage} style={styles.rowContainer1}>
        {item?.multi_media?.map((item, index) => {
          return (
            <Image
              source={{uri: item?.file}}
              style={styles.image}
              key={index}
            />
          );
        })}
      </TouchableOpacity>
      {item?.content_type == 'POLL' ? (
        <View style={styles.optionInput}>
          <Text style={styles.pollText}>{item?.pollText}</Text>
        </View>
      ) : null}
      {item?.choices?.map((choice, index) => {
        const totalVotes = item?.total_votes || 1;
        const percentage = (choice?.votes / totalVotes) * 100;
        return (
          <Pressable
            style={styles.options}
            onPress={() => onVotePoll(item?._id, choice?._id)}>
            <View
              style={[
                styles.optionNumber,
                {
                  width: percentage > 12 ? `${percentage - 0.6}%` : '12%',
                },
              ]}>
              <Text style={styles.optionTitle}>
                {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
              </Text>
            </View>
            <View style={styles.textChoiceContainer}>
              <Text
                style={[styles.optionText, {position: 'absolute', left: 55}]}>
                {choice?.text}
              </Text>
              <Text
                style={[styles.optionTitle, {position: 'absolute', right: 10}]}>
                {(percentage || 0).toFixed(0)}%
              </Text>
            </View>
          </Pressable>
        );
      })}

      {discussion ? (
        <View style={[styles.rowContainer, {marginTop: 8}]}>
          <View style={styles.rowContainer1}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onLikePress}>
              <Like />
              <Text style={styles.text}>{item?.likes?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDislikePress}
              style={styles.buttonContainer}>
              <DisLike />
              <Text style={styles.text}>{item?.dislikes?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} disabled>
              <Comment />
              <Text style={styles.text}>{item?.comments}</Text>
            </TouchableOpacity>
          </View>
          {item?.user?._id != user_id ? (
            <TouchableOpacity
              onPress={onGiftPress}
              style={styles.buttonContainer}>
              <Gift style={{color: 'red'}} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {!discussion ? (
        <TouchableOpacity
          onPress={() => {
            viewDiscussion();
          }}
          style={styles.btnContainerDetails}>
          <Text style={styles.blackText}>View Discussion</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default EducationStudentQueryItemComponent;
