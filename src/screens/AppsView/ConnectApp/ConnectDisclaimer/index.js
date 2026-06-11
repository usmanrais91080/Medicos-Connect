import React, {Component} from 'react';

import {ScrollView, StatusBar, Text, View} from 'react-native';
import {Button, Container} from '../../../../components';

import styles from './style';
import {route} from '../../../../lib/utils/constants';

export default class ConnectDisclaimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container color>
        <StatusBar backgroundColor={'white'} />
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Disclaimer</Text>
              <Text style={styles.desc}>
                Medicos Connect, as the name suggests, is primarily a platform
                that promotes new connections. Connect has two functionalities;
                Bff and Dating. We try to find the best matches for you
                according to the set preferences and maximum transparency.
                However, to ensure that everyone’s having a good time swiping
                through the options, we have come up with a set of rules,
                discussed below:
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bulletpoint}>
                {`1. Be kind: Please, be kind to everyone throughout the platform. Remember, that the prime target of human connection is to eliminate loneliness. We wish and want everyone to be happy with the connections they form through this platform.\n\n2. Abuse/Foul Language: Change is inevitable, however, we want everyone to be patient and gentle when facing a turn down. Please, don’t abuse or use foul language for anyone.
                               \n3. Threats: Regardless of whatsoever reason one might have, threatening someone directly, or indirectly is strictly prohibited. If you feel threatened, unsafe, or spied on by anyone on this platform, be sure to report them.
                               \n4. Personal Information: Don’t share your personal information with anyone. If someone does, we believe that it is another person’s ethical responsibility to keep it private. Violating someone’s privacy through Connect is prohibited.
                               \n5. Explicit content: No explicit images shall be shared throughout the app.`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.desc,{marginTop:'2%'}]}>
                If you find a person violating any of the aforementioned rules,
                or doing anything that’s causing harm, disturbance on the app,
                please report them.
              </Text>
            </View>

          </View>
          <View style={styles.btnContainer}>
              <Button
                title={'Continue'}
                red
                onPress={() =>
                  this.props.navigation.navigate(route.CONNECTPROFILE1ST, {
                    mode: this.props?.route?.params?.mode,
                    prev_screen: this.props.route?.params?.prev_screen,
                  })
                }
              />
            </View>
      </Container>
    );
  }
}
