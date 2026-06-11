import React, {Component} from 'react';
import {FlatList, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';

import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/playbtn.svg';

import {Container, DateModal, Icon, Loader} from '../../../../components';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import {BookKeepingServices} from '../../../../services';
import {HorizontalSpacer, moneyFormat} from '../../../../lib/utils/global';
import moment from 'moment';
import {TextPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingCreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeTab: 0,
      goalModal: false,
      expenseModal: false,
      createCategoryModal: false,
      value: '',
      userStats: {},
      fromDate: new Date(moment().subtract(1, 'month').format('YYYY-MM-DD')),
      toDate: new Date(moment().format('YYYY-MM-DD')),
      from: '',
      to: '',
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
    this.getStats();
  };

  getStats = () => {
    BookKeepingServices.getBookkeepingStats(
      {from: this.state.fromDate, to: this.state.toDate},
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({userStats: res.data.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  render() {
    const {value, loading, userStats, fromDate, toDate} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.upperContainer}>
              <View style={styles.upperItemContainer}>
                <Text style={styles.titleText}>Total Balance</Text>
                <Text style={styles.textStyle}>
                  ${moneyFormat(userStats?.total_balance)}
                </Text>
              </View>
              <View style={styles.upperItemContainer}>
                <Text style={styles.titleText}>Current Balance</Text>
                <Text style={styles.textStyle}>
                  ${moneyFormat(userStats?.current_balance)}
                </Text>
              </View>
              <View style={styles.upperItemContainer}>
                <Text style={styles.titleText}>Total Expense</Text>
                <Text style={styles.textStyle}>
                  ${moneyFormat(userStats?.total_expense)}
                </Text>
              </View>
              <View style={styles.upperItemContainer}>
                <Text style={styles.titleText}>Goal Amount</Text>
                <Text style={styles.textStyle}>
                  ${moneyFormat(userStats?.total_goal)}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({fromDateModal: true})}
                  style={styles.dateItem}>
                  <Icon.Entypo name="calendar" size={20} />
                  {HorizontalSpacer()}
                  <Text style={styles.dateText}>
                    {moment(fromDate).format('ddd MMM, DD')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({toDateModal: true})}
                  style={styles.dateItem}>
                  <Icon.Entypo name="calendar" size={20} />
                  {HorizontalSpacer()}
                  <Text style={styles.dateText}>
                    {moment(toDate).format('ddd MMM, DD')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.lowerContainer}>
              <FlatList
                data={userStats?.progress}
                style={{
                  marginBottom: 140,
                }}
                // contentContainerStyle={{paddingBottom: 150}}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.itemRowContainer}>
                      <View>
                        <Text style={styles.buttonText}>
                          {item?.goal_category
                            ? item?.goal_category?.name
                            : item?.expense_category
                            ? item?.expense_category?.name
                            : ''}
                        </Text>
                        <Text style={styles.dateText}>
                          {moment(item.createdAt).format('MM/DD/YYYY')}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.buttonText}>{item.amount}$</Text>
                      </View>
                    </View>
                  );
                }}
              />

              <View style={styles.floatingBtnContainer}>
                <Button
                  titleStyle={{
                    color: '#000',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => Linking.openURL(userStats?.pdfUrl)}
                  title="Download Statement"
                  iconContainerStyle={{marginHorizontal: 0}}
                  buttonStyle={{
                    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                    borderRadius: 10,
                    height: 45,
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </>
        )}

        <DateModal
          date={this.state.fromDate}
          target
          wallet
          visible={this.state.fromDateModal}
          setDate={name => this.setState({fromDate: name})}
          onClose={() => this.setState({fromDateModal: false})}
          onSave={() =>
            this.setState({
              fromDateModal: false,
              from: moment(this.state.fromDate).format('YYYY-MM-DD'),
            })
          }
        />
        <DateModal
          date={this.state.toDate}
          target
          wallet
          visible={this.state.toDateModal}
          setDate={name => this.setState({toDate: name})}
          onClose={() => this.setState({toDateModal: false})}
          onSave={() =>
            this.setState({
              toDateModal: false,
              to: moment(this.state.toDate).format('YYYY-MM-DD'),
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
)(BookKeepingCreateExpense);
