import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  EducationStudentClassesHistoryComponent,
  HeaderLeft,
  Icon,
  Loader,
} from '../../../../components';

import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import themeStyle from '../../../../assets/styles/theme.style';
import {EducationServices} from '../../../../services';
import {connect} from 'react-redux';
import EducationMenu from '../EducationMenu';

class EducationStudentMyClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      classes: [],
    };
  }
  getClassesHistory = () => {
    EducationServices.getClassesHistory(this.props.user.userData.token)
      .then(res => {})
      .catch(err => {
        this.setState({classes: [], loading: false});
      });
  };
  componentDidMount = () => {
    this.getClassesHistory();
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
  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
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

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentClassesHistoryComponent
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
          showAlert={
            !this.props.user.userData.is_education_profile_created ||
            this.state.unverifiedUser
          }
          showAlertFunc={() =>
            this.showNewUserAlertFunction(
              this.props.user.userData.is_education_profile_created,
            )
          }
        />
      </>
    );
  };

  render() {
    const {classes, loading} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView
              contentContainerStyle={{
                marginHorizontal: '5%',
                paddingBottom: '30%',
              }}>
              {classes?.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  contentContainerStyle={{paddingVertical: '5%'}}
                  data={classes}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../../assets/gifs/studyschedule.gif')}
                      style={styles.gif}
                      resizeMode="contain"
                    />
                    <Text style={styles.noDataText}>No Classes Available.</Text>
                  </View>
                </>
              )}
            </ScrollView>
          )}
          <EducationMenu
            visible={this.state.visible}
            onSwitch={() =>
              this.props.navigation.navigate(route.EDUCATIONTEACHER)
            }
            onMyDiscussion={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
                isMyDiscussion: true,
              });
            }}
            onTeacherStats={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
            }}
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
            data={this.props.user.userData}
            navigation={this.props.navigation}
            onClose={() => this.setState({visible: false})}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(EducationStudentMyClasses);
