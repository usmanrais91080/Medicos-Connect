import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../assets/styles/theme.style';
import {ContentModal, Icon, Input} from '../../components';
import {authActions} from '../../redux/actions/auth';
import styles from './style';
import Social from '../../assets/svg/social.svg';
import Education from '../../assets/svg/education.svg';
import Connect from '../../assets/svg/connect.svg';
import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';

import ArrowRight from '../../assets/svg/arrowRightModal.svg';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArr: [...this.props.user.userModules],
      viewModal: false,
      module: '',
      visible: false,
    };
  }
  VerticalSpacer = () => {
    return <View style={{height: 30}}></View>;
  };

  componentDidMount = () => {
    this.setState({visible: true});
  };

  render() {
    const {searchArr, viewModal, module} = this.state;
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
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
              paddingLeft: 25,
            }}
          >
            <View style={{flex: 1, marginTop: Platform.OS ? '10%' : '6%'}}>
              <View style={styles.menuContainer}>
                <Icon.AntDesign
                  onPress={() => this.props.navigation.goBack()}
                  name="arrowleft"
                  size={25}
                  color={themeStyle.COLOR_BLACK}
                />
                <Text style={styles.menuheading}>Settings</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'General'});
                }}
                style={[
                  styles.listItemContainer,
                  {borderBottomWidth: 0, marginBottom: -50},
                ]}
              >
                <Icon.AntDesign
                  onPress={() => this.props.navigation.goBack()}
                  name="arrowleft"
                  size={20}
                  color={themeStyle.COLOR_BLACK}
                />
                <Text style={styles.faqs}>FAQS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'General'});
                }}
                style={[styles.listItemContainer, {marginTop: 40}]}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <Image
                    style={{
                      height: 50,
                      width: 60,
                    }}
                    source={require('../../assets/images/profile_logo.jpg')}
                  />
                  <Text style={styles.itemText}>{'General'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Wallet'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-5%'}}>
                      <Wallet width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Wallet'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Connect'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-25%'}}>
                      <Connect width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Connect'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Social'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-25%'}}>
                      <Social width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Social'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Mee'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View
                      style={{
                        marginLeft: '-20%',
                      }}
                    >
                      <Mee width={'90%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Mee'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Career'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-10%'}}>
                      <Career width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Career'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Education'});
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-20%'}}>
                      <Education width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Education'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({viewModal: true, module: 'Classified'});
                }}
                style={[styles.listItemContainer, {borderBottomWidth: 0}]}
              >
                <View style={styles.flex}>
                  {/* <View style={styles.iconContainer}> */}
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-5%'}}>
                      <Classified width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Classified'}</Text>
                  {/* </View> */}
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              {/* <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({signOutModal: true})}
                  style={styles.btnPrimary}>
                  <Text style={styles.itemText2}>{'Sign out'}</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
        <ContentModal
          module={module}
          visible={viewModal}
          cancel={() => this.setState({viewModal: false})}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);
