import React, {Component} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';

import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/playbtn.svg';
import DropDown from '../../../../assets/svg/drop-down-date.svg';
import {Container, DateModal, Icon, Loader} from '../../../../components';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {BookKeepingServices} from '../../../../services';
import commonStyle from '../../../../assets/styles/common.style';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingCreateGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      goalModal: false,
      expenseModal: false,
      createCategoryModal: false,
      value: '',
      targetAmount: '',
      goalName: '',
      dob: '',
      loading: false,
      date: new Date(),
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
    if (this.props?.route?.params?.data) {
      this.setState({loading: true});
      this.getGoalCategoryById(this.props?.route?.params?.data);
    }
  };

  getGoalCategoryById = id => {
    BookKeepingServices.getGoalCategoryById(id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          goalName: res.data.data.name,
          targetAmount: res.data.data.target_amount,
          date: moment(res.data.data.target_date).format('YYYY-MM-DD'),
          dob: moment(res.data.data.target_date).format('YYYY-MM-DD'),
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  handleCreateGoal = () => {
    const {submit, goalName, targetAmount, dob, date} = this.state;
    if (submit && goalName && targetAmount && dob && date) {
      this.setState({loading: true});
      let data = {
        name: this.state.goalName,
        target_amount: parseInt(targetAmount),
        target_date: this.state.dob,
      };
      BookKeepingServices.createGoalCategory(
        data,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({loading: false});
          this.props.navigation.goBack();
        })
        .catch(err => {
          this.setState({loading: false});
        });
    } else {
      this.setState({submit: true});
    }
  };

  handleUpdateGoal = () => {
    const {submit, goalName, targetAmount, dob, date} = this.state;
    if (submit && goalName && targetAmount && dob && date) {
      this.setState({loading: true});
      let data = {
        name: this.state.goalName,
        target_amount: parseInt(this.state.targetAmount),
        target_date: this.state.dob,
      };
      BookKeepingServices.updateGoalCategory(
        this.props?.route?.params?.data,
        data,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({loading: false});
          this.props.navigation.goBack();
        })
        .catch(err => {
          // console.log(err);
          this.setState({loading: false});
        });
    } else {
      this.setState({submit: true});
    }
  };

  render() {
    const {value, submit, goalName, targetAmount, date, dob, loading} =
      this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Goal Name"
                label="Name"
                labelStyle={{...styles.labelStyle}}
                value={goalName}
                inputContainerStyle={{...styles.inputContainerStyle1}}
                inputStyle={styles.inputStyle1}
                onChangeText={comment => {
                  this.setState({goalName: comment});
                }}
              />
              {submit && !goalName ? (
                <Text style={[commonStyle.errorText, {marginBottom: 10}]}>
                  Please fill this field
                </Text>
              ) : null}
              <Input
                placeholder="$0"
                keyboardType="number-pad"
                label="Target Amount"
                labelStyle={{...styles.labelStyle}}
                value={targetAmount.toString()}
                inputContainerStyle={{...styles.inputContainerStyle1}}
                inputStyle={styles.inputStyle1}
                onChangeText={comment => {
                  this.setState({targetAmount: comment});
                }}
              />
              {submit && !targetAmount ? (
                <Text style={[commonStyle.errorText, {marginBottom: 10}]}>
                  Please fill this field
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={() => this.setState({dateModal: true})}
                style={{...styles.inputContainerStyle}}>
                <Text style={{...styles.labelStyle1}}>Target Date</Text>
                <Text style={styles.inputStyle}>
                  {this.state.dob ? `${this.state.dob}` : 'Select Date'}
                </Text>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: '92%',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: themeStyle.COLOR_BOOK_KEEPING,
                      borderWidth: 2,
                      width: 105,
                      paddingVertical: 14,
                      borderRadius: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text>Month</Text>
                    <DropDown />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: themeStyle.COLOR_BOOK_KEEPING,
                      borderWidth: 2,
                      width: 105,
                      paddingVertical: 14,
                      borderRadius: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text>Day</Text>
                    <DropDown />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: themeStyle.COLOR_BOOK_KEEPING,
                      borderWidth: 2,
                      width: 105,
                      paddingVertical: 14,
                      borderRadius: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text>Year</Text>
                    <DropDown />
                  </TouchableOpacity>
                </View> */}
              </TouchableOpacity>
              {submit && !dob ? (
                <Text style={[commonStyle.errorText, {marginBottom: 10}]}>
                  Please fill this field
                </Text>
              ) : null}
            </View>
            <Button
              titleStyle={{
                color: '#000',
                fontSize: 16,
                textAlign: 'center',
                fontFamily: themeStyle.FONT_REGULAR,
              }}
              onPress={() => {
                this.props?.route?.params?.data
                  ? this.setState({submit: true}, () => this.handleUpdateGoal())
                  : this.setState({submit: true}, () =>
                      this.handleCreateGoal(),
                    );
              }}
              // loading={inviteLoading}
              title={this.props?.route?.params?.data ? 'Edit' : 'Save'}
              iconContainerStyle={{marginHorizontal: 0}}
              buttonStyle={{
                backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                borderRadius: 10,
                height: 45,
                marginHorizontal: '8%',
              }}
            />
          </>
        )}
        <DateModal
          date={this.state.date}
          target
          start
          visible={this.state.dateModal}
          setDate={name => this.setState({date: name})}
          onClose={() => this.setState({dateModal: false})}
          onSave={() =>
            this.setState({
              dateModal: false,
              dob: moment(this.state.date).format('YYYY-MM-DD'),
            })
          }
        />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookKeepingCreateGoal);
