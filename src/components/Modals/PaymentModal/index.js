import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import { GooglePayButton } from '@stripe/stripe-react-native';
import themeStyle from '../../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../../lib/utils/constants';

const PaymentModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={600}>
      {/* Close outside the modal */}
      <TouchableWithoutFeedback onPress={() => props.hide()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      {/* Close inside the modal */}
      <TouchableWithoutFeedback disabled={true} onPress={() => props.hide()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBackgroundContainer}>
            <Text style={styles.headingText}>Payment Methods</Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => props.paypal()}
                style={styles.greenbtn}>
                <Text style={styles.whiteText}>{'PayPal'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.stripe()}
                style={styles.greenbtn}>
                <Text style={styles.whiteText}>Visa Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props?.google ? props?.google() : {}}
                style={styles.greenbtn}>
                <Text style={styles.whiteText}>Google Pay</Text>
              </TouchableOpacity>
              {/* <GooglePayButton
                onPress={() => props?.google ? props?.google : {}}
                type="pay"
                style={{
                  width: '50%',
                  height: 51,
                  alignSelf: 'center'
                }}
              /> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: '5%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  greenbtn: {
    backgroundColor: themeStyle.COLOR_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
    marginVertical: '2%',
  },
  redBtn: {
    backgroundColor: themeStyle.COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '5%',
    width: SCREEN_WIDTH * 0.325,
    marginVertical: '2%',
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
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: '#B2B2B2',
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
    color: '#959FAE',
    textAlign: 'center',
  },
});

export default PaymentModal;
