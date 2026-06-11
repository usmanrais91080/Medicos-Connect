import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import RangeSlider from 'rn-range-slider';

import {Icon, Button} from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';

const ConnectFilter = props => {
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => props.onClose()}
          style={{alignItems: 'center'}}>
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: themeStyle.FONT_REGULAR,
            color: themeStyle.COLOR_BLACK,
          }}>
          Filters
        </Text>
        <View style={{marginVertical: '5%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: themeStyle.FONT_REGULAR,
              color: themeStyle.COLOR_BLACK,
            }}>
            Is interested in
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: '2.5%',
              backgroundColor: themeStyle.PINK,
              borderRadius: 15,
              height: 54,
            }}>
            <TouchableOpacity
              onPress={() => props.onMen()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.men
                  ? themeStyle.SPANISH_PINK
                  : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text style={{color: themeStyle.COLOR_BLACK}}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onWomen()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.women
                  ? themeStyle.SPANISH_PINK
                  : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text style={{color: themeStyle.COLOR_BLACK}}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onAny()}
              style={{
                flex: 0.5,
                alignItems: 'center',
                backgroundColor: props.any
                  ? themeStyle.SPANISH_PINK
                  : 'transparent',
                height: 45,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text style={{color: themeStyle.COLOR_BLACK}}>Non-Binary</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: themeStyle.FONT_REGULAR,
              color: themeStyle.COLOR_BLACK,
            }}>
            Age
          </Text>
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: 12,
              fontFamily: themeStyle.FONT_BOLD,
            }}>
            Between {props.min} and {props.max != 35 ? props.max : 70}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingHorizontal: '5%',
            borderWidth: 2,
            borderColor: themeStyle.SPANISH_PINK,
            //paddingTop: '5%',
            marginTop: '2.5%',
          }}>
          <RangeSlider
            style={styles.sliderStyle}
            gravity={'bottom'}
            min={18}
            allowLabelOverflow
            floatingLabel={true}
            initialLowValue={props.min}
            initialHighValue={props.max}
            max={70}
            step={1}
            rangeEnabled={true}
            lineWidth={2}
            thumbRadius={8}
            thumbColor={themeStyle.PINK}
            labelBackgroundColor={themeStyle.PINK}
            labelBorderWidth={0}
            thumbBorderWidth={0}
            selectionColor={themeStyle.PRIMARY_COLOR}
            blankColor={'#B1B1B1'}
            onValueChanged={(low, high, fromUser) => {
              if (fromUser) {
                props.onValueChanged(low, high);
              }
            }}
          />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => props.onClose()} style={styles.back}>
            <Text style={styles.grayText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.onSetFilter()}
            style={styles.applyFilter}>
            <Text style={styles.whiteText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
        {/*<View style={{marginTop: '10%'}}>
          <Button
            customColor={themeStyle.SPANISH_PINK}
            loading={props.btnloading}
            title="Apply Filters"
            onPress={() => props.onSetFilter()}
          />
          <Button
            customColor={ themeStyle.SPANISH_PINK }
            loading={ props.btnloading }
            title="Apply Filters"
            onPress={ () => props.onSetFilter() }
          />
          <Text style={{ textAlign: "center", color: "#FF6B6B", fontFamily: themeStyle.FONT_REGULAR }}>or</Text>
                    <Button red title="Set advance filters" onPress={() => props.onNext()} />
        </View>*/}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  grayText: {
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    fontSize: 10,
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  sliderStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: 60,
    //marginTop: '5%',
    bottom: 20,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '7%',
  },
  back: {
    width: SCREEN_WIDTH * 0.415,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeStyle.SPANISH_PINK,
  },
  applyFilter: {
    width: SCREEN_WIDTH * 0.415,
    height: 50,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: themeStyle.SPANISH_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default ConnectFilter;
