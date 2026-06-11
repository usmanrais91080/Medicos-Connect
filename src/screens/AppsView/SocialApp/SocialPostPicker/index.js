'use strict';
import {createThumbnail} from 'react-native-create-thumbnail';
import moment from 'moment';
import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import themeStyle from '../../../../assets/styles/theme.style';
import Reverse from '../../../../assets/svg/cameras.svg';
import Camera from '../../../../assets/svg/camera2.svg';
import Record from '../../../../assets/svg/record.svg';
import Gallery from '../../../../assets/svg/gallery.svg';
import Cross from '../../../../assets/svg/cross.svg';
import {
  DeleteModal,
  Icon,
  UploadingModal,
  Loader,
} from '../../../../components';
import {route, SCREEN_HEIGHT} from '../../../../lib/utils/constants';
import {Video, getVideoMetaData, getRealPath} from 'react-native-compressor';
import {StatusBar} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';

var myVar;
const DESIRED_RATIO = '16:9';

class SocialPostPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: false,
      uploading: false,
      loading: false,
      recording: false,
      alertModal: false,
      msgModal: false,
      msgToDisplay: '',
      uri: '',
      time: 0,
      mode: 'contain',
      onlyScaleDown: false,
      Ratio: DESIRED_RATIO,
      showCropper: false,
      imagePath: '',
      width: 16,
      height: 9,
      originalWidth: 0,
      originalHeight: 0,
      multipleImages: [],
      multipleImagesCropped: [],
      multipleImageCount: 0,
    };
    this.cropViewRef = React.createRef();
  }

  componentDidMount = () => {
    this, this.prepareRatio();
  };
  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera.current) {
      const ratios = await this.camera.current.getSupportedRatiosAsync();
      const ratio =
        ratios.find(ratio => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];
      this.setState({Ratio: ratio});
    }
  };

  onImageCrop = res => {
    const {multipleImages, multipleImageCount, multipleImagesCropped} =
      this.state;
    this.setState({showCropper: false});
    let array = [...multipleImagesCropped];

    array.push({
      uri: res.uri,
      name: `${new Date().getTime().toString()}.jpg`,
      filename: new Date().getTime().toString() + '.jpg',
      type: 'image/jpg',
    });
    if (multipleImages && multipleImageCount < multipleImages.length) {
      setTimeout(() => {
        this.setState({
          multipleImagesCropped: array,
          imagePath: multipleImages[multipleImageCount]?.sourceURL,
          originalWidth: multipleImages[multipleImageCount]?.width,
          originalHeight: multipleImages[multipleImageCount]?.height,
          multipleImageCount: multipleImageCount + 1,
          showCropper: true,
        });
      }, 500);
      return;
    }

    this.props.navigation.navigate(route.SOCIALPOST1, {
      postImage: array,
      createStory: false,
    });
  };

  render() {
    const {
      alertModal,
      msgToDisplay,
      hideCam,
      msgModal,
      showCropper,
      width,
      height,
      imagePath,
      originalHeight,
      originalWidth,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {showCropper ? (
          <View style={{flex: 1}}>
            <View style={styles.topCropperContainer}>
              <TouchableOpacity
                onPress={() => this.setState({showCropper: false})}>
                <Cross />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  this.cropViewRef.current.saveImage(true, 90);
                }}>
                <Text style={styles.done}>Done</Text>
              </TouchableOpacity>
            </View>
            <CropView
              sourceUrl={imagePath}
              style={{flex: 1, height: SCREEN_HEIGHT - 150}}
              aspectRatio={{width, height}}
              ref={this.cropViewRef}
              keepAspectRatio={false}
              onImageCrop={this.onImageCrop}
            />
            <View style={styles.customButtonContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    width: 1,
                    height: 1,
                  })
                }>
                <Text style={styles.cropOptionText}>1:1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    width: 4,
                    height: 5,
                  })
                }>
                <Text style={styles.cropOptionText}>4:5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    width: 16,
                    height: 9,
                  })
                }>
                <Text style={styles.cropOptionText}>16:9</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    width: originalWidth,
                    height: originalHeight,
                  })
                }>
                <Text style={styles.cropOptionText}>Original</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            ratio={this.state.Ratio}
            style={{flex: 1}}
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
            onGoogleVisionBarcodesDetected={({barcodes}) => {}}
            onRecordingEnd={() => null}>
            {this.state.recording ? (
              <View
                style={{
                  backgroundColor: themeStyle.COLOR_BLACK,
                  padding: '3%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 200,
                }}>
                <TouchableOpacity
                  style={{flex: 0.4}}
                  onPress={() => {
                    this.camera.stopRecording();
                    clearInterval(myVar);
                    this.props.navigation.navigate(route.HOMESCREEN);
                  }}>
                  <Cross />
                </TouchableOpacity>
                <View style={{flex: 0.6, justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon.Octicons
                      name={'primitive-dot'}
                      color="red"
                      size={20}
                    />
                    <Text
                      style={{
                        color: themeStyle.COLOR_WHITE,
                        fontWeight: 'bold',
                      }}>
                      {moment.utc(this.state.time * 1000).format('mm:ss')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  padding: '3%',
                  paddingBottom: SCREEN_HEIGHT * 0.08,
                  backgroundColor: 'rgba(52, 52, 52, 0.7)',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.HOMESCREEN);
                  }}>
                  <Cross />
                </TouchableOpacity>
              </View>
            )}
            <View style={{aspectRatio: 4 / 5}} />
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
                    onPress={() => this.setState({front: !this.state.front})}
                    style={styles.capture}>
                    <View style={styles.capture2}>
                      <Reverse />
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.recording ? null : (
                  <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}>
                    <View style={styles.capture2}>
                      <Camera />
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
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </RNCamera>
        )}
        <UploadingModal visible={this.state.loading} />
        <DeleteModal msg visible={msgModal} text={msgToDisplay} />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false, uploading: false});
          }}
          text={msgToDisplay}
        />
      </View>
    );
  }

  record = async () => {
    let createStory = false;
    this.setState({recording: true});
    myVar = setInterval(this.myTimer, 1000);
    if (this.camera) {
      const options = {
        maxDuration: 9,
        quality: RNCamera.Constants.VideoQuality['480p'],
      };
      const data = await this.camera.recordAsync(options);
      this.setState({uri: data.uri, loading: true});
      let array = [];
      let array2 = [];
      const beforemetaData = await getVideoMetaData(data.uri);
      // this.setState({ msgToDisplay: `Compressing Video ${"0"}%`, msgModal: true })
      const result = await Video.compress(
        data.uri,
        {
          compressionMethod: 'auto',
          minimumFileSizeForCompress: 1,
        },
        progress => {
          // this.setState({ msgToDisplay: `Compressing Video ${progress*100}%` })
        },
      );
      const realPath = await getRealPath(result, 'video');
      this.setState({loading: false});
      array.push({
        uri: realPath,
        name: `${new Date().getTime().toString()}.mp4`,
        filename: new Date().getTime().toString() + '.mp4',
        type: 'video/mp4',
      });
      if (this.camera) {
        createThumbnail({
          url: array[0].uri,
          timeStamp: 1000,
        })
          .then(response => {
            array2.push({
              uri: response.path,
              name: `${new Date().getTime().toString()}.jpg`,
              filename: new Date().getTime().toString() + '.jpg',
              type: 'image/jpg',
            });
            this.setState({loading: false});
            this.props.navigation.navigate(route.SOCIALPOST1, {
              postImage: array,
              postThumb: array2,
              createStory,
              video: true,
            });
          })
          .catch(err => {
            // console.log(err)
          });
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
      this.setState({recording: false});
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: true, width: 1920};
      const data = await this.camera.takePictureAsync(options);
      if (Platform.OS === 'ios') {
        this.setState({
          imagePath: data.uri,
          originalWidth: data.width,
          originalHeight: data.height,
          showCropper: true,
        });
      } else {
        let array = [];
        ImagePicker.openCropper({
          cropperToolbarColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
          cropping: true,
          path: data.uri, //'data:image/jpeg;base64,'+data.base64,
          includeBase64: true,
          width: 864,
          height: 1080,
          compressImageQuality: 0.8,
          freeStyleCropEnabled: true,
          mediaType: 'photo',
        })
          .then(image => {
            array.push({
              uri: image.path,
              name: `${new Date().getTime().toString()}.jpg`,
              filename: new Date().getTime().toString() + '.jpg',
              type: 'image/jpg',
            });
            this.setState({loading: false});
            this.props.navigation.navigate(route.SOCIALPOST1, {
              image_uri: array,
              postImage: array,
              createStory: false,
            });
          })
          .catch(err => {
            return this.setState(
              {loading: false},
              () => null,
              // console.log('Error>>>>>>', err),
            );
          });
      }
    }
  };

  openGallery = async () => {
    this.setState({uploading: true});
    let createStory = false;
    let imagePath = [];
    let mediaType = [];
    let array2 = [];
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 3,
      writeTempFile: true,
      width: 1920,
      compressImageQuality: 1,
    })
      .then(images => {
        if (images.length < 4) {
          if (images.length > 1) {
            // Dealing with multiple media selection
            images.map(val => {
              if (val.size <= 10485760) {
                if (val.mime == 'video/mp4') {
                  if (createStory == false) {
                    if (val.duration <= 30000) {
                      let tempString = val.path;
                      let lastFour = tempString.substr(tempString.length - 4);
                      imagePath.push({
                        uri: val.path,
                        name: `${val.modificationDate}${lastFour}`,
                        filename: val.modificationDate,
                        type: val.mime,
                      });
                      mediaType.push(val.mime);
                    } else {
                      return this.setState({
                        msgToDisplay:
                          'Video duration cannot be more than 30 seconds for post',
                        alertModal: true,
                      });
                    }
                  }
                } else {
                  let tempString = val.path;
                  let lastFour = tempString.substr(tempString.length - 4);
                  imagePath.push({
                    uri: val.path,
                    name: `${val.modificationDate}${lastFour}`,
                    filename: val.modificationDate,
                    type: val.mime,
                  });
                  mediaType.push(val.mime);
                }
              } else {
                this.setState({
                  msgToDisplay: 'Cannot pick file size more than 10 mb',
                  alertModal: true,
                });
              }
            });
            if (mediaType.includes('video/mp4')) {
              imagePath.map(val => {
                if (val.mime == 'video/mp4') {
                  createThumbnail({
                    url: val.path,
                    timeStamp: 1000,
                  })
                    .then(response => {
                      array2.push({
                        uri: response.path,
                        name: `${new Date().getTime().toString()}.jpg`,
                        filename: new Date().getTime().toString() + '.jpg',
                        type: 'image/jpg',
                      });
                    })
                    .catch(err => {
                      // console.log(err)
                    });
                } else {
                  array2.push({...val});
                }
              });
              this.props.navigation.navigate(route.SOCIALPOST1, {
                postImage: imagePath,
                postThumb: array2,
                createStory: false,
              });
            } else {
              if (Platform.OS === 'ios') {
                this.setState({
                  multipleImages: images,
                  multipleImageCount: 1,
                  imagePath: images[0]?.sourceURL,
                  loading: false,
                  showCropper: true,
                  originalWidth: images[0]?.width,
                  originalHeight: images[0]?.height,
                });
              } else {
                this.props.navigation.navigate(route.SOCIALPOST1, {
                  postImage: imagePath,
                  postThumb: imagePath,
                  createStory: false,
                });
              }
            }
          } else {
            // Dealing with single media selection
            if (images[0].size <= 10485760) {
              if (images[0].mime == 'video/mp4') {
                if (createStory == false) {
                  if (images[0].duration <= 30000) {
                    let tempString = images[0].path;
                    let lastFour = tempString.substr(tempString.length - 4);
                    imagePath.push({
                      uri: images[0].path,
                      name: `${images[0].modificationDate}${lastFour}`,
                      filename: images[0].modificationDate,
                      type: images[0].mime,
                    });
                    createThumbnail({
                      url: images[0].path,
                      timeStamp: 1000,
                    })
                      .then(response => {
                        array2.push({
                          uri: response.path,
                          name: `${new Date().getTime().toString()}.jpg`,
                          filename: new Date().getTime().toString() + '.jpg',
                          type: 'image/jpg',
                        });
                        this.props.navigation.navigate(route.SOCIALPOST1, {
                          postImage: imagePath,
                          postThumb: array2,
                          createStory,
                        });
                      })
                      .catch(err => {
                        // console.log(err)
                      });
                  } else {
                    return this.setState({
                      msgToDisplay:
                        'Video duration cannot be more than 30 seconds for post',
                      alertModal: true,
                    });
                  }
                }
              } else {
                let tempString = images[0].path;
                let lastFour = tempString.substr(tempString.length - 4);
                imagePath.push({
                  uri: images[0].path,
                  name: `${images[0].modificationDate}${lastFour}`,
                  filename: images[0].modificationDate,
                  type: images[0].mime,
                });
                mediaType.push(imagePath[0].mime);
                if (Platform.OS === 'ios') {
                  this.setState({
                    imagePath: images[0]?.sourceURL,
                    loading: false,
                    showCropper: true,
                    originalWidth: images[0]?.width,
                    originalHeight: images[0]?.height,
                  });
                } else {
                  ImagePicker.openCropper({
                    cropperToolbarColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                    cropping: true,
                    path: images[0].path,
                    includeBase64: true,
                    width: 864,
                    height: 1080,
                    compressImageQuality: 0.8,
                    freeStyleCropEnabled: false,
                    mediaType: 'photo',
                  })
                    .then(image => {
                      let array = [];
                      array.push({
                        uri: image.path,
                        name: `${new Date().getTime().toString()}.jpg`,
                        filename: new Date().getTime().toString() + '.jpg',
                        type: 'image/jpg',
                      });
                      this.props.navigation.navigate(route.SOCIALPOST1, {
                        postImage: array,
                        postThumb: array,
                        createStory: false,
                      });
                    })
                    .catch(err => {
                      return this.setState(
                        {uploading: false},
                        () => null,
                        // console.log('Error>>>>>>', err),
                      );
                    });
                }
              }
            } else {
              return this.setState({
                msgToDisplay: 'Media size cannot be more than 10 mb',
                alertModal: true,
              });
            }
          }
        } else {
          this.setState({
            msgToDisplay: 'Cannot pick more than 3 media',
            alertModal: true,
          });
        }
      })
      .catch(() => this.setState({uploading: false}));
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
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  capture: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 5,
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
    borderWidth: 5,
    borderColor: '#fff',
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
  cropOptionText: {
    color: themeStyle.COLOR_WHITE,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
    height: 30,
  },
  done: {
    color: themeStyle.COLOR_BLACK,
    fontSize: 16,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  topCropperContainer: {
    backgroundColor: themeStyle.COLOR_BLACK,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  saveButton: {
    height: 35,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: themeStyle.YELLOW,
  },
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    width: '100%',
    paddingHorizontal: 40,
  },
});

export default SocialPostPicker;
