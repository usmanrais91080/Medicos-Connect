import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  CustomDropDownModal,
  DeleteModal,
  HeaderLeftProfile,
  Tabs,
} from '../../../../components';
import styles from './styles';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import CareerMenu from '../CareerMenu';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {connect, useDispatch} from 'react-redux';
import {route} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import CareerProfileFunction from '../CareerEditProfile1st/career.profile.function';
import {CareerServices} from '../../../../services';
import DocumentPicker from 'react-native-document-picker';
import CheckBox from '@react-native-community/checkbox';
import LinksModal from '../../../../components/Modals/LinksModal';
import {CareerEditProfile} from '../../..';
import axios from 'axios';
import {BASE_URL} from '../../../../enviroments';

const CareerCreateProfile = ({route: routeData, user, navigation}) => {
  const [activeTab, setActiveTab] = useState(
    routeData.params?.medical ? 0 : routeData.params?.freelancer ? 1 : 2,
  );
  const [alertModal, setAlertModal] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState('');
  const [visible, setVisible] = useState(false);
  const [unverifiedUser] = useState(
    user.userData.user_tier == 0 ? true : false,
  );
  const [photos, setPhotos] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [jobCountry, setJobCountry] = useState(
    userProfile.country ? userProfile.country : {},
  );
  const [jobCity, setJobCity] = useState(
    userProfile.city ? userProfile.city : {},
  );
  const [tempCountry, setTempCountry] = useState([]);
  const [tempCity, setTempCity] = useState([]);
  const [searchingData, setSearchingData] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countrySearch, setCountrySearch] = useState(false);
  const [citySearch, setCitySearch] = useState(false);
  const [firstName, setFirstName] = useState(
    userProfile.username ? userProfile?.username : '',
  );
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [maximumAmount, setMaximumAmount] = useState(0);
  const [giveaway, setGiveaway] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [langSearch, setLangSearch] = useState(false);
  const [tempClassLang, setTempClassLang] = useState([]);
  const [classLang, setClassLang] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [influencerDescription, setInfluencerDescription] = useState('');
  const [influencerPhoto, setInfluencerPhoto] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => headerLeft(),
    });
    getUserProfile();
    getProfiles();
    getJobCountry();
    getClassLanguages();
  }, []);

  const getProfiles = () => {
    const {is_medical, is_influencer, is_freelancer, token} = user?.userData;
    if (is_medical) {
    }
    if (is_influencer) {
      CareerServices.getInfluencerProfile(token)
        .then(res => {
          setOfferTitle(res.data.data?.career_influencer_offer_title);
          setInfluencerDescription(
            res.data.data?.career_influencer_description,
          );
          setFacebook(res.data.data?.career_influencer_fb_link);
          setTiktok(res.data.data?.career_influencer_tiktok_link);
          setInstagram(res.data.data?.career_influencer_insta_link);
          setLinkedin(res.data.data?.career_influencer_linkedin_link);
          setMaximumAmount(res.data.data?.career_influencer_max_price);
          setMinimumAmount(res.data.data?.career_influencer_min_price);
          setTwitter(res.data.data?.career_influencer_x_link);
          setGiveaway(
            res.data.data?.career_influencer_giveway == 'Yes' ? true : false,
          );
          setLanguages(res.data.data?.career_influencer_languages);
          setJobCountry(res.data.data?.career_influencer_country);
          setInfluencerPhoto(res.data?.data?.career_influencer_image);
        })
        .catch(error => null);
    }
    if (is_freelancer) {
      CareerServices.getFreelancerProfile(token)
        .then(res => {
          if (res.data.data?.career_freelancer_fname) {
            setFirstName(res.data.data?.career_freelancer_fname);
          }
          if (res.data.data?.career_freelancer_lname) {
            setLastName(res.data.data?.career_freelancer_lname);
          }
          setDescription(res.data.data?.career_freelancer_description);
          setPortfolio(res.data.data?.career_freelancer_portfolio);
          setJobCity(res.data.data?.career_freelancer_city);
          setJobCountry(res.data.data?.career_freelancer_country);
          setPhotos(res.data?.data?.career_freelancer_image);
        })
        .catch(error => null);
    }
  };

  const headerLeft = () => (
    <HeaderLeftProfile
      color={
        routeData.params?.prev_screen == 'Profile'
          ? themeStyle.CARRER_PRIMARY
          : themeStyle.COLOR_WHITE
      }
      strokeColor={
        routeData.params?.prev_screen == 'Profile'
          ? themeStyle.CARRER_PRIMARY
          : themeStyle.COLOR_WHITE
      }
      navigation={navigation}
    />
  );

  const getJobCountry = () => {
    CareerServices.getJobCountries(user.userData.token)
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
        setTempCountry(array);
        setCountryData(array);
      })
      .catch(err => console.log(err));
  };

  const getJobCity = id => {
    CareerServices.getJobCityByCountry(id, user.userData.token)
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
        setCityData(array);
        setTempCity(array);
        setSearchingData(false);
      })
      .catch(err => {
        setSearchingData(false);
      });
  };

  const getUserProfile = () => {
    CareerProfileFunction.getUserProfile(user.userData.token)
      .then(res => {
        setUserProfile(res);
      })
      .catch(err => null);
  };

  const seacrhCountryFunction = text => {
    setSearchingData(true);
    const newData = countryData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      setTempCountry(newData);
      setSearchingData(false);
    } else {
      setSearchingData(false);
    }
  };

  const getClassLanguages = () => {
    CareerServices.getJobLanguages(user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.name,
          });
        });
        setClassLang(array);
        setTempClassLang(array);
        setSearchingData(false);
      })
      .catch(err => {});
  };

  const seacrhCityFunction = text => {
    setSearchingData(true);
    const newData = cityData.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      setTempCity(newData);
      setSearchingData(false);
    } else {
      setSearchingData(false);
    }
  };

  const chooseFile = index => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    }).then(image => {
      if (activeTab == 2) {
        setInfluencerPhoto(image);
      } else {
        setPhotos(image);
      }
    });
  };

  const seacrhLangFunction = text => {
    setSearchingData(true);
    const newData = classLang.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      setTempClassLang(newData);
      setSearchingData(false);
    } else {
      setSearchingData(false);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'documentDirectory',
      });
      setPortfolio(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      }
    }
  };

  const createFreelancerProfile = () => {
    if (
      firstName?.trim() &&
      lastName?.trim() &&
      jobCountry &&
      jobCity &&
      description &&
      photos
    ) {
      let formData = new FormData();

      formData.append('fname', firstName);
      formData.append('lname', lastName);
      formData.append('country', jobCountry._id || jobCountry.id);
      formData.append('city', jobCity._id || jobCity.id);
      formData.append('description', description);
      if (photos.path) {
        formData.append('image', {
          uri: photos.path,
          type: photos.type || 'image/jpeg',
          name: photos.fileName || 'photo.jpg',
        });
      }
      formData.append('portfolio', portfolio || '');
      axios
        .put(`${BASE_URL}career/profile/freelancer`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': user.userData.token,
          },
        })
        .then(response => {
          if (response.data.code === 200) {
            setAlertModal(true);
            setMsgToDisplay('Freelancer profile updated successfully.');
          }
        })
        .catch(error => {
          setAlertModal(true);
          setMsgToDisplay('Error occurred while creating profile');
        });
    } else {
      setAlertModal(true);
      setMsgToDisplay('Please fill all the required fields');
    }
  };

  const createInfluencerProfile = () => {
    if (
      offerTitle &&
      languages &&
      minimumAmount > 0 &&
      maximumAmount > 0 &&
      jobCountry &&
      influencerDescription
    ) {
      if (+minimumAmount > +maximumAmount) {
        setAlertModal(true);
        setMsgToDisplay('Minimum amount should be less than maximum amount');
        return;
      }

      const formData = new FormData();
      if (influencerPhoto.path) {
        formData.append('image', {
          uri: influencerPhoto.path,
          type: influencerPhoto.type || 'image/jpeg',
          name: influencerPhoto.fileName || 'photo.jpg',
        });
      }

      formData.append('description', influencerDescription);
      formData.append('min_price', minimumAmount);
      formData.append('max_price', maximumAmount);
      formData.append('giveaway', giveaway ? 'Yes' : 'No');
      formData.append('fb_link', facebook);
      formData.append('insta_link', instagram);
      formData.append('x_link', twitter);
      formData.append('tiktok_link', tiktok);
      formData.append('linkedin_link', linkedin);
      formData.append('country', jobCountry._id || jobCountry.id);

      languages.map((item, index) => {
        formData.append('languages[]', item._id);
      });
      formData.append('offer_title', offerTitle);

      axios
        .put(`${BASE_URL}career/profile/influencer`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': user.userData.token,
          },
        })
        .then(response => {
          if (response.data.code == 200) {
            getProfiles();
            setAlertModal(true);
            setMsgToDisplay('Influencer profile updated successfully.');
          }
        })
        .catch(err => {
          setAlertModal(true);
          setMsgToDisplay('Error occurred while creating profile');
        });
    } else {
      setAlertModal(true);
      setMsgToDisplay('Please fill all the required fields');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeStyle.CARRER_PRIMARY}
      />
      <Text style={styles.heading}>
        Update Your{'\n'}Profile{' '}
        <Text style={styles.headingBold}>{firstName + ' ' + lastName}</Text>
      </Text>
      <Tabs.ListTabs
        active={activeTab}
        tabs={['Medical', 'Freelancer', 'Influencer']}
        profile
        onTabChange={activeTab => {
          setActiveTab(activeTab);
        }}
      />
      {activeTab == 0 && <CareerEditProfile navigation={navigation} />}
      {activeTab == 1 && (
        <View style={styles.freelancerContainer}>
          <ScrollView>
            <Avatar
              source={{
                uri: photos?.path ? photos?.path : photos,
              }}
              rounded
              avatarStyle={{
                borderColor: themeStyle.CARRER_PRIMARY,
                borderWidth: 2,
                borderRadius: 60,
              }}
              size={80}>
              <Avatar.Accessory
                type="feather"
                name="edit-2"
                color="white"
                onPress={chooseFile}
                size={12}
                style={{
                  backgroundColor: themeStyle.CARRER_PRIMARY,
                  borderRadius: 10,
                  height: 20,
                  width: 20,
                  right: 0,
                  transform: [{rotate: '280deg'}],
                }}></Avatar.Accessory>
            </Avatar>
            <TouchableOpacity onPress={chooseFile}>
              <Text style={styles.headingText}>Add Profile Photo</Text>
            </TouchableOpacity>

            <View style={styles.row2}>
              <View style={{width: '48%', marginTop: 24}}>
                <Text style={styles.grayText}>{'First Name'}</Text>
                <TextInput
                  value={firstName}
                  placeholder="First Name"
                  style={styles.inputConttainer1}
                  placeholderTextColor={themeStyle.INPUT_PRIMARY_TEXT_COLOR}
                  onChangeText={text => setFirstName(text)}
                />
              </View>
              <View style={{width: '48%', marginTop: 24}}>
                <Text style={styles.grayText}>Last Name</Text>
                <TextInput
                  value={lastName}
                  placeholder="Last Name"
                  placeholderTextColor={themeStyle.INPUT_PRIMARY_TEXT_COLOR}
                  style={styles.inputConttainer1}
                  onChangeText={text => setLastName(text)}
                />
              </View>
            </View>

            <View style={styles.row2}>
              <View style={{width: '48%', marginTop: 24}}>
                <Text style={styles.grayText}>Country</Text>
                <TouchableOpacity
                  style={[
                    styles.inputConttainer1,
                    {paddingLeft: 16, paddingRight: 12},
                  ]}
                  onPress={() => {
                    setCountrySearch(true);
                  }}>
                  <View style={{flex: 1}}>
                    {jobCountry ? (
                      <Text style={styles.country}>
                        {jobCountry?.label || jobCountry?.name}
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
              </View>
              {/* City Dropdown */}
              <View style={{width: '48%', marginTop: 24}}>
                <Text style={styles.grayText}>City</Text>
                <TouchableOpacity
                  style={[
                    styles.inputConttainer1,
                    {paddingLeft: 16, paddingRight: 12},
                  ]}
                  onPress={() => {
                    setCitySearch(true);
                  }}>
                  <View style={{flex: 1}}>
                    {jobCity ? (
                      <Text style={styles.desc1}>
                        {jobCity?.label || jobCity?.name}
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
                  onClose={() => setCitySearch(false)}
                  data={tempCity}
                  OnReset={() => setTempCity(cityData)}
                  onSearch={text => seacrhCityFunction(text)}
                  onPress={data => {
                    setJobCity(data);
                    setCitySearch(false);
                  }}
                />
              </View>
            </View>
            <Text style={{...styles.grayText, marginTop: 24}}>
              Describe yourself
            </Text>
            <TextInput
              value={description}
              placeholder="Description"
              style={styles.description}
              placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
              textAlignVertical="top"
              onChangeText={text => setDescription(text)}
              multiline
            />
            <Text style={{...styles.grayText, marginTop: 24}}>Portfolio</Text>
            <TouchableOpacity
              style={styles.showcaseButton}
              onPress={handleDocumentPick}>
              <Text style={styles.showcase}>Showcase work</Text>
            </TouchableOpacity>
            {portfolio != '' ? (
              <Text style={{...styles.grayText, marginTop: 8}}>
                {portfolio?.name}
              </Text>
            ) : null}
            <Text style={styles.optional}>Optional</Text>
            <View style={{marginVertical: 30, ...styles.row2}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(route.HOMESCREEN)}
                style={styles.cancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={createFreelancerProfile}
                style={styles.confirm}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
      {activeTab == 2 && (
        <View style={styles.freelancerContainer}>
          <ScrollView>
            <Avatar
              source={{
                uri: influencerPhoto?.path
                  ? influencerPhoto?.path
                  : influencerPhoto,
              }}
              rounded
              avatarStyle={{
                borderColor: themeStyle.CARRER_PRIMARY,
                borderWidth: 2,
                borderRadius: 60,
              }}
              size={80}>
              <Avatar.Accessory
                type="feather"
                name="edit-2"
                color="white"
                onPress={chooseFile}
                size={12}
                style={{
                  backgroundColor: themeStyle.CARRER_PRIMARY,
                  borderRadius: 10,
                  height: 20,
                  width: 20,
                  right: 0,
                  transform: [{rotate: '280deg'}],
                }}></Avatar.Accessory>
            </Avatar>
            <TouchableOpacity onPress={chooseFile}>
              <Text style={styles.headingText}>Add Profile Photo</Text>
            </TouchableOpacity>
            <Text style={{...styles.grayText, marginTop: 24}}>Offer Title</Text>
            <TextInput
              value={offerTitle}
              placeholder="What are you offering"
              style={styles.inputConttainer1}
              placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
              onChangeText={setOfferTitle}
            />
            <Text style={{...styles.grayText, marginTop: 24}}>
              Describe yourself
            </Text>
            <TextInput
              value={influencerDescription}
              placeholder="Describe your offer"
              style={styles.description}
              placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
              textAlignVertical="top"
              onChangeText={setInfluencerDescription}
              multiline
            />
            <Text style={{...styles.grayText, marginTop: 24}}>
              Social Media Profiles
            </Text>
            <TouchableOpacity
              style={styles.addSocialMediaProfileBtn}
              onPress={() => setShowLinkModal(true)}>
              <Text style={styles.grayText}>Add Social media profiles</Text>
              <Icon.AntDesign
                name="caretdown"
                size={12}
                color={themeStyle.CARRER_PRIMARY}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              {facebook != '' ? (
                <View style={styles.box}>
                  <Icon.FontAwesome
                    name="facebook"
                    size={18}
                    color={themeStyle.CARRER_PRIMARY}
                  />
                </View>
              ) : null}
              {instagram != '' ? (
                <View style={styles.box}>
                  <Icon.FontAwesome
                    name="instagram"
                    size={18}
                    color={themeStyle.CARRER_PRIMARY}
                  />
                </View>
              ) : null}
              {twitter != '' ? (
                <View style={styles.box}>
                  <Icon.FontAwesome6
                    name="x-twitter"
                    size={18}
                    color={themeStyle.CARRER_PRIMARY}
                  />
                </View>
              ) : null}
              {tiktok != '' ? (
                <View style={styles.box}>
                  <Icon.FontAwesome6
                    name="tiktok"
                    size={18}
                    color={themeStyle.CARRER_PRIMARY}
                  />
                </View>
              ) : null}
              {linkedin != '' ? (
                <View style={styles.box}>
                  <Icon.FontAwesome
                    name="linkedin"
                    size={18}
                    color={themeStyle.CARRER_PRIMARY}
                  />
                </View>
              ) : null}
            </View>
            <Text style={styles.price}>Price</Text>
            <View style={styles.row2}>
              <View style={{width: '48%'}}>
                <Text style={styles.grayText}>Minimum Amount</Text>
                <TextInput
                  value={minimumAmount}
                  placeholder="0"
                  style={styles.inputConttainer1}
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={text => setMinimumAmount(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={{width: '48%'}}>
                <Text style={styles.grayText}>Maximum Amount</Text>
                <TextInput
                  value={maximumAmount}
                  placeholder="0"
                  keyboardType="numeric"
                  style={styles.inputConttainer1}
                  placeholderTextColor={themeStyle.CAREER_PLACEHOLDER}
                  onChangeText={text => setMaximumAmount(text)}
                />
              </View>
            </View>
            <Text style={{...styles.grayText, marginTop: 24, marginBottom: 3}}>
              Giveaway
            </Text>
            <View style={styles.row}>
              <View style={{...styles.row, marginRight: 54, marginLeft: 2}}>
                <CheckBox
                  disabled={false}
                  value={giveaway}
                  onValueChange={newValue => setGiveaway(newValue)}
                  tintColors={{
                    true: themeStyle.CARRER_PRIMARY,
                    false: themeStyle.CARRER_PRIMARY,
                  }}
                />
                <Text
                  style={[
                    styles.grayText,
                    {
                      marginLeft: 5,
                    },
                  ]}>
                  Yes
                </Text>
              </View>
              <View style={styles.row}>
                <CheckBox
                  disabled={false}
                  value={!giveaway}
                  onValueChange={newValue => setGiveaway(!newValue)}
                  tintColors={{
                    true: themeStyle.CARRER_PRIMARY,
                    false: themeStyle.CARRER_PRIMARY,
                  }}
                />
                <Text
                  style={[
                    styles.grayText,
                    {
                      marginLeft: 5,
                    },
                  ]}>
                  No
                </Text>
              </View>
            </View>
            <Text style={{...styles.grayText, marginTop: 24}}>Language</Text>
            <TouchableOpacity
              style={{
                ...styles.inputConttainer1,
                justifyContent: 'space-between',
              }}
              onPress={() => {
                setLangSearch(true);
              }}>
              <Text style={styles.desc1}>Select Language</Text>
              <Icon.AntDesign
                name="caretdown"
                size={12}
                color={themeStyle.CARRER_PRIMARY}
              />
            </TouchableOpacity>
            {languages.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 8,
                }}>
                {languages.map((item, index) => (
                  <View style={styles.selectedLang} key={index}>
                    <Text style={styles.desc1}>{item.label || item.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        let array = [...languages];
                        array.splice(index, 1);
                        setLanguages(array);
                      }}
                      style={styles.minusIcon}>
                      <Icon.AntDesign
                        name="minuscircle"
                        size={15}
                        color={'#D93231'}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null}
            <Text style={{...styles.grayText, marginTop: 24}}>Country</Text>
            <TouchableOpacity
              style={[
                styles.inputConttainer1,
                {paddingLeft: 16, paddingRight: 12},
              ]}
              onPress={() => {
                setCountrySearch(true);
              }}>
              <View style={{flex: 1}}>
                {jobCountry ? (
                  <Text style={styles.country}>
                    {jobCountry?.label || jobCountry?.name}
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

            <View style={{marginVertical: 30, ...styles.row2}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(route.HOMESCREEN)}
                style={styles.cancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={createInfluencerProfile}
                style={styles.confirm}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      <LinksModal
        visible={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        confirm={() => setShowLinkModal(false)}
        facebook={facebook}
        setFacebook={setFacebook}
        instagram={instagram}
        setInstagram={setInstagram}
        twitter={twitter}
        setTwitter={setTwitter}
        tiktok={tiktok}
        setTiktok={setTiktok}
        linkedin={linkedin}
        setLinkedin={setLinkedin}
      />

      <CustomDropDownModal
        lang
        loading={searchingData}
        isVisible={langSearch}
        onClose={() => setLangSearch(false)}
        data={tempClassLang}
        OnReset={() => setTempClassLang(classLang)}
        onSearch={text => seacrhLangFunction(text)}
        onPress={data => {
          let array = [...languages, data];
          setLanguages(array);
          setTempClassLang(classLang);
        }}
      />

      <CareerMenu
        visible={visible}
        onEditProfile={() => {
          setVisible(false);
          navigation.navigate(route.CAREEREDITPROFILE);
        }}
        onDeactive={async () => {
          const data = await user?.userModules?.filter(function (account) {
            return account.module.name === 'Career';
          });
          ProfileServices.deactivateUserModule(
            {id: data[0]._id},
            user.userData.token,
          )
            .then(async res => {
              setVisible(false);
              await authActions.getUserModules(user.userData.token);
              navigation.replace(route.MAIN);
            })
            .catch(err => {});
        }}
        onViewJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBAPPLIED);
        }}
        onFavJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBFAV);
        }}
        onPostedJobs={() => {
          setVisible(false);
          navigation.navigate(route.CAREERJOBPOSTED);
        }}
        onProfile={() => {
          setVisible(false);
          navigation.navigate(route.CAREERSETTINGS);
        }}
        onClose={() => setVisible(false)}
        navigation={navigation}
      />
      <DeleteModal
        alert
        visible={alertModal}
        confirm={() => {
          setAlertModal(false);
          if (!user.userData.is_career_profile_created) {
            // navigation.navigate(route.CAREERSETTINGS, {
            //   prev_screen: route.HOME,
            // });
          } else if (unverifiedUser) {
            navigation.push(route.MAIN, {
              screen: route.PROFILE,
              params: {
                screen: route.ACCOUNTSETTINGS,
                params: {
                  data: 0,
                },
              },
            });
          }
        }}
        text={msgToDisplay}
      />
      <CustomDropDownModal
        country
        loading={searchingData}
        isVisible={countrySearch}
        onClose={() => setCountrySearch(false)}
        data={tempCountry}
        OnReset={() => setTempCountry(countryData)}
        onSearch={text => seacrhCountryFunction(text)}
        onPress={data => {
          setJobCountry(data);
          setCountrySearch(false);
          setSearchingData(true);
          getJobCity(data.id);
        }}
      />
    </View>
  );
};

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
)(CareerCreateProfile);
