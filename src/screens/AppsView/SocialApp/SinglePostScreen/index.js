import React, {Component} from 'react';
import ReadMore from 'react-native-read-more-text';
import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  CustomDropDownModal,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  PostMediaViewContainer,
  ReportModal,
} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import {moneyFormat} from '../../../../lib/utils/global';
import SearchMenu from '../SocialMenu';
import SocialPostDetailFunction from './single.post.function';
import {HeaderRight} from './social.singlepost.screen.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import moment from 'moment';
import Like from '../../../../assets/svg/like.svg';
import Comment from '../../../../assets/svg/comment.svg';
import LikeDisabled from '../../../../assets/svg/like-disabled.svg';
import {Viewport} from '@skele/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Hyperlink from 'react-native-hyperlink';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SocialServices} from '../../../../services';
import Link from '../../../../assets/svg/link-new-white.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import ShimmerLoaderPostDetail from '../../../../components/ShimmerLoaderPostDetail';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');
var commentSound = new Sound(
  '../../../../assets/sounds/comment.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }
  },
);
var likeSound = new Sound(
  '../../../../assets/sounds/like.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }
  },
);
class SocialSavedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      avatar: '',
      activeTab: 0,
      loading: true,
      paused: true,
      user_id: false,
      refreshing: false,
      deleteModal: false,
      commentList: [],
      postList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      alertModal: false,
      commentId: '',
      msgToDisplay: '',
      postModal: false,
      commentSending: false,
      showDelete: false,
      likedUsers: [],
      showLikedUsers: false,
      tempLikedUsers: [],
      searchingData: false,
      reportReason: '',
      showReportModal: false,
      post_id: '',
      isReply: false,
      comment: '',
      expandedCommentId: '',
      expandComment: false,
      replyTo: '',
      index: null,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => this.setState({visible: true})} />
      ),
      headerLeft: () => (
        <HeaderLeft
          color={themeStyle.COLOR_BLACK}
          navigation={this.props.navigation}
        />
      ),
    });
    this.getSavedPosts(this.props.route.params.data);
  };

  calculateHours = date => {
    const currentDate = new Date();
    const createdAt = new Date(date);
    const diff = currentDate.getTime() - createdAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    switch (true) {
      case diff < 1000 * 60:
        return `just now`;
      case diff < 1000 * 60 * 60:
        return `${Math.floor(diff / (1000 * 60))} m`;
      case diff < 1000 * 60 * 60 * 24:
        return `${hours} h`;
      default:
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  getSavedPosts = id => {
    const {commentSending} = this.state;
    SocialPostDetailFunction.getPostDetails(id, this.props.user.userData.token)
      .then(res => {
        if (res == 'Invalid Post ID' || res == 'Post not found') {
          return this.setState({postModal: true});
        }
        this.setState({
          user_id:
            res?.user?._id == this.props.user.userData._id ? true : false,
          post_id: res._id,
        });
        let array = [];
        array.push({...res, comment_value: ''});
        SocialPostDetailFunction.getPostComments(
          this.props.route.params.data,
          this.props.user.userData.token,
        )
          .then(res => {
            if (commentSending) {
              commentSound.play();
            }
            this.setState(
              {
                postList: array,
                commentList: res,
                loading: false,
                commentSending: false,
              },
              () => this.isRefreshing(false),
            );
          })
          .catch(err => {});
      })
      .catch(err => {
        this.setState({postList: [], loading: false}, () =>
          this.isRefreshing(false),
        );
      });
  };

  getPostComments = () => {
    SocialPostDetailFunction.getPostComments(
      this.props.route.params.data,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          commentList: res,
        });
      })
      .catch(err => {});
  };

  replyComment = () => {
    const {commentList, commentId, comment, post_id, index} = this.state;
    const updatedCommentList = [...commentList];
    const updatedPostList = [...this.state.postList];
    updatedPostList[0].comments = updatedPostList[0].comments + 1;
    const newReply = {
      _id: Math.random().toString(36).substr(2, 9),
      text: comment,
      username: this.props.user.userData.social_username,
      comment_by: {
        _id: this.props.user.userData._id,
      },
      created_at: new Date().toISOString(),
      image: this.props.user.userData.social_image,
      isUploading: true,
    };

    updatedCommentList[index]?.replies?.push(newReply);

    this.setState({
      commentList: updatedCommentList,
      isReply: false,
      comment: '',
      postList: updatedPostList,
    });

    const data = {
      comment_id: commentId,
      text: comment,
      post_id: post_id,
    };
    SocialPostDetailFunction.replyComment(data, this.props.user.userData.token)
      .then(res => {
        this.getPostComments();
      })
      .catch(err => {
        this.setState({commentSending: false, isReply: false, comment: ''});
        this.getSavedPosts(this.props.route.params.data);
        // console.log('err : ', err);
      });
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  refreshingPost = () => {
    this.isRefreshing(true);
    this.getSavedPosts(this.props.route.params.data);
  };

  addMoreImages(newImages) {
    this.setState(prevState => ({images: prevState.images.concat(newImages)}));
  }

  playLikeSound = () => {
    var soundTrack = new Sound(
      require('../../../../assets/sounds/like.mp3'),
      (error, sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        soundTrack.play(success => {
          soundTrack.release();
        });
      },
    );
  };

  handleAddComment = () => {
    const {comment, post_id, postList} = this.state;
    const updatedPostList = [...postList];
    updatedPostList[0].comments = updatedPostList[0].comments + 1;

    this.setState(prevState => ({
      commentList: [
        ...prevState.commentList,
        {
          _id: Math.random().toString(36).substr(2, 9),
          text: comment,
          username: this.props.user.userData.social_username,
          comment_by: {
            _id: this.props.user.userData._id,
          },
          created_at: new Date().toISOString(),
          image: this.props.user.userData.social_image,
          replies: [],
          isUploading: true,
        },
      ],
      postList: updatedPostList,
      comment: '',
    }));

    let data = {
      post_id: post_id,
      text: comment,
    };
    SocialPostDetailFunction.commentOnPost(data, this.props.user.userData.token)
      .then(res => {
        this.getPostComments();
      })
      .catch(err => {
        // console.log('err : ', err);
        this.setState({commentSending: false});
        this.getSavedPosts(this.props.route.params.data);
      });
  };

  handleLikeFunction = (item, index) => {
    const {postList} = this.state;
    let tempLike = {
      _id: this.props?.user?.userData?._id,
      username: this.props?.user?.userData?.social_username,
      image: this.props?.user?.userData?.social_image,
    };
    if (item.likes.length > 0) {
      let likeFound = item.likes.filter(
        val => val._id === this.props?.user?.userData?._id,
      );
      if (likeFound.length > 0) {
        let posts = [...postList];
        let newLike = posts[index].likes.filter(val => {
          if (val._id != this.props?.user?.userData?._id) return val;
        });
        posts[index].likes = newLike;
        this.setState({postList: posts});
      } else {
        let posts = [...postList];
        posts[index].likes.push(tempLike);
        this.setState({postList: posts});
        this.playLikeSound();
      }
    } else {
      let posts = [...postList];
      posts[index].likes.push(tempLike);
      this.setState({postList: posts});
      this.playLikeSound();
    }

    SocialPostDetailFunction.likeOrUnlikePost(
      item._id,
      this.props.user.userData.token,
    )
      .then(res => {})
      .catch(err => {
        this.setState({refreshing: false});
      });
  };

  handleDeleteComment = () => {
    const {commentId} = this.state;
    this.isRefreshing(true);
    this.Standard.close();
    this.setState({deleteModal: false});
    SocialServices.deleteComment(commentId, this.props.user.userData.token)
      .then(res => {
        this.getSavedPosts(this.props.route.params.data);
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
      });
  };

  handleReportComment = reportReason => {
    let postData = {
      comment_id: this.state.commentId,
      description: reportReason,
      type: 'Comment',
    };
    SocialServices.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        this.setState({msgToDisplay: `${res.data.message}`, alertModal: true});
        this.refreshingPost();
      })
      .catch(err => {
        // console.log('err : ', err);
      });
  };

  handlePollVoting = (postId, choiceId) => {
    const tempPostList = [...this.state.postList];

    if (tempPostList[0].user._id == this.props.user.userData._id) {
      this.setState({
        msgToDisplay: 'You cannot vote on your own poll',
        alertModal: true,
      });
      return;
    }
    tempPostList[0].polls = tempPostList[0].polls || [];

    const found = tempPostList[0]?.polls?.some(
      val => val.user === this.props.user.userData._id,
    );
    if (!found) {
      tempPostList[0]?.polls?.push({
        _id: Math.random().toString(25).substring(7),
        user: this.props.user.userData._id,
      });
      tempPostList[0].choices.forEach(val => {
        if (val._id == choiceId) {
          val.votes = val.votes + 1;
        }
      });
      tempPostList[0].total_votes = tempPostList[0].total_votes + 1;
      this.setState({postList: tempPostList});
      SocialServices.votePoll(
        postId,
        {choice_id: choiceId},
        this.props.user.userData.token,
      )
        .then(res => {})
        .catch(err => {
          this.setState({
            msgToDisplay: `${err?.response.data.message}`,
            alertModal: true,
          });
        });
    } else {
      this.setState({
        msgToDisplay: 'You have already voted on this poll',
        alertModal: true,
      });
    }
  };

  seacrhLikeFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.likedUsers.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempLikedUsers: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  onCommentLike = commentId => {
    let data = {
      comment_id: commentId,
      post_id: this.state.post_id,
    };
    SocialServices.likePostComment(data, this.props.user.userData.token)
      .then(res => {
        this.getPostComments();
      })
      .catch(err => {
        // console.log('err : ', err);
      });
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <Text
        style={{
          color: themeStyle.PRIMARY_TINT_COLOR,
          fontFamily: themeStyle.FONT_MEDIUM,
          fontSize: themeStyle.FONT_SIZE_SMALL,
          marginTop: 5,
        }}
        onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{
          color: themeStyle.PRIMARY_TINT_COLOR,
          fontFamily: themeStyle.FONT_MEDIUM,
          fontSize: themeStyle.FONT_SIZE_SMALL,
          marginTop: 5,
        }}
        onPress={handlePress}>
        Read less
      </Text>
    );
  };

  render() {
    const {
      activeTab,
      loading,
      alertModal,
      msgToDisplay,
      commentSending,
      deleteModal,
      user_id,
      postModal,
      likedUsers,
      showLikedUsers,
      tempLikedUsers,
      searchingData,
      postList,
      refreshing,
      commentList,
      post_id,
      paused,
      expandComment,
      expandedCommentId,
      comment,
      commentId,
      isReply,
      showDelete,
      visible,
      showReportModal,
      reportReason,
      replyTo,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <ShimmerLoaderPostDetail />
        ) : (
          <View style={styles.container}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={themeStyle.YELLOW}
            />
            {postList.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No post found!</Text>
              </View>
            ) : (
              <Viewport.Tracker>
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{paddingBottom: '30%'}}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        this.refreshingPost();
                      }}
                    />
                  }>
                  {postList.map((item, index) => {
                    let likeFound = item.likes.filter(
                      val => val._id === this.props.user.userData._id,
                    );
                    let spaces = item?.description?.split('\n');
                    return item != null ? (
                      <View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgray',
                            backgroundColor: 'white',
                          }}>
                          <View
                            style={
                              item?.content_type !== 'MEDIA'
                                ? styles.pollContainer
                                : {}
                            }>
                            <View
                              style={[
                                styles.innerContainer,
                                {
                                  paddingHorizontal:
                                    item?.content_type !== 'MEDIA' ? 13 : '5%',
                                },
                              ]}>
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    route.SOCIALPROFILE,
                                    {data: item.user._id},
                                  )
                                }>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Avatar
                                    source={{
                                      uri: item.user?.social_image
                                        ? `${item.user?.social_image}`
                                        : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                                    }}
                                    rounded
                                    size={30}
                                  />
                                  <View style={{marginLeft: '5%'}}>
                                    <Text style={styles.nameText}>
                                      {item?.user?.social_username}
                                    </Text>
                                    <Text style={styles.grayText}>
                                      {moment(item.created_at) < moment()
                                        ? `${moment(item.created_at).format(
                                            'DD MMMM',
                                          )} at ${moment(
                                            item.created_at,
                                          ).format('h:mm a')}`
                                        : moment(item.created_at).fromNow()}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                            {item?.multi_media?.length > 0 && (
                              <PostMediaViewContainer
                                paused={paused}
                                data={item.multi_media}
                                videoLayout={event =>
                                  this.handleVideoLayout(event)
                                }
                              />
                            )}
                            {item?.description?.includes('http://') ||
                            item?.description?.includes('https://') ? (
                              <Hyperlink
                                linkStyle={styles.blueText}
                                onPress={(url, text) =>
                                  this.props.navigation.navigate(
                                    route.VIEWURL,
                                    {
                                      url: url,
                                    },
                                  )
                                }>
                                <View
                                  style={{
                                    paddingVertical: '2%',
                                    paddingHorizontal: '4.5%',
                                  }}>
                                  {item?.description != '' ? (
                                    item?.description?.length > 100 ||
                                    spaces?.length > 2 ? (
                                      <ReadMore
                                        numberOfLines={2}
                                        renderTruncatedFooter={
                                          this._renderTruncatedFooter
                                        }
                                        renderRevealedFooter={
                                          this._renderRevealedFooter
                                        }
                                        // onReady={this._handleTextReady}
                                      >
                                        <Text style={styles.grayText}>
                                          {item.description}
                                        </Text>
                                      </ReadMore>
                                    ) : (
                                      <Text style={styles.grayText}>
                                        {item.description}
                                      </Text>
                                    )
                                  ) : null}
                                </View>
                              </Hyperlink>
                            ) : (
                              <View
                                style={{
                                  paddingVertical: '2%',
                                  paddingHorizontal: '4.5%',
                                }}>
                                {item?.description != '' ? (
                                  item?.description?.length > 100 ||
                                  spaces?.length > 2 ? (
                                    <ReadMore
                                      numberOfLines={2}
                                      renderTruncatedFooter={
                                        this._renderTruncatedFooter
                                      }
                                      renderRevealedFooter={
                                        this._renderRevealedFooter
                                      }>
                                      <Text style={styles.grayText}>
                                        {item?.description}
                                      </Text>
                                    </ReadMore>
                                  ) : (
                                    <Text style={styles.grayText}>
                                      {item?.description}
                                    </Text>
                                  )
                                ) : null}
                                {item?.content_type == 'POLL' ? (
                                  <View style={styles.optionInput}>
                                    <Text style={styles.pollText}>
                                      {item?.pollText}
                                    </Text>
                                  </View>
                                ) : null}
                                {item?.choices?.map((choice, index) => {
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
                                          {index == 0
                                            ? 'A'
                                            : index == 1
                                            ? 'B'
                                            : index == 2
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
                              </View>
                            )}
                            {item?.tag_users?.length > 0 && (
                              <View
                                style={{
                                  paddingHorizontal: '5%',
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  width: SCREEN_WIDTH,
                                }}>
                                {item?.tag_users?.map(val => {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.props.navigation.navigate(
                                          route.SOCIALPROFILE,
                                          {data: val._id},
                                        )
                                      }>
                                      <Text
                                        style={[
                                          styles.grayText,
                                          {
                                            fontFamily: themeStyle.FONT_MEDIUM,
                                            color: themeStyle.COLOR_BLACK_LIGHT,
                                            fontSize:
                                              themeStyle.FONT_SIZE_SMALL,
                                          },
                                        ]}>
                                        @{val.username}{' '}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                })}
                              </View>
                            )}
                          </View>
                          {item?.link != '' ? (
                            <View style={styles.linkContainer}>
                              <View style={styles.linkInnerContainer}>
                                <Text style={styles.linkText} numberOfLines={1}>
                                  {item?.link}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Clipboard.getString(item?.link);
                                    this.setState({
                                      alertModal: true,
                                      msgToDisplay: 'Link copied to clipboard!',
                                    });
                                  }}>
                                  <Link />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : null}
                          <View
                            style={{
                              marginHorizontal: '2.5%',
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: 10,
                              paddingBottom: '0%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.handleLikeFunction(item, index)
                              }
                              style={styles.impressionContainer}>
                              {likeFound?.length > 0 ? (
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
                            <View
                              style={[
                                styles.impressionContainer,
                                {
                                  borderColor:
                                    item?.content_type !== 'MEDIA'
                                      ? themeStyle.CYAN_BLUE
                                      : themeStyle.YELLOW,
                                },
                              ]}>
                              <Comment />
                              <Text style={styles.impressionsText}>
                                {moneyFormat(
                                  item?.comments ? item?.comments : 0,
                                )}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor: 'white',
                            paddingHorizontal: '5%',
                          }}>
                          {commentList.map((item, index) => {
                            return (
                              <View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginTop: '5%',
                                  }}>
                                  <Avatar
                                    source={{
                                      uri: item?.image
                                        ? item?.image
                                        : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                                    }}
                                    rounded
                                    size={30}
                                  />
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                      onLongPress={() => {
                                        this.setState(
                                          {
                                            showDelete:
                                              item?.comment_by?._id ==
                                                this.props.user.userData._id ||
                                              user_id
                                                ? false
                                                : true,
                                            commentId: item?._id,
                                          },
                                          () => this.Standard.open(),
                                        );
                                      }}
                                      style={{flex: 0.9}}>
                                      {item.text.includes('http://') ||
                                      item.text.includes('https://') ? (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.props.navigation.navigate(
                                              route.VIEWURL,
                                              {url: item.comment},
                                            )
                                          }
                                          style={{
                                            paddingVertical: '5%',
                                            paddingHorizontal: '5%',
                                            backgroundColor: 'red',
                                          }}>
                                          <Text style={styles.nameText}>
                                            {item?.username}
                                          </Text>
                                          <Text style={styles.blueText}>
                                            {item?.comment}{' '}
                                          </Text>
                                        </TouchableOpacity>
                                      ) : (
                                        <View style={{paddingHorizontal: 15}}>
                                          <Text style={styles.nameText}>
                                            {item?.username}
                                          </Text>
                                          <Text style={styles.commentText}>
                                            {item?.text}{' '}
                                          </Text>
                                        </View>
                                      )}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                      onPress={() =>
                                        this.onCommentLike(item._id)
                                      }>
                                      {item.likes > 0 ? (
                                        <Like />
                                      ) : (
                                        <LikeDisabled />
                                      )}
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    marginLeft: '12%',
                                  }}>
                                  <View
                                    style={{
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      marginRight: 16,
                                    }}>
                                    <Text style={styles.grayText}>
                                      {this.calculateHours(
                                        new Date(item?.created_at),
                                      )}
                                    </Text>
                                  </View>
                                  {item?.isUploading ? (
                                    <Text style={styles.grayText}>
                                      Uploading...
                                    </Text>
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.setState({
                                          isReply: true,
                                          comment: '',
                                          post_id: post_id,
                                          commentId: item._id,
                                          replyTo: item.username,
                                          index,
                                        });
                                        this.inputRef.current.focus();
                                      }}
                                      style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginRight: 16,
                                      }}>
                                      <Text style={styles.grayText}>Reply</Text>
                                    </TouchableOpacity>
                                  )}
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({
                                        expandedCommentId: item._id,
                                        expandComment:
                                          expandedCommentId == item._id &&
                                          expandComment
                                            ? false
                                            : true,
                                      });
                                    }}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text style={styles.grayText}>
                                      {item?.replies?.length > 0}
                                      {item?.replies?.length == 0
                                        ? ''
                                        : expandedCommentId == item._id &&
                                          expandComment
                                        ? 'Hide replies'
                                        : `View all replies(${item?.replies?.length})`}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                {expandedCommentId == item._id &&
                                  expandComment &&
                                  item?.replies?.map((val, i) => {
                                    return (
                                      <>
                                        <Pressable
                                          onLongPress={() => {
                                            this.setState(
                                              {
                                                showDelete:
                                                  val?.comment_by?._id ==
                                                    this.props.user.userData
                                                      ._id || user_id
                                                    ? false
                                                    : true,
                                                commentId: val?._id,
                                              },
                                              () => this.Standard.open(),
                                            );
                                          }}
                                          style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginTop: '5%',
                                            marginLeft: '12%',
                                          }}>
                                          <Avatar
                                            source={{
                                              uri: val?.image
                                                ? val?.image
                                                : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                                            }}
                                            rounded
                                            size={30}
                                          />
                                          <View
                                            style={{
                                              flex: 1,
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                            }}>
                                            <View style={{flex: 1}}>
                                              {val.text.includes('http://') ||
                                              val.text.includes('https://') ? (
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    this.props.navigation.navigate(
                                                      route.VIEWURL,
                                                      {url: val.comment},
                                                    )
                                                  }
                                                  style={{
                                                    paddingVertical: '5%',
                                                    paddingHorizontal: '5%',
                                                  }}>
                                                  <Text style={styles.nameText}>
                                                    {val.username}
                                                  </Text>
                                                  <Text style={styles.blueText}>
                                                    {val.comment}{' '}
                                                  </Text>
                                                </TouchableOpacity>
                                              ) : (
                                                <View
                                                  style={{
                                                    paddingHorizontal: 15,
                                                  }}>
                                                  <Text style={styles.nameText}>
                                                    {val.username}
                                                  </Text>
                                                  <Text
                                                    style={styles.commentText}>
                                                    {val.text}{' '}
                                                  </Text>
                                                </View>
                                              )}
                                            </View>
                                            <TouchableOpacity
                                              style={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: 30,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                              }}
                                              onPress={() =>
                                                this.onCommentLike(val._id)
                                              }>
                                              {val.likes > 0 ? (
                                                <Like />
                                              ) : (
                                                <LikeDisabled />
                                              )}
                                            </TouchableOpacity>
                                          </View>
                                        </Pressable>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            marginTop: 10,
                                            marginLeft: '24%',
                                          }}>
                                          <View
                                            style={{
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              marginRight: 16,
                                            }}>
                                            <Text style={styles.grayText}>
                                              {this.calculateHours(
                                                val?.created_at,
                                              )}
                                            </Text>
                                          </View>
                                          {val.isUploading ? (
                                            <Text style={styles.grayText}>
                                              Uploading...
                                            </Text>
                                          ) : (
                                            <TouchableOpacity
                                              onPress={() => {
                                                this.setState({
                                                  isReply: true,
                                                  comment: '',
                                                  post_id: post_id,
                                                  commentId: val._id,
                                                  replyTo: val.username,
                                                  index,
                                                });
                                                this.inputRef.current.focus();
                                              }}
                                              style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                marginRight: 16,
                                              }}>
                                              <Text style={styles.grayText}>
                                                Reply
                                              </Text>
                                            </TouchableOpacity>
                                          )}
                                        </View>
                                      </>
                                    );
                                  })}
                              </View>
                            );
                          })}

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: '5%',
                            }}>
                            <Input
                              inputRef={this.inputRef}
                              width={'85%'}
                              commentYellow={
                                item?.content_type == 'MEDIA' ? true : false
                              }
                              commentCyan={
                                item?.content_type == 'MEDIA' ? false : true
                              }
                              placeholder={
                                isReply
                                  ? `Replying to ${replyTo}`
                                  : 'Add a comment'
                              }
                              value={comment}
                              onChangeText={comment => {
                                this.setState({comment: comment});
                              }}
                            />
                            {commentSending ? (
                              <View style={{marginRight: 10, marginBottom: 25}}>
                                <ActivityIndicator size="small" color="black" />
                              </View>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  comment || isReply
                                    ? isReply
                                      ? this.replyComment()
                                      : this.handleAddComment()
                                    : this.setState({
                                        alertModal: true,
                                        msgToDisplay: 'Please add some text!',
                                      });
                                }}
                                style={[
                                  styles.sendComment,
                                  {
                                    borderColor:
                                      item?.content_type == 'MEDIA'
                                        ? themeStyle.YELLOW
                                        : themeStyle.CYAN_BLUE,
                                  },
                                ]}>
                                <Icon.AntDesign
                                  name="arrowright"
                                  size={25}
                                  color={
                                    item?.content_type == 'MEDIA'
                                      ? themeStyle.YELLOW
                                      : themeStyle.CYAN_BLUE
                                  }
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    ) : null;
                  })}
                </KeyboardAwareScrollView>
              </Viewport.Tracker>
            )}
          </View>
        )}
        <RBSheet
          ref={ref => {
            this.Standard = ref;
          }}
          height={120}>
          <View style={styles.listContainer}>
            <TouchableOpacity
              style={{alignSelf: 'center', marginBottom: '2%'}}
              onPress={() => this.Standard.close()}>
              <Icon.Ionicons
                name="chevron-down"
                style={styles.listIcon}
                size={20}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {!showDelete && (
                <TouchableOpacity
                  style={styles.listButton}
                  onPress={() => {
                    this.Standard.close();
                    setTimeout(() => {
                      this.setState({deleteModal: true});
                    }, 300);
                  }}>
                  <Icon.MaterialIcons
                    name="delete"
                    style={styles.listIcon}
                    size={20}
                  />
                  <Text style={styles.listLabel}>{'Delete'}</Text>
                </TouchableOpacity>
              )}

              {showDelete && (
                <TouchableOpacity
                  style={styles.listButton}
                  onPress={() => {
                    this.Standard.close();
                    setTimeout(() => {
                      this.setState({showReportModal: true});
                    }, 300);
                  }}>
                  <Icon.MaterialIcons
                    name="report-problem"
                    style={styles.listIcon}
                    size={20}
                  />
                  <Text style={styles.listLabel}>{'Report'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </RBSheet>
        <SearchMenu
          visible={visible}
          onSavedPosts={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALSAVEDPOST);
          }}
          onProfile={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.SOCIALPROFILE);
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
        <DeleteModal
          alert
          visible={postModal}
          confirm={() => {
            this.setState({postModal: false}, () =>
              this.props.navigation.goBack(),
            );
          }}
          text={'Post deleted or not found.'}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
        <DeleteModal
          visible={deleteModal}
          confirm={() => {
            this.handleDeleteComment();
          }}
          cancel={() => {
            this.setState({deleteModal: false}, () => this.Standard.close());
          }}
          text={'Are you sure you want to delete this comment?'}
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
            this.setState({showLikedUsers: false}, () =>
              this.props.navigation.navigate(route.SOCIALPROFILE, {
                data: data._id,
              }),
            )
          }
        />
        <ReportModal
          visible={showReportModal}
          value={reportReason}
          setText={txt => this.setState({reportReason: txt})}
          handleReportPost={() => {
            this.setState({showReportModal: false}, () =>
              this.handleReportComment(),
            );
          }}
          onClose={() => this.setState({showReportModal: false})}
        />
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialSavedPost);
