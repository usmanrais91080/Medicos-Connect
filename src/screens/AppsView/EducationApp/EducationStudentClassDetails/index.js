import moment from 'moment';
import React, {Component} from 'react';
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {Button, Container, HeaderLeft, Icon} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';
import {EducationServices, ProfileServices} from '../../../../services';
import EducationMenu from '../EducationMenu';
import EducationFunction from './education.studentclassdetail.function';
import styles from './style';
import TeacherReviewModal from '../../../../components/Modals/TeacherReviewModal';

class EducationStudentClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      visible: false,
      sent: false,
      applying: false,
      classes: this.props.route?.params?.item,
      token: this.props.route?.params?.token,
      fromUpcomingClasses: this.props.route?.params?.fromUpcomingClasses,
      showModal: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
    this.props.navigation.addListener('focus', () => {
      this.showModal();
    });
  };

  _applyClass = id => {
    EducationFunction.applyToClass(id, this.state.token)
      .then(res => {
        this.setState({applying: false, sent: true});
      })
      .catch(err => {});
  };

  showModal = () => {
    if (this.props.route?.params?.fromEndClass) {
      this.setState({
        showModal: true,
      });
    }
  };

  hideModal = () => {
    Keyboard.dismiss();
    this.setState({
      showModal: false,
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>
            {this.props?.user?.userData?.education_mode == 'Teacher'
              ? 'Teacher'
              : 'Student'}
          </Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  onStartClass = () => {
    const {classes} = this.state;
    const {education_mode, _id, token} = this.props?.user?.userData;

    if (education_mode == 'Teacher') {
      EducationServices.startClassSession(
        {
          teacher_id: _id,
          class_id: classes._id,
        },
        token,
      )
        .then(() => null)
        .catch(() => null);
    }
    this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
      url: classes?.url,
      class_id: classes?._id,
      item: this.props.route?.params?.item,
    });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
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

  renderCardView = () => {
    const {classes, applying, fromUpcomingClasses, showModal} = this.state;
    return (
      <View style={styles.cardContainer}>
        <ScrollView
          style={{marginTop: '5%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '10%'}}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={{
                uri:
                  classes?.teacher?.image != '' ||
                  classes?.user?.education_image != ''
                    ? classes?.teacher?.image || classes?.user?.education_image
                    : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
              }}
              rounded
              size={120}
            />
            <Text style={styles.titleText}>
              {classes?.teacher?.username || classes?.user?.education_username}
            </Text>
          </View>
          <View style={styles.line} />
          {classes?.subject ? (
            <View style={styles.rowStyle}>
              <Text style={styles.headingText}>Topic</Text>
              <Text style={styles.colorHeadingText}>{classes?.subject}</Text>
            </View>
          ) : null}
          {classes?.description ? (
            <View style={styles.rowStyle}>
              <Text style={styles.headingText}>Description</Text>
              <Text style={styles.colorHeadingText}>
                {classes?.description}
              </Text>
            </View>
          ) : null}
          {classes?.language?.name ? (
            <View style={styles.rowStyle}>
              <Text style={styles.headingText}>Class Language</Text>
              <Text style={styles.colorHeadingText}>
                {classes?.language?.name}
              </Text>
            </View>
          ) : null}
          <View style={styles.rowStyle}>
            <Text style={styles.headingText}>Fee</Text>
            <Text style={styles.colorHeadingText}>
              {classes?.class_type == 'Free' ? 'Free' : `$${classes?.price}`}
            </Text>
          </View>
          {classes?.start_date ? (
            <View style={styles.rowStyle}>
              <Text style={styles.headingText}>Date</Text>
              <Text style={styles.colorHeadingText}>
                {moment(classes?.start_date).format('ll')}
              </Text>
            </View>
          ) : null}
          {classes?.start_time ? (
            <View style={styles.rowStyle}>
              <Text style={styles.headingText}>Time</Text>
              <Text style={styles.colorHeadingText}>{classes?.start_time}</Text>
            </View>
          ) : null}
          {fromUpcomingClasses ? (
            <TouchableOpacity
              disabled={
                this.props?.user?.userData?.education_mode == 'Teacher'
                  ? false
                  : false
                // !classes?.teacher_entered
              }
              onPress={this.onStartClass}
              style={{
                ...styles.btnContainer1,
                backgroundColor: !classes?.teacher_entered
                  ? themeStyle.EDUCATION_BROWN
                  : '#E9E9E9',
              }}>
              <Text style={styles.takeClassTexst}>Take Class</Text>
            </TouchableOpacity>
          ) : this.state.sent || classes?.is_applied ? (
            <View
              style={[
                styles.rowContainer,
                {marginTop: '29%', marginBottom: '10%'},
              ]}>
              <Icon.Ionicons
                name="checkmark-circle-sharp"
                size={30}
                color={themeStyle.EDUCATION_BROWN}
              />
              <Text style={styles.colorHeadingText1}>Application Sent</Text>
            </View>
          ) : (
            <View style={{marginTop: '15%', marginHorizontal: '5%'}}>
              <Button
                loading={applying}
                customColor={themeStyle.EDUCATION_BROWN}
                titleColor={themeStyle.COLOR_BLACK}
                title="Apply"
                height={60}
                onPress={() =>
                  this.setState({applying: true}, () =>
                    this._applyClass(classes?._id),
                  )
                }
              />
            </View>
          )}
        </ScrollView>
        <TeacherReviewModal
          visible={showModal}
          onClose={this.hideModal}
          token={this.props.user.userData.token}
          class_id={classes?._id}
          teacher_id={classes.user?._id}
        />
        <EducationMenu
          visible={this.state.visible}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
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
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            );
          }}
          onClose={() => this.setState({visible: false})}
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
              .catch(err => {
                console.log(err);
              });
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>{this.renderCardView()}</View>
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
)(EducationStudentClassDetail);
