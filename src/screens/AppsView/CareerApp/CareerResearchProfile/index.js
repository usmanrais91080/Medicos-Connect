import React, {Component} from 'react';

import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Container, Icon, Input} from '../../../../components';

import Career from '../../../../assets/svg/careerwelcome.svg';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export default class CareerProfile1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      job: '',
      experience: true,
      ielts: true,
      toefl: false,
      oet: false,
    };
  }

  renderChips(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({tags: this.state.tags.filter((_, i) => i != index)})
          }
          style={styles.minusContainer}>
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {tags, job, experience, toefl, ielts, oet} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingBottom: '30%'}}>
            <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
              <Text style={styles.heading}>Build your Profile</Text>
              <Text style={styles.desc}>Job titles you are interested in</Text>
              <View style={styles.inputConttainer}>
                <Input
                  colorProps
                  value={job}
                  placeholder=""
                  onChangeText={job => this.setState({job: job})}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => {
                        if (job) {
                          let array = [...tags];
                          array.push(job);
                          this.setState({tags: array, job: ''});
                        }
                      }}>
                      <Icon.Entypo name="plus" size={30} color="#1DD1A1" />
                    </TouchableOpacity>
                  }
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <ScrollView horizontal={true}>
                  {tags.map((item, index) => this.renderChips(item, index))}
                </ScrollView>
              </View>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.grayText}>Select Partner</Text>
                  <DropDownPicker
                    items={[]}
                    placeholder=""
                    defaultValue={null}
                    containerStyle={[{width: SCREEN_WIDTH * 0.4}]}
                    style={{}}
                    arrowStyle={styles.arrowStyle}
                    dropDownStyle={{}}
                    arrowSize={20}
                    customArrowDown={(size, color) => (
                      <Icon.FontAwesome
                        name="caret-down"
                        color={'#959FAE'}
                        size={size}
                      />
                    )}
                    customArrowUp={(size, color) => (
                      <Icon.FontAwesome
                        name="caret-up"
                        color={'#959FAE'}
                        size={size}
                      />
                    )}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => {
                      // let array = [...tags];
                      // array.push(item.value)
                      // this.setState({
                      //     tags: array,
                      //     selectedTip: item.value,
                      // })
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.grayText}>Research Domain</Text>
                  <DropDownPicker
                    items={[]}
                    placeholder=""
                    defaultValue={null}
                    containerStyle={[{width: SCREEN_WIDTH * 0.4}]}
                    style={{}}
                    arrowStyle={styles.arrowStyle}
                    dropDownStyle={{}}
                    arrowSize={20}
                    customArrowDown={(size, color) => (
                      <Icon.FontAwesome
                        name="caret-down"
                        color={'#959FAE'}
                        size={size}
                      />
                    )}
                    customArrowUp={(size, color) => (
                      <Icon.FontAwesome
                        name="caret-up"
                        color={'#959FAE'}
                        size={size}
                      />
                    )}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => {
                      // let array = [...tags];
                      // array.push(item.value)
                      // this.setState({
                      //     tags: array,
                      //     selectedTip: item.value,
                      // })
                    }}
                  />
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>Do you have job experience</Text>
                <ToggleSwitch
                  animationSpeed={3}
                  isOn={experience}
                  onColor={'#38474F'}
                  offColor={themeStyle.PRIMARY_TINT_COLOR}
                  label=""
                  thumbOffStyle={{backgroundColor: '#fff'}}
                  thumbOnStyle={{backgroundColor: '#1DD1A1'}}
                  labelStyle={styles.labelStyle}
                  size="medium"
                  onToggle={isOn => this.setState({experience: isOn})}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>Select years of experience</Text>
                <DropDownPicker
                  items={[]}
                  placeholder=""
                  defaultValue={null}
                  containerStyle={styles.dropDownContainer}
                  style={styles.dropDownContainerStyle}
                  arrowStyle={styles.arrowStyle}
                  dropDownStyle={styles.dropDownStyle}
                  arrowSize={20}
                  customArrowDown={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-down"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  customArrowUp={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-up"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  itemStyle={{justifyContent: 'flex-start'}}
                  onChangeItem={item => {
                    // let array = [...tags];
                    // array.push(item.value)
                    // this.setState({
                    //     tags: array,
                    //     selectedTip: item.value,
                    // })
                  }}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>Country</Text>
                <DropDownPicker
                  items={[]}
                  placeholder=""
                  defaultValue={null}
                  containerStyle={[
                    styles.dropDownContainer,
                    {width: SCREEN_WIDTH * 0.45},
                  ]}
                  style={styles.dropDownContainerStyle}
                  arrowStyle={styles.arrowStyle}
                  dropDownStyle={styles.dropDownStyle}
                  arrowSize={20}
                  customArrowDown={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-down"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  customArrowUp={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-up"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  itemStyle={{justifyContent: 'flex-start'}}
                  onChangeItem={item => {
                    // let array = [...tags];
                    // array.push(item.value)
                    // this.setState({
                    //     tags: array,
                    //     selectedTip: item.value,
                    // })
                  }}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>City</Text>
                <DropDownPicker
                  items={[]}
                  placeholder=""
                  defaultValue={null}
                  containerStyle={[
                    styles.dropDownContainer,
                    {width: SCREEN_WIDTH * 0.45},
                  ]}
                  style={styles.dropDownContainerStyle}
                  arrowStyle={styles.arrowStyle}
                  dropDownStyle={styles.dropDownStyle}
                  arrowSize={20}
                  customArrowDown={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-down"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  customArrowUp={(size, color) => (
                    <Icon.FontAwesome
                      name="caret-up"
                      color={'#959FAE'}
                      size={size}
                    />
                  )}
                  itemStyle={{justifyContent: 'flex-start'}}
                  onChangeItem={item => {
                    // let array = [...tags];
                    // array.push(item.value)
                    // this.setState({
                    //     tags: array,
                    //     selectedTip: item.value,
                    // })
                  }}
                />
              </View>
              <View style={styles.margin}>
                <Text style={styles.headingText}>English Language tests</Text>
                <View style={styles.rowContainer1}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({toefl: false, ielts: true, oet: false})
                    }
                    style={styles.row}>
                    <View
                      style={ielts ? styles.selectedbox : styles.box}></View>
                    <Text style={ielts ? styles.selectedOption : styles.option}>
                      IELTS
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({toefl: true, ielts: false, oet: false})
                    }
                    style={[styles.row, {marginLeft: '15%'}]}>
                    <View
                      style={toefl ? styles.selectedbox : styles.box}></View>
                    <Text style={toefl ? styles.selectedOption : styles.option}>
                      TOEFL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({oet: true, toefl: false, ielts: false})
                    }
                    style={[styles.row, {marginLeft: '15%'}]}>
                    <View style={oet ? styles.selectedbox : styles.box}></View>
                    <Text style={oet ? styles.selectedOption : styles.option}>
                      OET
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <DropDownPicker
                items={[]}
                placeholder="Select year"
                placeholderStyle={{
                  fontSize: 10,
                  color: themeStyle.PRIMARY_TINT_COLOR,
                }}
                defaultValue={null}
                containerStyle={[styles.dropDownContainer, {marginTop: '5%'}]}
                style={styles.dropDownContainerStyle}
                arrowStyle={styles.arrowStyle}
                dropDownStyle={styles.dropDownStyle}
                arrowSize={20}
                customArrowDown={(size, color) => (
                  <Icon.FontAwesome
                    name="caret-down"
                    color={'#959FAE'}
                    size={size}
                  />
                )}
                customArrowUp={(size, color) => (
                  <Icon.FontAwesome
                    name="caret-up"
                    color={'#959FAE'}
                    size={size}
                  />
                )}
                itemStyle={{justifyContent: 'flex-start'}}
                onChangeItem={item => {
                  // let array = [...tags];
                  // array.push(item.value)
                  // this.setState({
                  //     tags: array,
                  //     selectedTip: item.value,
                  // })
                }}
              />
            </View>

            <View style={styles.btnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.lightDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.darkDash}></View>
              </View>
              <Button
                green
                title={'Continue'}
                onPress={() =>
                  this.props.navigation.navigate(route.CAREERPROFILE2ND)
                }
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
}
