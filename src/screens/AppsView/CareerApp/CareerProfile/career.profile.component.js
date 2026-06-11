import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from '../../../../components';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import { route, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import { HorizontalSpacer } from '../../../../lib/utils/global';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const HeaderRight = ({ onPress }) => {
  return (
    <View style={styles.headerRightContainer}>
      {/* <TouchableOpacity onPress={() => { }} ><QR /></TouchableOpacity> */}
      <TouchableOpacity onPress={() => onPress()} style={{ marginLeft: 15 }}>
        <Icon.Ionicons name="menu-sharp" size={30} color={themeStyle.COLOR_WHITE} />
      </TouchableOpacity>
    </View>
  );
};
export const JobsPostedItem = ({
  item,
  navigation,
  locum,
  applied,
  token,
  image,
}) => {
  return (
    <TouchableOpacity
      disabled={true}
      onPress={() =>
        navigation.navigate(route.CAREERJOBDETAIL, { jobId: item._id, token })
      }
      style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar source={{ uri: image }} rounded size={40} />
          {HorizontalSpacer()}
          <View>
            <Text style={styles.textStyle}>
              {item?.title?.name ? item?.title?.name : 'Doctor of Medicine'}
            </Text>
            <Text style={styles.grayTextStyle}>
              {moment(item.created_at).format('DD MMMM at HH:MM a ')}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.rowContainer, { marginTop: '0.5%' }]}>
        <Text style={styles.grayText}></Text>
        {locum ? null : <Text style={styles.textStyle}>{item?.salary} </Text>}
      </View>
      <View style={[styles.rowContainer, { marginTop: '1%' }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.grayTextStyle}>
            Number of applicants: {item?.applicants.length}
          </Text>
        </View>

        <TouchableOpacity
          disabled={item?.applicants.length > 0 ? false : true}
          onPress={() =>
            navigation.navigate(route.CAREERVIEWAPPLICANT, {
              jobId: item._id,
              token,
            })
          }
          style={styles.btnContainer1}>
          <Text style={styles.whiteText}>View Applicants</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export const UserData = ({ name, applliedJob, navigation, country, city }) => {
  return (
    <View style={{ ...styles.container, marginTop: '50%' }}>
      <View
        style={{
          ...styles.rowStyle,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View>
          <Text style={{ ...styles.textStyle, fontSize: 20 }}>{name}</Text>
          <Text
            style={{
              ...styles.textStyle,
              fontSize: 15,
              color: themeStyle.COLOR_GREY,
            }}>
            {city}, {country}
          </Text>
        </View>
        <View>
          <Menu style={{}}>
            <MenuTrigger>
              <Icon.Entypo
                name="dots-three-vertical"
                size={20}
                color={themeStyle.COLOR_GREY}
              />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                marginTop: 55,
                width: 150,
                marginVertical: 5,
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 20,
              }}>
              <MenuOption
                onSelect={() =>
                  navigation.navigate(route.CAREERSETTINGS, {
                    prev_screen: 'Profile',
                  })
                }>
                <View
                  style={{
                    width: 150,
                    alignItems: 'center',
                    borderColor: 'lightgray',
                    paddingVertical: '5%',
                  }}>
                  <Text style={styles.icon_text_style}>Career Settings</Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <View style={[styles.rowContainer, { marginTop: '0.5%' }]}>
        <Text style={styles.grayText}></Text>
        {/* {locum ? null : <Text style={styles.textStyle}>{item?.salary} </Text>} */}
      </View>
      <View style={[styles.rowContainer, { marginTop: '1%' }]}>
        <TouchableOpacity
          onPress={() => applliedJob()}
          style={styles.btnContainerCard}>
          <Text style={styles.whiteText}>Applied Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProfileDetails = ({ userProfile }) => {
  return (
    <View style={{ ...styles.container, marginTop: '25%' }}>
      <View
        style={{
          ...styles.rowStyle,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          paddingBottom: '2%',
        }}>
        <Text
          style={{
            ...styles.textStyle,
            fontSize: 25,
            fontFamily: themeStyle.FONT_REGULAR,
            color: themeStyle.COLOR_GREY,
          }}>
          {'Profile Details'}
        </Text>
        <View>
          <Icon.Ionicons
            name="ios-person-circle-outline"
            size={35}
            color={themeStyle.COLOR_GREY}
          />
        </View>
      </View>
      <View style={[styles.rowContainer, { marginTop: '1%' }]}>
        {userProfile?.workplaces != null && (
          <View style={styles.descContainer}>
            <Icon.FontAwesome5
              name="grip-lines-vertical"
              size={120}
              color={themeStyle.COLOR_GREY}
            />
            <View style={{ marginHorizontal: '2%' }}>
              {userProfile?.workplaces.length != 0 && (
                <Text
                  style={[
                    styles.descText,
                    { fontFamily: themeStyle.FONT_MEDIUM },
                  ]}>
                  {userProfile?.workplaces[0]?.title} at{' '}
                  {userProfile?.workplaces[0]?.workplace}
                </Text>
              )}
              {userProfile?.job_experience != 0 && (
                <Text style={styles.descText}>
                  Experience:{' '}
                  <Text
                    style={[
                      styles.descText,
                      { fontFamily: themeStyle.FONT_MEDIUM },
                    ]}>
                    {userProfile?.job_experience} years
                  </Text>
                </Text>
              )}
              <Text style={styles.descText}>
                Language:{' '}
                <Text
                  style={[
                    styles.descText,
                    { fontFamily: themeStyle.FONT_MEDIUM },
                  ]}>
                  {userProfile?.languages.length > 0
                    ? userProfile?.languages[0]?.language?.name
                    : ''}
                </Text>
              </Text>
              <Text style={styles.descText}>
                Education:{' '}
                <Text
                  style={[
                    styles.descText,
                    { fontFamily: themeStyle.FONT_MEDIUM },
                  ]}>
                  {userProfile?.certificates.toString().replace(/,/g, ' ')}
                </Text>
              </Text>
              <Text style={styles.descText}>
                Awards:{' '}
                <Text
                  style={[
                    styles.descText,
                    { fontFamily: themeStyle.FONT_MEDIUM },
                  ]}>
                  {userProfile?.achievements.toString().replace(/,/g, ' ')}
                </Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export const IconButton = ({ navigation }) => {
  return (
    <View style={styles.btnPrimary}>
      <View>
        <Menu style={{}}>
          <MenuTrigger>
            <Icon.Entypo name="dots-three-vertical" size={30} color={'white'} />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              marginTop: 55,
              width: 150,
              marginVertical: 5,
              alignItems: 'center',
              borderRadius: 10,
              marginBottom: 20,
            }}>
            {/* <MenuOption onSelect={() =>navigation.navigate(route.CAREERJOBAPPLIED)}>
                            <View style={{ width: 150, alignItems: 'center', paddingTop: "5%" }}>
                                <Text style={styles.icon_text_style}>Applied Jobs</Text>
                            </View>
                        </MenuOption> */}
            <MenuOption
              onSelect={() =>
                navigation.navigate(route.CAREERSETTINGS, {
                  prev_screen: 'Profile',
                })
              }>
              <View
                style={{
                  width: 150,
                  alignItems: 'center',
                  borderColor: 'lightgray',
                  paddingVertical: '5%',
                }}>
                <Text style={styles.icon_text_style}>Career Settings</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export const TextButton = ({ navigation }) => {
  return (
    <View style={styles.btnPrimary}>
      <TouchableOpacity disabled={true} style={styles.btnContainer2}>
        <Text style={styles.colorText}>Search Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 20,
    padding: '5%',
    marginVertical: '2%',
    marginHorizontal: '5%',
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
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainerCard: {
    marginTop: '2.5%',
    flexDirection: 'row',
    height: 37,
    width: '100%',
    backgroundColor: '#1DD1A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#38474F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  grayTextStyle: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  grayText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  whiteText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
  },
  colorText: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#1DD1A1',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: '#313131',
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  icon_text_style: {
    color: themeStyle.BUTTON_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  btnPrimary: {
    height: 51,
    borderRadius: 12,
    backgroundColor: '#1DD1A1',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: 2,
  },
  btnPrimaryText: {
    fontSize: 18,
    color: 'white',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  descContainer: {
    flexDirection: 'row',
    // paddingHorizontal: '5%',
    // paddingVertical: '2.5%',
    // borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    // borderColor: 'lightgray',
  },
  descText: {
    color: themeStyle.COLOR_GREY,
    fontSize: 12,
    marginTop: 5,
    fontFamily: themeStyle.FONT_MEDIUM,
  },
});
