import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {Container, DeleteModal, Icon, Loader} from '../../../../components';
import Modal from 'react-native-modal';
import Filter from '../../../../assets/svg/filterSetting.svg';
import Menu from '../../../../assets/svg/menu.svg';
import HeartWhite from '../../../../assets/svg/connect-heart-white.svg';
import CrossWhite from '../../../../assets/svg/connect-cross-white.svg';
import ReloadWhite from '../../../../assets/svg/connect-reload-white.svg';
import HeartGray from '../../../../assets/svg/connect-heart-gray.svg';
import CrossGray from '../../../../assets/svg/connect-cross-gray.svg';
import ReportSvg from '../../../../assets/svg/report-connect.svg';
import Cont from '../../../../json/continents/countries.json';
import DropDown from '../../../../assets/svg/dropDown.svg';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../../../lib/utils/localstorage';
import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import ConnectFilter from '../ConnectFilterModal';
import ConnectMenu from '../ConnectMenu';
import BoostModal from '../BoostModal';
import ConnectHomeFunction from './connect.home.functions';
import {bindActionCreators} from 'redux';
import {connectActions} from '../../../../redux/actions/connect';
import {connect} from 'react-redux';
import {PaymentModal} from './connect.home.component';
import {
  ConnectModuleServices,
  ProfileServices,
  WalletServices,
} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import {BASE_URL} from '../../../../enviroments';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {authActions} from '../../../../redux/actions/auth';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {searchActions} from '../../../../redux/actions/search';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.PINK,
  iconColor: themeStyle.COLOR_WHITE,
};
class ConnectHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      msgToDisplay: '',
      boost: false,
      expanded: false,
      boostModal: false,
      visible: false,
      activeSlide: 0,
      loading: true,
      alertModal: false,
      low: 18,
      high: 35,
      item: {},
      male: true,
      female: false,
      any: false,
      cards: [],
      swipedAllCards: false,
      filterBtnLoading: false,
      swipeDirection: '',
      cardIndex: 0,
      emptyAmpulesModal: false,
      alertMessage: 'To perform more actions you have to buy more ampules!',
      packages: [],
      reportText: '',
      videoUri: '',
      likes: [
        {name: 'Board games', selected: true},
        {name: 'Gardening', selected: false},
        {name: 'Vegan', selected: false},
        {name: 'Swimming', selected: false},
        {name: 'Cooking', selected: false},
        {name: 'Gaming', selected: false},
      ],
      swipeCount: 0,
      countSet: false,
      reportModal: false,
      selectMessageModal: false,
      reportData: [
        {
          name: 'Pretending to be someone',
          selected: false,
        },
        {
          name: 'Fake Account',
          selected: false,
        },
        {
          name: 'Fake Name',
          selected: false,
        },
        {
          name: 'Posting inappropriate things',
          selected: false,
        },
        {
          name: 'Harrasment or bullying',
          selected: false,
        },
      ],
      reportId: '',
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount = async () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });

    let count = await getLocalData(LOCAL_STORAGE_KEYS.swipeCount);
    let swipeCount = parseInt(JSON.parse(count));
    this.setState({swipeCount});
    this.getProfiles();
    this.getMyProfile();
    this.findCoordinates();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {
              screen: route.HOME,
            })
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
      headerTitle: () => this.headerTitle(),
    });
    this.getPackages();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getMyProfile();
    });
  };

  getPackages = () => {
    ConnectHomeFunction.getPackages(this.props.user.userData.token)
      .then(res => {
        this.setState({packages: res});
      })
      .catch(err => null);
  };

  getProfiles = () => {
    ConnectHomeFunction.getUsersProfiles(this.props.user.userData.token)
      .then(res => {
        let array = [...res];
        let interests = [];
        array.map((item, index) => {
          item.hobbies.map(item => {
            if (item != '') interests.push(item);
          });
          item.lifestyles.map(item => {
            if (item != '') interests.push(item);
          });
          item.likes.map(item => {
            if (item != '') interests.push(item);
          });
          item.personalities.map(item => {
            if (item != '') interests.push(item);
          });
          array[index] = {
            ...array[index],
            interests: interests,
            expanded: false,
            sendMatch: false,
            removeUser: false,
          };
        });
        this.setState({cards: array, loading: false});
      })
      .catch(err => null);
  };

  getMyProfile = () => {
    ConnectHomeFunction.getUserConnectProfileSettings(
      this.props.user.userData.token,
    )
      .then(res => {
        switch (res.gender_preference) {
          case 'Female':
            this.onWomen();
            break;
          case 'Male':
            this.onMen();
            break;
          case 'Non Binary':
            this.onAny();
            break;
        }
      })
      .catch(err => {
        this.setState({loading: false});
        null;
      });
  };

  onMen = () => {
    this.setState({male: true, female: false, any: false});
  };
  onWomen = () => {
    this.setState({male: false, female: true, any: false});
  };
  onAny = () => {
    this.setState({male: false, female: false, any: true});
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>
          Connect <Text style={styles.dating}>(Dating)</Text>
        </Text>
      </View>
    );
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => {
            this.setState({filter: true});
          }}
          style={{marginLeft: 15}}
        >
          <Filter />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Menu />
        </TouchableOpacity>
      </View>
    );
  };

  renderLikes = (item, index) => {
    return index < 5 ? (
      <TouchableOpacity key={index.toString()} style={{marginRight: 10}}>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}> {item}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  _renderLikes = (item, index) => {
    return index < 5 ? (
      <TouchableOpacity key={index.toString()} style={{marginRight: 10}}>
        <View style={styles.text2Container}>
          <Text style={styles.grayText}> {item}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  _renderItem = ({item, index}) => {
    return <View>{item.item}</View>;
  };

  changeLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let array = {...this.state.cards[index]};
    let tempImages = [];
    for (let i = 0; i < 3; i++) {
      if (array[`connect_image${i}`] != null)
        tempImages.push(array[`connect_image${i}`]);
    }
    // if(array.images) array.images = tempImages;
    // else
    array = {...array, image: tempImages};
    this.setState({
      item: array,
      cardIndex: index,
      expanded: !this.state.expanded,
    });
  };

  setSliderPage = event => {
    const {currentPage} = this.state;
    const x = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x.x / Math.floor(SCREEN_WIDTH));
    if (indexOfNextScreen !== currentPage) {
      this.setState({
        currentPage: indexOfNextScreen,
      });
    }
  };

  onSwiped = (type, index) => {
    if (this.state.cards.length - 1 == index)
      this.setState({
        alertModal: true,
        msgToDisplay: 'We are waiting for more users to join Medicos Connect',
      });
    if (this.state.swipeCount <= 10) {
      return this.updateSwipeCount(type, index);
    } else {
      if (this.props.user.userData.ampules < 10) {
        this.setState({
          emptyAmpulesModal: true,
          msgToDisplay: 'To perform more actions you have to buy more ampules!',
        });
      } else {
        this.updateSwipeCount(type, index);
        if (type == 'top') {
          this.createTransaction();
          this.handleClickHeart(this.state.cards[index]);
        } else {
          this.createTransaction();
          this.handleClickCross(this.state.cards[index]);
        }
      }
    }
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
      alertModal: true,
      msgToDisplay: 'We are waiting for more users to join Medicos Connect.',
    });
  };

  updateSwipeCount = (type, index) => {
    let newValue = this.state.swipeCount + 1;
    storeLocalData(LOCAL_STORAGE_KEYS.swipeCount, JSON.stringify(newValue));
    this.setState({swipeCount: newValue}, () => {
      if (type == 'top') {
        this.handleClickHeart(this.state.cards[index]);
        this.setState({
          alertModal: true,
          msgToDisplay: 'Matched request sent',
        });
      } else {
        this.handleClickCross(this.state.cards[index]);
      }
    });

    // }
  };

  swipeUp = () => {
    this.swiper.swipeTop();
  };

  swipeDown = () => {
    this.swiper.swipeBottom();
  };

  handleClickStar = data => {
    if (data.is_favourite) {
      ConnectHomeFunction.undoFavouriteUser(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], is_favourite: false};
            }
          });
          let item = {...data, is_favourite: false};
          this.setState({cards: array, item: item});
        })
        .catch(err => {});
    } else {
      ConnectHomeFunction.addFavouriteUser(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], is_favourite: true};
            }
          });
          let item = {...data, is_favourite: true};
          this.setState({cards: array, item: item});
        })
        .catch(err => {});
    }
  };

  handleClickCross = data => {
    if (data?.removeUser) {
      ConnectHomeFunction.undoRemoveConnectProfile(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], removeUser: false};
            }
          });
          let item = {...data, removeUser: false};
          this.setState({cards: array, item: item});
        })
        .catch(err => {});
    } else {
      ConnectHomeFunction.removeConnectProfile(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], removeUser: true};
            }
          });
          let item = {...data, removeUser: true};
          this.setState({cards: array, item: item});
        })
        .catch(err => {});
    }
  };

  handleClickHeart = data => {
    if (data?.sendMatch) {
      ConnectHomeFunction.undoSendMatchtoProfileId(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], sendMatch: false};
            }
          });
          let item = {...data, sendMatch: false};
          this.setState({cards: array, item: item});
        })
        .catch(err => {
          null;
        });
    } else {
      ConnectHomeFunction.sendMatchtoProfileId(
        data._id,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = [...this.state.cards];
          array.map((item, index) => {
            if (data._id == item._id) {
              array[index] = {...array[index], sendMatch: true};
            }
          });
          let item = {...data, sendMatch: true};
          this.setState({cards: array, item: item});
        })
        .catch(err => {});
    }
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({location: location});
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        try {
          Geocoder.fallbackToGoogle('AIzaSyAGWemhFK6mZr-3HEff1ATuBhZLn0-z9lo');
          Geocoder.geocodePosition(pos)
            .then(res => {
              let temp = Cont[res[0].countryCode].continent;
              this.props.searchActions.regionAdd(temp);
              let locationData = {
                location: res[0].formattedAddress,
                lat: location.latitude,
                long: location.longitude,
              };
              this.props.authActions.updateLocation(
                locationData,
                this.props.user.userData.token,
              );
            })
            .catch(error => null);
        } catch (error) {}
      },
      err => {
        if (err.PERMISSION_DENIED == 1) {
          this.setState({
            msgToDisplay:
              'To proceed forward please enable your GPS service from device settings or app setting',
            alertModal: true,
          });
        }
      },
      {timeout: 5000000},
    );
  };

  handleClickUndo = data => {
    if (this.props.user?.userData?.ampules > 10) {
      this.swiper.swipeBack();
      this.createTransaction();
    } else {
      this.setState({
        emptyAmpulesModal: true,
        alertMessage: 'To perform more actions you have to buy more ampules!',
      });
    }
  };

  changeProfileMode = mode => {
    ConnectHomeFunction.changeConnectProfileMode(
      mode,
      this.props.user.userData.token,
    )
      .then(res => {})
      .catch(err => {
        null;
      });
  };

  handleSetFilter = () => {
    const {low, high, male, female, any} = this.state;
    let data = {
      gender_preference: male ? 'Male' : female ? 'Female' : 'Non Binary',
      age_between: `${low},${high}`,
    };
    ConnectHomeFunction.changeConnectFilter(
      data,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState(
          {filterBtnLoading: false, filter: false, loading: true},
          () => {
            this.getProfiles();
          },
        );
      })
      .catch(err => {
        null;
        this.setState({filterBtnLoading: false});
      });
  };

  createTransaction = () => {
    let data = {
      ampules: 10,
      type: 'Connect',
    };
    WalletServices.createTransaction(data, this.props.user.userData.token)
      .then(res => {})
      .catch(err => null);
  };

  createPayment = p_id => {
    this.setState({paymentLoading: true});
    fetch(`${BASE_URL}paypal/payment/${p_id}/${this.props.user.userData._id}`)
      .then(res => res)
      .then(response => {
        this.setState({paymentLoading: false});
        this.setState({videoUri: response.url});
      })
      .catch(error => {
        this.setState({paymentLoading: false});
      });
  };
  handlePaymentSuccess = () => {
    this.setState({
      emptyAmpulesModal: false,
      videoUri: '',
      paymentModal: false,
      item: null,
    });
  };

  handleReportUser = () => {
    let data = {
      user: this.state.reportId,
      description: this.state.reportText,
    };
    ConnectModuleServices.reportUser(data, this.props.user.userData.token)
      .then(res => {
        this.setState({
          reportModal: false,
          reportText: '',
          reportId: '',
          alertModal: true,
          msgToDisplay: 'Blocked! This user can no longer contact or view you',
        });
        this.getProfiles();
      })
      .catch(err => {
        alert(err.response.message);
      });
  };

  render() {
    const {
      likes,
      currentPage,
      low,
      high,
      male,
      female,
      any,
      loading,
      selectMessageModal,
      item,
      filterBtnLoading,
      alertModal,
      msgToDisplay,
      reportData,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {this.state.expanded ? (
            <>
              <ScrollView
                // style={{flex: 0.4}}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={event => this.setSliderPage(event)}
              >
                {item?.image?.map((item, index) => {
                  return (
                    <View style={styles.scroller}>
                      <ImageBackground
                        resizeMode="contain"
                        source={{uri: item}}
                        style={styles.image}
                      ></ImageBackground>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.paginationWrapper}>
                {item?.image.map((val, index) => (
                  <View
                    style={
                      currentPage === index
                        ? styles.dotStyle
                        : styles.inactiveDotStyle
                    }
                  />
                ))}
              </View>
              <View
                style={{
                  bottom: 20,
                  paddingBottom: '25%',
                  backgroundColor: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.changeLayout(this.state.cardIndex)}
                  style={{alignItems: 'center'}}
                >
                  <Icon.FontAwesome
                    name="angle-down"
                    size={30}
                    color={'#38474F'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{flex: 0.7, marginLeft: '5%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.nameText1}>{item?.username}</Text>
                      <View style={{marginLeft: '5%'}}>
                        <Text style={styles.ageText1}> {item?.age}</Text>
                      </View>
                    </View>
                    <View style={{marginTop: '5%'}}>
                      <Text style={styles.grayText}>
                        {item?.location?.city},{item?.location?.country}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: '5%'}}>
                      <View style={styles.textContainer1}>
                        <Text style={styles.whiteText1}>
                          {' '}
                          {item?.profession?.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{}}>
                      <FlatList
                        data={item?.interests}
                        numColumns={0}
                        renderItem={({item, index}) =>
                          this._renderLikes(item, index)
                        }
                        contentContainerStyle={styles.contentContainer}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={VerticalSpacer}
                      />
                      <Text style={styles.grayText}>{item?.about}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setState({selectMessageModal: true})}
                      style={{
                        marginTop: '5%',
                        height: 40,
                        width: 40,
                        borderRadius: 10,
                        backgroundColor: 'white',
                      }}
                    >
                      <ReportSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={this.state.swipeCount <= 10 ? false : true}
                      onPress={() => this.handleClickCross(item)}
                      style={{marginTop: '5%'}}
                    >
                      <CrossGray />
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={this.state.swipeCount <= 10 ? false : true}
                      onPress={() => this.handleClickHeart(item)}
                      style={{marginTop: '5%'}}
                    >
                      <HeartGray />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : loading ? (
            <Loader />
          ) : this.state.cards.length == 0 || this.state.swipedAllCards ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.noMatchedText}>
                {this.state.swipedAllCards
                  ? 'You have swiped all the accounts'
                  : 'No matches yet—it’s like finding a perfect vein! A little patience will do the trick.'}
              </Text>
            </View>
          ) : (
            <Swiper
              ref={swiper => {
                this.swiper = swiper;
              }}
              horizontalSwipe={false}
              verticalSwipe={true}
              backgroundColor={'#000000'}
              disableTopSwipe={
                this.state.expanded || this.state.swipeCount > 10 ? true : false
              }
              disableBottomSwipe={
                this.state.expanded || this.state.swipeCount > 10 ? true : false
              }
              onSwipedTop={e => this.updateSwipeCount('top', e)}
              onSwipedBottom={e => this.updateSwipeCount('bottom', e)}
              onTapCard={() => {}}
              cards={this.state.cards}
              cardIndex={this.state.cardIndex}
              cardVerticalMargin={0}
              cardHorizontalMargin={0}
              renderCard={(card, index) => {
                return (
                  <ImageBackground
                    style={styles.imageStyle}
                    source={{
                      uri:
                        card?.connect_image0 != null
                          ? card?.connect_image0
                          : 'https://avatarfiles.alphacoders.com/164/164590.jpg',
                    }}
                  >
                    <View style={{flex: 1}}>
                      <View style={{flex: 0.5}}></View>
                      <ImageBackground
                        source={require('../../../../assets/images/connectBg.png')}
                        style={{
                          flex: 0.5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          paddingBottom: '25%',
                        }}
                      >
                        <View
                          style={{
                            flex: 0.8,
                            justifyContent: 'flex-end',
                            marginLeft: '5%',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: '5%',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={styles.nameText}>{card.username}</Text>
                            <View style={{marginLeft: '5%'}}>
                              <Text style={styles.ageText}> {card?.age}</Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => this.changeLayout(index)}
                              style={{marginLeft: '5%'}}
                            >
                              <View style={styles.textContainer2}>
                                <Text style={styles.grayText1}>
                                  {' '}
                                  {'Profile'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View style={{marginTop: '5%'}}>
                            <Text style={styles.whiteText1}>
                              {card?.location?.city},{card?.location?.country}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', marginTop: '5%'}}>
                            <View style={styles.textContainer1}>
                              <Text style={styles.grayText1}>
                                {' '}
                                {card?.profession?.name}
                              </Text>
                            </View>
                            {/* <View style={{ ...styles.textContainer1, marginLeft: "5%" }} >
                                                                    <Text style={styles.whiteText1}> {'BDS'}</Text>
                                                                </View> */}
                          </View>
                          <View style={{}}>
                            <FlatList
                              data={card.interests}
                              scrollEnabled={false}
                              numColumns={0}
                              renderItem={({item, index}) =>
                                this.renderLikes(item, index)
                              }
                              contentContainerStyle={styles.contentContainer}
                              keyExtractor={item => item.name}
                              ItemSeparatorComponent={VerticalSpacer}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 0.4,
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingBottom: '5%',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                selectMessageModal: true,
                                reportId: card._id,
                              })
                            }
                            style={{
                              marginTop: '5%',
                              height: 40,
                              width: 40,
                              borderRadius: 10,
                              backgroundColor: 'white',
                            }}
                          >
                            <ReportSvg />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.state.swipeCount <= 10
                                ? this.swipeDown()
                                : this.setState({
                                    emptyAmpulesModal: true,
                                    msgToDisplay:
                                      'To perform more actions you have to buy more ampules!',
                                  })
                            }
                            style={{marginTop: '5%'}}
                          >
                            <CrossWhite />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.state.swipeCount <= 10
                                ? this.swipeUp()
                                : this.setState({
                                    emptyAmpulesModal: true,
                                    msgToDisplay:
                                      'To perform more actions you have to buy more ampules!',
                                  })
                            }
                            style={{marginTop: '5%'}}
                          >
                            <HeartWhite />
                          </TouchableOpacity>
                          {index == 0 ? null : (
                            <TouchableOpacity
                              onPress={() =>
                                this.state.swipeCount <= 10
                                  ? this.handleClickUndo(card)
                                  : this.setState({
                                      emptyAmpulesModal: true,
                                      msgToDisplay:
                                        'To perform more actions you have to buy more ampules!',
                                    })
                              }
                              style={{marginTop: '5%'}}
                            >
                              <ReloadWhite />
                            </TouchableOpacity>
                          )}
                        </View>
                      </ImageBackground>
                    </View>
                  </ImageBackground>
                );
              }}
              onSwipedAll={this.onSwipedAllCards}
              // stackSize={3}
              // stackSeparation={1}
              overlayLabels={{
                bottom: {
                  title: 'Remove',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: '45%',
                      justifyContent: 'flex-start',
                    },
                  },
                },
                top: {
                  title: 'Match',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
            ></Swiper>
          )}
        </View>
        <Modal
          isVisible={selectMessageModal}
          animationInTiming={400}
          animationOutTiming={400}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBackgroundContainer}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => this.setState({selectMessageModal: false})}
              >
                <DropDown />
              </TouchableOpacity>
              <View style={styles.reportHeadingContainer}>
                <Text style={styles.reportUser}>Report User</Text>
                <View style={styles.line} />
              </View>
              <Text style={styles.text}>
                Please select the problem with this user
              </Text>
              {reportData.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let data = [...reportData];
                      data.map((e, i) => {
                        if (index == i) {
                          data[i] = {...data[i], selected: true};
                        } else {
                          data[i] = {...data[i], selected: false};
                        }
                      });
                      this.setState({
                        reportData: data,
                        reportText: data[index].name,
                        selectMessageModal: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          reportModal: true,
                        });
                      }, 500);
                    }}
                    style={
                      item?.selected
                        ? styles.itemSelectedModalContainer
                        : styles.itemModalContainer
                    }
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
              <View
                style={{
                  marginTop: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
          </View>
        </Modal>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => this.setState({alertModal: false})}
          text={msgToDisplay}
        />
        <BottomDeleteMenu
          visible={this.state.reportModal}
          onClose={() => this.setState({reportModal: false})}
          data={{
            // icon: ReportIcon,
            text: 'Are you sure you want to report this?',
            buttonText: 'Report',
            onPress: () => {
              this.setState({reportModal: false}, () =>
                this.handleReportUser(),
              );
            },
          }}
          theme="wallet"
        />
        <ConnectFilter
          visible={this.state.filter}
          onClose={() => this.setState({filter: false})}
          onWomen={() => this.setState({female: true, male: false, any: false})}
          onMen={() => this.setState({male: true, female: false, any: false})}
          onAny={() => this.setState({any: true, female: false, male: false})}
          min={low}
          max={high}
          men={male}
          women={female}
          any={any}
          btnloading={filterBtnLoading}
          onSetFilter={() => {
            this.setState({filterBtnLoading: true});
            this.handleSetFilter();
          }}
          onNext={() => {
            this.setState({filter: false});
            if (this.state.boost) {
              this.props.navigation.navigate(route.CONNECTADVANCEFILTER, {
                bff: this.props.route?.params?.bff,
              });
            } else {
              setTimeout(() => {
                this.setState({boostModal: true});
              }, 400);
            }
          }}
          onValueChanged={(low, high) => this.setState({low: low, high: high})}
        />
        <BoostModal
          visible={this.state.boostModal}
          onClose={() => this.setState({boostModal: false})}
          onBoost={() => {
            this.setState({boost: true, boostModal: false}, () =>
              this.componentDidMount(),
            );
            this.props.navigation.navigate(route.CONNECTADVANCEFILTER, {
              bff: this.props.route?.params?.bff,
            });
          }}
        />
        <ConnectMenu
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTEDITPROFILE1ST),
            )
          }
          onMatchHistory={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTMATCHEDHISTORY),
            )
          }
          data={this.props.route?.params?.bff}
          visible={this.state.visible}
          boost={this.state.boost}
          onDate={() => {
            this.props.navigation.setParams({bff: false});
            this.changeProfileMode('Dating');
          }}
          onViewProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTUSERPROFILE),
            )
          }
          onFavouriteProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTFAVOURITEPROFILE, {
                bff: this.props.route?.params?.bff,
              }),
            )
          }
          onBoost={() =>
            this.setState({boost: true}, () => this.componentDidMount())
          }
          onBFF={() => {
            this.props.navigation.setParams({bff: true});
            this.changeProfileMode('BFF');
          }}
          onDeactivateModule={() => {
            const data = this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Connect';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0].module._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                // await this.props.authActions.getUserModules(this.props.user.userData.token)
                this.props.navigation.replace(route.AUTH_LOADING);
              })
              .catch(err => {
                // console.log(err);
              });
          }}
          onMatchedProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTMATCHEDPROFILE, {
                bff: this.props.route?.params?.bff,
              }),
            )
          }
          onClose={() => this.setState({visible: false})}
        />
        <PaymentModal
          packages={this.state.packages}
          // loading={this.state.loading}
          paymentLoading={this.state.paymentLoading}
          isVisible={this.state.emptyAmpulesModal}
          onClose={() => this.setState({emptyAmpulesModal: false, value: ''})}
          // data={this.state.connectMatchProfessions}
          // profession={this.props.user.userData.profession}
          paymentModal={this.state.paymentModal}
          // item={item}
          videoUri={this.state.videoUri}
          alertMessage={this.state.alertMessage}
          // onPressPayment={(item) => this.props.user.userData.ampules > 20 ? this.handleCreateTransction(item) : this.setState({ paymentModal: true, item: item })}
          // onSearch={(text) => this.seacrhMatchProfesstionFunction(text)}
          // onPress={(data) => { this.handleSelectMatchProfession(data) }}
          paymentFalse={() => {
            // this.props.navigation.goBack()
            this.setState({
              paymentModal: false,
              emptyAmpulesModal: false,
              videoUri: '',
            });
          }}
          payForAmpules={p_id => this.createPayment(p_id)}
          goBack={() => this.props.navigation.goBack()}
          setVideoUri={() => this.setState({videoUri: ''})}
          paymentSuccess={() => this.handlePaymentSuccess()}
          authActions={() =>
            this.props.authActions.getUserProfile(
              this.props.user.userData.token,
              '',
              '',
            )
          }
        />
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
const mapDispatchToProps = dispatch => {
  return {
    connectActions: bindActionCreators(connectActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectHome);
