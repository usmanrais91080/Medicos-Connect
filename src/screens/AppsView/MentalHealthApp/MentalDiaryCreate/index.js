import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import themeStyle from '../../../../assets/styles/theme.style';
import {
  Container,
  DeleteModal,
  Icon,
  Loader,
  RecordAudioModal,
} from '../../../../components';
import {Input} from 'react-native-elements';
import styles from './style';
import {
  SCREEN_WIDTH,
  route,
  SCREEN_HEIGHT,
} from '../../../../lib/utils/constants';
import {MentalServices} from '../../../../services';
import Wave from '../../../../assets/svg/wave.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import commonStyle from '../../../../assets/styles/common.style';

import Camera from '../../../../assets/svg/createDiaryCamera.svg';
import Add from '../../../../assets/svg/createDiaryText.svg';
import Voice from '../../../../assets/svg/createDiaryVoice.svg';
import {BottomMenu} from '../MentalDiary/mental.diary.component';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
import {Image as ImageCompress} from 'react-native-compressor';

class MentalDiaryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: false,
      msgToDisplay: '',
      caption: '',
      description: '',
      uploading: false,
      deleteModal: false,
      recordingObj: null,
      submit: false,
      compressedImage: null,
    };
  }

  componentDidMount = () => {
    if (this.props?.route?.params?.data) {
      this.setState({
        caption: this.props.route?.params?.data?.title,
        description: this.props.route?.params?.data?.text,
        recordingObj: this.props.route?.params?.data?.recording,
      });
    }
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
      headerTitle: `${this.props?.route?.params?.update ? 'Update' : 'Create'}`,
    });
  };

  handleUploadNewPost = async () => {
    const {caption, description} = this.state;
    if (caption && description) {
      this.setState({
        uploading: true,
      });
      let formData = new FormData();
      formData.append('title', caption);
      formData.append('text', description);

      this.state.recordingObj
        ? formData.append('recording', this.state.recordingObj)
        : null;
      if (
        this.props?.route?.params?.type == 'image' &&
        !this.props?.route?.params?.data?.image
      ) {
        const result = await ImageCompress.compress(
          this.props?.route?.params?.filterImage,
          {
            compressionMethod: 'manual',
            maxWidth: 1000,
            quality: 0.8,
          },
        );

        formData.append(`image`, {
          uri: result,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      }

      if (this.props?.route?.params?.update == true) {
        MentalServices.updateDairy(
          this.props?.route?.params?._id || this.props.route?.params?.data?._id,
          formData,
          this.props.user.userData.token,
        )
          .then(response => {
            if (response.data.code == 200) {
              this.setState({
                uploading: false,
                caption: '',
                description: '',
              });
              this.props.navigation.navigate(route.MENTALDIARY);
            }
          })
          .catch(err => {
            this.setState({
              submit: true,
              uploading: false,
              msgToDisplay: err.response.data.message,
              alertModal: true,
            });
          });
      } else {
        MentalServices.createDiary(formData, this.props.user.userData.token)
          .then(response => {
            if (response.data.code == 200) {
              this.setState({
                uploading: false,
                caption: '',
                description: '',
              });
              this.props.navigation.navigate(route.MENTALDIARY);
            }
          })
          .catch(err => {
            this.setState({
              submit: true,
              uploading: false,
              msgToDisplay: 'Oops…something went wrong!',
              alertModal: true,
            });
            // console.log('Create Post Mental Error>>>>>>', err.response);
          });
      }
    } else {
      this.setState({
        submit: true,
        uploading: false,
      });
    }
  };

  onOpenAudioModal = () => {
    this.setState({openVoiceRecorder: true});
  };
  onCloseAudioModal = () => {
    this.setState({openVoiceRecorder: false});
  };
  setAudioMessage = file => {
    this.setState({recordingObj: file, openVoiceRecorder: false});
  };

  render() {
    const {
      uploading,
      caption,
      alertModal,
      msgToDisplay,
      submit,
      description,
      deleteModal,
      openMenu,
      openVoiceRecorder,
    } = this.state;
    return (
      <>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        {uploading ? (
          <Loader />
        ) : (
          <Container color>
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: '40%',
                }}>
                <View style={styles.headingContainer}>
                  <Text style={styles.textDate}>
                    {moment().format('ddd')},{moment().format('LL')}
                  </Text>
                  <View style={styles.line} />
                  <View style={{marginHorizontal: '4%'}}>
                    <Text
                      style={{
                        paddingTop: '2.5%',
                        paddingLeft: '2.5%',
                        width: '100%',
                        alignSelf: 'center',
                      }}>
                      {'Title'}
                    </Text>
                    <Input
                      placeholder="Todays highlight....."
                      multiline={true}
                      value={caption}
                      containerStyle={styles.containerStyle1}
                      onChangeText={e => this.setState({caption: e})}
                      placeholderTextColor={'#77777B'}
                      inputContainerStyle={styles.inputContainerStyle1}
                      inputStyle={styles.inputStyle1}
                    />
                    {submit && !caption ? (
                      <Text
                        style={{
                          ...commonStyle.errorText2,
                          marginVertical: '2%',
                        }}>
                        Please fill the above field.
                      </Text>
                    ) : null}
                    {submit && !description ? (
                      <Text
                        style={{
                          ...commonStyle.errorText2,
                          marginVertical: '2%',
                        }}>
                        Please fill the below field.
                      </Text>
                    ) : null}
                    <View
                      style={{
                        marginTop: '2%',
                        width: '97%',
                        height: SCREEN_HEIGHT * 0.5,
                        marginHorizontal: '2%',
                      }}>
                      <View
                        style={{
                          borderColor: themeStyle.ORANGE_DARK,
                          borderWidth: 2,
                          borderRadius: 10,
                          height: SCREEN_HEIGHT * 0.46,
                          padding: '2%',
                          backgroundColor: themeStyle.COLOR_WHITE,
                          flexDirection: 'row',
                        }}>
                        <View>
                          <Input
                            placeholder="What is on your mind"
                            multiline={true}
                            value={description}
                            onChangeText={e => this.setState({description: e})}
                            placeholderTextColor={'#77777B'}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={{
                              height: this.props?.route?.params?.data?.image
                                ? SCREEN_HEIGHT * 0.2
                                : this.props?.route?.params?.type == 'image'
                                ? SCREEN_HEIGHT * 0.2
                                : SCREEN_HEIGHT * 0.34,
                              backgroundColor: themeStyle.COLOR_WHITE,
                              width: SCREEN_WIDTH * 0.6,
                            }}
                            inputStyle={{
                              height: this.props?.route?.params?.data?.image
                                ? SCREEN_HEIGHT * 0.2
                                : this.props?.route?.params?.type == 'image'
                                ? SCREEN_HEIGHT * 0.2
                                : SCREEN_HEIGHT * 0.4,
                              textAlignVertical: 'top',
                              fontSize: 12,
                              fontFamily: themeStyle.FONT_REGULAR,
                            }}
                          />
                          {this.state.recordingObj ? (
                            <View
                              style={{
                                alignItems: 'center',
                                position: 'absolute',
                                bottom:
                                  this.props?.route?.params?.data?.image ||
                                  this.props?.route?.params?.type == 'image'
                                    ? SCREEN_HEIGHT * 0.23
                                    : 5,
                                left: 0,
                                right: 0,
                              }}>
                              <Wave width={SCREEN_WIDTH * 0.5} />
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  right: -10,
                                  bottom: 45,
                                  position: 'absolute',
                                }}>
                                <Icon.AntDesign
                                  onPress={() =>
                                    this.setState({recordingObj: null})
                                  }
                                  name="minuscircle"
                                  size={30}
                                  color="red"
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>

                        <View
                          style={{
                            alignItems: 'center',
                            left: SCREEN_WIDTH * 0.1,
                            zIndex: 1,
                            borderBottomColor: themeStyle.COLOR_LIGHT_GREY,
                          }}>
                          <TouchableOpacity
                            disabled
                            onPress={() =>
                              this.setState({openVoiceRecorder: true})
                            }>
                            <Add />
                          </TouchableOpacity>
                          <View style={{height: 10}} />
                          <TouchableOpacity
                            onPress={() => this.setState({openMenu: true})}>
                            <Camera />
                          </TouchableOpacity>
                          <View style={{height: 10}} />
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({openVoiceRecorder: true})
                            }>
                            <Voice />
                          </TouchableOpacity>
                        </View>

                        {this.props?.route?.params?.data?.image ||
                        this.props?.route?.params?.type == 'image' ? (
                          <View
                            style={{
                              alignItems: 'center',
                              position: 'absolute',
                              bottom: 6,
                              left: 0,
                              right: 0,
                            }}>
                            <Image
                              style={{
                                width: SCREEN_HEIGHT * 0.4,
                                height: SCREEN_HEIGHT * 0.23,
                              }}
                              resizeMode="cover"
                              source={{
                                uri: this.props?.route?.params?.data?.image
                                  ? this.props?.route?.params?.data?.image
                                  : this.props?.route?.params?.filterImage,
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleUploadNewPost();
                      }}
                      style={styles.postButton}>
                      <Text style={styles.post}>
                        {this.props?.route?.params?.update ? 'Update' : 'Post'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>

            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.setState({alertModal: false});
              }}
              text={msgToDisplay}
            />

            <DeleteModal
              visible={deleteModal}
              confirm={() => {
                this.setState(
                  {deleteModal: false, caption: '', description: ''},
                  () => this.props.navigation.navigate(route.MENTALDIARY),
                );
              }}
              cancel={() => {
                this.setState({deleteModal: false});
              }}
              text={'Are you sure you want to discard this entry?'}
            />
            <BottomMenu
              visible={openMenu}
              onOpenCameraPress={() => {
                this.setState({openMenu: false});
                this.props.navigation.navigate(route.MENTALDIARYCAMERA, {
                  update: this.props?.route?.params?.update || false,
                  _id: this.props?.route?.params?.data?._id || '',
                });
              }}
              onOpenGalleryPress={() => {
                this.setState({openMenu: false});
                this.props.navigation.navigate(route.MENTALDIARYGALLERY, {
                  update: this.props?.route?.params?.update || false,
                  _id: this.props?.route?.params?.data?._id || '',
                });
              }}
              onClose={() => {
                this.setState({openMenu: false});
              }}
            />
            <RecordAudioModal
              isVisible={openVoiceRecorder}
              onClose={this.onCloseAudioModal}
              callApi={() => this.handleSendMessage()}
              onModalShow={this.onOpenAudioModal}
              reset={() => {
                this.setState({STTResponse: null});
              }}
              navigation={this.props.navigation}
              STTResponse={this.state.STTResponse}
              setAudioMessage={this.setAudioMessage}
              onOpenAudioModal={this.onOpenAudioModal}
            />
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MentalDiaryCreate);
