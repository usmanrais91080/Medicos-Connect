import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../lib/utils/constants';

// let loadText=["Stay tuned for more!",
//     "No worries, just wait.",
//     "Hey there, don’t quit too early!",
//     "Some things are worth waiting!",
//     "Can’t wait? Take some rest! ",
//     "Waiting is not that hard, you got this!",
//     "Patience is sweet fellas!",
//     "Something incredible is waiting for you!",
//     "Don’t quit just yet. Magical things are on their way!",
//     "We’re almost done!"
//     ];
let loadText = [
  'We’re almost done!',
  'HODL (not hold)!',
  'Have a good day!',
  'Drink water!',
  'We are testing your patience!',
  'Have you lost weight!',
  'You look Stunning today!',
  'When nothing is going right, go left',
  'We are walking the dog, please wait!',
  'Winter is coming!',
  'Feel free to spin in your chair!',
  'Help, I am trapped in a loader!',
  'How about this weather, eh!',
  'Still faster than windows update!',
  'We are working really hard …. Really!',
  'Feeding unicorn!',
  'Please wait, the minions are working!',
  'Waking up the minions!',
  'Loads of choices!',
  'Be bold!',
  'Love yourself!',
  'Have some me time!',
  'Dreams come true!',
  'Empowering Medicos!',
  'You are breath taking, Keanu Reeves!',
  'Don’t look up! You did, didn’t you!',
  'Knock knock',
  'Have you met ted!',
];

const Loader = props => {
  let loadIndex = Math.floor(Math.random() * 28);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/gifs/loader.gif')}
        style={styles.gif}
      />
      <Text style={styles.textLoad}>{loadText[loadIndex]}</Text>
      {/* <ActivityIndicator size="small" color={props.color ? `${props.color}` : 'black'} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  gif: {
    width: 100,
    height: 100,
  },
  textLoad: {
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_LARGE,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
});
export default Loader;
