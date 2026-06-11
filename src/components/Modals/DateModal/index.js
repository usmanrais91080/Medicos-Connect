import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import themeStyle from '../../../assets/styles/theme.style';
import moment from 'moment';
import {Icon} from '../..';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

const UpgradeModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      // animationOut={'fadeInDown'}
      onBackdropPress={() => props.onClose()}
      animationInTiming={400}
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => props.onClose()}
          style={{alignItems: 'center', marginTop: '2.5%'}}
        >
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>
        <View style={{}}>
          {props.start && !props.target ? (
            <Text style={styles.headingText}>Starting Date</Text>
          ) : props.start && props.target ? (
            <Text style={styles.headingText}>Select Target Date</Text>
          ) : props.wallet ? (
            <Text style={styles.headingText}>Select Date</Text>
          ) : (
            <Text style={styles.headingText}>Date Of Birth</Text>
          )}
        </View>
        <View
          style={{
            marginBottom: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.start ? (
            <DatePicker
              date={props.date}
              minimumDate={new Date()}
              mode="date"
              onDateChange={date => props.setDate(date)}
              theme={'light'}
              textColor={themeStyle.COLOR_BLACK}
            />
          ) : (
            <DatePicker
              date={props.date}
              maximumDate={
                props.maximumDate || new Date(moment().format('YYYY-MM-DD'))
              }
              minimumDate={new Date(moment().subtract(90, 'years'))}
              mode="date"
              onDateChange={date => props.setDate(date)}
              theme={'light'}
              textColor={themeStyle.COLOR_BLACK}
            />
          )}
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                borderColor: props.outline
                  ? themeStyle.BAR_COLOR
                  : themeStyle.COLOR_BLACK,
              },
              props.outline
                ? {
                    borderWidth: 2,
                    padding: 10,
                    borderRadius: 10,
                    width: SCREEN_WIDTH * 0.4,
                  }
                : {},
            ]}
            onPress={() => props.onClose()}
          >
            <Text style={styles.blackText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                backgroundColor: props.outline
                  ? themeStyle.BAR_COLOR
                  : themeStyle.COLOR_WHITE,
              },
              props.outline
                ? {padding: 10, borderRadius: 10, width: SCREEN_WIDTH * 0.4}
                : {},
            ]}
            onPress={() => props.onSave()}
          >
            <Text style={styles.blackText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: '5%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 25,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  colorText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: themeStyle.COLOR_WHITE,
  },
  blackText: {
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: 16,
    color: '#000',
  },
  headingText: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 21,
    color: '#1F2729',
    textAlign: 'center',
  },
});

export default UpgradeModal;
