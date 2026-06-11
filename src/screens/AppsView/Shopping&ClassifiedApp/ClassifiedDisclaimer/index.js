import React, {Component} from 'react';

import {ScrollView, StatusBar, Text, View} from 'react-native';
import {Button, Container} from '../../../../components';

import styles from './style';
import {route} from '../../../../lib/utils/constants';

export default class SocialDisclaimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container color>
        <StatusBar backgroundColor={'white'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}>
          <View style={styles.container}>
            {/* <View style={styles.textContainer}>
              <Text style={styles.heading}>Disclaimer</Text>
              <Text style={styles.desc}>
                Social is a platform that allows you to post, share, and engage
                with your peers with complete freedom. You may use the platform
                to share your struggles, experiences, and accomplishments with
                others. We are the most vocal proponents of encouraging others
                and assisting one another in achieving their goals. We hope that
                by using this app, we can share love, optimism, and ideas all
                across the world. However, we want everyone to feel safe while
                being here. Following are some points you should always be aware
                of;
              </Text>
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Disclaimer</Text>
              <Text style={styles.bulletpoint}>
                1. The assessment of your item is at your own danger and cost.
              </Text>
              <Text style={styles.bulletpoint}>
                2. No destroying as well as expulsion of any of the parts will be attempted for the assessment of the item.
              </Text>

              <Text style={styles.bulletpoint}>
                3. The assessment is just a visual examination of the item and its parts or parts that are apparent during the investigation.
              </Text>
              <Text style={styles.bulletpoint}>
                4. The Inspection Report is for data purposes just and isn't a guarantee, ensure or a suggestion possibly in support of the acquisition of the examined item.
              </Text>
              <Text style={styles.bulletpoint}>
                5. The Inspection Report isn't an assurance of the precision of the assessed item's condition and will be founded on awesome and unbiased judgment of the specialists at the hour of investigation.
              </Text>
              <Text style={styles.bulletpoint}>
                6. Medicos Classifieds will have no risk at all as for any exchange connected with the deal/acquisition of the investigated item.
              </Text>

              <Text style={styles.bulletpoint}>
                7. The Inspection Report mirrors the state of the item at that point and date of the assessment. We make no portrayals concerning any progressions to the assessed item that happen later the issuance of the Inspection Report.
              </Text>
              <Text style={styles.bulletpoint}>
                8. We assume no liability for any harm that may happen or show up during the assessment or the trial of the item.
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button
                title={'Continue'}
                sky
                onPress={() =>
                  this.props.navigation.navigate(route.CONNECTPROFILE1ST, {
                    mode: this.props?.route?.params?.mode,
                    prev_screen: this.props.route?.params?.prev_screen,
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
