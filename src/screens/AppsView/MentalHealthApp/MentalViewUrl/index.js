import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import style from './style';
import {DeleteModal, Icon} from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
const urlRegex = require('url-regex');

class ViewUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUri: '',
      data: null,
      alertModal: false,
      msgToDisplay: '',
    };
    this.webViewRef = React.createRef(null);
  }

  componentDidMount = async () => {
    const videoUri = await this.props.route.params.url;
    if (
      urlRegex().test(videoUri) ||
      videoUri.startsWith('https') ||
      videoUri.startsWith('http')
    ) {
      this.setState({videoUri});
    } else {
      this.setState({data: videoUri});
    }
  };
  handleWebViewNavigationStateChange = newNavState => {
    this.setState({videoUri: newNavState.url});
    const {url} = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://logrocket.com/';
      const redirectTo = 'window.location = "' + newURL + '"';
      // this.webview.injectJavaScript(redirectTo);
    }

    if (newNavState.title === 'success') {
      this.props.authActions.getUserProfile(
        {token: this.props.user.userData.token},
        '',
        '',
      );
      this.props.navigation.goBack();
    }
    if (newNavState.title === 'cancel') {
      this.props.navigation.goBack();
    }
    if (Platform.OS == 'ios') {
      if (url.includes('success')) {
        this.props.authActions.getUserProfile(
          {token: this.props.user.userData.token},
          '',
          '',
        );
        this.props.navigation.goBack();
        // props.goBack()
      }
      if (url.includes('cancel')) {
        // props.setVideoUri();
        this.props.navigation.goBack();
      }
    }
  };

  shareLink = () => {
    // Share.open({message: this.state.videoUri});
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      url: 'some share url',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999', // country code + phone number
      filename: 'test', // only for base64 file in Android
    };

    Share.open(shareOptions)
      .then(res => {})
      .catch(err => {
        // err && console.log(err);
      });
  };

  copyToClipboard = () => {
    Clipboard.setString(this.state.videoUri);
    this.setState({msgToDisplay: 'Copied to clipboard', alertModal: true});
  };

  render() {
    const {videoUri, data, alertModal, msgToDisplay} = this.state;

    return (
      <View style={Style.mainContainer}>
        <View style={style.topBar}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon.Ionicons
                name="close"
                size={30}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.webViewRef.current.goBack()}>
              <Icon.Ionicons
                name="arrow-back"
                size={30}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: SCREEN_WIDTH * 0.55}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{color: 'white'}}>
              {videoUri}
            </Text>
            {/* <TouchableOpacity onPress={()=>  this.webViewRef.current.goBack()}><Text numberOfLines={1} ellipsizeMode='tail' style={{color:'white'}}>{videoUri}</Text></TouchableOpacity> */}
          </View>
          <View>
            <TouchableOpacity onPress={() => this.copyToClipboard()}>
              <Icon.Ionicons
                name="clipboard"
                size={30}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
          </View>
          {/* <View>
                    <TouchableOpacity onPress={()=>  this.shareLink()}><Icon.Ionicons name="share-social" size={30} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>
                    </View> */}
        </View>
        {videoUri != '' && videoUri ? (
          <View style={Style.videoContainer}>
            <WebView
              ref={this.webViewRef}
              onNavigationStateChange={this.handleWebViewNavigationStateChange}
              style={{
                marginTop: Platform.OS == 'ios' ? 10 : 0,
                borderRadius: 5,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: videoUri}}
              onMessage={event => {}}
              allowFileAccess={true}
            />
          </View>
        ) : (
          <View style={Style.videoContainer}>
            <WebView
              style={{
                marginTop: Platform.OS == 'ios' ? 10 : 0,
                borderRadius: 5,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowFileAccess={true}
              source={{uri: data}}
              onMessage={event => {}}
              allowUniversalAccessFromFileURLs={true}
              allowFileAccessFromFileURLs={true}
            />
          </View>
        )}
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    // paymentActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewUrl);
