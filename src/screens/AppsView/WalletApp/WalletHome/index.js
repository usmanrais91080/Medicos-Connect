import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, DeleteModal, Icon} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import PagerTopTabFollowersNavigationRoutes from '../../../../navigation/WalletNavigation/WalletTopBarNavigation';
import {HorizontalSpacer} from '../../../../lib/utils/global';
import Stats from '../../../../assets/svg/stats.svg';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeTab: 0,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
    };
  }

  componentDidMount = () => {
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
              name="add-circle"
              size={30}
              color={themeStyle.COLOR_WHITE}
            />
          </TouchableOpacity>
          {HorizontalSpacer()}

          <TouchableOpacity
            onPress={() => {
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.props.navigation.navigate(route.BOOKKEEPINGSTATS);
            }}
            style={{}}>
            <Stats />
          </TouchableOpacity>
          {HorizontalSpacer()}
          <TouchableOpacity
            style={{marginRight: '5%'}}
            onPress={() => {
              this.state.unverifiedUser
                ? this.showNewUserAlertFunction()
                : this.props.navigation.navigate(route.WALLETPINRESET);
              // this.setState({createCategoryModal: true});
            }}>
            <Icon.Ionicons
              name="settings-sharp"
              size={30}
              color={themeStyle.COLOR_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => {
        return (
          <Text
            style={{
              color: themeStyle.COLOR_WHITE,
              fontFamily: themeStyle.FONT_BOLD,
              fontSize: themeStyle.FONT_SIZE_2XLARGE,
            }}>
            Wallet
          </Text>
        );
      },
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
  };
  showNewUserAlertFunction = () => {
    this.setState({
      alertModal: true,
      msgToDisplay:
        'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.',
    });
  };
  render() {
    const {activeTab, alertModal, msgToDisplay} = this.state;
    return (
      <>
        <Container>
          <Modal
            isVisible={this.state.createCategoryModal}
            animationInTiming={400}
            transparent
            animationOutTiming={200}
            onSwipeComplete={() => this.setState({createCategoryModal: false})}
            onBackdropPress={() => this.setState({createCategoryModal: false})}>
            <View style={styles.modalContainer2}>
              <View style={{marginBottom: '6%', alignItems: 'center'}}>
                <Text style={styles.buttonText}>Create Category</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
                  borderRadius: 10,
                  padding: 5,
                  height: 45,
                }}>
                <Button
                  titleStyle={{
                    color: themeStyle.COLOR_BLACK,

                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    this.setState({activeTab: 0});
                    this.setState({createCategoryModal: false}, () =>
                      this.props.navigation.navigate(
                        route.BOOKKEEPINGCREATEEXPENSE,
                      ),
                    );
                  }}
                  iconContainerStyle={{marginHorizontal: 0, width: '100%'}}
                  title="Expense"
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 0 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 35,
                    width: SCREEN_WIDTH * 0.37,
                  }}
                />
                <Button
                  titleStyle={{
                    color: themeStyle.COLOR_BLACK,

                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: themeStyle.FONT_REGULAR,
                  }}
                  onPress={() => {
                    this.setState({activeTab: 1});
                    this.setState({createCategoryModal: false}, () =>
                      this.props.navigation.navigate(
                        route.BOOKKEEPINGCREATEGOAL,
                      ),
                    );
                  }}
                  title="Goal"
                  iconContainerStyle={{marginHorizontal: 0}}
                  buttonStyle={{
                    backgroundColor:
                      activeTab == 1 ? themeStyle.BOOK_KEEPING_PINK : null,
                    borderRadius: 10,
                    height: 35,
                    width: SCREEN_WIDTH * 0.37,
                  }}
                />
              </View>
            </View>
          </Modal>
          <PagerTopTabFollowersNavigationRoutes
            activeBankScreen={this.props.route?.params?.buyAmpules}
          />
          <DeleteModal
            alert
            visible={alertModal}
            confirm={() => {
              this.setState({alertModal: false});
            }}
            text={msgToDisplay}
          />
        </Container>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
