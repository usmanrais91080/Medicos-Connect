import React, {Component} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Button, Container} from '../../../../components';
import Heart from '../../../../assets/svg/edu.svg';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authActions} from '../../../../redux/actions/auth';
import {EducationServices} from '../../../../services';
import { VerticalSpacer } from '../../../../lib/utils/global';

class ConnectWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  switchMode = mode => {
    console.log(mode);
    let data = {
      mode: mode,
    };
    this.setState({loading: true});
    EducationServices.setMode(data, this.props.user.userData.token)
      .then(res => {
        console.log(res.data);
        this.props.authActions.getUserProfile(
          {token: this.props.user.userData.token},
          '',
          '',
        );
        this.setState({loading: false});
        if (mode == 'Student') {
          this.props.navigation.navigate(route.EDUCATIONDISCLAIMER, {
            teacher: false,
          });
        } else {
          this.props.navigation.navigate(route.EDUCATIONDISCLAIMER, {
            teacher: true,
          });
        }
      })
      .catch(err => {
        console.log('err : ', err);
        this.setState({loading: false});
      });
  };

  render() {
    return (
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}>
          <View style={styles.container}>
            <View style={styles.svgContainer}>
              <Heart />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Welcome to Education</Text>
              {/* <Text style={styles.desc}>Tune in to find the best classrooms; share your knowledge or receive online education from our entrusted Medicos around the globe!</Text> */}
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.desc}>Select mode</Text>
              {VerticalSpacer()}
              {VerticalSpacer()}
              <Button
                loading={this.state.loading}
                brown
                black
                title={'Student'}
                onPress={() => this.switchMode('Student')}
              />
              {VerticalSpacer()}
              {VerticalSpacer()}
              <Button
                loading={this.state.loading}
                black
                brownBorder
                title={'Teacher'}
                onPress={() => this.switchMode('Teacher')}
              />
              <Text style={styles.desc}>
                You can change mode in settings as well
              </Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWelcome);
