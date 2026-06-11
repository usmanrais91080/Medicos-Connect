import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Button, Container, Input, Icon } from '../../../../components';

import Career from '../../../../assets/svg/careerwelcome.svg';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import { route, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { VerticalSpacer } from '../../../../lib/utils/global';
import { connectActions } from '../../../../redux/actions/connect';
import { authActions } from '../../../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import commonStyle from '../../../../assets/styles/common.style';

class ConnectProfile2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: [...this.props.connectInterests.hobbies],
      lifeStyle: [...this.props.connectInterests.lifestyles],
      personailty: [...this.props.connectInterests.personalities],
      likes: [...this.props.connectInterests.likes],
      job: '',
      selectedLikes: [],
      selectedPersonality: [],
      selectedHobbies: [],
      selectedLifeStyle: [],
      certifcate: '',
      ielts: true,
      toefl: false,
      submit: false,
      oet: false,
      counter: 0,
      selectdPref: [],
      preferences: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      preferences: this.props.connectInterests.connectPersonalJudgement,
    });
  };

  renderhobbies = (item, index) => {
    let count = this.state.counter;
    let select = this.state.selectdPref;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={
            this.state.counter < 5 ||
              item.comparison_one.selected == 1 ||
              item.comparison_two.selected == 1
              ? false
              : true
          }
          onPress={() => {
            let array = [...this.state.preferences];
            if (select.includes(index)) {
              if (array[index].comparison_one.selected == 1) {
                select = select.filter(item => item != index);
                array[index].comparison_one = {
                  ...array[index].comparison_one,
                  selected: 0,
                };
                array[index].comparison_two = {
                  ...array[index].comparison_two,
                  selected: 0,
                };
                if (count != 0) {
                  count = count - 1;
                }
              } else {
                array[index].comparison_one = {
                  ...array[index].comparison_one,
                  selected: 1,
                };
                array[index].comparison_two = {
                  ...array[index].comparison_two,
                  selected: 0,
                };
                select = [...select, index];
              }
            } else {
              array[index].comparison_one = {
                ...array[index].comparison_one,
                selected: 1,
              };
              array[index].comparison_two = {
                ...array[index].comparison_two,
                selected: 0,
              };
              if (count < 5) {
                count = count + 1;
              }
              select = [...select, index];
            }

            this.setState({
              preferences: array,
              counter: count,
              selectdPref: select,
            });
          }}
          key={index.toString()}
          style={{ width: SCREEN_WIDTH * 0.4 }}>
          <View
            style={
              item.comparison_one.selected == 1
                ? styles.textContainer
                : styles.textContainer1
            }>
            <Text
              style={
                item.comparison_one.selected == 1
                  ? styles.whiteText
                  : styles.grayText
              }>
              {item.comparison_one.name}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.grayText}>or</Text>
        <TouchableOpacity
          disabled={
            this.state.counter < 5 ||
              item.comparison_two.selected == 1 ||
              item.comparison_one.selected == 1
              ? false
              : true
          }
          onPress={() => {
            let array = [...this.state.preferences];

            if (select.includes(index)) {
              if (array[index].comparison_two.selected == 1) {
                select = select.filter(item => item != index);
                array[index].comparison_one = {
                  ...array[index].comparison_one,
                  selected: 0,
                };
                array[index].comparison_two = {
                  ...array[index].comparison_two,
                  selected: 0,
                };
                if (count != 0) {
                  count = count - 1;
                }
              } else {
                array[index].comparison_one = {
                  ...array[index].comparison_one,
                  selected: 0,
                };
                array[index].comparison_two = {
                  ...array[index].comparison_two,
                  selected: 1,
                };
                select = [...select, index];
              }
            } else {
              array[index].comparison_one = {
                ...array[index].comparison_one,
                selected: 0,
              };
              array[index].comparison_two = {
                ...array[index].comparison_two,
                selected: 1,
              };
              if (count < 5) {
                count = count + 1;
              }
              select = [...select, index];
            }
            this.setState({
              preferences: array,
              counter: count,
              selectdPref: select,
            });
          }}
          key={index.toString()}
          style={{ width: SCREEN_WIDTH * 0.4 }}>
          <View
            style={
              item.comparison_two.selected == 1
                ? styles.textContainer
                : styles.textContainer1
            }>
            <Text
              style={
                item.comparison_two.selected == 1
                  ? styles.whiteText
                  : styles.grayText
              }>
              {item.comparison_two.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleContinue = () => {
    const { religion, gender, images, about, mode, prev_screen } =
      this.props?.route?.params;
    let preferencesArray = [];
    this.state.preferences.map(item => {
      console.log('item : ', item);
      if (
        item.comparison_one.selected == 1 ||
        item.comparison_two.selected == 1
      ) {
        if (item.comparison_one.selected == 1) {
          preferencesArray.push(item.comparison_one._id);
        } else {
          preferencesArray.push(item.comparison_two._id);
        }
      }
    });
    console.log('preferencesArray : ', preferencesArray);
    if (preferencesArray.length != 0) {
      this.props.navigation.navigate(route.CONNECTPROFILE3RD, {
        mode,
        images,
        about,
        religion,
        gender,
        preferences: preferencesArray,
        prev_screen,
      });
    } else {
      this.setState({ submit: true });
    }
    // let lifeStyleArray = []
    // this.state.lifeStyle.map((item) => {
    //     if (item.selected) {
    //         lifeStyleArray.push(item._id)
    //     }
    // })
    // let personailtyArray = []
    // this.state.personailty.map((item) => {
    //     if (item.selected) {
    //         personailtyArray.push(item._id)
    //     }
    // })
    // let likesArray = []
    // this.state.likes.map((item) => {
    //     if (item.selected) {
    //         likesArray.push(item._id)
    //     }
    // })
    // if (likesArray.length && personailtyArray.length && lifeStyleArray.length && hobbiesArray.length) {

    // personality: personailtyArray, lifeStyle: lifeStyleArray, hobbies: hobbiesArray
    // }
    // else {
    //     this.setState({ selectedLikes: likesArray, selectedPersonality: personailtyArray, selectedHobbies: hobbiesArray, selectedLifeStyle: lifeStyleArray, submit: true })
    // }
  };

  render() {
    console.log('Pref>>>>>', this.state.selectdPref);
    const {
      counter,
      likes,
      personailty,
      lifeStyle,
      preferences,
      hobbies,
      selectedPersonality,
      selectedLikes,
      selectedLifeStyle,
      selectedHobbies,
      submit,
    } = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: '30%' }}>

            <View style={{ marginHorizontal: '2.5%' ,marginTop:"5%"}}>
              <Text style={styles.headingText}>Build your <Text style={{ ...styles.headingText, color: themeStyle.PINK, fontFamily: themeStyle.FONT_BOLD }}>profile</Text></Text>
              <View style={styles.rowContainer}>
                <Text style={styles.heading}>Who are you</Text>
                <Text style={styles.heading}>{counter}/5</Text>
              </View>
              <Text style={{ ...styles.desc, marginRight: '15%', marginTop: "5%", }}>
                Passions makes it easier to find who shares your interests.
              </Text>
              <Text style={{ ...styles.desc, marginRight: '5%' }}>Add
                1-5 to your profile to make better connections
              </Text>
              <View style={styles.inputConttainer}>
                <Text style={styles.heading1}>Preferences</Text>
                <FlatList
                  data={preferences}
                  // numColumns={0}
                  renderItem={({ item, index }) =>
                    this.renderhobbies(item, index)
                  }
                  contentContainerStyle={{ paddingTop: '5%' }}
                  keyExtractor={item => item.name}
                  ItemSeparatorComponent={VerticalSpacer}
                />
                {submit ? (
                  <Text style={commonStyle.errorText}>
                    Please select at least one from above.
                  </Text>
                ) : null}
              </View>
              {/* <View style={styles.inputConttainer}>
                                <Text style={styles.heading1}>Lifestyle</Text>
                                <FlatList data={lifeStyle}
                                    numColumns={0}
                                    renderItem={({ item, index }) => this.renderLifeStyle(item, index)}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={item => item.name}
                                    ItemSeparatorComponent={VerticalSpacer} />
                                {
                                    submit && !selectedLifeStyle.length ? <Text style={commonStyle.errorText}>Please select at least one lifeStyle.</Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.inputConttainer}>
                                <Text style={styles.heading1}>Personality</Text>
                                <FlatList data={personailty}
                                    numColumns={0}
                                    renderItem={({ item, index }) => this.renderPersonality(item, index)}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={item => item.name}
                                    ItemSeparatorComponent={VerticalSpacer} />
                                {
                                    submit && !selectedPersonality.length ? <Text style={commonStyle.errorText}>Please select at least one personality.</Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.inputConttainer}>
                                <Text style={styles.heading1}>Likes</Text>
                                <FlatList data={likes}
                                    numColumns={0}
                                    renderItem={({ item, index }) => this.renderLikes(item, index)}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={item => item.name}
                                    ItemSeparatorComponent={VerticalSpacer} />
                                {
                                    submit && !selectedLikes.length ? <Text style={commonStyle.errorText}>Please select at least one liking tag.</Text>
                                        :
                                        null
                                }
                            </View> */}
            </View>
            <View style={styles.rowContainer2}>
              <View style={styles.lightDash}></View>
              <View style={{ width: 10 }}></View>
              <View style={styles.darkDash}></View>
              <View style={{ width: 10 }}></View>
              <View style={styles.lightDash}></View>
              <View style={{ width: 10 }}></View>
              <View style={styles.lightDash}></View>
            </View>
            <View style={ [styles.rowContainer, styles.margin, { marginVertical: '7%' }] }>
                  <TouchableOpacity
                    onPress={ () => this.props.navigation.pop() }
                    style={ styles.back }>
                    <Text style={ styles.grayText }>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={ () => this.handleContinue() }
                    style={ styles.next }>
                    <Text style={ styles.grayText }>Next</Text>
                  </TouchableOpacity>
                </View>
            {/* <View style={styles.btnContainer}>

              <Button
                connect
                titleColor={"#000"}
                title={'Next'}
                onPress={() => this.handleContinue()}
              />
            </View> */}
          </ScrollView>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return { connectInterests: state.connectReducer || {} };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    connectActions: bindActionCreators(connectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectProfile2nd);
