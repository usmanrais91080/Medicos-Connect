import React, {Component} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView from 'react-native-maps';
import {
  Container,
  DeleteModal,
  HorizontalList,
  Icon,
  Loader,
} from '../../../../components';
import styles from './style';
import ClassifiedMenu from '../ClassifiedMenu';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import {ClassifiedServices, ProfileServices} from '../../../../services';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import Hyperlink from 'react-native-hyperlink';
import themeStyle from '../../../../assets/styles/theme.style';
import Chat from '../../../../assets/svg/chat_icon_home.svg';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class ClassifiedPostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      ads: [],
      adDetail: {},
      imageLoading: false,
      alertModal: false,
      msgToDisplay: '',
    };
  }

  componentDidMount = () => {
    this.getProductDetails();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.navigate(route.CLASSIFIEDHOME)}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  getProductDetails = () => {
    ClassifiedServices.getProductDetail(
      this.props?.route?.params?.productId,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          adDetail: res.data.data.addDetail,
          ads: res.data.data.relatedAds,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        this.setState({
          adDetail: [],
          loading: false,
          alertModal: true,
          msgToDisplay: 'Network Error',
        });
      });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
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

  _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        style={styles.imageStyle}
        height={200}
        width={200}
        source={{
          uri: item
            ? item
            : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
          // "https://www.topgear.com/sites/default/files/cars-car/image/2018/03/mustang_lightning_blue_009.jpg"
        }}>
        <View style={styles.priceContainer}>
          <View style={styles.rowStyle}>
            {/* <Text style={styles.whiteText}>
              {this.state.adDetail?.price} {this.state.adDetail?.currency_name}
            </Text> */}
            <Text style={styles.whiteText}>
              {index + 1}/{this.state.adDetail?.images.length}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  render() {
    const {
      adDetail,
      loading,
      refreshing,
      dummyImages,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <Container>
        {loading ? (
          // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          //     <ActivityIndicator color='#FF9966' size="small" />
          // </View>
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: '5%', paddingBottom: '30%'}}>
            <View style={styles.cardCotainer}>
              <View style={{marginHorizontal: '5%'}}>
                {adDetail?.images?.length > 0 ? (
                  <Carousel
                    data={adDetail?.images}
                    renderItem={this._renderItem}
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={SCREEN_WIDTH}
                  />
                ) : (
                  <ImageBackground
                    imageStyle={{borderRadius: 10}}
                    style={styles.imageStyle}
                    height={200}
                    width={200}
                    source={{
                      uri: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
                    }}></ImageBackground>
                )}
              </View>
              <View style={styles.descContainer}>
                <View style={styles.centerContainer}>
                  <Text style={styles.price}>{adDetail?.price}</Text>
                </View>

                <View style={styles.rowStyle}>
                  <View style={{width: '75%'}}>
                    <Text style={styles.addName}>{adDetail?.name}</Text>
                    <Text style={styles.grayText}>
                      {adDetail?.location?.address}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.grayText}>
                      {moment(adDetail?.created_at).format('DD/MM/Y')}
                    </Text>
                  </View>
                </View>
                {/* <Text style={styles.grayText1}>{adDetail?.title} </Text> */}

                {adDetail?.description?.includes('http://') ||
                adDetail?.description?.includes('https://') ? (
                  <Hyperlink
                    linkStyle={styles.blueText}
                    onPress={(url, text) =>
                      this.props.navigation.navigate(route.VIEWURL, {url: url})
                    }>
                    <Text style={styles.grayText1}>
                      {adDetail?.description}
                    </Text>
                  </Hyperlink>
                ) : (
                  <Text style={styles.description}>
                    {adDetail?.description}
                  </Text>
                )}
                {/* <Text style={styles.grayText1} >{adDetail?.description}</Text> */}
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#C7C7C7',
                  marginTop: 20,
                }}></View>
              <View style={{...styles.rowStyle, margin: '2.5%'}}>
                <Text style={{...styles.blackText, fontSize: 16}}>
                  Condition
                </Text>
                <Text style={styles.blackText1}>{adDetail.condition}</Text>
              </View>
              <View style={{borderTopWidth: 1, borderColor: '#C7C7C7'}}></View>
              <View style={{...styles.rowStyle, margin: '2.5%'}}>
                <Text style={{...styles.blackText, fontSize: 16}}>Barter</Text>
                <Text style={styles.blackText1}>
                  {adDetail.is_barter ? 'Available' : 'Unavailable'}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#C7C7C7',
                  marginBottom: 20,
                }}></View>
              {adDetail.is_barter && (
                <View>
                  {adDetail?.barter_images?.map(item => {
                    return (
                      <Image
                        style={styles.imageStyle2}
                        source={{
                          uri: item
                            ? item
                            : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
                        }}
                      />
                    );
                  })}

                  <Text style={{...styles.description, marginHorizontal: '5%'}}>
                    {adDetail?.description}dsfdasdf
                  </Text>
                </View>
              )}

              <View style={{margin: 10}}>
                {this.props?.route?.params?.userad ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ChatScreen', {
                        data: {
                          id: `${adDetail?.user?._id}`,
                          name: adDetail?.user?.username,
                          seen: false,
                          type: 'Classified',
                          email: '',
                          is_product: true,
                          product_id: adDetail?._id,
                          profile_url: adDetail?.user?.image
                            ? adDetail?.user?.image
                            : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
                          last_message: 'Shared With you',
                          last_message_time: '2021-08-12 17:00:00',
                        },
                      });
                    }}
                    style={styles.btonContainer}>
                    <Text
                      style={[
                        styles.whiteText1,
                        {
                          textAlign: 'center',
                          color: themeStyle.COLOR_BLACK,
                          height: 20,
                        },
                      ]}>
                      Message
                    </Text>
                    <View style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Chat fill={'#4E4E4E'} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <ImageBackground resizeMode="cover" imageStyle={{ borderRadius: 10 }} source={require('../../../../assets/images/paid.png')} style={styles.imageStyle1}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.whiteText1}>Paid Pormotion</Text>
                                    </View>
                                </ImageBackground>
                            </View> */}
            {/* <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
                                <View style={styles.rowStyle}>
                                    <View>
                                        <Text style={styles.blackText} >Related Ads</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                        <Text style={[styles.blackText1, { textAlign: "center" }]}>View More</Text>

                                    </TouchableOpacity>
                                </View>
                            </View> */}
            {/* <HorizontalList classified data={this.state.ads} onPress={() => this.props.navigation.push(route.CLASSIFIEDPRODUCTDETAIL)} /> */}
          </ScrollView>
        )}

        <ClassifiedMenu
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
              this.props.navigation.navigate(route.CLASSIFIEDMYADS, {
                currency: this.props.currency?.symbol,
              }),
            )
          }
          onViewWishList={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CLASSIFIEDWISHLIST),
            )
          }
          onClose={() => this.setState({visible: false})}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () =>
              this.props.navigation.goBack(),
            );
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassifiedPostDetail);
