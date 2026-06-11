import React, {Component} from 'react';
import {ScrollView, StatusBar, TouchableOpacity} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';
import {View, Text} from 'react-native';
import {
  Button,
  Container,
  HeaderLeft,
  Icon,
  Input,
} from '../../../../components';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export default class ConnectAdvanceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: true,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Filters</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>
            {this.props.route?.params?.bff ? 'BFF' : 'Dating'}
          </Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft color navigation={this.props.navigation} />;
  };

  render() {
    const {experience} = this.state;
    return (
      <Container color>
        <StatusBar backgroundColor={'white'} />
        <View style={styles.container}>
          <View style={{flex: 0.8, marginHorizontal: '5%', marginTop: '5%'}}>
            <KeyboardAwareScrollView>
              {' '}
              showsVerticalScrollIndicator={false}>
              <View style={styles.filterStyle}>
                <Text style={styles.headingStyle}>{'2 filters left'}</Text>
              </View>
              <Text style={styles.addFilter}>Add up to two free filters</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>Verified Profile only</Text>
                <ToggleSwitch
                  animationSpeed={3}
                  isOn={experience}
                  onColor={'#38474F'}
                  offColor={themeStyle.PRIMARY_TINT_COLOR}
                  label=""
                  thumbOffStyle={{backgroundColor: '#fff'}}
                  thumbOnStyle={{backgroundColor: '#FF6B6B'}}
                  labelStyle={styles.labelStyle}
                  size="medium"
                  onToggle={isOn => this.setState({experience: isOn})}
                />
              </View>
              <Text style={styles.heading}>What is their religion?</Text>
              <View style={styles.inputConttainer}>
                <Input
                  profile1
                  editable={false}
                  placeholder="Add this filter"
                  rightIcon={
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {}}>
                      <Icon.Entypo name="plus" size={25} color="gray" />
                    </TouchableOpacity>
                  }
                />
              </View>
              <Text style={styles.heading1}>What is their height?</Text>
              <View style={styles.inputConttainer}>
                <Input
                  profile1
                  editable={false}
                  placeholder="Add this filter"
                  rightIcon={
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {}}>
                      <Icon.Entypo name="plus" size={25} color="gray" />
                    </TouchableOpacity>
                  }
                />
              </View>
              <Text style={styles.heading1}>Do they exercise?</Text>
              <View style={styles.inputConttainer}>
                <Input
                  profile1
                  editable={false}
                  placeholder="Add this filter"
                  rightIcon={
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {}}>
                      <Icon.Entypo name="plus" size={25} color="gray" />
                    </TouchableOpacity>
                  }
                />
              </View>
              <Text style={styles.heading1}>Do they smoke?</Text>
              <View style={styles.inputConttainer}>
                <Input
                  profile1
                  editable={false}
                  placeholder="Add this filter"
                  rightIcon={
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {}}>
                      <Icon.Entypo name="plus" size={25} color="gray" />
                    </TouchableOpacity>
                  }
                />
              </View>
              <Text style={styles.heading1}>Do they drink?</Text>
              <View style={styles.inputConttainer}>
                <Input
                  profile1
                  editable={false}
                  placeholder="Add this filter"
                  rightIcon={
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {}}>
                      <Icon.Entypo name="plus" size={25} color="gray" />
                    </TouchableOpacity>
                  }
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
          <View style={styles.btnContainer}>
            <Button
              red
              title={'Set Filters'}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </Container>
    );
  }
}
