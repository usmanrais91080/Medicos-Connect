import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import Flag from '../../../../assets/svg/flag.svg';
import MapView, {Marker} from 'react-native-maps';
import {FlatList} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomMarker from '../../../../assets/svg/marker.svg';
import {SvgUri} from 'react-native-svg';

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
export const HelpLine = props => {
  const {visible, onClose, data, userLoc} = props;

  const _renderAdsItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: themeStyle.COLOR_WHITE,
          elevation: 2,
          borderRadius: 10,
          marginLeft: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {value?.flag != '' ? (
            <SvgUri
              uri={value?.flag}
              width={74}
              height={70}
              style={styles.helplineFlag}
            />
          ) : (
            <Flag />
          )}
          <View style={{marginTop: '1.5%', marginRight: 10}}>
            <Text
              style={{
                color: themeStyle.COLOR_BLACK,
                fontSize: 16,
                fontFamily: themeStyle.FONT_REGULAR,
              }}
            >
              {item?.name ? item?.name : 'HelpLine'}
            </Text>
            <Text
              style={{
                color: themeStyle.COLOR_BLACK,
                textAlign: 'center',
                fontFamily: themeStyle.FONT_REGULAR,
              }}
            >
              {item?.phone}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const [value, setValue] = useState(null);

  useEffect(() => {
    let address = userLoc?.address;
    address = address?.split(',');
    address = address[address?.length - 1];
    data?.map(item => {
      if (item?.country === address?.toLowerCase().trim()) {
        setValue(item);
      }
    });
  }, [userLoc, data]);

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      animationInTiming={800}
      animationOutTiming={100}
      style={{margin: 0, marginTop: -25}}
    >
      <View
        style={{
          ...styles.modalContainer,
          paddingVertical: '2%',
          backgroundColor: themeStyle.COLOR_WHITE,
        }}
      >
        <View
          style={{
            height: 2,
            width: 25,
            backgroundColor: themeStyle.COLOR_GREY,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
            width: SCREEN_WIDTH,
            backgroundColor: themeStyle.PURPLE_COLOR,
            height: 60,
            alignItems: 'center',
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={onClose}>
              <Icon.AntDesign
                name="arrowleft"
                size={25}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.textStyle,
                {
                  marginHorizontal: 10,
                  paddingLeft: '2.5%',
                },
              ]}
            >
              {'Helpline'}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: '5%',
            ...(Platform.OS !== 'android' && {
              zIndex: 1,
            }),
          }}
        >
          <DropDownPicker
            items={data}
            placeholder="Select Country"
            defaultValue={value?.country || data[0]?.country}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDownContainerStyle}
            globalTextStyle={{
              fontFamily: themeStyle.FONT_REGULAR,
              fontSize: 18,
              textAlign: 'center',
              paddingRight: 20,
              color: themeStyle.COLOR_BLACK_LIGHT,
              textTransform: 'capitalize',
            }}
            arrowStyle={styles.arrowStyle}
            dropDownStyle={styles.dropDownStyle}
            dropDownMaxHeight={SCREEN_HEIGHT * 0.4}
            arrowSize={20}
            customArrowDown={(size, color) => (
              <Icon.FontAwesome
                name="caret-down"
                color={'#959FAE'}
                size={size}
              />
            )}
            customArrowUp={(size, color) => (
              <Icon.FontAwesome name="caret-up" color={'#959FAE'} size={size} />
            )}
            itemStyle={{justifyContent: 'flex-start'}}
            onChangeItem={item => {
              setValue(item);
            }}
          />
        </View>

        <>
          <MapView
            style={[styles.imageStyle]}
            initialRegion={{
              latitude: value?.coordinates[0] || 37.78825,
              longitude: value?.coordinates[1] || -122.4324,
              latitudeDelta: 10,
              longitudeDelta: 10 * ASPECT_RATIO,
            }}
            region={{
              latitude:
                value?.coordinates.length > 0
                  ? value?.coordinates[0]
                  : 37.78825,
              longitude:
                value?.coordinates.length > 0
                  ? value?.coordinates[1]
                  : -122.4324,
              latitudeDelta: 10,
              longitudeDelta: 10 * ASPECT_RATIO,
            }}
            mapType="standard"
          >
            {value?.phones?.map((marker, index) => (
              <Marker
                coordinate={{
                  latitude: marker?.latitude,
                  longitude: marker?.longitude,
                }}
              >
                <CustomMarker />
              </Marker>
            ))}
          </MapView>
          <View
            style={{
              width: SCREEN_WIDTH,
              backgroundColor: themeStyle.COLOR_YELLOWISH,
              flex: 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginBottom: -20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 13,
                marginBottom: 16,
              }}
            >
              {value?.flag && (
                <SvgUri uri={value?.flag} width={40} height={40} />
              )}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: themeStyle.FONT_BOLD,
                  color: themeStyle.COLOR_BLACK,
                  marginLeft: 12,
                  textTransform: 'capitalize',
                }}
              >
                {value?.country}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
              }}
            >
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={value?.phones}
                renderItem={_renderAdsItem}
              />
            </View>
          </View>
        </>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_MENTAL,
    borderRadius: 10,
    padding: '4%',
    marginBottom: '1%',
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
    backgroundColor: '#99CC66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    marginTop: '2.5%',
    height: 30,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: '#99CC66',
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
  grayTextStyle1: {
    fontSize: 10,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK_LIGHT,
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
    fontSize: 22,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_WHITE,
  },
  modalContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT,
    backgroundColor: 'red',
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyleMenu: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '70%',
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontWeight: '700',
    // textDecorationLine: 'underline',
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_EXERCISE_BUTTON,
    marginBottom: '6%',
    height: 60,
    width: SCREEN_WIDTH * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyleDone: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_EXERCISE_BUTTON,
    marginTop: '30%',
    height: 45,
    width: SCREEN_WIDTH * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyle.COLOR_EXERCISE_BUTTON,
  },
  textCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.55,
    width: SCREEN_WIDTH,
    marginTop: -15,
  },
  arrowStyle: {
    position: 'absolute',
    right: 0,
  },
  dropDownStyle: {
    borderTopColor: 'gray',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  dropDownContainerStyle: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: themeStyle.ORANGE,
    alignItems: 'center',
  },
  helplineFlag: {
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: themeStyle.WHITE_SMOKE,
  },
  dropDownContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 40,
    ...(Platform.OS !== 'android' && {
      zIndex: 5,
    }),
    alignSelf: 'center',
  },
});
