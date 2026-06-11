import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  StatusBar,
} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Container,
  DeleteModal,
  Icon,
  Loader,
  RecordAudioModal,
} from '../../../../components';
import Camera from '../../../../assets/svg/camera.svg';
import Add from '../../../../assets/svg/add-new.svg';
import Voice from '../../../../assets/svg/audio.svg';
import Wave from '../../../../assets/svg/wave.svg';

import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {MentalServices} from '../../../../services';
import {connect} from 'react-redux';
import moment from 'moment';
import {BottomMenu} from './mental.diary.component';
import {ShareMenu} from './mental.diary.sharemenu.component';
import {bindActionCreators} from 'redux';
import {mentalHealthActions} from '../../../../redux/actions/mentalHealth';
import Sound from 'react-native-sound';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class MentalDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ads: [],
      alertModal: false,
      msgToDisplay: '',
      loading: true,
      refreshing: false,
      openMenu: false,
      stats: {},
      openVoiceRecorder: false,
      postMenu: false,
      diary: [],
      entry: {},
      recording: null,
    };
    this.sound = [];
  }

  componentDidMount = () => {
    this.getData();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  getData = async () => {
    try {
      let data = {
        year: new Date().getFullYear(),
      };
      const getStats = await MentalServices.getDiaryStats(
        this.props.user.userData.token,
      );
      const getDiary = await MentalServices.getDiary(
        data,
        this.props.user.userData.token,
      );

      let array = [...getDiary?.data?.data];
      array.map((item, index) => {
        item?.data.map((e, i) => {
          array[index].data[i] = {
            ...array[index].data[i],
            isPlaying: false,
            isLoading: false,
          };
        });
      });
      this.setState({
        stats: getStats?.data?.data,
        diary: array.reverse(),
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      this.setState({loading: false, refreshing: false});
      // console.log('Error>>>>>>>>', error);
    }
  };

  _renderAdsItem = ({item, index}) => {
    return (
      <>
        {item?.data?.length > 0 ? (
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <View
              style={{
                backgroundColor: themeStyle.ORANGE_DARK,
                paddingLeft: SCREEN_WIDTH * 0.1,
                height: 25,
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <Text style={{color: themeStyle.WHITE_SMOKE}}>
                {item?.month} {item?.year}
              </Text>
            </View>
            {item?.data?.map((item2, index2) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(route.MENTALDIARYENTRY, {
                    data: item2,
                    token: this.props.user.userData.token,
                  })
                }
                key={index2}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  width: SCREEN_WIDTH,
                  // height: 110,
                  marginTop: SCREEN_HEIGHT * 0.008,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    width: SCREEN_WIDTH * 0.25,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: themeStyle.COLOR_BLACK,
                      fontSize: 24,
                      fontFamily: themeStyle.FONT_REGULAR,
                    }}>
                    {moment(item2?.createdAt).format('D')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: themeStyle.COLOR_BLACK_LIGHT,
                      fontSize: 12,
                      fontFamily: themeStyle.FONT_REGULAR,
                    }}>
                    {item?.month}
                    {'\n'}
                    {item?.year}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: SCREEN_WIDTH * 0.01,
                    height: '85%',
                    alignSelf: 'center',
                    borderColor: themeStyle.ORANGE_DARK,
                  }}></View>
                <TouchableOpacity disabled style={{width: SCREEN_WIDTH * 0.68}}>
                  <View style={{padding: 10}}>
                    <Text style={{color: '#919090', fontSize: 16}}>
                      {item2?.title}
                    </Text>
                    {item2?.text !== '' && (
                      <View style={{marginVertical: '2%'}}>
                        <Text ellipsizeMode="tail" numberOfLines={1}>
                          {' '}
                          {item2?.text}{' '}
                        </Text>
                      </View>
                    )}
                    {item2?.recording != null && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingBottom: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            let array = [...this.state.diary];

                            if (array[index].data[index2].isPlaying) {
                              this.sound[index2].pause();
                              array[index].data[index2] = {
                                ...array[index].data[index2],
                                isPlaying: false,
                              };
                            } else {
                              array[index].data[index2] = {
                                ...array[index].data[index2],
                                isLoading: true,
                              };
                            }
                            this.setState({diary: array});

                            this.sound[index2] = new Sound(
                              item2?.recording,
                              null,
                              error => {
                                if (error) {
                                } else {
                                  let array = [...this.state.diary];
                                  if (array[index].data[index2].isPlaying) {
                                    array[index].data[index2] = {
                                      ...array[index].data[index2],
                                      isPlaying: false,
                                    };
                                    this.setState({diary: array});
                                  } else {
                                    this.sound[index2].play(success => {
                                      if (success) {
                                        array[index].data[index2] = {
                                          ...array[index].data[index2],
                                          isLoading: false,
                                          isPlaying: false,
                                        };
                                        this.setState({diary: array});
                                      }
                                    });
                                    array[index].data[index2] = {
                                      ...array[index].data[index2],
                                      isLoading: false,
                                      isPlaying: true,
                                    };
                                    this.setState({diary: array});
                                  }
                                  // array[index].data[index2] = { ...array[index].data[index2], isPlaying: true, isLoading: false }
                                }
                              },
                            );
                          }}>
                          <Icon.AntDesign
                            name={item2.isPlaying ? 'pausecircle' : 'play'}
                            size={30}
                            color={themeStyle.PURPLE_COLOR}
                          />
                        </TouchableOpacity>
                        <Wave height={60} width={200} />
                      </View>
                    )}
                    {item2?.image !== null && (
                      <View style={{marginVertical: '1%'}}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                          }}
                          source={{uri: item2?.image}}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <View style={{width: SCREEN_WIDTH * 0.06}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({postMenu: true, entry: item2});
                    }}
                    style={{
                      marginTop: 5,
                      justifyContent: 'flex-start',
                      width: 30,
                      paddingVertical: 5,
                      paddingRight: 5,
                    }}>
                    <Icon.Entypo
                      name={'dots-three-vertical'}
                      size={20}
                      color={'#303030'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </>
    );
  };

  handleDeleteEntry = () => {
    MentalServices.deleteDiary(
      this.state.entry?._id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          msgToDisplay: `${res?.data?.message}`,
          alertModal: true,
        });
      })
      .catch(err => {
        // console.log('err>>>>>>>>>>>>>>>', err);
      });
  };

  render() {
    const {
      alertModal,
      msgToDisplay,
      openMenu,
      openVoiceRecorder,
      postMenu,
      stats,
      diary,
      entry,
    } = this.state;
    return (
      <Container color>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        {/* Top Container */}
        <View
          style={{
            backgroundColor: themeStyle.COLOR_WHITE,
            paddingBottom: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: '7%',
              borderBottomWidth: 1,
              borderBottomColor: themeStyle.COLOR_LIGHT_GREY,
            }}>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => this.setState({openMenu: true})}>
              <Camera fill={themeStyle.COLOR_GREEN} height={70} />
            </TouchableOpacity>

            {/* <Voice /> */}
            <TouchableOpacity
              style={styles.icons}
              onPress={() =>
                this.props.navigation.navigate(route.MENTALDIARYCREATE)
              }>
              <Add />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => this.setState({openVoiceRecorder: true})}>
              <Voice />
            </TouchableOpacity>
          </View>
          {/* Text View */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '2.5%',
            }}>
            <Text style={styles.textstyle}>
              Entries <Text style={styles.bold}>{stats?.totalEntries}</Text>
            </Text>
            <Text style={styles.textstyle}>
              Streak <Text style={styles.bold}>{stats?.streak}</Text>
            </Text>
            <Text style={styles.textstyle}>
              Media <Text style={styles.bold}>{stats?.totalMedia}</Text>
            </Text>
          </View>
        </View>

        {this.state.loading ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: '30%'}}
            refreshing={this.state.refreshing}
            refreshControl={
              <RefreshControl
                tintColor="#FF9966"
                refreshing={this.state.refreshing}
                onRefresh={() =>
                  this.setState({refreshing: true}, () => this.getData())
                }
              />
            }>
            <View
              style={[
                styles.container,
                {backgroundColor: themeStyle.COLOR_WHITE, marginTop: -30},
              ]}>
              <View>
                <FlatList
                  data={diary}
                  renderItem={this._renderAdsItem}
                  keyExtractor={item => item.id.toString()}
                  ItemSeparatorComponent={HorizontalSpacer}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: themeStyle.FONT_REGULAR,
                          color: themeStyle.COLOR_BLACK,
                          fontSize: 16,
                        }}>
                        No record found!
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        )}
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => this.getData());
          }}
          text={msgToDisplay}
        />
        <BottomMenu
          visible={openMenu}
          onOpenCameraPress={() => {
            this.setState({openMenu: false});
            this.props.navigation.navigate(route.MENTALDIARYCAMERA, {
              update: false,
            });
          }}
          onOpenGalleryPress={() => {
            this.setState({openMenu: false});
            this.props.navigation.navigate(route.MENTALDIARYGALLERY, {
              update: false,
            });
          }}
          onClose={() => {
            this.setState({openMenu: false});
          }}
        />
        <RecordAudioModal
          isVisible={openVoiceRecorder}
          onClose={() => this.setState({openVoiceRecorder: false})}
          onModalShow={() => this.setState({openVoiceRecorder: true})}
          navigation={this.props.navigation}
          reset={() => {
            this.setState({recording: null});
          }}
          setAudioMessage={recording => {
            this.setState({openVoiceRecorder: false});
            this.props.navigation.navigate(route.MENTALDIARYCREATE, {
              data: {recording},
            });
          }}
          STTResponse={this.state.recording}
        />
        <ShareMenu
          visible={postMenu}
          onPressButton={text => {
            this.setState({postMenu: false});
            if (text == 'pin') {
            } else if (text == 'share') {
              this.props.navigation.navigate(route.MENTALDIARYCREATE, {
                data: entry,
                update: true,
              });
            } else {
              this.handleDeleteEntry();
            }
          }}
          onClose={() => {
            this.setState({postMenu: false});
          }}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    diary: state.mentalHealthReducer?.diary,
    stats: state.mentalHealthReducer?.stats,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mentalAction: bindActionCreators(mentalHealthActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MentalDiary);
