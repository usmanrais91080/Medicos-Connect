import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList, StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';

const MentalExerciseDays = () => {
  const navigation = useNavigation();
  const routeParams = useRoute().params;
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState({id: '', day: ''});
  const level = routeParams?.level;

  useEffect(() => {
    if (routeParams?.exerciseDays) {
      setDays(
        routeParams.exerciseDays.map(item => ({...item, selected: false})),
      );
    }
  }, [routeParams]);

  const handleDayPress = (item, index) => {
    setDays(prevDays =>
      prevDays.map((e, i) => ({
        ...e,
        selected: i === index ? !e.selected : false,
      })),
    );
    setSelectedDay(prev =>
      prev.id === item._id ? {id: '', day: ''} : {id: item._id, day: item.day},
    );
  };

  const findFirstFalseIndex = useCallback(
    () => days.findIndex(day => !day.is_completed),
    [days],
  );

  const onStart = () => {
    if (!selectedDay.day) return;
    navigation.navigate(route.MENTALEXERCISEDAYSCHALLENGE, {
      id: selectedDay.id,
      day: selectedDay.day,
      modeId: routeParams?.id,
      average_time: routeParams?.average_time,
    });
  };

  const renderAdsItem = ({item, index}) => (
    <TouchableOpacity
      disabled={item.is_completed || findFirstFalseIndex() < days.indexOf(item)}
      onPress={() => handleDayPress(item, index)}
      style={
        item.is_completed
          ? {...styles.inActiveday, backgroundColor: themeStyle.PURPLE_COLOR}
          : item.selected
          ? {...styles.inActiveday, backgroundColor: themeStyle.ORANGE}
          : styles.inActiveday
      }>
      <Text
        style={[
          styles.digit,
          {
            color: item.is_completed
              ? themeStyle.COLOR_WHITE
              : themeStyle.COLOR_BLACK,
          },
        ]}>
        {item.day}
      </Text>
      <Text
        style={[
          styles.dateText,
          {
            color: item.is_completed
              ? themeStyle.COLOR_WHITE
              : themeStyle.COLOR_BLACK,
          },
        ]}>
        Day
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container color>
      <StatusBar
        backgroundColor={themeStyle.PURPLE_COLOR}
        barStyle={'light-content'}
      />
      <Text style={styles.level}>
        {level !== 'Stretching' ? 'Level' : 'Stretch'}{' '}
        <Text style={{fontFamily: themeStyle.FONT_BOLD}}>
          {level === 'Easy'
            ? '1'
            : level === 'Medium'
            ? '2'
            : level === 'Hard'
            ? '3'
            : ''}
        </Text>
      </Text>
      <View style={{margin: '2.5%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={days}
          renderItem={renderAdsItem}
          numColumns={5}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
      <View style={styles.progressCard}>
        <Text style={styles.progressHeader}>Progress</Text>
        <View style={styles.progressflex}>
          <View style={styles.progressCardContainer}>
            <View>
              <Text style={styles.progressText}>Days</Text>
              <Text style={styles.progressText}>Completed</Text>
            </View>
            <Text style={styles.dayCount}>
              {routeParams.totalDays - routeParams?.Days}
            </Text>
          </View>
          <View style={styles.progressCardContainer}>
            <View>
              <Text style={styles.progressText}>Days</Text>
              <Text style={styles.progressText}>Remaining</Text>
            </View>
            <Text style={styles.dayCount}>{routeParams?.Days}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonStyleDone}
        disabled={!selectedDay.day}
        onPress={onStart}>
        <Text style={[styles.textStyleMenu, styles.textCenter]}>Start</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MentalExerciseDays;
