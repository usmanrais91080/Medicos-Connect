import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Platform} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import QR from '../../assets/svg/qr.svg';
import {DeleteModal, Icon} from '../../components';

import {route} from '../../lib/utils/constants';
import ArrowRight from '../../assets/svg/arrowRightModal.svg';
import Security from '../../assets/svg/Security.svg';
import Terms from '../../assets/svg/terms.svg';
import Support from '../../assets/svg/support.svg';
import Delete from '../../assets/svg/deleteAccount.svg';
import Faq from '../../assets/svg/faq.svg';
import Tutorial from '../../assets/svg/tutorial.svg';
import Invite from '../../assets/svg/invite-sm.svg';
import Review from '../../assets/svg/review.svg';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {bottomTabActions} from '../../redux/actions/bottomTab';
import FAQS from '../FAQS';
import SecuritySettings from '../SecuritySettings';
import DeleteAccount from '../DeleteAccount';
import FeedBack from '../FeedBack';
import commonStyle from '../../assets/styles/common.style';
import {HorizontalSpacer} from '../../lib/utils/global';
import HeaderLeftIcon from '../../components/HeaderLeftIcon';

class AppSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightMode: true,
      alertModal: false,
      msgToDisplay: '',
      deactiveModal: false,
      signOutModal: false,
      securityVisible: false,
      faqVisible: false,
      deleteVisible: false,
      feedVisible: false,
    };
  }
  componentDidMount = () => {
    this.props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  };
  componentWillUnmount = () => {
    this.props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: undefined,
      },
    });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity>
          <QR />
        </TouchableOpacity>
      </View>
    );
  };

  headerLeft = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeaderLeftIcon
          onPress={() => this.props.navigation.replace(route.MAIN)}
          color={themeStyle.PRIMARY_TINT_COLOR}
        />
        <Text style={styles.menuHeading}>Menu</Text>
      </View>
    );
  };

  listItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(item.route)}
        style={styles.listItemContainer}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  setSecurityFunc = () => {
    this.setState({securityVisible: false});
  };
  setFaqFunc = () => {
    this.setState({faqVisible: false});
  };
  setFeedFunc = () => {
    this.setState({feedVisible: false});
  };
  setDeleteFunc = () => {
    this.setState({deleteVisible: false});
    this.props.navigation.replace(route.LOGINORSIGNUP);
  };

  render() {
    const {name, image} = this.props.user.userData;
    const {signOutModal, alertModal, msgToDisplay, deactiveModal} = this.state;
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={{
              flex: 0.3,
              flexDirection: 'column',
            }}
          ></View>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderBottomLeftRadius: 30,
              borderTopLeftRadius: 30,
              paddingHorizontal: '5%',
              paddingVertical: '5%',
            }}
          >
            <View style={{flex: 1, marginTop: Platform.OS ? '15%' : '10%'}}>
              <View style={{flex: 0.2}}>
                <View style={styles.menuHeadingContainer}>
                  <Icon.AntDesign
                    onPress={
                      () =>
                        this.props.navigation.replace(route.MAIN, {
                          screen: route.HOME,
                        })
                      // setTimeout(() => {
                      //   this.props.setVisible(false);
                      // }, 1000)
                      // this.setState({visible: false})
                    }
                    name="arrowleft"
                    size={25}
                    color={themeStyle.COLOR_BLACK}
                  />
                  {HorizontalSpacer()}
                  <Text style={commonStyle.burgerMenuHeadingTextStyle}>
                    Settings
                  </Text>
                </View>
                <View style={{...styles.rowContainer}}>
                  <Avatar
                    source={
                      image
                        ? {uri: image}
                        : require('../../assets/images/profile_logo.jpg')
                    }
                    rounded
                    avatarStyle={{
                      // marginRight:10,
                      borderWidth: 2,
                      borderColor: '#485DDA',
                    }}
                    size={70}
                  />
                  <View style={{marginLeft: '5%'}}>
                    <Text style={commonStyle.burgerMenuUserNameTextStyle}>
                      {this.props.user.userData.name
                        ? this.props.user.userData.name.length > 13
                          ? this.props.user.userData.name.split(' ')[0]
                          : this.props.user.userData.name
                        : '(Your Name)'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    >
                      <Text style={commonStyle.burgerMenuViewTextStyle}>
                        View Settings{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.8}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.SECURITYSETTINGS);
                  }}
                  style={[styles.listItemContainer, {marginTop: '8%'}]}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Security />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Security'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.FAQS);
                    // this.setState({ faqVisible: true });
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Faq />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'FAQS'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.TUTORIALS);
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Tutorial />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Tutorials'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.SUPPORT);
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Support />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Support'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.REVIEWAPP);
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Review />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Review App'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.TERMANDCONDITIONS, {
                      setting: true,
                    });
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Terms />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>
                          {'MC Terms & Policies'}
                        </Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.INVITEFRIEND);
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Invite />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Invite a Friend'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(route.DELETEACCOUNT);
                  }}
                  style={styles.listItemContainer}
                >
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <View style={{flex: 0.15}}>
                        <Delete />
                      </View>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.itemText}>{'Delete Account'}</Text>
                      </View>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.2}}>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.authActions.removeUser(
                        this.props.user.userData.token,
                        this.props?.navigation?.replace,
                      );
                    }}
                    style={styles.btnPrimary}
                  >
                    <Text style={styles.itemText2}>{'Sign out'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </Modal> */}
        <View style={{zIndex: 5}}>
          {this.state.securityVisible && (
            <SecuritySettings
              setSecurityFunc={this.setSecurityFunc}
              setVisible={e => this.props.setVisible(e)}
            />
          )}
          {this.state.faqVisible && (
            <FAQS
              setFaqFunc={this.setFaqFunc}
              setVisible={this.props.setVisible(e)}
            />
          )}

          {this.state.feedVisible && (
            <FeedBack
              setFeedFunc={this.setFeedFunc}
              setVisible={e => this.props.setVisible(e)}
            />
          )}
          {this.state.deleteVisible && (
            <DeleteAccount
              setDeleteFunc={() => this.setDeleteFunc()}
              setVisible={e => this.props.setVisible(e)}
            />
          )}
        </View>

        <DeleteModal
          visible={signOutModal}
          confirm={() => {
            this.setState({signOutModal: false});
            this.props.authActions.removeUser(
              this.props.user.userData.token,
              this.props.navigation.replace,
            );
          }}
          cancel={() => this.setState({signOutModal: false})}
          signOut
        />
        <DeleteModal
          visible={deactiveModal}
          confirm={() => {
            this.setState({deactiveModal: false});
            this.props.authActions.deactiveUser(
              this.props.user.userData.token,
              this.props.navigation.replace,
            );
          }}
          cancel={() => this.setState({deactiveModal: false})}
          deactive
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppSetting);
