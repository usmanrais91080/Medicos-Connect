import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  CustomDropDownModal,
  HeaderLeft,
  Icon,
  Loader,
  PostMediaViewContainer,
} from '../../../../components';
import Hyperlink from 'react-native-hyperlink';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import {moneyFormat} from '../../../../lib/utils/global';
import SearchMenu from '../SocialMenu';
import SocialSavedPostFunction from './social.savedpost.function';
import {HeaderRight} from './social.savedpost.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import moment from 'moment';
import Like from '../../../../assets/svg/like.svg';
import Comment from '../../../../assets/svg/comment.svg';
import {Viewport} from '@skele/components';
import ReadMore from 'react-native-read-more-text';
import {BottomMenu} from '../SocialHome/social.home.component';
import LikeDisabled from '../../../../assets/svg/like-disabled.svg';
import Link from '../../../../assets/svg/link-new-white.svg';
import Save from '../../../../assets/svg/save-new.svg';
import {SocialServices} from '../../../../services';
import HyperLink from 'react-native-hyperlink';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var ding = new Sound('../../../../assets/sounds/like.mp3', error => {
  if (error) {
    return;
  }
});
class SocialSavedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      avatar: '',
      activeTab: 0,
      loading: true,
      paused: true,
      refreshing: false,
      postList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      images: [],
      likedUsers: [],
      showLikedUsers: false,
      tempLikedUsers: [],
      searchingData: false,
      postMenu: false,
      postItem: {},
      postIndex: 0,
    };
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
    this.getSavedPosts();
  };

  getSavedPosts = () => {
    SocialSavedPostFunction.getUserSavedPosts(this.props.user.userData.token)
      .then(res => {
        let array = res;
        this.setState({postList: res, loading: false});
      })
      .catch(err => {
        this.setState({postList: [], loading: false});
      });
  };

  isRefreshing = refreshingState => {
    this.setState({refreshing: refreshingState});
  };

  refreshingSavedPost = () => {
    this.isRefreshing(true);
    SocialSavedPostFunction.refreshingSavedPosts(this.props.user.userData.token)
      .then(res => {
        this.setState({postList: res}, () => this.isRefreshing(false));
      })
      .catch(err => {
        this.setState({postList: [], loading: false});
        this.isRefreshing(false);
      });
  };

  addMoreImages(newImages) {
    this.setState({images: this.state.images.concat(newImages)});
  }

  handleAddComment = (id, value) => {
    let data = {
      post_id: id,
      text: value,
    };
    SocialSavedPostFunction.commentOnPost(data, this.props.user.userData.token)
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
        let posts = postList;
        let newLike = posts[index].likes.filter(val => {
          if (val._id != this.props?.user?.userData?._id) return val;
        });
        posts[index].likes = newLike;
        this.setState({postList: posts});
      } else {
        let posts = postList;
        posts[index].likes.push(tempLike);
        this.setState({postList: posts});
        ding.play();
      }
    } else {
      let posts = postList;
      posts[index].likes.push(tempLike);
      this.setState({postList: posts});
      ding.play();
    }

    SocialSavedPostFunction.likeOrUnlikePost(
      item._id,
      this.props.user.userData.token,
    )
      .then(res => {})
      .catch(err => {
        this.setState({loading: false, refreshing: false});
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

  handleSavePost = item => {
    SocialServices.savePost(item, this.props.user.userData.token)
      .then(res => {
        this.setState({
          postMenu: false,
        });
        this.getSavedPosts();
      })
      .catch(err => {});
  };

  render() {
    const {
      loading,
      postList,
      likedUsers,
      showLikedUsers,
      tempLikedUsers,
      searchingData,
      postMenu,
      postItem,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
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
                <ScrollView
                  contentContainerStyle={{paddingBottom: '30%'}}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => {
                        this.refreshingSavedPost();
                      }}
                    />
                  }>
                  {postList.map((item, index) => {
                    let likeFound = item.likes.filter(
                      val => val._id === this.props.user.userData._id,
                    );
                    let spaces = item?.description?.split('\n');

                    return item.content_type === 'MEDIA' ? (
                      <View style={styles.mediaPostContainer}>
                        <View style={styles.mediaPostInnerContainer}>
                          <View style={styles.mediaPostProfileContainer}>
                            <Avatar
                              source={{
                                uri:
                                  item?.user?.image != ''
                                    ? item?.user?.image
                                    : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                              }}
                              rounded
                              size={44}
                            />
                            <View style={styles.marginLeft5}>
                              <Text style={styles.nameText}>
                                {item.user.social_username}
                              </Text>
                              <Text style={styles.grayText}>
                                {moment(item.created_at) < moment()
                                  ? `${moment(item.created_at).format(
                                      'DD MMMM',
                                    )} at ${moment(item.created_at).format(
                                      'h:mm a',
                                    )}`
                                  : moment(item.created_at).fromNow()}
                              </Text>
                            </View>
                          </View>
                          {/* <Menu /> */}

                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                postMenu: true,
                                postItem: item,
                                postIndex: index,
                              });
                            }}>
                            <Icon.Entypo
                              name="dots-three-vertical"
                              size={20}
                              color="gray"
                            />
                          </TouchableOpacity>
                        </View>
                        {item.multi_media?.length > 0 ? (
                          <PostMediaViewContainer
                            paused={this.state.paused}
                            data={item?.multi_media}
                            videoLayout={event => this.handleVideoLayout(event)}
                          />
                        ) : null}
                        {item?.description?.includes('http://') ||
                        item?.description?.includes('https://') ? (
                          <Hyperlink
                            linkStyle={styles.blueText}
                            onPress={(url, text) =>
                              this.props.navigation.navigate(route.VIEWURL, {
                                url: url,
                              })
                            }>
                            <View style={styles.descriptionContainer}>
                              {item.description != '' ? (
                                item.description?.length > 100 ||
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
                          <View style={styles.descriptionContainer}>
                            {item.description != '' ? (
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
                                  <Text style={styles.description}>
                                    {item.description}
                                  </Text>
                                </ReadMore>
                              ) : (
                                <Text style={styles.description}>
                                  {item.description}
                                </Text>
                              )
                            ) : null}
                          </View>
                        )}
                        {item.tag_users?.length > 0 && (
                          <View style={styles.tagUserContainer}>
                            {item.tag_users.map(val => {
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
                                        fontSize: themeStyle.FONT_SIZE_SMALL,
                                      },
                                    ]}>
                                    @{val.username}{' '}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                        <View style={styles.bottomButtonsContainer}>
                          <View style={styles.row1}>
                            <TouchableOpacity
                              onPress={() =>
                                this.handleLikeFunction(item, index)
                              }
                              style={styles.impressionContainer}>
                              {item.likes?.length > 0 ? (
                                <Like />
                              ) : (
                                <LikeDisabled />
                              )}
                              <Text style={styles.impressionsText}>
                                {moneyFormat(
                                  item.likes ? item.likes?.length : 0,
                                )}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate(
                                  route.SOCIALSINGLEPOST,
                                  {data: item._id},
                                )
                              }
                              style={styles.impressionContainer}>
                              <Comment />
                              <Text style={styles.impressionsText}>
                                {moneyFormat(
                                  item?.comment_count ? item?.comment_count : 0,
                                )}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : (
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
                                      )} at ${moment(item?.created_at).format(
                                        'h:mm a',
                                      )}`
                                    : moment(item?.created_at).fromNow()}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <View style={styles.row}>
                              {item?.sharedBy?.social_username?.length > 0 ? (
                                <View style={[styles.row, styles.marginRight5]}>
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
                                  this.setState({
                                    postMenu: true,
                                    postItem: item,
                                    postIndex: index,
                                  });
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
                                          fontFamily: themeStyle.FONT_BOLD,
                                          color: themeStyle.COLOR_BLACK,
                                          fontSize: themeStyle.FONT_SIZE_SMALL,
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
                              this.props.navigation.navigate(route.VIEWURL, {
                                url: url,
                              })
                            }>
                            <View style={styles.linkContainer}>
                              <View style={styles.linkInnerContainer}>
                                <Text style={styles.linkText} numberOfLines={1}>
                                  {item?.link}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => this.copyLink(item?.link)}>
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
                              {item.likes?.length > 0 ? (
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
                  })}
                </ScrollView>
              </Viewport.Tracker>
            )}
          </View>
        )}
        <SearchMenu
          visible={this.state.visible}
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
        <BottomMenu
          visible={postMenu}
          onClose={() => this.setState({postMenu: false})}
          data={[
            {
              icon: Save,
              name: 'Unsave post',
              onPress: () => {
                this.setState({postMenu: false});
                !this.props.user.userData.is_social_profile_created ||
                this.state.unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.handleSavePost(postItem?._id);
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

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialSavedPost);
