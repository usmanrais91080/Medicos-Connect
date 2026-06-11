import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import DropDown from '../../../assets/svg/dropDown.svg';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const MentalHealthSetReminder = ({
  visible,
  onClose,
  remainderType,
  setReminderType,
  setDaysData,
  selectedDays,
  time,
  daysData,
  setTime,
  quickSettings,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={onClose}>
              <DropDown />
            </TouchableOpacity>
            <Text style={styles.setReminder}>Set Reminders</Text>
            <View style={styles.line} />
            <Text style={styles.textStyle}>
              Have you taken some time for yourself today?
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.quickSettingsContainer}>
                <Text style={styles.title}>Quick Settings</Text>
                <FlatList
                  data={quickSettings}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{
                    marginTop: 17,
                    marginBottom: 12,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => setReminderType(item)}
                      style={
                        remainderType === item
                          ? styles.selectedQuickSettings
                          : styles.quickSettings
                      }>
                      <Text style={styles.settingName}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.quickSettingsContainer}>
                <Text style={styles.title}>Select Days</Text>
                <FlatList
                  data={daysData}
                  horizontal
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 9,
                    marginBottom: 22,
                  }}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={styles.day}>{item.shortName}</Text>
                        <TouchableOpacity
                          onPress={() => setDaysData(item)}
                          style={[
                            styles.circle,
                            {
                              backgroundColor: selectedDays?.includes(item)
                                ? themeStyle.COLOR_YELLOWISH
                                : themeStyle.ORANGE_LIGHT,
                            },
                          ]}
                        />
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  style={{marginHorizontal: 2}}
                />
              </View>
              <View style={styles.quickSettingsContainer}>
                <Text style={styles.title}>Select Time</Text>
                <DatePicker
                  style={{
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  date={new Date(moment(time, 'hh:mm A').format('YYYY-MM-DD'))}
                  theme="light"
                  textColor={themeStyle.COLOR_BLACK}
                  onDateChange={date => setTime(date)}
                  fadeToColor="none"
                  mode="time"
                />
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                  <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    elevation: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: themeStyle.PURPLE_COLOR,
  },
  modalContainer: {
    borderRadius: 15,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.WHITE_SMOKE,
    padding: 15,
    width: SCREEN_WIDTH * 0.85,
    borderRadius: 5,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginBottom: 19,
  },
  dropdown: {alignSelf: 'center', marginTop: 10, width: 40, height: 40},
  setReminder: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.PURPLE_COLOR,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: themeStyle.EDUCATION_BROWN,
    width: '65%',
    marginVertical: 7,
    alignSelf: 'center',
  },
  quickSettingsContainer: {
    borderRadius: 5,
    backgroundColor: themeStyle.ORANGE_LIGHT,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginTop: 15,
  },
  quickSettings: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_YELLOWISH,
    width: SCREEN_WIDTH * 0.26,
    height: 62,
  },
  selectedQuickSettings: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_YELLOWISH,
    backgroundColor: themeStyle.COLOR_YELLOWISH,
    width: SCREEN_WIDTH * 0.26,
    height: 62,
  },
  settingName: {
    fontSize: 12,
    fontFamily: themeStyle.FONT_MEDIUM,
    color: themeStyle.COLOR_BLACK,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: themeStyle.COLOR_YELLOWISH,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.435,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: themeStyle.EDUCATION_BROWN,
  },
  submitButton: {
    padding: 12,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.435,
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_YELLOWISH,
  },
  text: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
});

export default MentalHealthSetReminder;
