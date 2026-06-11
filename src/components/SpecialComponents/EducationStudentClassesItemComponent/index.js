import moment from 'moment';
import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from '../..';
import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';

import styles from './style';

const JobsBrowserModeItem = props => {
  const {
    item,
    navigation,
    locum,
    applied,
    token,
    cme,
    showAlert,
    showAlertFunc,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                item.teacher?.image != ''
                  ? item.teacher?.image
                  : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={50}
          />
          {HorizontalSpacer()}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.textStyle}>{item?.teacher?.username}</Text>
            <Text style={styles.blackText}>
              {moment(item.start_date).format('DD MMMM')}
              {item.start_time
                ? ` at ${moment(item.start_time, 'HH:mm').format('hh:mm A')}`
                : ''}
            </Text>
          </View>
        </View>
        <View style={[styles.rowStyle, {marginBottom: '1%'}]}></View>
      </View>
      <View style={[styles.rowContainer, {marginTop: '5%'}]}>
        <View style={{width: SCREEN_WIDTH * 0.5}}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textStyle}>
            {item.subject}{' '}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[styles.blackText, {marginTop: '2%'}]}>
            {item.description}{' '}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.textStyle}>
            {item?.class_type == 'Paid' ? `USD ${item?.price}` : 'Free'}{' '}
          </Text>
          <TouchableOpacity
            disabled={cme ? true : false}
            onPress={() => {
              showAlert
                ? showAlertFunc()
                : navigation.navigate(route.EDUCATION, {
                    screen: route.EDUCATIONSTUDENTCLASSDETAIL,
                    params: {item, token},
                  });
            }}
            style={styles.btnContainer1}>
            <Text style={styles.blackText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.rowContainer, {marginTop: '1%'}]}>
        <View></View>
      </View>
    </View>
  );
};

export default JobsBrowserModeItem;
