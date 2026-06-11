import React, {Component} from 'react';

import {View, TouchableOpacity, Text, StatusBar} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Container, HeaderLeft, Icon} from '../../../../components';
import Search from '../../../../assets/svg/white-search.svg';

import styles from './style';
import EducationMenu from '../EducationMenu';
import EducationStudentMyClassTopNavigationRoutes from '../../../../navigation/EducationNavigation/EducationStudentMyClassTopNavigation';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ProfileServices} from '../../../../services';
class EducationStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
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

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
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

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <EducationStudentMyClassTopNavigationRoutes />
        <EducationMenu
          data={this.props.user.userData}
          navigation={this.props.navigation}
          visible={this.state.visible}
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTCLASSESANDREQUESTS,
            );
          }}
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            );
          }}
          onClose={() => this.setState({visible: false})}
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
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EducationStudent);
