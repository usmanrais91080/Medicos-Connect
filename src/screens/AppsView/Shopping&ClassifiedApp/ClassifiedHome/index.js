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
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, DeleteModal, Icon, Loader} from '../../../../components';
import Search from '../../../../assets/svg/white-search.svg';
import Swap from '../../../../assets/svg/swap.svg';
import Swaped from '../../../../assets/svg/swapfill.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import ClassifiedMenu from '../ClassifiedMenu';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {
  AdsServices,
  ClassifiedServices,
  ProfileServices,
} from '../../../../services';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {authActions} from '../../../../redux/actions/auth';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_CLASSIFIED,
  iconColor: themeStyle.COLOR_WHITE,
};

class ClassifiedHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ads: [],
      loading: false,
      refreshing: false,
      alertModal: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      msgToDisplay: '',
      topAds: [],
      topLoading: true,
      activeSlide: 0,
      page: 1,
      offset: 6,
      stopFetchMore: false,
      loadingMore: false,
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getProductAds();
    });
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {screen: route.HOME})
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  getTopBanner = () => {
    AdsServices.getAds(
      'Classified Slider Ads',
      'Classified Banner',
      this.props.region,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({topAds: res.data.data, topLoading: false});
      })
      .catch(err => {
        this.setState({topLoading: false});
      });
  };

  headerRight = () => {
    const {unverifiedUser} = this.state;
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_classified_profile_created ||
            unverifiedUser
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_classified_profile_created,
                )
              : this.props.navigation.navigate(route.CLASSIFIEDSEARCH, {
                  addData: this.state.ads,
                })
          }>
          <Search fill={themeStyle.COLOR_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            !this.props.user.userData.is_classified_profile_created ||
            unverifiedUser
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_classified_profile_created,
                )
              : this.setState({visible: true})
          }
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  getProductAds = () => {
    ClassifiedServices.getProducts(
      this.props.user.userData.token,
      this.state.page,
      this.state.offset,
    )
      .then(res => {
        if (res.data.code == 200) {
          this.setState(
            {ads: res.data.data, refreshing: false, loading: false},
            () => this.getTopBanner(),
          );
        }
      })
      .catch(err => {
        this.setState({ads: [], refreshing: false, loading: false});
      });
  };

  _loadMore = () => {
    if (!this.state.stopFetchMore) {
      const {page, offset, ads} = this.state;
      ClassifiedServices.getProducts(
        this.props.user.userData.token,
        page,
        offset,
      )
        .then(res => {
          this.setState({
            ads: this.state.ads.concat(res.data.data),
            loadingMore: false,
            page: res.data?.data?.length == 0 ? page : page + 1,
            stopFetchMore: res.data?.data?.length == 0 ? true : false,
          });
        })
        .catch(err => {
          this.setState({loadingMore: false});
        });
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  onScrollDragBegin = () => {
    this.setState({stopFetchMore: false});
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent)) {
      this.setState({page: this.state.page + 1, loadingMore: true}, () => {
        this._loadMore();
      });
    }
  };

  truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num);
  };

  AddToWishlist = (id, index) => {
    const {ads} = this.state;
    let tempAds = [...ads];
    tempAds[index].in_wishlist = true;
    this.setState({
      ads: tempAds,
      msgToDisplay: 'Added to wishlist successfully',
      alertModal: true,
    });

    ClassifiedServices.addProductToWishlist(id, this.props.user.userData.token)
      .then(res => {})
      .catch(err => null);
  };

  removeFromWishlist = (id, index) => {
    const {ads} = this.state;
    let tempAds = [...ads];
    tempAds[index].in_wishlist = false;
    this.setState({
      ads: tempAds,
      msgToDisplay: 'Removed from wishlist successfully',
      alertModal: true,
    });
    ClassifiedServices.removeProductFromWishlist(
      id,
      this.props.user.userData.token,
    )
      .then(res => {})
      .catch(err => null);
  };

  _renderAdsItem = ({item, index}) => {
    const {unverifiedUser} = this.state;
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          !this.props.user.userData.is_classified_profile_created ||
          unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_classified_profile_created,
              )
            : this.props.navigation.navigate(route.CLASSIFIEDPRODUCTDETAIL, {
                productId: item._id,
                currency: this.props.currency?.symbol,
              })
        }
        style={styles.itemContainer}>
        <View>
          <ImageBackground
            source={{
              uri:
                item?.images?.length > 0
                  ? item?.images[0]
                  : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
            }}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            style={styles.imageStyle}>
            <View style={{alignItems: 'flex-end', padding: '5%'}}>
              {item.in_wishlist ? (
                <TouchableOpacity
                  onPress={() =>
                    !this.props.user.userData.is_classified_profile_created ||
                    unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData
                            .is_classified_profile_created,
                        )
                      : this.removeFromWishlist(item._id, index)
                  }>
                  <Icon.AntDesign
                    name="heart"
                    size={20}
                    color={themeStyle.CLASSIFIED_HOME}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    !this.props.user.userData.is_classified_profile_created ||
                    unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData
                            .is_classified_profile_created,
                        )
                      : this.AddToWishlist(item._id, index)
                  }>
                  <Icon.AntDesign name="heart" size={20} color={'#E0E0E0'} />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{alignItems: 'flex-end', padding: '5%', marginTop: 20}}>
              {item.is_barter ? (
                <TouchableOpacity
                  onPress={() =>
                    !this.props.user.userData.is_classified_profile_created ||
                    unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData
                            .is_classified_profile_created,
                        )
                      : this.props.navigation.navigate(
                          route.CLASSIFIEDPRODUCTDETAIL,
                          {
                            productId: item._id,
                            currency: this.props.currency?.symbol,
                          },
                        )
                  }>
                  <Swaped />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    !this.props.user.userData.is_classified_profile_created ||
                    unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData
                            .is_classified_profile_created,
                        )
                      : this.props.navigation.navigate(
                          route.CLASSIFIEDPRODUCTDETAIL,
                          {
                            productId: item._id,
                            currency: this.props.currency?.symbol,
                          },
                        )
                  }>
                  <Swap />
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.grayText}>{item.name}</Text>
          <Text style={styles.blackText}>
            {item.price} {item?.currency_name}
          </Text>
          <View style={styles.rowStyle}>
            <Text style={styles.grayText}>
              {this.truncateString(item.title, 20)}
            </Text>
            <Text style={styles.grayText}>
              {item?.user?.created_at &&
                moment(item.user.created_at).format('DD MMM')}
            </Text>
          </View>
          {item.is_barter ? (
            <View style={styles.rowStyle}>
              <Text style={styles.blackText}>Barter</Text>
              <Icon.AntDesign name="checkcircle" size={16} color={'#55A47E'} />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _renderItem = ({item, index}) => {
    return (
      <View>
        {/* {item.item} */}
        <FastImage
          onLoadEnd={() => this.setState({topLoading: false})}
          source={{uri: item?.banner}}
          style={{aspectRatio: 194 / 63, borderRadius: 10}}
          resizeMode="cover"
        />
        {item?.adminText != '' && (
          <Text style={styles.descStyle}>{item?.adminText}</Text>
        )}
      </View>
    );
  };

  get pagination() {
    const {topAds, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={topAds?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer} // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const {
      unverifiedUser,
      ads,
      alertModal,
      msgToDisplay,
      topLoading,
      loadingMore,
    } = this.state;
    return (
      <Container>
        {this.state.loading ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: '30%'}}
            refreshing={this.state.refreshing}
            onScroll={this.onScroll}
            onScrollBeginDrag={this.onScrollDragBegin}
            refreshControl={
              <RefreshControl
                tintColor="#FF9966"
                refreshing={this.state.refreshing}
                onRefresh={() =>
                  this.setState({refreshing: true}, () =>
                    this.componentDidMount(),
                  )
                }
              />
            }>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={themeStyle.COLOR_CLASSIFIED}
            />
            <View>
              <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      !this.props.user.userData.is_classified_profile_created ||
                      unverifiedUser
                        ? this.showNewUserAlertFunction(
                            this.props.user.userData
                              .is_classified_profile_created,
                          )
                        : this.props.navigation.navigate(
                            route.CLASSIFIEDWISHLIST,
                            {
                              currency: this.props.currency?.symbol,
                            },
                          )
                    }
                    style={styles.btnContainer}>
                    <Icon.Ionicons
                      name="heart"
                      size={16}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <View style={{width: 10}} />
                    <Text style={styles.blackText}>Wish list</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      !this.props.user.userData.is_classified_profile_created ||
                      unverifiedUser
                        ? this.showNewUserAlertFunction(
                            this.props.user.userData
                              .is_classified_profile_created,
                          )
                        : this.props.navigation.navigate(route.CLASSIFIEDPOSTAD)
                    }
                    style={styles.btnContainer}>
                    <Icon.Ionicons
                      name="add-circle"
                      size={16}
                      color={themeStyle.COLOR_BLACK}
                    />
                    <View style={{width: 10}} />
                    <Text style={styles.blackText}>Post ad</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{marginTop: '5%'}}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.topAds}
                layout="default"
                autoplay={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
                renderItem={this._renderItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH * 0.87}
                itemHeight={SCREEN_HEIGHT * 0.15}
                onSnapToItem={index => this.setState({activeSlide: index})}
              />
              {topLoading && (
                <Image
                  source={require('../../../../assets/gifs/triangleLoader2.gif')}
                  style={styles.gif}
                />
              )}
              {this.state.topAds?.length > 0 && this.pagination}
            </View>

            <View style={styles.container}>
              {ads?.length == 0 && !topLoading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>No record found!</Text>
                </View>
              ) : (
                <View>
                  <FlatList
                    data={ads}
                    numColumns={2}
                    renderItem={this._renderAdsItem}
                    initialNumToRender={2}
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={VerticalSpacer}
                  />
                  {loadingMore ? (
                    <ActivityIndicator
                      size={'large'}
                      color={themeStyle.COLOR_CLASSIFIED}
                      style={styles.indicator}
                    />
                  ) : null}
                </View>
              )}
            </View>
          </ScrollView>
        )}
        <ClassifiedMenu
          data={this.props.user.userData}
          visible={this.state.visible}
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Classified';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0]._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                await this.props.authActions.getUserModules(
                  this.props.user.userData.token,
                );
                this.props.navigation.replace(route.MAIN);
              })
              .catch(err => {
                // console.log(err);
              });
          }}
          onViewAds={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CLASSIFIEDMYADS),
            )
          }
          onViewWishList={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CLASSIFIEDWISHLIST),
            )
          }
          onViewSetting={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CLASSIFIEDSETTINGS),
            )
          }
          onClose={() => this.setState({visible: false})}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_classified_profile_created)
                this.props.navigation.navigate(route.CLASSIFIEDSETTINGS, {
                  prev_screen: route.HOME,
                });
              else if (msgToDisplay.includes('verified')) {
                this.props.navigation.push(route.MAIN, {
                  screen: route.PROFILE,
                  params: {
                    screen: route.ACCOUNTSETTINGS,
                    params: {
                      data: 0,
                    },
                  },
                });
              }
            });
          }}
          text={msgToDisplay}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    region: state.searchReducer.regionValue || {},
    currency: state.searchReducer.currency || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassifiedHome);
