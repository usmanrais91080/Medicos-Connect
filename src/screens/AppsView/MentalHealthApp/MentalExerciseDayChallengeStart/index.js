import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, DeleteModal} from '../../../../components';
import styles from './style';
import StopWatch from '../../../../assets/svg/stopwatch.svg';
import ShareIcon from '../../../../assets/svg/share-1.svg';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import {connect} from 'react-redux';

import {ChallengeCompleteComponent} from './mental.exercise.challenge.complete.component';
import {MentalServices, SocialServices} from '../../../../services';
import moment from 'moment';
class MentalExerciseDayChallengeStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timervalue: '30',
      mentalExerciseDay: false,
      gototimerResetScreen: false,
      totalTime: 0,
      newMsgModal: false,
      newMsg: '',
    };
  }
  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num);
  };

  sharePost = () => {
    let formData = new FormData();
    formData.append(
      'description',
      "Hurrah!! I have completed my today's workout",
    );
    formData.append('type', 'Public');
    formData.append('content_type', 'TEXT');

    SocialServices.createPost(formData, this.props.user.userData.token)
      .then(response => {
        if (response.data.code == 200) {
          this.setState({
            newMsg: 'Post shared on your social profile successfully',
            newMsgModal: true,
          });
        }
      })
      .catch(err => {
        this.setState({uploading: false});
      });
  };

  componentDidMount = () => {
    if (this.props.route.params.data) {
      let totaltime = 0;
      this.props.route.params.data.map((item, index) => {
        totaltime += item.video_time * item.repetition;
        if (this.props.route.params.id == item._id) {
          let obj = {
            day: this.props.route?.params?.dayId,
            mode: this.props.route?.params?.modeId,
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
      this.setState({totalTime: totaltime});
    }
    this.props.navigation.setOptions({
      headerTitle: () => this.headerTitle(),
    });
  };
  startInterval = text => {
    let count = parseInt(this.state.timervalue);

    let myInterval = setInterval(() => {
      if (count == 0) {
        clearInterval(myInterval);
        this.setState({timervalue: '30'});
      } else {
        count -= 1;
        // settimervalue(count.toString());
        this.setState({timervalue: count.toString()});
      }
    }, 2000);
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
        }}
      >
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
          }}
        >
          <Image
            style={{
              width: SCREEN_HEIGHT * 0.15,
              height: SCREEN_HEIGHT * 0.15,
              resizeMode: 'contain',
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
            }}
          >
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

  render() {
    const {newMsgModal, newMsg} = this.state;
    return (
      <Container>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        {/* Top Container */}
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{flex: 0.7, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={styles.congratulation}>Bravo!</Text>
            <Image
              source={require('../../../../assets/animation/contie.gif')}
              autoPlay
              loop
              style={{
                position: 'absolute',
                width: SCREEN_HEIGHT * 0.45,
                height: SCREEN_HEIGHT * 0.35,
                bottom: 200,
                resizeMode: 'contain',
              }}
            />
            <StopWatch width={215} height={215} />
            <Text style={styles.time}>
              {moment.utc(this.state.totalTime * 1000).format('mm:ss')}
            </Text>
            <Text style={styles.mins}>Mins</Text>
            <Text style={styles.workoutCompleted}>
              You smashed your workout today. Keep that rhythm going!
            </Text>
          </View>

          <View style={{flex: 0.3, justifyContent: 'center', padding: '5%'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F8F8F8',
                borderColor: '#A287AF',
                borderRadius: 11,
                width: '100%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 1,
              }}
              onPress={this.sharePost}
            >
              <ShareIcon />
              {HorizontalSpacer()}
              <Text style={styles.shareSocial}>
                Share on your MC Social Profile
              </Text>
            </TouchableOpacity>
            {VerticalSpacer()}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(route.MENTALEXERCISE, {
                  id: this.props.route?.params?.dayId,
                  modeId: this.props.route?.params?.modeId,
                });
              }}
              style={styles.doneButton}
            >
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ChallengeCompleteComponent
          visible={this.state.visible}
          onClose={() => {
            this.setState({visible: false});
          }}
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
        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            this.setState({newMsgModal: false});
            this.props.navigation.navigate(route.MENTALEXERCISE, {
              id: this.props.route?.params?.dayId,
              modeId: this.props.route?.params?.modeId,
            });
          }}
          text={newMsg}
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
export default connect(mapStateToProps)(MentalExerciseDayChallengeStart);
