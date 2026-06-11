import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
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
import Search from '../../../../assets/svg/search.svg';
import Menu from '../../../../assets/svg/appsetting.svg';
import styles from './style';
import { route } from '../../../../lib/utils/constants';
import { Avatar } from 'react-native-elements';
import ClassifiedMenu from '../ClassifiedMenu';
import {
  HorizontalSpacer,
  VerticalSpacer,
} from '../../../../lib/utils/global';
import { ClassifiedServices, ProfileServices } from '../../../../services';
import { connect } from 'react-redux';
import moment from 'moment';
import { BottomDeleteMenu } from '../../../../components/BottomDeleteMenu';
import deleteGif from '../../../../assets/svg/delete_gif.svg';
import Tick from '../../../../assets/svg/tick-1.svg'
import { authActions } from '../../../../redux/actions/auth';
import { bindActionCreators } from 'redux';

class ClassifiedWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ads: [],
      alertModal: false,
      msgToDisplay: '',
      loading: true,
      refreshing: false,
      removeModalVisible: false,
    };
  }

  getWishlist = () => {
    ClassifiedServices.getWishlistProducts(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            ads: res.data.data,
            loading: false,
            refreshing: false,
          });
        } else {
          this.setState({ ads: [], loading: false, refreshing: false });
        }
      })
      .catch(err => {
        this.setState({
          ads: [],
          loading: false,
          refreshing: false,
          alertModal: true,
          msgToDisplay: 'Network Error',
        });
      });
  };

  truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num);
  };

  componentDidMount = () => {
    this.getWishlist();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };

  AddToWishlist = id => {
    this.setState({ refreshing: true });
    ClassifiedServices.addProductToWishlist(id, this.props.user.userData.token)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => null);
  };

  removeFromWishlist = (id, index) => {
    const { ads } = this.state;
    let tempAds = [...ads];
    tempAds[index].in_wishlist = false;
    this.setState(
      { ads: tempAds },
      // setTimeout(() => {

      // }, 1000),
      this.setState({
        msgToDisplay: 'Removed from wishlist successfully',
        alertModal: true,
      }),
    );
    ClassifiedServices.removeProductFromWishlist(
      id,
      this.props.user.userData.token,
    )
      .then(res => {
      })
      .catch(err => null);
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate(route.CLASSIFIEDSEARCH)} ><Search /></TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={{ marginRight: 15 }}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderAdsItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(route.CLASSIFIEDPRODUCTDETAIL, {
            productId: item._id,
          })
        } style={styles.itemContainer}>
        <View>
          <Image
            source={{
              uri: item?.images[0]
                ? item?.images[0]
                : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
              // 'https://wallpapercave.com/wp/wp3396910.jpg'
            }}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.grayText}>{item.name}</Text>
          <View style={styles.margin}>
            <Text style={styles.blackText}>{item?.price} {item?.currency_name}</Text>
          </View>
          <View style={styles.rowStyle}>
            {item.is_barter ? <Text style={styles.grayText}>{"Barter"}</Text> : <Text style={styles.grayText}>{"       "}</Text>}
            {item.status == "Available" ? <Tick /> : null}
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.blackText}>{this.truncateString(item.location.address, 15)}...,</Text>
            <Text style={styles.grayText1}>
              {item?.created_at &&
                moment(item.created_at).format('DD MMM')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                removeModalVisible: true,
                addToDelete: item._id,
                addIndex: index,
              })
            }>
            <Icon.AntDesign name="heart" size={20} color={themeStyle.YELLOW} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { ads, alertModal, msgToDisplay, removeModalVisible } = this.state;
    return (
      <>
        <Container>
          {this.state.loading ? (
            // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //     <ActivityIndicator color='#FF9966' size="small" />
            // </View>
            <Loader />
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingBottom: '30%' }}
              refreshing={this.state.refreshing}
              refreshControl={
                <RefreshControl
                  tintColor="#FF9966"
                  refreshing={this.state.refreshing}
                  onRefresh={() =>
                    this.setState({ refreshing: true }, () =>
                      this.componentDidMount(),
                    )
                  }
                />
              }>
              <View style={styles.container}>
                <View>
                  {ads.length == 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ fontWeight: 'bold' }}>No record found!</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.headingText}>
                        Items you're interested in
                      </Text>
                      <FlatList
                        data={ads.slice(0, 99)}
                        // numColumns={2}
                        renderItem={this._renderAdsItem}
                        contentContainerStyle={styles.contentContainer}
                        keyExtractor={item => item.route}
                        ItemSeparatorComponent={VerticalSpacer}
                      />
                    </>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
          <ClassifiedMenu
            visible={this.state.visible}
            onViewAds={() =>
              this.setState({ visible: false }, () =>
                this.props.navigation.navigate(route.CLASSIFIEDMYADS),
              )
            }
            onViewWishList={() =>
              this.setState({ visible: false }, () =>
                this.props.navigation.navigate(route.CLASSIFIEDWISHLIST),
              )
            }
            onDeactive={async () => {
              const data = await this.props.user?.userModules?.filter(function (account) {
                return account.module.name === 'Classified';
              });
              ProfileServices.deactivateUserModule({ id: data[0]._id }, this.props.user.userData.token)
                .then(async (res) => {
                  this.setState({ visible: false })
                  await this.props.authActions.getUserModules(this.props.user.userData.token)
                  this.props.navigation.replace(route.MAIN);
                })
                .catch((err) => {
                  // console.log(err);
                })
            }}
            onClose={() => this.setState({ visible: false })}
          />
          <DeleteModal
            alert
            visible={alertModal}
            confirm={() => {
              this.setState({ alertModal: false }, () =>
                this.props.navigation.goBack(),
              );
            }}
            text={msgToDisplay}
          />
        </Container>
        <BottomDeleteMenu
          visible={this.state.removeModalVisible}
          onClose={() => this.setState({ removeModalVisible: false })}
          data={{
            icon: deleteGif,
            text: 'Are you sure you want to delete this?',
            buttonText: 'Delete',
            onPress: () => {
              this.setState({ removeModalVisible: false });
              setTimeout(() => {
                this.removeFromWishlist(this.state.addToDelete, this.state.addIndex);
              }, 1000);
            },
          }}
          theme="classified"
        />
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ClassifiedWishList);
