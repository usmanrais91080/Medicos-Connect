import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  Icon,
  JobsBrowserModeItemComponent,
  Tabs,
} from '../../../../components';

import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';

export default class CareerLocums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      bowserMode: [],
    };
  }

  renderCardView = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={120}
          />
          <Text style={styles.titleText}>Company Name</Text>
          <Text style={styles.designationText}>Graphic Designer</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.headingText}>Salary Offered</Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate(route.CAREERLOCUMDETAIL);
            }}
            style={styles.colorHeadingText}
          >
            Apply for details
          </Text>
        </View>
        <View style={{marginTop: '2%'}}>
          <Text style={styles.headingText}>Info:</Text>
          <Text style={[styles.descText, {marginTop: '2%'}]}>
            Software development and UI/UX
          </Text>
          <Text style={styles.descText}>Experience: 10 Years</Text>
          <Text style={styles.descText}>Islamabad</Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate(route.CAREERLOCUMDETAIL);
            }}
            style={[styles.colorText, {marginTop: '2%'}]}
          >
            {' '}
            Read more
          </Text>
        </View>
        {this.state.sent ? (
          <View
            style={[
              styles.rowContainer,
              {marginTop: '15%', marginBottom: '10%'},
            ]}
          >
            <Icon.Ionicons
              name="md-checkmark-circle"
              size={30}
              color="#1DD1A1"
            />
            <Text style={styles.colorHeadingText1}>Application Sent</Text>
          </View>
        ) : (
          <View style={{marginTop: '15%'}}>
            <Text style={[styles.colorText, {textAlign: 'center'}]}>
              Report unmatched job
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(route.CAREERLOCUMDETAIL)
              }
              style={styles.btnContainer}
            >
              <Text style={[styles.whiteText, {textAlign: 'center'}]}>
                Contact
              </Text>
              <View style={styles.gap} />
              <Icon.FontAwesome name="caret-down" color="white" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <JobsBrowserModeItemComponent
          item={item}
          navigation={this.props.navigation}
          locum
        />
      </>
    );
  };

  render() {
    const {activeTab} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <Tabs.ListTabs
            active={activeTab}
            tabs={['Quick Jobs', 'Browse mode']}
            profile
            onTabChange={activeTab => this.setState({activeTab})}
          />
          {activeTab == 0 ? (
            <ScrollView
              style={{marginTop: '5%'}}
              contentContainerStyle={{paddingBottom: '30%'}}
            >
              {this.renderCardView()}
            </ScrollView>
          ) : null}
          {activeTab == 1 ? (
            <ScrollView
              style={{marginTop: '5%'}}
              contentContainerStyle={{
                marginHorizontal: '5%',
                paddingBottom: '30%',
              }}
            >
              <Text style={styles.headingText}>Best Matched</Text>
              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{paddingVertical: '5%'}}
                data={this.state.bowserMode}
                renderItem={({item, index}) =>
                  this._renderBestMatchItem(item, index)
                }
              />
            </ScrollView>
          ) : null}
        </View>
      </Container>
    );
  }
}
