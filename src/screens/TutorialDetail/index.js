import React from 'react';
import {Text, View} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {Icon} from '../../components';
import styles from './styles';
import YoutubePlayer from 'react-native-youtube-iframe';

import {SCREEN_HEIGHT, SCREEN_WIDTH, route} from '../../lib/utils/constants';

const TutorialDetail = ({navigation, route}) => {
  const module = route.params?.module;
  const title = route.params?.title;
  const videoLink = route.params?.videoLink;
  const description = route.params?.description;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        }}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'column',
          }}></View>
        <View
          style={{
            flex: 0.8,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
            paddingLeft: 25,
          }}>
          <View style={{flex: 1, marginTop: Platform.OS ? '10%' : '6%'}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={25}
                color={themeStyle.COLOR_BLACK}
              />
              <Text style={styles.menuheading}>Settings</Text>
            </View>
            <View style={styles.row}>
              <Icon.AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={15}
                color={themeStyle.COLOR_BLACK}
              />
              <Text numberOfLines={1} style={styles.tutorials}>
                {module} Tutorials
              </Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <YoutubePlayer
              height={300}
              play={false}
              videoId={videoLink}
              webViewProps={{
                allowsFullscreenVideo: true,
                allowsInlineMediaPlayback: true,
                mediaPlaybackRequiresUserAction: false,
              }}
              width={'90%'}
              // webViewStyle={styles.video}
            />
            {module == 'Medicos Connect' ? (
              <>
                <Text style={styles.title}>How to use</Text>
                <Text style={styles.description}>
                  Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </Text>
                <YoutubePlayer
                  height={300}
                  videoId={videoLink}
                  webViewProps={{
                    allowsFullscreenVideo: true,
                    allowsInlineMediaPlayback: true,
                    mediaPlaybackRequiresUserAction: false,
                  }}
                  // webViewStyle={styles.video}
                />
              </>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};

export default TutorialDetail;
