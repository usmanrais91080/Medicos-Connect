import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {Icon, Loader} from '../..';
import WebView from 'react-native-webview';
const {width, height} = Dimensions.get('window');
import {Viewport} from '@skele/components';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';
import themeStyle from '../../../assets/styles/theme.style';
const ViewportAwareVideo = Viewport.Aware(Video);
export class RenderVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: this.props.paused,
      isLoading: true,
    };
    this.player = null;
  }
  render() {
    const {isLoading, paused} = this.state;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.onPressView(!this.props.paused, this.props.index)
        }
        style={{flex: 1}}>
        {Platform.OS === 'ios' ? (
          <ViewportAwareVideo
            key={this.props.index}
            style={{
              height: 428,
              width: SCREEN_WIDTH,
            }}
            source={{uri: this.props.item}}
            paused={this.props.paused}
            controls={false}
            onEnd={() => {
              this.player.seek(0);
            }}
            innerRef={ref => (this.player = ref)}
            // onViewportEnter={() => { this.props.afterEnteringView(false, this.props.index); }}
            onViewportLeave={() => {
              this.props.afterEnteringView(true, this.props.index);
            }}
            selectedVideoTrack={{
              type: 'resolution',
              value: 240,
            }}
            resizeMode={'cover'}
            onLoad={data => {
              this.setState({isLoading: false});
            }}
          />
        ) : (
          // <FastImage source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} style={{
          //     height: 428,
          //     width: width,

          // }} />
          <ViewportAwareVideo
            key={this.props.index}
            paused={this.props.paused}
            controls={false}
            // onEnd={() => { this.player.seek(0)}}
            repeat={true}
            innerRef={ref => (this.player = ref)}
            // onViewportEnter={() => { this.props.afterEnteringView(false, this.props.index); }}
            onViewportLeave={() => {
              this.props.afterEnteringView(true, this.props.index);
            }}
            resizeMode={'cover'}
            selectedVideoTrack={{
              type: 'resolution',
              value: 240,
            }}
            source={{uri: this.props.item}}
            style={{width: SCREEN_WIDTH, height: 428}}
            onLoad={data => {
              this.setState({isLoading: false});
            }}
            // bufferConfig={{
            //     minBufferMs: 10000,
            //     maxBufferMs: 20000,
            //     bufferForPlaybackMs: 1500,
            //     bufferForPlaybackAfterRebufferMs: 5000
            //   }}
            // onLoadStart={(data) => {
            //     console.log("Load Start>>>>>>",data)
            //     this.setState({ isLoading: true })
            // }}
          />
        )}

        {this.props.paused == true && (
          <>
            <View
              style={{
                position: 'absolute',
                zIndex: isLoading ? 1 : 2,
                height: 60,
                width: 60,
                top: Platform.OS === 'ios' ? '70%' : '60%',
                left: '50%',
                marginTop: -30,
                marginLeft: -30,
                backgroundColor: 'rgb(51,51,51)',
                borderRadius: 30,
              }}>
              <Icon.MaterialIcons
                name="play-circle-filled"
                size={60}
                color="white"
              />
            </View>
            <FastImage
              source={{uri: this.props?.thumb}}
              style={{
                height: 428,
                width: width,
                position: isLoading ? 'relative' : 'absolute',
              }}
            />
          </>
        )}
        {isLoading && (
          <>
            <View
              style={{
                position: 'absolute',
                zIndex: isLoading ? 2 : 1,
                height: 60,
                width: 60,
                top: Platform.OS === 'ios' ? '70%' : '60%',
                left: '50%',
                marginTop: -30,
                marginLeft: -30,
                backgroundColor: themeStyle.COLOR_WHITE,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={themeStyle.DASH_DARK} />
            </View>
            <FastImage
              source={{uri: this.props?.thumb}}
              style={{
                height: 428,
                width: width,
                position: isLoading ? 'absolute' : 'relative',
              }}
            />
          </>
        )}
      </TouchableOpacity>
    );
  }
}

export const RenderImage = props => {
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    FastImage.preload([{uri: props.item}]);
  }, []);

  useEffect(() => {
    if (props.item) {
      Image.getSize(props.item, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [props.item]);

  return (
    <View activeOpacity={0.8}>
      <FastImage
        source={{uri: props.item}}
        resizeMode={'cover'}
        pointerEvents="none"
        style={{
          aspectRatio: aspectRatio,
          width: SCREEN_WIDTH,
          height: undefined,
        }}
      />
    </View>
  );
};
