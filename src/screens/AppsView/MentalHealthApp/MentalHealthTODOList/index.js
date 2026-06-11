import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {Button, Container, Input, Loader} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from '../../../../components/Icon';
import {
  LOCAL_STORAGE_KEYS,
  storeLocalData,
  getLocalData,
} from '../../../../lib/utils/localstorage';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import moment from 'moment';
import Filter from '../../../../assets/svg/filterSetting.svg';

import {MentalServices} from '../../../../services';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.MENTAL_PRIMARY,
  iconColor: themeStyle.COLOR_WHITE,
};

class MentalSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      loading: true,
      loading1: false,
    };
    this.carousel = null;
  }
  componentDidMount = async () => {
    await storeLocalData(LOCAL_STORAGE_KEYS.METALTODO, moment().format('DD'));
    // setTimeout(async () => {
    //     const data = await getLocalData(LOCAL_STORAGE_KEYS.METALTODO)
    //     console.log("data : ", data);
    // }, 2000);
    this.getStreakQuestions();
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.carousel.snapToNext();
    setTimeout(() => {
      this.state.data.length > 1 ? this.carousel.snapToPrev() : null;
    }, 500);

    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
      headerRight: () => this.headerRight(),
    });
  };

  getStreakQuestions = () => {
    MentalServices.getStreakQuestions(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data, loading: false});
      })
      .catch(
        err => null,
        //  console.log("getStreakQuestions : ", err.response.data)
      );
  };

  headerLeft = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 15}}
        onPress={() =>
          this.props.navigation.replace(route.MAIN, {screen: route.HOME})
        }>
        <Icon.AntDesign
          name="arrowleft"
          size={25}
          color={themeStyle.COLOR_WHITE}
        />
      </TouchableOpacity>
    );
  };

  headerRight = () => {
    return (
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => this.props.navigation.navigate(route.MENTALDAILYFILTER)}>
        <Filter />
      </TouchableOpacity>
    );
  };

  handleGivenAnswer = () => {
    // this.carousel.snapToNext();
    this.setState({loading1: true});
    MentalServices.giveAnswer(
      `${this.state.data[this.state.activeIndex]?._id}`,
      {answer: this.state.answerId},
      this.props.user.userData.token,
    )
      .then(res => {
        this.carousel.snapToNext();
        this.setState({answerId: '', loading1: false});
      })
      .catch(
        err => null,
        // console.log("giveAnswer : ", err.response.data)
      );
  };

  renderMoods = (item, index, id) => {
    return (
      <TouchableOpacity
        disabled={this.state.loading1}
        // onPress={() => this.setState({ questionId: item?._id })}
        onPress={() => {
          let array = [...this.state.data];
          array[this.state.activeIndex]?.metadata?.choices?.map((e, i) => {
            if (e._id == item._id) {
              // if (array[this.state.activeIndex].metadata.choices[index].selected) {
              //     array[this.state.activeIndex].metadata.choices[index] = { ...array[this.state.activeIndex].metadata.choices[index], selected: true }
              // } else {
              //     array[this.state.activeIndex].metadata.choices[index] = { ...array[this.state.activeIndex].metadata.choices[index], selected: false }

              // }
              this.setState({questionId: id, answerId: item._id});
              array[this.state.activeIndex].metadata.choices[i] = {
                ...array[this.state.activeIndex].metadata.choices[i],
                selected: true,
              };
            } else {
              array[this.state.activeIndex].metadata.choices[i] = {
                ...array[this.state.activeIndex].metadata.choices[i],
                selected: false,
              };
            }
          });
          //   if (array[this.state.activeIndex].metadata.choices[index].selected) {
          //       array[index] = {...array[index], selected: false};
          //   } else {
          //       array[index] = {...array[index], selected: true};
          //   }
          this.setState({data: array});
        }}
        // key={item.toString()}
        style={{margin: '4%'}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.text}
            {/* {item} */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = (element, ind) => {
    // console.log(element);
    return (
      <View style={styles.carouselContainer}>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={{uri: element?.icon}}
            style={{height: 200, width: SCREEN_WIDTH * 0.6}}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{fontFamily: themeStyle.FONT_REGULAR, fontSize: 20}}>
            {element.upper_text}
          </Text>
          <Text style={{fontFamily: themeStyle.FONT_BOLD, fontSize: 18}}>
            {element.middle_text}
          </Text>
          <Text
            style={{
              fontFamily: !element.middle_text
                ? themeStyle.FONT_BOLD
                : themeStyle.FONT_REGULAR,
              fontSize: 20,
            }}>
            {element.lower_text}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={element?.metadata?.choices}
            // data={item?.options}
            numColumns={2}
            renderItem={({item, index}) =>
              this.renderMoods(item, index, element._id)
            }
            contentContainerStyle={styles.contentContainer}
            keyExtractor={item => item.toString()}
            // ItemSeparatorComponent={VerticalSpacer}
          />
        </View>
      </View>
    );
  };

  get pagination() {
    const {activeIndex, data} = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{marginTop: 20}}
        dotStyle={{
          width: 30,
          height: 3,
          borderRadius: 7.5,
          marginHorizontal: 2,
          backgroundColor: '#A287AF',
        }}
        inactiveDotStyle={{
          width: 20,
          height: 3,
          borderRadius: 12.5,
          marginHorizontal: 2,
          backgroundColor: themeStyle.SPANISH_PINK,
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const {data, loading, loading1} = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: '25%', paddingTop: '5%'}}
            showsVerticalScrollIndicator={false}>
            {/* <Mentalsplash width={'90%'} /> */}

            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.state.data}
              // data={Texts}
              scrollEnabled={false}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH * 0.78}
              renderItem={({item, index}) => this._renderItem(item, index)}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
            {/* <View style={styles.contentContainer}>

                    </View> */}
            {/* {
                            Texts.map((item, index) => {
                                return (
                                    this._renderItem(item, index)
                                )
                            })
                        } */}
            {this.pagination}

            {/* <Text style={[styles.text, {fontFamily: themeStyle.FONT_REGULAR}]}>
            Easy to Access
          </Text>
          <Text style={styles.text}>
            Lorem Ipsum has been the industry's standard dummy text.
          </Text> */}
            {this.state.activeIndex < data.length - 1 ? (
              <View style={styles.buttonflex}>
                {/* <Button
                            // splash
                            title="Skip"
                            customColor="#F3F0F0"
                            titleColor={themeStyle.COLOR_BLACK}
                            width={SCREEN_WIDTH * 0.35}
                        /> */}
                <Button
                  splash
                  disabled={loading1}
                  loading={loading1}
                  title="Next"
                  customColor={'#A287AF'}
                  titleColor={themeStyle.COLOR_WHITE}
                  width={SCREEN_WIDTH * 0.8}
                  onPress={() => {
                    if (this.state.answerId) {
                      // this.carousel.snapToNext()
                      this.handleGivenAnswer();
                    } else {
                      alert('Please select your answer');
                    }
                  }}
                />
              </View>
            ) : (
              <View style={styles.buttonflex}>
                <Button
                  title="Finish"
                  disabled={loading1}
                  loading={loading1}
                  customColor={'#A287AF'}
                  titleColor={themeStyle.COLOR_WHITE}
                  width={SCREEN_WIDTH * 0.8}
                  onPress={async () => {
                    this.props.navigation.navigate(route.MENTALHOME);
                  }}
                />
              </View>
            )}
          </ScrollView>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MentalSplash);
