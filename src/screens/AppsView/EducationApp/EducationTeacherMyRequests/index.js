import React, {Component} from 'react';

import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';

import {
  Container,
  EducationStudentAppliedClassItemComponent,
  HeaderLeft,
  Icon,
} from '../../../../components';
import Filter from '../../../../assets/svg/filterSetting.svg';
import Search from '../../../../assets/svg/white-search.svg';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';

import EducationFilter from '../EducationFilter';
import themeStyle from '../../../../assets/styles/theme.style';

export default class EducationTeacherMyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      sent: false,
      filter: false,
      bowserMode: [
        // {
        //   title: 'Username',
        //   location: 'locations',
        //   className: 'Class Name',
        //   type: '1 on 1',
        //   classType: 'Home Tution',
        //   description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
        //   price: 'PKR 5000',
        // },
        // {
        //   title: 'Username',
        //   location: 'locations',
        //   className: 'Class Name',
        //   type: 'Workshop',
        //   classType: 'Online',
        //   description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
        //   price: 'PKR 5000',
        // },
        // {
        //   title: 'Username',
        //   location: 'locations',
        //   className: 'Class Name',
        //   type: '1 on 1',
        //   classType: 'Home Tution',
        //   description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
        //   price: 'PKR 5000',
        // },
        // {
        //   title: 'Username',
        //   location: 'locations',
        //   className: 'Class Name',
        //   type: '1 on 1',
        //   classType: 'Online',
        //   description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
        //   price: 'PKR 5000',
        // },
        // {
        //   title: 'Username',
        //   location: 'locations',
        //   className: 'Class Name',
        //   type: 'Workshop',
        //   classType: 'Online',
        //   description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
        //   price: 'PKR 5000',
        // },
      ],
      any: false,
      workshops: true,
      oneOnOne: false,
      default: false,
      latest: true,
      oldest: false,
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
        <TouchableOpacity style={{marginLeft: 15}}>
          <Search />
        </TouchableOpacity>
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
  _renderAcceptedItem = (item, index) => {
    return (
      <>
        <EducationStudentAppliedClassItemComponent
          teacher
          item={item}
          navigation={this.props.navigation}
        />
      </>
    );
  };

  _renderReciecvedItem = (item, index) => {
    return (
      <>
        <EducationStudentAppliedClassItemComponent
          recieved
          item={item}
          navigation={this.props.navigation}
        />
      </>
    );
  };

  render() {
    const {activeTab} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              marginHorizontal: '5%',
              paddingBottom: '30%',
            }}>
            <View style={styles.chooseModeContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({activeTab: 0});
                }}
                style={
                  activeTab == 0 ? styles.selectedStyle : styles.unSelectedStyle
                }>
                <Text
                  style={
                    activeTab == 0 ? styles.choosedText : styles.unChoosedText
                  }>
                  {'Requests recieved'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({activeTab: 1});
                }}
                style={
                  activeTab == 1 ? styles.selectedStyle : styles.unSelectedStyle
                }>
                <Text
                  style={
                    activeTab == 1 ? styles.choosedText : styles.unChoosedText
                  }>
                  {'Request accepted'}
                </Text>
              </TouchableOpacity>
            </View>
            {activeTab == 0 ? (
              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{paddingVertical: '5%'}}
                data={this.state.bowserMode}
                renderItem={({item, index}) =>
                  this._renderReciecvedItem(item, index)
                }
              />
            ) : null}
            {activeTab == 1 ? (
              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{paddingVertical: '5%'}}
                data={this.state.bowserMode}
                renderItem={({item, index}) =>
                  this._renderAcceptedItem(item, index)
                }
              />
            ) : null}
          </ScrollView>
        </View>
      </Container>
    );
  }
}
