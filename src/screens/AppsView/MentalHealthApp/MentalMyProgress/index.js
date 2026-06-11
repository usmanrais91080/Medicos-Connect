import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import {View} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {MentalServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import {Loader} from '../../../../components';

const MentalMyProgress = ({route: routeData}) => {
  const {token} = routeData.params;
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProgress();
  }, []);

  const getMyProgress = async () => {
    MentalServices.getMyProgress(token).then(response => {
      if (response.data.code === 200) {
        setLoading(false);
        setProgress(response.data.data);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  const HeaderTitle = ({title, percentage}) => {
    return (
      <View style={styles.headerTitleContainer}>
        <View
          style={[styles.headerTitleInnerContainer, {width: `${percentage}%`}]}
        />
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.percentage}>{percentage || 0}%</Text>
      </View>
    );
  };

  const DetailCard = ({
    currentStreak,
    longestStreak,
    daysCompleted,
    daysData,
  }) => {
    return (
      <View style={styles.detailCardContainer}>
        <View style={styles.detailCardInnerContainer}>
          <View style={styles.streakContainer}>
            <Text style={styles.detailCardTitle}>Current Streak</Text>
            <Text style={styles.detailCardValue}>
              {currentStreak || 0}
              <Text style={styles.detailCardValueSmall}> days</Text>
            </Text>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.detailCardTitle}>Longest Streak</Text>
            <Text style={styles.detailCardValue}>
              {longestStreak || 0}
              <Text style={styles.detailCardValueSmall}> days</Text>
            </Text>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.detailCardTitle}>Days Completed</Text>
            <Text style={styles.detailCardValue}>
              {daysCompleted || 0}
              <Text style={styles.detailCardValueSmall}> days</Text>
            </Text>
          </View>
        </View>
        <FlatList
          data={daysData}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 9,
          }}
          renderItem={({item}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.day}>{item?.shortName}</Text>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor:
                        +item.streaks > 0
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
    );
  };

  const BreatheCard = ({title, sessions}) => {
    return (
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.sessionsContainer}>
          <Text style={styles.sessionCount}>{sessions}</Text>
          <Text style={styles.sessions}>Sessions</Text>
        </View>
      </View>
    );
  };

  const renderExerciseItem = ({item}) => {
    return (
      <View style={styles.exerciseContainer}>
        <HeaderTitle
          title={
            item?.name == 'Easy'
              ? 'Level 1'
              : item?.name == 'Medium'
              ? 'Level 2'
              : item?.name == 'Hard'
              ? 'Level 3'
              : 'Stretch'
          }
          percentage={(
            (+item?.excerciseProgress / +item?.total_days) *
            100
          ).toFixed(0)}
        />
        <DetailCard
          currentStreak={item?.excerciseCurrentStreak}
          longestStreak={item?.excerciseLongestStreak}
          daysCompleted={item?.excerciseDaysCompleted}
          daysData={item?.excerciseDays}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <Text style={styles.myProgress}>My Progress</Text>
        <View style={styles.profileContainer}>
          <FastImage
            style={styles.profileImage}
            source={{uri: progress?.image}}
          />
          <Text style={styles.username}>{progress?.username}</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.title}>Self Help Journal</Text>
        <HeaderTitle
          title={'Total Progress'}
          percentage={Number(progress?.journalProgress)}
        />
        <DetailCard
          currentStreak={progress?.journalCurrentStreak}
          longestStreak={progress?.journalLongestStreak}
          daysCompleted={progress?.journalCompletedDays}
          daysData={progress?.journalDays}
        />
        {progress?.excercisesStats ? <View style={styles.line} /> : null}
        {progress?.excercisesStats ? (
          <Text style={styles.title}>Exercise</Text>
        ) : null}
        <FlatList
          data={progress?.excercisesStats}
          renderItem={renderExerciseItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.line} />
        <Text style={styles.title}>Diary</Text>
        <DetailCard
          currentStreak={progress?.diaryCurrentStreak}
          longestStreak={progress?.diaryLongestStreak}
          daysCompleted={progress?.diaryCompletedDays}
          daysData={progress?.diaryMaxStreakDays}
        />
        <View style={styles.line} />
        <Text style={styles.title}>Mood Tracker</Text>
        <HeaderTitle
          title={'Total Progress'}
          percentage={Number(progress?.moodPercentage)}
        />
        <DetailCard
          currentStreak={progress?.moodCurrentStreak}
          longestStreak={progress?.moodLongestStreak}
          daysCompleted={progress?.moodCompletedDays}
          daysData={progress?.moodDays}
        />
        <View style={styles.line} />
        {progress?.breathExercises?.length ? (
          <Text style={styles.title}>Breathe</Text>
        ) : null}
        <FlatList
          data={progress?.breathExercises}
          renderItem={({item}) => (
            <BreatheCard title={item?.title} sessions={item?.sessionCount} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default MentalMyProgress;
