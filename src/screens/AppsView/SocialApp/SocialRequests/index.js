import React, {Component} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Block from '../../../../assets/svg/report.svg';
import Unfollow from '../../../../assets/svg/unfollow.svg';
import {connect} from 'react-redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Icon, Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {SocialServices} from '../../../../services';
import {
  BlockUserConfirmation,
  BottomMenu,
} from '../SocialHome/social.home.component';
import SocialRequestFunction from './social.request.function';
import styles from './style';

class SocialRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      disable: false,
      data: [],
      data1: [],
      blockMenu: false,
      postItem: {},
      showAllFollowers: false,
      showAllFollowRequests: false,
      showRemoveUserModal: false,
      showBlockUserModal: false,
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.setHeaderTitle('Followers');
    });
    SocialRequestFunction.getFollowersAndRequests(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          data: res.follow_requests,
          data1: res.followers,
          loading: false,
        });
      })
      .catch(err => {});
  };

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
    }
  }

  _renderItems = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(route.SOCIALPROFILE, {
              data: item._id,
              itemId: item._id,
            })
          }
          style={styles.rowStyle}>
          <Avatar rounded source={{uri: item.image}} size={80} />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.blackText}>{item.username}</Text>
            <Text style={styles.grayText}>
              {item.mutualFriends} Mutual friends
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({blockMenu: true, postItem: item})}>
          <Icon.Entypo name="dots-three-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    );
  };

  handleUnFollowUser = id => {
    SocialServices.unFollowUser(id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          showRemoveUserModal: false,
        });
        this.handleRefreshing();
      })
      .catch(err => {
        // console.log('Handle unfollow user', err)
      });
  };

  handleBlockUser = id => {
    SocialServices.blockUser(id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          showBlockUserModal: false,
        });
        this.handleRefreshing();
      })
      .catch(err => null);
  };

  handleAcceptRequest = item => {
    const {data, data1} = this.state;
    const requestlist = [...data];
    let newRequestlist = [];
    requestlist.map(follower => {
      if (follower._id !== item._id) newRequestlist = [...newRequestlist, item];
    });
    const followerToAdd = requestlist.filter(
      follower => follower._id === item._id,
    );
    this.setState({data: newRequestlist, data1: [...data1, ...followerToAdd]});

    SocialRequestFunction.acceptFollowRequest(
      item.user,
      this.props.user.userData.token,
    )
      .then(res => {
        this.handleRefreshing();
      })
      .catch(err => {});
  };

  handleRejectRequest = item => {
    const {data, data1} = this.state;
    const requestlist = [...data];
    let newRequestlist = [];
    requestlist.map(follower => {
      if (follower._id !== item._id)
        newRequestlist = [...newRequestlist, follower];
    });
    this.setState({data: newRequestlist});

    SocialRequestFunction.rejectFollowRequest(
      item._id,
      this.props.user.userData.token,
    )
      .then(() => {
        // this.handleRefreshing();
      })
      .catch(err => null);
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  handleRefreshing = () => {
    // this.isRefreshing(true)
    SocialRequestFunction.refreshingSocialRequests(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          data: res.follow_requests,
          data1: res.followers,
          refreshing: false,
          disable: false,
        });
      })
      .catch(err => null);
  };

  blockUser = item => {
    SocialServices.blockUser(item._id, this.props.user.userData.token)
      .then(res => {
        this.handleRefreshing();
      })
      .catch(err => null);
  };

  _renderRequestItems = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            onPress={() => {
              this.props.navigation.navigate(route.SOCIALPROFILE, {
                data: item?.user,
                itemId: item._id,
              });
            }}
            rounded
            source={{uri: item?.image}}
            size={80}
          />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.blackText}>{item.username}</Text>
            <Text style={styles.grayText}>
              {item.mutualFriends} Mutual friend{item.mutualFriends > 1 && 's'}
            </Text>
            <View style={styles.rowContainer1}>
              {/* onPress={() => this.props.navigation.navigate(route.SOCIALPROFILE, { recievedRequest: true })} */}
              <TouchableOpacity
                onPress={() => this.handleRejectRequest(item)}
                style={styles.deleteBtn}>
                <Text style={styles.graybtnText}>Delete</Text>
              </TouchableOpacity>
              {HorizontalSpacer()}
              <TouchableOpacity
                disabled={this.state.disable}
                onPress={() =>
                  this.setState({disable: true}, () =>
                    this.handleAcceptRequest(item),
                  )
                }
                style={[
                  styles.acceptButton,
                  {backgroundColor: themeStyle.CYAN_BLUE},
                ]}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderSeperator = () => {
    return <View style={{height: 20}} />;
  };

  render() {
    const {
      loading,
      refreshing,
      blockMenu,
      data,
      data1,
      postItem,
      showAllFollowRequests,
      showAllFollowers,
      showBlockUserModal,
      showRemoveUserModal,
    } = this.state;
    return (
      <>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.container}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      this.handleRefreshing();
                    }}
                  />
                }
                contentContainerStyle={{
                  paddingBottom: '30%',
                  paddingTop: '5%',
                }}>
                <View style={styles.rowContainer}>
                  <Text style={styles.grayHeading}>
                    Follow Request{' '}
                    <Text style={styles.bold}>{data.length}</Text>
                  </Text>
                  <Text
                    onPress={() => {
                      this.setState({
                        showAllFollowRequests: !showAllFollowRequests,
                      });
                    }}
                    style={styles.blackHeading}>
                    {showAllFollowRequests ? 'Hide' : 'See All'}
                  </Text>
                </View>
                <FlatList
                  data={showAllFollowRequests ? data : data.slice(0, 2)}
                  contentContainerStyle={{paddingTop: '5%'}}
                  renderItem={this._renderRequestItems}
                  ItemSeparatorComponent={this._renderSeperator}
                />
                <View style={styles.rowContainer}>
                  <Text style={styles.grayHeading}>
                    Followers <Text style={styles.bold}>{data1.length}</Text>
                  </Text>
                  <Text
                    onPress={() => {
                      this.setState({
                        showAllFollowers: !showAllFollowers,
                      });
                    }}
                    style={styles.blackHeading}>
                    {showAllFollowers ? 'Hide' : 'See All'}
                  </Text>
                </View>
                <FlatList
                  data={showAllFollowers ? data1 : data1.slice(0, 2)}
                  contentContainerStyle={{paddingTop: '5%'}}
                  renderItem={this._renderItems}
                  ItemSeparatorComponent={this._renderSeperator}
                />
              </ScrollView>
            </View>
          )}
        </Container>
        <BlockUserConfirmation
          visible={showBlockUserModal}
          isBlock={true}
          onAccept={() => this.handleBlockUser(postItem._id)}
          onClose={() => this.setState({showBlockUserModal: false})}
          username={postItem.username}
        />
        <BlockUserConfirmation
          visible={showRemoveUserModal}
          isBlock={false}
          onAccept={() => this.handleUnFollowUser(postItem._id)}
          onClose={() => this.setState({showRemoveUserModal: false})}
          username={postItem.username}
        />
        <BottomMenu
          visible={blockMenu}
          onClose={() => this.setState({blockMenu: false})}
          data={[
            {
              icon: Block,
              name: 'Block User',
              onPress: () => {
                this.setState({blockMenu: false});
                setTimeout(() => {
                  this.setState({
                    showBlockUserModal: true,
                  });
                }, 500);
              },
            },
            {
              icon: Unfollow,
              name: 'Remove User',
              onPress: () => {
                this.setState({blockMenu: false});
                setTimeout(() => {
                  this.setState({
                    showRemoveUserModal: true,
                  });
                }, 500);
              },
            },
          ]}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(SocialRequests);
