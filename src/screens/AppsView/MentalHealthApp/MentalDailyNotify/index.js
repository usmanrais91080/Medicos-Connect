import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {Button, Container} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {Pagination} from 'react-native-snap-carousel';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {MentalServices} from '../../../../services';
import ToggleSwitch from 'toggle-switch-react-native';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class MentalSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      loading: true,
    };
    this.carousel = null;
  }
  componentDidMount = async () => {
    this.getStreakQuestions();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  getStreakQuestions = () => {
    MentalServices.getStreakQuestions(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data});
      })
      .catch(err => {
        //  console.log("getStreakQuestions : ", err.response.data)
      });
  };

  renderMoods = ({item, index}) => {
    return (
      <View
        // onPress={() => this.handleSelectMood(item?._id)}
        // onPress={() => {
        //   let count = this.state.counter;
        //   let array = [...this.state.hobbies];
        //   if (array[index].selected) {
        //     if (count <= 5) {
        //       array[index] = {...array[index], selected: false};
        //       count = count - 1;
        //     }
        //   } else {
        //     if (count < 5) {
        //       array[index] = {...array[index], selected: true};
        //       count = count + 1;
        //     }
        //   }
        //   this.setState({hobbies: array, counter: count});
        // }}
        // key={item.toString()}
        style={{
          marginHorizontal: '5%',
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          elevation: 2,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderRadius: 15,
          backgroundColor: '#f8f8f8',
          paddingHorizontal: '2.5%',
          paddingVertical: 5,

          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.2}}>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 2,
              height: 62,
              width: 56,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: themeStyle.MENTAL_DARK,
              padding: '5%',
              borderRadius: 10,
            }}>
            {/* {item.icon} */}
            <Image
              source={{uri: item?.icon}}
              resizeMode="contain"
              style={{
                height: 42,
                width: 36,
              }}
            />

            <View
              style={{
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themeStyle.MENTAL_PRIMARY,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: themeStyle.MENTAL_DARK,
                right: -10,
                bottom: 45,
                position: 'absolute',
              }}>
              <Text style={{fontFamily: themeStyle.FONT_MEDIUM, color: '#fff'}}>
                {item.highest_streak}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.7, paddingLeft: '5%'}}>
          <Text style={{fontFamily: themeStyle.FONT_MEDIUM}}>
            {`${index == 0 ? item.upper_text + ' ' : item.upper_text}${
              item.middle_text
            } ${item.lower_text}`}
          </Text>
        </View>
        <View style={{flex: 0.175, alignItems: 'flex-end'}}>
          <ToggleSwitch
            animationSpeed={3}
            isOn={item.capture_streak}
            onColor={themeStyle.MENTAL_DARK}
            offColor={themeStyle.PRIMARY_TINT_COLOR}
            label=""
            thumbOffStyle={{backgroundColor: '#fff'}}
            thumbOnStyle={{backgroundColor: '#fff'}}
            size="medium"
            onToggle={isOn => {
              let array = [...this.state.data];
              array[index] = {...array[index], capture_streak: isOn};
              this.setState({data: array});
            }}
          />
        </View>
      </View>
    );
  };

  _renderItem = (item, index) => {
    return (
      <View style={styles.carouselContainer}>
        <View style={{flex: 0.5}}></View>
        <View style={{flex: 0.5}}>
          {/* <Text style={{ fontFamily: themeStyle.FONT_REGULAR, fontSize: 20 }}>{
                        index == 0 ? "How much" : index == 5 ? "How many" : "Have you"}</Text> */}
          <Text style={{fontFamily: themeStyle.FONT_BOLD, fontSize: 18}}>
            {item.text}
          </Text>
          {/* <Text style={{ fontFamily: themeStyle.FONT_REGULAR, fontSize: 20 }}>{"Today?"}</Text> */}
        </View>
      </View>
    );
  };

  handleToggleStreak = () => {
    let array = [];

    this.state.data.map((item, index) => {
      array.push({question: item._id, capture_streak: item.capture_streak});
    });
    MentalServices.toggleStreak(array, this.props.user.userData.token)
      .then(res => {})
      .catch(err => {
        // console.log(err.response.data);
      });
  };

  get pagination() {
    const {activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={Texts.length}
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
    return (
      <Container color>
        <ScrollView
          contentContainerStyle={{paddingBottom: '35%', paddingTop: '5%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 0.8}}>
            <Text
              style={{
                marginLeft: '5%',
                fontSize: 22,
                fontFamily: themeStyle.FONT_REGULAR,
                color: '#5a5959',
              }}>
              Daily{' '}
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: themeStyle.FONT_BOLD,
                  color: '#C666FF',
                }}>
                Tasks
              </Text>
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              renderItem={this.renderMoods}
              contentContainerStyle={styles.contentContainer}
              keyExtractor={item => item.toString()}
              // ItemSeparatorComponent={VerticalSpacer}
            />
          </View>

          <View style={styles.buttonflex}>
            <Button
              title="Done"
              customColor={'#A287AF'}
              titleColor={themeStyle.COLOR_WHITE}
              width={SCREEN_WIDTH * 0.9}
              onPress={async () => {
                this.handleToggleStreak();
                this.props.navigation.navigate(route.MENTALHOME);
              }}
            />
          </View>
        </ScrollView>
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
