import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Icon} from '../../../../components';
import Emoji from '../../../../assets/svg/happy.svg';
import Pause from '../../../../assets/svg/pause-button.svg';
import Next from '../../../../assets/svg/next-button.svg';
import Help from '../../../../assets/svg/help-button.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {connect} from 'react-redux';
import moment from 'moment';

import Video from 'react-native-video';
import {ChallengeComponent} from '../MentalExerciseDaysChallenge/mental.exercise.challenge.component';
import Sound from 'react-native-sound';

var myVar;
var myVar1;
class MentalExerciseDaysSkip extends Component {
  constructor(props) {
    super(props);
    this.sound = new Sound(
      require('../../../../assets/sounds/countdown.mp3'),
      '',
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      },
    );
    this.state = {
      visible: false,
      timervalue: '',
      ind: 0,
      data: [],
      mentalExerciseDay: false,
      paused: true,
      counter: false,
      time: 3,
      videoLoading: false,
    };
    this.videoRef = null;
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
        if (item._id == this.props.route.params.id) {
          this.setState({
            videoData: item,
            timervalue: item.video_time * item.repetition,
            ind: index + 1,
          });
        }
      });
    }
    this.props.navigation.setOptions({
      headerTitle: () => this.headerTitle(),
    });
  };

  componentWillUnmount() {
    // Stop the sound if it's playing and release resources when component unmounts
    this.sound.stop(() => {
      this.sound.release();
    });
  }

  startInterval = text => {
    this.myInterval(parseInt(this.state.timervalue));
  };

  headerTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.headerTitleText}>Workout</Text>
        <View style={styles.headerDay}>
          <Text style={styles.headerDayText}>
            Day {this.props.route.params.day}
          </Text>
        </View>
      </View>
    );
  };

  myInterval = () => {
    setInterval(() => {
      if (this.state.timervalue == 0) {
        clearInterval(this.myInterval(this.state.timervalue));
        this.setState({timervalue: 0, paused: true});
      } else {
        this.setState({timervalue: this.state.timervalue - 1});
      }
    }, 1000);
  };

  handleNextVideo = () => {
    if (this.props.route.params.data) {
      this.props.route.params.data.map((item, index) => {
        if (this.state.ind == index) {
          clearInterval(parseInt(this.state.timervalue));
          this.setState({
            paused: true,
            videoData: item,
            timervalue: item?.video_time * item?.repetition,
            ind: index + 1,
            id: this.props.route.params.data[index + 1]?._id,
          });
        } else if (this.state.ind > this.props.route.params.data.length - 1) {
          this.props.navigation.navigate(route.MENTALEXERCISEDAYCHALLENGESTART);
        }
      });
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
          onPress={() => {
            this.props.navigation.getState();
          }}
          style={{marginLeft: 15}}>
          <Icon.AntDesign name="arrowleft" size={25} color={'white'} />
        </TouchableOpacity>
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
          }}>
          <Video
            style={{
              width: SCREEN_HEIGHT * 0.15,
              height: SCREEN_HEIGHT * 0.15,
              resizeMode: 'contain',
            }}
            source={{uri: item?.video}}
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

  myTimer = () => {
    const {time} = this.state;
    if (time == 1) {
      clearInterval(myVar);
    } else if (time >= 0) {
      this.setState({time: time - 1});
    }
  };
  myTimer1 = () => {
    const {timervalue} = this.state;
    if (timervalue == 0) {
      clearInterval(myVar1);
      this.setState({paused: true, time: 3});
    } else if (timervalue > 0) {
      this.setState({timervalue: timervalue - 1});
    }
  };
  render() {
    const {counter, time, paused, timervalue, videoData, id} = this.state;

    return (
      <Container>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        {/* Top Container */}
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={{flex: 0.5}}>
            <Video
              ref={e => (this.videoRef = e)}
              repeat
              resizeMode="contain"
              style={{
                height: SCREEN_HEIGHT * 0.35,
                width: SCREEN_WIDTH * 0.9,
                alignSelf: 'center',
                backgroundColor: themeStyle.WHITE_SMOKE,
              }}
              onLoadStart={() => {
                this.setState({videoLoading: true});
              }}
              onLoad={() => {
                this.setState({videoLoading: false});
              }}
              source={{uri: videoData?.video}}
            />
            {this.state.videoLoading ? (
              <ActivityIndicator
                size="large"
                color={themeStyle.ORANGE}
                style={{position: 'absolute', top: '40%', left: '45%'}}
              />
            ) : null}
            <View
              style={{
                alignItems: 'center',
                marginVertical: '5%',
                alignSelf: 'center',
              }}>
              <Text style={styles.textStyleMenu}>{videoData?.name}</Text>
              <View
                style={{
                  height: 2,
                  width: SCREEN_WIDTH * 0.85,
                  backgroundColor: themeStyle.ORANGE_DARK,
                }}></View>
            </View>
            {counter ? (
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: 100,
                  padding: '5%',
                  backgroundColor: themeStyle.WHITE_SMOKE,
                  borderRadius: 10,
                  marginVertical: '5%',
                }}>
                <Text
                  style={{
                    ...styles.textStyle,
                    fontSize: 55,
                    fontFamily: themeStyle.FONT_REGULAR,
                    color: themeStyle.COLOR_BLACK,
                  }}>
                  {time}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  padding: '5%',
                  backgroundColor: themeStyle.WHITE_SMOKE,
                  borderRadius: 10,
                  marginVertical: '5%',
                }}>
                <Text
                  style={{
                    ...styles.textStyle,
                    fontSize: 55,
                    fontFamily: themeStyle.FONT_REGULAR,
                    color: themeStyle.COLOR_BLACK,
                  }}>
                  {moment.utc(timervalue * 1000).format('mm:ss')}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'flex-end',
              paddingBottom: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
                marginHorizontal: SCREEN_WIDTH * 0.1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({visible: true});
                }}
                style={{alignSelf: 'center'}}>
                <Help />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!paused) {
                    clearInterval(myVar1);
                    this.setState({paused: !paused, time: 3});
                    return;
                  }

                  this.sound.play(success => {
                    if (!success) {
                      console.log('Sound playback failed');
                    }
                    this.sound.release();
                  });

                  if (timervalue === 1) {
                    this.setState({
                      timervalue: videoData?.video_time * videoData?.repetition,
                      counter: true,
                      paused: false,
                    });
                  } else {
                    this.setState({counter: true});
                    setTimeout(() => {
                      myVar1 = setInterval(this.myTimer1, 1000);
                      this.setState({counter: false});
                    }, 4000);
                  }

                  myVar = setInterval(this.myTimer, 1000);
                  setTimeout(() => {
                    clearInterval(myVar);
                  }, 3000);

                  this.setState({paused: false});
                }}
                style={{}}>
                {paused ? (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      backgroundColor: themeStyle.ORANGE,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      paddingLeft: 5,
                    }}>
                    <Icon.Ionicons
                      name={'play'}
                      size={50}
                      color={themeStyle.COLOR_WHITE}
                    />
                  </View>
                ) : (
                  <Pause
                    height={100}
                    width={100}
                    fill={themeStyle.ORANGE_DARK}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.ind >= this.props.route.params.data.length) {
                    this.props.navigation.navigate(
                      route.MENTALEXERCISEDAYCHALLENGESTART,
                      {
                        data: this.props.route.params.data,
                        id: this.props.route.params?.id,
                        dayId: this.props.route.params?.dayId,
                        modeId: this.props.route.params.modeId,
                        average_time: this.props.route?.params?.average_time,
                        day: this.props.route.params.day,
                      },
                    );
                  } else if (
                    this.state.ind <=
                    this.props.route.params.data.length - 1
                  ) {
                    this.props.navigation.navigate(
                      route.MENTALEXERCISETIMERRESET,
                      {
                        data: this.props.route.params.data,
                        id: this.props.route.params?.id,
                        index: this.state.ind,
                        dayId: this.props.route.params?.dayId,
                        modeId: this.props.route.params.modeId,
                        average_time: this.props.route?.params?.average_time,
                        day: this.props.route.params.day,
                      },
                    );
                  }
                }}
                style={{alignSelf: 'center'}}>
                <Next />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ChallengeComponent
          visible={this.state.visible}
          onClose={() => {
            this.setState({visible: false});
          }}
          youtube_link={videoData?.youtube_link}
          uri={videoData?.banner}
          name={videoData?.name}
          onPressVideo={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.MENTALVIEWURL, {
                url: videoData?.youtube_link,
                prev_screen: route.MENTALEXERCISEDAYSSKIP,
                key: this.props.navigation.getState().routes[4].key,
              }),
            )
          }
          description={videoData?.description}
          emojiImage={this.props.user.userData.mental_health_mood}
          emojiOnPress={() =>
            unverifiedUser
              ? this.showNewUserAlertFunction()
              : this.props.navigation.navigate(route.MENTALMOOD, {
                  mood: this.state.ads,
                })
          }
          done={() => this.props.navigation.navigate(route.MENTALEXERCISE)}
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
export default connect(mapStateToProps)(MentalExerciseDaysSkip);
