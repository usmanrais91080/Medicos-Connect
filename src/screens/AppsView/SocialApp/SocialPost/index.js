import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import themeStyle from '../../../../assets/styles/theme.style';
import Search from '../../../../assets/svg/search.svg';
import {
  Button,
  Container,
  DeleteModal,
  Icon,
  Loader,
  UploadingModal,
} from '../../../../components';
import {Input} from 'react-native-elements';
import styles from './style';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SCREEN_WIDTH, route} from '../../../../lib/utils/constants';
import {SocialServices} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import themeStyle1 from '../../../../assets/styles/common.style';
import ImagePicker from 'react-native-image-crop-picker';
import {WebView} from 'react-native-webview';
import SocialPostLib from './social.post.function';
import {postActions} from '../../../../redux/actions/post';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import FastImage from 'react-native-fast-image';

let imagePath = [];
let mediaType = [];

class SocialPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      anyone: true,
      alertModal: false,
      msgToDisplay: '',
      people: false,
      publics: true,
      privates: false,
      selectedTip: '',
      data: [
        {
          id: 1,
          label: 'Trending',
          value: 'Trending',
        },
        {
          id: 1,
          label: 'Educational',
          value: 'Educational',
        },
        {
          id: 1,
          label: 'Entertainment',
          value: 'Entertainment',
        },
        {
          id: 1,
          label: 'Political',
          value: 'Political',
        },
        {
          id: 1,
          label: 'Popular',
          value: 'Popular',
        },
        {
          id: 1,
          label: 'News',
          value: 'News',
        },
        {
          id: 1,
          label: 'Food',
          value: 'Food',
        },
        {
          id: 1,
          label: 'LifeStyle',
          value: 'LifeStyle',
        },
      ],
      dropdownOpen: false,
      caption: '',
      postImage: [],
      uploading: false,
      tempImages: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    // this.ChooseFromLibrary();
    const {createStory} = this.props.route.params;
    // this.props.navigation.setOptions({
    //   headerRight: () => this.headerRight(),
    // });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._recieveDataFromFilter();
      this._clearMedia();
    });
  };

  _recieveDataFromFilter = () => {
    if (this.props.route.params.filterImage) {
      if (this.props.route.params.filterImage != '') {
        if (
          this.state.postImage.length >= 0 &&
          this.state.postImage.length < 6
        ) {
          let totalImages = [
            ...this.state.postImage,
            ...this.props.route.params.filterImage,
          ];
          if (totalImages.length < 6) {
            this.setState(
              {
                postImage: totalImages,
              },
              () => this.props.navigation.setParams({filterImage: null}),
            );
          } else {
            alert('Cannot Upload More than 5');
          }
        }
      }
    }
  };

  _clearMedia = () => {
    if (this.props.route.params?.removeMedia) {
      if (this.state.postImage.length > 0) {
        this.setState(
          {
            postImage: [],
          },
          () => {
            this.props.navigation.setParams({removeMedia: false});
            this.ChooseFromLibrary();
          },
        );
      } else {
        this.props.navigation.setParams({removeMedia: false});
      }
    }
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(route.SOCIALSEARCH)}>
          <Search />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  ChooseFromLibrary = () => {
    const {createStory} = this.props.route.params;
    imagePath = [];
    mediaType = [];
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5,
      writeTempFile: true,
      compressImageQuality: 0.8,
    }).then(images => {
      this.setState({loading: false});
      if (images.length < 6) {
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
                msgToDisplay: 'Cannot pick file size more than 25 mb',
                alertModal: true,
              });
            }
          });
          if (mediaType.includes('video/mp4')) {
            // Media Array Contains  videos and images
            this.setState({
              postImage: imagePath,
            });
          } else {
            this.props.navigation.navigate(route.FILTER, {
              prev_screen: route.SOCIALPOST,
              image_uri: imagePath,
              createStory: false,
            });
            // this.setState({
            //   postImage: imagePath
            // })
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
                  mediaType.push(imagePath[0].mime);
                  // this.setState({
                  //   postImage: imagePath,
                  // });
                  if (this.state.postImage.length > 0) {
                    this.setState({
                      postImage: [...this.state.postImage, ...imagePath],
                    });
                  }
                  if (this.state.postImage.length == 0) {
                    this.setState({
                      postImage: imagePath,
                    });
                  }
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
              this.props.navigation.navigate(route.FILTER, {
                prev_screen: route.SOCIALPOST,
                image_uri: imagePath,
                createStory: this.props.route.params.createStory,
              });
            }
          } else {
            return this.setState({
              msgToDisplay: 'Media size cannot be more than 25 mb',
              alertModal: true,
            });
          }
        }
      } else {
        this.setState({
          msgToDisplay: 'Cannot pick more than 5',
          alertModal: true,
        });
      }
    });
  };

  ChooseFromCamera = () => {
    imagePath = [];

    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        includeBase64: false,
        compressImageQuality: 0.1,
      })
        .then(images => {
          let tempString = images.path;
          let lastFour = tempString.substr(tempString.length - 4);
          imagePath.push({
            uri: images.path,
            name: `${images.modificationDate}${lastFour}`,
            filename: images.modificationDate,
            type: images.mime,
          });
          // let array = [...this.state.postImage];
          // array.push({
          //   uri: photos.path,
          //   name: `${new Date().getTime().toString()}.jpg`,
          //   filename: new Date().getTime().toString() + '.jpg',
          //   type: 'image/jpg'
          // })
          // this.setState({ postImage: array });
          this.props.navigation.navigate(route.FILTER, {
            prev_screen: route.SOCIALPOST,
            image_uri: imagePath,
            createStory: this.props.route.params.createStory,
          });
        })
        .catch(err => {
          // console.log(err);
        });
    } catch (error) {
      // console.log(error);
    }
  };
  ChooseFromCameraVideo = () => {
    try {
      ImagePicker.openCamera({
        // width: 300,
        // height: 400,
        // includeBase64: false,
        // compressImageQuality: 0.1,
        mediaType: 'video',
      })
        .then(photos => {
          let array = [...this.state.postImage];
          array.push({
            uri: photos.path,
            name: `${new Date().getTime().toString()}.jpg`,
            filename: new Date().getTime().toString() + '.jpg',
            type: 'video/mp4',
          });
          this.setState({postImage: array});
        })
        .catch(err => {
          // console.log(err);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  requestPermissionforCamera = ind => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            if (ind == 1) {
              this.ChooseFromCamera();
            }
            if (ind == 2) {
              this.ChooseFromCameraVideo();
            }
          } else {
            request(PERMISSIONS.IOS.CAMERA).then(result => {
              if (result == RESULTS.GRANTED) {
                if (ind == 1) {
                  this.ChooseFromCamera();
                }
                if (ind == 2) {
                  this.ChooseFromCameraVideo();
                }
              } else {
                alert(
                  'Need permissions!!', // This is a title
                  'To Capture thing from camera you have to grant the permissions', // This is a alert message
                  {
                    type: 'bottomsheet',
                  },
                );
                // Alert.alert("", "To Capture thing from camera you have to grant the permissions", [{
                //   "text": "Ok",
                //   onPress: () => {
                //     // Linking.openSettings();
                //     // this.props.navigation.goBack();
                //   }
                // }])
              }
            });
          }
        })
        .catch(error => {
          this.setState({intialModalStep: true, intialLoading: false});
          // console.log(error);
        });
    } else {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result == RESULTS.GRANTED) {
            if (ind == 1) {
              this.ChooseFromCamera();
            }
            if (ind == 2) {
              this.ChooseFromCameraVideo();
            }
          } else {
            request(PERMISSIONS.ANDROID.CAMERA).then(result => {
              if (result == RESULTS.GRANTED) {
                if (ind == 1) {
                  this.ChooseFromCamera();
                }
                if (ind == 2) {
                  this.ChooseFromCameraVideo();
                }
              } else {
                alert(
                  'Need permissions!!', // This is a title
                  'To Capture thing from camera you have to grant the permissions', // This is a alert message
                  {
                    type: 'bottomsheet',
                  },
                );
              }
            });
          }
        })
        .catch(error => {
          // console.log(error);
        });
    }
  };

  handleContinue = () => {
    const {createStory} = this.props.route.params;
    const {postImage} = this.state;
    if (postImage.length > 0) {
      // let mediaArray=[...postImage];
      // this.setState(post)
      this.props.navigation.navigate(route.SOCIALPOST1, {
        postImage: postImage,
        createStory,
      });
    } else {
      this.setState({submit: true});
    }
  };

  renderChips(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({tags: this.state.tags.filter((_, i) => i != index)})
          }
          style={styles.minusContainer}>
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item}</Text>
        </View>
      </View>
    );
  }

  _removeMedia = index => {
    let tempArray = this.state.postImage.filter((val, ind) => ind != index);
    this.setState({
      postImage: tempArray,
    });
  };

  render() {
    const {
      tags,
      alertModal,
      msgToDisplay,
      loading,
      uploading,
      caption,
      publics,
      privates,
      data,
      postImage,
      submit,
    } = this.state;
    const {createStory} = this.props.route.params;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.contentContainer}>
                  {postImage.length > 0 ? (
                    <View style={styles.headingContainer}>
                      <Text style={styles.heading}>Media</Text>
                      {/* Handle multiple Images Selection */}

                      <View
                        style={{
                          flexDirection: 'row',
                          width: SCREEN_WIDTH * 0.8,
                          flexWrap: 'wrap',
                          marginHorizontal: '2.5%',
                        }}>
                        {postImage.map((val, ind) => {
                          return (
                            <View
                              key={ind}
                              style={{
                                marginHorizontal: '2.5%',
                                marginTop: '5%',
                              }}>
                              {val.type == 'video/mp4' ? (
                                <View>
                                  <TouchableOpacity
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      zIndex: 1,
                                      top: -10,
                                      right: -5,
                                    }}
                                    onPress={() => this._removeMedia(ind)}>
                                    <View
                                      style={{
                                        height: 20,
                                        width: 20,
                                        backgroundColor: 'red',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                      }}>
                                      <Icon.AntDesign
                                        name="minus"
                                        size={15}
                                        color={'white'}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                  <FastImage
                                    style={{
                                      borderRadius: 15,
                                      height: 80,
                                      width: SCREEN_WIDTH * 0.25,
                                      marginHorizontal: 5,
                                    }}
                                    source={{uri: val.uri}}
                                    resizeMode={'cover'}
                                  />
                                </View>
                              ) : (
                                // <WebView
                                //   style={{
                                //     borderRadius: 10,
                                //     height: 80,
                                //     width: SCREEN_WIDTH * 0.15,
                                //     marginHorizontal: 5,
                                //     marginTop: (Platform.OS == 'ios') ? 20 : 0, borderRadius: 5
                                //   }}
                                //   javaScriptEnabled={true}
                                //   domStorageEnabled={true}
                                //   allowFileAccess={true}
                                //   source={{ uri: val.uri }}
                                //   allowUniversalAccessFromFileURLs={true}
                                //   allowFileAccessFromFileURLs={true}
                                // />
                                <View>
                                  <TouchableOpacity
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      zIndex: 1,
                                      top: -10,
                                      right: -5,
                                    }}
                                    onPress={() => this._removeMedia(ind)}>
                                    <View
                                      style={{
                                        height: 20,
                                        width: 20,
                                        backgroundColor: 'red',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                      }}>
                                      <Icon.AntDesign
                                        name="minus"
                                        size={15}
                                        color={'white'}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                  <FastImage
                                    style={{
                                      borderRadius: 15,
                                      height: 80,
                                      width: SCREEN_WIDTH * 0.25,
                                      marginHorizontal: 5,
                                    }}
                                    source={{uri: val.uri}}
                                    resizeMode={'cover'}
                                  />
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>

                {postImage.length == 5 || postImage.length > 5 ? null : (
                  <View style={styles.headingContainer}>
                    <TouchableOpacity
                      onPress={this.ChooseFromLibrary}
                      style={styles.addMediaStyle}>
                      <Icon.AntDesign
                        name="pluscircleo"
                        size={15}
                        color={themeStyle.COLOR_WHITE}
                      />
                      <Text style={styles.option}>Attach Photo or Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.requestPermissionforCamera(1)}
                      style={styles.addMediaStyle}>
                      <Icon.AntDesign
                        name="pluscircleo"
                        size={15}
                        color={themeStyle.COLOR_WHITE}
                      />
                      <Text style={styles.option}>Picture from camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.requestPermissionforCamera(2)}
                      style={styles.addMediaStyle}>
                      <Icon.AntDesign
                        name="pluscircleo"
                        size={15}
                        color={themeStyle.COLOR_WHITE}
                      />
                      <Text style={styles.option}>Video from camera</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {submit && !postImage ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginBottom: 10, marginLeft: '5%'},
                    ]}>
                    Please select the media file
                  </Text>
                ) : null}

                {/* <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Caption (if any)</Text>
                        <View style={{ marginTop: "2%" }}>
                            <Input
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                                multiline={true}
                                value={caption}
                                containerStyle={styles.containerStyle}
                                onChangeText={(e) => this.setState({ caption: e })}
                                placeholderTextColor={'#77777B'}
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputStyle} />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <ScrollView horizontal={true}>
                            {tags.map((item, index) => this.renderChips(item, index))}
                        </ScrollView>

                    </View>
                    <View style={styles.margin}>

                        <Text style={styles.headingText}>Privacy</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => this.setState({ publics: true, privates: false })} style={styles.row}>
                                <View style={publics ? styles.selectedbox : styles.box}></View>
                                <Text style={publics ? styles.selectedOption : styles.option}>Public</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ privates: true, publics: false })} style={[styles.row, { marginLeft: '15%' }]}>
                                <View style={privates ? styles.selectedbox : styles.box}></View>
                                <Text style={privates ? styles.selectedOption : styles.option}>Private</Text>
                            </TouchableOpacity>
                        </View>

                    </View> */}

                {/* <View style={styles.buttonContainer}>
                        <Button loading={uploading} title={createStory ? 'Upload new story' : 'Upload new post'} onPress={() => this.setState({ submit: true, uploading: true }, () => { createStory ? this.handleUploadNewStory() : this.handleUploadNewPost() })} />
                    </View> */}
              </ScrollView>
            </View>

            <View style={styles.btnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.darkDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.lightDash}></View>
              </View>
              <Button
                loading={uploading}
                title={'Continue'}
                onPress={() =>
                  this.setState({submit: true}, () => this.handleContinue())
                }
              />
            </View>
            <UploadingModal visible={uploading} />
            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.setState({alertModal: false});
              }}
              text={msgToDisplay}
            />
          </Container>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    filterData: state.postReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialPost);
