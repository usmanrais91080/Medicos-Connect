'use strict';
import moment from 'moment';
import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Container,
  DeleteModal,
  Icon,
  UploadingModal,
  Input,
} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Clipboard from '@react-native-clipboard/clipboard';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class GenerateWalletQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgToDisplay: '',
      alertModal: false,
      uploading: false,
    };
    this.viewShotRef = React.createRef();
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  saveQRCode = () => {
    this.svg.toDataURL(this.callback);
  };

  shareDummyImage = async () => {
    this.viewShotRef.current.capture().then(uri => {
      Share.open({url: uri});
    });
  };

  callback(dataURL) {
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    Share.open(shareImageBase64).catch(error => null);
  }
  copyToClipboard = id => {
    Clipboard.setString(id);
    this.setState({msgToDisplay: 'Copied to clipboard', alertModal: true});
  };
  render() {
    const {alertModal, msgToDisplay} = this.state;
    const {_id, type} = this.props.route.params;
    let logoFromFile = require('../../../../assets/images/profile_logo.jpg');
    let qrData = {
      user_id: _id,
      user_type: type,
    };
    return (
      <Container>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.79,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ViewShot
              ref={this.viewShotRef}
              options={{format: 'jpg', quality: 0.9}}>
              <View style={styles.modalBackgroundContainer}>
                <QRCode
                  //   color={themeStyle.COLOR_GREY}
                  value={_id}
                  logo={logoFromFile}
                  getRef={c => (this.svg = c)}
                  logoSize={SCREEN_WIDTH * 0.2}
                  size={SCREEN_WIDTH * 0.7}
                  logoBorderRadius={SCREEN_WIDTH * 0.1}
                />
              </View>
            </ViewShot>
          </View>
          <View></View>
          <View style={styles.btnContainer}>
            <Text style={styles.desc1}>Your Address</Text>
            <View style={styles.inputConttainer}>
              <Input
                rightIcon={
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => this.copyToClipboard(_id)}>
                    <Icon.Feather
                      name={'copy'}
                      size={24}
                      color={themeStyle.COLOR_BLACK}
                    />
                  </TouchableOpacity>
                }
                disabled={true}
                secureTextEntry={false}
                color
                value={_id}
                placeholder=""
              />
            </View>
            <TouchableOpacity
              onPress={() => this.shareDummyImage()}
              style={styles.btnPrimary}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon.EvilIcons
                  name={'share-apple'}
                  size={25}
                  color={themeStyle.COLOR_WHITE}
                />
                <Text style={styles.itemText2}>{'Share QR code'}</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() =>this.props.navigation.navigate(route.SCANQRCODE)} style={styles.btnPrimary}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon.MaterialCommunityIcons name={'qrcode-scan'} size={20} color={themeStyle.COLOR_WHITE} />
                        <Text style={styles.itemText2}>{'Scan QR code'}</Text>
                        </View>
                    </TouchableOpacity> */}
          </View>
          <UploadingModal visible={this.state.uploading} />
          <DeleteModal
            alert
            visible={alertModal}
            confirm={() => {
              this.setState({alertModal: false});
            }}
            text={msgToDisplay}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  instructions: {
    color: 'white',
  },
  modalBackgroundContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '10%',
    width: SCREEN_WIDTH * 0.9,
  },
  btnContainer: {
    // flex:0.25,
    marginHorizontal: '5%',
    // marginTop:SCREEN_HEIGHT*0.17
  },
  itemText2: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_WHITE,
    marginLeft: '2%',
  },
  btnPrimary: {
    height: 51,
    borderRadius: 12,
    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
    marginTop: '2.5%',
    paddingHorizontal: '10%',
  },
  desc1: {
    marginLeft: '2%',
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    width: '100%',
    marginLeft: '2.5%',
    paddingVertical: '2%',
  },
  inputConttainer: {
    marginTop: '2.5%',
    width: '100%',
    // backgroundColor: themeStyle.COLOR_WHITE,
    // borderRadius: 10,
  },
  eyeIcon: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

export default connect(mapStateToProps)(GenerateWalletQR);
