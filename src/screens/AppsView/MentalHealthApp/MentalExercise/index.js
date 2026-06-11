import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Loader} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {MentalServices} from '../../../../services';
import {MentalExerciseVitals} from './mental.exercise.vitals.component';

const MentalExercise = () => {
  const navigation = useNavigation();
  const userToken = useSelector(state => state.authReducer?.userData?.token);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchExerciseData();
    const focusListener = navigation.addListener('focus', fetchExerciseData);
    return () => focusListener();
  }, [navigation]);

  const fetchExerciseData = useCallback(() => {
    getExerciseQuestions();
    getExercisePlans();
  }, []);

  const getExerciseQuestions = async () => {
    try {
      const res = await MentalServices.getExerciseQuestions(userToken);
      setQuestions(res.data?.data || []);
      getStreaks();
    } catch {
      getStreaks();
    }
  };

  const getStreaks = async () => {
    try {
      const res = await MentalServices.getExerciseAnswerStreak(userToken);
      setStreaks(res.data?.data || []);
      getExercisePlans();
    } catch {
      getExercisePlans();
    }
  };
  const getExercisePlans = async () => {
    try {
      const res = await MentalServices.getExercisePlans(userToken);
      if (!res.data || !res.data.data || res.data.data.length === 0) {
        setPlans([]);
        return;
      }

      const order = ['Easy', 'Medium', 'Hard', 'Stretching'];
      const sortedPlans = res.data.data.sort(
        (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
      );

      setPlans(sortedPlans);
    } catch (error) {
      console.log('Error fetching exercise plans:', error);
      setPlans([]); // Ensure it doesn't break
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (ans, id) => {
    try {
      await MentalServices.giveAnswer(id, {answer: ans}, userToken);
    } catch (err) {
      console.log('Error answering question:', err);
    }
  };

  const renderMainItem = ({item}) => {
    const progress =
      item?.remainingDays == null
        ? 0
        : (item?.total_days - item?.remainingDays) / item?.total_days;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(route.MENTALEXERCISEDAYS, {
            Days: item?.remainingDays,
            exerciseDays: item?.exerciseDays,
            id: item?._id,
            totalDays: item?.total_days,
            average_time: item?.average_time,
            level: item?.name,
          })
        }
        style={styles.mainItemContainer}>
        <FastImage
          resizeMode="contain"
          source={{
            uri:
              item?.banner ||
              'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
          }}
          style={styles.bannerImage}
        />
        <Text style={styles.myProgress}>My Progress</Text>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            unfilledColor={themeStyle.ORANGE_LIGHT}
            progress={progress}
            height={44}
            width={SCREEN_WIDTH * 0.9}
            borderWidth={0}
            color={themeStyle.ORANGE}
          />
        </View>
        <Text style={styles.percentage}>{`${(progress * 100).toFixed(
          0,
        )}%`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={themeStyle.PURPLE_COLOR}
        barStyle="light-content"
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Select your {'\n'}
              <Text style={styles.headerBoldText}>Workout</Text>
            </Text>
          </View>
          <FlatList
            data={plans}
            renderItem={renderMainItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.flatListContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No data to load</Text>
            }
          />
        </ScrollView>
      )}
      <MentalExerciseVitals
        visible={visible}
        onClose={() => {
          setVisible(false);
          getStreaks();
        }}
        data={questions}
        ans={answerQuestion}
      />
    </Container>
  );
};

export default MentalExercise;
