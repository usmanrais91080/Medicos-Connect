import React, {useEffect, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
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
// import RNFS from 'react-native-fs';
import {route} from '../../../../lib/utils/constants';
import Icon from '../../../../components/Icon';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid} from 'react-native';
const {width, height, fontScale} = Dimensions.get('screen');

export default function MentalDiaryGallery({navigation, route: routeData}) {
  const [photos, setphotos] = useState([]);
  useEffect(() => {
    _handleButtonPress();
    hasAndroidPermission();
  }, []);
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
    })
      .then(r => {
        setphotos(r.edges);
      })
      .catch(err => {
        //Error Loading Images
      });
  };

  return (
    <View>
      {/* <Button title="Load Images" onPress={this._handleButtonPress} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{marginTop: 10, marginLeft: 10}}>
        <Icon.Entypo name={'cross'} size={40} color={'black'} />
      </TouchableOpacity>
      <FlatList
        // ref = {translationFlatList}
        // style={styles.notParagraphFlatList}
        data={photos}
        pagingEnabled={true}
        bounces={false}
        snapToInterval={height}
        decelerationRate="fast"
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.node.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        key={'portrait'}
        style={{marginTop: 20}}
        renderItem={({item}) => (
          //   <TopicsInnerComponent title={item.Category} onPress={()=>navigateToOtherScreenTopic(item.navigateToOtherScreenTopic)} color={item.color}/>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(route.MENTALDIARYCREATE, {
                createStory: true,
                filterImage: item.node.image.uri,
                type: 'image',
                update: routeData.params.update,
                _id: routeData.params._id,
              });
            }}
            style={{
              elevation: 5,
              margin: 3,
              borderColor: 'grey',
              borderWidth: 1,
            }}>
            <Image
              style={{
                width: width / 3 - 10,
                height: height * 0.2,
              }}
              source={{uri: item.node.image.uri}}
            />
          </TouchableOpacity>
        )}
        // onScroll={()=>setheaderFooterVisible(false)}
        // onTouchStart= {()=>setheaderFooterVisible(false)}
      />
      {/* <ScrollView>
            {photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
          </ScrollView> */}
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
