import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Container, Icon, Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import {connect} from 'react-redux';
import JobsApplicantItem from './career.jobsApplicant.componet';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';

class CareerViewApplicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      visible: false,
      postedJobs: [],
      loading: true,
      bowserMode: [
        {
          title: 'Community',
          date: new Date(),
          jobTitle: 'Creative Designer',
          salary: 'PKR 500,000',
          description: `Lorem Ipsum\nLorem Ipsum`,
          experiience: '10 Years',
        },
        {
          title: 'Community',
          date: new Date(),
          jobTitle: 'Creative Designer',
          salary: 'PKR 500,000',
          description: `Lorem Ipsum\nLorem Ipsum`,
          experiience: '10 Years',
        },
        {
          title: 'Community',
          date: new Date(),
          jobTitle: 'Creative Designer',
          salary: 'PKR 500,000',
          description: `Lorem Ipsum\nLorem Ipsum`,
          experiience: '10 Years',
        },
        {
          title: 'Community',
          date: new Date(),
          jobTitle: 'Creative Designer',
          salary: 'PKR 500,000',
          description: `Lorem Ipsum\nLorem Ipsum`,
          experiience: '10 Years',
        },
        {
          title: 'Community',
          date: new Date(),
          jobTitle: 'Creative Designer',
          salary: 'PKR 500,000',
          description: `Lorem Ipsum\nLorem Ipsum`,
          experiience: '10 Years',
        },
      ],
      applicants: [],
      jobID: this.props?.route?.params?.jobId,
      token: this.props?.route?.params?.token,
    };
  }

  componentDidMount = () => {
    this.getApplicants();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  getApplicants = () => {
    const {jobID, token} = this.state;
    CareerServices.getJobApplicants(jobID, token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            applicants: res.data.data,
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => {
        this.setState({applicants: [], loading: false, refreshing: false});
      });
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <JobsApplicantItem
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
        />
      </>
    );
  };

  render() {
    const {loading, applicants} = this.state;
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
              {applicants.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  data={applicants}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <Text>No applicants found</Text>
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
                //  console.log(err);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareerViewApplicant);
