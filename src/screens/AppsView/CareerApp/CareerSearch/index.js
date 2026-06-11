import React, {Component} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchActions} from '../../../../redux/actions/search';
import {
  Button,
  Container,
  DeleteModal,
  Icon,
  Loader,
  CustomDropDownModal,
} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import CareerMenu from '../CareerMenu';
import {CareerServices, ProfileServices} from '../../../../services';
import Search from '../../../../assets/svg/search-black.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import themeStyle from '../../../../assets/styles/theme.style';
import {authActions} from '../../../../redux/actions/auth';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class CareerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: false,
      msgToDisplay: '',
      visible: false,
      jobTitles: [],
      titleData: [],
      cityData: [],
      tempCity: [],
      tempCountry: [],
      tempTitle: [],
      citySearch: false,
      titleSearch: false,
      searchingData: false,
      jobCities: [],
      countryData: [],
      jobCountry: [],
      searchJobs: [],
      loading: true,
      searching: false,
      professionMatchModal: false,
    };
  }

  componentDidMount = () => {
    this.getJobCountry();
    this.getJobTitles();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
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
        this.setState({titleData: array, tempTitle: array, loading: false});
      })
      .catch(err => {
        // console.log(err)
      });
  };
  getJobCountry = () => {
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
  getJobCity = id => {
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
  getSearchJobs = () => {
    const {jobTitles, jobCities} = this.state;
    if (jobTitles.length > 0 && jobCities.length > 0) {
      let array = [];
      jobTitles.map(val => array.push(val.id));
      let jobData = {
        titles: array,
        city: jobCities[0]?.id,
        expected_salary: '',
      };
      CareerServices.jobSearch(jobData, this.props.user.userData.token)
        .then(res => {
          if (res.data.code == 200) {
            this.setState({searching: false}, () =>
              this.props.navigation.navigate(route.CAREERHOME),
            );
            // this.setState({ searchJobs: res.data.data }, () => this.props.navigation.navigate(route.CAREERHOME))
          }
        })
        .catch(err => {
          this.setState({searchJobs: [], searching: false}, () =>
            this.props.navigation.navigate(route.CAREERHOME),
          );
        });
    } else {
      this.setState({
        msgToDisplay: 'Fill all fields',
        alertModal: true,
        searching: false,
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

  seacrhTitleFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.titleData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempTitle: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  render() {
    const {
      alertModal,
      msgToDisplay,
      tempCountry,
      jobCountry,
      searchingData,
      tempCity,
      tempTitle,
      titleData,
      jobTitles,
      cityData,
      jobCities,
      loading,
      countryData,
      searching,
    } = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <View style={{flex: 1, marginHorizontal: '5%', marginTop: '5%'}}>
            <KeyboardAwareScrollView>
              <Text style={styles.heading}>Filters</Text>

              {/* Title dropdown */}
              <View style={styles.margin}>
                <Text style={styles.grayText}>Job Title</Text>
                <TouchableOpacity
                  style={styles.inputConttainer1}
                  onPress={() => {
                    this.setState({titleSearch: true});
                  }}
                >
                  <View style={{flex: 1}}>
                    {jobTitles.length > 0 ? (
                      <Text style={{...styles.desc1}}>
                        {jobTitles[0]?.label}
                      </Text>
                    ) : (
                      <Text style={{...styles.desc1}}>Select title</Text>
                    )}
                  </View>
                  <Search />
                </TouchableOpacity>
                <CustomDropDownModal
                  title
                  loading={searchingData}
                  isVisible={this.state.titleSearch}
                  onClose={() => this.setState({titleSearch: false})}
                  data={tempTitle}
                  OnReset={() => this.setState({tempTitle: titleData})}
                  onSearch={text => this.seacrhTitleFunction(text)}
                  onPress={data => {
                    let array = [];
                    array.push(data);
                    this.setState({jobTitles: array, titleSearch: false});
                  }}
                />
              </View>

              {/* Country Drpdown */}
              <View style={styles.margin}>
                <Text style={styles.grayText}>Country Preferences</Text>
                <TouchableOpacity
                  style={styles.inputConttainer1}
                  onPress={() => {
                    this.setState({professionMatchModal: true});
                  }}
                >
                  <View style={{flex: 1}}>
                    {jobCountry.length > 0 ? (
                      <Text
                        style={{...styles.desc1, textTransform: 'capitalize'}}
                      >
                        {jobCountry[0]?.label}
                      </Text>
                    ) : (
                      <Text style={styles.desc1}>Select country</Text>
                    )}
                  </View>
                  <Search />
                </TouchableOpacity>
                <CustomDropDownModal
                  country
                  loading={searchingData}
                  isVisible={this.state.professionMatchModal}
                  onClose={() => this.setState({professionMatchModal: false})}
                  data={tempCountry}
                  OnReset={() => this.setState({tempCountry: countryData})}
                  onSearch={text => this.seacrhMatchProfesstionFunction(text)}
                  onPress={data => {
                    let array = [];
                    array.push(data);
                    this.setState(
                      {
                        jobCountry: array,
                        professionMatchModal: false,
                        searchingData: true,
                      },
                      () => this.getJobCity(data.id),
                    );
                  }}
                />
              </View>

              {/* City Dropdown */}
              <View style={styles.margin}>
                <Text style={styles.grayText}>City Preferences</Text>
                <TouchableOpacity
                  style={styles.inputConttainer1}
                  onPress={() => {
                    this.setState({citySearch: true});
                  }}
                >
                  <View style={{flex: 1}}>
                    {jobCities.length > 0 ? (
                      <Text style={styles.desc1}>{jobCities[0]?.label}</Text>
                    ) : (
                      <Text style={styles.desc1}>Select country first</Text>
                    )}
                  </View>
                  <Search />
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
            </KeyboardAwareScrollView>
            <View style={styles.btnContainer}>
              <Button
                loading={searching}
                green
                career
                title={'Search'}
                onPress={() => {
                  this.props.searchActions.careerSearch(
                    this.props.search.careerSearch,
                  );
                  this.setState({searching: true}, () => this.getSearchJobs());

                  // this.props.navigation.navigate(route.CAREERHOME);
                }}
              />
            </View>
          </View>
        )}
        <CareerMenu
          visible={this.state.visible}
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
          onClose={() => this.setState({visible: false})}
          navigation={this.props.navigation}
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
  return {search: state.searchReducer, user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CareerSearch);
