import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Container, Icon, Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import {connect} from 'react-redux';
import JobsFavItem from './career.jobsFav.componet';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import CareerDeleteModal from '../../../../components/Modals/CareerDeleteModal';

class CareerJobFav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      visible: false,
      favJobs: [],
      loading: true,
      deleteModal: false,
      tempId: null,
    };
  }

  componentDidMount = () => {
    this.getFavJobs();
    this.props.navigation.addListener('focus', () => {
      this.getFavJobs();
    });
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerTitle: 'Career',
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons name="menu-sharp" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    );
  };

  _renderBestMatchItem = (item, index) => {
    let applied = item.is_applied;
    let dataToShow = item.posted_from == 'Company' ? item.company : item.user;

    return (
      <>
        <JobsFavItem
          item={item}
          navigation={this.props.navigation}
          applied={applied}
          token={this.props.user.userData.token}
          dataToShow={dataToShow}
          favorite
          removeFavorite={() =>
            this.setState({deleteModal: true, tempId: item._id})
          }
        />
      </>
    );
  };

  getFavJobs = () => {
    CareerServices.getFavJobs(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            favJobs: res.data.data,
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => {
        // console.log('CareerServices err',err);
        this.setState({loading: false, refreshing: false});
      });
  };

  jobFav = () => {
    CareerServices.jobAddRemoveFav(
      this.state.tempId,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({deleteModal: false, tempId: null});
        this.getFavJobs();
      })
      .catch(err => {});
  };

  render() {
    const {activeTab, favJobs, loading} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Text style={styles.titleText}>Saved Jobs</Text>
              {favJobs.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  data={favJobs}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <View style={styles.container}>
                  <Text style={styles.noAppliedText}>
                    Looks like you haven’t saved any jobs yet. Keep searching,
                    the right one is just around the corner!
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
        <CareerDeleteModal
          visible={this.state.deleteModal}
          cancel={() => this.setState({deleteModal: false, tempId: null})}
          removeJob={() => this.jobFav()}
        />

        <CareerMenu
          visible={this.state.visible}
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
          onClose={() => this.setState({visible: false})}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    search: state.searchReducer,
    user: state.authReducer || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobFav);
