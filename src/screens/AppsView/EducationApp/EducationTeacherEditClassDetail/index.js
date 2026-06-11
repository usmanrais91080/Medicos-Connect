import moment from 'moment';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Input as CustomInput} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import themeStyle from '../../../../assets/styles/theme.style';
import Search from '../../../../assets/svg/white-search.svg';
import {
  Button,
  Container,
  CustomDropDownModal,
  DateModal,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  Loader,
  TimeModal,
} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import EducationFunction from './education.teachereditclass.function';
import styles from './style';

class EducationTeacherEditClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      address: this.props.route?.params?.classes.description,
      loading: false,
      price:
        this.props.route?.params?.classes.price != '00'
          ? this.props.route?.params?.classes.price
          : '',
      workshop: true,
      oneOnOne: false,
      langSearch: false,
      experience: true,
      classLang: [],
      tempClassLang: [],
      searchingData: true,
      selectedLang: [{label: this.props.route?.params.classes?.language?.name}],
      free:
        this.props.route?.params?.classes.class_type == 'Paid' ? false : true,
      lang:
        this.props.route?.params?.classes.category == 'Language' ? true : false,
      med:
        this.props.route?.params?.classes.category == 'Language' ? false : true,
      submit: false,
      date: new Date(),
      date1: new Date(),
      paid:
        this.props.route?.params?.classes.class_type == 'Paid' ? true : false,
      dateModalStart: false,
      dateModalEnd: false,
      startDate: moment(
        this.props.route?.params?.classes.start_date
          ? this.props.route?.params?.classes.start_date
          : this.props.route?.params?.classes.end_date,
      ).format('ll'),
      endDate: this.props.route?.params?.classes.end_date,
      onSite: false,
      msgToDisplay: '',
      alertModal: false,
      online: true,
      className: this.props.route?.params?.classes?.subject,
    };
  }

  componentDidMount = () => {
    this.getClassLanguages();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
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

  _updateClass = () => {
    const {
      selectedLang,
      lang,
      className,
      free,
      price,
      address,
      startDate,
      endDate,
    } = this.state;
    if (
      selectedLang.length > 0 &&
      price.length &&
      className &&
      address.length &&
      startDate.length &&
      endDate.length
    ) {
      let data = {
        class_id: this.props.route?.params?.classes._id,
        category: lang ? 'Language' : 'Medicine',
        subject: className,
        language: selectedLang[0].id,
        description: address,
        class_type: free ? 'Free' : 'Paid',
        price: price,
        start_date: moment(this.state.date).format('yyy-MM-DD'),
        end_date: endDate,
      };
      EducationFunction.updateClass(data, this.props.user.userData.token)
        .then(res => {
          this.setState({loading: false}, () =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER),
          );
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
      tempClassLang,
      selectedLang,
      langSearch,
      className,
      date,
      date1,
      price,
      paid,
      free,
      lang,
      med,
      startDate,
      endDate,
      dateModalEnd,
      dateModalStart,
      submit,
      online,
      onSite,
      address,
      category,
      workshop,
      oneOnOne,
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
                <Text>Update class</Text>
                <Text style={{marginVertical: 10, ...styles.headingText}}>
                  Select Category{' '}
                </Text>
                <View style={styles.rowContainer1}>
                  <TouchableOpacity
                    onPress={() => this.setState({med: false, lang: true})}
                    style={styles.row}>
                    <View style={lang ? styles.selectedbox : styles.box}></View>
                    <Text style={lang ? styles.selectedOption : styles.option}>
                      Language
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({med: true, lang: false})}
                    style={[styles.row, {marginLeft: '15%'}]}>
                    <View style={med ? styles.selectedbox : styles.box}></View>
                    <Text style={med ? styles.selectedOption : styles.option}>
                      Medicine
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{...styles.desc, marginVertical: 10}}>
                  Topic name
                </Text>
                <View style={styles.inputConttainer}>
                  <Input
                    education
                    value={className}
                    placeholder=""
                    onChangeText={job => this.setState({className: job})}
                  />
                </View>
                <Text style={styles.headingText}>Price</Text>
                <View style={{...styles.rowContainer1, height: 60}}>
                  <TouchableOpacity
                    onPress={() => this.setState({paid: false, free: true})}
                    style={styles.row}>
                    <View style={free ? styles.selectedbox : styles.box}></View>
                    <Text style={free ? styles.selectedOption : styles.option}>
                      Free
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({paid: true, free: false, price: ''})
                    }
                    style={[styles.row, {marginLeft: '15%'}]}>
                    <View style={paid ? styles.selectedbox : styles.box}></View>
                    <Text style={paid ? styles.selectedOption : styles.option}>
                      Paid
                    </Text>
                  </TouchableOpacity>
                  {paid && (
                    <View
                      style={{
                        ...styles.inputConttainer,
                        flex: 0.6,
                        marginTop: '0%',
                      }}>
                      <Input
                        colorProps
                        value={price}
                        disabled={free ? true : false}
                        keyboardType="number-pad"
                        placeholder=""
                        onChangeText={price => this.setState({price: price})}
                      />
                    </View>
                  )}
                </View>
                <Text style={styles.desc}>Description</Text>
                <View style={{marginTop: '2%'}}>
                  <CustomInput
                    placeholder="Mention all the details your students should know about this class before they enroll. Tell them how they will benefit from your class."
                    multiline={true}
                    value={address}
                    containerStyle={styles.containerStyle}
                    onChangeText={e => this.setState({address: e})}
                    placeholderTextColor={'#77777B'}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                  />
                </View>
                {/* Language dropdown */}
                <View style={styles.margin}>
                  <Text style={styles.desc}>Class Language</Text>
                  <TouchableOpacity
                    style={styles.inputConttainer2}
                    onPress={() => {
                      this.setState({langSearch: true});
                    }}>
                    <View style={{flex: 1}}>
                      {selectedLang.length > 0 ? (
                        <Text style={{...styles.desc2}}>
                          {selectedLang[0]?.label}
                        </Text>
                      ) : (
                        <Text style={{...styles.desc2}}>
                          Select your language
                        </Text>
                      )}
                    </View>
                    <Icon.MaterialIcons
                      name="keyboard-arrow-down"
                      size={30}
                      color={themeStyle.PRIMARY_TINT_COLOR}
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

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '5%',
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
                          {endDate
                            ? moment(endDate).format('H:mma')
                            : 'Pick time'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2.5%',
                  }}>
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
            <View style={[styles.btnContainer]}>
              <Button
                customColor={themeStyle.EDUCATION_BROWN}
                titleColor={themeStyle.COLOR_BLACK}
                title="Update class"
                onPress={() =>
                  this.setState(
                    {
                      loading: true,
                      price: free ? '00' : price,
                    },
                    () => this._updateClass(),
                  )
                }
              />
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
export default connect(mapStateToProps)(EducationTeacherEditClassDetail);
