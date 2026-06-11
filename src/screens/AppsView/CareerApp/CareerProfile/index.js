import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Container, HeaderLeft, Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {HeaderRight} from './career.profile.component';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import JobsAppliedItem from '../CareerJobApplied/career.jobsApplied.componet';

class CareerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      avatar: '',
      loading: true,
      loadingJobs: true,
      refreshing: false,
      userProfile: {},
      postedJobs: [],
      appliedJobs: [],
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getCareerProfile();
      this.getAppliedJobs();
    });
    this.getCareerProfile();
    this.getAppliedJobs();
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => this.setState({visible: true})} />
      ),
      headerLeft: () => (
        <HeaderLeft
          color={themeStyle.COLOR_WHITE}
          navigation={this.props.navigation}
        />
      ),
    });
  };
  getPostedJobs = () => {
    CareerServices.getCreatedJobs(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            postedJobs: res.data.data,
            loadingJobs: false,
          });
        }
      })
      .catch(err => {
        this.setState({postedJobs: [], refreshing: false, loadingJobs: false});
      });
  };

  getAppliedJobs = () => {
    CareerServices.getAppliedJobs(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            appliedJobs: res.data.data,
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
      });
  };

  _renderBestMatchItem = (item, index) => {
    let dataToShow = item.posted_from == 'Company' ? item.company : item.user;
    return (
      <>
        <JobsAppliedItem
          dataToShow={dataToShow}
          item={item}
          navigation={this.props.navigation}
          applied
          token={this.props.user.userData.token}
        />
      </>
    );
  };

  getCareerProfile = () => {
    CareerServices.getJobProfile(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({userProfile: res.data.data, loading: false}, () =>
            this.getPostedJobs(),
          );
        }
      })
      .catch(err => {
        this.setState({userProfile: {}, loading: false});
      });
  };

  chooseFile = () => {
    this.props.navigation.navigate(route.CAREERSETTINGS, {
      prev_screen: 'Profile',
    });
  };

  render() {
    const {
      activeTab,
      userProfile,
      loading,
      postedJobs,
      loadingJobs,
      appliedJobs,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={styles.row}>
                <Image
                  source={{
                    uri:
                      userProfile?.image == ''
                        ? 'https://wallpapercave.com/wp/wp3396910.jpg'
                        : userProfile.image,
                  }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.profileName}>
                    {userProfile?.username}
                  </Text>
                  <Text style={[styles.text, {marginLeft: 8}]}>
                    {userProfile?.profession?.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate(route.CAREERSEARCH)
                    }
                    style={styles.savedJobsButton}
                  >
                    <Text style={styles.searchJobs}>Search Jobs</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.rowContainer1, {marginTop: '7%'}]}>
                <Text style={styles.text}>Country</Text>
                <Text style={styles.text}>{userProfile?.country?.name}</Text>
              </View>
              <View style={styles.rowContainer1}>
                <Text style={styles.text}>City</Text>
                <Text style={styles.text}>{userProfile?.city?.name}</Text>
              </View>
              <Text style={styles.appliedJobs}>Applied Jobs</Text>

              {appliedJobs.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  data={appliedJobs}
                  style={{paddingHorizontal: 13}}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <Text style={styles.noAppliedText}>No Applied Jobs</Text>
              )}
            </ScrollView>
          )}
        </View>
        <CareerMenu
          visible={this.state.visible}
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREEREDITPROFILE),
            )
          }
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
              .catch(err => {});
          }}
          onClose={() => this.setState({visible: false})}
          navigation={this.props.navigation}
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

export default connect(mapStateToProps, mapDispatchToProps)(CareerProfile);
