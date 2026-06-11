import React, {Component} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Button, Container} from '../../../../components';
import Lottie from 'lottie-react-native';
import styles from './style';
import {route} from '../../../../lib/utils/constants';

export default class MentalWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}>
          <View style={styles.container}>
            <View style={styles.svgContainer}>
              <Lottie
                source={require('../../../../assets/animation/sleep.json')}
                autoPlay
                loop
              />

              {/* <Image
                source={require('../../../../assets/gifs/loader.gif')}
                style={styles.gif}
              /> */}
            </View>
            <View style={styles.textContainer}>
              {/* <Text style={styles.heading}>Welcome to Classified</Text> */}
              <Text style={styles.desc}>
                Here to go through your mental health
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button
                yellow
                title={'Continue'}
                onPress={() =>
                  this.props.navigation.replace(route.MENTALSETTINGS, {
                    prev_screen: 'Home',
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
