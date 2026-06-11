import React, {Component} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, DeleteModal, Icon} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import CareerMenu from '../CareerMenu';
import CareerTopNavigationRoutes from '../../../../navigation/CareerNavigation/CareerTopTabNavigation';
import {connect} from 'react-redux';
import {ProfileServices} from '../../../../services';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
class CareerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {screen: route.HOME})
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_pager_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_career_profile_created,
                )
              : this.props.navigation.navigate(route.CAREERJOBCREATE)
          }
          style={styles.marginRight10}>
          <Icon.AntDesign
            name="plussquareo"
            size={20}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_pager_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.props.navigation.navigate(route.CAREERSEARCH)
          }>
          <Icon.Ionicons
            name="options-outline"
            size={22}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_pager_profile_created ||
            this.state.unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.setState({visible: true})
          }
          style={styles.marginLeft15}>
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
        <StatusBar
          backgroundColor={themeStyle.CARRER_PRIMARY}
          barStyle="light-content"
        />
        <CareerMenu
          visible={this.state.visible}
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREEREDITPROFILE),
            )
          }
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Career';
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
                // console.log(err);
              });
          }}
          onViewJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBAPPLIED),
            )
          }
          onFavJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBFAV),
            )
          }
          onPostedJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBPOSTED),
            )
          }
          onProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERSETTINGS),
            )
          }
          onClose={() => this.setState({visible: false})}
          navigation={this.props.navigation}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_career_profile_created)
                this.props.navigation.navigate(route.CAREERSETTINGS, {
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
        <CareerTopNavigationRoutes navigation={this.props.navigation} />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerHome);
