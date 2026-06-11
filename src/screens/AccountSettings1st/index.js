import React, {Component} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import AlertSvg from '../../assets/svg/faqss.svg';
import {
  Button,
  Container,
  DropDownModal,
  DateModal,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
  Loader,
  VerifyReason,
  AuthenticationHeader,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import Card from '../../assets/svg/card.svg';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {HorizontalSpacer} from '../../lib/utils/global';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import commonStyle from '../../assets/styles/common.style';
import {CareerServices} from '../../services';
import AccountSettingFunction from './account.settings.function';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Search from '../../assets/svg/drop-down-date.svg';
import {bottomTabActions} from '../../redux/actions/bottomTab';
import {ImageBackground} from 'react-native';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_WHITE,
  iconColor: themeStyle.COLOR_WHITE,
};

class AccountSettings1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      alertModal: false,
      msgToDisplay: '',
      uploading: false,
      errorAlert: false,
      submit: false,
      photos: '',
      uploadImages: '',
      genderModal: false,
      dateModal: false,
      dob: '',
      date: new Date(),
      gender: '',
      tab: this.props.route.params.data == 1 ? 1 : 0,
      firstName: '',
      lastName: '',
      male: false,
      female: false,
      noBinary: false,
      medicalFront: '',
      medicalBack: '',
      userPic: '',
      showMedical: false,
      medValue: 0,
      showVerify: false,
      tempProfessions: [],
      professionsData: [],
      profSearch: false,
      jobProfession: [],
      searchingData: false,
      isVerified:
        this.props.user.userData.user_tier == 1 &&
        !this.props.user.userData.is_trail,
    };
  }
  componentDidMount = () => {
    this.getProfileSettings();
    this.getJobProfessions();
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft color={'grey'} navigation={this.props.navigation} />
      ),
    });
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.recieveDataFromGallery();
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
  };

  getProfileSettings = () => {
    let name = this.props.user.userData?.name?.split(' ');
    let tempGender = this.props.user.userData.gender;
    if (tempGender === 'Non Binary') {
      tempGender = 'No Binary';
    }
    this.onSelectGender(tempGender, true);
    this.setState({
      firstName: name ? name[0] : '',
      lastName: name ? name[1] : '',
      dob: this.props.user.userData.dob,
      jobProfession:
        this.props.user.userData.profession != ''
          ? [
              {
                id: this.props.user.userData.profession._id,
                label: this.props.user.userData.profession.name,
                value: this.props.user.userData.profession._id,
              },
            ]
          : [],
      uploadImages: this.props.user.userData.image,
      phone: this.props.user.userData.phone,
      phone: this.props.user.userData.phone,
      email: this.props.user.userData.email,
    });
    setTimeout(() => {
      this.setState({
        showVerify: this.props.route?.params?.showVerifyReason ? false : false,
      });
    }, 500);
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
      .catch(err => console.log(err));
  };

  chooseFile = number => {
    var options = {
      title: 'Select Avatar',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else {
        let source = response;
        if (number == 1) {
          this.setState({
            uploadImages: source?.assets[0]?.uri,
            photos: source.assets[0].uri,
          });
        }
        if (number == 2) {
          this.setState({
            medicalFront: source?.assets[0]?.uri,
          });
        }
        if (number == 3) {
          this.setState({
            medicalBack: source?.assets[0]?.uri,
          });
        }
      }
    });
  };
  ChooseFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      includeBase64: false,
      compressImageQuality: 0.1,
      useFrontCamera: true,
    }).then(image => {
      this.setState({userPic: image.path});
    });
  };

  renderItem = (item, drag, isActive, index) => {
    return (
      <>
        {item.image ? (
          <>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  photos: this.state.photos.filter((_, i) => i != index),
                })
              }
              style={styles.minusContainer}>
              <Icon.AntDesign
                name="minus"
                size={15}
                color={themeStyle.COLOR_WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 30}}
              onLongPress={() => drag()}
              disabled={isActive}>
              <Avatar source={{uri: item.image}} rounded size={100} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onLongPress={() => drag()}
            disabled={isActive}
            onPress={() => this.chooseFile(index)}
            style={styles.emptyContainer}>
            <Icon.Entypo name="plus" size={30} color={'#FF6B6B'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  onSelectGender = (key, value) => {
    switch (key) {
      case 'Male':
        this.setState({
          gender: 'Male',
          male: value,
          female: false,
          noBinary: false,
          genderModal: false,
        });
        break;
      case 'Female':
        this.setState({
          gender: 'Female',
          male: false,
          female: value,
          noBinary: false,
          genderModal: false,
        });
        break;
      case 'No Binary':
        this.setState({
          gender: 'Non-Binary',
          male: false,
          female: false,
          noBinary: value,
          genderModal: false,
        });
        break;
    }
  };

  handleContinue = () => {
    const {
      showMedical,
      firstName,
      lastName,
      dob,
      gender,
      submit,
      medicalFront,
      jobProfession,
    } = this.state;

    if (
      firstName &&
      lastName &&
      dob &&
      gender &&
      jobProfession.length > 0 &&
      submit
    ) {
      this.setState({uploading: true});
      let formDataMed = new FormData();
      if (medicalFront && submit) {
        formDataMed.append(`medical_license_front`, {
          uri: medicalFront,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      } else {
        return this.setState({uploading: false});
      }

      let formData = new FormData();

      let tempGender = gender;
      if (gender === 'Non-Binary') {
        tempGender = 'Non Binary';
      }
      formData.append('username', firstName + ' ' + lastName);
      formData.append('dob', moment(this.state.dob).format('YYYY-MM-DD'));
      formData.append('gender', tempGender);
      formData.append('profession', jobProfession[0].id);
      AccountSettingFunction.updateProfile(
        formData,
        this.props.user.userData.token,
      )
        .then(() => {
          if (showMedical) {
            AccountSettingFunction.uploadLicense(
              formDataMed,
              this.props.user.userData.token,
            )
              .then(res => {
                this.setState({
                  uploading: false,
                  msgToDisplay:
                    'Thank you for submitting your documents. Our team is reviewing and will respond within 24 hours. In the meantime, feel free to set up your profiles for each module.',
                  alertModal: true,
                });
              })
              .catch(err => {
                this.setState({
                  uploading: false,
                  msgToDisplay: `${err.response.data.message}`,
                  alertModal: true,
                  errorAlert: true,
                });
              });
          } else {
            this.setState({
              uploading: false,
              msgToDisplay: 'Profile settings updated successfully',
              alertModal: true,
            });
          }
        })
        .catch(err => {
          this.setState({
            uploading: false,
            msgToDisplay: 'Help is on the way!',
            alertModal: true,
            errorAlert: true,
          });
        });
    } else {
      this.setState({submit: true});
    }
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
      this.props.navigation.goBack();
    }
  };

  recieveDataFromGallery = () => {
    const {medValue} = this.state;

    if (this.props?.route?.params?.filterImage != '') {
      if (medValue === 1) {
        this.setState(
          {medicalFront: this.props?.route?.params?.filterImage, medValue: 0},
          () => this.props.navigation.setParams({filterImage: null}),
        );
      }
      if (medValue === 2) {
        this.setState(
          {medicalBack: this.props?.route?.params?.filterImage, medValue: 0},
          () => this.props.navigation.setParams({filterImage: null}),
        );
      }
      if (medValue === 3) {
        this.setState(
          {userPic: this.props?.route?.params?.filterImage, medValue: 0},
          () => this.props.navigation.setParams({filterImage: null}),
        );
      }
    }
  };

  seacrhProfessionsFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.professionsData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempProfessions: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };
  render() {
    const {
      uploading,
      alertModal,
      msgToDisplay,
      submit,
      firstName,
      lastName,
      date,
      gender,
      dob,
      male,
      female,
      noBinary,
      medicalFront,
      tempProfessions,
      professionsData,
      jobProfession,
      searchingData,
      isVerified,
    } = this.state;
    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentContainerStyle={{paddingBottom: 100}}
                contentInset={{top: 0, bottom: 0}}>
                <View
                  style={{
                    marginTop: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AuthenticationHeader
                    heading={'User'}
                    string={'Identification'}
                  />
                </View>

                <View style={{marginHorizontal: '5%'}}>
                  <View style={{marginTop: '5%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={styles.margin}>
                        <Text style={styles.desc1}>First Name</Text>
                        <View style={styles.inputConttainer}>
                          <Input
                            verification
                            disabled={isVerified}
                            width={SCREEN_WIDTH * 0.425}
                            // colorProps
                            inputStyle={{fontSize: 12}}
                            value={firstName}
                            placeholder="Enter first name"
                            onChangeText={job =>
                              this.setState({firstName: job})
                            }
                          />
                        </View>
                      </View>
                      <View style={styles.margin}>
                        <Text style={styles.desc1}>Last Name</Text>
                        <View style={styles.inputConttainer}>
                          <Input
                            disabled={isVerified}
                            width={SCREEN_WIDTH * 0.425}
                            verification
                            value={lastName}
                            placeholder="Enter last name"
                            onChangeText={job => this.setState({lastName: job})}
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: -15,
                        marginBottom: 10,
                      }}>
                      {submit && !firstName && !lastName ? (
                        <Text style={commonStyle.errorText}>
                          &#9888; First & last names are required
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {/* Profession dropdown */}
                  <View style={{}}>
                    <Text style={styles.desc1}>Profession</Text>
                    <TouchableOpacity
                      disabled={isVerified}
                      style={styles.dropContainer}
                      onPress={() => {
                        this.setState({profSearch: true});
                      }}>
                      <View style={{flex: 1}}>
                        {jobProfession.length > 0 ? (
                          <Text style={styles.inputStyle}>
                            {jobProfession[0]?.label}
                          </Text>
                        ) : (
                          <Text style={styles.inputStyle}>
                            Select your profession.
                          </Text>
                        )}
                      </View>
                      <Search fill={'#000'} />
                    </TouchableOpacity>
                    {submit && !jobProfession.length > 0 ? (
                      <Text style={{...commonStyle.errorText, marginTop: 10}}>
                        &#9888; Please select a profession
                      </Text>
                    ) : null}
                    <DropDownModal
                      prof
                      loading={searchingData}
                      isVisible={this.state.profSearch}
                      selectedValue={jobProfession[0]?.label}
                      onClose={() => this.setState({profSearch: false})}
                      data={tempProfessions}
                      OnReset={() =>
                        this.setState({tempProfessions: professionsData})
                      }
                      onSearch={text => this.seacrhProfessionsFunction(text)}
                      onPress={data => {
                        let array = [];
                        array.push(data);
                        this.setState({
                          jobProfession: array,
                          profSearch: false,
                        });
                      }}
                    />
                  </View>
                  <View style={{marginTop: submit ? '2.5%' : '5%'}}>
                    <Text style={styles.desc1}>Date of Birth</Text>
                    <TouchableOpacity
                      disabled={isVerified}
                      onPress={() => this.setState({dateModal: true})}
                      style={styles.dropContainer}>
                      <View style={{flex: 1}}>
                        <Text style={styles.inputStyle}>
                          {dob ? dob : 'Select your date of birth'}
                        </Text>
                      </View>
                      <Search fill={'#000'} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    {submit && !dob ? (
                      <Text
                        style={{...commonStyle.errorText, marginTop: '2.5%'}}>
                        &#9888; Enter your correct DOB
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={{marginHorizontal: '5%'}}>
                  <View style={{marginTop: submit ? '2.5%' : '5%'}}>
                    <Text style={styles.desc1}>Gender</Text>
                    <TouchableOpacity
                      disabled={isVerified}
                      onPress={() => this.setState({genderModal: true})}
                      style={styles.inputConttainer1}>
                      <Text style={styles.inputStyle}>
                        {gender ? gender : 'Select your gender'}
                      </Text>
                      <Search fill={'#000'} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    {submit && !gender ? (
                      <Text
                        style={{...commonStyle.errorText, marginTop: '2.5%'}}>
                        &#9888; Please select gender
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.cardRowContainer}>
                    {medicalFront ? (
                      <ImageBackground
                        source={{uri: medicalFront}}
                        resizeMode="cover"
                        imageStyle={{borderRadius: 25}}
                        style={{
                          height: SCREEN_HEIGHT * 0.2,
                          width: SCREEN_WIDTH * 0.4,
                          borderRadius: 25,
                        }}>
                        <TouchableOpacity
                          style={{margin: '5%'}}
                          onPress={() => {
                            this.setState({medicalFront: ''});
                          }}>
                          <Icon.AntDesign
                            name="close"
                            size={25}
                            color={themeStyle.COLOR_RED}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      <View>
                        <View
                          style={{
                            backgroundColor: themeStyle.COLOR_WHITE,
                            height: 154,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: themeStyle.CARRER_DISABLE_BUTTON,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '5%',

                            shadowColor: '#000000',
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.17,
                            shadowRadius: 3.05,
                            elevation: 4,
                          }}>
                          <View style={{top: '10%'}}>
                            <Card height={65} />
                          </View>
                          <TouchableOpacity
                            disabled={isVerified}
                            onPress={() =>
                              this.setState(
                                {medValue: 1, showMedical: true},
                                () =>
                                  this.props.navigation.navigate(
                                    route.GALLERYPICKER,
                                  ),
                              )
                            }
                            style={styles.textBtnStyle}>
                            <Text style={styles.grayText1}>
                              Upload Medical ID
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          {submit && !medicalFront ? (
                            <Text
                              style={{
                                ...commonStyle.errorText,
                                marginTop: '10%',
                              }}>
                              &#9888; Please upload medical ID.
                            </Text>
                          ) : null}
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#EEEEEE',
                    paddingHorizontal: '5%',
                    paddingVertical: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: themeStyle.COLOR_BLACK_LIGHT,
                        }}>
                        For more Information on identification, please click
                        here
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={async () => {
                        this.props.navigation.navigate(route.FAQS);
                      }}
                      style={{marginLeft: 5}}>
                      <AlertSvg />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '2.5%',
                  }}>
                  <Button
                    title="Back"
                    width={SCREEN_WIDTH * 0.425}
                    onPress={async () => {
                      this.props.navigation.goBack();
                    }}
                    outline
                    borderColor={'#0B90CF'}
                    titleColor="#000"
                  />

                  {/* {HorizontalSpacer()} */}
                  {HorizontalSpacer()}
                  <Button
                    title="Send"
                    sky
                    disabledTitleStyle
                    disabled={firstName && lastName ? false : true}
                    width={SCREEN_WIDTH * 0.425}
                    onPress={() => {
                      this.setState({submit: true}, () =>
                        this.handleContinue(),
                      );
                    }}
                    titleColor="#FFFFFF"
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>

            <Modal
              isVisible={this.state.genderModal}
              useNativeDriver={false}
              hideModalContentWhileAnimating={true}
              animationIn={'slideInUp'}
              backdropColor={'#E9E9E9'}
              onBackdropPress={() => this.setState({genderModal: false})}
              animationInTiming={800}
              animationOutTiming={800}
              style={
                (styles.modal2Container,
                {margin: 0, justifyContent: 'flex-end'})
              }>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({genderModal: false})}
                  style={{alignItems: 'center', marginTop: '2.5%'}}>
                  <Icon.FontAwesome
                    name="angle-down"
                    size={30}
                    color={'#38474F'}
                  />
                </TouchableOpacity>
                <View style={{marginTop: '5%', marginBottom: '10%'}}>
                  <Text
                    style={{
                      ...styles.grayText,
                      fontFamily: themeStyle.FONT_BOLD,
                      color: themeStyle.COLOR_BLACK,
                      textAlign: 'center',
                    }}>
                    Please select you gender
                  </Text>
                  <View>
                    <TouchableOpacity
                      onPress={() => this.onSelectGender('Male', true)}
                      style={
                        male
                          ? styles.selectedButtonContainer
                          : styles.buttonContainer
                      }>
                      <Text
                        style={
                          male ? styles.selectedTextStyle : styles.textStyle
                        }>
                        Male
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onSelectGender('Female', true)}
                      style={
                        female
                          ? styles.selectedButtonContainer
                          : styles.buttonContainer
                      }>
                      <Text
                        style={
                          female ? styles.selectedTextStyle : styles.textStyle
                        }>
                        Female
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onSelectGender('No Binary', true)}
                      style={
                        noBinary
                          ? styles.selectedButtonContainer
                          : styles.buttonContainer
                      }>
                      <Text
                        style={
                          noBinary ? styles.selectedTextStyle : styles.textStyle
                        }>
                        Non-Binary
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <DateModal
              date={date}
              outline
              visible={this.state.dateModal}
              setDate={name => this.setState({date: name})}
              onClose={() => this.setState({dateModal: false})}
              onSave={() =>
                this.setState({
                  dateModal: false,
                  dob: moment(this.state.date).format('ll'),
                })
              }
              maximumDate={moment().subtract(18, 'years').toDate()}
            />
            {/* <UploadingModal visible={this.state.uploading} /> */}
            <DeleteModal
              verify
              alert
              visible={alertModal}
              topAds={this.props.user.topAds}
              bottomAds={this.props.user.bottomAds}
              confirm={() => {
                this.alertConfrim();
              }}
              text={msgToDisplay}
            />
            <VerifyReason
              visible={this.state.showVerify}
              onCancel={() =>
                this.setState({showVerify: false}, () =>
                  this.props.navigation.goBack(),
                )
              }
              onContinue={() => this.setState({showVerify: false})}
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
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings1st);
