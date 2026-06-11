import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Container, Icon, Loader} from '../../../../components';
import Block from '../../../../assets/svg/report.svg';
import Unfollow from '../../../../assets/svg/unfollow.svg';

import {HorizontalSpacer} from '../../../../lib/utils/global';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import {SocialServices} from '../../../../services';
import {
  BottomMenu,
  BlockUserConfirmation,
} from '../SocialHome/social.home.component';

class SocialFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      data: [],
      blockMenu: false,
      postItem: {},
      showBlockUserModal: false,
      showRemoveUserModal: false,
      showAllFollowers: false,
    };
  }

  componentDidMount = () => {
    this.getFollowings();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.setHeaderTitle('Following');
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused && this.props.isFocused) {
      this.props.setHeaderTitle('Following');
    }
  }

  getFollowings = () => {
    SocialServices.getFollowings(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data, loading: false});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  handleUnFollowUser = item => {
    SocialServices.unFollowUser(item._id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          showRemoveUserModal: false,
        });
        this.getFollowings();
      })
      .catch(err => {
        // console.log('unFollowUser api error ====>', err);
      });
  };

  handleBlockUser = item => {
    SocialServices.blockUser(item._id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          showBlockUserModal: false,
        });
        this.handleRefreshing();
      })
      .catch(err => {
        // console.log(err)
      });
  };

  _renderItems = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(route.SOCIALPROFILE, {
              data: item._id,
              following: true,
            })
          }
          style={styles.rowStyle}>
          <Avatar rounded source={{uri: item.image}} size={80} />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.blackText}>{item.username}</Text>
            <Text style={styles.grayText}>
              {item.mutualFriends} Mutual friend{item.mutualFriends > 1 && 's'}
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

  _renderSeperator = () => {
    return <View style={{height: 20}} />;
  };

  handleRefreshing = () => {
    this.setState({refreshing: true});
    SocialServices.getFollowersAndRequests(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data.followers, refreshing: false});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  render() {
    const {
      blockMenu,
      loading,
      showBlockUserModal,
      postItem,
      data,
      refreshing,
      showRemoveUserModal,
      showAllFollowers,
    } = this.state;
    return (
      <>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <Text style={styles.grayHeading}>Following {data.length}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({showAllFollowers: !showAllFollowers})
                  }>
                  <Text style={styles.blackHeading}>
                    {showAllFollowers ? 'Hide' : 'See All'}
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={showAllFollowers ? data : data.slice(0, 2)}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      this.handleRefreshing();
                    }}
                  />
                }
                contentContainerStyle={{paddingBottom: '30%', paddingTop: '5%'}}
                renderItem={this._renderItems}
                ItemSeparatorComponent={this._renderSeperator}
              />
            </View>
          )}
        </Container>
        <BlockUserConfirmation
          visible={showBlockUserModal}
          isBlock={true}
          onAccept={() => this.handleBlockUser(postItem)}
          onClose={() => this.setState({showBlockUserModal: false})}
          username={postItem.username}
        />
        <BlockUserConfirmation
          visible={showRemoveUserModal}
          isBlock={false}
          onAccept={() => this.handleUnFollowUser(postItem)}
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
                  this.setState({showBlockUserModal: true});
                }, 1000);
              },
            },
            {
              icon: Unfollow,
              name: 'Remove User',
              onPress: () => {
                this.setState({blockMenu: false});
                setTimeout(() => {
                  this.setState({showRemoveUserModal: true});
                }, 1000);
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
export default connect(mapStateToProps)(SocialFollowing);
