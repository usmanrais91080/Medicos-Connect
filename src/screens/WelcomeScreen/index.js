import React, {Component} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {Button} from '../../components';
import {route} from '../../lib/utils/constants';
import {VerticalSpacer} from '../../lib/utils/global';
import Social from '../../assets/svg/social.svg';
import Education from '../../assets/svg/education.svg';
import Connect from '../../assets/svg/connect.svg';
import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';

import styles from './style';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          image: <Social />,
          desc: 'Social media platform for the healthcare community. Connect with fellows, learn from mentors, and engage in meaningful conversations.',
        },
        {
          image: <Connect />,
          desc: 'Dating platform for the healthcare community. Match and date within your community.',
        },
        {
          image: <Classified />,
          desc: 'A marketplace for medical professionals. Looking to buy or sell your preloved items, books or medical equipment, Use classified',
        },
        {
          image: <Career />,
          desc: 'Access global jobs and scholarships, posted directly for the healthcare community.',
        },
        {
          image: <Education />,
          desc: 'Online education module for the healthcare community. Join live classes and learn from experts.',
        },

        {
          image: <Wallet />,
          desc: 'Book-keeping module for the healthcare community. Manage expenses, create financial goals, and track savings.',
        },
        {
          image: <Mee />,
          desc: 'Self-guided therapy programs for healthcare community. Take control of your life and achieve mental health goals.',
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={themeStyle.COLOR_WHITE}
          barStyle={'dark-content'}
        />
        <Text style={styles.headingStyle}>Welcome</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={VerticalSpacer}
          data={this.state.data}
          renderItem={({item, index}) => {
            return (
              <View style={styles.rowContainer}>
                <View style={styles.boxView}>{item.image}</View>
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>{item.desc}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={'Continue'}
            customColor={themeStyle.BLUE}
            height={60}
            onPress={() => navigation.replace(route.GENERALPROFILE)}
          />
        </View>
      </View>
    );
  }
}
