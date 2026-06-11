import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Icon } from '../..';
import { route } from '../../../lib/utils/constants';
import { HorizontalSpacer } from '../../../lib/utils/global';

import styles from './style';

const JobsPostModelItem = ({ item, navigation, locum, applied }) => {
  return (
    <TouchableOpacity
      disabled={true}
      onPress={() =>
        navigation.navigate(
          locum ? route.CAREERLOCUMDETAIL : route.CAREERJOBDETAIL,
        )
      }
      style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={50}
          />
          {HorizontalSpacer()}
          <View style={{ marginTop: '5%' }}>
            <Text style={styles.textStyle}>{item?.title?.name}</Text>
            <Text style={styles.grayTextStyle}>
              {moment(item.created_at).format('DD MMMM at HH:MM a ')}
            </Text>
          </View>
        </View>
        {/* <View style={[styles.rowStyle, { marginBottom: "10%" }]}>
                    <Icon.AntDesign name="star" size={15} color="#1DD1A1" />
                    <Icon.Entypo name="dots-three-vertical" size={15} color="gray" />
                </View> */}
      </View>
      <View style={[styles.rowContainer, { marginTop: '2.5%' }]}>
        <Text style={styles.grayText}></Text>
        {locum ? null : <Text style={styles.textStyle}>{item.salary} </Text>}
      </View>
      <View style={[styles.rowContainer, { marginTop: '1%' }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.grayTextStyle}>
            Experience:  {item.max_experience} years{' '}
          </Text>
          <Text style={styles.grayTextStyle}>{item.description} </Text>
        </View>
        <TouchableOpacity
          disabled={true}
          onPress={() => navigation.navigate(route.CAREERJOBDETAIL)}
          style={styles.btnContainer}>
          <Text style={styles.whiteText}>View Applicants</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default JobsPostModelItem;
