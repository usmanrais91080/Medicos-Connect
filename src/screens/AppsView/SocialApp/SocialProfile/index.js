import MasonryList from '@react-native-seoul/masonry-list';
import {Viewport} from '@skele/components';
import moment from 'moment';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EditPost from '../../../../assets/svg/pencil.svg';
import EditPhoto from '../../../../assets/svg/editphoto.svg';
import DeletePost from '../../../../assets/svg/delete1.svg';
import {Avatar} from 'react-native-elements';
import DropDown from '../../../../assets/svg/dropDown.svg';
import Share from '../../../../assets/svg/share-icon.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import Message from '../../../../assets/svg/chat-icon-social.svg';
import Comment from '../../../../assets/svg/comment.svg';
import Block from '../../../../assets/svg/block-new.svg';
import Like from '../../../../assets/svg/like.svg';
import LikeDisabled from '../../../../assets/svg/like-disabled.svg';
import Report from '../../../../assets/svg/report';
import Save from '../../../../assets/svg/save-new.svg';
import Unfollow from '../../../../assets/svg/unfollow.svg';
import Repost from '../../../../assets/svg/repost.svg';
import Link from '../../../../assets/svg/link.svg';
import {
  Container,
  CustomDropDownModal,
  DeleteModal,
  Icon,
  Loader,
  ReportModal,
  UploadingModal,
} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {
  HorizontalSpacer,
  VerticalSpacer,
  moneyFormat,
} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import SearchMenu from '../SocialMenu';
import {HeaderRight} from './social.profile.component';
import SocialProfileFunction from './social.profile.function';
import styles from './style';
import Hyperlink from 'react-native-hyperlink';
import {SocialServices, WalletServices} from '../../../../services';
import {AmpuleModal, BottomMenu} from '../SocialHome/social.home.component';
import ReactNativeModal from 'react-native-modal';
import Ampules3 from '../../../../assets/svg/ampoules-3.svg';
import Ampules4 from '../../../../assets/svg/ampoules-4.svg';
import Ampules5 from '../../../../assets/svg/ampoules-5.svg';
import HyperLink from 'react-native-hyperlink';
import SocialRequestFunction from '../SocialRequests/social.request.function';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var ding = new Sound('../../../../assets/sounds/like.mp3', error => {
  if (error) {
    // console.log('failed to load the sound', error);
    return;
  }
});
class SocialProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      disable: false,
      avatar: '',
      activeTab: 0,
      alertModal: false,
      msgToDisplay: '',
      errMsg: '',
      loading: true,
      refreshing: false,
      paused: true,
      otherProfile: true,
      userProfile: {},
      tempUserList: [],
      tagSearch: '',
      savingPost: false,
      giftModal: false,
      wallet_id: '',
      userModal: false,
      sharePostData: null,
      errModal: false,
      postList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      postMenu1: false,
      images: [
        {
          uri: 'https://wallpapercave.com/wp/wp3396910.jpg',
          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          url: 'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          uri: 'https://wallpapercave.com/wp/wp3396910.jpg',

          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          uri: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',

          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          url: 'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          uri: 'https://wallpapercave.com/wp/wp3396910.jpg',

          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          uri: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',

          dimensions: {
            width: 136,
            height: 136,
          },
        },
        {
          uri: 'https://wallpapercave.com/wp/wp3396910.jpg',
          dimensions: {
            width: 136,
            height: 136,
          },
        },
      ],
      likedUsers: [],
      showLikedUsers: false,
      tempLikedUsers: [],
      searchingData: false,
      switchFunc: false,
      likeId: '',
      usersModal: false,
      tagSearch: '',
      userList: [],
      giftArray: [
        {
          icon: Ampules3,
          name: '500',
          selected: false,
        },
        {
          icon: Ampules4,
          name: '1000',
          selected: false,
        },
        {
          icon: Ampules5,
          name: '1500',
          selected: false,
        },
      ],
      ampules: false,
      alertModal: false,
      msgToDisplay: '',
      reportReason: '',
      reportModal: false,
      blockUser: {},
      newMsgModal: false,
      newMsg: '',
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          onPress={() => this.setState({visible: true})}
          // showQr={this.props?.route?.params?.data ? false : true}
          onQR={() =>
            this.props.navigation.navigate(route.GENERATEQR, {
              _id: this.props?.route?.params?.data
                ? this.props?.route?.params?.data
                : this.props.user.userData._id,
              type: 'Social',
            })
          }
        />
      ),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.navigate(route.HOME, {
              screen: route.HOMESCREEN,
            })
          }
          color={themeStyle.COLOR_BLACK}
        />
      ),
    });
    this.getUserSocialProfile();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getUserSocialProfile();
    });
  };

  getUserSocialProfile = () => {
    if (
      this.props?.route?.params?.data &&
      this.state.otherProfile &&
      this.props.user.userData._id != this.props?.route?.params?.data
    ) {
      SocialProfileFunction.getUserSocialProfile(
        this.props?.route?.params?.data,
        this.props.user.userData.token,
      )
        .then(response => {
          response
            ? this.setState({userProfile: response, loading: false})
            : this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false, userProfile: {}});
          if (err.code == 400) {
            this.setState({errModal: true, errMsg: `${err.message}`});
          }
        });
    } else {
      SocialProfileFunction.getMySocialProfile(this.props.user.userData.token)
        .then(response => {
          response
            ? this.setState({userProfile: response, loading: false})
            : this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  };

  getUserSocialProfile2 = () => {
    if (this.props.user.userData._id != this.state.likeId) {
      SocialProfileFunction.getUserSocialProfile(
        this.state.likeId,
        this.props.user.userData.token,
      )
        .then(response => {
          response
            ? this.setState({userProfile: response, loading: false})
            : this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false, userProfile: {}});
          if (err.code == 400) {
            this.setState({errModal: true, errMsg: `${err.message}`});
          }
        });
    } else {
      SocialProfileFunction.getMySocialProfile(this.props.user.userData.token)
        .then(response => {
          response
            ? this.setState({userProfile: response, loading: false})
            : this.setState({loading: false});
        })
        .catch(err => {
          this.setState({refreshing: false});
        });
    }
  };
  seacrhTagFriendsFunction = text => {
    const newData = this.state.userList.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData?.length != 0) {
      this.setState({tempUserList: newData});
    } else {
      this.setState({searchingData: false});
    }
  };

  chooseFile = () => {
    this.props.navigation.navigate(route.SOCIALSETTINGS1st, {
      prev_screen: 'Profile',
    });
  };

  addMoreImages(newImages) {
    this.setState({
      images: this.state.images.concat(newImages),
    });
  }

  handleAcceptRequest = () => {
    this.setState({disable: true});
    SocialProfileFunction.acceptFollowRequest(
      this.state.userProfile._id,
      this.props.user.userData.token,
    )
      .then(() => {
        this.handleRefreshing();
      })
      .catch(err => {
        this.setState({disable: false});
      });
  };

  handleSendRequest = () => {
    let tempData = this.state.userProfile;
    this.setState({disable: true});
    tempData.request_status = 'Cancel Request';
    this.setState({disable: false, userProfile: tempData});
    SocialProfileFunction.sendFollowRequest(
      this.state.userProfile._id,
      this.props.user.userData.token,
    )
      .then(() => {})
      .catch(err => {
        this.setState({disable: false});
      });
  };
  handleSendRequestCompany = () => {
    let tempData = this.state.userProfile;
    this.setState({disable: true});
    tempData.request_status = 'Cancel Request';
    this.setState({disable: false, userProfile: tempData});

    SocialProfileFunction.sendFollowRequestCompany(
      this.state.userProfile._id,
      this.props.user.userData.token,
    )
      .then(res => {
        // this.handleRefreshing();
      })
      .catch(err => {
        this.setState({disable: false});
      });
  };

  handleFollowBackRequest = () => {
    let tempData = this.state.userProfile;
    this.setState({disable: true});
    tempData.request_status = 'Following';
    this.setState({disable: false, userProfile: tempData});

    SocialProfileFunction.followBackRequest(
      this.state.userProfile._id,
      this.props.user.userData.token,
    )
      .then(() => {
        this.handleRefreshing();
      })
      .catch(err => {});
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  handleRefreshing = () => {
    this.isRefreshing(true);
    this.state.switchFunc
      ? this.getUserSocialProfile2()
      : this.getUserSocialProfile();
    this.isRefreshing(false);
    this.setState({disable: false});
  };

  handleCancelFollowRequest = () => {
    this.setState({disable: false});

    let tempData = this.state.userProfile;

    tempData.request_status = 'Send Follow Request';

    this.setState({disable: false, userProfile: tempData});

    SocialProfileFunction.cancelFollowRequest(
      this.state.userProfile._id,
      this.props.user.userData.token,
    )
      .then(() => {
        // this.handleRefreshing();
      })
      .catch(err => {});
  };

  handleSavePost = item => {
    this.setState({savingPost: true});
    SocialServices.savePost(item._id, this.props.user.userData.token)
      .then(() => {
        this.setState({savingPost: false});
      })
      .catch(err => {
        this.setState({savingPost: false});
      });
  };

  handleDeletePost = postId => {
    SocialServices.deletePost(postId, this.props.user.userData.token)
      .then(res => {
        this.setState({msgToDisplay: `${res.data.message}`, alertModal: true});
      })
      .catch(err => {
        this.handleRefreshing();
        // console.log('err : ', err);
        this.setState({msgToDisplay: `${err.message}`, alertModal: true});
      });
  };

  handleUnFollowUser = item => {
    SocialServices.unFollowUser(item, this.props.user.userData.token)
      .then(res => {
        this.handleRefreshing();
      })
      .catch(err => {
        //  console.log('unFollowUser api error ====>', err)
      });
  };

  handleAddComment = (id, value) => {
    let data = {
      post_id: id,
      text: value,
    };
    SocialProfileFunction.commentOnPost(data, this.props.user.userData.token)
      .then(res => {
        alert(
          'Success!!', // This is a title
          `${res}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
        this.refreshingSavedPost();
      })
      .catch(err => {
        alert(
          'Error!!', // This is a title
          `${err.message}`, // This is a alert message
          {
            type: 'bottomsheet',
          },
        );
      });
  };

  handleLikeFunction = (item, index) => {
    const {userProfile} = this.state;
    let tempLike = {
      _id: this.props?.user?.userData?._id,
      username: this.props?.user?.userData?.social_username,
      image: this.props?.user?.userData?.social_image,
    };
    if (item?.likes?.length > 0) {
      let likeFound = item?.likes?.filter(
        val => val?._id === this.props?.user?.userData?._id,
      );
      if (likeFound?.length > 0) {
        let userPosts = userProfile;
        let newLike = userPosts.posts[index].likes.filter(val => {
          if (val?._id != this.props?.user?.userData?._id) return val;
        });
        userPosts.posts[index].likes = newLike;
        this.setState({userProfile: userPosts});
      } else {
        let userPosts = userProfile;
        userPosts.posts[index].likes.push(tempLike);
        this.setState({userProfile: userPosts});
        ding.play();
      }
    } else {
      let userPosts = userProfile;
      userPosts.posts[index].likes.push(tempLike);
      this.setState({userProfile: userPosts});
      ding.play();
    }

    SocialProfileFunction.likeOrUnlikePost(
      item._id,
      this.props.user.userData.token,
    )
      .then(res => {})
      .catch(err => {});
  };

  seacrhLikeFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.likedUsers.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData?.length != 0) {
      this.setState({tempLikedUsers: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  handleReportPost = postId => {
    let postData = {
      post_id: postId,
      description: this.state.reportReason,
      type: 'Post',
    };
    SocialHomeFunction.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        setTimeout(() => {
          this.setState({msgToDisplay: `${res}`, alertModal: true});
          this.handleRefreshing();
        }, 500);
      })
      .catch(err => {
        this.setState({msgToDisplay: `${err.message}`, alertModal: true});
      });
  };

  handlePollVoting = () => {
    this.setState({
      newMsgModal: true,
      newMsg: 'You cannot vote on your own poll',
    });
    return;
  };

  showNewUserAlertFunction = () => {
    this.setState({
      alertModal: true,
      msgToDisplay:
        'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.',
    });
  };

  handleRejectRequest = () => {
    this.setState({disable: false});

    let tempData = this.state.userProfile;

    tempData.request_status = 'Send Follow Request';

    this.setState({disable: false, userProfile: tempData});

    SocialRequestFunction.rejectFollowRequest(
      this.props?.route?.params?.itemId,
      this.props.user.userData.token,
    )
      .then(res => {
        this.handleRefreshing();
      })
      .catch(err => {
        // console.log('errjalskjfdf', err);
      });
  };

  handleReportBlockUser = () => {
    let postData = {
      post_id: this.state.blockUser?._id,
      description: 'Negative Post',
      type: 'Post',
    };
    SocialServices.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        SocialServices.blockUser(
          this.state.blockUser?.user?._id,
          this.props.user.userData.token,
        )
          .then(res => {
            this.handleRefreshing();
          })
          .catch(err => {
            // console.log(err)
          });
      })
      .catch(err => {
        // console.log('err : ', err);
      });
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read less
      </Text>
    );
  };

  render() {
    const {
      activeTab,
      userProfile,
      loading,
      msgToDisplay,
      alertModal,
      likedUsers,
      showLikedUsers,
      tempLikedUsers,
      searchingData,
      newMsg,
      newMsgModal,
    } = this.state;

    return (
      <>
        <Container>
          <View style={styles.container}>
            {loading ? (
              <Loader />
            ) : (
              <Viewport.Tracker>
                <ScrollView
                  ref={e => (this.scroll = e)}
                  contentContainerStyle={{paddingBottom: '30%'}}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => {
                        this.handleRefreshing();
                      }}
                    />
                  }>
                  <View style={styles.rowContainer}>
                    <StatusBar
                      backgroundColor={themeStyle.YELLOW}
                      barStyle="dark-content"
                    />
                    <Avatar
                      source={{
                        uri:
                          userProfile?.image != ''
                            ? userProfile.image
                            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                      }}
                      // source={this.state.avatar ? { uri: this.state.avatar } : { uri: userProfile?.avatar ? userProfile?.avatar : "https://wallpapercave.com/wp/wp3396910.jpg" }}
                      rounded
                      size={120}
                      avatarStyle={{
                        borderWidth: 4,
                        borderColor: themeStyle.CYAN_BLUE,
                      }}>
                      {userProfile?._id == this.props.user.userData._id ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              route.SOCIALSETTINGS1st,
                              {prev_screen: route.SOCIALPROFILE},
                            )
                          }
                          style={styles.editPhotoButton}>
                          <EditPhoto />
                        </TouchableOpacity>
                      ) : null}
                    </Avatar>
                    <View style={styles.userDetailsContainer}>
                      <Text style={styles.profileName}>
                        {userProfile?.username}
                      </Text>
                      {this.props?.route?.params?.recievedRequest ? (
                        <View style={styles.rowContainer1}>
                          <TouchableOpacity
                            onPress={() => this.handleCancelFollowRequest()}
                            style={styles.deleteButton}>
                            <Text
                              style={[
                                styles.accetp_delete_btn_text,
                                {color: themeStyle.DARK_GRAY},
                              ]}>
                              Delete
                            </Text>
                          </TouchableOpacity>
                          {HorizontalSpacer()}
                          <TouchableOpacity
                            onPress={() => this.handleAcceptRequest()}
                            style={styles.acceptButton}>
                            <Text
                              style={[
                                styles.accetp_delete_btn_text,
                                {color: themeStyle.COLOR_WHITE},
                              ]}>
                              Accept
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : userProfile?.request_status ==
                        'Send Follow Request' ? (
                        <TouchableOpacity
                          disabled={this.state.disable}
                          onPress={() =>
                            userProfile?.is_company
                              ? this.handleSendRequestCompany()
                              : this.handleSendRequest()
                          }
                          style={[
                            styles.sendButtonStyle,
                            {backgroundColor: themeStyle.CYAN_BLUE},
                          ]}>
                          <Icon.AntDesign
                            name="pluscircleo"
                            size={15}
                            color="white"
                          />
                          {HorizontalSpacer()}
                          <Text style={styles.btnText}>
                            Send Follow Request
                          </Text>
                        </TouchableOpacity>
                      ) : userProfile?.request_status ==
                        'Accept Follow Request' ? (
                        <View style={styles.row1}>
                          <TouchableOpacity
                            disabled={this.state.disable}
                            onPress={() => this.handleAcceptRequest()}
                            style={[
                              styles.sendButtonStyle,
                              {
                                backgroundColor: themeStyle.CYAN_BLUE,
                                width: SCREEN_WIDTH * 0.3,
                                marginRight: 8,
                              },
                            ]}>
                            <Text style={styles.btnText}>Accept</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={this.state.disable}
                            onPress={() => this.handleRejectRequest()}
                            style={[
                              styles.sendButtonStyle,
                              {
                                backgroundColor: themeStyle.GRAY,
                                width: SCREEN_WIDTH * 0.3,
                              },
                            ]}>
                            <Text style={styles.btnText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ) : userProfile?.request_status == 'Follow Back' ? (
                        <TouchableOpacity
                          onPress={() => this.handleFollowBackRequest()}
                          style={[
                            styles.sendButtonStyle,
                            {backgroundColor: themeStyle.CYAN_BLUE},
                          ]}>
                          <Icon.AntDesign
                            name="pluscircleo"
                            size={15}
                            color="white"
                          />
                          {HorizontalSpacer()}
                          <Text style={styles.btnText}>Follow Back</Text>
                        </TouchableOpacity>
                      ) : userProfile?.request_status == 'Cancel Request' ? (
                        <TouchableOpacity
                          onPress={() => this.handleCancelFollowRequest()}
                          style={[
                            styles.buttonStyle,
                            {backgroundColor: themeStyle.CYAN_BLUE},
                          ]}>
                          <Icon.AntDesign
                            name="closecircleo"
                            size={15}
                            color="white"
                          />
                          {HorizontalSpacer()}
                          <Text style={styles.btnText}>Cancel Request</Text>
                        </TouchableOpacity>
                      ) : userProfile?.request_status == 'Following' ? (
                        <View style={styles.row2}>
                          <View style={styles.followingButtonStyle}>
                            {HorizontalSpacer()}
                            <Text style={styles.following}>Following</Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(route.CHATSCREEN, {
                                data: {
                                  id: `${userProfile._id}`,
                                  name: userProfile.username,
                                  seen: false,
                                  type: 'Social',
                                  email: '',
                                  profile_url: userProfile.image
                                    ? userProfile.image
                                    : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
                                  last_message: '',
                                  last_message_time: '2021-08-12 17:00:00',
                                  is_org:
                                    userProfile?.is_company == true
                                      ? true
                                      : false,
                                },
                              })
                            }
                            style={[
                              styles.buttonContainer,
                              {backgroundColor: themeStyle.CYAN_BLUE},
                            ]}>
                            <Message />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      <View style={styles.row}>
                        <View style={styles.countContainer}>
                          <Text style={styles.grayTier2}>
                            {moneyFormat(userProfile?.followings?.length)}
                          </Text>
                          <Text style={styles.grayTier1}>Following</Text>
                        </View>
                        <View style={styles.countContainer}>
                          <Text style={styles.grayTier2}>
                            {moneyFormat(userProfile?.posts?.length)}
                          </Text>
                          <Text style={styles.grayTier1}>Posts</Text>
                        </View>
                        <View style={styles.alignCenter}>
                          <Text style={styles.grayTier2}>
                            {moneyFormat(userProfile?.followers?.length)}
                          </Text>
                          <Text style={styles.grayTier1}>Followers</Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        {userProfile?.badges?.length > 0
                          ? userProfile?.badges
                              ?.split(',')
                              .map((item, index) => {
                                return (
                                  <View style={styles.badgeContainer}>
                                    <Text style={styles.badgeText}>{item}</Text>
                                  </View>
                                );
                              })
                          : null}
                      </View>
                    </View>
                  </View>
                  {userProfile?.request_status ==
                  'Send Follow Request' ? null : userProfile?.request_status ==
                    'Cancel Request' ? null : userProfile?.request_status ==
                    'Follow Back' ? null : userProfile?.request_status ==
                    'Following' ? (
                    <></>
                  ) : userProfile?._id == this.props.user.userData._id ? (
                    <></>
                  ) : null}
                  <View
                    style={{
                      ...styles.descContainer,
                      borderBottomWidth: 0,
                      paddingTop: 8,
                    }}>
                    {/* {userProfile?.location?.address ? (
                      <Text style={styles.descText}>
                        {userProfile?.location?.address}
                      </Text>
                    ) : null} */}
                    {userProfile?.about?.includes('http://') ||
                    userProfile?.about?.includes('https://') ? (
                      <Hyperlink
                        linkStyle={styles.blueText}
                        onPress={(url, text) =>
                          this.props.navigation.navigate(route.VIEWURL, {
                            url: url,
                          })
                        }>
                        <Text style={styles.descText}>
                          {userProfile?.about}
                        </Text>
                      </Hyperlink>
                    ) : (
                      <Text style={styles.descText}>{userProfile?.about}</Text>
                    )}
                    <View style={styles.linksContainer}>
                      {userProfile?.fb_link != 'null' ? (
                        <TouchableOpacity
                          style={styles.socialIcon}
                          onPress={() => {
                            if (
                              userProfile?.fb_link?.includes('http' || 'https')
                            ) {
                              Linking.openURL(userProfile.fb_link);
                            } else {
                              Linking.openURL(`http://${userProfile.fb_link}`);
                            }
                          }}>
                          <Icon.FontAwesome
                            name="facebook"
                            size={19}
                            color={themeStyle.CYAN_BLUE}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {userProfile?.insta_link != 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              userProfile?.insta_link?.includes(
                                'http' || 'https',
                              )
                            ) {
                              Linking.openURL(userProfile.insta_link);
                            } else {
                              Linking.openURL(
                                `http://${userProfile.insta_link}`,
                              );
                            }
                          }}
                          style={styles.socialIcon}>
                          <Icon.FontAwesome
                            name="instagram"
                            size={19}
                            color={themeStyle.CYAN_BLUE}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {userProfile?.x_link != 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              userProfile?.x_link?.includes('http' || 'https')
                            ) {
                              Linking.openURL(userProfile.x_link);
                            } else {
                              Linking.openURL(`http://${userProfile.x_link}`);
                            }
                          }}
                          style={styles.socialIcon}>
                          <Icon.FontAwesome6
                            name="x-twitter"
                            size={19}
                            color={themeStyle.CYAN_BLUE}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {userProfile?.linkedin_link != 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              userProfile?.linkedin_link?.includes(
                                'http' || 'https',
                              )
                            ) {
                              Linking.openURL(userProfile.linkedin_link);
                            } else {
                              Linking.openURL(
                                `http://${userProfile.linkedin_link}`,
                              );
                            }
                          }}
                          style={styles.socialIcon}>
                          <Icon.FontAwesome6
                            name="linkedin-in"
                            size={19}
                            color={themeStyle.CYAN_BLUE}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {userProfile?.tiktok_link != 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              userProfile?.tiktok?.includes('http' || 'https')
                            ) {
                              Linking.openURL(userProfile.tiktok);
                            } else {
                              Linking.openURL(`http://${userProfile.tiktok}`);
                            }
                          }}
                          style={styles.socialIcon}>
                          <Icon.FontAwesome6
                            name="tiktok"
                            size={19}
                            color={themeStyle.CYAN_BLUE}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                  {this.props?.route?.params?.sendRequest ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...styles.descContainer,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({activeTab: 0})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 0 ? (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={userProfile?.posts?.length > 0 ? false : true}
                        onPress={() => this.setState({activeTab: 1})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 1 ? (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : this.props?.route?.params?.recievedRequest ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...styles.descContainer,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({activeTab: 0})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 0 ? (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={userProfile?.posts?.length > 0 ? false : true}
                        onPress={() => this.setState({activeTab: 1})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 1 ? (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : this.props?.route?.params?.following ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...styles.descContainer,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({activeTab: 0})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 0 ? (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 44,
                          borderWidth: 0.5,
                          borderColor: themeStyle.COLOR_LIGHT_GREY,
                        }}></View>
                      <TouchableOpacity
                        disabled={userProfile?.posts?.length > 0 ? false : true}
                        onPress={() => this.setState({activeTab: 1})}
                        style={{...styles.tabStyle, width: SCREEN_WIDTH * 0.5}}>
                        {activeTab == 1 ? (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : !userProfile.social_account_is_private ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...styles.descContainer,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({activeTab: 0})}
                        style={{
                          ...styles.tabStyle,
                          width: SCREEN_WIDTH * 0.5,
                        }}>
                        {activeTab == 0 ? (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Foundation
                            name="list"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 40,
                          borderWidth: 1,
                          borderColor: themeStyle.COLOR_LIGHT_GREY,
                        }}></View>
                      <TouchableOpacity
                        disabled={userProfile?.posts?.length > 0 ? false : true}
                        onPress={() => this.setState({activeTab: 1})}
                        style={{
                          ...styles.tabStyle,
                          width: SCREEN_WIDTH * 0.5,
                        }}>
                        {activeTab == 1 ? (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color={themeStyle.CYAN_BLUE}
                          />
                        ) : (
                          <Icon.Ionicons
                            name="grid"
                            size={23}
                            color="lightgray"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {userProfile.social_account_is_private ? (
                    <View style={styles.privateAccountContainer}>
                      <Image
                        source={require('../../../../assets/gifs/privateaccount.gif')}
                        style={styles.privateAccountGif}
                      />
                      <Text style={styles.privateAccount}>Private Account</Text>
                      <Text style={styles.privateAccountDetails}>
                        Your account is private. Your posts and stories are
                        visible only to your followers
                      </Text>
                    </View>
                  ) : null}
                  {activeTab == 0 && !userProfile.social_account_is_private ? (
                    userProfile?.posts?.length == 0 ? (
                      <View style={styles.marginTop40}>
                        <Text style={styles.textAlignCenter}>No Post Yet!</Text>
                      </View>
                    ) : (
                      userProfile?.posts?.map((item, index) => {
                        let likeFound = item?.likes?.filter(
                          val => val?._id === this.props.user.userData?._id,
                        );
                        if (item.content_type === 'MEDIA') {
                          return null;
                        } else {
                          return (
                            <View style={styles.postLine}>
                              <View style={styles.pollContainer}>
                                <View style={styles.headerRow}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      !this.props.user.userData
                                        .is_social_profile_created
                                        ? this.showNewUserAlertFunction()
                                        : null;
                                      this.props.navigation.navigate(
                                        route.SOCIALPROFILE,
                                        {
                                          data: item?.user._id,
                                        },
                                      );
                                    }}
                                    style={styles.row1}>
                                    <Avatar
                                      source={{
                                        uri: item?.user?.social_image
                                          ? `${item?.user?.social_image}`
                                          : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                                      }}
                                      rounded
                                      size={40}
                                    />
                                    <View style={styles.marginLeft8}>
                                      <Text style={styles.nameText}>
                                        {item?.user?.social_username
                                          ? item?.user?.social_username
                                          : 'John Doe'}
                                      </Text>
                                      <Text style={styles.grayText}>
                                        {moment(item?.created_at) < moment()
                                          ? `${moment(item?.created_at).format(
                                              'DD MMMM',
                                            )} at ${moment(
                                              item?.created_at,
                                            ).format('h:mm a')}`
                                          : moment(item?.created_at).fromNow()}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                  <View style={styles.row}>
                                    {item?.sharedBy?.social_username?.length >
                                    0 ? (
                                      <View
                                        style={[
                                          styles.row,
                                          styles.marginRight5,
                                        ]}>
                                        <Repost width={22} height={16} />
                                        <View style={styles.sharedByContainer}>
                                          <Text style={styles.sharedByText}>
                                            Shared by
                                          </Text>
                                          <Text style={styles.sharedByUserName}>
                                            {item?.sharedBy?.social_username}
                                          </Text>
                                        </View>
                                      </View>
                                    ) : null}
                                    <TouchableOpacity
                                      onPress={() => {
                                        if (
                                          item.user._id !=
                                          this.props.user.userData._id
                                        ) {
                                          this.setState({
                                            postMenu: true,
                                            postItem: item,
                                            postIndex: index,
                                          });
                                        } else {
                                          this.setState({
                                            postIndex: index,
                                            postItem: item,
                                            postMenu1: true,
                                          });
                                        }
                                      }}>
                                      <Icon.Entypo
                                        name="dots-three-vertical"
                                        size={20}
                                        color="gray"
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>

                                {item?.description ? (
                                  <Text style={styles.pollDescription}>
                                    {item?.description}
                                  </Text>
                                ) : null}
                                {item?.content_type == 'POLL' ? (
                                  <View style={styles.optionInput}>
                                    <Text style={styles.pollText}>
                                      {item?.pollText}
                                    </Text>
                                  </View>
                                ) : null}
                                {item?.choices?.map((choice, choiceIndex) => {
                                  const totalVotes = item?.total_votes || 1;
                                  const percentage =
                                    (choice?.votes / totalVotes) * 100;
                                  return (
                                    <Pressable
                                      style={styles.options}
                                      onPress={() =>
                                        this.handlePollVoting(
                                          item._id,
                                          choice._id,
                                          index,
                                        )
                                      }>
                                      <View
                                        style={[
                                          styles.optionNumber,
                                          {
                                            width:
                                              percentage > 12
                                                ? `${percentage - 0.6}%`
                                                : '12%',
                                          },
                                        ]}>
                                        <Text style={styles.optionTitle}>
                                          {choiceIndex == 0
                                            ? 'A'
                                            : choiceIndex == 1
                                            ? 'B'
                                            : choiceIndex == 2
                                            ? 'C'
                                            : 'D'}
                                        </Text>
                                      </View>
                                      <View style={styles.percentageContainer}>
                                        <Text
                                          style={[
                                            styles.optionText,
                                            {position: 'absolute', left: 55},
                                          ]}>
                                          {choice?.text}
                                        </Text>
                                        <Text
                                          style={[
                                            styles.optionTitle,
                                            {position: 'absolute', right: 10},
                                          ]}>
                                          {(percentage || 0).toFixed(0)}%
                                        </Text>
                                      </View>
                                    </Pressable>
                                  );
                                })}
                                {item?.tags?.length > 0 ? (
                                  <View style={styles.row1}>
                                    {item.tags?.map(val => {
                                      return (
                                        <TouchableOpacity
                                          style={styles.tagUsers}
                                          disabled
                                          onPress={() =>
                                            !this.props.user.userData
                                              .is_social_profile_created
                                              ? this.showNewUserAlertFunction()
                                              : this.props.navigation.navigate(
                                                  route.SOCIALPROFILE,
                                                  {data: val._id},
                                                )
                                          }>
                                          <Text
                                            style={[
                                              styles.grayText,
                                              {
                                                fontFamily:
                                                  themeStyle.FONT_BOLD,
                                                color: themeStyle.COLOR_BLACK,
                                                fontSize:
                                                  themeStyle.FONT_SIZE_SMALL,
                                              },
                                            ]}>
                                            @{val?.user?.social_username}{' '}
                                          </Text>
                                        </TouchableOpacity>
                                      );
                                    })}
                                  </View>
                                ) : null}
                              </View>
                              {item?.link ? (
                                <HyperLink
                                  linkStyle={styles.linkText}
                                  onPress={(url, text) =>
                                    this.props.navigation.navigate(
                                      route.VIEWURL,
                                      {
                                        url: url,
                                      },
                                    )
                                  }>
                                  <View style={styles.linkContainer}>
                                    <View style={styles.linkInnerContainer}>
                                      <Text
                                        style={styles.linkText}
                                        numberOfLines={1}>
                                        {item?.link}
                                      </Text>
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.copyLink(item?.link)
                                        }>
                                        <Link />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </HyperLink>
                              ) : null}
                              <View style={styles.bottomButtonsContainer}>
                                <View style={styles.row1}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      !this.props.user.userData
                                        .is_social_profile_created
                                        ? this.showNewUserAlertFunction()
                                        : this.handleLikeFunction(item, index)
                                    }
                                    style={styles.highFiveContainer}>
                                    {likeFound.length > 0 ? (
                                      <Like />
                                    ) : (
                                      <LikeDisabled />
                                    )}
                                    <Text style={styles.impressionsText}>
                                      {moneyFormat(
                                        item.likes ? item.likes.length : 0,
                                      )}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      !this.props.user.userData
                                        .is_social_profile_created
                                        ? this.showNewUserAlertFunction()
                                        : this.props.navigation.navigate(
                                            route.SOCIALSINGLEPOST,
                                            {data: item._id},
                                          )
                                    }
                                    style={styles.highFiveContainer}>
                                    <Comment />
                                    <Text style={styles.impressionsText}>
                                      {moneyFormat(
                                        item?.comments ? item?.comments : 0,
                                      )}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          );
                        }
                      })
                    )
                  ) : null}
                  {activeTab == 1 && !userProfile.social_account_is_private ? (
                    <>
                      <MasonryList
                        data={userProfile?.posts}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate(
                                  route.SOCIALSINGLEPOST,
                                  {data: item._id},
                                )
                              }
                              style={styles.listPostContainer}>
                              {item.multi_media?.length > 1 ? (
                                <View style={styles.mdCopyContainer}>
                                  <Icon.Ionicons
                                    name="md-copy"
                                    size={20}
                                    color={themeStyle.PRIMARY_BACKGROUND_COLOR}
                                  />
                                </View>
                              ) : null}
                              {item?.multi_media?.length > 0 ? (
                                <Image
                                  source={{uri: item?.multi_media[0]?.file}}
                                  style={styles.image}
                                />
                              ) : null}
                            </TouchableOpacity>
                          );
                        }}
                        // refreshing={isLoadingNext}
                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                        onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                      />
                    </>
                  ) : null}
                </ScrollView>
              </Viewport.Tracker>
            )}
          </View>
          <SearchMenu
            visible={this.state.visible}
            onProfile={() => {
              this.setState(
                {visible: false, otherProfile: false, loading: true},
                () => this.getUserSocialProfile(),
              );
            }}
            onSavedPosts={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALSAVEDPOST);
            }}
            onBlock={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALBLOCK);
            }}
            onFollower={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALFOLLOWER, {
                screen: route.SOCIALFOLLOWING,
              });
            }}
            onFollowRequest={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALFOLLOWER, {
                screen: route.SOCIALREQUEST,
              });
            }}
            onClose={() => this.setState({visible: false})}
          />
          <UploadingModal visible={this.state.savingPost} />
          <DeleteModal
            alert
            visible={this.state.errModal}
            confirm={() => {
              this.setState({errModal: false}, () =>
                this.props.navigation.goBack(),
              );
            }}
            text={this.state.errMsg}
          />
          <DeleteModal
            alert
            visible={alertModal}
            confirm={() => {
              this.setState({alertModal: false}, () => this.handleRefreshing());
            }}
            text={msgToDisplay}
          />
          <CustomDropDownModal
            tagFriends
            like
            loading={searchingData}
            isVisible={showLikedUsers}
            onClose={() => this.setState({showLikedUsers: false})}
            data={tempLikedUsers}
            OnReset={() => this.setState({tempLikedUsers: likedUsers})}
            onSearch={text => this.seacrhLikeFunction(text)}
            onPress={data =>
              this.setState(
                {
                  loading: true,
                  showLikedUsers: false,
                  likeId: data._id,
                  switchFunc: true,
                },
                () => {
                  this.getUserSocialProfile2();
                },
              )
            }
          />
        </Container>

        <DeleteModal
          visible={this.state.blockModal}
          confirm={() => {
            this.setState({blockModal: false});
            setTimeout(() => {
              this.setState({showReportUserModal: true});
            }, 900);
          }}
          cancel={() => this.setState({blockModal: false})}
          blockUser
        />
        <BottomMenu
          visible={this.state.postMenu1}
          onClose={() => this.setState({postMenu1: false})}
          data={[
            {
              icon: EditPost,
              name: 'Edit post',
              onPress: () => {
                this.setState({postMenu1: false});
                this.props.navigation.navigate(route.SOCIALPOSTEDIT, {
                  postId: this.state.postItem?._id,
                  caption: this.state.postItem?.description,
                });
              },
            },
            {
              icon: DeletePost,
              name: 'Delete post',
              onPress: () => {
                this.setState({postMenu1: false});
                this.handleDeletePost(this.state.postItem._id);
              },
            },
          ]}
        />
        <BottomMenu
          visible={this.state.postMenu}
          onClose={() => this.setState({postMenu: false})}
          data={[
            {
              icon: Save,
              name: 'Save post',
              onPress: () => {
                this.setState({postMenu: false});
                !this.props.user.userData.is_social_profile_created
                  ? this.showNewUserAlertFunction()
                  : this.handleSavePost(this.state.postItem?._id);
              },
            },
            {
              icon: Unfollow,
              name:
                userProfile?.request_status == 'Send Follow Request'
                  ? 'Follow User'
                  : 'Unfollow User',
              onPress: () => {
                this.setState({postMenu: false});
                !this.props.user.userData.is_social_profile_created
                  ? this.showNewUserAlertFunction()
                  : setTimeout(() => {
                      userProfile?.request_status == 'Send Follow Request'
                        ? userProfile?.is_company
                          ? this.handleSendRequest()
                          : this.handleSendRequestCompany()
                        : this.handleUnFollowUser(
                            this.props?.route?.params?.data,
                          );
                    }, 10);
              },
            },
            {
              icon: Report,
              name: 'Report Post',
              onPress: () => {
                this.setState({postMenu: false});
                !this.props.user.userData.is_social_profile_created
                  ? this.showNewUserAlertFunction()
                  : setTimeout(() => {
                      this.setState({
                        reportId: this.state.postItem?._id,
                        reportIndex: this.state.postIndex,
                        showReportModal: true,
                      });
                    }, 500);
              },
            },
            {
              icon: Block,
              name: 'Report/Block',
              onPress: () => {
                this.setState({postMenu: false});
                !this.props.user.userData.is_social_profile_created
                  ? this.showNewUserAlertFunction()
                  : setTimeout(() => {
                      this.setState({
                        blockUser: this.state.postItem,
                        blockModal: true,
                      });
                    }, 500);
              },
            },
          ]}
        />

        <ReactNativeModal
          useNativeDriver={false}
          hideModalContentWhileAnimating={true}
          animationIn={'slideInUp'}
          backdropColor={'#E9E9E9'}
          animationInTiming={800}
          animationOutTiming={800}
          style={styles.modalStyle}
          isVisible={this.state.usersModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => this.setState({usersModal: false})}
              style={styles.dropDown}>
              <DropDown />
            </TouchableOpacity>

            <Text style={styles.search}>Search</Text>

            <View style={styles.searchContainer}>
              <TextInput
                colorProps
                style={styles.container}
                value={this.state.tagSearch}
                placeholder="Search friends"
                onChangeText={job => {
                  this.setState({tagSearch: job});
                  this.seacrhTagFriendsFunction(job);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    this.setState({
                      tempUserList: this.state.userList,
                      tagSearch: '',
                    });
                  }
                }}
              />
              <Share />
            </View>
            <FlatList
              data={this.state.tempUserList}
              ItemSeparatorComponent={VerticalSpacer}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.chatIconContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          usersModal: false,
                          tempUserList: this.state.userList,
                          tagSearch: '',
                        });

                        this.props.navigation.navigate(route.CHATSCREEN, {
                          data: {
                            id: `${item?._id}`,
                            name: item?.username,
                            seen: false,
                            type: 'Social',
                            email: '',
                            is_post: true,
                            post_id: this.state.sharePostData._id,
                            profile_url: item?.image
                              ? item?.image
                              : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
                            last_message: 'Shared With you',
                            last_message_time: '2021-08-12 17:00:00',
                          },
                        });
                      }}
                      style={styles.row1}>
                      <Avatar
                        source={{
                          uri: item.image
                            ? `${item.image}`
                            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                        }}
                        rounded
                        size={60}
                      />
                      <View style={styles.marginLeft5}>
                        <Text style={styles.nameText}>
                          {item.username ? item.username : 'John Doe'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </ReactNativeModal>

        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            this.setState({newMsgModal: false});
          }}
          text={newMsg}
        />

        <AmpuleModal
          visible={this.state.giftModal}
          onClose={() => this.setState({giftModal: false})}
          data={this.state.giftArray}
          onSendGift={() => {
            this.setState({giftModal: false});
            let data = {
              receiver_id: this.state.wallet_id,
              ampules: this.state.giftAmount,
            };
            WalletServices.sendAmpules(data, this.props.user.userData.token)
              .then(res => {
                if (res?.data?.message == 'Insufficent Ampules') {
                  this.setState({
                    ampules: true,
                    alertModal: true,
                    msgToDisplay: 'Entered amount exceeds account balance.',
                  });
                } else {
                  alert('Ampules gift send successfully!');
                  this.props.authActions.getUserProfile(
                    {token: this.props.user.userData.token},
                    '',
                    '',
                  );
                }
              })
              .catch(error => {
                alert('Oh, shit! Try again');
              });
          }}
          onPress={item => {
            let arrayData = [...this.state.giftArray];
            arrayData.map((e, i) => {
              if (item.name == e.name) {
                arrayData[i] = {...arrayData[i], selected: true};
                this.setState({giftAmount: item.name});
              } else {
                arrayData[i] = {...arrayData[i], selected: false};
              }
            });
            this.setState({giftArray: arrayData});
          }}
        />

        <ReportModal
          visible={this.state.showReportModal}
          value={this.state.reportReason}
          setText={txt => this.setState({reportReason: txt})}
          confirm={() => {
            this.setState({showReportModal: false}, () =>
              this.handleReportPost(this.state.reportId),
            );
          }}
          cancel={() => this.setState({showReportModal: false})}
        />
        <ReportModal
          visible={this.state.showReportUserModal}
          value={this.state.reportReason}
          setText={txt => this.setState({reportReason: txt})}
          confirm={() => {
            this.setState({showReportUserModal: false}, () =>
              this.handleReportBlockUser(),
            );
          }}
          cancel={() => this.setState({showReportUserModal: false})}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialProfile);
