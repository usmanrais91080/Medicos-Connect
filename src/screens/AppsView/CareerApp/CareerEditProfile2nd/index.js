import React, {Component} from 'react';

import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {
  Button,
  Container,
  Input,
  Icon,
  CustomDropDownModal,
  DeleteModal,
  Loader,
  CareerCreateProfileModal,
} from '../../../../components';
import DocumentPicker from 'react-native-document-picker';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {CareerServices} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CareerCompletionModal from '../../../../components/Modals/CareerCompletionModal';

class CareerEditProfile2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: '',
      achievement: '',
      jobAchivements: [],
      achievement: '',
      cityData: [],
      tempCity: [],
      tempCountry: [],
      citySearch: false,
      countrySearch: false,
      searchingData: false,
      jobCity: [],
      countryData: [],
      jobCountry: [],
      uploading: false,
      alertModal: false,
      msgToDisplay: '',
      errorAlert: false,
      cvDoc: '',
      jobProfession: [],
      tempProfessions: [],
      successModal: false,
      tempJobProfession: [],
      isSuccess: false,
      modalText: '',
      updateModal: false,
    };
  }

  componentDidMount = () => {
    const {userProfile} = this.props?.route?.params?.data;
    let cityData = [];
    let countryData = [];
    countryData.push({
      id: userProfile?.country?._id,
      label: userProfile?.country?.name,
      value: userProfile?.country?._id,
    });
    cityData.push({
      id: userProfile?.city?._id,
      label: userProfile?.city?.name,
      value: userProfile?.city?._id,
    });
    let array = [];
    array.push({
      label: userProfile?.profession?.name,
      id: userProfile?.profession?._id,
      value: userProfile?.profession?._id,
    });
    this.setState({jobProfession: array});
    this.setState({
      jobAchivements: userProfile?.qualifications,
      jobCity: cityData,
      jobCountry: countryData,
      cvDoc: userProfile?.cv,
    });
    this.getJobCountry();
    this.getJobCity(userProfile?.country?._id);
    this.getJobProfessions();
  };

  renderAchivements(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              jobAchivements: this.state.jobAchivements.filter(
                (_, i) => i != index,
              ),
            })
          }
          style={styles.minusContainer}>
          <Icon.Entypo name="minus" size={15} color={themeStyle.COLOR_WHITE} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item}</Text>
        </View>
      </View>
    );
  }

  handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'documentDirectory',
      });

      this.setState({cvDoc: res[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log('User cancelled the picker');
      } else {
        // console.log('Error occurred while picking the document:', err);
      }
    }
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
        this.setState({countryData: array, tempCountry: array});
      })
      .catch(err => null);
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
        this.setState({cityData: array, tempCity: array, searchingData: false});
      })
      .catch(err => {
        // console.log(err);
        this.setState({searchingData: false});
      });
  };

  createProfile = () => {
    const {jobAchivements, jobCountry, jobCity, jobProfession, cvDoc} =
      this.state;

    const {photos, userProfile} = this.props.route?.params?.data;

    if (jobAchivements.length == 0) {
      this.setState({
        uploading: false,
        msgToDisplay: 'Please add your qualifications',
        errorAlert: true,
        alertModal: true,
      });
      return;
    }

    if (jobCountry.length == 0) {
      this.setState({
        uploading: false,
        msgToDisplay: 'Please select country',
        errorAlert: true,
        alertModal: true,
      });
      return;
    }

    if (jobCity.length == 0) {
      this.setState({
        uploading: false,
        msgToDisplay: 'Please select city',
        errorAlert: true,
        alertModal: true,
      });
      return;
    }

    let formData = new FormData();
    if (photos.includes('file://')) {
      formData.append(`image`, {
        uri: photos,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
    }
    formData.append('country', jobCountry[0].id);
    formData.append('city', jobCity[0].id);
    formData.append('qualifications', jobAchivements.toString());
    formData.append('profession', this.props.user?.userData?.profession?._id);
    if (cvDoc) {
      formData.append(`cv`, {
        uri: cvDoc?.uri,
        name: cvDoc?.name,
        filename: cvDoc?.name,
        type: cvDoc?.type,
      });
    }
    const temp = userProfile?.types?.filter(val => val?.is_interested === true);
    temp?.map((item, index) => {
      formData.append(`job_title_interested[]`, item?._id);
    });

    CareerServices.createUpdateProfile(
      formData,
      this.props.route.params.data.token,
    )
      .then(async response => {
        if (response.data.code == 200) {
          await this.props.authActions.getUserProfile({
            token: this.props.user.userData.token,
          });
          if (this.props.user.userData.is_medical) {
            this.setState({
              uploading: false,
              msgToDisplay: 'Medical Profile updated successfully',
              updateModal: true,
            });
          } else {
            this.setState({
              uploading: false,
              isSuccess: true,
              modalText: 'Medical Profile created successfully',
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          uploading: false,
          msgToDisplay: 'Oh, shoot! Try again',
          errorAlert: true,
          alertModal: true,
        });
      });
  };

  alertConfrim = () => {
    if (this.state.errorAlert) {
      this.setState({alertModal: false, errorAlert: false});
    } else {
      this.setState({alertModal: false});
      this.props.authActions.getUserProfile(
        {token: this.props.user.userData.token},
        '',
        '',
      );
      this.props.navigation.replace(route.MAIN, {
        screen: route.HOME,
      });
    }
  };

  seacrhCountryFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.countryData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData?.length != 0) {
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
    if (newData?.length != 0) {
      this.setState({tempCity: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  onAdd = () => {
    const {achievement, jobAchivements} = this.state;
    if (achievement != '') {
      let array = [...jobAchivements];
      array.push(achievement);
      this.setState({
        jobAchivements: array,
        achievement: '',
      });
    }
  };

  onSkip = () => {
    this.props.navigation.navigate(route.CAREERHOME);
  };

  onNext = () => {
    this.props.navigation.goBack();
    this.setState({
      isSuccess: false,
    });
  };

  render() {
    const {
      tempCity,
      tempCountry,
      searchingData,
      achievement,
      jobAchivements,
      jobCountry,
      jobCity,
      cityData,
      countryData,
      uploading,
      msgToDisplay,
      alertModal,
      successModal,
      cvDoc,
      countrySearch,
      citySearch,
      modalText,
      isSuccess,
      updateModal,
    } = this.state;
    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container color>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: '30%'}}>
                <View
                  style={{marginHorizontal: '5%', marginTop: '5%', flex: 1}}>
                  <Text style={styles.heading}>
                    Your{' '}
                    <Text
                      style={{
                        ...styles.heading,
                        color: themeStyle.CARRER_PRIMARY,
                      }}>
                      Preference
                    </Text>
                  </Text>
                  <Text style={styles.grayText}>Add Education</Text>
                  <View style={styles.inputConttainer}>
                    <Input
                      career
                      value={achievement}
                      placeholder="Add your Qualifications"
                      onChangeText={job => this.setState({achievement: job})}
                      onSubmitEditing={this.onAdd}
                      rightIcon={
                        <TouchableOpacity
                          disabled={achievement == ''}
                          onPress={this.onAdd}>
                          <Icon.Entypo
                            name="plus"
                            size={30}
                            color={themeStyle.COLOR_BLACK}
                          />
                        </TouchableOpacity>
                      }
                    />
                  </View>

                  {/* Render Education added */}
                  <View style={{flexDirection: 'row', marginBottom: 6}}>
                    <ScrollView horizontal={true}>
                      {jobAchivements?.length > 0 &&
                        jobAchivements?.map((item, index) =>
                          this.renderAchivements(item, index),
                        )}
                    </ScrollView>
                  </View>

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
                        }}>
                        <View style={{flex: 1}}>
                          {jobCountry?.length > 0 ? (
                            <Text
                              style={{
                                ...styles.desc1,
                                textTransform: 'capitalize',
                              }}>
                              {jobCountry[0]?.label}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                ...styles.desc1,
                                color: themeStyle.CAREER_PLACEHOLDER,
                              }}>
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
                        isVisible={countrySearch}
                        onClose={() => this.setState({countrySearch: false})}
                        data={tempCountry}
                        OnReset={() =>
                          this.setState({tempCountry: countryData})
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
                        }}>
                        <View style={{flex: 1}}>
                          {jobCity?.length > 0 ? (
                            <Text
                              style={{
                                ...styles.desc1,
                                textTransform: 'capitalize',
                              }}>
                              {jobCity[0]?.label}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                ...styles.desc1,
                                color: themeStyle.CAREER_PLACEHOLDER,
                              }}>
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
                        isVisible={citySearch}
                        onClose={() => this.setState({citySearch: false})}
                        data={tempCity}
                        OnReset={() => this.setState({tempCity: cityData})}
                        onSearch={text => this.seacrhCityFunction(text)}
                        onPress={data => {
                          let array = [];
                          array.push(data);
                          this.setState({jobCity: array, citySearch: false});
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{...styles.grayText, marginTop: 20}}>
                    Profession
                  </Text>
                  <View
                    style={[styles.inputConttainer1, {borderColor: '#9A9A9A'}]}>
                    <Text
                      style={{
                        ...styles.desc1,
                        color: '#9A9A9A',
                        fontSize: 16,
                        fontFamily: themeStyle.FONT_MEDIUM,
                        textAlign: 'left',
                        flex: 1,
                      }}>
                      {this.props.user?.userData?.profession.name}
                    </Text>
                  </View>
                  <Text style={{...styles.grayText, marginTop: 20}}>
                    CV{' '}
                    <Text style={{color: themeStyle.CAREER_PLACEHOLDER}}>
                      (PDF)
                    </Text>
                  </Text>
                  <View style={{width: 190, marginTop: 8}}>
                    <Button
                      green
                      career
                      title={'Upload CV'}
                      containerStyle={styles.uploadButton}
                      onPress={() => this.handleDocumentPick()}
                    />
                  </View>
                  {cvDoc?.uri ? (
                    <Text style={{...styles.grayText, marginTop: 15}}>
                      {cvDoc.name}
                    </Text>
                  ) : null}
                  <Text style={styles.optional}>Optional</Text>
                </View>
                <View style={styles.btnContainer}>
                  <Text
                    style={{
                      ...styles.grayText,
                      color: '#5C5C5C',
                      marginBottom: 10,
                    }}>
                    Jobs will be displayed according to your preferences
                  </Text>
                  <View style={styles.rowContainer2}>
                    <View style={styles.lightDash}></View>
                    <View style={{width: 10}}></View>
                    <View style={styles.darkDash}></View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '7%',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.goBack()}
                      style={styles.back}>
                      <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <View style={{width: '48%'}}>
                      <Button
                        green
                        career
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
            <DeleteModal
              alert
              visible={updateModal}
              confirm={() => {
                this.props.navigation.goBack();
              }}
              text={msgToDisplay}
            />
            <CareerCreateProfileModal
              visible={isSuccess}
              text={modalText}
              onClose={this.onSkip}
              onNext={this.onNext}
            />
          </Container>
        )}
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
)(CareerEditProfile2nd);
