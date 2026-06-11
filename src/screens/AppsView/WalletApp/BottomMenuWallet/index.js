import React, { useState } from 'react';
import Modal from 'react-native-modal';
import DropDown from '../../../../assets/svg/dropDown.svg';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import Visa from '../../../../assets/svg/visa.svg';
import Paypal from '../../../../assets/svg/paypal.svg';
import Applepay from '../../../../assets/svg/apple-pay.svg';
import Googlepay from '../../../../assets/svg/gPay.svg';

import styles from './style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { HorizontalSpacer, VerticalSpacer } from '../../../../lib/utils/global';
import { Button } from '../../../../components';

const VerticalSpacerWallet = () => {
  return <View style={{ height: 2 }}></View>;
};

export const BottomMenuWallet = props => {
  const { visible, onClose, _applePayment, _createPayment, _googlePayment, _stripePayment } = props;
  const [visaActive, setVisaActive] = useState(false);
  const [paypalActive, setPaypalActive] = useState(false);
  const [applepayActive, setApplepayActive] = useState(false);
  const [googlePayActive, setGooglePayActive] = useState(false);

  const paymentMethods = [
    { icon:<Image style={{height:40, width:250}} source={require('../../../../assets/images/pay.png')} />
     , route: 'a', active: visaActive },
    { icon: <Paypal />, route: 'b', active: paypalActive },
    // { icon: <Applepay />, route: 'c', active: applepayActive },
    // { icon: <Googlepay />, route: 'd', active: googlePayActive },
  ];
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'transparent'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          backgroundColor: themeStyle.COLOR_WHITE,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: 20,
          paddingBottom: 30,
          // height: SCREEN_HEIGHT * 0.55,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{ alignItems: 'center', marginBottom: 10 }}
          onPress={() => { onClose(); setVisaActive(false); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }}>
          <DropDown />
        </TouchableOpacity>
        <Text
          style={{
            color: '#004E47',
            fontSize: themeStyle.FONT_SIZE_XLARGE,
            fontFamily: themeStyle.FONT_BOLD,
            marginTop: 10,
          }}>
          Payment Method
        </Text>
        <View
          style={{
            // width: SCREEN_WIDTH * 0.5,
            borderColor: '#FF9D9D',

            borderWidth: 0.5,
            marginVertical: 5,
          }}
        />
        <FlatList
          data={paymentMethods}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              Platform.OS == "ios" && item.route == "d"||  Platform.OS == "android" && item.route == "c" ? null :
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#F8F8F8',
                    marginVertical: 8,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                 {item.icon}
                  <TouchableOpacity
                    onPress={() => {
                      if (item.route == "a") { setVisaActive(true); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }
                      else if (item.route == "b") { setPaypalActive(true); setVisaActive(false); setApplepayActive(false); setGooglePayActive(false) }
                      else if (item.route == "c") { setApplepayActive(true); setPaypalActive(false); setVisaActive(false); setGooglePayActive(false) }
                      else if (item.route == "d") { setGooglePayActive(true); setApplepayActive(false); setPaypalActive(false); setVisaActive(false) }
                    }}
                    style={{
                      height: 18,
                      width: 18,
                      borderColor: '#FF9D9D',
                      borderWidth: 2,
                      backgroundColor: item.active ? '#FF9D9D' : null,
                      borderRadius: 5,
                    }}
                  />
                </View>
            );
          }}
          contentContainerStyle={styles.contentContainer2}
          keyExtractor={item => item.route}
        //   ItemSeparatorComponent={VerticalSpacerWallet}
        />
        {VerticalSpacer()}
        {VerticalSpacer()}
        {VerticalSpacer()}

        <Button
          title="Next"
          customColor="#FF9D9D"
          onPress={() => {
            if (paypalActive) { _createPayment(); setVisaActive(false); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }
            else if (visaActive) { _stripePayment(); setVisaActive(false); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }
            else if (googlePayActive) { _googlePayment(); setVisaActive(false); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }
            else if (applepayActive) { _applePayment(); setVisaActive(false); setPaypalActive(false); setApplepayActive(false); setGooglePayActive(false) }
          }}
          titleColor={themeStyle.COLOR_BLACK}
          width={SCREEN_WIDTH * 0.9}
        />
      </View>
    </Modal>
  );
};
