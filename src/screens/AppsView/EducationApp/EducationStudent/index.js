import React, {Component} from 'react';

import {View, TouchableOpacity, Text, StatusBar} from 'react-native';
import {Container, DeleteModal, HeaderLeft, Icon} from '../../../../components';
import styles from './style';
import EducationMenu from '../EducationMenu';
import EducationStudentTopMainNavigationRoutes from '../../../../navigation/EducationNavigation/EducationStudentTopBarMainNavigation';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {ProfileServices} from '../../../../services';
import {authActions} from '../../../../redux/actions/auth';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_EDUCATION,
  iconColor: themeStyle.COLOR_WHITE,
};
class EducationStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      focusedClass: '',
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {
              screen: route.HOME,
            })
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
      headerTitle: () => this.headerTitle(),
      // headerStyle: () => this.headerStyle(),
    });
  };

  setFocusedClass = focusedClass => {
    this.setState({focusedClass});
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Student'}</Text>
        </View>
      </View>
    );
  };

  headerStyle = () => {
    return {
      backgroundColor: themeStyle.COLOR_EDUCATION,
    };
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_education_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_education_profile_created,
                )
              : this.setState({visible: true})
          }
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };
  render() {
    const {alertModal, msgToDisplay, focusedClass} = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <EducationStudentTopMainNavigationRoutes
          setFocusedClass={this.setFocusedClass}
        />
        <EducationMenu
          visible={this.state.visible}
          navigation={this.props.navigation}
          data={this.props.user.userData}
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            if (focusedClass == 'EducationStudentCME') {
              this.props.navigation.replace(route.EDUCATIONCREATEQNA, {
                isMyDiscussion: true,
              });
              return;
            }
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Education';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0]._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                await this.props.authActions.getUserModules(
                  this.props.user.userData.token,
                );
                this.props.navigation.replace(route.MAIN);
              })
              .catch(err => {
                console.log(err);
              });
          }}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTMYCLASSES);
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onClose={() => this.setState({visible: false})}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_education_profile_created)
                this.props.navigation.navigate(route.EDUCATIONSETTINGS, {
                  prev_screen: route.HOME,
                });
              else if (this.state.unverifiedUser) {
                this.props.navigation.push(route.MAIN, {
                  screen: route.PROFILE,
                  params: {
                    screen: route.ACCOUNTSETTINGS,
                    params: {
                      data: 0,
                    },
                  },
                });
              }
            });
          }}
          text={msgToDisplay}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EducationStudent);
