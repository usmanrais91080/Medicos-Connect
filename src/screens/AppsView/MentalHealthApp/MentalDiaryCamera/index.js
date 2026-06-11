import React, {useState} from 'react';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Icon from '../../../../components/Icon';
// import RNFS from 'react-native-fs';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {BottomMenu} from './mental.diary.component';
const {width, height, fontScale} = Dimensions.get('screen');

export default function MentalDiaryCamera({navigation, route: routeData}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [flashmode, setflashmode] = useState(false);
  const [flipmode, setflipmode] = useState(false);
  const [openMenu, setopenMenu] = useState(false);
  const [timevisible, settimevisible] = useState(false);
  const [timervalue, settimervalue] = useState('2');
  const startInterval = text => {
    settimervalue(text);
    let count = parseInt(text);
    let myInterval = setInterval(() => {
      if (count == 0) {
        clearInterval(myInterval);
        settimevisible(false);
        captureHandle();
        clearInterval(myInterval);
      } else {
        count -= 1;
        settimervalue(count.toString());
      }
    }, 2500);
  };
  const captureHandle = async () => {
    try {
      const data = await takePicture({
        quality: 0.8,
      });
      navigation.navigate(route.MENTALDIARYCREATE, {
        createStory: true,
        filterImage: data.uri,
        type: 'image',
        update: routeData.params.update,
        _id: routeData.params._id,
      });
    } catch (error) {
      // console.log('capture error', error);
    }
  };
  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={
          flipmode
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        flashMode={
          flashmode
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        style={styles.preview}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: width * 0.02,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon.Entypo name={'cross'} size={40} color={'white'} />
            </TouchableOpacity>
            {timevisible && (
              <Text style={{color: 'white', fontSize: 18, marginTop: 5}}>
                {timervalue}
              </Text>
            )}
            <View style={{width: SCREEN_WIDTH * 0.12}}>
              {/* timer-outline */}
              {flashmode ? (
                <TouchableOpacity
                  onPress={() => {
                    setflashmode(false);
                  }}>
                  <Icon.MaterialCommunityIcons
                    name={'flash'}
                    size={30}
                    color={'white'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    setflashmode(true);
                  }}>
                  <Icon.MaterialCommunityIcons
                    name={'flash-off'}
                    size={30}
                    color={'white'}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => {
                  setopenMenu(true);
                }}>
                <Icon.MaterialCommunityIcons
                  name={'timer-outline'}
                  size={30}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setflipmode(!flipmode);
              }}
              style={[styles.capture1, {marginTop: SCREEN_HEIGHT * 0.02}]}>
              <Icon.SimpleLineIcons
                color={'white'}
                name={'refresh'}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureHandle()}
              style={styles.capture}>
              <View style={styles.capture3}>
                <Icon.FontAwesome name={'circle'} size={20} color={'red'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(route.MENTALDIARYGALLERY)}
              style={[styles.capture2, {marginTop: SCREEN_HEIGHT * 0.04}]}>
              <View style={styles.capture3}>
                {/* <Icon.FontAwesome name={"stop"} size={25} color={'red'} /> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
      <BottomMenu
        visible={openMenu}
        onPressButton={text => {
          setopenMenu(false);

          if (text == '2sec') {
            startInterval('2');
          } else if (text == '5sec') {
            startInterval('5');
          } else {
            startInterval('10');
          }
          settimevisible(true);
        }}
        onClose={() => {
          setopenMenu(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  capture: {
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  capture2: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#fff',
    marginRight: width * 0.13,
    marginTop: height * 0.028,
  },

  capture1: {
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: height * 0.02,
    marginLeft: width * 0.15,
  },
});
