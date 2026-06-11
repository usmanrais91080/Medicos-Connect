import React, {Component} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import moment from 'moment';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  ColorButton,
  Container,
  DeleteModal,
  HorizontalList,
  Icon,
  Loader,
} from '../../../../components';
import Save from '../../../../assets/svg/save.svg';
import deleteGif from '../../../../assets/svg/delete-Gif-Mental.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import {logError, VerticalSpacer} from '../../../../lib/utils/global';
import {
  AdsServices,
  ClassifiedServices,
  MentalServices,
} from '../../../../services';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {BottomMenu, PostComponent} from '../MentalHome/mental.home.component';
import {bindActionCreators} from 'redux';
import {mentalHealthActions} from '../../../../redux/actions/mentalHealth';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';

class MentalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      posts: [
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
      loading: true,
      refreshing: false,
      alertModal: false,
      msgToDisplay: '',
      topAds: [],
      topLoading: true,
      activeSlide: 0,
      openMenu: false,
      post: {},
      postIndex: 0,
      reportId: '1',
      reportIndex: 0,
      showReportModal: false,
      reportReason: '',
      deleteModal: '',
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
    };
  }

  componentDidMount = () => {
    this.setState({
      loading: this.props.profile?.length > 0 ? false : true,
      posts: this.props.profile,
    });
    this.getUserPosts();
    // this.props.navigation.setOptions({
    //   headerRight: () => this.headerRight(),
    // });
  };

  headerRight = () => {
    // Route to save posts
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(route.MENTALPOSTSAVE)}
          style={{marginRight: 5}}>
          <Save />
        </TouchableOpacity>
      </View>
    );
  };

  getUserPosts = () => {
    MentalServices.getUserPosts(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            posts: res.data.data,
            loading: false,
          });
          this.props.mentalAction.mentalHealthProfile(res?.data?.data);
        }
      })
      .catch(err => {
        // console.log('Error>>>>>>>>>>', err);

        this.setState({loading: false});
      });
  };

  changeDeleteModal = () => {
    setTimeout(() => {
      this.setState({deleteModal: true});
    }, 1000);
  };

  chooseFile = () => {
    this.props.navigation.navigate(route.MENTALSETTINGS, {
      prev_screen: 'Profile',
    });
  };

  handleLikeFunction = (item, index) => {
    const {posts} = this.state;
    let tempLike = {
      _id: this.props?.user?.userData?._id,
      username: this.props?.user?.userData?.mental_health_username,
      image: this.props?.user?.userData?.mental_health_image,
    };
    if (item.likes.length > 0) {
      if (item?.is_post_liked) {
        let post = [...posts];
        let newLike = post[index].likes.filter(val => {
          if (val._id != this.props?.user?.userData?._id) return val;
        });
        post[index].likes = newLike;
        post[index].is_post_liked = false;
        this.setState({posts: post});
      } else {
        let post = [...posts];
        post[index].likes.push(tempLike);
        post[index].is_post_liked = true;
        this.setState({posts: post});
      }
    } else {
      let post = [...posts];
      post[index].likes.push(tempLike);
      post[index].is_post_liked = true;
      this.setState({posts: post});
    }

    MentalServices.likeOrUnlikePost(item._id, this.props.user.userData.token)
      .then(res => {
        // this.handleRefreshing1();
      })
      .catch(err => {
        // console.log('like error>>>>>>>>', err);
        this.setState({loading: false, refreshing: false});
      });
  };

  handleDeletePost = postId => {
    MentalServices.deletePost(postId, this.props.user.userData.token)
      .then(res => {
        this.setState({
          msgToDisplay: `${res?.data?.message}`,
          alertModal: true,
        });
      })
      .catch(err => {
        // console.log('err>>>>>>>>>>>>>>>', err.response.data);
      });
  };

  handlePinPost = item => {
    MentalServices.pinPost(item?._id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          msgToDisplay: `${res?.data?.message}`,
          alertModal: true,
        });
      })
      .catch(err => {
        // console.log('err>>>>>>>>>>>>>>>', err);
      });
  };

  handleRefreshing = () => {
    this.getUserPosts();
  };

  handleReportPost = () => {
    let postData = {
      post_id: this.state.reportId,
      description: this.state.reportReason,
      type: 'Post',
    };
    MentalServices.reportPost(postData, this.props.user.userData.token)
      .then(res => {
        setTimeout(() => {
          this.setState({
            msgToDisplay: `${res?.data?.message}`,
            alertModal: true,
          });
        }, 500);
      })
      .catch(err => {
        // console.log('err>>>>>>>>>>>>', err);
      });
  };

  render() {
    const {
      alertModal,
      msgToDisplay,
      openMenu,
      post,
      postIndex,
      loading,
      unverifiedUser,
    } = this.state;
    return (
      <Container color>
        {/* User pic and Name */}
        <View
          style={{
            width: SCREEN_WIDTH * 0.85,
            alignSelf: 'center',
            marginVertical: '5%',
            // justifyContent: 'center',
          }}>
          <View style={{alignSelf: 'center', marginBottom: '5%'}}>
            <Avatar
              source={{
                uri:
                  this.props.user.userData.mental_health_image != ''
                    ? this.props.user.userData.mental_health_image
                    : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
              }}
              rounded
              size={80}>
              {/* <Avatar.Accessory
                type="feather"
                name="plus"
                color={themeStyle.COLOR_YELLOW}
                onPress={() => this.chooseFile()}
                size={25}
                style={{
                  backgroundColor: '#e9e9e9',
                  borderRadius: 5,
                  height: 30,
                  width: 30,
                  left: 0,
                }}></Avatar.Accessory> */}
            </Avatar>
            <Text
              style={{
                // marginLeft: 10,
                marginTop: '2%',
                textAlign: 'center',
                fontFamily: themeStyle.FONT_MEDIUM,
                color: themeStyle.MENTAL_PRIMARY,
                fontSize: 15,
              }}>
              {this.props.user.userData.mental_health_username}
            </Text>
          </View>

          {loading ? (
            <View style={{marginVertical: '10%'}}>
              <Loader />
            </View>
          ) : (
            <>
              <Text
                style={{
                  // marginLeft: 10,
                  marginBottom: '2%',
                  // textAlign: 'center',
                  fontFamily: themeStyle.FONT_LIGHT,
                  color: themeStyle.COLOR_BLACK_LIGHT,
                }}>
                {'Your Posts'}
              </Text>
              <ScrollView
                // ref={e => (this.scroll = e)}
                // onScroll={({nativeEvent}) => {
                //   if (this.isCloseToBottom(nativeEvent))
                //     this.setState({page: this.state.page + 1}, () =>
                //       this.endReached(),
                //     );
                //   if (nativeEvent.contentOffset.y > 296) {
                //     this.changeStoriesLayout(true);
                //   } else {
                //     this.changeStoriesLayout(false);
                //   }
                // }}
                // scrollEventThrottle={700}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.state.refreshing}
                //     onRefresh={() => {
                //       this.handleRefreshing();
                //     }}
                //   />
                // }
                contentContainerStyle={{paddingBottom: '60%'}}
                // onScrollBeginDrag={() => {
                //   this.setState({stopFetchMore: false});
                // }}
              >
                {this.state.posts.map((post, index) => (
                  <PostComponent
                    clickPost={() =>
                      this.props.navigation.navigate(route.MENTALPOSTDETAIL, {
                        data: post?._id,
                      })
                    }
                    item={post}
                    index={index}
                    unverifiedUser={unverifiedUser}
                    clickLike={this.handleLikeFunction}
                    clickMenu={() => {
                      this.setState({
                        post: post,
                        openMenu: true,
                        postIndex: index,
                        reportIndex: index,
                        reportId: post?._id,
                      });
                    }}
                    // showNewUserAlertFunction={this.showNewUserAlertFunction}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </View>

        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => this.getUserPosts());
          }}
          text={msgToDisplay}
        />
        <BottomMenu
          visible={openMenu}
          user={this.props.user.userData}
          post={post}
          index={postIndex}
          editPost={() =>
            this.props.navigation.navigate(route.MENTALPOSTCREATE, {post: post})
          }
          deletePost={this.handleDeletePost}
          pinPost={this.handlePinPost}
          onClose={() => {
            this.setState({openMenu: false});
          }}
          deleteModal={this.changeDeleteModal}
        />
        <BottomDeleteMenu
          visible={this.state.deleteModal}
          onClose={() => this.setState({deleteModal: false})}
          data={{
            icon: deleteGif,
            text: 'Are you sure you want to delete this?',
            buttonText: 'Delete',
            onPress: () => {
              this.setState({deleteModal: false}, () =>
                this.handleDeletePost(post?._id),
              );
            },
          }}
          theme="mental"
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    region: state.searchReducer.regionValue || {},
    profile: state.mentalHealthReducer?.mentalProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mentalAction: bindActionCreators(mentalHealthActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MentalProfile);
