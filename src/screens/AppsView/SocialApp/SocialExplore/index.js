import React, {Component} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, Input} from 'react-native-elements';
import MasonryList from 'react-native-masonry-list';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import Search from '../../../../assets/svg/search-black.svg';
import {Container, HeaderLeft, Icon, Loader} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import {SocialServices} from '../../../../services';
import SearchMenu from '../SocialMenu';
import JobsFavItem from './social.explore.componet';
import styles from './style';

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      images: [],
      explore: [],
      loading: true,
      refereshing: false,
      imageDim: [
        {dimensions: {width: 1080, height: 1920}},
        {dimensions: {width: 1000, height: 667}},
        {dimensions: {width: 1080, height: 1920}},
        {dimensions: {width: 694, height: 533}},
      ],
      userFound: [],
      seacrhModal: false,
      loadingUser: true,
      page: 1,
      offset: 10,
      stopFetchMore: true,
      refreshing: false,
      showInput: false,
    };
  }

  componentDidMount = () => {
    const {showInput} = this.state;
    this.getExplore();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerTitle: showInput ? '' : 'Search',
      headerLeft: () => (
        <HeaderLeft
          color={themeStyle.COLOR_BLACK}
          navigation={this.props.navigation}
        />
      ),
    });
  };

  headerRight = () => {
    const {showInput} = this.state;
    return (
      <View style={styles.headerStyle}>
        {showInput && (
          <View style={{width: '100%'}}>
            <Input
              placeholder="Search"
              autoCapitalize="none"
              onFocus={() => this.setState({seacrhModal: true})}
              containerStyle={styles.containerStyle1}
              placeholderTextColor={themeStyle.COLOR_BLACK}
              onChangeText={text => this.filterUsers(text)}
              inputContainerStyle={{
                ...styles.inputContainerStyle1,
                backgroundColor: themeStyle.YELLOW,
              }}
              inputStyle={styles.inputStyle1}
              value={this.state.value}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                }
              }}
            />
          </View>
        )}
        {!showInput && (
          <TouchableOpacity
            onPress={() => {
              this.setState({showInput: true}, () => {
                this.componentDidMount();
              });
            }}
            style={{marginRight: 10}}
          >
            <Search />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => this.setState({visible: true})}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_BLACK}
          />
        </TouchableOpacity>
      </View>
    );
  };

  addMoreImages(newImages) {
    this.setState({
      images: this.state.images.concat(newImages),
    });
  }

  renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="cover"
        source={{uri: item.uri}}
        style={
          index == 0
            ? styles.imageStyle
            : index == 1 || index == 2
            ? styles.imageStyle1
            : styles.imageStyle
        }
      />
    );
  };

  getExplore = () => {
    const {imageDim} = this.state;
    SocialServices.getExplorePosts(
      this.state.page,
      this.state.offset,
      this.props.user.userData.token,
    )
      .then(res => {
        if (res.data.code == 200) {
          let array = [];
          let data = [...res.data.data];
          data.map((item, index) => {
            if (item?.multi_media[0]?.file.includes('.mp4') == false) {
              let loadIndex = Math.floor(Math.random() * 4);
              array.push({
                id: item?._id,
                uri: item?.multi_media[0]?.file,
                dimensions: imageDim[loadIndex].dimensions,
              });
            }
          });
          this.setState({
            explore: array,
            loading: false,
            refreshing: false,
            page: this.state.page + 1,
          });
        }
      })
      .catch(err => {
        this.setState({explore: [], loading: false, refreshing: false});
      });
  };

  getSearch = data => {
    SocialServices.getUserNameSearch(data, this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({userFound: res.data.data, loadingUser: false});
        }
      })
      .catch(err => {
        this.setState({userFound: [], loadingUser: false});
      });
  };

  filterUsers = text => {
    if (text.length > 0) {
      const textData = text.toLowerCase();
      this.getSearch(textData);
    }
  };
  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <JobsFavItem item={item} navigation={this.props.navigation} />
      </>
    );
  };

  endReached = () => {
    if (!this.state.stopFetchMore) {
      const {imageDim} = this.state;
      this.setState({refreshing: true});
      SocialServices.getExplorePosts(
        this.state.page,
        this.state.offset,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [];
          let data = [...res.data.data];
          if (data.length > 0) {
            data.map((item, index) => {
              if (item?.multi_media[0]?.file.includes('.mp4') == false) {
                let loadIndex = Math.floor(Math.random() * 4);
                array.push({
                  id: item?._id,
                  uri: item?.multi_media[0]?.file,
                  dimensions: imageDim[loadIndex].dimensions,
                });
              }
            });
          }

          this.setState({
            stopFetchMore: data.length == 0 ? false : true,
            explore: this.state.explore.concat(array),
            newData: data,
            page: data.length == 0 ? this.state.page : this.state.page + 1,
            offset: this.state.offset,
            loadingPost: false,
            refreshing: false,
          });
        })
        .catch(err => {
          // console.log(err);
          this.setState({explore: this.state.explore, refreshing: false});
        });
    }
  };
  handleRefreshing = () => {
    const {imageDim} = this.state;
    this.setState({refreshing: true});
    SocialServices.getExplorePosts(
      1,
      this.state.offset,
      this.props.user.userData.token,
    )
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        if (data.length > 0) {
          data.map((item, index) => {
            if (item?.multi_media[0]?.file.includes('.mp4') == false) {
              let loadIndex = Math.floor(Math.random() * 4);
              array.push({
                id: item?._id,
                uri: item?.multi_media[0]?.file,
                dimensions: imageDim[loadIndex].dimensions,
              });
            }
          });
        }

        this.setState({
          explore: array,
          page: 1,
          offset: this.state.offset,
          refreshing: false,
        });
      })
      .catch(err => {
        // console.log(err);
        this.setState({explore: this.state.explore, refreshing: false});
      });
  };
  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    const {loading, refreshing, explore, seacrhModal, userFound, loadingUser} =
      this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : seacrhModal ? (
          loadingUser ? (
            <View style={{alignSelf: 'center'}}>
              <Text>Type something...</Text>
            </View>
          ) : userFound.length > 0 ? (
            <FlatList
              ItemSeparatorComponent={VerticalSpacer}
              data={userFound}
              renderItem={({item, index}) =>
                this._renderBestMatchItem(item, index)
              }
            />
          ) : (
            <View style={{alignSelf: 'center'}}>
              <Text>No users found.</Text>
            </View>
          )
        ) : explore.length > 0 ? (
          <ScrollView
            ref={e => (this.scroll = e)}
            onScroll={({nativeEvent}) => {
              if (this.isCloseToBottom(nativeEvent))
                this.setState({page: this.state.page + 1}, () =>
                  this.endReached(),
                );
            }}
            // scrollEventThrottle={700}

            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  this.handleRefreshing();
                }}
              />
            }
            contentContainerStyle={{paddingBottom: '30%'}}
            onScrollBeginDrag={() => {
              this.setState({stopFetchMore: false});
            }}
          >
            <MasonryList
              columns={2}
              sorted={true}
              contentContainerStyle={{paddingBottom: '30%'}}
              completeCustomComponent={(item, index) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
                          data: item.data.id,
                        })
                      }
                    >
                      <Image
                        source={item.source}
                        style={{
                          height: item.style.height,
                          width: item.style.width,
                          margin: item.style.margin,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              spacing={1}
              onEndReached={() => {
                this.endReached();
              }}
              images={explore}
              containerWidth={SCREEN_WIDTH}
            />
          </ScrollView>
        ) : (
          <Text>No explore posts found</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
