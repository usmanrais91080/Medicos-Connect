import React, {Component} from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  HeaderLeft,
  Loader,
  UploadingModal,
  Icon,
} from '../../../../components';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import styles from './style';
import {connect} from 'react-redux';
import SocialBlockandUnblockFunction from './social.block&unblock.function';
import themeStyle from '../../../../assets/styles/theme.style';
import {BottomMenu} from '../SocialHome/social.home.component';
import Unblock from '../../../../assets/svg/unblock-icon.svg';

class SocialBlockandUnblock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      unblockingUser: false,
      data: [],
      unblockMenu: false,
      selectedItem: {},
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft
          color={themeStyle.COLOR_BLACK}
          navigation={this.props.navigation}
        />
      ),
    });
    this.getBlockedUsers();
  };

  getBlockedUsers = () => {
    SocialBlockandUnblockFunction.getBlockedUsers(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({data: res, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  handleUnblockUser = () => {
    this.setState({unblockingUser: true});
    SocialBlockandUnblockFunction.unblockUser(
      this.state.selectedItem._id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({unblockingUser: false});
        this.handleRefreshing();
      })
      .catch(err => {});
  };

  _renderItems = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            rounded
            source={{
              uri:
                item?.image != null
                  ? item?.image
                  : 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
            }}
            size={80}
          />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.blackText}>{item?.username}</Text>
            <Text style={styles.grayText}>
              {`Mutual friends ${item?.mutual}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({unblockMenu: true, selectedItem: item});
          }}>
          {this.state.btnLoading ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'small'} color={'white'} />
            </View>
          ) : (
            <Icon.Entypo name="dots-three-vertical" size={20} color={'black'} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  _renderSeperator = () => {
    return <View style={{height: 20}} />;
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  handleRefreshing = () => {
    this.isRefreshing(true);
    SocialBlockandUnblockFunction.getBlockedUsers(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({data: res}, () => this.isRefreshing(false));
      })
      .catch(err => {
        this.isRefreshing(false);
      });
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          //     <ActivityIndicator size={"small"} color={"white"} />
          // </View>
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Text style={styles.grayHeading}>
                Blocked{' '}
                <Text style={styles.blockCount}>
                  {this.state?.data?.length}
                </Text>
              </Text>
              <Text style={styles.blackHeading}>See All</Text>
            </View>
            <FlatList
              data={this.state.data}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
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
        <UploadingModal visible={this.state.unblockingUser} />
        <BottomMenu
          visible={this.state.unblockMenu}
          onClose={() => this.setState({unblockMenu: false})}
          data={[
            {
              icon: Unblock,
              name: 'Unblock User',
              onPress: () => {
                this.setState({unblockMenu: false});
                this.handleUnblockUser();
              },
            },
          ]}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(SocialBlockandUnblock);
