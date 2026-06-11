import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import themeStyle from '../../../../assets/styles/theme.style';
import Dollar from '../../../../assets/svg/dollar.svg';
import {Container, Icon, Loader} from '../../../../components';
import {authActions} from '../../../../redux/actions/auth';
import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {BookKeepingServices} from '../../../../services';
import commonStyle from '../../../../assets/styles/common.style';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class BookKeepingAddBalance extends Component {
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
          value: 'ONCE',
          selected: false,
        },
        {
          name: 'Weekly',
          value: 'WEEKLY',
          selected: false,
        },
        {
          name: 'Bi-Weekly',
          value: 'BI_WEEklY',
          selected: false,
        },
        {
          name: 'Monthly',
          value: 'MONTHLY',
          selected: false,
        },
        {
          name: 'Bi-Annually',
          value: 'BI_ANNUALLY',
          selected: false,
        },
        {
          name: 'Anually',
          value: 'ANNUALLY',
          selected: false,
        },
      ],
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
      headerRight: () => {
        return (
          <View
            style={{
              width: null,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity
              style={{ marginRight: 15 }}
            // onPress={() => this.props.navigation.goBack()}
            >
              <Search fill={themeStyle.COLOR_WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 15 }}
            // onPress={() => this.props.navigation.goBack()}
            >
              <Paths fill={themeStyle.COLOR_WHITE} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginRight: 15 }}
            // onPress={() => this.props.navigation.goBack()}
            >
              <MenuSharp />
            </TouchableOpacity> */}
          </View>
        );
      },
    });
  };

  renderGenderItems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let array = [...this.state.genderList];
          array.forEach((e, i) => {
            array[i] = {...array[i], selected: false};
          });
          array[index] = {...array[index], selected: true};
          this.setState({genderList: array});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={
            item.selected ? styles.selectedOption : styles.unSelectedOption
          }>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleAddBalance = () => {
    const {submit, value} = this.state;
    let balance_subscription = '';
    this.state.genderList.forEach((e, i) => {
      if (this.state.genderList[i].selected) {
        balance_subscription = e.value;
      }
    });
    if (submit && value && balance_subscription != '') {
      let data = {
        amount: parseInt(value),
        balance_subscription: balance_subscription,
      };
      this.setState({loading: true});
      BookKeepingServices.addBalance(data, this.props.user.userData.token)
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
    const {value, genderList, submit, loading} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.inputContainer}>
              <Text>Enter Amount</Text>
              <Text style={styles.titleText2}>
                Add cash to your current balance
              </Text>
              <View style={{marginTop: '2%'}}>
                <Input
                  placeholder="Enter Amount"
                  keyboardType="number-pad"
                  value={this.state.value}
                  containerStyle={{
                    marginHorizontal: 0,
                    paddingLeft: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingRight: 0,
                  }}
                  inputContainerStyle={{...styles.inputContainerStyle1}}
                  inputStyle={styles.inputStyle1}
                  rightIcon={
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 20,
                        width: 20,
                        marginRight: 20,
                      }}>
                      <Dollar />
                    </TouchableOpacity>
                  }
                  onChangeText={comment => {
                    this.setState({value: comment});
                  }}
                />
                {submit && !value ? (
                  <Text style={[commonStyle.errorText]}>
                    Please fill this field
                  </Text>
                ) : null}
              </View>
              <View style={{marginTop: '-5%', paddingBottom: '40%'}}>
                <FlatList
                  data={genderList}
                  numColumns={3}
                  renderItem={({item, index}) =>
                    this.renderGenderItems(item, index)
                  }
                  contentContainerStyle={styles.contentContainer}
                  keyExtractor={item => item.name}
                  ItemSeparatorComponent={VerticalSpacer}
                />
              </View>
            </View>
            <View style={{flex: 0.3, justifyContent: 'flex-start'}}>
              <Button
                titleStyle={{
                  color: '#000',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: themeStyle.FONT_BOLD,
                }}
                onPress={() => {
                  this.setState({submit: true}, () => this.handleAddBalance());
                }}
                // loading={inviteLoading}
                title="Add"
                iconContainerStyle={{marginHorizontal: 0}}
                buttonStyle={{
                  backgroundColor: themeStyle.BOOK_KEEPING_PINK,
                  borderRadius: 10,
                  height: 45,
                  marginHorizontal: '7%',
                }}
              />
            </View>
          </View>
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
)(BookKeepingAddBalance);
