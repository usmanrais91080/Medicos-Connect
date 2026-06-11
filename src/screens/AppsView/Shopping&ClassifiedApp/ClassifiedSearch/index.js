import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchActions} from '../../../../redux/actions/search';
import {Container, Icon} from '../../../../components';
import {VerticalSpacer} from '../../../../lib/utils/global';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import moment from 'moment';
import {route} from '../../../../lib/utils/constants';

class ClassifiedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: this.props?.route?.params?.addData,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      header: () => this.headerRight(),
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerStyle}>
        <Icon.AntDesign
          name="arrowleft"
          onPress={() => this.props.navigation.goBack()}
          size={25}
          color={themeStyle.COLOR_WHITE}
        />
        <View style={{width: '85%', marginLeft: '4%'}}>
          <Input
            containerStyle={styles.containerStyle1}
            placeholderTextColor={'#959FAE'}
            onChangeText={text => this.filterAds(text)}
            rightIcon={
              <TouchableOpacity
                disabled={true}
                onPress={() => {
                  this.props.searchActions.classifiedSearch(
                    this.props.search.classifiedSearch,
                  );
                  this.props.navigation.goBack();
                }}
                style={{marginRight: 10}}>
                <Icon.FontAwesome
                  name="search"
                  size={20}
                  color={themeStyle.CLASSIFIED_HOME}
                />
              </TouchableOpacity>
            }
            inputContainerStyle={{
              ...styles.inputContainerStyle1,
            }}
            inputStyle={styles.inputStyle1}
            value={this.state.value}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                this.setState({ads: this.props?.route?.params?.addData});
              }
            }}
          />
        </View>
      </View>
    );
  };

  _renderItem = (item, index) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.grayText}>{item.name}</Text>
        <Icon.FontAwesome
          name="angle-right"
          size={30}
          color={themeStyle.PRIMARY_TINT_COLOR}
        />
      </View>
    );
  };
  _renderAdsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          this.props.navigation.navigate(route.CLASSIFIEDPRODUCTDETAIL, {
            productId: item._id,
          })
        }
        style={styles.itemContainer}>
        <View>
          <ImageBackground
            source={{
              uri: item.images[0]?.image,
              // 'https://wallpapercave.com/wp/wp3396910.jpg'
            }}
            style={styles.imageStyle}>
            {/* <View style={{ alignItems: "flex-end", padding: "5%" }}>
                            {item.in_wishlist ?
                                <TouchableOpacity onPress={() => this.removeFromWishlist(item._id)}>
                                    <Icon.AntDesign name="heart" size={20} color='#FF9966' />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.AddToWishlist(item._id)}>
                                    <Icon.AntDesign name="hearto" size={20} color='#FF9966' />
                                </TouchableOpacity>
                            }
                        </View> */}
          </ImageBackground>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.grayText}>{item.name}</Text>
          <Text style={styles.blackText}>{item.price}</Text>
          <View style={styles.rowStyle}>
            <Text style={styles.grayText}>
              {this.truncateString(item.title, 20)}
            </Text>
            <Text style={styles.grayText}>
              { item?.user?.created_at && moment(item.user.created_at).format('DD MMM')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num);
  };
  filterAds = text => {
    if (text.length > 0) {
      const filterData = this.state.ads.filter(({name}) => {
        const itemData = `${name}`;

        const itemDataUpperCase = itemData.toUpperCase();

        const textData = text.toUpperCase();

        return itemDataUpperCase.indexOf(textData) > -1;
      });
      this.setState({ads: filterData});
    }
  };

  render() {
    const {ads} = this.state;

    return (
      <Container>
        <View style={styles.container}>
          {ads.length == 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            </View>
          )}
        </View>
        {/* <FlatList data={this.state.data} renderItem={({ item, index }) => this._renderItem(item, index)} ItemSeparatorComponent={VerticalSpacer} /> */}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {search: state.searchReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiedSearch);
