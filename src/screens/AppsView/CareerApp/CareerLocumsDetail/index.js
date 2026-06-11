import React, {Component} from 'react';

import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import Star from '../../../../assets/svg/star.svg';
import Close from '../../../../assets/svg/close.svg';
import Refresh from '../../../../assets/svg/refresh.svg';
import {Container, Icon, Button, Input} from '../../../../components';

import styles from './style';
import CareerMenu from '../CareerMenu';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ProfileServices} from '../../../../services';

class CareerLocumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      visible: false,
      expanded: false,
      note: '',
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  renderCardView = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
            }}
            rounded
            size={120}
          />
          <Text style={styles.titleText}>Company Name</Text>
          <Text style={styles.designationText}>Graphic Designer</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.headingText}>Salary Offered</Text>
          <Text onPress={() => {}} style={styles.colorHeadingText}>
            Apply for details
          </Text>
        </View>
        <View style={{marginTop: '2%'}}>
          <Text style={styles.headingText}>Info:</Text>
          <Text style={[styles.descText, {marginTop: '2%'}]}>
            Software development and UI/UX
          </Text>
          <Text style={styles.descText}>Experience: 10 Years</Text>
          <Text style={styles.descText}>Islamabad</Text>
          <Text
            onPress={() => {}}
            style={[styles.colorText, {marginTop: '2%'}]}
          >
            {' '}
            Read more
          </Text>
        </View>
        {this.state.sent ? (
          <View
            style={[
              styles.rowContainer,
              {marginTop: '15%', marginBottom: '10%'},
            ]}
          >
            <Icon.Ionicons
              name="md-checkmark-circle"
              size={30}
              color="#1DD1A1"
            />
            <Text style={styles.colorHeadingText1}>Application Sent</Text>
          </View>
        ) : (
          <View style={{marginTop: '15%'}}>
            <Text style={[styles.colorText, {textAlign: 'center'}]}>
              Report unmatched job
            </Text>
            <View style={styles.rowContainer}>
              <Star />
              <View style={styles.gap} />
              <Close />
              <View style={styles.gap} />
              <TouchableOpacity
                onPress={() =>
                  this.setState({sent: true}, () => {
                    setTimeout(() => {
                      this.setState({sent: false});
                    }, 2000);
                  })
                }
              ></TouchableOpacity>
              <View style={styles.gap} />
              <Refresh />
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {activeTab, note} = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <View style={{flex: 0.8, marginTop: '5%'}}>
            <View style={styles.cardContainer}>
              <View style={styles.avatarContainer}>
                <Avatar
                  source={{
                    uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                  }}
                  rounded
                  size={120}
                />
                <Text style={styles.titleText}>Company Name</Text>
                <Text style={styles.designationText}>Graphic Designer</Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.titleText1}>Salary Offered</Text>
                <Text onPress={() => {}} style={styles.colorHeadingText}>
                  Apply for details
                </Text>
              </View>
              <View style={{marginTop: '2%'}}>
                <Text style={styles.headingText}>Info:</Text>
                <Text style={[styles.descText, {marginTop: '2%'}]}>
                  Software development and UI/UX
                </Text>
                <Text style={styles.descText}>Experience: 10 Years</Text>
                <Text style={styles.descText}>Islamabad</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.btnContainer,
              {flex: this.state.expanded ? 0.33 : 0.2},
            ]}
          >
            {this.state.expanded ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({expanded: !this.state.expanded})
                  }
                  style={styles.btonContainer}
                >
                  <Text style={[styles.whiteText, {textAlign: 'center'}]}>
                    Contact
                  </Text>
                  <View style={styles.gap} />
                  <Icon.FontAwesome name="caret-up" color="white" size={20} />
                </TouchableOpacity>
                <View style={styles.rowContainer1}>
                  <View style={styles.viewStyle}>
                    <Text style={styles.colorText}>Chat</Text>
                  </View>
                  <View style={styles.viewStyle}>
                    <Text style={styles.colorText}>Call</Text>
                  </View>
                  <View style={styles.viewStyle}>
                    <Text style={styles.colorText}>SMS</Text>
                  </View>
                </View>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({expanded: !this.state.expanded})}
                style={styles.btonContainer}
              >
                <Text style={[styles.whiteText, {textAlign: 'center'}]}>
                  Contact
                </Text>
                <View style={styles.gap} />
                <Icon.FontAwesome name="caret-down" color="white" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <CareerMenu
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Career';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0]._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});
                await this.props.authActions.getUserModules(
                  this.props.user.userData.token,
                );
                this.props.navigation.replace(route.MAIN);
              })
              .catch(err => {});
          }}
          visible={this.state.visible}
          onViewJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBAPPLIED),
            )
          }
          onClose={() => this.setState({visible: false})}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    search: state.searchReducer,
    user: state.authReducer || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerLocumDetail);
