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
            <View style={styles.textContainer}>
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
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Disclaimer</Text>
              <Text style={styles.bulletpoint}>
                1. Authenticity: We are all down for expression. However, we
                want you to post, and share things that are authentic. We don’t
                support pirated content, nor anything that is untruthful.
              </Text>
              <Text style={styles.bulletpoint}>
                2. Hate Speech: We are absolutely intolerant towards any kind of
                hate speech. Whether it is against any political, ethnic, or
                religious group. Abusing, threatening, and being unkind is
                prohibited..
              </Text>

              <Text style={styles.bulletpoint}>
                3. Anti-bullying: We believe everyone is entitled to having
                rights and dignity, and strongly condemn the bullying culture.
                No harassment will be tolerated, for whatsoever reason.
              </Text>
              <Text style={styles.bulletpoint}>
                4. Sensitive content: We filter offensive, upsetting and graphic
                content. This includes content that is sexually abusive or
                related to drugs and arms etcetera.
              </Text>
              <Text style={styles.bulletpoint}>
                5. Explicit content: We are against explicit content being sent
                with/without consent on this app. This involves nude
                imagery/videos, pornographic content, etcetera. Content that is
                intimidating, boycotting or silencing people or specific ideas
                is not allowed to be published.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.desc}>
                We highly value our users, and want them to have the best in-app
                experience. While our team is constantly working on ensuring
                that, mishaps can still happen. Please, report any account, or
                posts that seem offending, or go against our policies and
                standards.
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button
                title={'Continue'}
                sky
                // onPress={() =>
                //   this.props.navigation.navigate(route.CONNECTPROFILE1ST, {
                //     mode: this.props?.route?.params?.mode,
                //     prev_screen: this.props.route?.params?.prev_screen,
                //   })
                // }
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
