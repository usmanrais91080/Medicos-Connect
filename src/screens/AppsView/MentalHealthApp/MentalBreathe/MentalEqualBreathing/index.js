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

const EqualBreathingScreen = () => {
  const routeData = useRoute();
  const circleScale = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('Take it easy, relax');
  const [finished, setFinished] = useState(false);
  const [relax, setRelax] = useState(false);
  const [progressColors, setProgressColors] = useState([
    themeStyle.ORANGE_LIGHT,
    themeStyle.ORANGE_LIGHT,
    themeStyle.ORANGE_LIGHT,
    themeStyle.ORANGE_LIGHT,
  ]);
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
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        setProgressIndex(prevIndex => (prevIndex + 1) % 5);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      setProgressIndex(0);
    };
  }, [isAnimating]);

  useEffect(() => {
    if (progressIndex > 3) {
      setProgressIndex(0);
      setProgressColors([
        themeStyle.ORANGE_LIGHT,
        themeStyle.ORANGE_LIGHT,
        themeStyle.ORANGE_LIGHT,
        themeStyle.ORANGE_LIGHT,
      ]);
    }
    if (isAnimating && progressIndex < 4) {
      setProgressColors(prevColors => {
        const newColors = [...prevColors];
        newColors[progressIndex] = themeStyle.COLOR_YELLOWISH;
        return newColors;
      });
    }
  }, [progressIndex, isAnimating]);

  useEffect(() => {
    return () => {
      sound.stop(() => {
        sound.release();
      });
    };
  }, []);

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

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setPhase(prevPhase =>
          prevPhase === 'Breathe In' ? 'Breathe Out' : 'Breathe In',
        );
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, phase]);

  const progressViews = useMemo(
    () =>
      progressColors.map((color, index) => (
        <View key={index} style={[styles.progress, {backgroundColor: color}]} />
      )),
    [progressColors],
  );

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

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setPhase('Breathe In');
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.5,
          duration: 4000,
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
  }, []);

  useEffect(() => {
    if (timer === 60) {
      createSession();
      setTimer(0);
      setIsAnimating(false);
      setPhase('Breathe In');
      setProgressIndex(0);
    }
  }, [timer]);

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
        Equal <Text style={styles.exercise}>Breathing</Text>
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
              strokeCap={'round'}
              borderWidth={0}
            />
          </View>
        </View>
        <Text style={styles.phase}>{phase}</Text>
        <View style={styles.progressContainer}>{progressViews}</View>
        {!isAnimating && !relax && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              !isAnimating ? startRelaxation() : pauseAnimation()
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

export default EqualBreathingScreen;
