import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Icon from '../../../../../components/Icon';
import themeStyle from '../../../../../assets/styles/theme.style';
import {useRoute} from '@react-navigation/native';
import {MentalServices} from '../../../../../services';
import * as Progress from 'react-native-progress';
import {SCREEN_WIDTH} from '../../../../../lib/utils/constants';
import Sound from 'react-native-sound';

const Mental478Breathing = () => {
  const routeData = useRoute();
  const circleScale = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('Unwind for a better sleep');
  const [finished, setFinished] = useState(false);
  const [relax, setRelax] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const {token, exerciseId} = routeData.params;
  const sound = new Sound(
    require('../../../../../assets/sounds/snoring.mp3'),
    '',
    error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
    },
  );

  useEffect(() => {
    return () => {
      sound.stop(() => {
        sound.release();
      });
    };
  }, []);

  const phaseDurations = {
    'Breathe In': 4,
    'Hold your breath': 7,
    'Breathe Out': 8,
  };

  const phaseBars = {
    'Breathe In': 4,
    'Hold your breath': 7,
    'Breathe Out': 8,
  };

  const [progressColors, setProgressColors] = useState({
    'Breathe In': Array(4).fill(themeStyle.ORANGE_LIGHT),
    'Hold your breath': Array(7).fill(themeStyle.ORANGE_LIGHT),
    'Breathe Out': Array(8).fill(themeStyle.ORANGE_LIGHT),
  });

  const resetProgressColors = phase => {
    setProgressColors(prevColors => ({
      ...prevColors,
      [phase]: Array(phaseBars[phase]).fill(themeStyle.ORANGE_LIGHT),
    }));
  };

  const startRelaxation = () => {
    setRelax(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.5,
          duration: 1754.28,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 0.8,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    setTimeout(() => {
      setRelax(false);
      startAnimation();
      sound.play(success => {
        if (!success) {
          console.log('Sound playback failed');
        }
        sound.release();
      });
    }, 5754);
  };

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setPhase('Breathe In');
    setTimer(0);
    setProgressIndex(0);
    resetProgressColors('Breathe In');

    Animated.loop(
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.5,
          duration: phaseDurations['Breathe In'] * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(phaseDurations['Hold your breath'] * 1000),
        Animated.timing(circleScale, {
          toValue: 0.8,
          duration: phaseDurations['Breathe Out'] * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const phaseTimeout = setTimeout(() => {
        setPhase(prevPhase => {
          let nextPhase;
          if (prevPhase === 'Breathe In') {
            nextPhase = 'Hold your breath';
          } else if (prevPhase === 'Hold your breath') {
            nextPhase = 'Breathe Out';
          } else {
            nextPhase = 'Breathe In';
          }
          setProgressIndex(0);
          resetProgressColors(nextPhase);
          return nextPhase;
        });
      }, phaseDurations[phase] * 1000);

      return () => clearTimeout(phaseTimeout);
    }
  }, [isAnimating, phase]);

  useEffect(() => {
    if (phase in phaseBars && isAnimating) {
      if (progressIndex < phaseBars[phase]) {
        const progressInterval = setInterval(() => {
          setProgressIndex(prevIndex => prevIndex + 1);
        }, 1000);

        return () => clearInterval(progressInterval);
      }
    }
  }, [phase, progressIndex, isAnimating]);

  useEffect(() => {
    if (phase in progressColors && isAnimating) {
      setProgressColors(prevColors => {
        const newColors = {...prevColors};
        if (progressIndex < phaseBars[phase]) {
          newColors[phase][progressIndex] = themeStyle.COLOR_YELLOWISH;
        }
        return newColors;
      });
    }
  }, [progressIndex, phase, isAnimating]);

  const createSession = () => {
    MentalServices.createBreathSession(token, {
      breathExcerciseId: exerciseId,
    }).then(response => {
      if (response.data.code === 200) {
        setFinished(true);
        setIsAnimating(false);
      }
    });
  };

  useEffect(() => {
    if (timer >= 60) {
      setTimer(0);
      setIsAnimating(false);
      setPhase('Breathe In');
      setProgressIndex(0);
      resetProgressColors('Breathe In');
      createSession();
    }
  }, [timer]);

  const progressViews = useMemo(
    () =>
      progressColors[phase]?.map((color, index) => (
        <View key={index} style={[styles.progress, {backgroundColor: color}]} />
      )),
    [progressColors, phase],
  );

  if (finished) {
    return (
      <View style={styles.finishedView}>
        <Text style={styles.congratulations}>
          We hope this exercise helped bring you some calm.
        </Text>
        <Text style={styles.workoutComplete}>
          If you're still feeling overwhelmed, it's okay to seek for medical
          support—consider reaching out to a helpline or talking to someone you
          trust.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.breathe}>
        4-7-8 <Text style={styles.exercise}>Breathing</Text>
      </Text>
      <ScrollView>
        <View style={styles.circleContainer}>
          <Text style={styles.timer}>
            {isAnimating
              ? `${Math.floor(timer / 60)
                  .toString()
                  .padStart(2, '0')}:${(timer % 60)
                  .toString()
                  .padStart(2, '0')}`
              : !relax
              ? 'Start'
              : 'Relax'}
          </Text>
          <Animated.View
            style={[styles.circle, {transform: [{scale: circleScale}]}]}
          />
          <View style={styles.progressBar}>
            <Progress.Circle
              progress={timer / 60}
              size={SCREEN_WIDTH * 0.8}
              thickness={10}
              color={themeStyle.PURPLE_COLOR}
              borderColor={themeStyle.ORANGE_LIGHT}
              strokeCap={'round'}
              borderWidth={0}
            />
          </View>
        </View>
        <Text style={styles.phase}>{phase}</Text>
        {progressViews && (
          <View style={styles.progressContainer}>{progressViews}</View>
        )}
        {!isAnimating && !relax && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              !isAnimating ? startRelaxation() : setIsAnimating(false)
            }>
            {!isAnimating ? (
              <Icon.FontAwesome5
                name={'play'}
                size={30}
                color={themeStyle.COLOR_WHITE}
              />
            ) : (
              <Icon.Foundation
                name={'pause'}
                size={40}
                color={themeStyle.COLOR_WHITE}
              />
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Mental478Breathing;
