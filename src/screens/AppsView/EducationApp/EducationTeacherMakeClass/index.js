import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Input as CustomInput} from 'react-native-elements';
import Search from '../../../../assets/svg/search.svg';
import {
  Container,
  Icon,
  Button,
  Input,
  HeaderLeft,
  TimeModal,
  DateModal,
  DeleteModal,
} from '../../../../components';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import moment from 'moment';
import EducationMenu from '../EducationMenu';
import EducationFunction from './education.teacermakeclass.function';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import {ProfileServices} from '../../../../services';

class EducationTeacherMakeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      visible: false,
      price: '',
      expanded: false,
      alertModal: false,
      msgToDisplay: 'Please fill all fields',
      note: '',
      desc: '',
      dateModalStart: false,
      dateModalEnd: false,
      startDate: '',
      endDate: '',
      date: new Date(),
      date1: new Date(),
      filter: false,
      classes: this.props.route?.params?.item,
      token: this.props.route?.params?.token,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
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
        {/* <TouchableOpacity disabled={true} onPress={() => { this.setState({ filter: true }) }} style={{ marginLeft: 15 }} ><Search /></TouchableOpacity> */}
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

  handleMakeClass = () => {
    const {desc, startDate, endDate, price, token, classes} = this.state;
    if (desc.length && startDate.length && endDate.length && price.length) {
      this.setState({loading: true});
      let data = {
        description: desc,
        date: startDate,
        time: endDate,
        price: price,
      };
      EducationFunction.sendClassRequest(classes._id, data, token)
        .then(res => {
          this.setState({loading: false, filter: false}, () =>
            this.props.navigation.goBack(),
          );
        })
        .catch(err => {
          this.setState({loading: false});
        });
    } else {
      this.setState({alertModal: true});
    }
  };

  render() {
    const {
      filter,
      desc,
      startDate,
      endDate,
      date,
      date1,
      dateModalEnd,
      dateModalStart,
      price,
      classes,
      loading,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <View style={{flex: 0.8, marginTop: '5%'}}>
            <View style={styles.cardContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.avatarContainer}>
                  <Avatar
                    source={{
                      uri:
                        classes?.student?.image != ''
                          ? classes?.student?.image
                          : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                    }}
                    rounded
                    size={120}
                  />
                  <Text style={styles.titleText}>
                    {classes?.student?.username}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Class Topic:</Text>
                  <Text style={styles.colorHeadingText}>{classes?.topic}</Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Subject:</Text>
                  <Text style={styles.colorHeadingText}>
                    {classes?.subject}
                  </Text>
                </View>
                <View style={styles.rowStyle}>
                  <Text style={styles.headingText}>Valid Till:</Text>
                  <Text style={[styles.colorHeadingText]}>27 May 2022</Text>
                </View>
                <View style={{marginTop: '5%'}}>
                  <Text style={styles.headingText}>Description:</Text>
                  <Text style={[styles.descText, {marginTop: '5%'}]}>
                    {classes?.description}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={[styles.btnContainer]}>
            <Button
              customColor={themeStyle.EDUCATION_BROWN}
              titleColor={themeStyle.COLOR_BLACK}
              title="Make class"
              onPress={() => this.setState({filter: true})}
            />
          </View>
        </View>
        {filter && (
          <View style={styles.modalContainer}>
            <View style={{flex: 0.3}}></View>
            <View style={{flex: 0.7}}>
              <KeyboardAwareScrollView>
                <View
                  style={{
                    backgroundColor: themeStyle.COLOR_WHITE,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingVertical: '5%',
                    paddingBottom: '25%',
                    justifyContent: 'flex-end',
                    // width: SCREEN_WIDTH * 0.98,
                    paddingHorizontal: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({filter: false})}
                    style={{alignItems: 'center'}}>
                    <Icon.FontAwesome
                      name="angle-down"
                      size={30}
                      color={'#38474F'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: themeStyle.FONT_REGULAR,
                      color: 'black',
                    }}>
                    Write a reply
                  </Text>
                  <View style={{marginVertical: '5%'}}>
                    <View style={{marginTop: '2%'}}>
                      <CustomInput
                        placeholder="Briefly describe your skills"
                        multiline={true}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                        }}
                        value={desc}
                        containerStyle={styles.containerStyle}
                        onChangeText={e => this.setState({desc: e})}
                        placeholderTextColor={'#77777B'}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      zIndex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // marginTop: '2%',
                    }}>
                    <View style={{marginTop: -10}}>
                      <Text style={styles.desc}>Starting Date</Text>
                      <TouchableOpacity
                        onPress={() => this.setState({dateModalStart: true})}
                        style={styles.inputConttainer1}>
                        <View
                          style={
                            ([styles.inputStyle1],
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: 10,
                            })
                          }>
                          <Icon.MaterialCommunityIcons
                            name="calendar-range"
                            size={20}
                            color={themeStyle.PRIMARY_TINT_COLOR}
                          />
                          <Text style={styles.inputStyle1}>
                            {startDate ? startDate : 'Pick date'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop: -10}}>
                      <Text style={styles.desc}>Starting Time</Text>
                      <TouchableOpacity
                        onPress={() => this.setState({dateModalEnd: true})}
                        style={styles.inputConttainer1}>
                        <View
                          style={
                            ([styles.inputStyle1],
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: 10,
                            })
                          }>
                          <Icon.MaterialCommunityIcons
                            name="clock-outline"
                            size={20}
                            color={themeStyle.PRIMARY_TINT_COLOR}
                          />
                          <Text style={styles.inputStyle1}>
                            {endDate ? endDate : 'Pick time'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text style={styles.desc}>Price</Text>
                    <View style={styles.inputConttainer}>
                      <Input
                        education
                        value={price}
                        keyboardType="numeric"
                        placeholderTextColor={'#77777B'}
                        placeholder="Input price"
                        onChangeText={job => this.setState({price: job})}
                      />
                    </View>
                  </View>
                  <View style={{marginTop: '1%'}}>
                    <Button
                      loading={loading}
                      customColor={themeStyle.EDUCATION_BROWN}
                      titleColor={themeStyle.COLOR_BLACK}
                      title="Send"
                      onPress={() => this.handleMakeClass()}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        )}
        <EducationMenu
          visible={this.state.visible}
          teacher
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONSTUDENT)
          }
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONTEACHERCLASSESANDREQUESTS,
            );
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
              .catch(err => {});
          }}
          onClose={() => this.setState({visible: false})}
        />
        <DateModal
          date={date}
          visible={dateModalStart}
          start
          setDate={name => this.setState({date: name})}
          onClose={() => this.setState({dateModalStart: false})}
          onSave={() =>
            this.setState({
              dateModalStart: false,
              startDate: moment(this.state.date).format('ll'),
            })
          }
        />
        <TimeModal
          date={date1}
          visible={dateModalEnd}
          setDate={name => {
            this.setState({date1: name});
          }}
          onClose={() => this.setState({dateModalEnd: false})}
          onSave={() =>
            this.setState({
              dateModalEnd: false,
              endDate: moment(this.state.date1).format('H:mma'),
            })
          }
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
)(EducationTeacherMakeClass);
