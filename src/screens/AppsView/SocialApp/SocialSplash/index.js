import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {Button, Container} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../../../lib/utils/localstorage';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const Texts = [
  {
    title: 'Interactive Platform',
    description: 'Convenient and easy connection with medical associates.',
  },
  {
    title: 'Global Networking',
    description: 'Expand medical networking through a mobile app.',
  },
  {
    title: 'Share your Ideas',
    description: 'Share informative content.',
  },
];
class SocialSplash extends Component {
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
            color: themeStyle.YELLOW,
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

  render() {
    return (
      <Container color>
        {/* <ScrollView contentContainerStyle={{ paddingBottom: "25%" }} showsVerticalScrollIndicator={false}> */}

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

          {/* <Text style={[styles.text, {fontFamily: themeStyle.FONT_REGULAR}]}>
            Easy to Access
          </Text>
          <Text style={styles.text}>
            Lorem Ipsum has been the industry's standard dummy text.
          </Text> */}
          <View style={{flex: 0.3, paddingHorizontal: '5%'}}>
            {/* {this.state.activeIndex < Texts.length - 1 ? (
                <View style={styles.buttonflex}>
                  <Button
                    // splash
                    title="Skip"
                    customColor="#F3F0F0"
                    titleColor={themeStyle.COLOR_BLACK}
                    width={SCREEN_WIDTH * 0.35}
                  />
                  <Button
                    // splash
                    title="Next"
                    customColor={'#FC8076'}
                    titleColor={themeStyle.COLOR_BLACK}
                    width={SCREEN_WIDTH * 0.35}
                    onPress={() => this.carousel.snapToNext()}
                  />
                </View>
              ) : (
                <View style={{}}>
                  <Button
                    title="Start!"
                    customColor={'#FC8076'}
                    titleColor={themeStyle.COLOR_BLACK}
                    width={SCREEN_WIDTH * 0.9}
                    onPress={async () => {
                      await storeLocalData(LOCAL_STORAGE_KEYS.MENTALSPLASH, JSON.stringify(true));
                      const date = getLocalData(LOCAL_STORAGE_KEYS.METALTODO);
                      setTimeout(() => {
                        if (date._W != null) {
                          if (date._W != moment().format("DD"))
                            this.props.navigation.navigate(route.MENTALTODO)
                          else
                            this.props.navigation.navigate(route.MENTALHOME);
                        } else {
                          this.props.navigation.navigate(route.MENTALTODO)
                        }
                      }, 2000);

                      //    this.props.navigation.navigate(route.MENTALHOME);
                    }}
                  />
                </View>
              )} */}
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
                  customColor={themeStyle.CYAN_BLUE}
                  titleColor={themeStyle.COLOR_BLACK}
                  width={SCREEN_WIDTH * 0.35}
                  onPress={() => this.carousel.snapToNext()}
                />
              </View>
            ) : (
              <View style={{}}>
                <Button
                  title="Start!"
                  customColor={themeStyle.CYAN_BLUE}
                  titleColor={themeStyle.COLOR_BLACK}
                  width={SCREEN_WIDTH * 0.9}
                  onPress={async () => {
                    await storeLocalData(
                      LOCAL_STORAGE_KEYS.SOCIALSPLASH,
                      JSON.stringify(true),
                    );
                    this.props.navigation.navigate(route.SOCIALHOME);
                  }}
                />
              </View>
            )}
          </View>
        </View>
        {/* </ScrollView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialSplash);
