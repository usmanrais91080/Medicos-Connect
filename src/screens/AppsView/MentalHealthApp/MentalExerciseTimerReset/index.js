import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Icon} from '../../../../components';
import Emoji from '../../../../assets/svg/happy.svg';
import StopWatch from '../../../../assets/svg/stopwatch.svg';
import PlayButton from '../../../../assets/svg/play-button.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import moment from 'moment';
import {ChallengeComponent} from '../MentalExerciseDaysChallenge/mental.exercise.challenge.component';
import {MentalServices} from '../../../../services';

var myVar;
class MentalExerciseTimerReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timervalue: 30,
      id: '',
      mentalExerciseDay: false,
    };
  }
  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num);
  };

  componentDidMount = () => {
    if (this.props.route.params.data) {
      this.props.route.params.data.map((item, index) => {
        if (this.props.route.params.index == index) {
          this.setState({
            videoItem: item,
            id: item._id,
          });
        } else if (this.props.route.params.id == item._id) {
          let obj = {
            day: this.props.route.params?.dayId,
            mode: this.props.route.params?.modeId,
            exercise: item._id,
          };
          MentalServices.saveExerciseProgress(
            obj,
            this.props.user.userData.token,
          )
            .then(res => {})
            .catch(err => {
              // console.log(err.response);
            });
        }
      });
    }
    myVar = setInterval(this.myTimer, 1000);
    this.props.navigation.setOptions({
      headerTitle: () => this.headerTitle(),
      // headerRight: () => this.headerRight(),
      // headerLeft: () => this.headerLeft(),
    });
  };
  myTimer = () => {
    if (this.state.timervalue == 0) {
      clearInterval(myVar);
    } else if (this.state.timervalue >= 0) {
      this.setState({timervalue: this.state.timervalue - 1});
    }
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(route.MENTALMOOD, {
              mood: this.state.ads,
            })
          }
          style={{marginRight: 5}}>
          {this.props.user.userData.mental_health_mood != '' ? (
            <Image
              style={{
                width: 30,
                height: 30,
                // backgroundColor: 'red',
              }}
              source={{uri: this.props.user.userData.mental_health_mood?.image}}
            />
          ) : (
            <Emoji />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  headerLeft = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{marginLeft: 15}}>
          <Icon.AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
    );
  };

  headerTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.headerTitleText}>Workout</Text>
        <View style={styles.headerDay}>
          <Text style={styles.headerDayText}>
            Day {this.props.route.params?.day}
          </Text>
        </View>
      </View>
    );
  };

  _renderMainItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({visible: true});
        }}
        style={{
          height: SCREEN_HEIGHT * 0.25,
          width: SCREEN_WIDTH * 0.28,
          borderRadius: 10,
          marginHorizontal: '1%',
        }}>
        {/* <ExerciseThirty width={SCREEN_WIDTH * 0.92} style={{ position: 'absolute' }} /> */}
        <View
          style={{
            width: SCREEN_HEIGHT * 0.15,
            height: SCREEN_HEIGHT * 0.16,
            shadowColor: '#61B687',
            borderBottomColor: '#61B687',
            borderBottomWidth: 1.5,
            borderRightColor: '#61B687',
            borderRightWidth: 0.5,
            borderLeftColor: '#61B687',
            borderLeftWidth: 0.5,
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'white',
            // // borderColor: themeStyle.COLOR_EXERCISE_BUTTON,

            // shadowColor : [' 0px' , '4px',' 4px', '#57A77B'],
            // elevation:5,
          }}>
          <Image
            style={{
              width: SCREEN_HEIGHT * 0.15,
              height: SCREEN_HEIGHT * 0.15,
              resizeMode: 'contain',
              // backgroundColor: 'red',
            }}
            source={item.imageurl}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#5a5959',
              fontSize: 13,
              fontFamily: themeStyle.FONT_REGULAR,
              textAlign: 'center',
            }}>
            {item.title}
            {'\n'}
            <Text style={{fontSize: 13, fontWeight: 'bold'}}>
              x {item.totaltime}{' '}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleSkipFunction = () => {
    if (this.props.route.params.data) {
      this.props.route.params.data.map((item, index) => {
        // if (this.props.route.params.index == index) {
        //   clearInterval(parseInt(this.state.timervalue));
        //   this.props.navigation.navigate(route.MENTALEXERCISEDAYSSKIP, { data: this.props.route.params.data, id: this.props.route.params.data[this.props.route.params.index ]._id ,index:index+1})
        // } else if (this.props.route.params.index >= this.props.route.params.data.length - 1) {
        // this.props.navigation.navigate(route.MENTALEXERCISEDAYCHALLENGESTART)
        // }
        if (this.props.route.params.index == index) {
          clearInterval(parseInt(this.state.timervalue));
          this.props.navigation.navigate(route.MENTALEXERCISEDAYSCHALLENGE, {
            data: this.props.route.params.data,
            id: this.props.route.params.id,
            dayId: this.props.route.params?.dayId,
            modeId: this.props.route.params?.modeId,
            average_time: this.props.route?.params?.average_time,
            day: this.props.route?.params?.day,
          });
        } else if (
          this.props.route.params.index >=
          this.props.route.params.data.length - 1
        ) {
          clearInterval(parseInt(this.state.timervalue));
          this.props.navigation.navigate(
            route.MENTALEXERCISEDAYCHALLENGESTART,
            {
              data: this.props.route.params.data,
              id: this.props.route.params.id,
              dayId: this.props.route.params?.dayId,
              modeId: this.props.route.params?.modeId,
              average_time: this.props.route?.params?.average_time,
              day: this.props.route?.params?.day,
            },
          );
        }
      });
    }
  };

  render() {
    const {videoItem} = this.state;
    return (
      <Container color>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        {/* Top Container */}
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: SCREEN_HEIGHT * 0.05,
          }}>
          <Text style={styles.textStyleMenu}>{'Rest'}</Text>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 55,
                fontFamily: themeStyle.FONT_REGULAR,
                marginVertical: 15,
              },
            ]}>
            {moment
              .utc(parseInt(this.state.timervalue) * 1000)
              .format('mm : ss')}
          </Text>
          <StopWatch />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SCREEN_WIDTH * 0.12,
          }}>
          <TouchableOpacity
            style={styles.buttonStyleDone}
            onPress={() => {
              this.setState({
                timervalue: `${parseInt(this.state.timervalue) + 15}`,
              });
            }}>
            <Text style={[styles.textStylebutton]}>{'+15s'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyleDone}
            onPress={() => {
              this.props.navigation.replace(route.MENTALEXERCISEDAYSSKIP, {
                data: this.props.route.params.data,
                id: this.state.id,
                dayId: this.props.route.params?.dayId,
                modeId: this.props.route.params?.modeId,
                day: this.props.route.params.day,
              });
              // this.handleSkipFunction();
            }}>
            <Text style={[styles.textStylebutton]}>{'Skip'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nextExercise}>Next Exercise</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.replace(route.MENTALEXERCISEDAYSSKIP, {
              data: this.props.route.params.data,
              id: this.state.id,
              dayId: this.props.route.params?.dayId,
              modeId: this.props.route.params?.modeId,
              day: this.props.route.params.day,
            });
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 5,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: themeStyle.COLOR_WHITE,
            width: SCREEN_WIDTH * 0.9,
            borderRadius: 10,
            marginHorizontal: SCREEN_WIDTH * 0.02,
            marginTop: '3%',
            height: 130,
          }}>
          <View
            style={{
              padding: '5%',
              flex: 0.6,
              backgroundColor: themeStyle.ORANGE,
              height: '100%',
              borderTopLeftRadius: 10,
              justifyContent: 'center',
              borderBottomLeftRadius: 10,
            }}>
            <Text
              numberOfLines={3}
              style={{
                color: themeStyle.COLOR_BLACK,
                fontSize: 20,
                fontFamily: themeStyle.FONT_MEDIUM,
                textTransform: 'capitalize',
                marginBottom: 5,
              }}>
              {videoItem?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: themeStyle.FONT_REGULAR,
                color: themeStyle.COLOR_WHITE,
              }}>
              {moment
                .utc(videoItem?.video_time * videoItem?.repetition * 1000)
                .format('mm:ss')}{' '}
              mins{' '}
            </Text>
          </View>
          <View style={{flex: 0.6, alignItems: 'flex-end'}}>
            <Image
              style={{
                width: SCREEN_HEIGHT * 0.15,
                height: SCREEN_HEIGHT * 0.15,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                resizeMode: 'contain',
              }}
              source={{uri: videoItem?.banner}}
            />
          </View>
          <View style={styles.playButtonContainer}>
            <PlayButton />
            <Text style={styles.playText}>Play</Text>
          </View>
        </TouchableOpacity>
        <ChallengeComponent
          visible={this.state.visible}
          onClose={() => {
            this.setState({visible: false});
          }}
          uri={videoItem?.banner}
          name={videoItem?.name}
          description={videoItem?.description}
          emojiImage={this.props.user.userData.mental_health_mood}
          emojiOnPress={() =>
            unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.props.navigation.navigate(route.MENTALMOOD, {
                  mood: this.state.ads,
                })
          }
          done={() =>
            this.props.navigation.navigate(
              route.MENTALEXERCISE,
              //   ,
              //   {
              //   mood: this.state.ads,
              // }
            )
          }
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
export default connect(mapStateToProps)(MentalExerciseTimerReset);
