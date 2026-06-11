import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {
  AuthenticationHeader,
  Icon,
  Input,
  Button,
} from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

const ConnectFilter = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => props.onClose()}
          style={{alignItems: 'center'}}>
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: themeStyle.FONT_REGULAR,
            color: 'gray',
          }}>
          Class filter
        </Text>
        <View style={{marginVertical: '5%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: themeStyle.FONT_REGULAR,
              color: 'gray',
            }}>
            Filter by
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: '2.5%',
              backgroundColor: '#E9E9E9',
              borderRadius: 35,
              height: 54,
            }}>
            <TouchableOpacity
              onPress={() => props.onAny()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.any ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.any ? 'white' : 'gray'}}>Any</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onWorkshops()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.workshops ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.workshops ? 'white' : 'gray'}}>
                Workshops
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onOneOnOne()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.oneOnOne ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.oneOnOne ? 'white' : 'gray'}}>
                1 on 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: '5%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: themeStyle.FONT_REGULAR,
              color: 'gray',
            }}>
            Sort by
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: '2.5%',
              backgroundColor: '#E9E9E9',
              borderRadius: 35,
              height: 54,
            }}>
            <TouchableOpacity
              onPress={() => props.onDefault()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.default ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.default ? 'white' : 'gray'}}>
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onLatest()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.latest ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.latest ? 'white' : 'gray'}}>
                Latest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onOldest()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.oldest ? '#99CC66' : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: props.oldest ? 'white' : 'gray'}}>
                Oldest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: '10%'}}>
          <Button parrot title="Set filters" onPress={() => props.onNext()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  sliderStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: 60,
    marginTop: '5%',
    bottom: 20,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConnectFilter;
