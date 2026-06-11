import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  Container,
  DeleteModal,
  HeaderLeft,
  Icon,
  Loader,
} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';
import {ProfileServices} from '../../../../services';
import EducationMenu from '../EducationMenu';
import EducationModalStudent from '../EducationModalStudent';
import EducationFunction from './education.studentyourclass.function';
import styles from './style';
class EducationStudentYourClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      applicants: [
        {
          _id: '61f4221a6012265786b4d138',
          username: 'mudassirStudent',
          image:
            'http://3.13.164.94:8000/api/file/public/uploads/file-1645175306890.jpg',
          description: 'This is Test description',
          date: '2020-07-10',
          time: '10:80',
          price: '5000',
        },
        {
          _id: '61f4221a6012265786b4d138',
          username: 'mudassirStudent',
          image:
            'http://3.13.164.94:8000/api/file/public/uploads/file-1645175306890.jpg',
          description: 'This is Test description',
          date: '2020-07-10',
          time: '10:80',
          price: '5000',
        },
        {
          _id: '61f4221a6012265786b4d138',
          username: 'mudassirStudent',
          image:
            'http://3.13.164.94:8000/api/file/public/uploads/file-1645175306890.jpg',
          description: 'This is Test description',
          date: '2020-07-10',
          time: '10:80',
          price: '5000',
        },
        {
          _id: '61f4221a6012265786b4d138',
          username: 'mudassirStudent',
          image:
            'http://3.13.164.94:8000/api/file/public/uploads/file-1645175306890.jpg',
          description: 'This is Test description',
          date: '2020-07-10',
          time: '10:80',
          price: '5000',
        },
        {
          _id: '61f4221a6012265786b4d138',
          username: 'mudassirStudent',
          image:
            'http://3.13.164.94:8000/api/file/public/uploads/file-1645175306890.jpg',
          description: 'This is Test description',
          date: '2020-07-10',
          time: '10:80',
          price: '5000',
        },
      ],
      visible: false,
      expanded: false,
      loading: true,
      alertModal: false,
      msgToDisplay: 'There is no response on this query.',
      note: '',
      filter: false,
      classes: this.props.route?.params?.item,
      token: this.props.route?.params?.token,
    };
  }

  componentDidMount = () => {
    this._getRequests(this.state.classes._id);
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  _getRequests = id => {
    EducationFunction.getQueryRequests(id, this.state.token)
      .then(res => {
        this.setState({loading: false, applicants: res.data});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  _acceptRequest = id => {
    let data = {
      query_id: this.state.classes?._id,
      request_id: id,
    };
    EducationFunction.acceptQueryRequest(data, this.state.token)
      .then(res => {
        this._getRequests(this.state.classes._id);
      })
      .catch(err => {});
  };

  _RejectRequest = id => {
    let data = {
      query_id: this.state.classes?._id,
      request_id: id,
    };
    EducationFunction.rejectQueryRequest(data, this.state.token)
      .then(res => {
        this._getRequests(this.state.classes._id);
      })
      .catch(err => {});
  };

  _viewRequests = () => {
    if (this.state.applicants.length > 0) {
      this.setState({filter: true});
    } else {
      this.setState({alertModal: true});
    }
  };
  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Student'}</Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* <TouchableOpacity onPress={() => { this.setState({ filter: true }) }} style={{ marginLeft: 15 }} ><Search /></TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      activeTab,
      note,
      filter,
      classes,
      applicants,
      loading,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={{flex: 0.8, marginTop: '5%'}}>
              <View style={styles.cardContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      source={{
                        uri:
                          this.props.route?.params?.image == ''
                            ? 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
                            : this.props.route?.params?.image,
                      }}
                      rounded
                      size={120}
                    />
                    <Text style={styles.titleText}>
                      {this.props.route?.params?.userName}
                    </Text>
                  </View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.headingText}>Category:</Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.colorHeadingText}>
                      {classes?.category}
                    </Text>
                  </View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.headingText}>Class Topic:</Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.colorHeadingText}>
                      {classes?.topic}
                    </Text>
                  </View>
                  {classes?.subject != 'dummy' && (
                    <View style={styles.rowStyle}>
                      <Text style={styles.headingText}>Subject:</Text>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.colorHeadingText}>
                        {classes?.subject}
                      </Text>
                    </View>
                  )}
                  <View style={{marginTop: '10%'}}>
                    <Text style={styles.headingText}>Description:</Text>
                    <Text style={[styles.descText, {marginTop: '1%'}]}>
                      {classes?.description}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={[styles.btnContainer]}>
              <View style={{}}>
                {/* {
                                this.state.expanded ?
                                    <Button redd title="Delete class" onPress={() => this.setState({ expanded: true })} />
                                    :
                                    <Button gray title="Delete class" onPress={() => this.setState({ expanded: true })} />
                            } */}
                <Button
                  customColor={themeStyle.EDUCATION_BROWN}
                  titleColor={themeStyle.COLOR_BLACK}
                  title="View response"
                  onPress={() => this._viewRequests()}
                />
              </View>
            </View>
          </View>
        )}

        <EducationModalStudent
          visible={filter}
          onClose={() => this.setState({filter: false})}
          data={applicants}
          accept={this._acceptRequest}
          reject={this._RejectRequest}
        />
        <EducationMenu
          visible={this.state.visible}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWSS);
          }}
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Education';
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
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTCLASSESANDREQUESTS,
            );
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onClose={() => this.setState({visible: false})}
        />
        <DeleteModal
          visible={this.state.signOutModal}
          class
          confirm={() => {
            this.setState({signOutModal: false, loading: true}, () =>
              this._deleteClass(classes._id),
            );
          }}
          cancel={() => this.setState({signOutModal: false})}
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
)(EducationStudentYourClassDetail);
