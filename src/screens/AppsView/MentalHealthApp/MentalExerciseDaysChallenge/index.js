import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Loader} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {MentalServices} from '../../../../services';
import {connect} from 'react-redux';
import moment from 'moment';
import PlayButton from '../../../../assets/svg/play-button.svg';
import {ChallengeComponent} from './mental.exercise.challenge.component';

const MentalExerciseDaysChallenge = ({route: routeData, navigation, user}) => {
  const [homedata, setHomedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const {id, modeId, day, average_time} = routeData.params;

  useEffect(() => {
    getDayChallenge(id);
    navigation.setOptions({headerTitle: () => headerTitle()});
  }, [id, navigation]);

  const getDayChallenge = useCallback(
    async id => {
      try {
        const res = await MentalServices.getDayChallenge(
          id,
          user.userData.token,
        );
        setHomedata(res.data.data.exercises);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      } finally {
        setLoading(false);
      }
    },
    [user.userData.token],
  );

  const headerTitle = () => (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.headerTitleText}>Workout</Text>
      <View style={styles.headerDay}>
        <Text style={styles.headerDayText}>Day {day}</Text>
      </View>
    </View>
  );

  const onDone = async () => {
    try {
      await MentalServices.saveExerciseProgress(
        {day: id, mode: modeId, exercise: ''},
        user.userData.token,
      );
      navigation.navigate(route.MENTALEXERCISE);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const renderMainItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(route.MENTALEXERCISEDAYSSKIP, {
            data: homedata,
            id: item?._id,
            index,
            dayId: id,
            modeId,
            average_time,
            day,
          })
        }
        style={styles.exerciseCard}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item?.name}</Text>
          <Text style={styles.exerciseDuration}>
            {moment
              .utc(item.video_time * item.repetition * 1000)
              .format('mm:ss')}{' '}
            {moment
              .utc(item.video_time * item.repetition * 1000)
              .format('mm') == '00'
              ? 'sec'
              : 'mins'}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.banner}} />
        </View>
        <View style={styles.playButtonContainer}>
          <PlayButton />
          <Text style={styles.playText}>Play</Text>
        </View>
      </TouchableOpacity>
    ),
    [homedata],
  );

  const memoizedHomedata = useMemo(() => homedata, [homedata]);

  if (loading) return <Loader />;

  return (
    <View style={styles.flex}>
      <StatusBar
        backgroundColor={themeStyle.PURPLE_COLOR}
        barStyle={'light-content'}
      />
      {memoizedHomedata.length > 0 ? (
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.day}>
              Day <Text style={styles.fontBold}>{day}</Text>
            </Text>

            <FlatList
              data={memoizedHomedata}
              renderItem={renderMainItem}
              keyExtractor={item => item._id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatlistContentContainer}
            />
          </View>

          <ChallengeComponent
            visible={visible}
            onClose={() => setVisible(false)}
            emojiImage={user.userData.mental_health_mood}
            emojiOnPress={() =>
              navigation.navigate(route.MENTALMOOD, {
                mood: user.userData.mental_health_mood,
              })
            }
            done={() => navigation.navigate(route.MENTALEXERCISE)}
          />
        </ScrollView>
      ) : (
        <View style={styles.restDayContainer}>
          <Text style={[styles.day, styles.fontBold]}>Rest Day</Text>
          <Text style={styles.restDayText}>Come Back Tomorrow!</Text>
          <Image
            source={require('../../../../assets/gifs/restday.gif')}
            style={styles.restGif}
          />
          <Text style={[styles.day, styles.fontBold, styles.center]}>
            Surprise!
          </Text>
          <Text style={styles.cheatDay}>It’s a rest day, go have fun.</Text>
          <TouchableOpacity style={styles.buttonStyleDone} onPress={onDone}>
            <Text style={[styles.textStyleMenu, styles.center]}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer || {},
});

export default connect(mapStateToProps)(MentalExerciseDaysChallenge);
