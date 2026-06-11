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
  getLocalData,
} from '../../../../lib/utils/localstorage';
import moment from 'moment';
import {MentalServices} from '../../../../services';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
const Texts = [
  {
    title: 'Therapeutic Indulgence',
    description:
      'Personal diary for journaling personal emotions and experiences.',
  },
  {
    title: 'Support Group',
    description: 'Supportive community for medical professionals.',
  },
  {
    title: 'Health and Fitness',
    description: 'Keep track of your stress level and physical fitness.',
  },
];
class MentalSplash extends Component {
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
            color: themeStyle.MENTAL_PRIMARY,
          }}
        >
          {item.title}
        </Text>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {item.description}
        </Text>
        <Text>{item.text}</Text>
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
          >
            {/* <Mentalsplash width={'90%'} /> */}
          </View>

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
            {this.state.activeIndex < Texts.length - 1 ? (
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
                    await storeLocalData(
                      LOCAL_STORAGE_KEYS.MENTALSPLASH,
                      JSON.stringify(true),
                    );
                    const date = await getLocalData(
                      LOCAL_STORAGE_KEYS.METALTODO,
                    );
                    MentalServices.getNotificationSettings(
                      this.props.user.userData.token,
                    )
                      .then(res => {
                        if (
                          date !== `${moment().format('DD')}` &&
                          `${moment().format('hh:mm A')}` >= '08:00 PM'
                        )
                          this.props.navigation.navigate(route.MENTALTODO);
                        else this.props.navigation.navigate(route.MENTALHOME);
                      })
                      .catch(err => {
                        // console.log("err.response.data : ", err.response.data)
                        this.props.navigation.navigate(route.MENTALHOME);
                      });

                    // setTimeout(async () => {
                    //   if (date) {
                    //     if (date !== `${moment().format('DD')}` && `${moment().format('hh:mm A')}` >= "08:00 PM")
                    //       this.props.navigation.navigate(route.MENTALTODO)
                    //     else
                    //       this.props.navigation.navigate(route.MENTALHOME);
                    //   } else {
                    //     let showQuestion;
                    //     await streakData.forEach((item, index) => {
                    //       if (item.capture_streak) {
                    //         showQuestion = true; //break
                    //         // break;
                    //       }
                    //     });

                    //   }
                    // }, 2000);
                    // setTimeout(() => {
                    //   if (date._W != null) {
                    //     if (date._W != moment().format("DD"))
                    //       this.props.navigation.navigate(route.MENTALTODO)
                    //     else
                    //       this.props.navigation.navigate(route.MENTALHOME);
                    //   } else {
                    //     this.props.navigation.navigate(route.MENTALTODO)
                    //   }
                    // }, 2000);

                    //    this.props.navigation.navigate(route.MENTALHOME);
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

export default connect(mapStateToProps, mapDispatchToProps)(MentalSplash);
