import React, {Component} from 'react';
import {
  ScrollView,
  ScrollViewBase,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Social from '../../assets/svg/social.svg';
import Connect from '../../assets/svg/connect.svg';
import Career from '../../assets/svg/career.svg';
import Mee from '../../assets/svg/mee-new.svg';
import {Container, DeleteModal, Icon} from '../../components';
import Education from '../../assets/svg/education.svg';
import Classified from '../../assets/svg/classified.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import styles from './style';
import {route} from '../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import themeStyle from '../../assets/styles/theme.style';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../redux/actions/bottomTab';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_WHITE,
  iconColor: themeStyle.COLOR_WHITE,
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinModal: false,
      alertModal: false,
      msgToDisplay: '',
      msgModal: false,
      alertMsg: '',
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
    this.props.navigation.setOptions({
      // headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
    });
  };
  headerRight = () => {
    return (
      <TouchableOpacity onPress={() => {}} style={{marginRight: 15}}>
        <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
      </TouchableOpacity>
    );
  };

  headerLeft = () => {
    const {goBack} = this.props.navigation;
    return (
      <View style={{marginLeft: 15}}>
        <Text style={styles.headerTextStyle}>Profile Settings</Text>
      </View>
    );
  };

  render() {
    const {pinModal, msgToDisplay, alertModal, msgModal, alertMsg} = this.state;
    const {
      name,
      is_social_profile_created,
      is_connect_profile_created,
      is_classified_profile_created,
      is_education_profile_created,
      is_career_profile_created,
      is_mental_health_profile_created,
      is_wallet_created,
      image,
    } = this.props.user.userData;
    return (
      <Container>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{paddingBottom: 120}}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
                    prev_screen: undefined,
                  })
                }
              >
                <Avatar
                  avatarStyle={{borderWidth: 1, borderRadius: 60}}
                  source={
                    image
                      ? {uri: image}
                      : require('../../assets/images/profile_logo.jpg')
                  }
                  rounded
                  size={90}
                />
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>
                  {name ? name : '(Your Name)'}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(route.ACCOUNTSETTINGS, {
                      prev_screen: undefined,
                    })
                  }
                  style={{
                    borderColor: themeStyle.COLOR_BLACK,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 8,
                    marginBottom: 8,
                    marginTop: 5,
                  }}
                >
                  <Text style={styles.seeProfileText}>
                    Medicos Connect Account
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Text style={styles.activeText1}>
                  Please select the module to access its profile setting
                </Text>
              </View>
            </View>
            <View style={styles.padding}>
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() =>
                    is_social_profile_created
                      ? this.props.navigation.navigate(
                          route.SOCIALSETTINGS1st,
                          {
                            prev_screen: 'Profile',
                          },
                        )
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        })
                  }
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Social height={45} width={54} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Social</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    is_connect_profile_created
                      ? this.props.navigation.navigate(
                          route.CONNECTSETTINGS1ST,
                          {
                            prev_screen: 'Profile',
                          },
                        )
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        })
                  }
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Connect height={72} width={72} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={[styles.titleStyle]}>Connect</Text>
                  </View>
                </TouchableOpacity>
                {/* to be added */}
                <TouchableOpacity
                  onPress={() =>
                    is_career_profile_created
                      ? this.props.navigation.navigate(route.CAREERSETTINGS, {
                          prev_screen: 'Profile',
                        })
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        })
                  }
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Career height={54} width={54} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Career</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() =>
                    is_classified_profile_created
                      ? this.props.navigation.navigate(
                          route.CLASSIFIEDSETTINGS,
                          {
                            prev_screen: 'Profile',
                          },
                        )
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        })
                  }
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Classified height={61} width={61} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Market</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    is_mental_health_profile_created
                      ? this.props.navigation.navigate(route.MENTALSETTINGS, {
                          prev_screen: 'Profile',
                        })
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        });
                  }}
                  style={[styles.rowContainer, {justifyContent: 'flex-start'}]}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Mee height={53} width={49} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Mee</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    is_education_profile_created
                      ? this.props.navigation.navigate(
                          route.EDUCATIONSETTINGS,
                          {
                            prev_screen: 'Profile',
                          },
                        )
                      : this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        });
                  }}
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Education height={47} width={46} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Education</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() => {
                    is_wallet_created == false
                      ? this.setState({
                          alertModal: true,
                          alertMsg:
                            "Please create profile for each module. To create your profile tap on module's icon on the home screen.",
                        })
                      : this.props.navigation.navigate(route.WALLETSETING, {
                          prev_screen: 'Profile',
                        });
                  }}
                  style={styles.rowContainer}
                >
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Wallet height={54} width={54} />
                  </View>
                  <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <Text style={styles.titleStyle}>Wallet</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal animationType="slide" transparent={true} visible={pinModal}>
          <View style={styles.modalView}>
            {/* Close Button */}
            <View style={styles.iconStyleClose}>
              <TouchableOpacity
                onPress={() => this.setState({pinModal: false})}
              >
                <Icon.AntDesign
                  name="close"
                  size={24}
                  color={themeStyle.PRIMARY_TINT_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <DeleteModal msg visible={msgModal} text={msgToDisplay} />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              this.props.navigation.navigate(route.HOME);
            });
          }}
          text={alertMsg}
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
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
