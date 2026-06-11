import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from '../..';
import {route} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';

import styles from './style';
import themeStyle from '../../../assets/styles/theme.style';

const JobsBrowserModeItem = ({
  item,
  navigation,
  locum,
  dataToShow,
  token,
  showAlert,
  showAlertFunc,
  browseJobFav,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        showAlert
          ? showAlertFunc()
          : navigation.navigate(route.CAREERJOBDETAIL, {
              jobId: item?._id,
              token: token,
            })
      }
      style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                dataToShow?.image == ''
                  ? 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
                  : dataToShow?.image,
            }}
            rounded
            size={50}
          />
          {HorizontalSpacer()}
          <View style={{marginTop: '2%'}}>
            <Text style={styles.textStyle}>
              {item.posted_from == 'Company'
                ? dataToShow?.name
                : dataToShow?.username}
            </Text>
            <Text style={styles.grayTextStyle}>
              {moment(item?.created_at).format('DD MMMM')} at{' '}
              {moment(item?.created_at).format('hh:mm A')}
            </Text>
          </View>
          {HorizontalSpacer()}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => browseJobFav(item._id, index)}>
            <Icon.Ionicons
              name={item.is_favourite == true ? 'bookmark' : 'bookmark-outline'}
              size={27}
              color={themeStyle.COLOR_BLACK}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowStyle, {marginBottom: '10%'}]}></View>
      </View>
      <View style={[styles.rowContainer, {marginTop: '3.5%'}]}>
        <View style={{flex: 1}}>
          <Text style={styles.grayTextStyle}>
            Experience: {item?.experience} Year{item?.experience > 1 ? 's' : ''}
          </Text>
          {item?.title && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.grayTextStyle}>
              Profession: {item?.title?.name}{' '}
            </Text>
          )}
          <Text numberOfLines={2} style={styles.grayTextStyle}>
            {item.description}{' '}
          </Text>
        </View>
        {locum ? (
          <TouchableOpacity
            onPress={() =>
              showAlert
                ? showAlertFunc()
                : navigation.navigate(route.CAREERLOCUMDETAIL)
            }
            style={styles.btnContainer1}>
            <Text style={styles.whiteText}>Contact</Text>
            <View style={{width: 10}} />
            <Icon.FontAwesome name="caret-down" size={15} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              showAlert
                ? showAlertFunc()
                : navigation.navigate(route.CAREERJOBDETAIL, {
                    jobId: item?._id,
                    token: token,
                  })
            }
            style={styles.btnContainer}>
            <Text style={styles.whiteText}>Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default JobsBrowserModeItem;
