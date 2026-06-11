import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, HeaderLeft, Icon, Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import {ConnectModuleServices, ProfileServices} from '../../../../services';
import ConnectMenu from '../ConnectMenu';
import styles from './style';

class ConnectMatchedProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
      headerRight: () => this.headerRight(),
    });
    this.setState({loading: true});
    this.getFavouriteProfiles();
  };
  getFavouriteProfiles = () => {
    ConnectModuleServices.getFavouriteProfiles(this.props.user.userData.token)
      .then(response => {
        this.setState({data: response.data.data, loading: false});
      })
      .catch(error => {
        // console.log(error.response);
        this.setState({data: response.data.data, loading: false});
      });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Connect</Text>
        {/* <View style={styles.datingStyle}>
                    <Text style={styles.headingStyle}>{this.props.route?.params?.bff ? 'BFF' : 'Dating'}</Text>
                </View> */}
      </View>
    );
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft color navigation={this.props.navigation} />;
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.rowStyle}>
          <View style={{marginHorizontal: '2.5%'}}>
            <Avatar source={{uri: item.image}} rounded size={60} />
          </View>
          <HorizontalSpacer />
          <View>
            <Text style={styles.nameText}>{item.username}</Text>
            <Text style={styles.grayText}>{item.gender}</Text>
          </View>
        </View>
        {/* <View style={[styles.rowStyle, { marginTop: "5%" }]}>
                    {
                        item.interests.map((e, i) => {
                            return (
                                <Text style={styles.grayText}>{e}{i == item.interests.length - 1 ? '' : ","} </Text>
                            )
                        })
                    }
                </View> */}
        {/* <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.setState({ data: this.state.data.filter((_, i) => i != index) }, () => this.handleRejectMatchRequest(item))} style={styles.rejectButton}>
                        <Text style={styles.grayText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAcceptMatchRequest(item)} style={styles.chatButton} >
                        <Text style={styles.whiteText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View> */}
      </View>
    );
  };

  render() {
    const {loading, data} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Favourites</Text>
              </View>

              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() =>
                      this.setState({refreshing: true}, () =>
                        this.componentDidMount(),
                      )
                    }
                  />
                }
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>
                      No match profile found!
                    </Text>
                  </View>
                }
                contentContainerStyle={{
                  paddingTop: '5%',
                  paddingHorizontal: '5%',
                }}
                data={data}
                ItemSeparatorComponent={VerticalSpacer}
                renderItem={this._renderItem}
              />
            </ScrollView>
          </View>
        )}

        <ConnectMenu
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTEDITPROFILE1ST),
            )
          }
          onDeactivateModule={() => {
            const data = this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Connect';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0].module._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                // await this.props.authActions.getUserModules(this.props.user.userData.token)
                this.props.navigation.replace(route.AUTH_LOADING);
              })
              .catch(err => {
                // console.log(err);
              });
          }}
          data={this.props.route?.params?.bff}
          visible={this.state.visible}
          boost={this.state.boost}
          onDate={() => {
            this.props.navigation.setParams({
              bff: false,
            });
            this.changeProfileMode('Dating');
          }}
          onFavouriteProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTFAVOURITEPROFILE, {
                bff: this.props.route?.params?.bff,
              }),
            )
          }
          onBoost={() =>
            this.setState({boost: true}, () => this.componentDidMount())
          }
          onBFF={() => {
            this.props.navigation.setParams({
              bff: true,
            });
            this.changeProfileMode('BFF');
          }}
          onMatchedProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTMATCHEDPROFILE, {
                bff: this.props.route?.params?.bff,
              }),
            )
          }
          onClose={() => this.setState({visible: false})}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    connectProfessions: state.connectReducer?.connectProfessions || {},
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectMatchedProfiles);
