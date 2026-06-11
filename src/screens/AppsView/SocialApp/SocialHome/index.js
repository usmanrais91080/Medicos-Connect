import {useScrollToTop} from '@react-navigation/native';
import {Viewport} from '@skele/components';
import moment from 'moment';
import React, {Component} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import ReadMore from 'react-native-read-more-text';
import themeStyle from '../../../../assets/styles/theme.style';
import Comment from '../../../../assets/svg/comment.svg';
import LikeDisabled from '../../../../assets/svg/like-disabled.svg';
import Like from '../../../../assets/svg/like.svg';
import Daaki from '../../../../assets/svg/daaki.svg';
import Gift from '../../../../assets/svg/gift.svg';
import Repost from '../../../../assets/svg/repost.svg';
import {Container, Icon, PostMediaViewContainer} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {moneyFormat} from '../../../../lib/utils/global';
import styles from './style';
import Link from '../../../../assets/svg/link-new-white.svg';
import ShimmerLoader from '../../../../components/ShimmerLoader';
const urlRegex = require('url-regex');

class SocialHome extends Component {
  constructor(props) {
    super(props);
  }

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

  _renderPost = (item, index) => {
    let likeFound = item?.likes?.filter(
      val => val?._id === this.props.user.userData?._id,
    );
    let spaces = item?.description?.split('\n');
    const {unverifiedUser} = this.props;
    return item.content_type == 'MEDIA' ? (
      <View style={styles.postLine}>
        <View
          style={[
            styles.headerRow,
            {
              paddingHorizontal: 20,
            },
          ]}>
          <Pressable
            onPress={() => {
              !this.props.user.userData.is_social_profile_created ||
              unverifiedUser
                ? this.props.showNewUserAlertFunction()
                : null;
              this.props.navigation.navigate(route.SOCIALPROFILE, {
                data: item.user._id,
              });
            }}
            style={styles.row}>
            <Avatar
              source={{
                uri: item?.user?.social_image
                  ? `${item?.user?.social_image}`
                  : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                cache: 'force-cache',
              }}
              rounded
              size={40}
            />
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.nameText}>
                {item.user.social_username
                  ? item.user.social_username
                  : 'John Doe'}
              </Text>
              <Text style={styles.grayText}>
                {moment(item.created_at) < moment()
                  ? `${moment(item.created_at).format('DD MMMM')} at ${moment(
                      item.created_at,
                    ).format('h:mm a')}`
                  : moment(item.created_at).fromNow()}
              </Text>
            </View>
          </Pressable>
          <View style={styles.row}>
            {item?.sharedBy?.social_username?.length > 0 ? (
              <View style={[styles.row, {marginRight: 5}]}>
                <Repost />
                <View style={styles.sharedByContainer}>
                  <Text style={styles.sharedByText}>Shared by</Text>
                  <Text style={styles.sharedByUserName}>
                    {item?.sharedBy?.social_username}
                  </Text>
                </View>
              </View>
            ) : null}
            <Pressable
              onPress={() => {
                if (
                  !this.props.user.userData.is_social_profile_created ||
                  unverifiedUser
                ) {
                  this.props.showNewUserAlertFunction();
                } else {
                  if (item.user._id != this.props.user.userData._id) {
                    this.props.postMenu(item, index);
                  } else {
                    this.props.postMenu1(item, index);
                  }
                }
              }}>
              <Icon.Entypo name="dots-three-vertical" size={20} color="gray" />
            </Pressable>
          </View>
        </View>
        {item?.multi_media?.length > 0 ? (
          <PostMediaViewContainer
            // paused={this.state.paused}
            data={item?.multi_media}
            videoLayout={event => this.handleVideoLayout(event)}
          />
        ) : null}
        {urlRegex().test(item?.description) ||
        item?.description?.includes('http://') ||
        item?.description?.includes('https://') ? (
          <Hyperlink
            linkStyle={styles.blueText}
            onPress={(url, text) =>
              this.props.navigation.navigate(route.VIEWURL, {
                url: url,
              })
            }>
            <View
              style={{
                paddingTop: item?.description?.length > 0 ? '2%' : 0,
                paddingBottom: item?.description?.length > 0 ? '1%' : 0,
                backgroundColor: 'yellow',
                paddingHorizontal: '4.5%',
              }}>
              {item?.description != '' ? (
                item?.description?.length > 100 || spaces.length > 2 ? (
                  <ReadMore
                    numberOfLines={2}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}>
                    <Text style={styles.grayText}>{item.description}</Text>
                  </ReadMore>
                ) : (
                  item.description && (
                    <Text style={styles.grayText}>{item.description}</Text>
                  )
                )
              ) : null}
            </View>
          </Hyperlink>
        ) : (
          <View
            style={{
              paddingTop: item?.description?.length > 0 ? '2%' : 0,
              paddingBottom: item?.description?.length > 0 ? '1%' : 0,
              paddingHorizontal: '4.5%',
            }}>
            {item.description != '' ? (
              item?.description?.length > 100 || spaces?.length > 2 ? (
                <ReadMore
                  numberOfLines={2}
                  renderTruncatedFooter={this._renderTruncatedFooter}
                  renderRevealedFooter={this._renderRevealedFooter}>
                  <Text style={styles.grayText}>{item?.description}</Text>
                </ReadMore>
              ) : (
                item?.description && (
                  <Text style={styles.grayText}>{item?.description}</Text>
                )
              )
            ) : null}
          </View>
        )}
        {item.tag_users?.length > 0 ? (
          <View style={styles.userTagContainer}>
            {item.tag_users?.map(val => {
              return (
                <Pressable
                  onPress={() =>
                    !this.props.user.userData.is_social_profile_created ||
                    unverifiedUser
                      ? this.props.showNewUserAlertFunction()
                      : this.props.navigation.navigate(route.SOCIALPROFILE, {
                          data: val._id,
                        })
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
                </Pressable>
              );
            })}
          </View>
        ) : null}
        <View style={styles.linkContainer2}>
          <View style={styles.row}>
            <Pressable
              onPress={() =>
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.handleLikeFunction(item, index)
              }
              style={styles.impressionContainer}>
              {likeFound.length > 0 ? <Like /> : <LikeDisabled />}
              <Text style={styles.impressionsText}>
                {moneyFormat(item.likes ? item.likes.length : 0)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
                      data: item._id,
                      content_type: item.content_type,
                    })
              }
              style={styles.impressionContainer}>
              <Comment />
              <Text style={styles.impressionsText}>
                {moneyFormat(item?.comments ? item?.comments : 0)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.handleRepost(item._id);
              }}
              style={styles.highFiveContainer}>
              <Repost />
            </Pressable>
          </View>
          <View style={styles.flexDirectionRow}>
            {item.user?._id != this.props.user.userData?._id ? (
              <Pressable
                style={styles.impressionContainer}
                onPress={() => {
                  !this.props.user.userData.is_social_profile_created ||
                  unverifiedUser
                    ? this.props.showNewUserAlertFunction()
                    : this.props.openGiftModal(
                        item?.user?._id,
                        item?.user?.social_username,
                      );
                }}>
                <Gift />
              </Pressable>
            ) : null}
            {item.user?._id != this.props.user.userData?._id ? (
              <Pressable
                style={styles.impressionContainer}
                onPress={() =>
                  !this.props.user.userData.is_social_profile_created ||
                  unverifiedUser
                    ? this.props.showNewUserAlertFunction()
                    : this.props.openDaakiModal(item)
                }>
                <Daaki fill={'#91BFE1'} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.postLine}>
        <View style={styles.pollContainer}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => {
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : null;
                this.props.navigation.navigate(route.SOCIALPROFILE, {
                  data: item?.user._id,
                });
              }}
              style={styles.row}>
              <Avatar
                source={{
                  uri: item?.user?.social_image
                    ? `${item?.user?.social_image}`
                    : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                  cache: 'force-cache',
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
                      )} at ${moment(item?.created_at).format('h:mm a')}`
                    : moment(item?.created_at).fromNow()}
                </Text>
              </View>
            </Pressable>
            <View style={styles.row}>
              {item?.sharedBy?.social_username?.length > 0 ? (
                <View style={[styles.row, {marginRight: 5}]}>
                  <Repost />
                  <View style={styles.sharedByContainer}>
                    <Text style={styles.sharedByText}>Shared by</Text>
                    <Text style={styles.sharedByUserName}>
                      {item?.sharedBy?.social_username}
                    </Text>
                  </View>
                </View>
              ) : null}
              <Pressable
                onPress={() => {
                  if (
                    !this.props.user.userData.is_social_profile_created ||
                    unverifiedUser
                  ) {
                    this.props.showNewUserAlertFunction();
                  } else {
                    if (item.user?._id != this.props.user.userData?._id) {
                      this.props.postMenu(item, index);
                    } else {
                      this.props.postMenu1(item, index);
                    }
                  }
                }}>
                <Icon.Entypo
                  name="dots-three-vertical"
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>
          </View>

          {urlRegex().test(item?.description) ||
          item?.description?.includes('http://') ||
          item?.description?.includes('https://') ? (
            <Hyperlink
              linkStyle={styles.blueText}
              onPress={(url, text) =>
                this.props.navigation.navigate(route.VIEWURL, {
                  url: url,
                })
              }>
              <View
                style={{
                  paddingTop: item?.description?.length > 0 ? '2%' : 0,
                  paddingBottom: item?.description?.length > 0 ? '1%' : 0,
                  paddingHorizontal: '4.5%',
                }}>
                {item?.description != '' ? (
                  item?.description?.length > 100 || spaces.length > 2 ? (
                    <ReadMore
                      numberOfLines={2}
                      renderTruncatedFooter={this._renderTruncatedFooter}
                      renderRevealedFooter={this._renderRevealedFooter}>
                      <Text style={styles.pollDescription}>
                        {item?.description}
                      </Text>
                    </ReadMore>
                  ) : (
                    <Text style={styles.pollDescription}>
                      {item?.description}
                    </Text>
                  )
                ) : null}
              </View>
            </Hyperlink>
          ) : (
            <View>
              {item.description != '' ? (
                item?.description?.length > 100 || spaces?.length > 2 ? (
                  <ReadMore
                    numberOfLines={2}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}>
                    <Text style={styles.pollDescription}>
                      {item?.description}
                    </Text>
                  </ReadMore>
                ) : (
                  item?.description && (
                    <Text style={styles.pollDescription}>
                      {item?.description}
                    </Text>
                  )
                )
              ) : null}
            </View>
          )}
          {item?.content_type == 'POLL' ? (
            <View style={styles.optionInput}>
              <Text style={styles.pollText}>{item?.pollText}</Text>
            </View>
          ) : null}
          {item?.choices?.map((choice, choiceIndex) => {
            const totalVotes = item?.total_votes || 1;
            const percentage = (choice?.votes / totalVotes) * 100;
            return (
              <Pressable
                style={styles.options}
                onPress={() =>
                  this.props.handlePollVoting(item._id, choice._id, index)
                }>
                <View
                  style={[
                    styles.optionNumber,
                    {
                      width: percentage > 12 ? `${percentage - 0.6}%` : '12%',
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
            <View style={styles.row}>
              {item.tags?.map(val => {
                return (
                  <Pressable
                    style={styles.userTag}
                    disabled
                    onPress={() =>
                      !this.props.user.userData.is_social_profile_created ||
                      unverifiedUser
                        ? this.props.showNewUserAlertFunction()
                        : this.props.navigation.navigate(route.SOCIALPROFILE, {
                            data: val._id,
                          })
                    }>
                    <Text style={[styles.grayText, styles.userTagText]}>
                      @{val?.user?.social_username}{' '}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
        {item?.link ? (
          <Hyperlink
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
                <Pressable onPress={() => this.props.copyLink(item?.link)}>
                  <Link />
                </Pressable>
              </View>
            </View>
          </Hyperlink>
        ) : null}
        <View style={styles.linkContainer2}>
          <View style={styles.row}>
            <Pressable
              onPress={() =>
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.handleLikeFunction(item, index)
              }
              style={styles.highFiveContainer}>
              {likeFound.length > 0 ? <Like /> : <LikeDisabled />}
              <Text style={styles.impressionsText}>
                {moneyFormat(item.likes ? item.likes.length : 0)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
                      data: item._id,
                    })
              }
              style={styles.highFiveContainer}>
              <Comment />
              <Text style={styles.impressionsText}>
                {moneyFormat(item?.comments ? item?.comments : 0)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                !this.props.user.userData.is_social_profile_created ||
                unverifiedUser
                  ? this.props.showNewUserAlertFunction()
                  : this.props.handleRepost(item._id);
              }}
              style={styles.highFiveContainer}>
              <Repost />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            {item.user?._id != this.props.user.userData?._id ? (
              <Pressable
                style={styles.highFiveContainer}
                onPress={() => {
                  !this.props.user.userData.is_social_profile_created ||
                  unverifiedUser
                    ? this.props.showNewUserAlertFunction()
                    : this.props.openGiftModal(
                        item?.user?._id,
                        item?.user?.social_username,
                      );
                }}>
                <Gift />
              </Pressable>
            ) : null}
            {item.user?._id != this.props.user.userData?._id ? (
              <Pressable
                style={styles.highFiveContainer}
                onPress={() =>
                  !this.props.user.userData.is_social_profile_created ||
                  unverifiedUser
                    ? this.props.showNewUserAlertFunction()
                    : this.props.openDaakiModal(item)
                }>
                <Daaki fill={themeStyle.CYAN_BLUE} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {loadingPost} = this.props;
    return (
      <Container>
        <View style={styles.container}>
          {this.props?.postList?.length == 0 ? (
            <>
              <ShimmerLoader />
              <ShimmerLoader />
              <ShimmerLoader />
            </>
          ) : (
            <Viewport.Tracker>
              <FlatList
                data={this.props?.postList}
                renderItem={({item, index}) => this._renderPost(item, index)}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.props.handleLoadMore}
                onEndReachedThreshold={0.5}
                windowSize={5}
                scrollEnabled={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListFooterComponent={
                  loadingPost ? (
                    <>
                      <ShimmerLoader />
                      <ShimmerLoader />
                      <ShimmerLoader />
                    </>
                  ) : null
                }
              />
            </Viewport.Tracker>
          )}
        </View>
      </Container>
    );
  }
}

function SocialHome1(props) {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <SocialHome {...props} scrollRef={ref} />;
}

export default SocialHome1;
