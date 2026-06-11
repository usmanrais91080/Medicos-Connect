import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';

import styles from './style';

const JobsBrowserModeItem = props => {
  const {
    item,
    navigation,
    teacher,
    coach,
    token,
    img,
    userName,
    showAlert,
    showAlertFunc,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri: item?.student?.image
                ? item?.student?.image
                : img != ''
                ? img
                : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={50}
          />
          {HorizontalSpacer()}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.textStyle}>
              {item?.student?.username ? item?.student?.username : userName}
            </Text>
            <Text style={styles.blackText}>
              {moment(item.start_date || item.end_date).format('DD MMM')} at{' '}
              {moment(item.start_time, 'HH:mm').format('hh:mm A')}
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
            // disabled={cme ? true : false}
            onPress={() => {
              if (teacher) {
                showAlert
                  ? showAlertFunc()
                  : coach
                  ? navigation.navigate(route.EDUCATIONTEACHERMAKECLASS, {
                      token,
                      item,
                    })
                  : navigation.navigate(
                      route.EDUCATIONTEACHERYOURCLASSEDETAIL,
                      {classData: item, token, img, userName},
                    );
              } else {
                showAlert
                  ? showAlertFunc()
                  : navigation.navigate(route.EDUCATIONSTUDENTYOURCLASSEDETAIL);
              }
            }}
            style={styles.btnContainer1}>
            <Text style={styles.blackText}>Read more</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.rowContainer, {marginTop: '1%'}]}>
        <View></View>
      </View>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.rowContainer}>
    //     <View style={styles.rowStyle}>
    //       <View style={{marginTop: '0%'}}>
    //         <Text
    //           ellipsizeMode="tail"
    //           numberOfLines={1}
    //           style={styles.textStyle1}>
    //           {item?.topic}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    //   <View style={{marginTop: '0%'}}>
    //     {item?.subject != 'dummy' && (
    //       <Text ellipsizeMode="tail" numberOfLines={1} style={styles.grayText}>
    //         {item?.subject}
    //       </Text>
    //     )}
    //   </View>
    //   <View style={[styles.rowContainer, {marginTop: '1%'}]}>
    //     <View>
    //       <Text style={styles.grayText}>{'Details:'} </Text>
    //       <Text
    //         ellipsizeMode="tail"
    //         numberOfLines={3}
    //         style={styles.grayTextStyle1}>
    //         {item.description}{' '}
    //       </Text>
    //     </View>
    //     <View>
    //       <View style={{alignItems: 'flex-end'}}>
    //         <Text style={styles.textStyle}>
    //           {coach
    //             ? moment(item?.created_at).format('ll')
    //             : moment(item?.start_date).format('ll')}{' '}
    //         </Text>
    //         <Text style={styles.textStyle}>
    //           {item?.class_type == 'Paid' ? `USD ${item?.price}` : 'Free'}
    //         </Text>
    //       </View>
    //       <TouchableOpacity
    //         onPress={() => {
    //           if (teacher) {
    //             showAlert
    //               ? showAlertFunc()
    //               : coach
    //               ? navigation.navigate(route.EDUCATIONTEACHERMAKECLASS, {
    //                   token,
    //                   item,
    //                 })
    //               : navigation.navigate(
    //                   route.EDUCATIONTEACHERYOURCLASSEDETAIL,
    //                   {classData: item, token, img, userName},
    //                 );
    //           } else {
    //             navigation.navigate(route.EDUCATIONSTUDENTYOURCLASSEDETAIL);
    //           }
    //         }}
    //         style={styles.btnContainer1}>
    //         <Text style={styles.blackText}>Details</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
};

export default JobsBrowserModeItem;
