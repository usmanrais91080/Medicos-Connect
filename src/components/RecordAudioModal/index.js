import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {styles} from './style';
import Modal from 'react-native-modal';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import Mic from '../../assets/svg/mic-1.svg';
import Wave from '../../assets/svg/wave.svg';
import Playjumpleft from '../../assets/images/playjumpleft';
import Stop from '../../assets/svg/stop.svg';
import Playjumpright from '../../assets/images/playjumpright';
import {ActivityIndicator} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import themeStyle from '../../assets/styles/theme.style';
import {Icon} from '../../components';
import {SCREEN_WIDTH} from '../../lib/utils/constants';

var myVar;

class RecordAudioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstView: true,
      showLoad: true,
      currentTime: 0.0,
      linearProgress: 0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath:
        AudioUtils.DocumentDirectoryPath + '/' + new Date().getTime() + '.wav',
      hasPermission: undefined,
      playAudio: true,
      progress: 0,
      duration: 0,
      realPath: {},
    };

    this.progress = null;
    this.sound = null;
  }

  reset = () => {
    this.setState(
      {
        showLoad: true,
        currentTime: 0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath:
          AudioUtils.DocumentDirectoryPath +
          '/' +
          new Date().getTime() +
          '.wav',

        playAudio: true,
      },
      () => {
        this.prepareRecordingPath(this.state.audioPath);
        this.SecondView();
      },
    );
  };

  resetPlayPause = () => {
    this.sound.stop();
  };

  callback = () => {
    if (this.props.STTResponse != null) {
      setTimeout(() => {
        this.SecondView();
      }, 100);
    } else {
      let name = this.state.audioPath.split('/');
      const media = {
        uri:
          Platform.OS == 'android'
            ? `file://${this.state.audioPath}`
            : this.state.audioPath,
        type: 'audio/wav',
        name: name[name.length - 1],
      };
      this.props.setAudioMessage(media);
    }
    // setTimeout(() => { this.SecondView() }, 1000);
  };

  firstView = () => {
    this.setState({
      firstView: false,
    });
  };

  SecondView = () => {
    this.setState({
      firstView: true,
    });
  };

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1.0,
      AudioQuality: 'low',
      AudioEncoding: 'wav',
    });
  }

  changestate = () => {
    this.setState({playAudio: !this.state.playAudio});
    if (!this.state.playAudio) {
      this.sound.pause();
    } else {
      this.sound.play(success => {
        if (!success) {
          console.log('Sound playback failed');
        }
        if (success) {
          this.setState({
            progress: 0,
            playAudio: true,
          });
        }
      });
      setTimeout(() => this.getProgress(), 500);
    }
  };

  getProgress = () => {
    if (this.sound != null) {
      if (this.sound.isPlaying()) {
        this.sound.getCurrentTime(seconds => {
          this.setState({
            progress: seconds / this.sound.getDuration(),
            linearProgress: seconds,
          });
        });
        this.progress = setTimeout(() => this.getProgress(), 100);
      }
    }
  };

  jumpPrev10Seconds = () => {
    this.jumpSeconds(-10);
  };

  jumpNext10Seconds = () => {
    this.jumpSeconds(10);
  };

  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((seconds, playAudio) => {
        let nextSecs = seconds + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.currentTime)
          nextSecs = this.state.currentTime;
        this.sound.setCurrentTime(nextSecs);
        this.setState({linearProgress: nextSecs});
      });
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({reset: this.reset});
    this.props.navigation.setParams({resetPlayPause: this.resetPlayPause});

    this.props.navigation.setParams({SecondView: this.SecondView});

    this._checkPermission().then(hasPermission => {
      this.setState({hasPermission});

      if (!hasPermission) return;

      const options = {
        sampleRate: 16000, // default 44100
        channels: 1, // 1 or 2, default 1
        bitsPerSample: 16, // 8 or 16, default 16
        audioSource: 6, // android only (see below)
        wavFile: `${new Date().getTime()}.wav`, // default 'audio.wav'
      };

      AudioRecord.init(options);
      AudioRecord.on('data', data => {
        // const chunk = Buffer.from(data, 'base64');
        // do something with audio chunk
      });

      AudioRecord.onProgress = data => {
        this.setState({progress: data.progress});
      };
    });
  }

  componentWillUnmount() {
    clearTimeout(this.progress);
    if (this.sound) {
      this.sound.stop();
    }
  }

  _checkPermission = () => {
    // try {
    //     const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     } else {
    //     }
    // } catch (err) {
    //     console.warn(err);
    // }

    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    // const rationale = {
    //     'title': 'Microphone Permission',
    //     'message': 'CircleIt needs access to your microphone so you can record audio.',
    //     buttonPositive: 'Ok',
    //     buttonNegative: 'Cancel'
    // };

    // return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ).then(result => {
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  };

  _renderButton(title, onPress, active) {
    var style = active ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </TouchableHighlight>
    );
  }

  _renderPauseButton(onPress, active) {
    var style = active ? styles.activeButtonText : styles.buttonText;
    var title = this.state.paused ? 'RESUME' : 'PAUSE';
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </TouchableHighlight>
    );
  }

  _pause = async () => {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  };

  _resume = async () => {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  };

  _stop = async () => {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({stoppedRecording: true, recording: false, paused: false});

    try {
      const filePath = await AudioRecord.stop();

      clearInterval(myVar);

      this._finishRecording(true, filePath);

      return filePath;
    } catch (error) {
      console.error(error);
    }
  };

  _play = async () => {
    if (this.state.recording) {
      await this._stop();
    }

    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
        }
      });

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            this.setState({
              progress: 0,
              playAudio: true,
            });
          } else {
          }
        });
      }, 100);
    }, 100);
  };

  _record = async () => {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn("Can't record, no permission granted!");
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true, paused: false});

    try {
      const filePath = await AudioRecord.start();
      myVar = setInterval(this.myTimer, 1000);

      // AudioRecorder.onProgress(audioPath, {
      //     SampleRate: 22050,
      //     Channels: 1.0,
      //     AudioQuality: "low",
      //     AudioEncoding: "wav",
      // });
    } catch (error) {
      console.error(error);
    }
  };

  myTimer = () => {
    this.setState({currentTime: this.state.currentTime + 1});
  };

  _finishRecording(didSucceed, filePath) {
    this.state;
    // if (this.state.currentTime > 0) {
    //     this.sound = new Sound(filePath.replace("file://", ""), null, (error) => {
    //         if (error) {
    //         } else {
    //             setTimeout(() => { this.setState({ isLoading: false }) }, 1000)
    //         }
    //     })
    //     this.setState({ finished: didSucceed });
    // }
    this.sound = new Sound(filePath.replace('file://', ''), null, error => {
      if (error) {
      } else {
        setTimeout(() => {
          this.setState({isLoading: false, audioPath: filePath});
        }, 1000);
      }
    });
    this.setState({finished: didSucceed});
  }

  formateSecondsToMins = seconds => {
    return moment.utc(seconds * 1000).format('mm:ss');
  };

  render() {
    const {
      paused,
      firstView,
      recording,
      currentTime,
      linearProgress,
      isLoading,
      playAudio,
      audioPath,
    } = this.state;

    const remainingTime = currentTime - parseInt(linearProgress);

    return (
      <Modal
        style={styles.ModelStyle}
        // onModalShow={() => this.props.onModalShow()}
        onBackButtonPress={() => {
          if (!paused) this.setState({paused: true});
          this.props.onClose();
          this.reset();
          this._stop();
        }}
        onBackdropPress={() => {
          if (!paused) this.setState({paused: true});
          this.props.onClose();
          this.reset();
          this._stop();
        }}
        animationType="fade"
        isVisible={this.props.isVisible}
        transparent={true}
        avoidKeyboard>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingBottom: '10%',
            flex: 0.2,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: themeStyle.MENTAL_PRIMARY,
            // height: this.state.recording ? 234 : 170
          }}>
          <TouchableOpacity
            onPress={() => {
              if (!paused) this.setState({paused: true});
              this.reset();
              this._stop();
              this.props.onClose();
            }}
            style={{alignSelf: 'center', paddingVertical: '5%'}}>
            <Icon.AntDesign name="down" size={20} color="black" />
          </TouchableOpacity>

          {firstView && (
            <View style={{}}>
              <View>
                <View style={{alignSelf: 'center'}}>
                  <View
                    style={
                      {
                        // marginTop: 35,
                      }
                    }>
                    <Wave width={SCREEN_WIDTH * 0.8} />

                    {recording ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '5%',
                          width: SCREEN_WIDTH * 0.45,
                        }}>
                        <>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: themeStyle.FONT_BOLD,
                              color: '#666666',
                            }}>
                            {this.formateSecondsToMins(currentTime)}
                          </Text>
                        </>
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setTimeout(() => {
                                this.firstView();
                                this._stop();
                              }, 1000);
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Stop height={40} width={40} />
                          </TouchableOpacity>
                        </>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '5%',
                          width: SCREEN_WIDTH * 0.45,
                        }}>
                        <>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: themeStyle.FONT_BOLD,
                              color: '#666666',
                            }}>
                            {this.formateSecondsToMins(currentTime)}
                          </Text>
                        </>
                        <>
                          <TouchableHighlight
                            onPress={() => {
                              this._record();
                            }}>
                            <Mic height={40} width={40} />
                          </TouchableHighlight>
                        </>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {!firstView && (
            <View style={[styles.containerSide]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 34,
                  marginRight: 28,
                }}>
                <Text style={styles.timerText}>
                  {moment(new Date()).format('hh:mm A')}
                </Text>
                <Text style={styles.timerText}>
                  {this.formateSecondsToMins(currentTime)}
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  marginLeft: 34,
                  marginRight: 28,
                  alignSelf: 'center',
                }}>
                <Slider
                  value={linearProgress}
                  minimumValue={0}
                  maximumValue={currentTime}
                  thumbTintColor={themeStyle.MENTAL_PRIMARY}
                  minimumTrackTintColor={themeStyle.MENTAL_PRIMARY}
                  maximumTrackTintColor={'gray'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 34,
                  marginRight: 28,
                }}>
                <Text style={styles.timerText}>
                  {parseInt(linearProgress) + 1 == currentTime
                    ? this.formateSecondsToMins(currentTime)
                    : this.formateSecondsToMins(parseInt(linearProgress))}
                </Text>
                <Text style={styles.timerText}>
                  {remainingTime == -1
                    ? 0
                    : remainingTime
                    ? `-${this.formateSecondsToMins(remainingTime)}`
                    : '0:00'}
                </Text>
              </View>

              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={themeStyle.MENTAL_PRIMARY}
                />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 34,
                    marginRight: 28,
                    marginTop: 10,
                  }}>
                  <TouchableHighlight
                    onPress={() => {
                      // this.props.navigation.navigate('Message_Landing')
                      this.reset();
                      this._stop();
                      this.resetPlayPause();
                      this.setState({
                        isLoading: true,
                        linearProgress: 0,
                      });
                      this.props.reset();
                    }}>
                    {/* <Image
                                                source={require('../../assets/images/deleteGold.png')}
                                                style={{
                                                    width: 20,
                                                    height: 21,
                                                }}
                                            /> */}
                    <Icon.AntDesign name="delete" size={30} color="black" />
                  </TouchableHighlight>
                  <TouchableHighlight
                    disabled={true}
                    onPress={this.jumpPrev10Seconds}
                    style={{
                      marginLeft: 79,
                      alignSelf: 'center',
                    }}>
                    <Playjumpleft />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={this.changestate}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 11,
                      marginRight: 40,
                    }}>
                    {playAudio ? (
                      <Icon.AntDesign name="play" size={40} color="" />
                    ) : (
                      <Icon.AntDesign name="pausecircle" size={40} color="" />
                    )}
                  </TouchableHighlight>

                  <TouchableHighlight
                    disabled={true}
                    onPress={this.jumpNext10Seconds}
                    style={{
                      marginRight: 60,
                      alignSelf: 'center',
                    }}>
                    <Playjumpright />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      this.callback();
                      let audioArray = [];
                      audioArray.push({
                        uri: audioPath,
                        type: 'audio/x-wav',
                        name: new Date().getTime() + '.wav',
                      });
                      this.resetPlayPause();
                    }}
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon.AntDesign name="check" size={30} color="black" />
                  </TouchableHighlight>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

export default RecordAudioModal;
