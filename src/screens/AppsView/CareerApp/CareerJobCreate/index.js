import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchActions} from '../../../../redux/actions/search';
import {Input as IT} from 'react-native-elements';
import {
  Button,
  Container,
  DeleteModal,
  Icon,
  Input,
  CustomDropDownModal,
  CareerSelectModal,
} from '../../../../components';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import CareerMenu from '../CareerMenu';
import {
  CareerServices,
  EducationServices,
  ProfileServices,
} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {authActions} from '../../../../redux/actions/auth';
import DatePicker from 'react-native-neat-date-picker';
import moment from 'moment';
import Calender from '../../../../assets/svg/calender.svg';
import CareerCountryModal from '../../../../components/Modals/CareerCountryModal';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class CareerJobCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: '',
      visible: false,
      typeData: [],
      tempCity: [],
      tempCountry: [],
      tempTitle: [],
      citySearch: false,
      countrySearch: false,
      searchingData: false,
      titleData: [],
      countryData: [],
      cityData: [],
      jobCities: [],
      jobCountries: [],
      jobDesc: '',
      alertModal: false,
      msgToDisplay: '',
      tempProfessions: [],
      professionsData: [],
      profSearch: false,
      jobProfession: [],
      openCurrencyPicker: false,
      selectedCurrency: null,
      currencyList: [],
      link: '',
      deadline: false,
      deadlineDate: null,
      experience: '',
      education: '',
      jobPosted: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
    this.getJobTitles();
    this.getJobProfessions();
    this.getJobCountries();
    this.getJobTypes();
    this.getCurrencies();
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

  getCurrencies = () => {
    EducationServices.getCurrencies(this.props.user.userData.token)
      .then(res => {
        this.setState({
          currencyList: res.data.data,
          selectedCurrency: res.data.data[0],
        });
      })
      .catch(err => {});
  };

  getJobTitles = () => {
    CareerServices.getJobTitles(this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({titleData: array, tempTitle: array});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  getJobCountries = () => {
    CareerServices.getJobCountries(this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({countryData: array, tempCountry: array});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  getJobProfessions = () => {
    CareerServices.getJobProfessions(this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({professionsData: array, tempProfessions: array});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  getJobCities = id => {
    CareerServices.getJobCityByCountry(id, this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
            value: item._id,
          });
        });
        this.setState({cityData: array, tempCity: array, searchingData: false});
      })
      .catch(err => {
        // console.log(err);
        this.setState({searchingData: false});
      });
  };

  getJobTypes = () => {
    CareerServices.getJobTypes(this.props.user.userData.token)
      .then(res => {
        let data = res.data.data;
        let temp = data.map(val => ({...val, is_interested: false}));
        this.setState({typeData: temp});
      })
      .catch(err => {
        // console.log(err)
      });
  };

  selectTypes = (item, index) => {
    const {typeData} = this.state;
    let temp = typeData.map(val => ({...val}));
    temp[index].is_interested = !item.is_interested;
    this.setState({typeData: temp});
  };

  renderTypes = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.selectTypes(item, index)}
        style={styles.row}
      >
        <View
          style={item?.is_interested ? styles.selectedbox1 : styles.box1}
        ></View>
        <Text
          style={item?.is_interested ? styles.selectedOption1 : styles.option1}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  validateURL = url => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return regex.test(url);
  };

  postJob = () => {
    const {
      typeData,
      salary,
      jobDesc,
      jobCities,
      jobCountries,
      jobProfession,
      link,
      deadlineDate,
      selectedCurrency,
      experience,
      education,
    } = this.state;

    typeData?.map(val => {
      if (val?.is_interested) {
        typeSelected = true;
      }
    });
    const temp = typeData
      ?.filter(val => val?.is_interested === true)
      .map(val => val._id);

    if (
      jobCountries.length > 0 &&
      jobCities.length > 0 &&
      jobDesc &&
      salary &&
      temp.length > 0 &&
      deadlineDate &&
      selectedCurrency &&
      jobProfession.length > 0 &&
      experience &&
      education
    ) {
      if (link && this.validateURL(link.toLowerCase()) === false) {
        this.setState({
          msgToDisplay: 'Please enter valid link',
          alertModal: true,
        });
        return;
      }

      let dataToSend = {
        types: temp,
        profession: jobProfession[0]?.id,
        country: jobCountries[0]?.id,
        city: jobCities[0]?.id,
        description: jobDesc,
        deadline: moment(deadlineDate).format('DD/MM/YY'),
        link,
        salary,
        currency: selectedCurrency?._id,
        experience,
        education,
      };
      CareerServices.createJob(dataToSend, this.props.user.userData.token)
        .then(res => {
          this.setState({
            msgToDisplay: 'The job is created and ready for applications',
            alertModal: true,
            jobPosted: true,
          });
        })
        .catch(err => {
          // console.log('err : ', err);
        });
    } else {
      this.setState({
        msgToDisplay: 'Please fill all the fields',
        alertModal: true,
      });
    }
  };

  seacrhMatchProfesstionFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.countryData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempCountry: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  seacrhCityFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.cityData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempCity: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  render() {
    const {
      searchingData,
      tempCity,
      tempCountry,
      jobCountries,
      jobCities,
      cityData,
      salary,
      jobDesc,
      typeData,
      countryData,
      msgToDisplay,
      alertModal,
      tempProfessions,
      jobProfession,
      openCurrencyPicker,
      selectedCurrency,
      currencyList,
      link,
      deadline,
      deadlineDate,
      experience,
      education,
      jobPosted,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <KeyboardAwareScrollView style={{flex: 1}}>
            <View style={{flex: 1, marginHorizontal: '5%', marginTop: '1%'}}>
              {/* Title dropdown */}
              <View style={styles.margin}>
                <Text style={styles.grayText}>Profession</Text>
                <Text style={styles.professionDetail}>
                  Select your profession
                </Text>
                <TouchableOpacity
                  style={styles.inputConttainer1}
                  onPress={() => {
                    this.setState({profSearch: true});
                  }}
                >
                  <View style={{flex: 1}}>
                    {jobProfession.length > 0 ? (
                      <Text style={{...styles.desc1}}>
                        {jobProfession[0]?.label}
                      </Text>
                    ) : null}
                  </View>
                  <Icon.AntDesign
                    name="caretdown"
                    size={15}
                    color={themeStyle.COLOR_BLACK}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.margin}>
                <Text style={styles.grayText}>Job Type</Text>
                <Text style={styles.professionDetail}>Can select multiple</Text>
              </View>

              <FlatList
                data={typeData}
                numColumns={3}
                columnWrapperStyle={{marginTop: 8}}
                contentContainerStyle={{marginBottom: 20}}
                renderItem={({item, index}) => this.renderTypes(item, index)}
                ListEmptyComponent={() => (
                  <Text style={styles.selectedOption1}>Loading...</Text>
                )}
              />

              <Text style={styles.grayText1}>Job Description</Text>
              <View style={styles.inputConttainer}>
                <Input
                  career
                  value={jobDesc}
                  placeholder="Enter job description here..."
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={salary => this.setState({jobDesc: salary})}
                />
              </View>
              <Text style={{...styles.grayText1, marginTop: 20}}>
                Experience
              </Text>
              <View style={styles.inputConttainer}>
                <Input
                  career
                  value={experience}
                  placeholder="Enter Experience here..."
                  keyboardType="number-pad"
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={experience => this.setState({experience})}
                />
              </View>
              <Text style={{...styles.grayText1, marginTop: 20}}>
                Education
              </Text>
              <View style={styles.inputConttainer}>
                <Input
                  career
                  value={education}
                  placeholder="Enter Education here..."
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={education => this.setState({education})}
                />
              </View>

              <Text style={[styles.grayText1, styles.marginTop]}>Salary</Text>
              <IT
                containerStyle={styles.feeContainer}
                placeholder="Enter Salary"
                placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                value={salary}
                keyboardType="number-pad"
                inputContainerStyle={styles.inputContainerStylePrice}
                inputStyle={styles.inputStylePrice}
                onChangeText={salary => this.setState({salary: salary})}
                onSubmitEditing={() =>
                  this.setState({openCurrencyPicker: true})
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() => this.setState({openCurrencyPicker: true})}
                  >
                    {selectedCurrency ? (
                      <Text style={styles.symbol}>
                        {selectedCurrency?.symbol}
                      </Text>
                    ) : (
                      <Icon.FontAwesome
                        name="caret-down"
                        size={22}
                        color={themeStyle.COLOR_BLACK}
                      />
                    )}
                  </TouchableOpacity>
                }
                rightIconContainerStyle={{
                  marginRight: '2.5%',
                }}
              />

              {/* Country Drpdown */}
              <View style={styles.row2}>
                <View style={{width: '48%'}}>
                  <Text style={styles.grayText}>Country</Text>
                  <TouchableOpacity
                    style={[
                      styles.inputConttainer1,
                      {paddingLeft: 16, paddingRight: 12},
                    ]}
                    onPress={() => {
                      this.setState({countrySearch: true});
                    }}
                  >
                    <View style={{flex: 1}}>
                      {jobCountries.length > 0 ? (
                        <Text
                          style={{
                            ...styles.desc1,
                            textTransform: 'capitalize',
                          }}
                        >
                          {jobCountries[0]?.label}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.desc1,
                            color: themeStyle.CAREER_PLACEHOLDER,
                          }}
                        >
                          Country
                        </Text>
                      )}
                    </View>
                    <Icon.AntDesign
                      name="caretdown"
                      size={12}
                      color={themeStyle.CARRER_PRIMARY}
                    />
                  </TouchableOpacity>
                  <CustomDropDownModal
                    country
                    loading={searchingData}
                    isVisible={this.state.countrySearch}
                    onClose={() => this.setState({countrySearch: false})}
                    data={tempCountry}
                    OnReset={() => this.setState({tempCountry: countryData})}
                    onSearch={text => this.seacrhMatchProfesstionFunction(text)}
                    onPress={data => {
                      let array = [];
                      array.push(data);
                      this.setState(
                        {
                          jobCountries: array,
                          countrySearch: false,
                          searchingData: true,
                        },
                        () => this.getJobCities(data.id),
                      );
                    }}
                  />
                </View>

                {/* City Dropdown */}
                <View style={{width: '48%'}}>
                  <Text style={styles.grayText}>City</Text>
                  <TouchableOpacity
                    style={[
                      styles.inputConttainer1,
                      {paddingLeft: 16, paddingRight: 12},
                    ]}
                    onPress={() => {
                      this.setState({citySearch: true});
                    }}
                  >
                    <View style={{flex: 1}}>
                      {jobCities.length > 0 ? (
                        <Text style={styles.desc1}>{jobCities[0]?.label}</Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.desc1,
                            color: themeStyle.CAREER_PLACEHOLDER,
                          }}
                        >
                          City
                        </Text>
                      )}
                    </View>
                    <Icon.AntDesign
                      name="caretdown"
                      size={12}
                      color={themeStyle.CARRER_PRIMARY}
                    />
                  </TouchableOpacity>
                  <CustomDropDownModal
                    city
                    loading={searchingData}
                    isVisible={this.state.citySearch}
                    onClose={() => this.setState({citySearch: false})}
                    data={tempCity}
                    OnReset={() => this.setState({tempCity: cityData})}
                    onSearch={text => this.seacrhCityFunction(text)}
                    onPress={data => {
                      let array = [];
                      array.push(data);
                      this.setState({jobCities: array, citySearch: false});
                    }}
                  />
                </View>
              </View>

              <Text style={styles.grayText}>Add Link</Text>
              <View style={styles.inputConttainer}>
                <Input
                  career
                  value={link}
                  placeholder="https://www.example.com"
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={link =>
                    this.setState({link: link.toLowerCase()})
                  }
                />
              </View>
              <Text style={styles.grayText}>Deadline</Text>
              <TouchableOpacity
                style={styles.deadline}
                onPress={() => {
                  this.setState({deadline: true});
                }}
              >
                <Text style={styles.deadlineText}>
                  {deadlineDate
                    ? moment(deadlineDate).format('DD/MM/YY')
                    : 'DD/MM/YY'}
                </Text>
                <Calender />
              </TouchableOpacity>
              <DatePicker
                isVisible={deadline}
                colorOptions={{
                  confirmButtonColor: themeStyle.CARRER_PRIMARY,
                  selectedDateBackgroundColor: themeStyle.CARRER_PRIMARY,
                  headerColor: themeStyle.CARRER_PRIMARY,
                  weekDaysColor: themeStyle.CARRER_PRIMARY,
                }}
                mode={'single'}
                onConfirm={date => {
                  this.setState({
                    deadline: false,
                    deadlineDate: date.dateString,
                  });
                }}
                onCancel={() =>
                  this.setState({deadline: false, dateModal: false})
                }
                textColor={themeStyle.COLOR_BLACK}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.createButton} onPress={this.postJob}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
        <CareerMenu
          visible={this.state.visible}
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREEREDITPROFILE),
            )
          }
          onViewJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBAPPLIED),
            )
          }
          onFavJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBFAV),
            )
          }
          onPostedJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBPOSTED),
            )
          }
          onProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERSETTINGS),
            )
          }
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
              .catch(err => {
                // console.log(err);
              });
          }}
          onClose={() => this.setState({visible: false})}
          navigation={this.props.navigation}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            if (jobPosted) {
              this.setState({alertModal: false}, () =>
                this.props.navigation.navigate(route.CAREERHOME),
              );
              return;
            } else {
              this.setState({alertModal: false});
            }
          }}
          text={msgToDisplay}
        />
        <CareerSelectModal
          career
          removeSearch
          title="Select Currency"
          selectedData={selectedCurrency}
          loading={false}
          isVisible={openCurrencyPicker}
          onClose={() => this.setState({openCurrencyPicker: false})}
          data={currencyList}
          onPress={data => {
            this.setState({
              selectedCurrency: data,
            });
          }}
          onSelect={() => this.setState({openCurrencyPicker: false})}
        />
        <CareerCountryModal
          removeSearch
          title="Select Profession"
          selectedData={jobProfession[0]}
          loading={searchingData}
          isVisible={this.state.profSearch}
          onClose={() => this.setState({profSearch: false})}
          data={tempProfessions}
          onPress={data => {
            let array = [];
            array.push(data);
            this.setState({jobProfession: array});
          }}
          onSelect={() => this.setState({profSearch: false})}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {search: state.searchReducer, user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobCreate);
