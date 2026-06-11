import React, { Component } from 'react';
import Lottie from 'lottie-react-native';
import { View, Text } from 'react-native';
import { Container, Icon, Loader } from '../../../../components';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {  SCREEN_HEIGHT, } from '../../../../lib/utils/constants';
import { MentalServices, } from '../../../../services';
import { connect } from 'react-redux';
import style from './style';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../../redux/actions/auth';

class MentalExerciseStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getMentalMoods();
  };

  getMentalMoods = () => {
    MentalServices.getExerciseQuestionStats(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({ data: res.data.data, loading: false });
        }
      })
      .catch(err => {
      });
  };

  render() {
    const { data } = this.state
    return (
      <Container>

        {this.state.loading ?
          <Loader /> :
          <View style={{ backgroundColor: 'white', height: SCREEN_HEIGHT }}>
            <View style={{ width: 250, height: 250, alignSelf: 'center' }}>
              <Lottie
                source={require('../../../../assets/animation/sleep.json')}
                autoPlay
                loop
              />
            </View>

            <View style={{ paddingHorizontal: '5%' }}>
              <Text style={style.blackText}>Streaks</Text>

              <View
                style={{
                  padding: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  height: 60,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                }}>
                <Text style={styles.textStyleMenu}>{'Total Entries'}</Text>
                <Text style={styles.textStyleMenu}>{data?.totalEntries}</Text>
              </View>

              <View
                style={{
                  padding: 10,
                  height: 60,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                }}>
                <Text style={styles.textStyleMenu}>{'Current Streak'}</Text>
                <Text style={styles.textStyleMenu}>{data?.currentStreak}</Text>
              </View>

              <View
                style={{
                  padding: 10,
                  height: 60,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                }}>
                <Text style={styles.textStyleMenu}>{'Weekly Entries'}</Text>
                <Text style={styles.textStyleMenu}>{data?.weekly_entries}</Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  height: 60,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
                }}>
                <Text style={styles.textStyleMenu}>{'Weekly Average'}</Text>
                <Text style={styles.textStyleMenu}>{data?.weekly_average}</Text>
              </View>

            </View>

          </View>
        }

      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MentalExerciseStats);
