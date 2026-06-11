'use strict';
import moment from 'moment';
import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import themeStyle from '../../../../assets/styles/theme.style';
import Camera from '../../../../assets/svg/camera2.svg';
import Reverse from '../../../../assets/svg/cameras.svg';
import Cross from '../../../../assets/svg/cross.svg';
import Gallery from '../../../../assets/svg/gallery.svg';
import Record from '../../../../assets/svg/record.svg';
import { DeleteModal, Icon, UploadingModal } from '../../../../components';
import { route } from '../../../../lib/utils/constants';
import { SocialServices } from '../../../../services';

var myVar;
class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: false,
      uploading: false,
      recording: false,
      dalertModal: false,
      msgToDisplay: '',
      time: 0,
    };
  }

  render() {
    const { alertModal, msgToDisplay } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          // ratio={"4:3"}
          style={{ flex: 1 }}
          type={
            this.state.front
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
          }}>
          {this.state.recording ? (
            <View
              style={{
                backgroundColor: themeStyle.COLOR_BLACK,
                padding: '3%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{ flex: 0.4 }}
                onPress={() => {
                  this.props.navigation.navigate(route.SOCIALHOME);
                  clearInterval(myVar);
                }}>
                <Cross />
              </TouchableOpacity>

              <View style={{ flex: 0.6, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon.Octicons name={'primitive-dot'} color="red" size={20} />
                  <Text
                    style={{ color: themeStyle.COLOR_WHITE, fontWeight: 'bold' }}>
                    {moment.utc(this.state.time * 1000).format('mm:ss')}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ padding: '3%' }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Cross />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.preview}>
            <View
              style={{
                paddingHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: this.state.recording
                  ? 'center'
                  : 'space-between',
                alignItems: 'center',
              }}>
              {this.state.recording == false && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ front: !this.state.front });
                  }}
                  style={styles.capture}>
                  <View style={styles.capture2}>
                    <Reverse />
                  </View>
                  {/*<Icon.SimpleLineIcons name={"refresh"} size={25} />*/}
                </TouchableOpacity>
              )}
              {this.state.recording ? (
                <TouchableOpacity
                  onPress={this.stopRecording.bind(this)}
                  style={styles.capture}>
                  <View style={styles.capture3}>
                    <Icon.FontAwesome name={'stop'} size={25} color={'red'} />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.record();
                  }}
                  style={styles.capture}>
                  <View style={styles.capture2}>
                    <Record />
                    {/*<Icon.Entypo name={"controller-record"} size={25} color={'red'} />*/}
                  </View>
                </TouchableOpacity>
              )}
              {this.state.recording ? null : (
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={styles.capture}>
                  <View style={styles.capture2}>
                    <Camera />
                    {/* <Icon.FontAwesome name={"camera"} size={25} color={'black'} /> */}
                  </View>
                </TouchableOpacity>
              )}
              {this.state.recording == false && (
                <TouchableOpacity
                  onPress={this.openGallery.bind(this)}
                  style={styles.capture}>
                  <View style={styles.capture2}>
                    <Gallery />
                  </View>
                  {/*<Icon.Ionicons name={"image"} size={40} />*/}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </RNCamera>
        <UploadingModal visible={this.state.uploading} />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({ alertModal: false });
          }}
          text={msgToDisplay}
        />
      </View>
    );
  }

  handleUploadNewStory = postImage => {
    if (postImage) {
      if (postImage.length > 0) {
        let formData = new FormData();
        // formData.append('description', '');
        // if (friends.length >= 1)
        //     friends.map((item, index) => {
        //         formData.append(`tag_users[${index}]`, item.id);
        //     })
        postImage.map((val, ind) => {
          formData.append(`background`, val);
          formData.append('backgroundType', val.type.slice(0,5));
        });
        SocialServices.createStory(formData, this.props.user.userData.token)
          .then(response => {
            if (response.data.code == 200) {
              this.setState({ uploading: false });
              this.props.navigation.goBack();
            }
          })
          .catch(err => {
            this.setState({ uploading: false });
            // console.log(err.response.data);
          });
      }
    } else {
      this.setState({ submit: true, uploading: false });
    }
  };

  record = async () => {
    this.setState({ recording: true });
    // this.setState({ recording: true }, () => setTimeout(() => {
    //     if (this.state.recording) {
    //         this.camera.stopRecording();
    //         clearInterval(myVar);
    //         this.setState({ recording: false })
    //     }
    // }, 10000))
    myVar = setInterval(this.myTimer, 1000);
    if (this.camera) {
      const options = {
        maxDuration: 9,
        quality: RNCamera.Constants.VideoQuality['480p'],
      };
      const data = await this.camera.recordAsync(options);
      this.setState({ uploading: true });
      let array = [];
      array.push({
        uri: data.uri,
        name: `${new Date().getTime().toString()}.mp4`,
        filename: new Date().getTime().toString() + '.mp4',
        type: 'video/mp4',
      });
      if (this.camera) {
        this.handleUploadNewStory(array);
      }
    }
  };

  myTimer = () => {
    if (this.state.time <= 10) {
      this.setState({
        time: this.state.time + 1,
        closeTime: this.state.time == 10 ? true : false,
      });
    }
  };

  stopRecording = async () => {
    if (this.state.recording) {
      this.camera.stopRecording();
      clearInterval(myVar);
      this.setState({ recording: false });
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.7, base64: true, width: 1920 };
      const data = await this.camera.takePictureAsync(options);
      let array = [];
      array.push({
        uri: data.uri,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
      // await ImageResizer.createResizedImage(data.uri,SCREEN_WIDTH, SCREEN_HEIGHT, "JPEG", 10, 0, null ,false, { mode:"contain" ,onlyScaleDown:true })
      //      .then(response => {
      //       array.push({
      //         uri:  response.uri ,
      //         name: `${new Date().getTime().toString()}.jpg`,
      //         filename: new Date().getTime().toString() + '.jpg',
      //         type: 'image/jpg'
      //                  });
      //      })
      //     .catch(err => {
      //       array.push({
      //         uri:  data.uri ,
      //         name: `${new Date().getTime().toString()}.jpg`,
      //         filename: new Date().getTime().toString() + '.jpg',
      //         type: 'image/jpg'
      //       });
      //     });
      this.props.navigation.navigate(route.STORYFILTER, {
        createStory: true,
        filterImage: array,
      });
      // this.props.navigation.navigate(route.SOCIALPOST, { createStory: true,filterImage:array })
      // this.props.navigation.navigate(route.STORYFILTER, { createStory: true, filterImage: array })
    }
  };
  openGallery = async () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 1,
      writeTempFile: true,
      compressImageQuality: 0.8,
      cropping: true,
    }).then(images => {
      if (images.length < 2) {
        let imagePath = [];
        images.map(val => {
          let tempString = val.path;
          let lastFour = tempString.substr(tempString.length - 4);
          imagePath.push({
            uri: val.path,
            name: `${val.modificationDate}${lastFour}`,
            filename: val.modificationDate,
            type: val.mime,
          });
        });
        if (images[0].mime == 'video/mp4') {
          this.setState({ uploading: true });
          this.handleUploadNewStory(imagePath);
          // this.props.navigation.navigate(route.SOCIALPOST, { createStory: true, filterImage: imagePath })
        } else {
          const majorVersionIOS = parseInt(Platform.Version, 10);
          if (majorVersionIOS >= 13) {
            this.props.navigation.navigate(route.STORYFILTER, {
              createStory: true,
              filterImage: imagePath,
            });
          } else {
            this.handleUploadNewStory(imagePath);
          }
          // this.props.navigation.navigate(route.STORYFILTER, { createStory: true, filterImage: imagePath })
        }
      } else {
        this.setState({
          alertModal: true,
          msgToDisplay: 'Only one picture/video can be selected',
        });
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  capture: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: themeStyle.CYAN_DARK_BLUE,
  },
  capture1: {
    height: 65,
    width: 65,
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    backgroundColor: themeStyle.YELLOW,
  },
  capture3: {
    height: 65,
    width: 65,
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
  },
  capture2: {
    height: 65,
    width: 65,
    backgroundColor: themeStyle.YELLOW,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return { user: state.authReducer || {} };
};

export default connect(mapStateToProps)(CameraScreen);
