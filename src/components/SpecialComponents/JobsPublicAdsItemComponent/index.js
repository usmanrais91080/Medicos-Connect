import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {Avatar} from 'react-native-elements';
import {route} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';

import styles from './style';

const JobsPublicAdItem = props => {
  const {item, navigation, token, showAlert, showAlertFunc, showAd, disabled} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() =>
        showAlert
          ? showAlertFunc()
          : navigation.navigate(route.CAREERJOBDETAIL, {jobId: item._id, token})
      }
    >
      <Image
        resizeMode={'cover'}
        source={{
          uri: item?.image != '' ? item?.image : item?.company?.image,
        }}
        style={styles.image2Style}
      />
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.rowStyle}>
            <Avatar
              source={{
                uri:
                  item?.company?.image == ''
                    ? 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
                    : item?.company?.image,
              }}
              rounded
              size={42}
            />
            {HorizontalSpacer()}
            <View style={{}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textStyle}
              >
                {item?.company?.name}
              </Text>
              <Text style={styles.grayTextStyle}>
                {moment(item.created_at).format('D MMM')} at{' '}
                {moment(item.created_at).format('LT')}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{...styles.textStyle1, textAlign: 'right'}}>
              Last date
            </Text>
            <Text style={styles.textStyle1}>
              {moment(item?.end_date).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={[styles.rowContainer, {marginTop: 16}]}>
          <View style={{width: '55%'}}>
            <Text
              numberOfLines={2}
              style={{...styles.textStyle, marginTop: 16}}
            >
              {item?.description}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => (showAlert ? showAlertFunc() : showAd())}
            style={styles.btnContainer}
          >
            <Text style={styles.whiteText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobsPublicAdItem;
