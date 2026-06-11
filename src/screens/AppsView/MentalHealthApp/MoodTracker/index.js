import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {MentalServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import {SvgUri} from 'react-native-svg';

const MentalMoodTracker = ({route: routeData}) => {
  const {token} = routeData.params;
  const [moods, setMoods] = useState([]);
  const [moodTracker, setMoodTracker] = useState([]);
  const [selectedDays, setSelectedDays] = useState(7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    MentalServices.getAllMoods(token).then(response => {
      if (response.data.code == 200) {
        setMoods(response.data.data);
      }
    });
    getMoodTracker(selectedDays);
  }, []);

  const getMoodTracker = days => {
    MentalServices.getMoodsTracker(token, days).then(response => {
      if (response.data.code == 200) {
        setMoodTracker(response.data.data);
        setLoading(false);
      }
    });
  };

  const renderMood = ({item}) => {
    return (
      <View style={styles.moodContainer}>
        <View style={styles.moodImage}>
          <SvgUri uri={item?.image} height={40} width={55} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.mood}>{item?.expression}</Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progress,
                {width: `${Number(moodTracker[item._id]) || 0}%`},
              ]}
            />
          </View>
        </View>
        <Text style={styles.percentage}>
          {(Number(moodTracker[item._id]) || 0).toFixed(0)}%
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedDays == 7
                  ? themeStyle.ORANGE_DARK
                  : themeStyle.ORANGE_LIGHT,
            },
          ]}
          onPress={() => {
            getMoodTracker(7);
            setSelectedDays(7);
          }}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectedDays == 7
                    ? themeStyle.COLOR_WHITE
                    : themeStyle.COLOR_BLACK,
              },
            ]}>
            Last 7 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedDays == 90
                  ? themeStyle.ORANGE_DARK
                  : themeStyle.ORANGE_LIGHT,
            },
          ]}
          onPress={() => {
            getMoodTracker(90);
            setSelectedDays(90);
          }}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectedDays == 90
                    ? themeStyle.COLOR_WHITE
                    : themeStyle.COLOR_BLACK,
              },
            ]}>
            Last 90 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedDays == null
                  ? themeStyle.ORANGE_DARK
                  : themeStyle.ORANGE_LIGHT,
            },
          ]}
          onPress={() => {
            getMoodTracker(null);
            setSelectedDays(null);
          }}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectedDays == null
                    ? themeStyle.COLOR_WHITE
                    : themeStyle.COLOR_BLACK,
              },
            ]}>
            Overall
          </Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color={themeStyle.ORANGE}
        />
      )}
      <FlatList
        data={moods}
        contentContainerStyle={styles.flatlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMood}
      />
    </View>
  );
};

export default MentalMoodTracker;
