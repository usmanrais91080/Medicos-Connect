import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import EducationMenu from '../EducationMenu';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import Icon from '../../../../components/Icon';
import {EducationServices, ProfileServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import ReviewCard from '../../../../components/ReviewCard';

const EducationTeacherReadReviews = ({navigation, user}) => {
  const [visible, setVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
      headerTitle: () => headerTitle(),
    });
  }, []);

  useEffect(() => {
    if (page < totalPages || totalPages === null) {
      getReviews();
    }
  }, [page]);

  const getReviews = () => {
    setLoading(true);
    EducationServices.getTeacherReviews(
      page,
      5,
      user.userData?._id,
      user.userData?.token,
    )
      .then(response => {
        setReviews(prevReviews => [...prevReviews, ...response.data.data]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const loadMoreReviews = () => {
    if (!loading && page + 1 < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator
        size="large"
        style={styles.indicator}
        color={themeStyle.COLOR_PRIMARY}
      />
    ) : null;
  };

  const headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.menuButton}
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

  const renderItem = ({item}) => {
    return <ReviewCard review={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.reviews}>
        Reviews{' '}
        <Text style={styles.reviewCount}>({user?.userData?.reviewCount})</Text>
      </Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreReviews}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
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
)(EducationTeacherReadReviews);
