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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}
        >
          <View style={styles.container}>
            {/* <View style={styles.svgContainer}>
                            <Heart />
                        </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Welcome to MC Edu</Text>
              <Text style={styles.desc}>
                Tune in to find the best classrooms; share your knowledge or
                receive online education from our entrusted Medicos around the
                globe!
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Disclaimer</Text>
              <Text style={styles.bulletpoint}>
                1. Respect everyone: We believe that mutual respect and empathy
                is the key to success. We have strict policies against anyone
                who seems to be a threat to anyone’s safety and dignity, online
                and offline.
              </Text>
              <Text style={styles.bulletpoint}>
                2. Be Considerate: Online learning requires patience from both
                ends. We believe both teachers and students should be
                considerate while being in a class.
              </Text>

              <Text style={styles.bulletpoint}>
                3. Illegal Activities: Any kind of illegal activities are
                prohibited using MC Edu. Anyone who is found doing so, will be
                permanently banned from the app.
              </Text>
              <Text style={styles.bulletpoint}>
                4. Hate speech: No kind of hate speech is permitted, during the
                class or afterwards. Anything that incites hate, violence,
                against an individual group based on their race, ethnicity,
                disability, language, or any other characteristic that is
                associated with marginalization and discrimmination is strictly
                prohibited.
              </Text>
              <Text style={styles.bulletpoint}>
                5. Personal Information: We prohibit sharing of personal and
                confidential information without authorization. This includes
                all kinds of personal information, such as security numbers,
                bank account information, credit card numbers, images of
                signatures, etcetera.
              </Text>
              <Text style={styles.bulletpoint}>
                6. Regulated goods/services: Selling, advertising, and
                facilitating the sale of regulated goods through MC Edu is also
                strictly prohibited.
              </Text>
              <Text style={styles.bulletpoint}>
                7. Spam: Do not spam during or after the classes. This includes
                all unwanted promotional, commercial, automated, repetitive,
                solicitation or nonsensical content.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.desc}>
                If you find someone breaking any of the rules mentioned above,
                please report the issue to us. We will take strict and immediate
                action against anyone who is a threat to any of the community
                standards.
              </Text>
            </View>
            {/* <View style={styles.textContainer}>
            <Text style={styles.heading2}>Placeholder content for details of every class:</Text>
              <Text style={styles.desc}>
                Mention all the details your students should know about this
                class before they enroll. Tell them how they will benefit from
                your class.
              </Text>
            </View> */}
            <View style={styles.btnContainer}>
              <Button
                parrot
                title={'Continue'}
                onPress={() => {
                  this.props.navigation.navigate(
                    route.EDUCATIONGIF,
                    this.props.route?.params?.teacher,
                  );
                  // if (this.props.route?.params?.teacher) {
                  //   this.props.navigation.navigate(route.EDUCATIONTEACHER);
                  // } else {
                  //   this.props.navigation.navigate(route.EDUCATIONSTUDENT);
                  // }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
