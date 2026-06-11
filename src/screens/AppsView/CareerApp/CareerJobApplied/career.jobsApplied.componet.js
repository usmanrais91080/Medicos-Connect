import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import {HorizontalSpacer} from '../../../../lib/utils/global';

const JobsAppliedItem = ({
  item,
  navigation,
  locum,
  token,
  dataToShow,
  applied,
}) => {
  return (
    <TouchableOpacity disabled style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                dataToShow?.image == ''
                  ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                  : dataToShow?.image,
            }}
            rounded
            size={40}
          />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.textStyle}>
              {item?.posted_from == 'Company'
                ? item?.company?.name
                : item?.user?.username}
            </Text>
            <Text style={styles.grayTextStyle}>
              {moment(item.created_at).format('DD MMMM at HH:MM a ')}
            </Text>
          </View>
        </View>
      </View>
      {item?.description ? (
        <Text style={{...styles.textStyle, marginBottom: -4, marginTop: 24}}>
          {item?.description}
        </Text>
      ) : null}
      <View style={[styles.rowContainer, {marginTop: 8}]}>
        <View style={{flex: 1}}>
          <Text style={styles.textStyle}>
            Experience: {item?.experience} years
          </Text>
          <Text style={{...styles.textStyle, marginTop: 8}} numberOfLines={1}>
            {item.profession}
          </Text>
        </View>
        <View>
          {locum ? null : (
            <Text
              style={{
                ...styles.textStyle,
                alignSelf: 'center',
                marginBottom: 3,
              }}>
              {item?.salary}
            </Text>
          )}
          {locum ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(route.CAREERLOCUMDETAIL)}
              style={styles.btnContainer1}>
              <Text style={styles.whiteText}>Contact</Text>
              <View style={{width: 10}} />
              <Icon.FontAwesome name="caret-down" size={15} color="white" />
            </TouchableOpacity>
          ) : applied ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(route.CAREERJOBDETAIL, {
                  jobId: item._id,
                  token,
                })
              }
              style={styles.btnContainer2}>
              <Text style={styles.textStyle}>Details</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(route.CAREERJOBDETAIL, {
                  jobId: item._id,
                  token,
                })
              }
              style={styles.btnContainer}>
              <Text style={styles.textStyle}>Details</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.WHITE_SMOKE,
    borderRadius: 10,
    padding: '5%',
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  grayTextStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    marginTop: 5,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  bin: {width: 35, height: 35, alignItems: 'flex-end'},
});
export default JobsAppliedItem;
