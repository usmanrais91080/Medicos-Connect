import React, {useEffect, useState} from 'react';
import {useStripe, usePlatformPay} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Alert,
} from 'react-native';
import {Icon, Container, DeleteModal} from '../../../components';
import style from './style';
import Info from './Information';
import Modal from 'react-native-modalbox';
import themeStyle from '../../../assets/styles/theme.style';
import {Card} from 'react-native-paper';
import moment from 'moment';
import {authActions} from '../../../redux/actions/auth';
import {bottomTabActions} from '../../../redux/actions/bottomTab';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_BOOK_KEEPING,
  iconColor: themeStyle.COLOR_WHITE,
};
const Wallet = props => {
  const stripe = useStripe();
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [transactionModal, setTransactionModal] = useState(false);
  const {isPlatformPaySupported, createPlatformPayPaymentMethod} =
    usePlatformPay();
  const [errorModal, setErrorModal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const _showTransaction = data => {
    setHistory(data);
    setTransactionModal(true);
  };
  const checkGooglePay = async () => {
    if (!(await isPlatformPaySupported({googlePay: {testEnv: false}}))) {
      setErrorModal(true);
      setErrorMessage('Google Pay is not supported.');
      return;
    }
  };
  useEffect(() => {
    checkGooglePay();
    props.bottomTabAction.bottomTabTheme(colorTheme);
  }, []);

  return (
    <Container>
      {/* Top Tab Bar */}
      {/* <TabSwitch tabSet={this.tabVal} /> */}
      {/* Main Container */}
      {/* {tabsSwitch ? <Info show={this._showTransaction} nav={this.props.navigation} /> : <Transaction />} */}
      {/* <GooglePayButton
        type="pay"
        // onPress={() => props?.google ? props?.google : {}}
        style={{
          width: '50%',
          height: 51,
          alignSelf: 'center'
          // backgroundColor: "red"
        }}
      /> */}
      <Info
        show={_showTransaction}
        nav={navigation}
        stripe={stripe}
        google={createPlatformPayPaymentMethod}
      />
      <Modal
        backdropOpacity={0.1}
        style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        swipeToClose={false}
        backdrop={false}
        isOpen={transactionModal}
        backdropColor="">
        <View style={{alignItems: 'center', marginTop: '2.5%'}}>
          <Icon.Ionicons
            onPress={() => setTransactionModal(false)}
            style={style.iconStyleCardLeft}
            name="chevron-down"
            size={30}
            color={themeStyle.PRIMARY_TINT_COLOR}
          />
        </View>
        <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
          {history.map((val, ind) => {
            return (
              <View key={ind} style={style.cardContainer}>
                <Card>
                  <Card.Content>
                    <View style={style.cardSingle}>
                      {/* Card Left Side */}
                      <View style={style.cardSingle}>
                        {/* Card Logo */}
                        <View>
                          <Image
                            style={style.imageIcon}
                            source={require('../../../assets/card_images/card_send.png')}
                          />
                        </View>

                        {/* Card Detail 1*/}
                        <View style={style.cardTextContainerLeft}>
                          <Text style={style.cardTextPrimary_1}>
                            {val.type}
                          </Text>
                        </View>
                      </View>

                      {/* Card Right Side */}
                      <View style={style.cardSingle}>
                        {/* Card Detail 2*/}
                        <View style={style.cardTextContainerRight}>
                          <Text style={style.cardTextSecondaryRight}>
                            {val.ampules} ampules
                          </Text>
                          <Text style={style.cardTextSecondaryRight}>
                            {moment(val.created_at).format('ll')}
                          </Text>
                        </View>

                        {/* Forward Logo */}
                        <View>
                          <Icon.Ionicons
                            style={style.iconStyleCardLeft}
                            name="chevron-forward"
                            size={30}
                            color={themeStyle.PRIMARY_TINT_COLOR}
                          />
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            );
          })}
        </ScrollView>
      </Modal>
      <DeleteModal
        alert
        visible={errorModal}
        confirm={() => {
          setErrorModal(false);
        }}
        text={errorMessage}
      />
    </Container>
  );
};
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
