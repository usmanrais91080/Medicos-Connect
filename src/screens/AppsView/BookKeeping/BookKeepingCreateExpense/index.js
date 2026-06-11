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

import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/playbtn.svg';

import {Container, Icon, Loader} from '../../../../components';
import {SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import {BookKeepingServices} from '../../../../services';
import commonStyle from '../../../../assets/styles/common.style';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingCreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      goalModal: false,
      expenseModal: false,
      createCategoryModal: false,
      value: '',
      limit: 0,
      expenseAmount: '',
      expenseName: '',
      loading: false,
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
      this.getExpenseCategoryById(this.props?.route?.params?.data);
    }
  };

  getExpenseCategoryById = id => {
    BookKeepingServices.getExpenseCategoryById(
      id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          expenseName: res.data?.data?.name,
          limit: res.data?.data?.limit,
          expenseAmount: res.data.data.total_amount,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  handleCreateExpense = () => {
    const {submit, expenseName, expenseAmount, limit} = this.state;
    if (submit && expenseName && limit) {
      this.setState({loading: true});
      let data;
      if (expenseAmount) {
        data = {
          name: expenseName,
          limit: parseInt(limit),
          amount: parseInt(expenseAmount),
        };
      } else {
        data = {
          name: expenseName,
          limit: parseInt(limit),
        };
      }
      // let data = {
      //   name: expenseName,
      //   limit: parseInt(limit),
      //   amount: parseInt(expenseAmount),
      // };
      BookKeepingServices.createExpenseCategory(
        data,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({loading: false});
          this.props.navigation.goBack();
        })
        .catch(err => {
          this.setState({loading: false});
          alert(err.response.data.message);
        });
    } else {
      this.setState({submit: true});
    }
  };

  handleUpdateExpense = () => {
    const {submit, expenseName, limit} = this.state;
    if (submit && expenseName && limit) {
      this.setState({loading: true});
      let data = {
        name: expenseName,
        limit: parseInt(limit),
      };
      BookKeepingServices.updateExpenseCategory(
        this.props?.route?.params?.data,
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
  render() {
    const {value, submit, expenseName, expenseAmount, limit, loading} =
      this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Expense Name"
                label="Name"
                labelStyle={{...styles.labelStyle}}
                value={expenseName}
                inputContainerStyle={{...styles.inputContainerStyle1}}
                inputStyle={styles.inputStyle1}
                onChangeText={comment => {
                  this.setState({expenseName: comment});
                }}
              />
              {submit && !expenseName ? (
                <Text style={[commonStyle.errorText, {marginBottom: 10}]}>
                  Please fill this field
                </Text>
              ) : null}
              {this.props?.route?.params?.data ? null : (
                <>
                  <Input
                    placeholder="Enter expense amount"
                    keyboardType="number-pad"
                    label="Amount"
                    disabled={this.props?.route?.params?.data ? true : false}
                    labelStyle={{...styles.labelStyle}}
                    value={expenseAmount}
                    inputContainerStyle={{...styles.inputContainerStyle1}}
                    inputStyle={styles.inputStyle1}
                    onChangeText={comment => {
                      this.setState({expenseAmount: comment});
                    }}
                  />
                  {/* {submit && !expenseAmount ? (
                    <Text style={[commonStyle.errorText, {marginBottom: 10}]}>
                      Please fill this field
                    </Text>
                  ) : null} */}
                </>
              )}
              <Input
                placeholder="$0"
                keyboardType="number-pad"
                label="Set Limit"
                labelStyle={{...styles.labelStyle}}
                value={limit.toString()}
                inputContainerStyle={{...styles.inputContainerStyle1}}
                inputStyle={styles.inputStyle1}
                onChangeText={comment => {
                  this.setState({limit: comment});
                }}
              />
              {submit && !limit ? (
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
                if (this.props?.route?.params?.data) {
                  this.setState({submit: true}, () =>
                    this.handleUpdateExpense(),
                  );
                } else {
                  this.setState({submit: true}, () =>
                    this.handleCreateExpense(),
                  );
                }
              }}
              // loading={inviteLoading}
              title={this.props?.route?.params?.data ? 'Edit' : 'Save'}
              iconContainerStyle={{marginHorizontal: 0, width: '100%'}}
              buttonStyle={{
                backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                borderRadius: 10,
                height: 45,
                marginHorizontal: '8%',
              }}
            />
          </>
        )}
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
