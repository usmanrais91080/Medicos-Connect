import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Container,
  Icon,
  JobsBrowserModeItemComponent,
  JobsPublicAdsItemComponent,
  Tabs,
  Loader,
  DeleteModal,
  AnouncementModal,
} from '../../../../components';
import {CareerServices} from '../../../../services';
import styles from './style';
import {route, SCREEN_HEIGHT} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {bindActionCreators} from 'redux';
import {searchActions} from '../../../../redux/actions/search';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import themeStyle from '../../../../assets/styles/theme.style';
import {Image} from 'react-native';
import CareerCompletionModal from '../../../../components/Modals/CareerCompletionModal';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.CARRER_PRIMARY,
  iconColor: themeStyle.COLOR_WHITE,
};
class CareerJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      jobs: [],
      publicAds: [],
      publicLoad: true,
      jobLoad: true,
      searchJobs: [],
      loading: true,
      refresh: false,
      searchFilters: {},
      showfilters: false,
      searchSet: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      showPublicAd: {
        show: false,
        text: '',
        img: '',
        id: '',
        index: '',
        is_favourite: false,
      },
      favModal: false,
      page: 1,
      offset: 5,
      stopFetchMore: true,
      loadingJobs: false,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.getSearchFilters();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      if (this.props.search.careerSearch) {
        this.setState({
          //   loading:true,
          activeTab: 1,
          showfilters: true,
        });
        this.getSearchFilters();
        this.props.searchActions.careerSearch(this.props.search.careerSearch);
      }
    });
    this.getJobs();
    this.getPublicAds();
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  applyJob = (id, ind) => {
    const {jobs} = this.state;
    let data = {
      job_id: id,
      note: 'Quick Apply',
    };
    CareerServices.applyJob(data, this.props.user.userData.token)
      .then(res => {})
      .catch(err => {
        this.setState({msgToDisplay: `${err.message}`, alertModal: true});
      });
    this.setState({
      msgToDisplay: 'You have applied in your job',
      alertModal: true,
    });
    let tempJob = jobs;
    tempJob[ind].is_applied = true;
    this.setState({
      jobs: tempJob,
    });
  };

  publicAdsFav = (id, ind) => {
    const {publicAds} = this.state;
    CareerServices.jobAddRemoveFav(id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          showPublicAd: {
            ...this.state.showPublicAd,
            is_favourite: !this.state.showPublicAd.is_favourite,
          },
        });
      })
      .catch(err => {
        // console.log('err : ', err);
        this.setState({
          refresh: false,
          msgToDisplay: `${err.message}`,
          alertModal: true,
        });
      });
    const tempJob = [...publicAds]; // Create a shallow copy of publicAds
    tempJob[ind].is_favourite = !tempJob[ind].is_favourite; // Toggle the is_favourite value
    this.setState({publicAds: tempJob});
  };

  onScrollBeginDrag = () => {
    this.setState({stopFetchMore: false});
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  endReached = () => {
    const {stopFetchMore, page, offset, jobs} = this.state;
    const {token} = this.props.user.userData;

    if (!stopFetchMore) {
      CareerServices.getJobs(token, page, offset)
        .then(res => {
          if (res.data.code == 200) {
            let array = [];
            res.data.data.jobs.map(val => {
              if (val.is_applied == false) {
                array.push(val);
              }
            });
            this.setState({
              jobs: [...jobs, ...array],
              loadingJobs: false,
              refreshing: false,
              jobLoad: false,
            });
          }
        })
        .catch(err => {
          this.setState({
            jobs: [],
            loading: false,
            refreshing: false,
            jobLoad: false,
          });
        });
    }
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent)) {
      this.setState({page: this.state.page + 1, loadingJobs: true}, () =>
        this.endReached(),
      );
    }
  };

  jobFav = (id, ind) => {
    const {jobs} = this.state;
    this.setState({refresh: true});
    let tempJob = [...jobs];
    let showMsg = tempJob[ind].is_favourite == true ? 'Unsaved' : 'Saved';
    this.setState({msgToDisplay: showMsg, favModal: true});
    tempJob[ind].is_favourite =
      tempJob[ind].is_favourite == true ? false : true;
    this.setState({
      jobs: tempJob,
      refresh: false,
    });
    CareerServices.jobAddRemoveFav(id, this.props.user.userData.token)
      .then(res => {
        this.setState({refresh: false});
      })
      .catch(err => {
        this.setState({
          refresh: false,
          msgToDisplay: `${err.message}`,
          alertModal: true,
        });
      });
  };

  getJobs = () => {
    const {page, offset} = this.state;
    const {token} = this.props.user.userData;
    CareerServices.getJobs(token, page, offset)
      .then(res => {
        if (res.data.code == 200) {
          let array = [];
          res.data.data.jobs.map(val => {
            if (val.is_applied == false) {
              array.push(val);
            }
          });
          this.setState({
            jobs: array,
            loading: false,
            refreshing: false,
            jobLoad: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          jobs: [],
          loading: false,
          refreshing: false,
          jobLoad: false,
        });
      });
  };
  jobRemove = id => {
    this.setState({msgToDisplay: 'Job removed successfully', alertModal: true});
    let tempJob = this.state.jobs.filter(val => val._id != id);
    this.setState({
      jobs: tempJob,
    });
    CareerServices.jobAddRemove(id, this.props.user.userData.token)
      .then(res => {})
      .catch(err => {
        // console.log('err : ', err);
      });
  };
  jobUndoRemove = () => {
    CareerServices.jobAddRemove(id, this.props.user.userData.token)
      .then(res => {})
      .catch(err => {
        // console.log('err : ', err);
      });
    this.getJobs();
  };
  getPublicAds = () => {
    CareerServices.getPublicAds(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            publicAds: res.data.data?.items,
            loading: false,
            refreshing: false,
            publicLoad: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          publicAds: [],
          loading: false,
          refreshing: false,
          publicLoad: false,
        });
      });
  };
  getSearchJobs = jobData => {
    CareerServices.jobSearch(jobData, this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          let temp = res.data.data.filter(val =>
            val.user != '' ? val.user._id != this.props.user.userData._id : val,
          );
          this.setState({
            searchJobs: temp.reverse(),
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => {
        this.setState({searchJobs: [], loading: false, refreshing: false});
      });
  };
  getSearchFilters = () => {
    CareerServices.getJobFilters(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            searchFilters: res.data.data,
            searchSet: res.data.data.is_search_set,
          });
          if (res.data.data.is_search_set) {
            this.setState({showfilters: true});
            let jobData = {
              titles: [res.data.data.job_title[0]._id],
              city: res.data.data.city._id,
              expected_salary: res.data.data.expected_salary,
            };
            this.getSearchJobs(jobData);
          } else {
            this.setState({showfilters: false});
            let jobData = {
              titles: null,
              city: null,
              expected_salary: null,
            };
            this.getSearchJobs(jobData);
          }
        }
      })
      .catch(err => {
        this.setState({searchFilters: {}, loading: false});
      });
  };

  browseJobFav = (id, ind) => {
    this.setState({refresh: true});
    const {searchJobs} = this.state;

    let tempJob = [...searchJobs];
    let showMsg = tempJob[ind].is_favourite == true ? 'Unsaved' : 'Saved';
    this.setState({msgToDisplay: showMsg, favModal: true});
    tempJob[ind].is_favourite =
      tempJob[ind].is_favourite == true ? false : true;
    this.setState({
      searchJobs: tempJob,
      refresh: false,
    });

    CareerServices.jobAddRemoveFav(id, this.props.user.userData.token)
      .then(res => {
        this.setState({refresh: false});
      })
      .catch(err => {
        this.setState({
          refresh: false,
          msgToDisplay: `${err.message}`,
          alertModal: true,
        });
      });
  };

  _renderJobsInIslamabadItem = (item, index) => {
    let dataToShow = item.posted_from == 'Company' ? item.company : item.user;
    let jobStatus = item.is_applied;
    return (
      <>
        <JobsBrowserModeItemComponent
          item={item}
          navigation={this.props.navigation}
          browseJobFav={this.browseJobFav}
          token={this.props.user.userData.token}
          showAlert={
            !this.props.user.userData.is_career_profile_created ||
            this.state.unverifiedUser
          }
          index={index}
          showAlertFunc={() =>
            this.showNewUserAlertFunction(
              this.props.user.userData.is_career_profile_created,
            )
          }
          dataToShow={dataToShow}
          applied={jobStatus}
        />
      </>
    );
  };

  _renderPublicAds = (item, index) => {
    return (
      <>
        <JobsPublicAdsItemComponent
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
          showAlert={
            !this.props.user.userData.is_career_profile_created ||
            this.state.unverifiedUser
          }
          disabled={true}
          showAlertFunc={() =>
            this.showNewUserAlertFunction(
              this.props.user.userData.is_career_profile_created,
            )
          }
          showAd={() => {
            this.setState({
              showPublicAd: {
                index,
                is_favourite: item?.is_favourite,
                img: item?.image,
                text: item?.description,
                id: item?._id,
                show: true,
              },
            });
          }}
        />
      </>
    );
  };

  _renderJobs = (item, index) => {
    let dataToShow = item.posted_from == 'Company' ? item.company : item.user;
    let jobFav = item.is_favourite;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: dataToShow.image,
            }}
            rounded
            size={68}
          />
          <Text style={styles.titleText}>
            {item.posted_from == 'Company'
              ? dataToShow.name
              : dataToShow.username || 'Name'}
          </Text>
          {item?.title?.name ? (
            <Text style={styles.designationText}>{item?.title?.name}</Text>
          ) : null}
          <View style={styles.rowContainer}>
            <View style={styles.jobType}>
              <Text style={styles.jobTypeText}>
                {item?.type && item?.type[0]?.name}
              </Text>
            </View>
            <View style={styles.profession}>
              <Text style={styles.professionText}>
                {item?.profession?.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.infoTitle}>Salary</Text>
          <Text style={styles.headingText}>{item?.salary || 0}</Text>
        </View>
        <View style={[styles.rowStyle, {marginTop: '2%'}]}>
          <Text style={styles.infoTitle}>Experience</Text>
          <Text style={styles.headingText}>{item?.experience}</Text>
        </View>
        <View style={[styles.rowStyle, {marginTop: '2%'}]}>
          <Text style={styles.infoTitle}>Location</Text>
          <Text style={styles.headingText}>{item?.city}</Text>
        </View>
        <View style={{marginTop: '2%'}}>
          <Text style={styles.infoTitle}>Description</Text>
          <Text
            numberOfLines={2}
            style={[styles.headingText, {marginTop: '2%'}]}
          >
            {item?.description}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => {
              !this.props.user.userData.is_career_profile_created ||
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction(
                    this.props.user.userData.is_career_profile_created,
                  )
                : this.props.navigation.navigate(route.CAREERJOBDETAIL, {
                    jobId: item._id,
                    token: this.props.user.userData.token,
                  });
            }}
          >
            <Text style={styles.detailButtonText}>Details</Text>
          </TouchableOpacity>
          <View style={{...styles.rowContainer, marginTop: 0}}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() =>
                !this.props.user.userData.is_career_profile_created ||
                this.state.unverifiedUser
                  ? this.showNewUserAlertFunction(
                      this.props.user.userData.is_career_profile_created,
                    )
                  : this.jobFav(item._id, index)
              }
            >
              <Icon.Ionicons
                name={jobFav == true ? 'bookmark' : 'bookmark-outline'}
                size={27}
                color={themeStyle.COLOR_BLACK}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                !this.props.user.userData.is_career_profile_created ||
                this.state.unverifiedUser
                  ? this.showNewUserAlertFunction(
                      this.props.user.userData.is_career_profile_created,
                    )
                  : this.jobRemove(item._id)
              }
              style={styles.iconContainer}
            >
              <Icon.Entypo
                name="cross"
                size={27}
                color={themeStyle.COLOR_BLACK}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      publicLoad,
      jobLoad,
      activeTab,
      jobs,
      publicAds,
      refresh,
      loading,
      searchJobs,
      alertModal,
      msgToDisplay,
      showPublicAd,
      favModal,
      loadingJobs,
    } = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <Tabs.ListTabs
              active={activeTab}
              tabs={['Quick mode', 'Browse mode', 'Public Ads']}
              profile
              onTabChange={activeTab => {
                this.setState({activeTab});
              }}
            />
            {activeTab == 0 ? (
              <ScrollView
                style={{marginTop: '5%'}}
                contentContainerStyle={{paddingBottom: '30%'}}
                onScroll={this.onScroll}
                onScrollBeginDrag={this.onScrollBeginDrag}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={this.getJobs}
                  />
                }
              >
                {jobs?.length > 0 ? (
                  <FlatList
                    ItemSeparatorComponent={VerticalSpacer}
                    contentContainerStyle={{paddingVertical: '5%'}}
                    data={jobs}
                    renderItem={({item, index}) =>
                      this._renderJobs(item, index)
                    }
                    ListFooterComponent={() =>
                      loadingJobs && (
                        <ActivityIndicator
                          size="large"
                          color={themeStyle.CARRER_PRIMARY}
                          style={{marginVertical: 20}}
                        />
                      )
                    }
                  />
                ) : jobLoad ? (
                  <View style={{height: SCREEN_HEIGHT * 0.8}}>
                    <Loader />
                  </View>
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
                        resizeMode="contain"
                        source={require('../../../../assets/gifs/findJob.gif')}
                        style={styles.gif}
                      />
                    </View>
                    <Text style={styles.noDataText}>
                      Don't despair if you haven't found any job openings yet.
                      We understand your concern and want you to know that we
                      are actively reaching out to organizations to create new
                      job opportunities for you. Stay positive, more options are
                      on the horizon!
                    </Text>
                  </>
                )}
              </ScrollView>
            ) : null}
            {activeTab == 1 ? (
              <ScrollView
                style={{marginTop: '5%'}}
                contentContainerStyle={{
                  marginHorizontal: '5%',
                  paddingBottom: '30%',
                }}
              >
                {searchJobs?.length > 0 ? (
                  <View>
                    <Text style={styles.headingText}>Best Matched</Text>
                    <FlatList
                      ItemSeparatorComponent={VerticalSpacer}
                      contentContainerStyle={{paddingVertical: '5%'}}
                      data={searchJobs}
                      renderItem={({item, index}) =>
                        this._renderJobsInIslamabadItem(item, index)
                      }
                    />
                  </View>
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
                        source={require('../../../../assets/gifs/findJob.gif')}
                        style={styles.gif}
                      />
                    </View>
                    <Text style={styles.noDataText}>
                      Don't despair if you haven't found any job openings yet.
                      We understand your concern and want you to know that we
                      are actively reaching out to organizations to create new
                      job opportunities for you. Stay positive, more options are
                      on the horizon!
                    </Text>
                  </>
                )}
              </ScrollView>
            ) : null}
            {activeTab == 2 ? (
              <ScrollView
                style={{marginTop: '5%'}}
                contentContainerStyle={{
                  marginHorizontal: '5%',
                  paddingBottom: '30%',
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={this.getPublicAds}
                  />
                }
              >
                <Text style={styles.title}>Best Matched</Text>
                {publicAds?.length > 0 ? (
                  <FlatList
                    ItemSeparatorComponent={VerticalSpacer}
                    contentContainerStyle={{paddingVertical: '5%'}}
                    data={publicAds}
                    renderItem={({item, index}) =>
                      this._renderPublicAds(item, index)
                    }
                  />
                ) : publicLoad ? (
                  <View style={{height: SCREEN_HEIGHT * 0.8}}>
                    <Loader />
                  </View>
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
                        source={require('../../../../assets/gifs/findJob.gif')}
                        style={styles.gif}
                      />
                    </View>
                    <Text style={styles.noDataText}>
                      Don't despair if you haven't found any job openings yet.
                      We understand your concern and want you to know that we
                      are actively reaching out to organizations to create new
                      job opportunities for you. Stay positive, more options are
                      on the horizon!
                    </Text>
                  </>
                )}
              </ScrollView>
            ) : null}
          </View>
        )}
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_career_profile_created)
                this.props.navigation.navigate(route.CAREERPROFILE1ST, {
                  prev_screen: route.HOME,
                });
            });
          }}
          text={msgToDisplay}
        />
        <CareerCompletionModal
          visible={favModal}
          saved
          topAds={this.props.user?.topAds}
          bottomAds={this.props.user?.bottomAds}
          savedText={msgToDisplay}
          onClose={() => this.setState({favModal: false})}
        />
        <AnouncementModal
          public
          navigation={this.props.navigation}
          visible={showPublicAd?.show}
          saved={showPublicAd?.is_favourite}
          onSave={() =>
            this.publicAdsFav(showPublicAd?.id, showPublicAd?.index)
          }
          confirm={() => {
            this.setState({showPublicAd: {...showPublicAd, show: false}});
          }}
          text={showPublicAd?.text}
          img={showPublicAd?.img}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {search: state.searchReducer, user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobs);
