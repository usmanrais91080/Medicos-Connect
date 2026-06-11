import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from '../../../../components/Icon';
import themeStyle from '../../../../assets/styles/theme.style';
import EducationMenu from '../EducationMenu';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {authActions} from '../../../../redux/actions/auth';
import {route} from '../../../../lib/utils/constants';
import {EducationServices, ProfileServices} from '../../../../services';
import {connect} from 'react-redux';
import TotalClassesIcon from '../../../../assets/svg/total-classes.svg';
import MissedClassesIcon from '../../../../assets/svg/missed-classes.svg';
import ConductedClassesIcon from '../../../../assets/svg/conducted-classes.svg';
import Time from '../../../../assets/svg/time.svg';
import PieChart from 'react-native-pie-chart';

const EducationTeacherStats = ({navigation, user}) => {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState({});

  const widthAndHeight = 250;
  const series = [123, 321, 123];
  const sliceColor = [
    themeStyle.BROWN_LIGHT,
    themeStyle.PURPLE_COLOR2,
    themeStyle.PINK_LIGHT,
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
      headerTitle: () => headerTitle(),
    });
  }, []);

  useEffect(() => {
    getTeacherStats();
  }, []);

  const getTeacherStats = () => {
    const {_id, token} = user.userData;
    EducationServices.getTeacherStats(_id, token)
      .then(response => {
        setStats(response.data.data);
      })
      .catch(err => null);
  };

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
      <Text style={styles.statsTitle}>Stats</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <TotalClassesIcon />
          <Text style={styles.statsCardText}>Total Classes</Text>
          <Text style={styles.statsCount}>{stats?.totalClasses}</Text>
        </View>
        <View style={styles.statsCard}>
          <ConductedClassesIcon />
          <Text style={styles.statsCardText}>Conducted</Text>
          <Text style={styles.statsCount}>{stats?.totalConductedSessions}</Text>
        </View>
        <View style={styles.statsCard}>
          <MissedClassesIcon />
          <Text style={styles.statsCardText}>Missed</Text>
          <Text style={styles.statsCount}>{stats?.totalMissedSessions}</Text>
        </View>
      </View>
      <View style={[styles.statsCard, {width: '100%', marginTop: 13}]}>
        <Time />
        <Text style={styles.statsCardText}>Total time spent in Classes</Text>
        <Text style={styles.statsCount}>
          {stats?.totalHoursSpent}hr{stats?.totalHoursSpent > 1 ? 's' : ''}
        </Text>
      </View>
      <Text style={[styles.statsTitle, {marginTop: 18, marginBottom: 4}]}>
        Statics
      </Text>
      <View style={styles.statsDetailContainer}>
        <View
          style={[styles.colorBox, {backgroundColor: themeStyle.BROWN_LIGHT}]}
        />
        <Text style={styles.detailTitle}>Total Classes</Text>
      </View>
      <View style={styles.statsDetailContainer}>
        <View
          style={[styles.colorBox, {backgroundColor: themeStyle.PURPLE_COLOR2}]}
        />
        <Text style={styles.detailTitle}>Conducted Classes</Text>
      </View>
      <View style={styles.statsDetailContainer}>
        <View
          style={[styles.colorBox, {backgroundColor: themeStyle.PINK_LIGHT}]}
        />
        <Text style={styles.detailTitle}>Missed Classes</Text>
      </View>
      <PieChart
        style={{alignSelf: 'center', marginTop: 20}}
        widthAndHeight={widthAndHeight}
        series={[
          stats?.totalClasses,
          stats?.totalConductedSessions,
          stats?.totalMissedSessions,
        ]}
        sliceColor={sliceColor}
        coverRadius={0.45}
        coverFill={'#FFF'}
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
)(EducationTeacherStats);
