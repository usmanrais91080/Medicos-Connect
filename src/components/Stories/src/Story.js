/* eslint-disable react/no-unused-prop-types */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';

const ScreenWidth = Dimensions.get('window').width;

const Story = props => {
  const {story} = props;
  const [isPortation, setIsPortation] = useState(false);
  const [heightScaled, setHeightScaled] = useState(231);
  return (
    <View style={styles.container}>
      {!props.isLoaded ? (
        <View style={styles.loading}>
          <ActivityIndicator color="white" />
        </View>
      ) : null}
      {story?.background?.includes('.mp4') ? (
        <Video
          source={{uri: story.background}}
          paused={props.pause || props.isNewStory}
          onLoad={item => {
            const {width, height} = item.naturalSize;
            const heightScaled = height * (ScreenWidth / width);
            let isPortrait = height > width;
            setIsPortation(height > width);
            setHeightScaled(heightScaled);
            props.onVideoLoaded(item);
          }}
          style={
            isPortation
              ? [styles.contentVideoPortation, {height: heightScaled}]
              : [styles.contentVideo, {height: heightScaled}]
          }
          resizeMode={'stretch'}
        />
      ) : (
        <TouchableOpacity
          disabled={story.type !== 'link'}
          onPress={props.onClickLink}>
          <Image
            source={{uri: story.background}}
            onLoadEnd={() => props.onImageLoaded(true)}
            style={styles.content}
            resizeMode="cover"
            width={ScreenWidth}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {width: '100%', height: '100%', flex: 1},
  contentVideo: {
    width: ScreenWidth + 20,
    //aspectRatio: 1,
    backgroundColor: '#000',
    //flex: 1,
    height: 231,
  },
  contentVideoPortation: {
    width: ScreenWidth + 20,
    //aspectRatio: 1,
    backgroundColor: '#000',
    //flex: 1,
    height: 231,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Story;
