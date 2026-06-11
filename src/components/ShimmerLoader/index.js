import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ShimmerLoader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.shimmerImage}></ShimmerPlaceHolder>
      <View>
        <ShimmerPlaceHolder style={styles.text1}></ShimmerPlaceHolder>
        <ShimmerPlaceHolder style={styles.text2}></ShimmerPlaceHolder>
      </View>
    </View>
  );
};

export default ShimmerLoader;

const styles = StyleSheet.create({
  shimmerContainer: {
    height: 120,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 5,
    padding: 12,
  },
  shimmerImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
  },
  text1: {
    width: 70,
    height: 20,
  },
  text2: {
    width: 200,
    height: 20,
    marginTop: 5,
  },
});
