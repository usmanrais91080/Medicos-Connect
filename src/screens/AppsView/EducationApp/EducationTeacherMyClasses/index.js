import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';

import {
  Button,
  Container,
  DeleteModal,
  EducationStudentMyClassesItemComponent,
  Icon,
  Loader,
} from '../../../../components';

import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import EducationModalTeacher from '../EducationModalTeacher';
import EducationFunction from './education.teachermyclass.function';
import themeStyle from '../../../../assets/styles/theme.style';
import Query from '../../../../assets/svg/query.svg';
import EducationMenu from '../EducationMenu';

class EducationTeacherMyClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      loading: true,
      any: false,
      workshops: true,
      oneOnOne: false,
      default: false,
      latest: true,
      oldest: false,
      classes: [],
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      offset: 5,
      page: 1,
      loadingPost: false,
      stopFetchMore: true,
      isMorePosts: true,
      refreshing: false,
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getClasses();
    });
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _getClasses = () => {
    const {offset, page} = this.state;
    EducationFunction.getClasses(this.props.user.userData.token, page, offset)
      .then(res => {
        this.setState({classes: res.data.data, loading: false});
      })
      .catch(err => {
        this.setState({classes: [], loading: false});
      });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    EducationFunction.getClasses(this.props.user.userData.token, 1, 5)
      .then(res => {
        this.setState({
          classes: res.data.data,
          refreshing: false,
          page: 2,
        });
      })
      .catch(err => {
        this.setState({refreshing: false});
      });
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentMyClassesItemComponent
          teacher
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
          userName={
            this.props.user?.userData?.education_username == 'null'
              ? this.props.user?.userData?.name
              : this.props.user?.userData?.education_username
          }
          img={this.props.user?.userData?.education_image}
        />
      </>
    );
  };

  onEndReached = () => {
    if (!this.state.stopFetchMore) {
      const {offset, page, classes} = this.state;
      EducationFunction.getClasses(this.props.user.userData.token, page, offset)
        .then(res => {
          if (res.data.data.length > 0) {
            this.setState({
              classes: [...classes, ...res.data.data],
              loadingPost: false,
            });
          } else {
            this.setState({
              stopFetchMore: true,
              loadingPost: false,
              isMorePosts: false,
            });
          }
        })
        .catch(err => {
          this.setState({loadingPost: false});
        });
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  onScrollBeginDrag = () => {
    this.setState({stopFetchMore: false});
  };

  onScroll = ({nativeEvent}) => {
    const {page, isMorePosts} = this.state;
    if (this.isCloseToBottom(nativeEvent) && isMorePosts) {
      this.setState({page: page + 1, loadingPost: true}, () =>
        this.onEndReached(),
      );
    }
  };

  render() {
    const {
      filter,
      loading,
      classes,
      alertModal,
      msgToDisplay,
      loadingPost,
      refreshing,
    } = this.state;
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
              onScroll={this.onScroll}
              onScrollBeginDrag={this.onScrollBeginDrag}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              scrollEventThrottle={100}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    !this.props.user.userData.is_education_profile_created ||
                    this.state.unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData.is_education_profile_created,
                        )
                      : this.props.navigation.navigate(
                          route.EDUCATIONTEACHERPOSTCLASS,
                        );
                  }}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: themeStyle.EDUCATION_BROWN,
                      width: SCREEN_WIDTH * 0.9,
                    },
                  ]}>
                  <Query height={15} width={15} />
                  {HorizontalSpacer()}
                  <Text style={styles.btnText}>Create a Class</Text>
                </TouchableOpacity>
              </View>

              {classes.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  contentContainerStyle={{paddingVertical: '5%'}}
                  data={classes}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                  ListFooterComponent={() =>
                    loadingPost ? (
                      <ActivityIndicator
                        size={'large'}
                        color={themeStyle.COLOR_EDUCATION}
                        style={styles.activityIndicator}
                      />
                    ) : null
                  }
                />
              ) : (
                <>
                  <View style={styles.emptyContainer}>
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

        <EducationModalTeacher
          visible={filter}
          onClose={() => this.setState({filter: false})}
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
        <EducationMenu
          visible={this.state.visible}
          teacher
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONSTUDENT)
          }
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONTEACHERCLASSESANDREQUESTS,
            );
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERPOSTCLASS);
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
              .catch(err => {});
          }}
          onClose={() => this.setState({visible: false})}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(EducationTeacherMyClasses);
