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
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const Texts = [
  {
    title: 'Secure Dating and Matchmaking',
    description: '	Connect with your soulmate on a secure platform.',
  },
  {
    title: 'Scam-free Connections',
    description:
      'Identity verification of users makes it a scam free dating platform.',
  },
  {
    title: 'Exclusive Medical Dating Site',
    description:
      'Connecting with like-minded medical singles in search of love.',
  },
];
class ConnectSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0};
  }
  componentDidMount = () => {
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
            color: themeStyle.PINK,
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
        containerStyle={{marginTop: -20, marginBottom: -20}}
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
      await AsyncStorage.setItem('Connect_Splash', value);
    } catch (e) {
      console.log();
    }
  };

  render() {
    return (
      <Container color>
        <View style={styles.container}>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}
          ></View>

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
                  customColor={themeStyle.SPANISH_PINK}
                  titleColor={themeStyle.COLOR_BLACK}
                  width={SCREEN_WIDTH * 0.35}
                  onPress={() => this.carousel.snapToNext()}
                />
              </View>
            ) : (
              <View style={{}}>
                <Button
                  title="Start!"
                  customColor={themeStyle.SPANISH_PINK}
                  titleColor={themeStyle.COLOR_BLACK}
                  width={SCREEN_WIDTH * 0.9}
                  onPress={async () => {
                    await storeLocalData(
                      LOCAL_STORAGE_KEYS.CONNECTSPLASH,
                      JSON.stringify(true),
                    );
                    this.props.navigation.navigate(route.CONNECTHOME);
                    setTimeout(() => {
                      console.log(
                        getLocalData(LOCAL_STORAGE_KEYS.CONNECTSPLASH),
                      );
                    }, 5000);
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectSplash);
