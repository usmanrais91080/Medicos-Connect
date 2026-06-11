import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
// import { Icon, Input,  } from '../../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {VerticalSpacer} from '../../../lib/utils/global';
import {Icon, Input, Loader} from '../../index';

const CustomDropDownModal = props => {
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        style={{padding: 10, borderRadius: 10, marginHorizontal: '2%'}}
        onPress={() => {
          props.onPress(item);
          //commented because I don't want to reset the tempCountries
          // props.OnReset();
        }}
      >
        <Text style={styles.textStyle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  const renderItems2 = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          props.onPress(item);
          props.OnReset();
        }}
      >
        <Avatar source={{uri: item.image}} rounded size={50} />
        <Text
          style={[
            styles.textStyle,
            {marginLeft: 20, fontSize: 18, fontFamily: themeStyle.FONT_REGULAR},
          ]}
        >
          {props.like ? item?.username : item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      isVisible={props.isVisible}
      animationInTiming={100}
      animationOutTiming={100}
    >
      <View style={styles.modalContainer}>
        {props.loading ? (
          // <View style={{ flex: 1, justifyContent: "center" }}>
          //     <ActivityIndicator color="#FF6B6B" size="large" />
          // </View>
          <Loader />
        ) : props.data.length == 0 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '2.5%',
                marginTop: '5%',
              }}
            >
              {/* <Input width={SCREEN_WIDTH * 0.75} colorProps value={props.value} placeholder="" onChangeText={(job) => props.onSearch(job)}
                                  onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                      props.OnReset()
                                    }
                                  }}/> */}
              <View style={{width: SCREEN_WIDTH * 0.75}}></View>
              <View style={{padding: '5%'}}>
                <TouchableOpacity onPress={props.onClose}>
                  <Icon.AntDesign name="close" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.textStyle]}>No data to load</Text>
            </View>
          </View>
        ) : props.tagFriends ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '5%',
                marginVertical: '5%',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  color: themeStyle.COLOR_BLACK_LIGHT,
                  fontFamily: themeStyle.FONT_REGULAR,
                  fontSize: 20,
                }}
              >
                {props.like ? 'People who Highfived' : 'Tag a Friend'}
              </Text>
              <TouchableOpacity onPress={props.onClose}>
                <Icon.AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Input
                width={SCREEN_WIDTH * 0.85}
                colorProps
                value={props.value}
                placeholder={
                  props.like ? 'Search people' : 'Search friends to tag'
                }
                onChangeText={job => props.onSearch(job)}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    props.OnReset();
                  }
                }}
              />
            </View>

            <FlatList
              data={props.data}
              contentContainerStyle={{margin: '5%', paddingBottom: '20%'}}
              ItemSeparatorComponent={VerticalSpacer}
              renderItem={({item, index}) => renderItems2(item, index)}
            />
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '5%',
                marginVertical: '5%',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  color: themeStyle.COLOR_BLACK_LIGHT,
                  fontFamily: themeStyle.FONT_REGULAR,
                  fontSize: 20,
                }}
              >
                {props.title
                  ? 'Add Job Title'
                  : props.dept
                  ? 'Add Department'
                  : props.prof
                  ? 'Add Profession'
                  : props.country
                  ? 'Add Country'
                  : props.city
                  ? 'Add City'
                  : props.lang
                  ? 'Add your Language'
                  : 'not found'}
              </Text>
              <TouchableOpacity onPress={props.onClose}>
                <Icon.AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
            <ImageBackground
              resizeMode="contain"
              imageStyle={{opacity: 0.3}}
              source={
                props.title
                  ? require('../../../assets/images/titleBg.png')
                  : props.country
                  ? require('../../../assets/images/countryBg.png')
                  : props.city
                  ? require('../../../assets/images/cityBg.png')
                  : props.lang
                  ? require('../../../assets/images/langBg.png')
                  : require('../../../assets/images/titleBg.png')
              }
              style={{height: '100%', width: '100%'}}
            >
              <View style={{alignSelf: 'center'}}>
                <Input
                  width={SCREEN_WIDTH * 0.85}
                  colorProps
                  value={props.value}
                  placeholder={
                    props.title
                      ? 'Type your job title'
                      : props.dept
                      ? 'Type to add department'
                      : props.prof
                      ? 'Type to add profession'
                      : props.city
                      ? 'Type to add city'
                      : props.country
                      ? 'Type to add country'
                      : props.lang
                      ? 'Type to add language'
                      : 'no placeholder found'
                  }
                  onChangeText={job => props.onSearch(job)}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      props.OnReset();
                    }
                  }}
                />
              </View>
              <View style={{height: '70%'}}>
                <FlatList
                  data={props.data}
                  // contentContainerStyle={{ margin: "5%",paddingBottom:'20%' }}
                  ItemSeparatorComponent={VerticalSpacer}
                  renderItem={({item, index}) => renderItems(item, index)}
                />
              </View>
            </ImageBackground>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 10,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyle: {
    fontFamily: themeStyle.FONT_LIGHT,
    textTransform: 'capitalize',
    // textDecorationLine: 'underline',
  },
});
export default CustomDropDownModal;
