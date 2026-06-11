import React, {Component} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {Avatar} from 'react-native-elements';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {Button, ColorButton, HeaderLeft, Icon, QRModal} from '../../components';
import {route} from '../../lib/utils/constants';
import {HorizontalSpacer} from '../../lib/utils/global';
import themeStyle from '../../assets/styles/theme.style';
import {StatusBar} from 'react-native';
import {authActions} from '../../redux/actions/auth';
import {connectActions} from '../../redux/actions/connect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'http://facebook.github.io/react-native/',
      visible: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
    });
  };

  headerLeft = () => {
    return <HeaderLeft color navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({visible: true})}
        style={{marginRight: 15}}>
        <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={themeStyle.COLOR_WHITE} />

        <View style={{flex: 0.7, alignItems: 'center'}}>
          <View style={{marginTop: '5%'}}>
            <Text style={styles.textStyle}>
              Scan this code to add a follower
            </Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <QRCode
              //QR code value
              value={this.state.text ? this.state.text : 'NA'}
              //size of QR Code
              size={250}
              //Color of the QR Code (Optional)
              color="black"
              //Background Color of the QR Code (Optional)
              backgroundColor="white"
              //Logo of in the center of QR Code (Optional)
              // logo={{
              //     url:
              //         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
              // }}
              //Center Logo size  (Optional)
              logoSize={30}
              //Center Logo margin (Optional)
              logoMargin={2}
              //Center Logo radius (Optional)
              logoBorderRadius={15}
              //Center Logo background (Optional)
              logoBackgroundColor="yellow"
            />
          </View>

          <View style={styles.rowStyle}>
            <Avatar
              source={{
                uri: this.props.user.userData.image
                  ? this.props.user.userData.image
                  : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
              }}
              rounded
              size={40}
            />
            {HorizontalSpacer()}
            <View style={{}}>
              <Text style={styles.titleStyle}>
                {this.props.user.userData.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={{flex: 0.4, marginHorizontal: '5%', marginTop: '5%'}}>
          <View style={{marginTop: '10%', alignItems: 'center'}}>
            <Text style={styles.textStyle}>
              Add friends instantly by scanning QR Code
            </Text>
          </View>
          <Button
            title="Scan code"
            onPress={() => this.props.navigation.navigate(route.SCANQRCODE)}
            icon={
              <View style={{marginHorizontal: 10}}>
                <Icon.Ionicons name="scan" size={30} color="white" />
              </View>
            }
          />
        </View>
        <QRModal
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  titleStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 20,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 14,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  rowStyle: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    connectActions: bindActionCreators(connectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCode);
