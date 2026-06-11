import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Image,
  Share,
  Pressable,
} from 'react-native';
import {
  Button,
  Container,
  Icon,
  DateModal,
  HeaderLeft,
  CustomDropDownModal,
  TimeModal,
  DeleteModal,
  Loader,
  CareerSelectModal,
} from '../../../../components';
import {Input as CustomInput} from 'react-native-elements';
import moment from 'moment';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import EducationFunction from './education.teacherpostclass.function';
import {EducationServices, ProfileServices} from '../../../../services';
import EducationMenu from '../EducationMenu';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import ToggleSwitch from 'toggle-switch-react-native';
import {Calendar} from 'react-native-calendars';
import {Input as IT} from 'react-native-elements';
import ShareIcon from '../../../../assets/svg/share-1.svg';
import {route} from '../../../../lib/utils/constants';

class EducationTeacherPostClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      address: '',
      loading: false,
      price: '',
      workshop: true,
      subj: '',
      oneOnOne: false,
      langSearch: false,
      experience: true,
      classLang: [],
      tempClassLang: [],
      searchingData: true,
      selectedLang: [],
      free: true,
      lang: true,
      med: false,
      submit: false,
      date: new Date(),
      date1: new Date(),
      paid: false,
      dateModalStart: false,
      dateModalEnd: false,
      startDate: '',
      endDate: '',
      onSite: false,
      msgToDisplay: '',
      alertModal: false,
      online: true,
      className: '',
      visible: false,
      categories: ['Medicine', 'Language', 'General'],
      category: 'Medicine',
      repeat: false,
      fee: '',
      selectedDates: [],
      repeatClassTime: new Date(),
      classTime: '',
      showRepeatTimeModal: false,
      openCurrencyPicker: false,
      selectedCurrency: {
        name: 'USD',
        title: '$',
      },
      currencyList: [],
      successModal: false,
      meetLink: '',
    };
  }

  componentDidMount = () => {
    this.getClassLanguages();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
    this.getCurrencies();
  };

  getCurrencies = () => {
    EducationServices.getCurrencies(this.props.user.userData.token)
      .then(res => {
        this.setState({
          currencyList: res.data.data,
          selectedCurrency: res.data.data[1],
        });
      })
      .catch(err => {});
  };

  onDayPress = day => {
    const {selectedDates} = this.state;
    const updatedDates = [...selectedDates];
    if (updatedDates.includes(day.dateString)) {
      updatedDates.splice(updatedDates.indexOf(day.dateString), 1);
    } else {
      updatedDates.push(day.dateString);
    }
    this.setState({selectedDates: updatedDates});
  };

  getClassLanguages = () => {
    EducationFunction.getJobLanguages(this.props.user.userData.token)
      .then(res => {
        this.setState({
          classLang: res,
          tempClassLang: res,
          searchingData: false,
        });
      })
      .catch(err => {});
  };

  _createClass = () => {
    const {
      selectedLang,
      subj,
      className,
      price,
      address,
      startDate,
      endDate,
      classTime,
      selectedDates,
      fee,
      repeat,
      selectedCurrency,
      category,
    } = this.state;
    if (
      selectedLang.length > 0 &&
      price.length &&
      subj.length &&
      className.length &&
      address.length &&
      startDate.length &&
      endDate.length
    ) {
      if (repeat && (selectedDates.length === 0 || classTime === '')) {
        this.setState({
          msgToDisplay: 'Please select Repeated dates and Time',
          alertModal: true,
          loading: false,
        });
        return;
      }

      let data = {
        category: category,
        subject: className,
        language: selectedLang[0].id,
        description: address,
        class_type: fee == 0 ? 'Free' : 'Paid',
        price: fee,
        start_date: moment(this.state.date).format('yyy-MM-DD'),
        end_date: moment(this.state.date).format('yyy-MM-DD'),
        start_time: endDate,
        currency: selectedCurrency?._id,
        is_repeated: repeat,
        time: classTime,
        dates: selectedDates,
        tempCurrency: '',
      };

      EducationFunction.createClass(data, this.props.user.userData.token)
        .then(res => {
          this.setState({
            meetLink: res.data,
            loading: false,
            successModal: true,
          });
        })
        .catch(err => {
          this.setState({
            msgToDisplay: 'Snap! Please try again',
            alertModal: true,
            loading: false,
          });
        });
    } else {
      this.setState({
        msgToDisplay: 'Please fill all the fields',
        alertModal: true,
        loading: false,
      });
    }
  };

  seacrhLangFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.classLang.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempClassLang: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
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

  renderChips(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({tags: this.state.tags.filter((_, i) => i != index)})
          }
          style={styles.minusContainer}>
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item}</Text>
        </View>
      </View>
    );
  }
  handleArr = index => {
    let arr = [...this.state.category];
    if (arr[index].selected) {
      arr[index] = {...arr[index], selected: false};
    } else {
      arr[index] = {...arr[index], selected: true};
    }
    return arr;
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({category: this.handleArr(index)})}
        style={styles.row}>
        <View style={item.selected ? styles.selectedbox : styles.box}></View>
        <Text style={item.selected ? styles.selectedOption : styles.option}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      loading,
      alertModal,
      msgToDisplay,
      searchingData,
      classLang,
      subj,
      tempClassLang,
      selectedLang,
      langSearch,
      className,
      date,
      date1,
      price,
      free,
      lang,
      startDate,
      endDate,
      dateModalEnd,
      dateModalStart,
      submit,
      address,
      category,
      categories,
      repeat,
      fee,
      repeatClassTime,
      showRepeatTimeModal,
      classTime,
      openCurrencyPicker,
      selectedCurrency,
      currencyList,
      selectedDates,
      successModal,
      tempCurrency,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <KeyboardAwareScrollView
              style={{flex: 0.8}}
              contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
                <Text style={styles.createClass}>Create Class</Text>
                <Text
                  style={{
                    ...styles.headingText,
                    marginBottom: 8,
                  }}>
                  Select Category{' '}
                </Text>
                <View style={styles.rowContainer1}>
                  {categories?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.setState({category: item})}
                        style={[styles.row, {marginRight: 10}]}>
                        <View
                          style={
                            category === item ? styles.selectedbox : styles.box
                          }></View>
                        <Text
                          style={
                            category === item
                              ? styles.selectedOption
                              : styles.option
                          }>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={{...styles.desc, marginTop: 24}}>Topic</Text>
                <View style={styles.inputConttainer}>
                  <CustomInput
                    placeholder="Enter your topic"
                    value={className}
                    containerStyle={styles.containerStyle}
                    onChangeText={e => this.setState({className: e})}
                    placeholderTextColor={'#77777B'}
                    inputContainerStyle={[
                      styles.inputContainerStyle,
                      {height: 55},
                    ]}
                    inputStyle={[styles.inputStyle, {height: 55}]}
                    textAlignVertical="center"
                  />
                </View>
                <Text style={[styles.desc, {marginTop: -40}]}>Description</Text>
                <View style={{marginTop: '2%'}}>
                  <CustomInput
                    placeholder="Enter your description"
                    multiline={true}
                    value={address}
                    containerStyle={styles.containerStyle}
                    onChangeText={e => this.setState({address: e})}
                    placeholderTextColor={'#77777B'}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    textAlignVertical="top"
                  />
                </View>
                {/* Language dropdown */}
                <View style={styles.margin}>
                  <Text style={styles.desc}>Language</Text>
                  <TouchableOpacity
                    style={styles.inputConttainer2}
                    onPress={() => {
                      this.setState({langSearch: true});
                    }}>
                    <View style={{flex: 1}}>
                      {selectedLang.length > 0 ? (
                        <Text
                          style={{
                            ...styles.desc2,
                            color: themeStyle.COLOR_BLACK,
                          }}>
                          {selectedLang[0]?.label}
                        </Text>
                      ) : (
                        <Text style={{...styles.desc2}}>
                          Enter Class Language
                        </Text>
                      )}
                    </View>
                    <Icon.AntDesign
                      name="caretdown"
                      size={15}
                      color={themeStyle.COLOR_BLACK}
                    />
                  </TouchableOpacity>
                  <CustomDropDownModal
                    lang
                    loading={searchingData}
                    isVisible={langSearch}
                    onClose={() => this.setState({langSearch: false})}
                    data={tempClassLang}
                    OnReset={() => this.setState({tempClassLang: classLang})}
                    onSearch={text => this.seacrhLangFunction(text)}
                    onPress={data => {
                      let array = [];
                      array.push(data);
                      this.setState({
                        selectedLang: array,
                        langSearch: false,
                        tempClassLang: classLang,
                      });
                    }}
                  />
                </View>

                <View style={styles.rowContainer2}>
                  <View style={{marginTop: -10}}>
                    <Text
                      style={{...styles.desc, color: themeStyle.COLOR_BLACK}}>
                      Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({dateModalStart: true})}
                      style={styles.inputConttainer1}>
                      <View
                        style={[
                          styles.inputStyle1,
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 10,
                          },
                        ]}>
                        <Icon.MaterialCommunityIcons
                          name="calendar-range"
                          size={20}
                          color={themeStyle.PRIMARY_TINT_COLOR}
                        />
                        <Text
                          style={{
                            ...styles.inputStyle1,
                            color: startDate
                              ? themeStyle.COLOR_BLACK
                              : themeStyle.PRIMARY_TINT_COLOR,
                          }}>
                          {startDate ? startDate : 'Enter date'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: -10}}>
                    <Text style={styles.desc}>Time</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({dateModalEnd: true})}
                      style={styles.inputConttainer1}>
                      <View
                        style={[
                          styles.inputStyle1,
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 10,
                          },
                        ]}>
                        <Icon.MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color={themeStyle.PRIMARY_TINT_COLOR}
                        />
                        <Text
                          style={{
                            ...styles.inputStyle1,
                            color: endDate
                              ? themeStyle.COLOR_BLACK
                              : themeStyle.PRIMARY_TINT_COLOR,
                          }}>
                          {endDate ? endDate : 'Enter time'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.repeatContainer}>
                  <Text style={styles.desc}>Repeat Classes</Text>
                  <ToggleSwitch
                    isOn={repeat}
                    onColor={themeStyle.EDUCATION_BROWN}
                    offColor={themeStyle.SWITCH_GREY}
                    size="small"
                    onToggle={isOn => this.setState({repeat: isOn})}
                  />
                </View>
                {repeat ? (
                  <>
                    <Calendar
                      style={{marginVertical: 10, borderRadius: 10}}
                      minDate={new Date()}
                      theme={{
                        arrowStyle: {
                          backgroundColor: themeStyle.COLOR_EDUCATION,
                          borderRadius: 5,
                          height: 18,
                          width: 18,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        arrowColor: themeStyle.COLOR_WHITE,
                        calendarBackground: themeStyle.CALENDER_BACKGROUND,
                        textSectionTitleColor: themeStyle.COLOR_BLACK,
                        selectedDayBackgroundColor: themeStyle.PINK_BACKGROUND,
                        selectedDayTextColor: themeStyle.COLOR_WHITE,
                        todayTextColor: themeStyle.COLOR_BLACK,
                        dayTextColor: themeStyle.COLOR_BLACK,
                        textDisabledColor: themeStyle.COLOR_BLACK,
                        monthTextColor: themeStyle.COLOR_EDUCATION,
                        textMonthFontSize: 24,
                        textDayHeaderFontSize: 16,
                        textMonthFontFamily: themeStyle.FONT_BOLD,
                        textDayFontFamily: themeStyle.FONT_REGULAR,
                      }}
                      dayComponent={({date, state}) => {
                        return (
                          <TouchableOpacity
                            disabled={state === 'disabled'}
                            onPress={() => this.onDayPress(date)}
                            style={{
                              backgroundColor: selectedDates.includes(
                                date.dateString,
                              )
                                ? themeStyle.EDUCATION_BROWN
                                : '#E7E7E7',
                              width: '90%',
                              height: 60,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: state === 'disabled' ? 'gray' : 'black',
                                fontSize: 24,
                                fontFamily: themeStyle.FONT_BOLD,
                              }}>
                              {date.day}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                    <Text style={styles.desc}>Time</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({showRepeatTimeModal: true})}
                      style={[styles.inputConttainer1, {width: '100%'}]}>
                      <View
                        style={[
                          styles.inputStyle1,
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 10,
                          },
                        ]}>
                        <Icon.MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color={themeStyle.PRIMARY_TINT_COLOR}
                        />
                        <Text style={styles.inputStyle1}>
                          {classTime ? classTime : 'Enter time'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : null}
                <Text
                  style={[styles.desc, {marginVertical: 10, marginTop: 17}]}>
                  Fee
                </Text>
                <View style={[styles.inputConttainer, {flexDirection: 'row'}]}>
                  <IT
                    containerStyle={styles.feeContainer}
                    placeholder="Enter your price"
                    value={fee}
                    keyboardType="number-pad"
                    inputContainerStyle={styles.inputContainerStylePrice}
                    inputStyle={styles.inputStylePrice}
                    onChangeText={comment => {
                      this.setState({fee: comment});
                    }}
                    onSubmitEditing={() =>
                      this.setState({openCurrencyPicker: true})
                    }
                    rightIcon={
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({openCurrencyPicker: true})
                        }>
                        <Text style={styles.symbol}>
                          {!selectedCurrency?.symbol
                            ? '$'
                            : selectedCurrency?.symbol}
                        </Text>
                      </TouchableOpacity>
                    }
                    rightIconContainerStyle={{
                      marginRight: '2.5%',
                    }}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <View style={{flex: 0.5}}>
                    {submit && !startDate ? (
                      <Text style={commonStyle.errorText}>
                        Please select your start date.
                      </Text>
                    ) : null}
                  </View>
                  <View style={{flex: 0.5}}>
                    {submit && !endDate ? (
                      <Text style={commonStyle.errorText}>
                        Please select your start time.
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postBtn}
                onPress={() =>
                  this.setState(
                    {
                      loading: true,
                      price: free ? '00' : price,
                      subj: lang ? 'dummy' : subj,
                    },
                    () => this._createClass(),
                  )
                }>
                <Text style={styles.btnText}>{'Post'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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

        <Modal
          animationType="none"
          transparent={true}
          visible={successModal}
          onRequestClose={() => {
            this.setState({successModal: false});
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Pressable
                onPress={() => this.props.navigation.goBack()}
                style={styles.crossIcon}>
                <Icon.Entypo
                  name="cross"
                  size={24}
                  color={themeStyle.COLOR_BLACK}
                />
              </Pressable>
              <Image
                source={require('../../../../assets/gifs/post-saved.gif')}
                style={styles.gif}
              />
              <Text style={styles.classCreated}>Class Created</Text>
              <Text style={styles.successText}>Successfully</Text>
              <TouchableOpacity
                style={[styles.postBtn, {width: '100%', flexDirection: 'row'}]}
                onPress={() => {
                  Share.share({
                    title: 'Class Meet Link',
                    message: this.state.meetLink,
                  });
                }}>
                <ShareIcon />
                <Text style={[styles.btnText, {marginLeft: 10}]}>
                  {'Share Link'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TimeModal
          date={repeatClassTime}
          visible={showRepeatTimeModal}
          setDate={name => {
            this.setState({repeatClassTime: name});
          }}
          onClose={() => this.setState({showRepeatTimeModal: false})}
          onSave={() =>
            this.setState({
              showRepeatTimeModal: false,
              classTime: moment(repeatClassTime).format('H:mma'),
            })
          }
        />

        <CareerSelectModal
          removeSearch
          title="Select Currency"
          education
          selectedData={tempCurrency ? tempCurrency : selectedCurrency}
          loading={false}
          isVisible={openCurrencyPicker}
          onClose={() => this.setState({openCurrencyPicker: false})}
          data={currencyList}
          onPress={data => {
            this.setState({
              tempCurrency: data,
            });
          }}
          onSelect={data => {
            this.setState({
              selectedCurrency: tempCurrency,
              openCurrencyPicker: false,
            });
          }}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
        <EducationMenu
          visible={this.state.visible}
          teacher
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONSTUDENT)
          }
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONTEACHERCLASSESANDREQUESTS,
            );
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          data={this.props.user.userData}
          navigation={this.props.navigation}
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
          onClose={() => this.setState({visible: false})}
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
)(EducationTeacherPostClass);
