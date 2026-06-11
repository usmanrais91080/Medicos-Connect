import React, { Component } from 'react';

import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Button,
  Container,
  Input,
  Icon,
  CustomDropDownModal,
  DeleteModal,
  Loader,
  CareerSelectModal,
} from '../../../../components';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Career from '../../../../assets/svg/careerwelcome.svg';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import { route, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { CareerServices } from '../../../../services';
import Search from '../../../../assets/svg/search.svg';
import RangeSlider from 'rn-range-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../../redux/actions/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class CareerProfile2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tags: ['Lorem ipsum dolor sit amet,  consetetur sadipscing'],
      education: ['MBBS', 'BDS', 'BDS'],
      job: '',
      experience: true,
      certifcate: '',
      achievement: '',
      language: '',
      // arrayAchi: ['Lorem ipsum dolor', 'Lorem', 'Lorem ipsum dolor'],
      ielts: true,
      toefl: false,
      oet: false,
      jobAchivements: [],
      achievement: '',
      jobQual: [],
      qual: '',
      langData: [],
      jobLang: [],
      rangeLow: 1,
      rangeHigh: 40,
      cityData: [],
      tempLang: [],
      tempCity: [],
      tempCountry: [],
      langSearch: false,
      citySearch: false,
      countrySearch: false,
      searchingData: false,
      jobCity: [],
      countryData: [],
      jobCountry: [],
      workplace: '',
      work_title: '',
      jobTypes: [],
      typeData: [],
      uploading: false,
      alertModal: false,
      msgToDisplay: '',
      errorAlert: false,
    };
    this.arrayholderCountryData=[];
  }

  componentDidMount = () => {
    this.getJobCountry();
  };

  getJobCountry = () => {
    CareerServices.getJobCountries(this.props.route.params.data.token)
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
        this.arrayholderCountryData=array;
        this.setState({ countryData: array, tempCountry: array });
      })
      .catch(err => null);
  };

  getJobCity = id => {
    CareerServices.getJobCityByCountry(id, this.props.route.params.data.token)
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
        this.setState({ cityData: array, tempCity: array, searchingData: false });
      })
      .catch(err => {
        // console.log(err);
        this.setState({ searchingData: false });
      });
  };

  createProfile = () => {
    const {
      jobAchivements,
      jobCountry,
      jobCity,
    } = this.state;
    const {
      types,
      photos,
      uploadImages,
    } = this.props.route.params.data;

    if (
      jobAchivements.length > 0 &&
      jobCountry.length > 0 &&
      jobCity.length > 0
    ) {

      let formData = new FormData();
      formData.append(`image`, {
        uri: photos,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
      formData.append('country', jobCountry[0].id);
      formData.append('city', jobCity[0].id);
      formData.append('qualifications', jobAchivements.toString());
      const temp = types?.filter(val => val?.is_interested === true)
      temp?.map((item, index) => {
        formData.append(`job_title_interested[${index}]`, item?._id);
      })
      CareerServices.createUpdateProfile(
        formData,
        this.props.route.params.data.token,
      )
        .then(response => {
          if (response.data.code == 200) {
            this.setState({
              uploading: false,
              msgToDisplay: 'Career profile created successfully',
              alertModal: true,
            });
          }
        })
        .catch(err => {
          this.setState({
            uploading: false,
            msgToDisplay: 'Oh, shoot! Try again',
            errorAlert: true,
            alertModal: true,
          });
          // console.log('Error create profile>>>>>>', err);
        });
    } else {
      this.setState({
        uploading: false,
        msgToDisplay: 'Please fill all fields',
        errorAlert: true,
        alertModal: true,
      });
    }
  };

  alertConfrim = () => {
    if (this.state.errorAlert) {
      this.setState({ alertModal: false, errorAlert: false });
    } else {
      this.setState({ alertModal: false });
      this.props.authActions.getUserProfile(
        { token: this.props.user.userData.token },
        '',
        '',
      );
      this.props.navigation.replace(route.MAIN, {
        screen: route.HOME,
      });
    }
  };

  seacrhCountryFunction = text => {
    this.setState({ searchValue:text,searchingData: true });
    const newData = this.arrayholderCountryData.filter(item => {
      const itemData = `${item.label.toUpperCase()} ${item.label.toUpperCase()} ${item.label.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({ countryData: newData, searchingData: false });
    } else {
      this.setState({ searchingData: false });
    }
  };

  seacrhCityFunction = text => {
    this.setState({ searchingData: true });
    const newData = this.state.cityData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({ cityData: newData, searchingData: false });
    } else {
      this.setState({ searchingData: false });
    }
  };

  renderAchivements(item, index) {
    return (
      <View key={index.toString()} style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              jobAchivements: this.state.jobAchivements.filter(
                (_, i) => i != index,
              ),
            })
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

  render() {
    const {
      experience,
      tempCity,
      tempCountry,
      tempLang,
      searchingData,
      language,
      education,
      achievement,
      jobAchivements,
      langData,
      jobLang,
      rangeLow,
      rangeHigh,
      jobCountry,
      jobCity,
      cityData,
      countryData,
      workplace,
      work_title,
      uploading,
      qual,
      jobQual,
      msgToDisplay,
      alertModal,
      searchValue
    } = this.state;
    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container color>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentContainerStyle={{ paddingBottom: '30%' }}>
                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                  <Text style={styles.heading}>Your <Text style={{ ...styles.heading, color: themeStyle.CARRER_PRIMARY }}>Preference</Text></Text>

                  <Text style={styles.grayText}>Add Education</Text>
                  <View style={styles.inputConttainer}>
                    <Input
                      career
                      value={achievement}
                      placeholder="Add your education."
                      onChangeText={job => this.setState({ achievement: job })}
                      rightIcon={
                        <TouchableOpacity
                          onPress={() => {
                            if (achievement != '') {
                              let array = [...jobAchivements];
                              array.push(achievement);
                              this.setState({
                                jobAchivements: array,
                                achievement: '',
                              });
                            }
                          }}>
                          <Icon.Entypo name="plus" size={30} color={themeStyle.COLOR_BLACK} />
                        </TouchableOpacity>
                      }
                    />
                  </View>

                  {/* Render Education added */}
                  <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal={true}>
                      {jobAchivements.map((item, index) =>
                        this.renderAchivements(item, index),
                      )}
                    </ScrollView>
                  </View>



                  {/* Country Dropdown */}
                  <View style={styles.margin}>
                    <Text style={styles.grayText}>Country</Text>
                    <TouchableOpacity
                      style={styles.inputConttainer1}
                      onPress={() => {
                        this.setState({ countrySearch: true });
                      }}>
                      <View style={{ flex: 1 }}>
                        {jobCountry.length > 0 ? (
                          <Text style={{ ...styles.desc1 ,textTransform:"capitalize"}}>
                            {jobCountry[0]?.label}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.desc1 }}>
                            Select country
                          </Text>
                        )}
                      </View>
                      <Search />
                    </TouchableOpacity>
                    <CustomDropDownModal
                      country
                      value={searchValue}
                      loading={searchingData}
                      isVisible={this.state.countrySearch}
                      onClose={() => this.setState({ countrySearch: false })}
                      data={countryData}
                      OnReset={() =>{
                        // this.setState({ tempCountry: countryData })
                        // this.setState({countryData:tempCountry})}
                      }}
                      onSearch={(text) => this.seacrhCountryFunction(text)}
                      onPress={data => {
                        let array = [];
                        array.push(data);
                        this.setState(
                          {
                            jobCountry: array,
                            countrySearch: false,
                            searchingData: true,
                          },
                          () => this.getJobCity(data.id),
                        );
                      }}
                    />
                    {/* <CareerSelectModal
                      country
                      selectedData={jobCountry}
                      loading={searchingData}
                      isVisible={this.state.countrySearch}
                      onClose={() => this.setState({ countrySearch: false })}
                      data={tempCountry}
                      OnReset={() =>
                        this.setState({ tempCountry: countryData })
                      }
                      onSearch={text => this.seacrhCountryFunction(text)}
                      onPress={data => {
                        let array = [];
                        array.push(data);
                        this.setState(
                          {
                            jobCountry: array,
                            countrySearch: false,
                            searchingData: true,
                          },
                          () => this.getJobCity(data.id),
                        );
                      }}
                    /> */}
                  </View>

                  {/* City Dropdown */}
                  <View style={styles.margin}>
                    <Text style={styles.grayText}>City</Text>
                    <TouchableOpacity
                      style={styles.inputConttainer1}
                      onPress={() => {
                        this.setState({ citySearch: true });
                      }}>
                      <View style={{ flex: 1 }}>
                        {jobCity.length > 0 ? (
                          <Text style={{ ...styles.desc1 }}>
                            {jobCity[0]?.label}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.desc1 }}>
                            Select country first
                          </Text>
                        )}
                      </View>
                      <Search />
                    </TouchableOpacity>

                    <CustomDropDownModal
                      city
                      loading={searchingData}
                      isVisible={this.state.citySearch}
                      onClose={() => this.setState({ citySearch: false })}
                      data={tempCity}
                      OnReset={() => this.setState({ tempCity: cityData })}
                      onSearch={text => this.seacrhCityFunction(text)}
                      onPress={data => {
                        let array = [];
                        array.push(data);
                        this.setState({ jobCity: array, citySearch: false });
                      }}
                    />
                  </View>

                  <Text style={{ ...styles.grayText, fontSize: 14 }}>Jobs will be displayed according to your preferences</Text>


                </View>
                <View style={styles.btnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.lightDash}></View>
                    <View style={{ width: 10 }}></View>
                    <View style={styles.darkDash}></View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5%' }}>
                    <View style={{ width: '48%' }}>
                      <Button
                        career_disable
                        career
                        title={'Back'}
                        onPress={() => this.props.navigation.goBack()}
                      />
                    </View>
                    <View style={{ width: '48%' }}>

                      <Button
                        green
                        title={'Finish'}
                        onPress={() => {
                          this.setState({
                            uploading: true,
                          });
                          this.createProfile();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.alertConfrim();
              }}
              text={msgToDisplay}
            />
          </Container>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.authReducer || {} };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CareerProfile2nd);
