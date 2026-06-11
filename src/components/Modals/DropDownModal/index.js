import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {VerticalSpacer} from '../../../lib/utils/global';
import {Icon, Input, Loader} from '../../index';

const DropDownModal = props => {
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          paddingHorizontal: props.prof ? '5%' : '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: themeStyle.COLOR_BLACK_LIGHT,
        }}
        onPress={() => {
          props.onPress(item);
          props.OnReset();
        }}
      >
        <Text style={styles.textStyle}>{item.label}</Text>
        <View
          style={{
            width: 18,
            height: 16,
            backgroundColor:
              props.selectedValue == item.label ? '#0B90CF' : '#dbdbdb',
            borderRadius: 2,
            borderWidth: 2,
            borderColor: '#dbdbdb',
          }}
        />
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
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      onBackdropPress={() => props.onClose()}
      animationInTiming={400}
      animationOutTiming={400}
      style={
        (styles.modalContainer,
        {margin: 0, justifyContent: 'flex-end', padding: props.prof ? 0 : '5%'})
      }
    >
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
        }}
      >
        {props.prof ? (
          <TouchableOpacity
            onPress={() => props.onClose()}
            style={{
              alignItems: 'center',
              padding: '2.5%',
              alignSelf: 'center',
            }}
          >
            <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              height: 2,
              width: 50,
              backgroundColor: themeStyle.COLOR_GREY,
              alignSelf: 'center',
            }}
          />
        )}
        {props.loading ? (
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
              <View style={{width: SCREEN_WIDTH * 0.75}}></View>
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
                marginHorizontal: props.prof ? 0 : '5%',
                marginVertical: '-2%',
                alignItems: 'center',
                justifyContent: props.prof ? 'center' : 'space-between',
              }}
            >
              <Text
                style={{
                  color: themeStyle.COLOR_BLACK_LIGHT,
                  fontFamily: themeStyle.FONT_BOLD,
                  fontSize: 20,
                  marginBottom: 15,
                }}
              >
                {props.title
                  ? 'Add Job Title'
                  : props.dept
                  ? 'Add Department'
                  : props.prof
                  ? 'Select Profession'
                  : props.country
                  ? 'Add Country'
                  : props.city
                  ? 'Add City'
                  : props.lang
                  ? 'Add your Language'
                  : 'not found'}
              </Text>
            </View>
            <View style={{height: '100%', width: '100%'}}>
              {props.prof == false && (
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
              )}

              <View style={{height: '85%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={props.data}
                  ItemSeparatorComponent={VerticalSpacer}
                  renderItem={({item, index}) => renderItems(item, index)}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.5,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyle: {
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
  },
});
export default DropDownModal;
