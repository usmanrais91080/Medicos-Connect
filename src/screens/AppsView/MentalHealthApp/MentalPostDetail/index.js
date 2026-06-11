import React, {Component} from 'react';
import ReadMore from 'react-native-read-more-text';
import {
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  CustomDropDownModal,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  Loader,
  ReportModal,
} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  BottomMenu,
  CommentComponent,
  PostComponent,
} from './mental.postdetail.screen.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import AddComment from '../../../../assets/svg/addComment-icon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import RBSheet from 'react-native-raw-bottom-sheet';
import {MentalServices} from '../../../../services';
import {Image} from 'react-native';
import {AmpuleModal} from '../../SocialApp/SocialHome/social.home.component';
import Ampules from '../../../../assets/svg/ampules-black.svg';

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
    // if loaded successfully
    // console.log(
    //   'duration in seconds: ' +
    //   ding.getDuration() +
    //   'number of channels: ' +
    //   ding.getNumberOfChannels(),
    // );
  },
);
class MentalPostDetail extends Component {
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
      commentList: [
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
        {
          _id: '62fb729f669802214bd019b6',
          comment: 'Nice ',
          is_reported: false,
          likes: [],
          comment_by: {
            _id: '62bee0e830142f106c40c938',
            username: 'Hamza',
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1656676929113.jpg',
          },
        },
      ],
      postList: [
        {
          _id: '232',
          description: '',
          type: 'Public',
          post_type: 'User',
          my_post: false,
          mood: '',
          is_anonymous: false,
          is_pinned: false,
          likes: [],
          created_at: '2022-08-16T10:14:26.079Z',
          updated_at: '2022-08-16T10:14:26.079Z',
          user: {
            _id: '62fb24dab7111010289a5229',
            username: 'northwest General  hospital',
            is_reported: false,
            image:
              'https://api-dev.medicosconnect.com/public/uploads/file-1660626416379.jpg',
          },
          is_post_liked: false,
          is_reported: false,
          comment_count: 0,
          comments: [],
        },
      ],
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
      openMenu: false,
      giftArray: [
        {
          icon: Ampules,
          name: '500',
          selected: false,
        },
        {
          icon: Ampules,
          name: '1000',
          selected: false,
        },
        {
          icon: Ampules,
          name: '1500',
          selected: false,
        },
      ],
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      // headerRight: () => this.headerRight(),
      headerLeft: () => <HeaderLeft white navigation={this.props.navigation} />,
    });
    this.getSavedPosts(this.props.route.params.data);
  };

  headerRight = () => {
    const {unverifiedUser} = this.state;
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(route.MENTALMOOD, {
              mood: this.state.ads,
            })
          }
          style={{marginRight: 5}}>
          {this.props.user.userData.mental_health_mood != '' ? (
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                // backgroundColor: 'red',
              }}
              source={{uri: this.props.user.userData.mental_health_mood?.image}}
            />
          ) : (
            <Emoji />
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.setState({visible: true})
          }
          style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity> */}
      </View>
    );
  };

  getSavedPosts = id => {
    MentalServices.getPostDetails(id, this.props.user.userData.token)
      .then(res => {
        this.setState(
          {
            postList: [res.data?.data],
            commentList: res.data.data?.comments,
            loading: false,
            commentSending: false,
          },
          () => this.isRefreshing(false),
        );
      })
      .catch(err => {
        this.setState({postList: [], loading: false});
      });
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  refreshingPost = () => {
    this.isRefreshing(true);
    // likeSound.play();
    this.getSavedPosts(this.props.route.params.data);
  };

  addMoreImages(newImages) {
    this.setState({images: this.state.images.concat(newImages)});
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

  handleAddComment = (id, value) => {
    this.setState({commentSending: true});
    let data = {
      post_id: id,
      text: value,
    };
    MentalServices.commentOnPost(data, this.props.user.userData.token)
      .then(res => {
        // this.setState({msgToDisplay:`${res}`,alertModal:true})
        this.getSavedPosts(this.props.route.params.data);
      })
      .catch(err => {
        this.setState({commentSending: false});
        this.getSavedPosts(this.props.route.params.data);
        // this.setState({ msgToDisplay: 'Snap! Please try again.', alertModal: true })
      });
  };

  // handleLikeFunction = (item) => {
  //     SocialPostDetailFunction.likeOrUnlikePost(item._id, this.props.user.userData.token)
  //         .then((res) => { this.refreshingPost() })
  //         .catch((err) => { this.setState({ loading: false, refreshing: false }) })
  // }
  handleLikeFunction = (item, index) => {
    const {postList} = this.state;
    let tempLike = {
      _id: this.props?.user?.userData?._id,
      username: this.props?.user?.userData?.mental_health_username,
      image: this.props?.user?.userData?.mental_health_image,
    };
    if (item.likes.length > 0) {
      if (item?.is_post_liked) {
        let post = [...postList];
        let newLike = post[index].likes.filter(val => {
          if (val._id != this.props?.user?.userData?._id) return val;
        });
        post[index].likes = newLike;
        post[index].is_post_liked = false;
        this.setState({posts: post});
      } else {
        let post = [...postList];
        post[index].likes.push(tempLike);
        post[index].is_post_liked = true;
        this.setState({posts: post});
      }
    } else {
      let post = [...postList];
      post[index].likes.push(tempLike);
      post[index].is_post_liked = true;
      this.setState({postList: post});
    }

    MentalServices.likeOrUnlikePost(item._id, this.props.user.userData.token)
      .then(res => {
        // this.handleRefreshing1();
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
      });
  };

  handleDeleteComment = () => {
    this.isRefreshing(true);
    this.setState({deleteModal: false});
    MentalServices.deleteComment(
      this.state.commentId,
      this.props.user.userData.token,
    )
      .then(res => {
        this.getSavedPosts(this.props.route.params.data);
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
      });
  };

  handleReportComment = () => {
    let postData = {
      comment_id: this.state.commentId,
      description: this.state.reportReason,
      type: 'Comment',
    };
    MentalServices.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        this.setState({msgToDisplay: `${res.data.message}`, alertModal: true});
        this.refreshingPost();
      })
      .catch(err => {
        // console.log('handleReportComment err>>>>>>>>>', err);
      });
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
    } = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            {this.state.postList.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No post found!</Text>
              </View>
            ) : (
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: '30%'}}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      this.refreshingPost();
                    }}
                  />
                }>
                {this.state.postList.map((post, index) => {
                  return post != null ? (
                    <View style={{}}>
                      <PostComponent
                        item={post}
                        clickAmpules={() =>
                          this.setState({
                            giftModal: true,
                            wallet_id: post?.user?._id,
                          })
                        }
                        index={index}
                        clickLike={this.handleLikeFunction}
                        clickMenu={() => {
                          this.setState({openMenu: true});
                        }}
                      />
                      {this.state.commentList.map((item, index) => {
                        return (
                          <CommentComponent
                            item={item}
                            showReport={
                              item?.comment_by?._id ==
                              this.props.user.userData._id
                                ? true
                                : false
                            }
                            showDelete={
                              post?.my_post ||
                              item?.comment_by?._id ==
                                this.props.user.userData._id
                                ? true
                                : false
                            }
                            reportComment={() =>
                              this.setState({
                                showReportModal: true,
                                commentId: item?._id,
                              })
                            }
                            deleteComment={() =>
                              this.setState({
                                deleteModal: true,
                                commentId: item?._id,
                              })
                            }
                            clickComment={() => {
                              this.setState(
                                {
                                  showDelete:
                                    item?.comment_by?._id ==
                                      this.props.user.userData._id || user_id
                                      ? false
                                      : true,
                                  commentId: item?._id,
                                },
                                () => this.Standard.open(),
                              );
                            }}
                          />
                        );
                      })}

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          marginTop: '2%',
                          // backgroundColor: 'lightgray',
                        }}>
                        <Avatar
                          source={{
                            uri:
                              this.props.user.userData.mental_health_image != ''
                                ? this.props.user.userData.mental_health_image
                                : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                          }}
                          avatarStyle={{
                            borderColor: themeStyle.MENTAL_SECONDARY,
                            borderWidth: 2,
                          }}
                          rounded
                          size={40}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: themeStyle.COLOR_WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 55,
                            width: SCREEN_WIDTH * 0.78,
                            borderWidth: 1,
                            borderColor: themeStyle.MENTAL_SECONDARY,
                            borderRadius: 10,
                          }}>
                          <Input
                            width={SCREEN_WIDTH * 0.665}
                            comment
                            placeholder="Add a comment"
                            value={post.comment_value}
                            onChangeText={comment => {
                              let array = [...this.state.postList];
                              array[index] = {
                                ...array[index],
                                comment_value: comment,
                              };
                              this.setState({postList: array});
                            }}
                          />
                          {commentSending ? (
                            <View style={{marginRight: 10}}>
                              <ActivityIndicator size="small" color="black" />
                            </View>
                          ) : (
                            <TouchableOpacity
                              // disabled={
                              //   item.comment_value.length ? false : true
                              // }
                              style={{borderWidth: 0}}
                              onPress={() =>
                                post.comment_value.length
                                  ? this.handleAddComment(
                                      post._id,
                                      post.comment_value,
                                    )
                                  : this.setState({
                                      alertModal: true,
                                      msgToDisplay: 'Please add some text!',
                                    })
                              }>
                              <AddComment />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  ) : null;
                })}
              </KeyboardAwareScrollView>
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
                name="ios-chevron-down"
                style={styles.listIcon}
                size={20}
              />
            </TouchableOpacity>
            {/* <Text style={styles.listTitle}>Comment options</Text> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {this.state.showDelete == false && (
                <TouchableOpacity
                  style={styles.listButton}
                  onPress={() => {
                    this.Standard.close();
                    setTimeout(() => {
                      this.setState({deleteModal: true});
                    }, 500);
                  }}>
                  <Icon.MaterialIcons
                    name="delete"
                    style={styles.listIcon}
                    size={20}
                  />
                  <Text style={styles.listLabel}>{'Delete'}</Text>
                </TouchableOpacity>
              )}

              {this.state.showDelete && (
                <TouchableOpacity
                  style={styles.listButton}
                  onPress={() => {
                    this.Standard.close();
                    // this.handleReportComment();
                    setTimeout(() => {
                      this.setState({showReportModal: true});
                    }, 500);
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
          visible={this.state.showReportModal}
          value={this.state.reportReason}
          setText={txt => this.setState({reportReason: txt})}
          confirm={() => {
            this.setState({showReportModal: false}, () =>
              this.handleReportComment(),
            );
          }}
          cancel={() => this.setState({showReportModal: false})}
        />
        <BottomMenu
          visible={this.state.openMenu}
          onClose={() => {
            this.setState({openMenu: false});
          }}
        />
        <AmpuleModal
          visible={this.state.giftModal}
          onClose={() => this.setState({giftModal: false})}
          data={this.state.giftArray}
          mental
          onPress={item => {
            let arrayData = [...this.state.giftArray];
            arrayData.map((e, i) => {
              if (item.name == e.name) {
                arrayData[i] = {...arrayData[i], selected: true};
              } else {
                arrayData[i] = {...arrayData[i], selected: false};
              }
            });
            this.setState({giftArray: arrayData});
          }}
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

export default connect(mapStateToProps, mapDispatchToProps)(MentalPostDetail);
