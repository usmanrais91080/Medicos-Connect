import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from '../../../../components/Icon';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './styles';
import {EducationServices} from '../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../../redux/actions/auth';
import {route} from '../../../../lib/utils/constants';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const EducationHome = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => {
    return {user: state.authReducer || {}};
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  }, []);

  const switchMode = mode => {
    EducationServices.setMode({mode}, profile?.user?.userData?.token)
      .then(res => {
        dispatch(
          authActions.getUserProfile(
            {token: profile?.user?.userData?.token},
            '',
            '',
          ),
        );
        if (mode == 'Student') {
          navigation.navigate(route.EDUCATIONSTUDENT, {
            teacher: false,
          });
        } else {
          navigation.navigate(route.EDUCATIONTEACHER, {
            teacher: true,
          });
        }
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/gifs/Education_icon.gif')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Welcome to MC Education</Text>
      <Text style={styles.text}>Tune in to find the best classrooms</Text>
      <Text style={styles.selectMode}>Select Mode</Text>
      <TouchableOpacity
        style={styles.studentButton}
        onPress={() => switchMode('Student')}>
        <Text style={styles.selectMode}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.teacherButton}
        onPress={() => switchMode('Teacher')}>
        <Text style={styles.selectMode}>Teacher</Text>
      </TouchableOpacity>

      <Text style={styles.text}>You can change mode in settings as well</Text>
    </View>
  );
};

export default EducationHome;
