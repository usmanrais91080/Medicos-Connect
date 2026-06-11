import moment from 'moment';
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
import {Container, HeaderLeft, Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import ConnectMatchProfileFunction from './connect.match.profile.functions';
import styles from './style';

class ConnectMatchedHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount = () => {
    this.getMatchProfiles();
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Connect</Text>
        {/* <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>
            {this.props.route?.params?.bff ? 'BFF' : 'Dating'}
          </Text>
        </View> */}
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft navigation={this.props.navigation} />;
  };

  getMatchProfiles = () => {
    ConnectMatchProfileFunction.getMatchedProfiles(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({data: res, loading: false, refreshing: false});
      })
      .catch(err => {
        alert(
          'Error!!', // This is a title
          `${err}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  delete = index => {};

  _renderItem = ({item, index}) => {
    console.log('itemdafsdfds', item);
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.rowStyle}>
          <View style={{marginHorizontal: '2.5%'}}>
            <Avatar
              source={{
                uri: item?.connect_image0
                  ? item?.connect_image0
                  : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
              }}
              rounded
              size={60}
            />
          </View>
          <HorizontalSpacer />
          <View>
            <Text style={styles.nameText}>{item.username}</Text>
            <Text style={styles.grayText}>
              {moment(item.accepted_date).format('DD MMMM')} at{' '}
              {moment(item.accepted_date).format('h:mm a')}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(route.CONNECTUSERPROFILE, {
                data: item._id,
              })
            }
            style={styles.rejectButton}
          >
            <Text style={styles.grayText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleAcceptMatchRequest(item)}
            style={styles.chatButton}
          >
            <Text style={styles.whiteText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleAcceptMatchRequest = data => {
    this.props.navigation.navigate(route.CHATSCREEN, {
      data: {
        id: `${data._id}`,
        email: '',
        name: data.username,
        seen: false,
        profile_url: data.image[0],
        last_message: '',
        last_message_time: moment().format('YYYY-MM-DD HH:mm'),
        type: 'Connect',
      },
    });
    // ConnectMatchProfileFunction.acceptMatchedProfileRequest(
    //   data._id,
    //   this.props.user.userData.token,
    // )
    //   .then(res => {
    //     console.log(res);
    //     this.props.navigation.navigate(route.CHATSCREEN, {
    //       data: {
    //         id: `${data._id}`,
    //         email: '',
    //         name: data.username,
    //         seen: false,
    //         profile_url: data.image[0],
    //         last_message: 'Lorem ipsum dolor sit amet, consetetur',
    //         last_message_time: moment().format('YYYY-MM-DD HH:mm'),
    //         type: 'Connect',
    //       },
    //     });
    //   })
    //   .catch(err => {
    //     this.props.navigation.navigate(route.CHATSCREEN, {
    //       data: {
    //         id: `${data._id}`,
    //         email: '',
    //         name: data.username,
    //         seen: false,
    //         profile_url: data.image[0],
    //         last_message: 'Lorem ipsum dolor sit amet, consetetur',
    //         last_message_time: moment().format('YYYY-MM-DD HH:mm'),
    //         type: 'Connect',
    //       },
    //     });
    //   });
  };

  handleRejectMatchRequest = data => {
    ConnectMatchProfileFunction.rejectMatchedProfileRequest(
      data._id,
      this.props.user.userData.token,
    )
      .then(res => {
        // this.props.navigation.navigate(route.CHATSCREEN, {
        //     data: {
        //         name: 'John Doe',
        //         seen: false,
        //         profile_url: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
        //         last_message: 'Lorem ipsum dolor sit amet, consetetur',
        //         last_message_time: '2021-08-12 17:00:00',
        //         type: 'Connect'
        //     }
        // })
      })
      .catch(err => null);
  };

  render() {
    const {data, loading} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '30%'}}
            >
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Matched history</Text>
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
                    }}
                  >
                    <Text style={{fontWeight: 'bold'}}>
                      No match profile history found!
                    </Text>
                  </View>
                }
                contentContainerStyle={{
                  padding: '5%',
                }}
                data={data}
                ItemSeparatorComponent={VerticalSpacer}
                renderItem={this._renderItem}
              />
            </ScrollView>
          </View>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    connectProfessions: state.connectReducer?.connectProfessions || {},
    user: state.authReducer || {},
  };
};
export default connect(mapStateToProps)(ConnectMatchedHistory);
