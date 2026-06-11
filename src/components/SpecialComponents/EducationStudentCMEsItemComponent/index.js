import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from '../..';
import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../lib/utils/global';

import styles from './style';
import themeStyle from '../../../assets/styles/theme.style';

const EducationStudentCMEsItemComponent = props => {
  const {item, navigation, token, cme, currency, showAlert, showAlertFunc} =
    props;

  return (
    <>
      {item?.conference_name ? (
        // Conference
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.rowStyle}>
              <View
                style={{
                  ...styles.rowContainer,
                  width: '100%',
                }}
              >
                <View style={[styles.rowStyle, {width: '50%'}]}>
                  <Text numberOfLines={1} style={styles.conferenceName}>
                    {item?.conference_name}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.textStyle1}>Conference</Text>
                </View>
              </View>
            </View>
          </View>
          {item?.sponsor_logo?.length > 0 ? (
            <View style={styles.rowStyle}>
              {item?.sponsor_logo?.map((sponsor, index) => (
                <Image
                  source={{
                    uri: sponsor?.location,
                  }}
                  style={styles.sponsorLogo}
                />
              ))}
            </View>
          ) : null}

          <View style={[styles.rowContainer, {marginTop: 5}]}>
            <View style={{width: '100%'}}>
              <View style={styles.rowStyle}>
                <Icon.FontAwesome6
                  name={'user'}
                  size={14}
                  color={themeStyle.EDUCATION_BROWN}
                />
                <Text style={styles.speaker}>Speaker</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.conferenceName}
                >
                  {item?.speaker_name}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.grayText}>Workshop</Text>
                  <Text style={styles.textStyle}>
                    {item?.price ? item.price : 'Free'}
                  </Text>
                </View>
              </View>
              {item.description ? (
                <>
                  <Text style={styles.description}>Description</Text>
                  <Text style={[styles.grayTextStyle1, {marginTop: 5}]}>
                    {item.description}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
          <View style={[styles.rowContainer, {marginTop: '4%'}]}>
            <Text style={styles.textStyle}>
              {moment(item.start_date).format('Do MMM YYYY')}
            </Text>
            <TouchableOpacity
              disabled={cme ? true : false}
              onPress={() => {
                showAlert
                  ? showAlertFunc()
                  : navigation.navigate(route.EDUCATIONSTUDENTWORKSHOPDETAIL, {
                      item,
                      token,
                    });
              }}
              style={styles.detailsButton}
            >
              <Text style={styles.blackText}>Details</Text>
              <Icon.FontAwesome6
                color={themeStyle.COLOR_BLACK}
                size={14}
                name={'arrow-right-long'}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // CME
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.rowStyle}>
              <View
                style={{
                  ...styles.rowContainer,
                  width: '100%',
                }}
              >
                <View style={[styles.rowStyle, {width: '75%'}]}>
                  <Text style={styles.conferenceName} numberOfLines={1}>
                    {item?.company.company_name}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text
                    style={{
                      ...styles.textStyle1,
                      textTransform: 'uppercase',
                    }}
                  >
                    CME
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {item?.sponsor_logo?.length > 0 ? (
            <View style={styles.rowStyle}>
              {item?.sponsor_logo?.map((sponsor, index) => (
                <Image
                  source={{
                    uri: sponsor?.location,
                  }}
                  style={styles.sponsorLogo}
                />
              ))}
            </View>
          ) : null}

          <View style={[styles.rowContainer, {marginTop: 5}]}>
            <View style={{width: '100%', marginTop: 10}}>
              <View style={styles.rowStyle}>
                <Icon.FontAwesome6
                  name={'user'}
                  size={14}
                  color={themeStyle.EDUCATION_BROWN}
                />
                <Text style={styles.speaker}>Speaker</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.conferenceName}
                >
                  {item?.speaker_name}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.grayText}>Workshop</Text>
                  <Text style={styles.textStyle}>
                    {item?.price ? item.price : 'Free'}
                  </Text>
                </View>
              </View>
              {item.description ? (
                <>
                  <Text style={styles.description}>Description</Text>
                  <Text style={[styles.grayTextStyle1, {marginTop: 5}]}>
                    {item.description}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
          <View style={[styles.rowContainer, {marginTop: '4%'}]}>
            <Text style={styles.textStyle}>
              {moment(item.created_at).format('Do MMM YYYY')}
            </Text>
            <TouchableOpacity
              disabled={cme ? true : false}
              onPress={() => {
                showAlert
                  ? showAlertFunc()
                  : navigation.navigate(route.EDUCATIONSTUDENTWORKSHOPDETAIL, {
                      item,
                      currency,
                      cme: item?.conference_name ? false : true,
                      token,
                    });
              }}
              style={styles.detailsButton}
            >
              <Text style={styles.blackText}>Details</Text>
              <Icon.FontAwesome6
                color={themeStyle.COLOR_BLACK}
                size={14}
                name={'arrow-right-long'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {false && (
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.rowStyle}>
              <Avatar
                source={{
                  uri:
                    item.company?.image != ''
                      ? item.company?.image
                      : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                }}
                rounded
                size={50}
              />
              {HorizontalSpacer()}
              <View style={{}}>
                <Text style={styles.textStyle1}>
                  {item?.speaker_name
                    ? item?.speaker_name
                    : item?.teacher?.username}
                </Text>
                <Text style={styles.textStyle}>
                  {moment(item.created_at).format('DD MMMM')} at{' '}
                  {moment(item.created_at).format('HH:MM a')}
                </Text>
              </View>
            </View>
            {/* <View style={[styles.rowStyle, { marginBottom: '10%' }]}></View> */}
          </View>
          <View style={[styles.rowContainer, {marginTop: '2.5%'}]}>
            <View style={{width: SCREEN_WIDTH * 0.5}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textStyle1}
              >
                {item.topic}{' '}
              </Text>
              <Text
                numberOfLines={3}
                style={[styles.grayTextStyle1, {marginTop: '2%'}]}
              >
                {item.description}{' '}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.textStyle2}>
                {item?.price == '00'
                  ? 'Free'
                  : `${item?.price || 0} ${currency}`}{' '}
              </Text>
            </View>
          </View>
          <View style={[styles.rowContainer, {marginTop: '1%'}]}>
            {/* <View></View> */}

            <TouchableOpacity
              // disabled={cme ? true : false}
              onPress={() => {
                showAlert
                  ? showAlertFunc()
                  : navigation.navigate(route.EDUCATIONSTUDENTWORKSHOPDETAIL, {
                      item,
                      currency,
                      cme: item?.conference_name ? false : true,
                      token,
                    });
              }}
              style={styles.btnContainer1}
            >
              <Text style={styles.blackText}>Read more</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* )} */}
    </>
  );
};

export default EducationStudentCMEsItemComponent;
