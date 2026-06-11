import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Container,
  EducationStudentAppliedClassItemComponent,
  HeaderLeft,
  Icon,
  Loader,
} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {connect} from 'react-redux';
import EducationMenu from '../EducationMenu';
import {EducationServices, ProfileServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';

class EducationStudentAppliedClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      filter: false,
      bowserMode: [],
      classes: {},
      loading: true,
      any: false,
      workshops: true,
      oneOnOne: false,
      default: false,
      latest: true,
      oldest: false,
    };
  }

  componentDidMount = () => {
    this.getUpcomingClasses();
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
          <Text style={styles.headingStyle}>
            {this.props?.user?.userData?.education_mode == 'Teacher'
              ? 'Teacher'
              : 'Student'}
          </Text>
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
  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentAppliedClassItemComponent
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
        />
      </>
    );
  };

  getUpcomingClasses = () => {
    EducationServices.getUpcomingClasses(this.props.user.userData.token)
      .then(res => {
        this.setState({classes: res.data.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  render() {
    const {activeTab, loading, classes} = this.state;
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
              }}
            >
              <Text style={styles.upcomingClasses}>Upcoming Classes</Text>
              {classes.current_week.length > 0 ||
              classes.next_classes.length > 0 ? (
                <>
                  {classes.current_week.length > 0 ? (
                    <>
                      <Text style={styles.text}>This week</Text>
                      <FlatList
                        ItemSeparatorComponent={VerticalSpacer}
                        contentContainerStyle={{paddingVertical: '5%'}}
                        data={classes?.current_week}
                        renderItem={({item, index}) =>
                          this._renderBestMatchItem(item, index)
                        }
                      />
                    </>
                  ) : null}
                  {classes.next_classes.length > 0 ? (
                    <>
                      <Text style={styles.text}>Upcoming</Text>
                      <FlatList
                        ItemSeparatorComponent={VerticalSpacer}
                        contentContainerStyle={{paddingVertical: '5%'}}
                        data={classes?.next_classes}
                        renderItem={({item, index}) =>
                          this._renderBestMatchItem(item, index)
                        }
                      />
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
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
        </View>
        <EducationMenu
          visible={this.state.visible}
          teacher={this.props?.user?.userData?.education_mode == 'Teacher'}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
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
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
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
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onClose={() => this.setState({visible: false})}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EducationStudentAppliedClasses);
