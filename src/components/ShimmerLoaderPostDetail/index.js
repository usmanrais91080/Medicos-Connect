import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ShimmerLoaderPostDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shimmerContainer}>
        <ShimmerPlaceHolder style={styles.shimmerImage}></ShimmerPlaceHolder>
        <View>
          <ShimmerPlaceHolder style={styles.text1}></ShimmerPlaceHolder>
          <ShimmerPlaceHolder style={styles.text2}></ShimmerPlaceHolder>
        </View>
      </View>
      <ShimmerPlaceHolder style={styles.image} />
      <ShimmerPlaceHolder shimmerStyle={styles.text3}></ShimmerPlaceHolder>
      <ShimmerPlaceHolder shimmerStyle={styles.text3}></ShimmerPlaceHolder>
    </View>
  );
};

export default ShimmerLoaderPostDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    height: 150,
    width: '100%',
    padding: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  shimmerContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 5,
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
    width: '70%',
    height: 20,
    marginTop: 5,
  },
  text3: {
    width: '100%',
    height: 20,
    marginTop: 5,
  },
});
