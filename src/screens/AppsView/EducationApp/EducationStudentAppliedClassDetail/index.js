import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';

import Search from '../../../../assets/svg/search.svg';
import {
  Button,
  Container,
  HeaderLeft,
  Icon,
  JobsBrowserModeItemComponent,
  JobsPublicAdsItemComponent,
  Tabs,
} from '../../../../components';

import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import themeStyle from '../../../../assets/styles/theme.style';

export default class EducationStudentClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Student'}</Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* <TouchableOpacity onPress={() => { this.setState({ filter: true }) }} style={{ marginLeft: 15 }} ><Search /></TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderCardView = () => {
    return (
      <View style={styles.cardContainer}>
        <ScrollView
          style={{marginTop: '5%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '10%'}}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={{
                uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
              }}
              rounded
              size={120}
            />
            <Text style={styles.titleText}>Username</Text>
            <Text style={styles.designationText}>Qualifications</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.headingText}>Class price:</Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate(route.CAREERJOBDETAIL);
              }}
              style={styles.colorHeadingText}>
              Rs. 5,000
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.headingText}>Class type:</Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate(route.CAREERJOBDETAIL);
              }}
              style={styles.colorHeadingText}>
              Online
            </Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <Text style={styles.headingText}>Details:</Text>
            <Text style={[styles.descText, {marginTop: '2%'}]}>
              {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et */}
            </Text>
          </View>
          {this.state.sent ? (
            <View
              style={[
                styles.rowContainer,
                {marginTop: '29%', marginBottom: '10%'},
              ]}>
              <Icon.Ionicons
                name="md-checkmark-circle"
                size={30}
                color="#99CC66"
              />
              <Text style={styles.colorHeadingText1}>Application Sent</Text>
            </View>
          ) : (
            <View
              style={[
                styles.rowContainer,
                {
                  marginTop: '29%',
                  marginBottom: '10%',
                  justifyContent: 'space-between',
                },
              ]}>
              <Button
                gray
                titleStyle={{color: themeStyle.PRIMARY_TINT_COLOR}}
                width={SCREEN_WIDTH * 0.44}
                title="Chat"
                onPress={() =>
                  this.props.navigation.navigate(route.CHATSCREEN, {
                    data: {
                      name: 'John Doe',
                      seen: false,
                      profile_url:
                        'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
                      last_message: '',
                      last_message_time: '2021-08-12 17:00:00',
                      type: 'Education',
                    },
                  })
                }
              />

              <Button
                parrot
                width={SCREEN_WIDTH * 0.44}
                title="Complete Class"
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  render() {
    const {activeTab} = this.state;
    return (
      <Container>
        <View style={styles.container}>{this.renderCardView()}</View>
      </Container>
    );
  }
}
