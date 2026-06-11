import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {VerticalSpacer} from '../../../lib/utils/global';
import {Icon, Input, Loader} from '../../index';

const CareerSelectModal = props => {
  const renderItems = (item, index) => {
    return (
      <>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            props.onPress(item);
          }}>
          <Text style={styles.textStyle}>
            {item.name || item.short_title}
            <Text style={styles.textStyle2}> {item.symbol}</Text>
          </Text>

          <View
            style={{
              width: 10,
              alignItems: 'center',
            }}>
            {props.selectedData?.title === item.title ? (
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
      isVisible={props.isVisible}
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
          onPress={() => props.onClose()}
          style={{alignItems: 'center', marginBottom: '2%'}}>
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>
        <Text
          style={
            props.career
              ? styles.careerTitle
              : {
                  color: props.education
                    ? themeStyle.COLOR_EDUCATION
                    : themeStyle.COLOR_GREY,
                  fontFamily: themeStyle.FONT_MEDIUM,
                  fontSize: 20,
                  textAlign: 'center',
                  width: '100%',
                }
          }>
          {props.title}
        </Text>
        <View
          style={{
            height: 1,
            width: '60%',
            backgroundColor: themeStyle.CLASSIFIED_HOME,
            alignSelf: 'center',
            marginTop: '1%',
          }}
        />
        {props.loading ? (
          <Loader />
        ) : props.data.length == 0 ? (
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
              {!props?.removeSearch && (
                <View style={{alignSelf: 'center'}}>
                  <Input
                    width={SCREEN_WIDTH * 0.8}
                    colorProps
                    value={props.value}
                    placeholder={'Type here to search'}
                    onChangeText={job => props.onSearch(job)}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        props.OnReset();
                      }
                    }}
                  />
                </View>
              )}
            </View>
            <View style={{height: '85%'}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={props.data}
                ItemSeparatorComponent={VerticalSpacer}
                renderItem={({item, index}) => renderItems(item, index)}
              />
              <TouchableOpacity
                onPress={props.onSelect}
                style={styles.selectButton}>
                <Text style={styles.select}>Select</Text>
              </TouchableOpacity>
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
    height: SCREEN_HEIGHT * 0.72,
  },
  inputContainer: {
    margin: '2.5%',
  },
  textStyle: {
    fontFamily: themeStyle.FONT_REGULAR,
    width: '85%',
    color: themeStyle.COLOR_BLACK,
    fontSize: 24,
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
    borderColor: '#B6B6B6',
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
    borderColor: '#B6B6B6',
    borderWidth: 1,
  },
  line: {
    width: SCREEN_WIDTH,
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
    marginTop: '6%',
    marginBottom: '12%',
  },
  select: {
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    fontSize: 20,
  },
  itemContainer: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default CareerSelectModal;
