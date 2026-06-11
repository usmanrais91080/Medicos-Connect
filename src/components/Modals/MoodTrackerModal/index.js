import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Modal, Text, View} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import Icon from '../../Icon';
import {MentalServices} from '../../../services';
import {SvgUri} from 'react-native-svg';
import {scaleFont, scaleImage} from '../../../lib/utils/global';

const colors = {
  Happy: themeStyle.YELLOW,
  Sad: themeStyle.COLOR_BOOK_KEEPING,
  Angry: themeStyle.COLOR_CLASSIFIED,
  Blessed: themeStyle.BLESSED,
  Joyful: themeStyle.PINK,
  Annoyed: themeStyle.CARRER_PRIMARY,
};

const MoodTrackerModal = ({
  modalVisible,
  token,
  handleMoodSubmit,
  handleCloseModal,
}) => {
  const [moods, setMoods] = useState([]);
  const [showSelectedMood, setShowSelectedMood] = useState(false);
  const [selectedMood, setSelectedMood] = useState({});

  useEffect(() => {
    MentalServices.getAllMoods(token)
      .then(res => {
        setMoods(res.data.data);
      })
      .then(err => {});
  }, []);

  useEffect(() => {
    if (showSelectedMood) {
      setTimeout(() => {
        setShowSelectedMood(false);
        handleCloseModal();
      }, 4000);
    }
  }, [showSelectedMood]);

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      transparent={true}
      animationType="slide">
      <View style={styles.moodTrackingModal}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Icon.Entypo
              name="cross"
              size={22}
              color={themeStyle.COLOR_BLACK}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Mood Tracker</Text>
          <View style={{width: 22, height: 22}} />
        </View>
        <Text style={styles.description}>How are you feeling today?</Text>
        <FlatList
          data={moods}
          numColumns={2}
          horizontal={false}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.background,
                {backgroundColor: colors[item.expression]},
              ]}
              onPress={() => {
                handleMoodSubmit(item._id);
                setSelectedMood(item);
                setShowSelectedMood(true);
              }}>
              <SvgUri
                uri={item.image}
                width={scaleImage(80)}
                height={scaleImage(80)}
              />
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      item.expression == 'Angry' || item.expression == 'Happy'
                        ? themeStyle.COLOR_BLACK
                        : themeStyle.COLOR_WHITE,
                  },
                ]}>
                {item.expression}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal
        visible={showSelectedMood}
        onRequestClose={() => setShowSelectedMood(false)}
        transparent={true}
        animationType="slide">
        <View
          style={[
            styles.selectedMoodContainer,
            {backgroundColor: colors[selectedMood.expression]},
          ]}>
          <Text
            style={[
              styles.moodTracker,
              {
                color:
                  selectedMood.expression === 'Happy'
                    ? themeStyle.COLOR_BLACK
                    : themeStyle.COLOR_WHITE,
              },
            ]}>
            Mood Tracker
          </Text>
          <SvgUri
            uri={selectedMood.image}
            style={{
              color: themeStyle.COLOR_WHITE,
              borderColor: 'white',
              shadowColor: 'white',
            }}
            width={scaleImage(200)}
            height={scaleImage(200)}
          />
          <Text
            style={[
              styles.expressionModalTitle,
              {
                color:
                  selectedMood.expression == 'Happy'
                    ? themeStyle.COLOR_BLACK
                    : themeStyle.COLOR_WHITE,
              },
            ]}>
            {selectedMood.expression}
          </Text>
          {selectedMood.expression === 'Angry' && (
            <>
              <Text style={styles.selectedMoodDescription}>We are sorry!</Text>
              <Text style={styles.selectedMoodDescription1}>
                You are having a bad day
              </Text>
            </>
          )}
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  moodTrackingModal: {
    backgroundColor: themeStyle.COLOR_WHITE,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingTop: Platform.OS == 'android' ? 10 : StatusBar.currentHeight + 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: '8%',
  },
  modalTitle: {
    fontSize: scaleFont(24),
    fontFamily: themeStyle.FONT_BOLD,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: '5%',
  },
  background: {
    width: SCREEN_WIDTH * 0.43,
    height: SCREEN_WIDTH * 0.45,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
  },
  title: {
    fontSize: scaleFont(28),
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  expressionModalTitle: {
    fontSize: scaleFont(47),
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 5,
    marginTop: 50,
  },
  description: {
    fontSize: scaleFont(20),
    fontFamily: themeStyle.FONT_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 8,
    marginTop: 10,
  },
  selectedMoodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodDescription: {
    marginTop: 80,
    fontSize: scaleFont(32),
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'center',
    textAlign: 'center',
  },
  selectedMoodDescription1: {
    fontSize: scaleFont(28),
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_MEDIUM,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  moodTracker: {
    fontSize: scaleFont(24),
    fontFamily: themeStyle.FONT_BOLD,
    position: 'absolute',
    top: 50,
  },
  columnWrapperStyle: {
    height: SCREEN_WIDTH * 0.48,
    justifyContent: 'space-between',
    marginBottom: '1%',
    // marginBottom: 20, // Space between rows
  },
});

export default MoodTrackerModal;
