import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Container, Icon, Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import {connect} from 'react-redux';
import JobsAppliedItem from './career.jobsApplied.componet';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';

class CareerJobApplied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      visible: false,
      appliedJobs: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getAppliedJobs();
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

  render() {
    const {appliedJobs, loading} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Text style={styles.titleText}>Applied Jobs</Text>
              {appliedJobs.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  data={appliedJobs}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <View style={styles.container}>
                  <Text style={styles.noAppliedText}>
                    No jobs applied yet. Find the role that matches your passion
                    and apply today!
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
  return {search: state.searchReducer, user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobApplied);
