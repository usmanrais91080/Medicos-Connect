import moment from 'moment';
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  Container,
  HeaderLeft,
  Icon,
  Loader,
} from '../../../../components';
import {BottomDeleteMenu} from '../../../../components/BottomDeleteMenu';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import EducationMenu from '../EducationMenu';
import EducationModalTeacher from '../EducationModalTeacher';
import EducationFunction from './education.teacheryourclass.function';
import deleteGif from '../../../../assets/svg/delete-Gif-education.svg';

import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {connect} from 'react-redux';
import {EducationServices, ProfileServices} from '../../../../services';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';

class EducationTeacherYourClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      applicants: [],
      visible: false,
      expanded: false,
      loading: true,
      note: '',
      filter: false,
      signOutModal: false,
      classes: this.props.route?.params?.classData,
      token: this.props.route?.params?.token,
      btn_enable: false,
    };
  }

  componentDidMount = () => {
    let today = new Date();
    let btn_enable =
      moment(today).format('YYYY-MM-DD') >=
        this.props.route?.params?.classData?.start_date ||
      (this.props.route?.params?.classData?.end_date &&
        moment(today).format('H:mma') >=
          this.props.route?.params?.classData?.start_time) ||
      this.props.route?.params?.classData?.end_date
        ? true
        : false;
    this.setState({btn_enable});
    this._getClassApplicants(this.state.classes._id);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      let today = new Date();
      let btn_enable =
        (moment(today).format('YYYY-MM-DD') >=
          this.props.route?.params?.classData?.start_date &&
          moment(today).format('H:mma') >=
            this.props.route?.params?.classData?.start_time) ||
        this.props.route?.params?.classData?.start_time
          ? true
          : false;
      this.setState({btn_enable});
    });
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  _deleteClass = id => {
    EducationFunction.deleteClass(id, this.state.token)
      .then(res => {
        this.setState({loading: false}, () => this.props.navigation.goBack());
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  _getClassApplicants = id => {
    EducationFunction.getClassApplicants(id, this.state.token)
      .then(res => {
        this.setState({loading: false, applicants: res.data});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Teacher'}</Text>
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
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}
        >
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  startClass = classes => {
    const {token} = this.state;
    const data = {
      class_id: classes?._id,
      teacher_entered: true,
    };

    EducationServices.startClassSession(
      {
        teacher_id: this.props.user.userData._id,
        class_id: classes._id,
      },
      token,
    )
      .then(() => null)
      .catch(() => null);

    EducationServices.updateTeacherEntered(data, token)
      .then(res => {
        this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
          url: classes?.url,
          class_id: classes?._id,
        });
      })
      .catch(err => {});
  };

  render() {
    const {filter, classes, applicants, loading, btn_enable} = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.avatarContainer}>
                  <Avatar
                    source={{
                      uri:
                        this.props.route?.params?.img == ''
                          ? 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
                          : this.props.route?.params?.img,
                    }}
                    rounded
                    size={120}
                  />
                  <Text style={styles.titleText}>
                    {this.props.route?.params?.userName}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Class Topic:</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.colorHeadingText}
                  >
                    {classes?.subject}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Language:</Text>
                  <Text style={[styles.colorHeadingText]}>
                    {classes?.language?.name}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Class Price:</Text>
                  <Text style={[styles.colorHeadingText]}>
                    {classes?.class_type == 'Paid'
                      ? `USD ${classes?.price}`
                      : 'Free'}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Starting Date:</Text>
                  <Text style={[styles.colorHeadingText]}>
                    {moment(classes?.start_date || classes?.end_date).format(
                      'll',
                    )}
                  </Text>
                </View>
                <View style={{marginTop: '5%'}}>
                  <Text style={styles.headingText}>Description:</Text>
                  <Text style={[styles.descText, {marginTop: '1%'}]}>
                    {classes?.description}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.btnContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      route.EDUCATIONTEACHEREDITCLASSDETAIL,
                      {classes},
                    )
                  }
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: themeStyle.COLOR_WHITE,
                      width: SCREEN_WIDTH * 0.44,
                    },
                  ]}
                >
                  <Text style={styles.btnText}>Edit Class</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({filter: true})}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: themeStyle.COLOR_WHITE,
                      width: SCREEN_WIDTH * 0.44,
                    },
                  ]}
                >
                  <Text style={styles.btnText}>View Students</Text>
                </TouchableOpacity>
              </View>
              {VerticalSpacer()}
              <Button
                customColor={themeStyle.EDUCATION_BROWN}
                titleColor={themeStyle.COLOR_BLACK}
                title="Start class"
                disabled={btn_enable ? false : true}
                onPress={() => this.startClass(classes)}
              />
              {VerticalSpacer()}
              <Button
                customColor={themeStyle.EDUCATION_BROWN}
                titleColor={themeStyle.COLOR_BLACK}
                title="Delete class"
                onPress={() => this.setState({signOutModal: true})}
              />
            </View>
          </View>
        )}

        <EducationModalTeacher
          visible={filter}
          onClose={() => this.setState({filter: false})}
          data={applicants}
        />
        <EducationMenu
          visible={this.state.visible}
          teacher
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONSTUDENT)
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
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONTEACHERCLASSESANDREQUESTS,
            );
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERPOSTCLASS);
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
              .catch(err => {
                console.log(err);
              });
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onClose={() => this.setState({visible: false})}
        />
        <BottomDeleteMenu
          visible={this.state.signOutModal}
          onClose={() => this.setState({signOutModal: false})}
          data={{
            icon: deleteGif,
            text: 'Are you sure you want to delete this?',
            buttonText: 'Delete',
            onPress: () => {
              this.setState({signOutModal: false, loading: true}),
                this._deleteClass(classes._id);
            },
          }}
          theme="education"
        />
        {/* <DeleteModal
          visible={ this.state.signOutModal }
          class
          confirm={ () => {
            this.setState({ signOutModal: false, loading: true }, () =>
              this._deleteClass(classes._id),
            );
          } }
          cancel={ () => this.setState({ signOutModal: false }) }
        /> */}
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
)(EducationTeacherYourClassDetail);
