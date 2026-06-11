import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {route} from '../../../lib/utils/constants';

import styles from './style';

const JobsBrowserModeItem = ({item, navigation, token}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textStyle}>
          {item?.subject || 'Subject'}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.grayTextStyle1}
        >
          {item?.description}{' '}
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTCLASSDETAIL,
              params: {
                item,
                token,
                fromUpcomingClasses: true,
                prevScreen: route.EDUCATIONSTUDENTCLASSDETAIL,
              },
            })
          }
          style={styles.btnContainer1}
        >
          <Text style={styles.blackText}>Details</Text>
        </TouchableOpacity>
        <Text style={styles.grayText}>
          {moment(item?.start_date).format('D MMMM')} {item.start_time}
        </Text>
      </View>
    </View>
  );
};

export default JobsBrowserModeItem;
