import React, {Component} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Button, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Stats from '../../../../assets/svg/stats.svg';
import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/play.svg';
import Edit from '../../../../assets/svg/edit.svg';
import Delete from '../../../../assets/svg/delete.svg';
import {Container, DeleteModal, Icon, Loader} from '../../../../components';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {
  HorizontalSpacer,
  moneyFormat,
  VerticalSpacer,
} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import {BookKeepingServices} from '../../../../services';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DropDown from '../../../../assets/svg/dropDown.svg';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_BOOK_KEEPING,
  iconColor: themeStyle.COLOR_WHITE,
};

class BookKeepingHome extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      activeTab: 0,
      goalModal: false,
      expenseModal: false,
      createCategoryModal: false,
      currentBalance: '',
      loading: true,
      list: [
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
        {
          title: 'Car',
          price: 20000,
          value: 10,
        },
      ],
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      expenseCategories: [],
      goalCategories: [],
    }),
      (this.swipeableRef = []),
      (this.swipeableRef1 = []);
  }

  componentDidMount = async () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
      this.getCurrentBalance();
      this.getGoalCategories();
      this.getExpenseCategories();
    });
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.itemRowContainer}>
          <TouchableOpacity
            onPress={() => {
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.setState({createCategoryModal: true});
            }}>
            <Icon.Ionicons
              name="md-add-circle"
              size={30}
              color={themeStyle.COLOR_WHITE}
            />
          </TouchableOpacity>
          {HorizontalSpacer()}
          {HorizontalSpacer()}
          <TouchableOpacity
            onPress={() => {
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.props.navigation.navigate(route.BOOKKEEPINGSTATS);
            }}
            style={{marginRight: '5%'}}>
            <Stats />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {
              screen: route.HOME,
            })
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });

    await this.getCurrentBalance();
    await this.getGoalCategories();
    await this.getExpenseCategories();
  };

  getCurrentBalance = () => {
    BookKeepingServices.getCurrentBalance(this.props.user.userData.token)
      .then(res => {
        this.setState({
          currentBalance: res.data.data.current_balance,
          loading: false,
        });
      })
      .catch(err => this.setState({loading: false}));
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

  handleAddExpense = () => {
    this.setState({expenseModal: false, refreshing: true, value: ''});
    let data = {
      expense_category: this.state.categoryId,
      amount: parseInt(this.state.value),
    };
    BookKeepingServices.addExpenseAmount(data, this.props.user.userData.token)
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {
        alert(err.response.data.message);
        this.setState({loading: false, refreshing: false});
      });
  };

  handleAddGoal = () => {
    this.setState({goalModal: false, refreshing: true, value: ''});
    let data = {
      goal_category: this.state.categoryId,
      amount: parseInt(this.state.value),
    };
    BookKeepingServices.addGoalAmount(data, this.props.user.userData.token)
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {
        alert(err.response.data.message);
        this.setState({loading: false, refreshing: false});
      });
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.getCurrentBalance();
    await this.getGoalCategories();
    await this.getExpenseCategories();
    this.setState({refreshing: false});
  };
  deleteExpenseCategory = id => {
    BookKeepingServices.deleteExpense(id, this.props.user.userData.token)
      .then(async res => {
        if (this.state.expenseCategories.length > 1) {
          await this.state.expenseCategories.map((item, index) => {
            this.swipeableRef[index].close();
          });
        }
        this.onRefresh();
      })
      .catch(err => {
        alert(err.response.message);
      });
  };
  deleteGoalCategory = id => {
    BookKeepingServices.deleteGoal(id, this.props.user.userData.token)
      .then(async res => {
        if (this.state.goalCategories.length > 1) {
          await this.state.goalCategories.map((item, index) => {
            this.swipeableRef1[index].close();
          });
        }
        this.onRefresh();
      })
      .catch(err => {
        alert(err.response.message);
      });
  };

  showNewUserAlertFunction = () => {
    this.setState({
      alertModal: true,
      msgToDisplay:
        'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.',
    });
  };

  render() {
    const {
      activeTab,
      loading,
      currentBalance,
      expenseCategories,
      goalCategories,
      alertModal,
      unverifiedUser,
      msgToDisplay,
    } = this.state;
    const renderRightActions = () => {
      return (
        <View style={{...styles.rightSwipeRowContainer}}>
          <TouchableOpacity
            onPress={() =>
              activeTab == 0
                ? this.props.navigation.navigate(route.BOOKKEEPINGEDITEXPENSE, {
                    data: this.state.id,
                  })
                : this.props.navigation.navigate(route.BOOKKEEPINGEDITGOAL, {
                    data: this.state.id,
                  })
            }
            style={[styles.rightSwipeItem]}>
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              activeTab == 0
                ? unverifiedUser
                  ? this.showNewUserAlertFunction()
                  : this.deleteExpenseCategory(this.state.id)
                : unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.deleteGoalCategory(this.state.id)
            }
            style={[styles.rightSwipeItem]}>
            <Delete />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.rowContainer}>
                <Text style={styles.buttonText}>Current Balance</Text>
                {VerticalSpacer()}
                {VerticalSpacer()}
                {VerticalSpacer()}
                {VerticalSpacer()}
                <Icon.MaterialCommunityIcons
                  onPress={() =>
                    unverifiedUser
                      ? this.showNewUserAlertFunction()
                      : this.props.navigation.navigate(
                          route.BOOKKEEPINGADDBALANCE,
                        )
                  }
                  name="square-edit-outline"
                  color={'#424242'}
                  size={25}
                />
              </View>
              <Text style={styles.buttonText1}>
                $ {moneyFormat(currentBalance)}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                disabled={unverifiedUser}
                placeholder="Enter Amount"
                value={this.state.value}
                keyboardType="decimal-pad"
                inputContainerStyle={{...styles.inputContainerStyle1}}
                inputStyle={styles.inputStyle1}
                onChangeText={comment => {
                  this.setState({value: comment});
                }}
                rightIcon={
                  <TouchableOpacity
                    style={{marginBottom: 15}}
                    onPress={() => {
                      unverifiedUser
                        ? this.showNewUserAlertFunction()
                        : this.state.value
                        ? activeTab == 1
                          ? this.setState({goalModal: true})
                          : this.setState({expenseModal: true})
                        : alert('Please enter the amount');
                    }}>
                    <Play />
                  </TouchableOpacity>
                }
                rightIconContainerStyle={{
                  marginRight: '-10%',
                  marginTop: '7.5%',
                }}
              />
            </View>
            <View style={styles.lowerContainer}>
              <View
                style={{
                  margin: '8%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
                  borderRadius: 10,
                  padding: 3,
                }}>
                <TouchableWithoutFeedback
                  style={{
                    backgroundColor:
                      activeTab == 0 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    unverifiedUser
                      ? this.showNewUserAlertFunction()
                      : this.setState({activeTab: 0});
                  }}>
                  <Text
                    style={{
                      color: themeStyle.COLOR_BLACK,
                      fontSize: 14,
                      textAlign: 'center',
                      fontFamily: themeStyle.FONT_REGULAR,
                    }}>
                    Expenses
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={{
                    backgroundColor:
                      activeTab == 1 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    unverifiedUser
                      ? this.showNewUserAlertFunction()
                      : this.setState({activeTab: 1});
                  }}>
                  <Text
                    style={{
                      color: themeStyle.COLOR_BLACK,
                      fontSize: 14,
                      textAlign: 'center',
                      fontFamily: themeStyle.FONT_REGULAR,
                    }}>
                    Goals
                  </Text>
                </TouchableWithoutFeedback>
                {/* <Button
                  titleStyle={{
                    color: themeStyle.COLOR_BLACK,
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    this.setState({activeTab: 0});
                  }}
                  // loading={inviteLoading}
                  iconContainerStyle={{marginHorizontal: 0}}
                  title="Expenses"
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 0 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                  }}
                />
                <Button
                  titleStyle={{
                    color: themeStyle.COLOR_BLACK,
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  TouchableComponent={false}
                  onPress={() => {
                    this.setState({activeTab: 1});
                  }}
                  // loading={inviteLoading}
                  title="Goals"
                  iconContainerStyle={{marginHorizontal: 0}}
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 1 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 45,
                    width: SCREEN_WIDTH * 0.41,
                    opacity: 1,
                  }}
                /> */}
              </View>
              {activeTab == 0 ? (
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
                  {this.state.expenseCategories.map((item, index) => {
                    return (
                      <Swipeable
                        useNativeAnimations={true}
                        overshootRight={false}
                        ref={reff => (this.swipeableRef[index] = reff)}
                        onSwipeableWillOpen={() => {
                          unverifiedUser
                            ? this.showNewUserAlertFunction()
                            : () => {
                                this.setState({id: item._id});
                                this.swipeableRef.map((item, i) => {
                                  if (i != index) {
                                    this.swipeableRef[i].close();
                                  }
                                });
                              };
                          // this.setState({ id: item._id });
                          // this.swipeableRef.map((item, i) => {
                          //   if (i != index) {
                          //     this.swipeableRef[i].close();
                          //   }
                          // });
                        }}
                        renderRightActions={renderRightActions}>
                        <TouchableOpacity
                          onPress={() => {
                            unverifiedUser
                              ? this.showNewUserAlertFunction()
                              : this.props.navigation.navigate(
                                  route.BOOKKEEPINGVIEWEXPENSE,
                                  {data: item._id},
                                );
                          }}
                          style={styles.itemContainer}>
                          <View style={styles.itemRowContainer}>
                            <Text style={styles.titleText}>{item.name}</Text>
                            <Text>
                              {item.total_amount / item.limit == 1 ? '' : '-'}
                              {item.limit}$
                            </Text>
                          </View>
                          <Progress.Bar
                            style={{marginTop: 10}}
                            color={
                              item.total_amount / item.limit == 1
                                ? '#99D1CD'
                                : themeStyle.BOOK_KEEPING_PINK
                            }
                            backgroundColor={
                              item.total_amount / item.limit == 1
                                ? '#99D1CD'
                                : themeStyle.COLOR_SILVER
                            }
                            // progress={0}
                            unfilledColor={'gray'}
                            progress={item.total_amount / item.limit}
                            width={SCREEN_WIDTH * 0.8}
                          />
                        </TouchableOpacity>
                      </Swipeable>
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
                      <Swipeable
                        useNativeAnimations={true}
                        overshootRight={false}
                        ref={reff => (this.swipeableRef1[index] = reff)}
                        onSwipeableWillOpen={
                          unverifiedUser
                            ? () => this.showNewUserAlertFunction()
                            : () => {
                                this.setState({id: item._id});
                                this.swipeableRef1.map((item, i) => {
                                  if (i != index) {
                                    this.swipeableRef1[i].close();
                                  }
                                });
                              }
                        }
                        renderRightActions={renderRightActions}>
                        <TouchableOpacity
                          onPress={() => {
                            unverifiedUser
                              ? this.showNewUserAlertFunction()
                              : this.props.navigation.navigate(
                                  route.BOOKKEEPINGVIEWGOAL,
                                  {data: item._id},
                                );
                          }}
                          style={styles.itemContainer}>
                          <View style={styles.itemRowContainer}>
                            <Text style={styles.titleText}>{item.name}</Text>
                            <Text>
                              {item.sum_amount / item.target_amount == 1
                                ? ''
                                : '-'}
                              {item.target_amount}$
                            </Text>
                          </View>
                          <Progress.Bar
                            style={{marginTop: 10}}
                            color={
                              item.total_amount / item.limit == 1
                                ? '#99D1CD'
                                : themeStyle.BOOK_KEEPING_PINK
                            }
                            backgroundColor={
                              item.total_amount / item.limit == 1
                                ? '#99D1CD'
                                : themeStyle.COLOR_SILVER
                            }
                            progress={item.sum_amount / item.target_amount}
                            width={SCREEN_WIDTH * 0.8}
                          />
                        </TouchableOpacity>
                      </Swipeable>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </>
        )}

        <Modal
          isVisible={this.state.expenseModal}
          animationInTiming={400}
          transparent
          animationOutTiming={200}
          swipeDirection="down"
          onSwipeComplete={() => {
            this.setState({expenseModal: false});
          }}
          onBackdropPress={() => {
            this.setState({expenseModal: false});
          }}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View style={styles.modalContainer1}>
            <View style={{margin: '10%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({expenseModal: false});
                }}
                style={styles.dropDown}>
                <DropDown />
              </TouchableOpacity>
              <View style={styles.headerContainer}>
                <Text style={styles.selectCategory}>{'Select Category'}</Text>
                <View style={styles.line} />
              </View>
            </View>
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
              {expenseCategories?.map((item, index) => {
                return (
                  <View style={{marginHorizontal: '10%', marginTop: '10%'}}>
                    <View style={styles.itemRowContainer}>
                      <Text style={styles.titleText}>{item.name}</Text>
                      {item.selected ? (
                        <TouchableOpacity
                          onPress={() => {
                            let array = [...this.state.expenseCategories];
                            array.forEach((e, i) => {
                              array[i] = {...array[i], selected: false};
                            });
                            array[index] = {...array[index], selected: true};
                            this.setState({
                              expenseCategories: array,
                              categoryId: array[index]._id,
                            });
                          }}
                          style={styles.checkBoxSelected}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            let array = [...this.state.expenseCategories];
                            array.forEach((e, i) => {
                              array[i] = {...array[i], selected: false};
                            });
                            array[index] = {...array[index], selected: true};
                            this.setState({
                              expenseCategories: array,
                              categoryId: array[index]._id,
                            });
                          }}
                          style={styles.checkBoxUnselected}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={{alignSelf: 'center', marginBottom: '5%'}}>
              <Button
                titleStyle={{
                  color: themeStyle.COLOR_BLACK,
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_REGULAR,
                }}
                onPress={() => {
                  this.handleAddExpense();
                }}
                iconContainerStyle={{marginHorizontal: 0}}
                title="Done"
                buttonStyle={{
                  backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                  borderRadius: 10,
                  height: 60,
                  width: SCREEN_WIDTH * 0.9,
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.goalModal}
          animationInTiming={400}
          transparent
          animationOutTiming={200}
          swipeDirection="down"
          onSwipeComplete={() => {
            this.setState({goalModal: false});
          }}
          onBackdropPress={() => {
            this.setState({goalModal: false});
          }}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View style={styles.modalContainer1}>
            <View style={{margin: '10%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({goalModal: false});
                }}
                style={styles.dropDown}>
                <DropDown />
              </TouchableOpacity>

              <View style={styles.headerContainer}>
                <Text style={styles.selectCategory}>{'Select Category'}</Text>
                <View style={styles.line} />
              </View>
            </View>
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
              {goalCategories?.map((item, index) => {
                return (
                  <View style={{marginHorizontal: '10%', marginTop: '7%'}}>
                    <View style={styles.itemRowContainer}>
                      <Text style={styles.titleText}>{item.name}</Text>
                      {item.selected ? (
                        <TouchableOpacity
                          onPress={() => {
                            let array = [...this.state.goalCategories];
                            array.forEach((e, i) => {
                              array[i] = {...array[i], selected: false};
                            });
                            array[index] = {...array[index], selected: true};
                            this.setState({
                              goalCategories: array,
                              categoryId: array[index]._id,
                            });
                          }}
                          style={styles.checkBoxSelected}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            let array = [...this.state.goalCategories];
                            array.forEach((e, i) => {
                              array[i] = {...array[i], selected: false};
                            });
                            array[index] = {...array[index], selected: true};
                            this.setState({
                              goalCategories: array,
                              categoryId: array[index]._id,
                            });
                          }}
                          style={styles.checkBoxUnselected}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={{alignSelf: 'center', marginBottom: '5%'}}>
              <Button
                titleStyle={{
                  color: themeStyle.COLOR_BLACK,
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_REGULAR,
                }}
                onPress={() => {
                  this.handleAddGoal();
                }}
                // loading={inviteLoading}
                iconContainerStyle={{marginHorizontal: 0}}
                title="Done"
                buttonStyle={{
                  backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                  borderRadius: 10,
                  height: 60,
                  width: SCREEN_WIDTH * 0.9,
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.createCategoryModal}
          animationInTiming={400}
          transparent
          animationOutTiming={200}
          swipeDirection="down"
          onSwipeComplete={() => this.setState({createCategoryModal: false})}
          onBackdropPress={() => this.setState({createCategoryModal: false})}>
          <View style={styles.modalContainer2}>
            <View style={{margin: '10%'}}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.titleText}>{'   '}</Text>
                <Icon.Ionicons
                  name="close"
                  onPress={() => this.setState({createCategoryModal: false})}
                  size={20}
                />
              </View>
            </View>
            <View style={{marginBottom: '6%', alignItems: 'center'}}>
              <Text style={styles.buttonText}>Create Category</Text>
            </View>
            <View
              style={{
                // margin: '5%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
                borderRadius: 10,
                padding: 5,
              }}>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor:
                    activeTab == 0 ? themeStyle.BOOK_KEEPING_PINK : null,
                  borderRadius: 10,
                  height: 45,
                  width: SCREEN_WIDTH * 0.41,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState(
                    {activeTab: 0, createCategoryModal: false},
                    () =>
                      this.props.navigation.navigate(
                        route.BOOKKEEPINGCREATEEXPENSE,
                      ),
                  );
                }}>
                <Text
                  style={{
                    color: themeStyle.COLOR_BLACK,
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}>
                  Expenses
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor:
                    activeTab == 1 ? themeStyle.BOOK_KEEPING_PINK : null,
                  borderRadius: 10,
                  height: 45,
                  width: SCREEN_WIDTH * 0.41,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState({activeTab: 1});
                  this.setState({createCategoryModal: false}, () =>
                    this.props.navigation.navigate(route.BOOKKEEPINGCREATEGOAL),
                  );
                }}>
                <Text
                  style={{
                    color: themeStyle.COLOR_BLACK,
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}>
                  Goals
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
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
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookKeepingHome);
