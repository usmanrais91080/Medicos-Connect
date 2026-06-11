import React, {Component} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';

import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/withdrawal.svg';
import Wallet from '../../../../assets/svg/walet.svg';
import Added from '../../../../assets/svg/walet1.svg';
import {Container, Icon, Loader} from '../../../../components';
import {authActions} from '../../../../redux/actions/auth';
import deleteGif from '../../../../assets/svg/delete-Gif-Wallet.svg';
import Edit from '../../../../assets/svg/wallet_edit.svg';
import Delete from '../../../../assets/svg/wallet_delete.svg';
import styles from './style';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {BookKeepingServices} from '../../../../services';
import moment from 'moment';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingViewGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      goalModal: false,
      goalModal: false,
      createCategoryModal: false,
      value: '',
      genderList: [
        {
          name: 'Once',
          selected: false,
        },
        {
          name: 'Weekly',
          selected: false,
        },
        {
          name: 'Bi-Weekly',
          selected: false,
        },
        {
          name: 'Monthly',
          selected: false,
        },
        {
          name: 'Bi-Annually',
          selected: false,
        },
        {
          name: 'Anually',
          selected: false,
        },
      ],
      transferTo: '',
      expenseCategories: [],
      goalCategories: [],
      signOutModal: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.route.params.data) {
      this.setState({loading: true});
      this.getGoalCategoryById(this.props.route.params.data);
    }
    await this.getGoalCategories();
    await this.getExpenseCategories();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
      headerRight: () => (
        <View style={styles.itemRowContainer1}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(route.BOOKKEEPINGEDITGOAL, {
                data: this.props.route.params.data,
              });
            }}>
            <Edit width={25} />
          </TouchableOpacity>
          {HorizontalSpacer()}
          {HorizontalSpacer()}
          <TouchableOpacity
            onPress={() => {
              this.setState({signOutModal: true});
            }}
            style={{marginRight: '5%'}}>
            <Delete fill={themeStyle.COLOR_WHITE} width={25} />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: 'Goal',
    });
  };

  handleDeleteExpense = id => {
    this.setState({loading: true});
    BookKeepingServices.deleteGoal(id, this.props.user.userData.token)
      .then(res => {
        this.props.navigation.goBack();
      })
      .catch(err => {
        // console.log(err.response);
        this.setState({loading: false});
      });
  };

  getGoalCategories = () => {
    BookKeepingServices.getExpenseCategories(this.props.user.userData.token)
      .then(res => {
        this.setState({expenseCategories: res.data.data, loading: false});
      })
      .catch(err => {
        // console.log(err);
        this.setState({loading: false});
      });
  };

  getExpenseCategories = () => {
    BookKeepingServices.getGoalCategories(this.props.user.userData.token)
      .then(res => {
        this.setState({goalCategories: res.data.data, loading: false});
      })
      .catch(err => {
        // console.log(err);
        this.setState({loading: false});
      });
  };

  getGoalCategoryById = id => {
    BookKeepingServices.getGoalCategoryById(id, this.props.user.userData.token)
      .then(res => {
        this.setState({
          goalName: res.data.data.name,
          targetDate: res.data.data.target_date,
          goalAmount: res.data.data.sum_amount,
          targetAmount: res.data.data.target_amount,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  handleTransferAmount = () => {
    this.setState({transferModal: false});
    setTimeout(() => {
      this.setState({processingModal: true});
    }, 500);
    let data = {
      amount: parseInt(this.state.value),
      goal_id: this.props.route.params.data,
      transfer_to: this.state.transferTo,
      type: this.state.activeTab == 0 ? 'expense' : 'goal', // goal/expense
    };
    BookKeepingServices.transferAmount(data, this.props.user.userData.token)
      .then(async res => {
        this.setState({added: true});
        await this.getGoalCategoryById(this.props.route.params.data);
        this.setState({processingModal: false, added: false});
      })
      .catch(err => {
        // console.log(err.response);
        this.setState({processingModal: false, added: false});
        this.getGoalCategoryById(this.props.route.params.data);
      });
  };

  render() {
    const {activeTab, goalAmount, goalName, loading, targetDate, targetAmount} =
      this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>{goalName}</Text>
              <View
                style={{
                  marginVertical: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Progress.Circle
                  size={130}
                  showsText={true}
                  thickness={5}
                  color={
                    goalAmount / targetAmount == 1
                      ? themeStyle.BOOK_KEEPING_PINK
                      : 'red'
                  }
                  animated={true}
                  direction="counter-clockwise"
                  progress={
                    goalAmount && targetAmount ? goalAmount / targetAmount : 1
                  }
                  formatText={progress => {}}
                  indeterminate={false}>
                  <View style={{position: 'absolute', top: '40%', left: '17%'}}>
                    <Text style={styles.perText}>
                      {parseInt((goalAmount / targetAmount) * 100)}%
                    </Text>
                  </View>
                </Progress.Circle>
              </View>
              <View style={styles.itemRowContainer2}>
                <Text style={styles.titleText}>Target Amount</Text>
                <Text style={styles.titleText2}>${targetAmount}</Text>
              </View>
              <View style={styles.itemRowContainer2}>
                <Text style={styles.titleText}>Amount Saved</Text>
                <Text style={styles.titleText2}>${goalAmount}</Text>
              </View>
              <View style={styles.itemRowContainer2}>
                <Text style={styles.titleText}>Remaining Amount</Text>
                <Text style={styles.titleText2}>
                  ${`${targetAmount - goalAmount}`}
                </Text>
              </View>
              <View style={styles.itemRowContainer2}>
                <Text style={styles.titleText}>Target Date</Text>
                <Text style={styles.titleText2}>
                  {moment(targetDate).format('MM/DD/YYYY')}
                </Text>
              </View>
              <View style={{marginTop: '10%'}}>
                <Button
                  titleStyle={{
                    color: themeStyle.COLOR_BLACK,
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    this.setState({transferModal: true});
                  }}
                  // loading={inviteLoading}
                  title="Withdraw"
                  iconPosition="left"
                  icon={
                    <View style={{marginRight: '5%'}}>
                      <Play />
                    </View>
                  }
                  iconContainerStyle={{marginHorizontal: 0}}
                  buttonStyle={{
                    backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                    borderRadius: 10,
                    height: 45,
                    marginHorizontal: '10%',
                  }}
                />
              </View>
            </View>
          </>
        )}
        <Modal
          isVisible={this.state.transferModal}
          animationInTiming={400}
          transparent
          animationOutTiming={100}
          onSwipeComplete={() => {
            this.setState({transferModal: false});
          }}
          onBackdropPress={() => {
            this.setState({transferModal: false});
          }}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View style={{...styles.modalContainer1, paddingTop: '10%'}}>
            <>
              <View style={{paddingHorizontal: '7.5%'}}>
                <Text style={styles.enterAmount}>Enter Amount</Text>
                <Text style={styles.titleText2}>
                  Enter the amount you want to transfer.
                </Text>
                <View
                  style={{
                    marginTop: '10%',
                  }}>
                  <Input
                    placeholder="0."
                    keyboardType="number-pad"
                    value={this.state.value}
                    inputContainerStyle={styles.inputContainerStyle1}
                    inputStyle={styles.inputStyle1}
                    leftIcon={
                      <Icon.Foundation
                        name="dollar"
                        size={20}
                        color={'#94A1B1'}
                      />
                    }
                    onChangeText={comment => {
                      this.setState({value: comment});
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  margin: '8%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
                  borderRadius: 10,
                  padding: 3,
                }}>
                <Button
                  titleStyle={{
                    color: '#000',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily:
                      activeTab == 0
                        ? themeStyle.FONT_BOLD
                        : themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    let array = [...this.state.goalCategories];
                    array.forEach((e, i) => {
                      array[i] = {...array[i], selected: false};
                    });
                    let array1 = [...this.state.expenseCategories];
                    array1.forEach((e, i) => {
                      array1[i] = {...array1[i], selected: false};
                    });
                    this.setState({
                      goalCategories: array,
                      expenseCategories: array1,
                      activeTab: 0,
                      transferTo: '',
                    });
                  }}
                  // loading={inviteLoading}
                  iconContainerStyle={{marginHorizontal: 0}}
                  title="Expense"
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 0 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                    justifyContent: 'center',
                  }}
                />
                <Button
                  titleStyle={{
                    color: '#000',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily:
                      activeTab == 1
                        ? themeStyle.FONT_BOLD
                        : themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    let array = [...this.state.goalCategories];
                    array.forEach((e, i) => {
                      array[i] = {...array[i], selected: false};
                    });
                    let array1 = [...this.state.expenseCategories];
                    array1.forEach((e, i) => {
                      array1[i] = {...array1[i], selected: false};
                    });
                    this.setState({
                      goalCategories: array,
                      expenseCategories: array1,
                      activeTab: 1,
                      transferTo: '',
                    });
                  }}
                  title="Goals"
                  iconContainerStyle={{marginHorizontal: 0}}
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 1 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                    justifyContent: 'center',
                  }}
                />
              </View>
            </>

            {activeTab == 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 120}}>
                {this.state.expenseCategories.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let array = [...this.state.goalCategories];
                        array.forEach((e, i) => {
                          array[i] = {...array[i], selected: false};
                        });
                        let array1 = [...this.state.expenseCategories];
                        array1.forEach((e, i) => {
                          array1[i] = {...array1[i], selected: false};
                        });
                        array1[index] = {...array1[index], selected: true};
                        this.setState({
                          goalCategories: array,
                          expenseCategories: array1,
                          transferTo: item._id,
                        });
                      }}
                      style={{
                        ...styles.itemRowContainer,
                        backgroundColor: item.selected ? '#F5D67E' : 'white',
                      }}>
                      <View>
                        <Text style={styles.buttonText}>{item.name}</Text>
                        <Text style={styles.dateText}>
                          {moment(item.createdAt).format('MM/DD/YYYY')}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.buttonText}>{item.limit}$</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView
                contentContainerStyle={{paddingBottom: 120}}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      this.onRefresh();
                    }}
                  />
                }>
                {this.state.goalCategories.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let array = [...this.state.goalCategories];
                        array.forEach((e, i) => {
                          array[i] = {...array[i], selected: false};
                        });
                        let array1 = [...this.state.expenseCategories];
                        array1.forEach((e, i) => {
                          array1[i] = {...array1[i], selected: false};
                        });
                        array[index] = {...array[index], selected: true};
                        this.setState({
                          goalCategories: array,
                          expenseCategories: array1,
                          transferTo: item._id,
                        });
                      }}
                      style={{
                        ...styles.itemRowContainer,
                        backgroundColor: item.selected ? '#F5D67E' : 'white',
                      }}>
                      <View>
                        <Text style={styles.buttonText}>{item.name}</Text>
                        <Text style={styles.dateText}>
                          {moment(item.createdAt).format('MM/DD/YYYY')}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.buttonText}>
                          {item.target_amount}$
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
            <View style={styles.floatingBtnContainer}>
              <Button
                titleStyle={{
                  color: '#000',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_BOLD,
                }}
                onPress={() => {
                  if (this.state.value && this.state.transferTo) {
                    this.handleTransferAmount();
                  } else if (!this.state.value) {
                    alert('Please enter amount first');
                  } else if (!this.state.transferTo) {
                    alert(
                      'Please select any goal or expense to transfer the amount',
                    );
                  } else if (!this.state.value && !this.state.transferTo) {
                    alert(
                      'Please enter amount and select any goal or expense to transfer the amount',
                    );
                  }
                }}
                // loading={inviteLoading}
                title="Transfer"
                iconContainerStyle={{marginHorizontal: 0}}
                buttonStyle={{
                  backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                  borderRadius: 10,
                  height: 60,
                  marginHorizontal: '15%',
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.processingModal}
          animationInTiming={500}
          animationOutTiming={200}>
          <View style={styles.modalContainer}>
            {this.state.added ? (
              <View>
                <Added />
                <Text
                  style={{
                    marginTop: 50,
                    color: '#000',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_BOLD,
                  }}>
                  Sucessfully Added
                </Text>
              </View>
            ) : (
              <View>
                <Wallet />
                <Text
                  style={{
                    marginTop: 50,
                    color: '#000',
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_BOLD,
                  }}>
                  Processing
                </Text>
              </View>
            )}
          </View>
        </Modal>
        <BottomDeleteMenu
          visible={this.state.signOutModal}
          onClose={() => this.setState({signOutModal: false})}
          data={{
            icon: deleteGif,
            text: 'Are you sure you want to delete this?',
            buttonText: 'Delete',
            onPress: () => {
              this.setState({signOutModal: false});
              this.handleDeleteExpense(this.props.route.params.data);
            },
          }}
          theme="wallet"
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
)(BookKeepingViewGoal);
