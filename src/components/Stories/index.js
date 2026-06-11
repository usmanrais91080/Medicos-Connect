import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Text,
  // Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
import {Avatar} from 'react-native-elements';
import {DeleteModal} from '../../components';
import {route} from '../../lib/utils/constants';
import {HorizontalSpacer} from '../../lib/utils/global';
import {SocialServices} from '../../services';

import StoryContainer from './src/StoryContainer';

import styles from './style';

const Stories = props => {
  const [alertModal, setAlertModal] = useState(false);
  const [storyId, setStoryId] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const onStorySelect = (item, index) => {
    setCurrentUserIndex(index);
    setModel(true);
    handleViewStory(item.stories[index]?._id);
  };

  const handleViewStory = id => {
    SocialServices.viewStory(id, props.user.userData.token)
      .then(res => {})
      .catch(err => {});
  };

  const onStoryClose = () => {
    setAlertModal(false);
    setModel(false);
  };

  const onStoryNext = (isScroll, item) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        try {
          modalScroll.current.scrollTo(newIndex, true);
        } catch (e) {
          console.warn('error=>', e);
        }
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = isScroll => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = scrollValue => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      setCurrentScrollValue(scrollValue);
    }
  };

  const handleDeleteStory = _id => {
    setIsPause(true);
    setAlertModal(true);
    setStoryId(_id);
  };

  const handlePollVoting = (storyId, choiceId) => {
    SocialServices.voteStory(
      storyId,
      {choice_id: choiceId},
      props?.user?.userData?.token,
    )
      .then(res => {
        setIsPause(false);
        props.reloadComponent();
      })
      .catch(err => {
        alert(`${err?.response.data.message}`);
        setIsPause(false);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        horizontal
        contentContainerStyle={{
          paddingRight: '5%',
          marginTop: props.data.length > 0 ? 15 : 0,
          paddingBottom: props.data.length > 0 ? 5 : 0,
        }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSpacer}
        keyExtractor={item => item.title}
        renderItem={({item, index}) => {
          return props.smallStories ? (
            <View style={styles.circleStyle}>
              <TouchableOpacity onPress={() => onStorySelect(item, index)}>
                <Avatar
                  size={60}
                  imageStyle={styles.circleStyle}
                  style={[styles.circle, props.avatarStyle]}
                  source={{
                    uri: item?.image
                      ? item?.image
                      : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => onStorySelect(item, index)}
              style={{overflow: 'hidden', borderRadius: 10}}>
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: item?.stories[0]?.background
                    ? item?.stories[0]?.background
                    : 'https://wallpapercave.com/wp/wp3396910.jpg',
                }}
                style={styles.userContentContainer}>
                <View style={styles.circleStyle}>
                  <Avatar
                    size={40}
                    imageStyle={styles.circleStyle}
                    style={[styles.circle, props.avatarStyle]}
                    source={{
                      uri: item?.image
                        ? item?.image
                        : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                    }}
                  />
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                  <Text style={[styles.whiteTextStyle, props.titleStyle]}>
                    {item?.username}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}>
        <CubeNavigationHorizontal
          callBackAfterSwipe={g => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}>
          {props?.data?.map((item, index) => (
            <StoryContainer
              key={item.title}
              onPause={result => setIsPause(result)}
              pause={isPause}
              onClose={onStoryClose}
              user={props?.user}
              onStoryNext={isScroll => onStoryNext(isScroll, item)}
              onStoryPrevious={onStoryPrevious}
              dataStories={item}
              isNewStory={index !== currentUserIndex}
              textReadMore={props.textReadMore}
              onDelete={id => handleDeleteStory(id)}
              onVotePoll={(id, chId) => handlePollVoting(id, chId)}
              userId={props?.user?.userData?._id}
              onSubmitAns={data =>
                props.navigation.navigate(route.CHATSCREEN, {data: data})
              }
              handleViewStory={handleViewStory}
              goProfile={id =>
                props.navigation.navigate(route.SOCIALPROFILE, {data: id})
              }
              navigation={props.navigation}
            />
          ))}
        </CubeNavigationHorizontal>
        <DeleteModal
          visible={alertModal}
          confirm={() => {
            onStoryClose();
            SocialServices.deleteStory(storyId, props?.user?.userData?.token)
              .then(res => {
                props.reloadComponent();
              })
              .catch(err => {});
          }}
          text="Are you sure you want to delete your story?"
          cancel={() => {
            setIsPause(false);
            setAlertModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default Stories;
