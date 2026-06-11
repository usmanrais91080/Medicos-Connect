import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {MentalServices} from '../../../../../services';
import {FlatList} from 'react-native-gesture-handler';
import themeStyle from '../../../../../assets/styles/theme.style';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {route} from '../../../../../lib/utils/constants';
import {Loader} from '../../../../../components';

const MentalBreatheHome = ({route: routeData}) => {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const {token} = routeData.params;

  useEffect(() => {
    getBreatheExercises();
  }, []);

  const getBreatheExercises = () => {
    MentalServices.getBreatheExercises(token).then(response => {
      if (response.data.code === 200) {
        setExercises(response.data?.data);
      }
    });
  };

  const renderExercise = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          switch (item?.type) {
            case 'EqualBreath':
              navigation.navigate(route.MENTALEQUALBREATHING, {
                token,
                exerciseId: item?._id,
              });
              break;
            case 'BoxBreathing':
              navigation.navigate(route.MENTALBOXBREATHING, {
                token,
                exerciseId: item?._id,
              });
              break;
            case 'Breathing478':
              navigation.navigate(route.MENTAL478BREATHING, {
                token,
                exerciseId: item?._id,
              });
              break;
            default:
              break;
          }
        }}
        style={styles.exerciseContainer}>
        <SvgUri uri={item?.image} width={'80%'} />
        <Text style={styles.exerciseText}>{item?.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.breathe}>
        Breathing <Text style={styles.exercise}>Exercises</Text>
      </Text>
      {exercises.length === 0 && <Loader />}
      <FlatList
        data={exercises}
        keyExtractor={item => item?._id}
        renderItem={renderExercise}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MentalBreatheHome;
