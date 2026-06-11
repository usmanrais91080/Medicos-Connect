import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import themeStyle from '../../assets/styles/theme.style';
import {Image} from 'react-native';
import Icon from '../../components/Icon';
import {SCREEN_WIDTH, route} from '../../lib/utils/constants';
import {scaleImage} from '../../lib/utils/global';

const mainColors = {
  Connect: themeStyle.PINK,
  Education: themeStyle.COLOR_EDUCATION,
  Mee: themeStyle.PURPLE_COLOR,
  Career: themeStyle.CARRER_PRIMARY,
  Market: themeStyle.COLOR_CLASSIFIED,
  Wallet: themeStyle.COLOR_BOOK_KEEPING,
  Social: themeStyle.YELLOW,
};

const Splash = ({route: routeData}) => {
  const navigation = useNavigation();
  const headerTitle = routeData?.params?.headerTitle;
  const title = routeData?.params?.title;
  const videoDescription = routeData?.params?.videoDescription;
  const link = routeData?.params?.link;
  const onStartPress = routeData?.params?.onStartPress;

  useEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerStyle: {
        backgroundColor: mainColors[headerTitle],
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(route.HOMESCREEN)}>
          <Icon.MaterialIcons
            name="arrow-back"
            size={25}
            color={themeStyle.COLOR_WHITE}
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView
      scrollEnabled={false}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{...styles.container, backgroundColor: mainColors[headerTitle]}}
      >
        <View style={styles.imageContainer1}>
          <View style={styles.imageContainer2}>
            <Image
              source={{uri: 'https://picsum.photos/id/1/200/300'}}
              style={styles.image}
              width={scaleImage(SCREEN_WIDTH * 0.45)}
              height={scaleImage(SCREEN_WIDTH * 0.45)}
            />
          </View>
        </View>
        <Text style={styles.title}>{headerTitle}</Text>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.youtubeVideoContainer}>
          <View style={styles.box} />
          <View style={{width: '60%'}}>
            <Text style={styles.videoTitle}>{headerTitle}</Text>
            <Text style={styles.videoDescription}>{videoDescription}</Text>
          </View>
          <TouchableOpacity>
            <Icon.Entypo
              name="controller-play"
              size={42}
              color={themeStyle.COLOR_WHITE}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onStartPress} style={styles.startButton}>
          <Text style={styles.start}>Start!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Splash;
