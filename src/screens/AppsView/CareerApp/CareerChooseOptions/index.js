import React, {useEffect, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './styles';
import {Image} from 'react-native';
import Icon from '../../../../components/Icon';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import CareerMenu from '../CareerMenu';
import {DeleteModal} from '../../../../components';
import {ProfileServices} from '../../../../services';
import {route} from '../../../../lib/utils/constants';

const CareerChooseOptions = ({navigation, user}) => {
  const [alertModal, setAlertModal] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState('');
  const [visible, setVisible] = useState(false);
  const [unverifiedUser] = useState(
    user.userData.user_tier == 0 ? true : false,
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
    });
  }, []);

  const headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            !user.userData.is_career_profile_created || unverifiedUser
              ? showNewUserAlertFunction(
                  user.userData.is_career_profile_created,
                )
              : navigation.navigate(route.CAREERJOBCREATE)
          }
          style={{marginRight: 10}}
        >
          <Icon.AntDesign
            name="plussquareo"
            size={20}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            !user.userData.is_career_profile_created || unverifiedUser
              ? showNewUserAlertFunction()
              : navigation.navigate(route.CAREERSEARCH)
          }
        >
          <Icon.Ionicons
            name="options-outline"
            size={22}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            !user.userData.is_career_profile_created || unverifiedUser
              ? showNewUserAlertFunction()
              : setVisible(true)
          }
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

  const showNewUserAlertFunction = created => {
    setAlertModal(true);
    setMsgToDisplay(
      created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeStyle.CARRER_PRIMARY}
      />
      <Image
        source={require('../../../../assets/gifs/career_briefcase.gif')}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to MC Career</Text>
      <Text style={styles.text}>Tune in to find the best classrooms</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(route.CAREERCREATEPROFILE, {medical: true})
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Medical</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(route.CAREERCREATEPROFILE, {freelancer: true})
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Freelancer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(route.CAREERCREATEPROFILE, {influencer: true})
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Influencer</Text>
      </TouchableOpacity>

      <CareerMenu
        visible={visible}
        onEditProfile={() => {
          setVisible(false);
          navigation.navigate(route.CAREEREDITPROFILE);
        }}
        onDeactive={async () => {
          const data = await user?.userModules?.filter(function (account) {
            return account.module.name === 'Career';
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
              // console.log(err);
            });
        }}
        onViewJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBAPPLIED);
        }}
        onFavJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBFAV);
        }}
        onPostedJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBPOSTED);
        }}
        onProfile={() => {
          setVisible(false);
          navigation.navigate(route.CAREERSETTINGS);
        }}
        onClose={() => setVisible(false)}
        navigation={navigation}
      />
      <DeleteModal
        alert
        visible={alertModal}
        confirm={() => {
          setAlertModal(false);
          if (!user.userData.is_career_profile_created) {
            setAlertModal(false);
          } else if (unverifiedUser) {
            navigation.push(route.MAIN, {
              screen: route.PROFILE,
              params: {
                screen: route.ACCOUNTSETTINGS,
                params: {
                  data: 0,
                },
              },
            });
          }
        }}
        text={msgToDisplay}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareerChooseOptions);
