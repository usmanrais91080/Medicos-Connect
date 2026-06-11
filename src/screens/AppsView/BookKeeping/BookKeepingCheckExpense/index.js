import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Progress from 'react-native-progress';
import deleteGif from '../../../../assets/svg/delete-Gif-Wallet.svg';
import themeStyle from '../../../../assets/styles/theme.style';
import Play from '../../../../assets/svg/playbtn.svg';
import Edit from '../../../../assets/svg/wallet_edit.svg';
import Delete from '../../../../assets/svg/wallet_delete.svg';

import {Container, Icon, Loader} from '../../../../components';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import {BookKeepingServices} from '../../../../services';
import {route} from '../../../../lib/utils/constants';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingViewExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      goalModal: false,
      expenseModal: false,
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
      signOutModal: false,
    };
  }

  componentDidMount = () => {
    if (this.props.route.params.data) {
      this.setState({loading: true});
      this.getExpenseCategoryById(this.props.route.params.data);
    }
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
      headerTitle: 'Expense',
      headerRight: () => (
        <View style={styles.itemRowContainer1}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(route.BOOKKEEPINGEDITEXPENSE, {
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
            <Delete width={25} />
          </TouchableOpacity>
        </View>
      ),
    });
  };

  handleDeleteExpense = id => {
    this.setState({loading: true});
    BookKeepingServices.deleteExpense(id, this.props.user.userData.token)
      .then(res => {
        this.props.navigation.goBack();
      })
      .catch(err => {
        // console.log(err.response);
        this.setState({loading: false});
      });
  };

  getExpenseCategoryById = id => {
    BookKeepingServices.getExpenseCategoryById(
      id,
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({
          expenseName: res.data.data.name,
          limit: res.data.data.limit,
          expenseAmount: res.data.data.total_amount,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  render() {
    const {value, expenseAmount, expenseName, loading, limit} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>{expenseName}</Text>
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
                    expenseAmount / limit == 1 ? themeStyle.COLOR_GREEN : 'red'
                  }
                  animated={true}
                  direction="counter-clockwise"
                  progress={expenseAmount && limit ? expenseAmount / limit : 1}
                  formatText={progress => {}}
                  indeterminate={false}>
                  <View style={{position: 'absolute', top: '40%', left: '15%'}}>
                    <Text style={styles.perText}>
                      {parseInt((expenseAmount / limit) * 100)}%
                    </Text>
                  </View>
                </Progress.Circle>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.titleText}>Expense Name</Text>
                <Text style={styles.titleText2}>{expenseName}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.titleText}>Expense Amount</Text>
                <Text style={styles.titleText2}>${`${expenseAmount}`}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.titleText}>Set Limit</Text>
                <Text style={styles.titleText2}>${`${limit}`}</Text>
              </View>
            </View>
          </>
        )}
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
)(BookKeepingViewExpense);
