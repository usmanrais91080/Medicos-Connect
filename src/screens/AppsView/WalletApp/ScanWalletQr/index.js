import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './style';
import {connect} from 'react-redux';
import {
  Button,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  Loader,
} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import {WalletServices} from '../../../../services';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {VerticalSpacer} from '../../../../lib/utils/global';

class ScanWalletQr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: true,
      pin: '',
      amount: '',
      alertModal: false,
      msgToDisplay: '',
      result: null,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
    });
    // this.activeQR()
  };

  headerLeft = () => {
    return <HeaderLeft navigation={this.props.navigation} color={'#FFFFFF'} />;
  };
  onSuccess = e => {
    this.setState({
      result: e,
      scan: false,
      loading: false,
      ScanResult: false,
    });
    const check = e.data;
    if (check == this.props.user.userData._id) {
      this.setState({
        alertModal: true,
        msgToDisplay: 'Cannot send ampules to your own account.',
        scan: true,
      });
    } else {
      this.setState({pin: check, ScanResult: true, scan: false});
      // this.props.navigation.navigate(route.SOCIAL, { screen: route.SOCIALPROFILE,params: { data: check}, })
    }
    // this.setState({
    //     result: e,
    //     scan: false,
    //     ScanResult: true
    // })
    // if (check === 'http') {
    //     Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    // } else {
    //     this.setState({
    //         result: e,
    //         scan: false,
    //         ScanResult: true
    //     })
    // }
  };
  activeQR = () => {
    this.setState({scan: true});
  };
  scanAgain = () => {
    this.setState({scan: true, ScanResult: false});
  };
  handleContinue = () => {
    const {pin, amount} = this.state;
    if (amount.length && pin.length) {
      if (amount.includes('.') || amount.includes('-')) {
        this.setState({
          alertModal: true,
          msgToDisplay: 'Invalid amount entered.',
          loading: false,
          ScanResult: true,
        });
      } else {
        let data = {
          receiver_id: pin,
          ampules: amount,
        };
        WalletServices.sendAmpules(data, this.props.user.userData.token)
          .then(res => {
            if (res?.data?.message == 'Insufficent Ampules') {
              this.setState({
                alertModal: true,
                msgToDisplay: 'Entered amount exceeds account balance.',
                loading: false,
                ScanResult: true,
              });
            } else {
              // alert('Ampules gift send successfully!')
              this.props.authActions.getUserProfile(
                {token: this.props.user.userData.token},
                '',
                '',
              );
              this.setState({loading: false, scan: true});
              this.props.navigation.goBack();
            }
          })
          .catch(error => {
            this.setState({
              loading: false,
              ScanResult: true,
              alertModal: true,
              msgToDisplay: 'Oh, shoot! Try again',
            });
          });
      }
    } else {
      this.setState({
        alertModal: true,
        msgToDisplay: 'Please fill all fields.',
        loading: false,
        ScanResult: true,
      });
    }
  };
  render() {
    const {
      scan,
      ScanResult,
      result,
      loading,
      pin,
      amount,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          {/* <View style={styles.header}>
                        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                        <Icon.AntDesign name="camera" size={30} />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Scan QR Code</Text>
                    </View> */}
          {ScanResult && (
            <View style={styles.cardView}>
              <Text style={styles.desc1}>Enter address of reciever</Text>
              <View style={styles.inputConttainer}>
                <Input
                  wallet
                  secureTextEntry={true}
                  inputContainerStyle={{...styles.inputContainerStyle1}}
                  value={pin}
                  placeholder=""
                  onChangeText={job => this.setState({pin: job})}
                />
              </View>
              <Text style={styles.desc1}>Enter amount to send</Text>
              <View style={styles.inputConttainer}>
                <Input
                  wallet
                  keyboardType="numeric"
                  value={amount}
                  placeholder=""
                  onChangeText={job => this.setState({amount: job})}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  customColor={themeStyle.BOOK_KEEPING_PINK}
                  title={'Send Ampules'}
                  onPress={() => {
                    this.setState({loading: true, ScanResult: false}, () =>
                      this.handleContinue(),
                    );
                    // this.handleContinue()
                  }}
                />
                {VerticalSpacer()}
                <Button
                  customColor={themeStyle.BOOK_KEEPING_PINK}
                  title={'Scan QR Code'}
                  onPress={() => {
                    this.setState({ScanResult: false, scan: true});
                    // this.handleContinue()
                  }}
                />
              </View>
            </View>
          )}
          {loading && (
            <Fragment>
              <Loader />
              {/* <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Icon.Ionicons name="scan" size={30} />
                                        <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
            </Fragment>
          )}
          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  Please move your camera {'\n'} over the QR Code
                </Text>
              }
              bottomContent={
                <View style={styles.bottomContent}>
                  <TouchableOpacity
                    style={styles.buttonScan2}
                    onPress={() =>
                      this.setState({scan: false, ScanResult: true})
                    }>
                    {/* <Icon.Ionicons name="scan" size={50} /> */}
                    <Text
                      style={{
                        color: themeStyle.COLOR_WHITE,
                        fontFamily: themeStyle.FONT_REGULAR,
                        fontSize: themeStyle.FONT_SIZE_MEDIUM,
                      }}>
                      Enter pin code
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </Fragment>
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
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScanWalletQr);
