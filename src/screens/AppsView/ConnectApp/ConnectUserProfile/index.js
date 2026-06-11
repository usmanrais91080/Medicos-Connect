import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Container, HeaderLeft, Icon, Loader} from '../../../../components';
import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {HeaderRight} from './connect.userprofile.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import themeStyle from '../../../../assets/styles/theme.style';
import ConnectMenu from '../ConnectMenu';
import {ConnectModuleServices} from '../../../../services';
import Geocoder from 'react-native-geocoder';

class SocialSavedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentPage: 0,
      avatar: '',
      activeTab: 0,
      loading: true,
      refreshing: false,
      address: '',
      postList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      images: [
        {
          uri: 'https://wallpapercave.com/wp/wp3396910.jpg',
          dimensions: {
            width: 136,
            height: 136,
          },
        },
      ],
      likes: [
        {name: 'Board games', selected: true},
        {name: 'Gardening', selected: false},
        {name: 'Vegan', selected: false},
        {name: 'Swimming', selected: false},
      ],
      profile: {},
      Userinterests: [],
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getUserConnectProfile();
    });
    this.getUserConnectProfile();
    this.props.navigation.setOptions({
      // headerRight: () => (
      //   <HeaderRight onPress={() => this.setState({visible: true})} />
      // ),
      headerLeft: () => <HeaderLeft white navigation={this.props.navigation} />,
    });
  };
  findCoordinates = () => {
    const {location} = this.state.profile;
    let pos = {
      lat: location.coordinates[1],
      lng: location.coordinates[0],
    };
    console.log('pos>>> : ', pos);

    try {
      Geocoder.geocodePosition(pos)
        .then(res => {
          console.log('res>>> : ', res);
          this.setState({
            address: `${res[0].locality},${res[0].country}`,
          });
        })
        .catch(error => console.log('res : ', error));
    } catch (error) {
      console.log('res : ', error);
    }
  };
  addMoreImages(newImages) {
    this.setState({images: this.state.images.concat(newImages)});
  }

  _renderLikes = (item, index) => {
    return index < 5 ? (
      <TouchableOpacity key={index} style={{marginRight: 10}}>
        <View style={styles.text2Container}>
          <Text style={styles.grayText}> {item}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  getUserConnectProfile = () => {
    if (
      this.props?.route?.params?.data &&
      this.props.user.userData._id != this.props?.route?.params?.data
    ) {
      ConnectModuleServices.getConnectProfileUserDetail(
        this.props?.route?.params?.data,
        this.props.user.userData.token,
      )
        .then(res => {
          let array = res.data.data;
          let interests = [];
          array.hobbies.map(item => {
            if (item !== null) interests.push(item);
          });
          array.lifestyles.map(item => {
            if (item !== null) interests.push(item);
          });
          array.likes.map(item => {
            if (item !== null) interests.push(item);
          });
          array.personalities.map(item => {
            if (item !== null) interests.push(item);
          });
          let tempImages = [];
          for (let i = 0; i < 3; i++) {
            if (array[`connect_image${i}`] != null)
              tempImages.push(array[`connect_image${i}`]);
            else {
              tempImages.push('');
            }
          }
          array = {...array, image: tempImages};
          console.log('array>>>>>>>>>>>>>', array);
          this.setState({
            profile: array,
            Userinterests: interests,
            loading: false,
          });
        })
        .catch(err => console.log('error>>>>>>>>>>>>>', err));
    } else {
      this.getProfile();
    }
  };
  getProfile = () => {
    ConnectModuleServices.getConnectProfile(this.props.user.userData.token)
      .then(res => {
        let array = res.data.data;
        let interests = [];
        array.hobbies.map(item => {
          if (item !== null) interests.push(item);
        });
        array.lifestyles.map(item => {
          if (item !== null) interests.push(item);
        });
        array.likes.map(item => {
          if (item !== null) interests.push(item);
        });
        array.personalities.map(item => {
          if (item !== null) interests.push(item);
        });
        let tempImages = [];
        for (let i = 0; i < 3; i++) {
          if (array[`connect_image${i}`] != null)
            tempImages.push(array[`connect_image${i}`]);
          else {
            tempImages.push('');
          }
        }
        array = {...array, image: tempImages};
        console.log('array>>>>>>>>>>>>>', array);
        this.setState({
          profile: array,
          Userinterests: interests,
          loading: false,
        });
      })
      .catch(err => console.log('error>>>>>>>>>>>>>', err));
  };
  chooseFile = () => {
    this.props.navigation.navigate(route.CONNECTSETTINGS1ST, {
      prev_screen: 'Profile',
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
  render() {
    const {activeTab, loading, profile, Userinterests, address, currentPage} =
      this.state;

    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            // <ScrollView>

            //         <View style={{ backgroundColor: "white" }}>
            //         <View style={{ backgroundColor: "lightgray", }}>
            //             <View style={{ top: "25%", marginHorizontal: "5%", backgroundColor: "white", borderRadius: 10, height: null }}>
            //                 <View style={{ bottom: "20%", }} >
            //                     <View style={{ alignItems: "center" }}>
            //                         <Avatar
            //                             rounded
            //                             source={{ uri: profile?.connect_image0 != null ?  profile?.connect_image0: "https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png"  }}
            //                             size={120}>
            //                         </Avatar>
            //                     </View>
            //                     <View style={{ marginTop: "5%", flexDirection: "row", justifyContent:'space-around', alignItems: "center" }}>
            //                         <Text style={{ fontFamily: themeStyle.FONT_MEDIUM, textTransform: "capitalize", fontSize: 16,color: themeStyle.COLOR_BLACK_LIGHT }}>{profile?.username}     <Text style={{ color: "lightgray", fontSize: 15 }}>{profile?.age}      </Text></Text>
            //                     </View>
            //                     <View style={{ marginTop: "2.5%", flexDirection: "row", justifyContent:profile?.friends_count != 0 ?  "space-around":"center" }}>
            //                         <View>
            //                             <Text style={{ color: "lightgray", fontSize: 12, fontFamily: themeStyle.FONT_REGULAR }}>{address}</Text>
            //                             <Text style={{ color: "lightgray", fontSize: 12, fontFamily: themeStyle.FONT_REGULAR }}>{profile?.religion}</Text>
            //                         </View>
            //                         {profile?.friends_count != 0 && <Text style={{ color: "lightgray", fontSize: 12, fontFamily: themeStyle.FONT_REGULAR }}>{profile?.friends_count} Friends</Text>}
            //                     </View>
            //                     <View style={{ marginTop: "5%", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            //                         <View style={{ backgroundColor: "#FF6B6B", borderRadius: 10, padding: '5%' }}>
            //                             <Text style={{ color: "white", fontSize: 12, fontFamily: themeStyle.FONT_REGULAR }}>{profile?.profession?.name}</Text>
            //                         </View>
            //                         {/* <View style={{ backgroundColor: "#FF6B6B", borderRadius: 10, padding: '5%' }}>
            //                             <Text style={{ color: "white", fontSize: 12, fontFamily: themeStyle.FONT_REGULAR }}>BDS</Text>
            //                         </View> */}
            //                     </View>
            //                 </View>
            //             </View>
            //         </View>
            //         <View style={{ paddingTop: "10%", alignItems: "center", justifyContent: "center" }}>
            //             <FlatList
            //                 data={Userinterests}
            //                 numColumns={0}
            //                 renderItem={({ item, index }) => this._renderLikes(item, index)}
            //                 contentContainerStyle={styles.contentContainer}
            //                 keyExtractor={item => item._id}
            //                 ItemSeparatorComponent={VerticalSpacer} />
            //             <View style={{ marginTop: "2.5%", marginHorizontal: "10%" }}>
            //                 {/* <Text style={styles.grayText}>Tell us about yourself. For example
            //                     My name is Faddy Kim. I enjoy long walks on the beach and the only love of my life you’re in competition with is food. Looking forward to meeting new people, feel free to reach out!</Text> */}
            //                 <Text style={styles.grayText}>{profile?.about}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </ScrollView>
            <>
              <ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={event => this.setSliderPage(event)}>
                {profile?.image?.map((item, index) => {
                  return (
                    <View style={styles.scroller}>
                      <ImageBackground
                        resizeMode="stretch"
                        source={{uri: item}}
                        style={styles.image}></ImageBackground>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.paginationWrapper}>
                {profile?.image.map((val, index) => (
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
                }}>
                <TouchableOpacity
                  disabled
                  style={{alignItems: 'center', height: 30}}>
                  {/* <Icon.FontAwesome
                    name="angle-down"
                    size={30}
                    color={'#38474F'}
                  /> */}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 0.7, marginLeft: '5%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.nameText1}>{profile?.username}</Text>
                      <View style={{marginLeft: '5%'}}>
                        <Text style={styles.ageText1}> {profile?.age}</Text>
                      </View>
                    </View>
                    <View style={{marginTop: '5%'}}>
                      <Text style={styles.grayText}>
                        {profile?.location?.city},{profile?.location?.country}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: '5%'}}>
                      <View style={styles.textContainer1}>
                        <Text style={styles.whiteText1}>
                          {profile?.profession?.name}
                        </Text>
                      </View>
                      {/* <View style={{ ...styles.textContainer1, marginLeft: "5%" }} >
                                                    <Text style={styles.whiteText1}> {'BDS'}</Text>
                                                </View> */}
                    </View>
                    <View style={{}}>
                      <FlatList
                        data={Userinterests}
                        numColumns={0}
                        renderItem={({item, index}) =>
                          this._renderLikes(item, index)
                        }
                        contentContainerStyle={styles.contentContainer}
                        // keyExtractor={item => item._id}
                        profileSeparatorComponent={VerticalSpacer}
                      />
                      <Text style={styles.grayText}>{profile?.about}</Text>
                      {/* <Text style={styles.grayText}>diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        <ConnectMenu
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTEDITPROFILE1ST),
            )
          }
          onDeactivateModule={() => {}}
          data={this.props.route?.params?.bff}
          visible={this.state.visible}
          boost={this.state.boost}
          onDate={() => {
            this.props.navigation.setParams({bff: false});
            this.changeProfileMode('Dating');
          }}
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
          onMatchedProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CONNECTMATCHEDPROFILE, {
                bff: this.props.route?.params?.bff,
              }),
            )
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialSavedPost);
