import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HyperLink from 'react-native-hyperlink';
import Modal from 'react-native-modal';

import themeStyle from '../../../assets/styles/theme.style';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import Icon from '../../Icon';

const AnouncementModal = props => {
  // const [saved, setSaved] = React.useState(props.saved);

  // const toggleSaved = () => {
  //   setSaved(!saved);
  // };

  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={400}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity disabled={true} style={styles.itemContainer}>
          <ImageBackground source={{uri: props?.img}} style={styles.imageStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.onSave();
                }}
                style={styles.bookmarkIcon}
              >
                <Icon.Ionicons
                  name={props.saved ? 'bookmark' : 'bookmark-outline'}
                  size={23}
                  color={themeStyle.COLOR_WHITE}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'flex-end', padding: '5%'}}>
                <TouchableOpacity
                  style={styles.crossIcon}
                  onPress={() => props.confirm()}
                >
                  <Icon.AntDesign
                    name="close"
                    size={20}
                    color={themeStyle.COLOR_BLACK}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.lowerContainer}>
            {props?.text?.includes('http://') ||
            props?.text?.includes('https://') ? (
              <HyperLink
                linkStyle={styles.blueText}
                onPress={(url, text) => {
                  props.confirm();
                  props.navigation.navigate(route.VIEWURL, {url: url});
                }}
              >
                <Text
                  style={{...styles.blackText, color: themeStyle.COLOR_BLACK}}
                >
                  {props?.text}
                </Text>
              </HyperLink>
            ) : (
              <Text style={props?.public ? styles.blackText : styles.grayText}>
                {props?.text ? props?.text : '.....'}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer1: {
    marginTop: '5%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  greenbtn: {
    backgroundColor: themeStyle.COLOR_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  redBtn: {
    backgroundColor: themeStyle.COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
  },
  whiteText: {
    fontSize: 15,
    fontFamily: themeStyle.FONT_REGULAR,
    color: 'white',
  },
  modalBackgroundContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '10%',
    width: SCREEN_WIDTH * 0.9,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  colorText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.BAR_COLOR,
  },
  blackText: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
  },
  headingText: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 22,
    marginHorizontal: '5%',
    color: '#959FAE',
    textAlign: 'center',
  },
  headingText2: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    marginHorizontal: '5%',
    color: themeStyle.COLOR_WHITE,
    textAlign: 'center',
    marginBottom: '5%',
  },
  itemContainer: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    width: SCREEN_WIDTH * 0.9,
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.45,
    width: '100%',
    backgroundColor: themeStyle.WHITE_SMOKE,
  },
  rowStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerContainer: {
    padding: 14,
    marginLeft: 2,
    marginBottom: '2%',
  },
  grayText: {
    fontSize: 16,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  blackText: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'left',
    paddingHorizontal: '2.5%',
  },
  blueText: {
    fontSize: 14,
    color: 'blue',
    fontFamily: themeStyle.FONT_REGULAR,
    textDecorationLine: 'underline',
  },
  crossIcon: {
    padding: 7,
    elevation: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 30,
  },
  bookmarkIcon: {
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 6,
    marginLeft: 15,
    backgroundColor: themeStyle.CARRER_PRIMARY,
    justifyContent: 'center',
  },
});

export default AnouncementModal;
