import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {Container, DeleteModal, Icon, Loader} from '../../components';
import Search from '../../assets/svg/search.svg';
import styles from './style';
import {Avatar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import themeStyle from '../../assets/styles/theme.style';
import {route, SCREEN_HEIGHT} from '../../lib/utils/constants';
import {connect} from 'react-redux';
import NotificationFunction from './notification.function';
import {searchActions} from '../../redux/actions/search';
import {authActions} from '../../redux/actions/auth';
import AnouncementModal from '../../components/Modals/AnouncementModal';
import {bottomTabActions} from '../../redux/actions/bottomTab';
import HeaderLeftIcon from '../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_WHITE,
  iconColor: themeStyle.COLOR_WHITE,
};

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        {
          name: 'All',
          selected: true,
          value: 'all',
        },
        {
          name: 'Profile',
          selected: false,
          value: 'profile',
        },
        {
          name: 'Classified',
          selected: false,
          value: 'classified',
        },
        {
          name: 'Connect',
          selected: false,
          value: 'connect',
        },
        {
          name: 'Social',
          selected: false,
          value: 'social',
        },
        {
          name: 'Career',
          selected: false,
          value: 'career',
        },
        {
          name: 'Education',
          selected: false,
          value: 'education',
        },
        {
          name: 'Daak',
          selected: false,
          value: 'daak',
        },
      ],
      conversation_list: [],
      anouncement_list: [],
      imgAnouncement: '',
      original_list: [],
      anouncementModal: false,
      msgAnouncement: '',
      loading: true,
      alertModal: false,
      msgToDisplay: '',
      reasonModal: false,
      msgReason: '',
      page: 1,
      offset: 10,
      loadingMore: false,
      isMoreNotifications: true,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.props.authActions.getUserProfile(
      {token: this.props.user.userData.token},
      '',
      '',
    );
    this.getNotification();
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
    });
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.authActions.getUserProfile(
        {token: this.props.user.userData.token},
        '',
        '',
      );
      this.getNotification();
    });
  };

  getNotification = () => {
    const {page, offset} = this.state;
    this.setState({loading: true});
    NotificationFunction.getNotification(
      this.props.user.userData.token,
      1,
      offset,
    )
      .then(res => {
        this.setState({conversation_list: res, original_list: res}, () => {
          this.props.searchActions.notificationAdd(false);
          this.getAnouncement();
        });
      })
      .catch(err => {
        this.setState({
          msgToDisplay: 'Oops…something went wrong!',
          alertModal: true,
        });
        this.setState({loading: false});
      });
  };

  getAnouncement = () => {
    NotificationFunction.getAnouncement(this.props.user.userData.token)
      .then(res => {
        this.setState({anouncement_list: res, loading: false});
      })
      .catch(err => {
        this.setState({
          msgToDisplay: 'Oops…something went wrong!',
          alertModal: true,
        });
      });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  headerLeft = () => {
    return (
      <HeaderLeftIcon
        onPress={() => this.props.navigation.replace(route.MAIN)}
        color={themeStyle.COLOR_BLACK}
      />
    );
  };

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle}></View>;
  };

  renderSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  _renderItems = item => {
    return (
      <>
        <View style={styles.contentContainer}>
          <View>
            <Avatar rounded source={{uri: item.profile_url}} size={70} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.textStyle}>{item.name}</Text>
          </View>
        </View>
      </>
    );
  };

  renderItems = (item, index) => {
    let difference = moment
      .duration(moment().diff(item?.created_at))
      .as('hours');
    const time =
      difference > 24
        ? moment(item?.created_at).format('DD MMM')
        : moment(item?.created_at).fromNow(true);
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.handleOnPressNotification(item, index);
          }}
          disabled={item.type == 'AppliedToClass'}
          style={styles.contentContainerConversation}>
          <View style={{flex: 0.15}}>
            <Avatar
              containerStyle={{borderColor: 'black', borderWidth: 0.5}}
              rounded
              source={{
                uri:
                  item?.image == ''
                    ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                    : item.image,
              }}
              size={50}
            />
          </View>
          <View style={styles.nameContainerConversation}>
            {item?.module_type ? (
              <View
                style={[
                  styles.itemContainer1,
                  {
                    backgroundColor:
                      item.module_type == 'education'
                        ? themeStyle.COLOR_EDUCATION
                        : item.module_type == 'classified'
                        ? themeStyle.COLOR_CLASSIFIED
                        : item.module_type == 'career'
                        ? themeStyle.CARRER_PRIMARY
                        : item.module_type == 'social'
                        ? themeStyle.YELLOW
                        : item.module_type == 'connect'
                        ? themeStyle.PINK
                        : '#FF6B6B',
                  },
                ]}>
                <Text
                  style={[
                    styles.itemText1,
                    {
                      color:
                        item.module_type == 'classified' ||
                        item.module_type == 'social'
                          ? themeStyle.COLOR_BLACK
                          : themeStyle.COLOR_WHITE,
                    },
                  ]}>
                  {item.module_type}
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.itemContainer1,
                  {
                    backgroundColor: themeStyle.COLOR_GREY,
                  },
                ]}>
                <Text
                  style={[
                    styles.itemText1,
                    {
                      color: themeStyle.COLOR_WHITE,
                    },
                  ]}>
                  Admin
                </Text>
              </View>
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: themeStyle.FONT_REGULAR,
                  fontSize: 14,
                  color:
                    item.type == 'MedicalLicenseApproved'
                      ? themeStyle.COLOR_GREEN
                      : themeStyle.COLOR_BLACK_LIGHT,
                }}>
                {item.message}
              </Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.listItemText}>{time}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#7E7E7E',
            borderBottomWidth: 0.5,
            height: 5,
            width: '80%',
            alignSelf: 'flex-end',
          }}
        />
      </>
    );
  };

  handleOnPressNotification = (item, index) => {
    NotificationFunction.readNotification(
      item?._id,
      this.props.user.userData.token,
    )
      .then(res => {
        let array = [...this.state.conversation_list];
        array[index].is_read = 'Yes';
        this.setState({conversation_list: array});
      })
      .catch(err => {
        this.setState({
          msgToDisplay: 'Snap! Please try again',
          alertModal: true,
        });
        this.setState({loading: false});
      });

    switch (item.type) {
      case 'MedicalLicenseApproved':
        this.props.navigation.navigate(route.HOME);
        break;
      case 'MedicalLicenseRejected':
        this.setState({reasonModal: true});
        break;
      case 'AnnouncementCreated':
        let temp = this.state.anouncement_list.filter(
          val => val._id == item?.announcementId,
        );
        this.setState(
          {imgAnouncement: temp[0]?.image, msgAnouncement: temp[0]?.message},
          () => this.setState({anouncementModal: true}),
        );
        break;
      case 'OwnerEnteredCME':
        this.props.navigation.navigate(route.EDUCATIONSTUDENTWORKSHOPDETAIL, {
          item: item?.CMEId,
          currency: this.props.user.userData?.currency?.symbol,
          cme: true,
          token: this.props.user.userData.token,
          notify: true,
        });
        break;
      case 'ChatMessage':
        this.props.navigation.navigate(route.CHAT);
        break;
      case 'FollowRequestSent':
        this.props.navigation.navigate(route.SOCIALFOLLOWER);
        break;
      case 'StartedFollowing':
        this.props.navigation.navigate(route.SOCIALFOLLOWER);
        break;
      case 'FollowRequestAccepted':
        this.props.navigation.navigate(route.SOCIALPROFILE, {data: item.user});
        break;
      case 'SocialPostTagged':
        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
          data: item.postId,
        });
        break;
      case 'PostLiked':
        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
          data: item.postId,
        });
        break;
      case 'PostCommented':
        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
          data: item.postId,
        });
        break;
      // new added
      case 'PostCommentLiked':
        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
          data: item.postId,
        });
        break;
      case 'PostCommentReplied':
        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
          data: item.postId,
        });
        break;
      case 'QNALiked':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'QNADisliked':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'QNACommented':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'QNACommentLiked':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'QNACommentDisliked':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'QNACommentReplied':
        this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
          id: item.qnaId,
          token: this.props.user.userData.token,
        });
        break;
      case 'AppliedToClass':
        this.props.navigation.navigate(route.EDUCATION, {
          screen: route.EDUCATIONSTUDENTCLASSDETAIL,
          params: {
            item: {_id: item.classId},
            token: this.props.user.userData.token,
            fromUpcomingClasses: true,
          },
        });
        break;
      case 'ProfileMatchedRequest':
        this.props.navigation.navigate(route.CONNECTMATCHEDPROFILE, {
          bff: this.props.route?.params?.bff,
        });
        break;
      case 'ProfileMatchedRequestAccepted':
        this.props.navigation.navigate(route.CONNECTMATCHEDHISTORY, {
          bff: this.props.route?.params?.bff,
        });
        break;
      case 'AppliedJob':
        this.props.navigation.navigate(route.CAREERJOBPOSTED);
        break;
      case 'MetaHealthReminder':
        item.module_type == 'MentalHealth_Journal'
          ? this.props.navigation.navigate(route.MENTALSELFLOVE)
          : this.props.navigation.navigate(route.MENTALEXERCISE);
        break;
      default:
        break;
    }
  };

  filterNotification = item => {
    const {original_list} = this.state;
    let filterArray = [];
    switch (item.value) {
      case 'profile':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'daak':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'classified':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'social':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'connect':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'games':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'education':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'career':
        filterArray = original_list.filter(v => v.module_type == item.value);
        this.setState({conversation_list: filterArray, loading: false});
        break;
      case 'all':
        this.setState({conversation_list: original_list, loading: false});
        break;
      default:
        break;
    }
  };

  alertConfirm = () => {
    if (this.props.user.userData.medical_license_reject_reason != '') {
      this.setState({reasonModal: false});
      this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
        prev_screen: undefined,
      });
    } else {
      this.setState({reasonModal: false});
    }
  };

  onScrollBeginDrag = () => {
    this.setState({stopFetchMore: false});
  };

  endReached = async () => {
    const {stopFetchMore, page, offset} = this.state;
    const {token} = this.props.user.userData;

    if (!stopFetchMore) {
      try {
        const res = await NotificationFunction.getNotification(
          token,
          page,
          offset,
        );
        this.setState(prevState => ({
          stopFetchMore: true,
          conversation_list: prevState.conversation_list.concat(res),
          page: res.length === 0 ? prevState.page : prevState.page + 1,
          isMoreNotifications: res.length === 0 ? false : true,
          loadingMore: false,
          refreshing: false,
        }));
      } catch (err) {
        this.setState({
          loadingMore: false,
          refreshing: false,
          stopFetchMore: true,
        });
      }
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent) && this.state.isMoreNotifications) {
      this.setState({page: this.state.page + 1, loadingMore: true}, () =>
        this.endReached(),
      );
    }
  };

  render() {
    const {loading, conversation_list, loadingMore} = this.state;
    return (
      <Container color={true}>
        <StatusBar backgroundColor={themeStyle.COLOR_WHITE} />
        {loading ? (
          <Loader />
        ) : (
          <View>
            <ScrollView
              style={{marginBottom: 110}}
              onScroll={this.onScroll}
              scrollEventThrottle={300}
              onScrollBeginDrag={this.onScrollBeginDrag}>
              {conversation_list.length > 0 ? (
                <View style={{paddingTop: '5%', marginBottom: 10}}>
                  <FlatList
                    data={this.state.conversation_list}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: SCREEN_HEIGHT * 0.2}}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item, index}) =>
                      this.renderItems(item, index)
                    }
                    keyExtractor={item => item._id}
                    ListFooterComponent={() =>
                      loadingMore ? (
                        <ActivityIndicator
                          color={themeStyle.COLOR_BLACK}
                          size={'large'}
                          style={{marginVertical: 20}}
                        />
                      ) : null
                    }
                  />
                </View>
              ) : (
                <View
                  style={{
                    paddingTop: '5%',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: themeStyle.FONT_REGULAR,
                      color: themeStyle.PRIMARY_TINT_COLOR,
                    }}>
                    No notifications found.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        <AnouncementModal
          visible={this.state.anouncementModal}
          confirm={() => {
            this.setState({anouncementModal: false});
          }}
          text={this.state.msgAnouncement}
          img={this.state.imgAnouncement}
        />
        <DeleteModal
          alert
          visible={this.state.reasonModal}
          confirm={() => {
            this.alertConfirm();
          }}
          text={
            this.props.user.userData.medical_license_reject_reason != ''
              ? this.props.user.userData.medical_license_reject_reason
              : 'Your profile is already verified'
          }
        />
        <DeleteModal
          alert
          visible={this.state.alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={this.state.msgToDisplay}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
