import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import style from './style';
import {MultipleCard_Wallet_Trans} from './info.component';
import {Button_Group_Transaction} from './info.component';
import themeStyle from '../../../../assets/styles/theme.style';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authActions} from '../../../../redux/actions/auth';
import {ProfileServices, WalletServices} from '../../../../services';
import {Loader, DeleteModal} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {PieChart} from 'react-native-gifted-charts';
import {Avatar} from 'react-native-elements';
import {BASE_URL} from '../../../../enviroments';
import {BottomMenuWallet} from '../BottomMenuWallet';
import {
  confirmPlatformPayPayment,
  isPlatformPaySupported,
  PlatformPay,
} from '@stripe/stripe-react-native';

const moduleColor = {
  Social: '#0ABDE3',
  Connect: '#99CC66',
  Education: '#FF6B6B',
  Career: '#1DD1A1',
  Classified: '#FF9966',
  Wallet: '#D93231',
  Games: '#FF6B6B',
};

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionModal: false,
      alertModal: false,
      msgToDisplay: 'No transaction history to show',
      transacHistory: [],
      loading: false,
      packages: [],
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      walletModal: false,
      alertModal: false,
      msgToDisplay: '',
      paymentModal: false,
      packageId: '',
      moduleTransaction: [],
    };
  }
  componentDidMount = async () => {
    this._getTransactions();
    const value = await isPlatformPaySupported();
    this.setState({isApplePaySupported: value});
    this.focusListener = this.props.nav.addListener('focus', () => {
      this._getTransactions();
    });
  };

  showNewUserAlertFunction = () => {
    this.setState({
      alertModal: true,
      msgToDisplay:
        'In order to utilize these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.',
    });
  };

  _getTransactions = () => {
    const {token} = this.props.user.userData;
    WalletServices.getPackages(token)
      .then(res => {
        this.setState({loading: false, packages: res.data.data}, () =>
          this._getHistory(),
        );
      })
      .catch(err => {
        this.setState({loading: false});
      });
    ProfileServices.getTransactionsModule(token).then(res => {
      this.setState({
        moduleTransaction: res.data?.data?.transactions_count?.map(item => {
          return {
            value: item.value || 1,
            color: moduleColor[item.module],
            module: item.module,
          };
        }),
      });
    });
  };
  pay = async () => {
    this.setState({paymentModal: false, loading: true});
    let temp = {
      items: [
        {
          id: this.state.packageId,
        },
      ],
    };
    const response = await fetch(`${BASE_URL}stripe/create-payment-intent`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok)
      return this.setState({loading: false}, () => Alert.alert(data.message));
    const clientSecret = data.clientSecret;
    const {error, paymentIntent} = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          cartItems: [
            {
              label: 'For Amplues in app purchase',
              amount: this.state.price,
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
        applePay: {
          cartItems: [
            {
              label: 'For Amplues in app purchase',
              amount: this.state.price,
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      },
    );
    if (error) {
      // handle error
      this.setState({paymentModal: false, loading: false});
    } else {
      let temp2 = {
        package_id: this.state.packageId,
      };
      WalletServices.stripePayment(temp2, this.props.user.userData.token)
        .then(async res => {
          await this.props.authActions.getUserProfile(
            {token: this.props.user.userData.token},
            '',
            '',
          );
          Alert.alert('Success', 'Check the logs for payment intent details.');
          this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  };
  _getHistory = () => {
    WalletServices.getTransactions(this.props.user.userData.token)
      .then(res => {
        this.setState({loading: false, transacHistory: res.data.data});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  _createPayment = () => {
    this.setState({paymentModal: false, loading: true});
    fetch(
      `${BASE_URL}paypal/payment/${this.state.packageId}/${this.props.user.userData._id}`,
    )
      .then(res => res)
      .then(response => {
        this.setState({loading: false});
        this.props.nav.navigate(route.VIEWURL, {url: response.url});
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };

  _stripePayment = async () => {
    const {stripe} = this.props;

    this.setState({paymentModal: false, loading: true});
    try {
      // sending request
      let temp = {
        items: [
          {
            id: this.state.packageId,
          },
        ],
      };
      const response = await fetch(`${BASE_URL}stripe/create-payment-intent`, {
        method: 'POST',
        body: JSON.stringify(temp),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok)
        return this.setState({loading: false}, () => Alert.alert(data.message));
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: false, // use test environment
        },
        applePay: {
          testEnv: false,
          merchantCountryCode: 'US',
        },
        testEnv: false,
        merchantDisplayName: 'Medicos Connect',
      });

      if (initSheet?.error)
        return this.setState({loading: false}, () =>
          alert(`${initSheet.error.message}`),
        );

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });

      if (presentSheet?.error)
        return this.setState({loading: false}, () =>
          alert(`${presentSheet.error.message}`),
        );
      // Alert.alert('Payment complete, thank you!');
      let temp2 = {
        package_id: this.state.packageId,
      };
      WalletServices.stripePayment(temp2, this.props.user.userData.token)
        .then(res => {
          this.props.authActions.getUserProfile(
            {token: this.props.user.userData.token},
            '',
            '',
          );
          this.setState({loading: false});
        })
        .catch(err => {
          this.setState({loading: false});
        });
    } catch (err) {
      Alert.alert('Something went wrong, try again later!');
    }
  };

  _openPaymentModal = (p_id, price) => {
    this.setState({packageId: p_id, paymentModal: true, price: price});
  };

  _googlePayment = async () => {
    const {google} = this.props;
    this.setState({paymentModal: false, loading: true});
    try {
      const {error, paymentMethod} = await google({
        amount: this.state.price,
        currencyCode: 'USD',
      });

      if (error) {
        this.setState({loading: false});
        return;
      } else if (paymentMethod) {
        this.setState({loading: false});
        Alert.alert(
          'Success',
          `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`,
        );
      }
    } catch (error) {}
  };

  renderLegend = (text, color) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 12,
          alignItems: 'center',
          width: '25%',
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            marginRight: 10,
            borderRadius: 2,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{color: themeStyle.PRIMARY_TINT_COLOR, fontSize: 10}}>
          {text || ''}
        </Text>
      </View>
    );
  };

  setWalletModal = () => {
    this.setState({paymentModal: true});
  };
  render() {
    const {
      packages,
      loading,
      transacHistory,
      alertModal,
      msgToDisplay,
      paymentModal,
      moduleTransaction,
    } = this.state;
    return (
      <View style={style.container}>
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <Button_Group_Transaction
            send={() =>
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.props.nav.navigate(route.SCANWALLETQR)
            }
            recieve={() =>
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.props.nav.navigate(route.GENERATEWALLETQR, {
                    _id: this.props.user.userData._id,
                    type: 'Wallet',
                  })
            }
          />

          <View style={[style.btnGroup, {marginTop: '5%'}]}>
            <Text style={[style.btnText]}>{'Ampules'}</Text>
            <Text style={[style.btnText2]}>
              {this.props.user?.userData?.ampules}
            </Text>
          </View>
          {/* <View style={style.bottomBar} /> */}
          {/* <SingleCard_Wallet /> */}
          {(packages.length == 0) | loading ? (
            <View style={{height: SCREEN_HEIGHT * 0.4}}>
              <Loader />
            </View>
          ) : (
            <MultipleCard_Wallet_Trans
              // walletModal={this.setWalletModal}
              listData={packages}
              transac={this._openPaymentModal}
              showAlert={this.state.unverifiedUser}
              showAlertFunc={this.showNewUserAlertFunction}
            />
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: SCREEN_WIDTH,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              {this.renderLegend('Social', '#0ABDE3')}
              {this.renderLegend('Education', '#FF6B6B')}
              {this.renderLegend('Connect', '#99CC66')}
            </View>
            <PieChart
              donut
              // showText
              textColor="black"
              radius={100}
              textSize={15}
              showTextBackground
              strokeWidth={5}
              strokeColor={themeStyle.PRIMARY_BACKGROUND_COLOR}
              textBackgroundRadius={20}
              data={moduleTransaction}
              centerLabelComponent={() => {
                return (
                  <Avatar
                    source={require('../../../../assets/images/profile_logo.jpg')}
                    rounded
                    size={60}
                  />
                );
              }}
            />

            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              {this.renderLegend('Career', '#1DD1A1')}
              {this.renderLegend('Market', '#FF9966')}
              {this.renderLegend('Wallet', '#D93231')}
            </View>
          </View>

          <TouchableOpacity
            style={{
              ...style.btn_1,
              backgroundColor: '#FF9D9D',
              borderRadius: 6,
            }}
            onPress={() => {
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : transacHistory.length > 0
                ? this.props.show(transacHistory)
                : this.setState({
                    msgToDisplay: 'No transaction history to show',
                    alertModal: true,
                  });
            }}>
            <Text style={style.btnText_1}>{'Transactions'}</Text>
          </TouchableOpacity>
        </ScrollView>

        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
        <BottomMenuWallet
          visible={paymentModal}
          _applePayment={() => {
            this.pay();
          }}
          _createPayment={() => {
            this._createPayment();
          }}
          _googlePayment={() => this._googlePayment()}
          _stripePayment={() => {
            this._stripePayment();
          }}
          onClose={() => this.setState({paymentModal: false})}
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
export default connect(mapStateToProps, mapDispatchToProps)(Info);
