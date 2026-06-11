import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {VerticalSpacer} from '../../../lib/utils/global';
import {Icon, Input, Loader} from '../../index';

const CareerCountryModal = ({
  onPress,
  onClose,
  isVisible,
  data,
  title,
  loading,
  value,
  onSearch,
  OnReset,
  selectedData,
  removeSearch,
  onSelect,
}) => {
  const renderItems = (item, index) => {
    return (
      <>
        <TouchableOpacity
          style={{
            paddingBottom: 7,
            marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            onPress(item);
          }}>
          <Text style={styles.textStyle}>{item.label}</Text>
          <View
            style={{
              width: 10,
              alignItems: 'center',
            }}>
            {selectedData?.label === item.label ? (
              <View style={styles.selected}>
                <View style={styles.box} />
              </View>
            ) : (
              <View style={styles.unSelected} />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'#E9E9E9'}
      animationInTiming={400}
      animationOutTiming={400}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: themeStyle.COLOR_WHITE,
        }}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{alignItems: 'center', marginBottom: '2%'}}>
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>
        <Text style={styles.careerTitle}>{title}</Text>
        <View
          style={{
            height: 1,
            width: '60%',
            backgroundColor: themeStyle.CLASSIFIED_HOME,
            alignSelf: 'center',
            marginTop: '1%',
          }}
        />
        {loading ? (
          <Loader />
        ) : data.length == 0 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '2.5%',
                marginTop: '5%',
              }}>
              <View style={{width: SCREEN_WIDTH * 0.75}}></View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.textStyle]}>No data to load</Text>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '5%',
                marginVertical: '5%',
                justifyContent: 'space-between',
              }}>
              {!removeSearch && (
                <View style={{alignSelf: 'center'}}>
                  <Input
                    width={SCREEN_WIDTH * 0.8}
                    colorProps
                    value={value}
                    placeholder={'Type here to search'}
                    onChangeText={job => onSearch(job)}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        OnReset();
                      }
                    }}
                  />
                </View>
              )}
            </View>
            <View style={{height: '100%', width: '100%'}}>
              <View style={{height: '85%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  // contentContainerStyle={{ margin: "5%",paddingBottom:'20%' }}
                  ItemSeparatorComponent={VerticalSpacer}
                  renderItem={({item, index}) => renderItems(item, index)}
                />
                <TouchableOpacity
                  onPress={onSelect}
                  style={styles.selectButton}>
                  <Text style={styles.select}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingVertical: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: SCREEN_HEIGHT * 0.85,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: 24,
    color: themeStyle.COLOR_BLACK,
  },
  textStyle2: {
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  careerTitle: {
    fontSize: 22,
    color: themeStyle.CARRER_PRIMARY,
    fontFamily: themeStyle.FONT_BOLD,
    textAlign: 'center',
    width: '100%',
  },
  selected: {
    width: 23,
    height: 20,
    borderRadius: 2,
    borderColor: themeStyle.CARRER_PRIMARY,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 17,
    height: 15,
    backgroundColor: themeStyle.CARRER_SECONDARY,
  },
  unSelected: {
    width: 18,
    height: 16,
    borderRadius: 2,
    borderColor: themeStyle.CARRER_PRIMARY,
    borderWidth: 1,
  },
  line: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignSelf: 'center',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.2,
  },
  selectButton: {
    width: SCREEN_WIDTH - 40,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: themeStyle.CARRER_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '5%',
  },
  select: {
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    fontSize: 20,
  },
});
export default CareerCountryModal;
