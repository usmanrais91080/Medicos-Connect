import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  StatusBar,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {Container, DeleteModal, HeaderLeft, Icon} from '../../../../components';
import Search from '../../../../assets/svg/search.svg';

import styles from './style';
import EducationMenu from '../EducationMenu';
import EducationTeacherTopMainNavigationRoutes from '../../../../navigation/EducationNavigation/EducationTeacherTopBarMainNavigation';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
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
class ConnectHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
    };
  }

  componentDidMount = () => {
    // this.props.bottomTabAction.bottomTabTheme(colorTheme);
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
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Teacher'}</Text>
        </View>
      </View>
    );
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
    const {alertModal, msgToDisplay} = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <EducationTeacherTopMainNavigationRoutes />
        <EducationMenu
          visible={this.state.visible}
          teacher
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.push(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
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
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONSTUDENT)
          }
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONTEACHERCLASSESANDREQUESTS,
            );
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERPOSTCLASS);
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
              else if (msgToDisplay.includes('verified')) {
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectHome);
