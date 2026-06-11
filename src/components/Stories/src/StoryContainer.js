import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  NativeTouchEvent,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';

import {WebView} from 'react-native-webview';
import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import DropDown from '../../../assets/svg/dropDown.svg';
import ProgressArray from './ProgressArray';
import {Icon} from '../..';
import {Text} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {Platform} from 'react-native';
import {SCREEN_HEIGHT, route} from '../../../lib/utils/constants';
import FastImage from 'react-native-fast-image';
import ReactNativeModal from 'react-native-modal';
const SCREEN_WIDTH = Dimensions.get('window').width;
import Daaki from '../../../assets/svg/daaki.svg';

const StoryContainer = props => {
  const {dataStories} = props;
  const stories = dataStories?.stories || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [qAnswer, setQAns] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(10);
  const story = stories[currentIndex];
  const [isShowModel, setShowModel] = useState(false);
  const [comment, setComment] = useState('');
  const {isReadMore} = story || {};

  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const changeStory = evt => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    props.handleViewStory(stories[currentIndex]?._id);
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext(false);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious(false);
    }
  };

  const onImageLoaded = loaded => {
    setLoaded(loaded);
  };

  const onVideoLoaded = length => {
    setLoaded(true);
    setDuration(length.duration);
  };

  const onPause = result => {
    // setIsPause(result);
  };

  const onReadMoreOpen = () => {
    // setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    props.onPause(false);
    setModel(false);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  const loading = () => {
    if (!isLoaded) {
      <Story
        onImageLoaded={loaded => onImageLoaded(loaded)}
        pause={props.pause}
        isNewStory={props.isNewStory}
        onVideoLoaded={length => onVideoLoaded(length)}
        story={stories[currentIndex]?.metadata?.url}
        // story={"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
      />;
    } else {
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="white" />
      </View>;
    }
  };

  const handleDelete = () => {
    props.onPause(true);
    props.onDelete(stories[currentIndex]?._id);
  };

  const handleVoteFunction = id => {
    props.onPause(true);
    props.onVotePoll(stories[currentIndex]?._id, id);
  };

  const handleStoryView = () => {
    props.onPause(true);
    setShowModel(true);
  };

  const handleQAnswer = () => {
    props.onSubmitAns({
      id: `${stories[currentIndex]?.user?._id}`,
      name: stories[currentIndex]?.user?.username,
      seen: false,
      type: 'Social',
      email: '',
      is_post: false,
      is_stroy: true,
      post_id: '',
      message: qAnswer,
      profile_url: stories[currentIndex]?.user?.image
        ? stories[currentIndex]?.user?.image
        : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
      last_message: 'Answered your question!',
      last_message_time: '2021-08-12 17:00:00',
    });
  };

  const sendComment = () => {
    if (comment.trim() == '') return;
    props.onSubmitAns({
      id: `${stories[currentIndex]?.user?._id}`,
      name: stories[currentIndex]?.user?.username,
      seen: false,
      type: 'Social',
      email: '',
      is_post: false,
      is_stroy: true,
      post_id: '',
      message: comment,
      profile_url: stories[currentIndex]?.user?.image
        ? stories[currentIndex]?.user?.image
        : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
      last_message: 'Commented on your story!',
      last_message_time: '2021-08-12 17:00:00',
    });
    setComment('');
  };

  const renderFriends = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => {
          props.goProfile(item._id);
        }}>
        <FastImage
          source={{
            uri:
              item?.image == ''
                ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                : item.image,
          }}
          style={{height: 60, width: 60, borderRadius: 25}}
        />
      </TouchableOpacity>
    );
  };

  const renderViewers = ({item, index}) => {
    return (
      <View style={styles.viewerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={{
              uri:
                item?.image == ''
                  ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                  : item?.image,
            }}
            style={styles.viewerImage}
          />
          <View>
            <Text style={styles.viewerUsername}>{item?.username}</Text>
            <Text style={styles.viewerDate}>{item?.created_at}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}>
      {/* <StatusBar hidden /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={500}
          onPress={e => changeStory(e.nativeEvent)}
          onLongPress={() => props.onPause(true)}
          onPressOut={() => props.onPause(false)}
          style={styles.container}>
          <View style={styles.container}>
            {stories[currentIndex]?.background && (
              <Story
                onImageLoaded={onImageLoaded}
                pause={props.pause}
                isLoaded={isLoaded}
                isNewStory={props.isNewStory}
                onVideoLoaded={length => onVideoLoaded(length)}
                story={stories[currentIndex]}
                onClickLink={() =>
                  props.navigation.navigate(route.VIEWURL, {
                    url: stories[currentIndex].metadata.text,
                  })
                }
              />
            )}

            <UserView
              name={dataStories.username}
              profile={dataStories.image}
              datePublication={stories[currentIndex]?.created_at}
              onClosePress={props.onClose}
              handleDelete={handleDelete}
              isMyProfile={
                props?.user?.userData?._id == dataStories?._id ? true : false
              }
              handleStoryView={handleStoryView}
            />

            {stories[currentIndex]?.type == 'question' && (
              <View style={styles.innerTextModal}>
                <View style={styles.pollContainer}>
                  <Text
                    style={{
                      ...styles.modalHeading,
                      fontFamily: themeStyle.FONT_BOLD,
                    }}>
                    Question
                  </Text>
                  <Text
                    //  onPress={() => this.setState({ showQuestion: false, questionVisible: true })}
                    style={{
                      // flexWrap: 'wrap',
                      fontSize: 20,
                      color: '#000000',
                      fontFamily: themeStyle.FONT_MEDIUM,
                      padding: 20,
                      // zIndex: 1,

                      // backgroundColor:this.textInputRef.current.backgroundColor
                    }}>
                    {stories[currentIndex]?.metadata?.text}
                  </Text>
                  <TextInput
                    editable={
                      stories[currentIndex]?.user?._id == props.userId
                        ? false
                        : true
                    }
                    style={{
                      backgroundColor: '#f2f2f2',
                      flexWrap: 'wrap',
                      fontSize: 16,
                      color: 'grey',
                      fontFamily: themeStyle.FONT_MEDIUM,
                      borderRadius: 15,
                      padding: 20,
                      zIndex: 1,
                      width: '100%',
                      maxHeight: SCREEN_HEIGHT * 0.2,
                    }}
                    onFocus={() => {
                      props.onPause(true);
                    }}
                    placeholder="Type your answer...."
                    onBlur={() => {
                      props.onPause(false);
                    }}
                    multiline={true}
                    onChangeText={text => setQAns(text)}
                    value={qAnswer}
                  />
                  <TouchableOpacity
                    disabled={
                      stories[currentIndex]?.user?._id == props.userId
                        ? true
                        : false
                    }
                    onPress={() => {
                      handleQAnswer();
                    }}
                    style={{
                      height: 54,
                      backgroundColor: '#f2f2f2',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: themeStyle.FONT_BOLD,
                        fontSize: 20,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {stories[currentIndex]?.type == 'poll' && (
              <View style={styles.innerTextModal}>
                <View style={styles.pollContainer}>
                  <View style={styles.optionInput}>
                    <Text style={styles.pollText}>
                      {stories[currentIndex]?.metadata?.text}
                    </Text>
                  </View>
                  {stories[currentIndex]?.metadata?.choices.map(
                    (item, index) => {
                      const totalVotes =
                        stories[currentIndex]?.metadata?.totalVotes;
                      const percentage = (item.votes / totalVotes) * 100;
                      return (
                        <Pressable
                          style={styles.options}
                          onPress={() => handleVoteFunction(item._id)}>
                          <View
                            style={[
                              styles.optionNumber,
                              {
                                width:
                                  percentage > 12
                                    ? `${percentage - 0.09}%`
                                    : '12%',
                              },
                            ]}>
                            <Text style={styles.optionTitle}>
                              {index == 0
                                ? 'A'
                                : index == 1
                                ? 'B'
                                : index == 2
                                ? 'C'
                                : 'D'}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: 40,
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                              justifyContent: 'center',
                              flex: 1,
                            }}>
                            <Text
                              style={[
                                styles.optionText,
                                {position: 'absolute', left: 55},
                              ]}>
                              {item?.text}
                            </Text>
                            <Text
                              style={[
                                styles.optionTitle,
                                {position: 'absolute', right: 10},
                              ]}>
                              {(percentage || 0).toFixed(0)}%
                            </Text>
                          </View>
                        </Pressable>
                      );
                    },
                  )}
                </View>
              </View>
            )}
            {stories[currentIndex]?.tag_users && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  bottom: SCREEN_HEIGHT * 0.3,
                }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={stories[currentIndex]?.tag_users}
                  renderItem={renderFriends}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}

            {/* {!isReadMore && (
            <Readmore title={props.textReadMore} onReadMore={onReadMoreOpen} />
          )} */}
            {/* {props?.user?.userData?._id == dataStories?._id && (
            <Readmore title={props.textReadMore} onReadMore={() => handleDelete()} />
          )} */}
            {!(props?.user?.userData?._id == dataStories?._id) && (
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 40,
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: '75%',
                  height: 50,
                  backgroundColor: themeStyle.COLOR_WHITE,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    color: themeStyle.COLOR_BLACK,
                  }}
                  onFocus={() => {
                    props.onPause(true);
                  }}
                  placeholder="Reply"
                  placeholderTextColor={themeStyle.COLOR_BLACK}
                  value={comment}
                  onChangeText={text => setComment(text)}
                />
                <TouchableOpacity onPress={sendComment}>
                  <Daaki fill={themeStyle.DAVY_GRAY} />
                </TouchableOpacity>
              </View>
            )}

            <ReactNativeModal
              useNativeDriver={false}
              hideModalContentWhileAnimating={true}
              animationIn={'slideInUp'}
              backdropColor={'#E9E9E9'}
              animationInTiming={800}
              animationOutTiming={800}
              style={{
                justifyContent: 'flex-end',
                margin: 0,
              }}
              isVisible={isShowModel}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: SCREEN_HEIGHT * 0.6,
                  borderRadius: 10,
                  paddingVertical: '1%',
                }}>
                <TouchableOpacity
                  onPress={() => setShowModel(false)}
                  style={{alignSelf: 'center', marginVertical: 15}}>
                  <DropDown />
                </TouchableOpacity>

                <FlatList
                  data={stories[currentIndex]?.views}
                  renderItem={renderViewers}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={() => (
                    <Text style={{marginHorizontal: 20}}>No viewers yet</Text>
                  )}
                />
              </View>
            </ReactNativeModal>

            <ProgressArray
              next={nextStory}
              isLoaded={isLoaded}
              duration={duration}
              pause={props.pause}
              isNewStory={props.isNewStory}
              stories={stories}
              currentIndex={currentIndex}
              currentStory={stories[currentIndex]}
              length={stories.map((_, i) => i)}
              progress={{id: currentIndex}}
            />
          </View>

          <Modal
            style={styles.modal}
            position="bottom"
            isOpen={isModelOpen}
            onClosed={onReadMoreClose}>
            <View style={{marginTop: '5%'}}>
              <View style={styles.bar} />
              {props?.user?.userData?._id == dataStories?._id ? (
                <View style={{alignSelf: 'flex-end', bottom: '35%', right: 10}}>
                  <Icon.FontAwesome
                    onPress={() => handleDelete()}
                    name="trash-o"
                    color="black"
                    size={25}
                    style={{marginRight: 8}}
                  />
                </View>
              ) : null}
            </View>
            {/* <WebView source={{ uri: 'http://google.com' }} /> */}
          </Modal>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 30 : 0,
  },
  innerTextModal: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: '35%',
    padding: 10,
    marginBottom: 10,
  },
  pollContainer: {
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    justifyContent: 'center',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    // top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  modalHeading: {
    fontSize: themeStyle.FONT_SIZE_2XLARGE,
  },
  content: {width: '100%', height: '100%'},
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  optionInput: {
    borderWidth: 2,
    borderColor: themeStyle.CYAN_BLUE,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 7,
    width: '100%',
    color: themeStyle.COLOR_BLACK,
  },
  options: {
    borderWidth: 2,
    borderColor: themeStyle.CYAN_BLUE,
    backgroundColor: '#F3F3F3',
    borderRadius: 7,
    width: '100%',
    color: themeStyle.COLOR_BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    height: 46,
    justifyContent: 'center',
  },
  optionNumber: {
    backgroundColor: themeStyle.CYAN_BLUE,
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  optionText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    paddingLeft: 12,
  },
  optionTitle: {
    fontSize: 24,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_BOLD,
    paddingLeft: 12,
  },
  viewerImage: {height: 50, width: 50, borderRadius: 25, marginRight: 16},
  viewerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewerUsername: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
  },
  viewerDate: {
    color: '#867F7F',
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 12,
    marginTop: 3,
  },
});
export default StoryContainer;
