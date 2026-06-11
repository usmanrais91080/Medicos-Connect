import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Container, Icon, Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import {connect} from 'react-redux';
import JobsPostedItem from './career.jobsPosted.componet';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';

class CareerJobPosted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      visible: false,
      postedJobs: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getPostedJobs();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate(route.CAREERSEARCH)}>
          <Search />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons name="menu-sharp" size={30} color={'#FFFF'} />
        </TouchableOpacity>
      </View>
    );
  };

  getPostedJobs = () => {
    CareerServices.getCreatedJobs(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            postedJobs: res.data.data,
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => {
        this.setState({postedJobs: [], loading: false, refreshing: false});
      });
  };

  closeJob = id => {
    CareerServices.closeJob(id, this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.getPostedJobs();
        }
      })
      .catch(err => {});
  };

  _renderBestMatchItem = (item, index) => {
    return item.status == 'Inactive' ? null : (
      <>
        <JobsPostedItem
          close={id => this.closeJob(id)}
          // img={this.props?.user?.userData?.image}
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
          img={this.props.user.userData.career_image}
        />
      </>
    );
  };

  render() {
    const {activeTab, postedJobs, loading} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {postedJobs.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  data={postedJobs}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <View style={styles.container2}>
                  <Text style={styles.noJobsText}>
                    You haven’t created any jobs yet. Get started and create
                    your first job today!
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
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
              .catch(err => {});
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

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobPosted);
