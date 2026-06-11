import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList, ScrollView} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {Button, Container, Input} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import Copy from '../../../../assets/svg/copy.svg';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from '../../../../components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../../../lib/utils/localstorage';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_BOOK_KEEPING,
  iconColor: themeStyle.COLOR_WHITE,
};
const Texts = [
  {
    title: 'Track your Finances',
    description: 'Financial tracking and book-keeping in one place.',
  },
  {
    title: 'Easy expense management',
    description:
      'Easy and hassle-free management of expenses and transactions.',
  },
  {
    title: 'Create your Budget',
    description:
      'Create a budget, save more, and feel confident about your financial future.',
  },
];
class WalletSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0};
  }
  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  _renderItem({item, index}) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderRadius: 5,
          // height:100,
          padding: '5%',
          // maxWidth: SCREEN_WIDTH * 0.8,
          // marginHorizontal: "10%"
          // marginTop: -50,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
            color: themeStyle.COLOR_BOOK_KEEPING,
          }}
        >
          {item.title}
        </Text>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {item.description}
        </Text>
      </View>
    );
  }

  get pagination() {
    const {activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={Texts.length}
        activeDotIndex={activeIndex}
        // containerStyle={{ marginTop: -20 }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 7.5,
          marginHorizontal: 2,
          backgroundColor: themeStyle.CLASSIFIED_HOME,
        }}
        inactiveDotStyle={{
          width: 25,
          height: 25,
          borderRadius: 12.5,
          marginHorizontal: 2,
          backgroundColor: themeStyle.COLOR_SILVER,
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    );
  }

  storeData = async value => {
    try {
      await AsyncStorage.setItem('Wallet_Splash', value);
    } catch (e) {}
  };

  render() {
    return (
      <Container color>
        <View style={{flex: 0.2}}>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={Texts}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({activeIndex: index})}
          />
        </View>
        <View style={{height: null}}>{this.pagination}</View>
        <View style={{flex: 0.3, padding: '5%'}}>
          {this.state.activeIndex < Texts.length - 1 ? (
            <View style={styles.buttonflex}>
              <Button
                splash
                title="Skip"
                customColor="#F3F0F0"
                titleColor={themeStyle.COLOR_BLACK}
                width={SCREEN_WIDTH * 0.35}
              />
              <Button
                splash
                title="Next"
                customColor={themeStyle.BOOK_KEEPING_PINK}
                titleColor={themeStyle.COLOR_BLACK}
                width={SCREEN_WIDTH * 0.35}
                onPress={() => this.carousel.snapToNext()}
              />
            </View>
          ) : (
            <View style={{}}>
              <Button
                title="Start!"
                customColor={themeStyle.BOOK_KEEPING_PINK}
                titleColor={themeStyle.COLOR_BLACK}
                width={SCREEN_WIDTH * 0.9}
                onPress={async () => {
                  await storeLocalData(
                    LOCAL_STORAGE_KEYS.WALLETSPLASH,
                    JSON.stringify(true),
                  );
                  this.props.navigation.navigate(route.WALLETHOME);
                }}
              />
            </View>
          )}
        </View>
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
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletSplash);
