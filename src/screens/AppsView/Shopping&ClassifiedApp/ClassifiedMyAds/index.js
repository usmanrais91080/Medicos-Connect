import React, {Component} from 'react';

import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Container, DeleteModal, Icon, Loader} from '../../../../components';
import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {ClassifiedServices} from '../../../../services';
import {connect} from 'react-redux';
import moment from 'moment';
import deleteGif from '../../../../assets/svg/delete-Gif-Mental.svg';

import Tick from '../../../../assets/svg/tick-1.svg';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';
class ClassifiedMyAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      ads: [],
      loading: true,
      refreshing: false,
      modalVisible: false,
      addToDelete: '',
      addIndex: 0,
      refresh: false,
      alertModal: false,
      msgToDisplay: 'Ad deleted successfully',
      activeAds: [],
      inactiveAds: [],
      adsPage: 1,
      limit: 10,
      inActiveAdsPage: 1,
      activeAdsPage: 1,
      isFetchMore: false,
      isFetchMoreActive: false,
      isFetchMoreInactive: false,
    };
  }

  componentDidMount = () => {
    this.getMyAds();
  };

  truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num);
  };

  getMyAds = () => {
    const {adsPage, limit, ads, refreshing} = this.state;
    ClassifiedServices.getMyAds(this.props.user.userData.token, adsPage, limit)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({
            ads: refreshing ? res.data.data : [...ads, ...res.data.data],
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(err => null);
  };

  getMyActiveAds = () => {
    const {activeAdsPage, limit, activeAds, refreshing} = this.state;
    const {token} = this.props.user.userData;
    ClassifiedServices.getMyActiveAds(token, activeAdsPage, limit).then(res => {
      if (res.data.code == 200) {
        this.setState({
          activeAds: refreshing
            ? res.data.data
            : [...activeAds, ...res.data.data],
          loading: false,
          refreshing: false,
        });
      }
    });
  };

  getMyInactiveAds = () => {
    const {inActiveAdsPage, limit, inactiveAds, refreshing} = this.state;
    const {token} = this.props.user.userData;
    ClassifiedServices.getMyInactiveAds(token, inActiveAdsPage, limit).then(
      res => {
        if (res.data.code == 200) {
          this.setState({
            inactiveAds: refreshing
              ? res.data.data
              : [...inactiveAds, ...res.data.data],
            loading: false,
            refreshing: false,
          });
        }
      },
    );
  };

  _renderAdsItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
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
            <Text style={styles.blackText}>
              {item?.price} {item?.currency_name}
            </Text>
          </View>

          <View style={styles.rowStyle}>
            {item.is_barter ? (
              <Text style={styles.grayText}>{'Barter'}</Text>
            ) : (
              <Text style={styles.grayText}>{'       '}</Text>
            )}
            {item.status == 'Available' ? <Tick /> : null}
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.blackText}>
              {this.truncateString(item.location.address, 15)}...,
            </Text>
            <Text style={styles.grayText1}>
              {item?.created_at && moment(item.created_at).format('DD MMM')}
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
                deleteModal: true,
                addToDelete: item._id,
                addIndex: index,
              })
            }>
            <Icon.MaterialCommunityIcons name="delete" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  deleteAd = () => {
    ClassifiedServices.deleteAd(
      this.state.addToDelete,
      this.props.user.userData.token,
    )
      .then(res => {
        if (res.data.code == 200) {
          let tempAdds = this.state.ads.filter(
            (data, ind) => ind != this.state.addIndex,
          );
          this.setState({
            ads: tempAdds,
            alertModal: true,
          });
        }
      })
      .catch(err => null);
  };

  onEndReached = () => {
    const {activeTab, isFetchMore, isFetchMoreActive, isFetchMoreInactive} =
      this.state;
    if (activeTab == 0 && isFetchMore) {
      this.setState(
        prevState => ({
          adsPage: prevState.adsPage + 1,
          isFetchMore: false,
        }),
        () => this.getMyAds(),
      );
    } else if (activeTab == 1 && isFetchMoreActive) {
      this.setState(
        prevState => ({
          activeAdsPage: prevState.activeAdsPage + 1,
          isFetchMoreActive: false,
        }),
        () => this.getMyActiveAds(),
      );
    } else if (activeTab == 2 && isFetchMoreInactive) {
      this.setState(
        prevState => ({
          inActiveAdsPage: prevState.inActiveAdsPage + 1,

          isFetchMoreInactive: false,
        }),
        () => this.getMyInactiveAds(),
      );
    }
  };

  onPressAllAds = () => {
    this.setState(
      {activeTab: 0, loading: true, activeAds: [], inactiveAds: [], ads: []},
      () => this.getMyAds(),
    );
  };

  onPressActiveAds = () => {
    this.setState(
      {activeTab: 1, loading: true, ads: [], inactiveAds: [], activeAds: []},
      () => this.getMyActiveAds(),
    );
  };

  onPressInactiveAds = () => {
    this.setState(
      {activeTab: 2, loading: true, ads: [], activeAds: [], inactiveAds: []},
      () => this.getMyInactiveAds(),
    );
  };

  render() {
    const {
      activeTab,
      loading,
      ads,
      modalVisible,
      refresh,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader color={'#FF9966'} />
          ) : (
            <>
              <View style={styles.topButtonsContainer}>
                <TouchableOpacity
                  style={styles.topButton}
                  onPress={this.onPressAllAds}>
                  <Text style={styles.buttonText}>All Ads</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.topButton}
                  onPress={this.onPressActiveAds}>
                  <Text style={styles.buttonText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onPressInactiveAds}
                  style={styles.topButton}>
                  <Text style={styles.buttonText}>Inactive</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                refreshing={refresh}
                onScrollBeginDrag={() => {
                  if (activeTab == 0) {
                    this.setState({isFetchMore: true});
                  } else if (activeTab == 1) {
                    this.setState({isFetchMoreActive: true});
                  } else {
                    this.setState({isFetchMoreInactive: true});
                  }
                }}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  activeTab == 0
                    ? this.getMyAds
                    : activeTab == 1
                    ? this.getMyActiveAds
                    : this.getMyInactiveAds;
                }}
                contentContainerStyle={{
                  paddingVertical: '5%',
                  paddingBottom: '30%',
                }}
                data={
                  activeTab == 0
                    ? ads
                    : activeTab == 1
                    ? this.state.activeAds
                    : this.state.inactiveAds
                }
                ListFooterComponent={() => null}
                onEndReachedThreshold={0.7}
                onEndReached={this.onEndReached}
                renderItem={this._renderAdsItem}
              />
            </>
          )}
        </View>
        <DeleteModal
          visible={modalVisible}
          confirm={() => {
            this.setState({modalVisible: false});
            this.deleteAd();
          }}
          cancel={() => this.setState({modalVisible: false})}
          delete
        />
        <BottomDeleteMenu
          visible={this.state.deleteModal}
          onClose={() => this.setState({deleteModal: false})}
          data={{
            icon: deleteGif,
            text: 'Are you sure you want to delete this?',
            buttonText: 'Delete',
            onPress: () => {
              this.setState({deleteModal: false}, () => this.deleteAd());
            },
          }}
          theme="classified"
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
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
export default connect(mapStateToProps)(ClassifiedMyAds);
