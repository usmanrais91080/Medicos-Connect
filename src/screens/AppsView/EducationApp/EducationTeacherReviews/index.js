import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';
import EducationMenu from '../EducationMenu';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import Icon from '../../../../components/Icon';
import {ProfileServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import Stats from '../../../../assets/svg/total-classes.svg';
import ReviewStars from '../../../../assets/svg/review-stars.svg';
import {route} from '../../../../lib/utils/constants';

const EducationTeacherReviews = ({navigation, user}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
      headerTitle: () => headerTitle(),
    });
  }, []);

  const headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Teacher'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: user?.userData?.education_image}}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user?.userData?.education_username}</Text>
      <Text style={styles.role}>{user?.userData?.education_mode}</Text>
      <View style={styles.line} />
      <Text style={styles.reviewText}>
        Reviews{' '}
        <Text style={{...styles.reviewText, ...styles.reviewCount}}>
          ({user?.userData?.reviewCount})
        </Text>
      </Text>
      <View style={styles.starContainer}>
        <StarRating
          maxStars={5}
          rating={user?.userData?.averageRating}
          starStyle={{
            marginHorizontal: 4,
            borderCurve: 'circular',
          }}
          disabled
          emptyStarColor={themeStyle.COLOR_EDUCATION}
          starSize={28}
          fullStarColor={themeStyle.COLOR_EDUCATION}
        />
      </View>
      <View style={styles.line} />
      <Text style={styles.statistics}>Statistics</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(route.EDUCATIONTEACHERREADREVIEWS)}
          style={styles.button}
        >
          <ReviewStars />
          <Text style={styles.buttonText}>Read Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(route.EDUCATIONTEACHERSTATS)}
        >
          <Stats />
          <Text style={styles.buttonText}>Class stats</Text>
        </TouchableOpacity>
      </View>
      <EducationMenu
        visible={visible}
        navigation={navigation}
        data={user.userData}
        teacher={true}
        onTeacherStats={() => {
          setVisible(false);
          navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
        }}
        onMyDiscussion={() => {
          setVisible(false);
          navigation.navigate(route.EDUCATIONCREATEQNA, {
            isMyDiscussion: true,
          });
        }}
        onDeactive={async () => {
          const data = await user?.userModules?.filter(function (account) {
            return account.module.name === 'Education';
          });
          ProfileServices.deactivateUserModule(
            {id: data[0]._id},
            user.userData.token,
          )
            .then(async res => {
              setVisible(false);
              await authActions.getUserModules(user.userData.token);
              navigation.replace(route.MAIN);
            })
            .catch(err => {
              console.log(err);
            });
        }}
        onSwitch={() => navigation.navigate(route.EDUCATIONTEACHER)}
        onYourClasses={() => {
          setVisible(false);
          navigation.navigate(route.EDUCATIONSTUDENTMYCLASSES);
        }}
        onPostClass={() => {
          setVisible(false);
          navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
        }}
        onAppliedClasses={() => {
          setVisible(false);
          navigation.navigate(route.EDUCATION, {
            screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
          });
        }}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EducationTeacherReviews);
