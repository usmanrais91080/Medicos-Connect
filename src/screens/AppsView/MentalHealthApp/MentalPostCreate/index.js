import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import themeStyle from '../../../../assets/styles/theme.style';
import Search from '../../../../assets/svg/search.svg';
import {
  Button,
  Container,
  DeleteModal,
  Icon,
  Loader,
  SearchLocationModal,
  UploadingModal,
  CustomDropDownModal,
} from '../../../../components';
import {Avatar, Input} from 'react-native-elements';
import styles from './style';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SCREEN_WIDTH, route} from '../../../../lib/utils/constants';
import {MentalServices} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import themeStyle1 from '../../../../assets/styles/common.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class MentalPostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      alertModal: false,
      msgToDisplay: '',
      anyone: true,
      locationModal: false,
      people: false,
      publics: true,
      privates: false,
      selectedTip: '',
      data: [
        {
          id: 1,
          label: 'Trending',
          value: 'Trending',
        },
        {
          id: 1,
          label: 'Educational',
          value: 'Educational',
        },
        {
          id: 1,
          label: 'Entertainment',
          value: 'Entertainment',
        },
        {
          id: 1,
          label: 'Political',
          value: 'Political',
        },
        {
          id: 1,
          label: 'Popular',
          value: 'Popular',
        },
        {
          id: 1,
          label: 'News',
          value: 'News',
        },
        {
          id: 1,
          label: 'Food',
          value: 'Food',
        },
        {
          id: 1,
          label: 'LifeStyle',
          value: 'LifeStyle',
        },
      ],
      tempStoryData: [],
      professionMatchModal: false,
      searchingData: true,
      data1: [
        {
          id: 1,
          label: 'Trending',
          value: 'Trending',
        },
        {
          id: 1,
          label: 'Educational',
          value: 'Educational',
        },
        {
          id: 1,
          label: 'Entertainment',
          value: 'Entertainment',
        },
        {
          id: 1,
          label: 'Political',
          value: 'Political',
        },
        {
          id: 1,
          label: 'Popular',
          value: 'Popular',
        },
        {
          id: 1,
          label: 'News',
          value: 'News',
        },
        {
          id: 1,
          label: 'Food',
          value: 'Food',
        },
        {
          id: 1,
          label: 'LifeStyle',
          value: 'LifeStyle',
        },
      ],
      dropdownOpen: false,
      caption: '',
      location: '',
      latitude: '',
      longitude: '',
      postImage: '',
      uploading: false,
      userLat: this.props.user.userData.location
        ? this.props.user.userData.location.lat
        : 0,
      userLong: this.props.user.userData.location
        ? this.props.user.userData.location.long
        : 0,
    };
  }

  componentDidMount = () => {
    if (this.props?.route?.params?.post?._id) {
      this.setState({caption: this.props?.route?.params?.post?.description});
      this.props.navigation.setOptions({
        headerTitle: 'Update Post',
      });
    }
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.replace(route.MENTALHOME)}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
    // console.log("Post Images Array>>>>>>", this.props.route.params.postImage)
  };

  handleUploadNewPost = () => {
    const {publics, caption, latitude, longitude, location, submit, friends} =
      this.state;
    // this.props.navigation.replace(route.MENTALHOME);
    if (submit) {
      let formData = {
        description: caption,
      };
      // formData.append('description', caption ? caption : '');
      // console.log('FormData>>>>>>>>>>>', formData);
      MentalServices.createPost(formData, this.props.user.userData.token)
        .then(response => {
          if (response.data.code == 200) {
            this.setState({
              uploading: false,
              caption: '',
            });
            this.props.navigation.goBack();
          }
        })
        .catch(err => {
          // this.setState({uploading: false});
          this.setState({
            submit: true,
            uploading: false,
            msgToDisplay: 'Oops…something went wrong!',
            alertModal: true,
          });
          // console.log('Create Post Mental Error>>>>>>', err);
        });
    } else {
      // console.log(postImage)
      this.setState({
        submit: true,
        uploading: false,
      });
    }
  };

  handleUpdatePost = () => {
    const {publics, caption, latitude, longitude, location, submit, friends} =
      this.state;
    // this.props.navigation.replace(route.MENTALHOME);
    if (submit) {
      let formData = {
        description: caption,
        post_id: this.props.route?.params?.post?._id,
      };
      // formData.append('description', caption ? caption : '');
      // console.log('FormData>>>>>>>>>>>', formData);
      MentalServices.updatePost(formData, this.props.user.userData.token)
        .then(response => {
          if (response.data.code == 200) {
            this.setState({
              uploading: false,
              caption: '',
            });
            this.props.navigation.goBack();
          }
        })
        .catch(err => {
          // this.setState({uploading: false});
          this.setState({
            submit: true,
            uploading: false,
            msgToDisplay: 'Oops…something went wrong!',
            alertModal: true,
          });
          // console.log('Create Post Mental Error>>>>>>', err);
        });
    } else {
      // console.log(postImage)
      this.setState({
        submit: true,
        uploading: false,
      });
    }
  };

  renderChips(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              friends: this.state.friends.filter((_, i) => i != index),
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
          <Text style={styles.whiteText}>{item.label}</Text>
        </View>
      </View>
    );
  }

  async goMap(data, details) {
    let searchObj = {
      searchData: data,
      searchDetails: details,
    };
    this.setState({
      location: searchObj.searchDetails.formatted_address,
      latitude: searchObj.searchDetails.geometry.location.lat,
      longitude: searchObj.searchDetails.geometry.location.lng,
      locationModal: false,
    });
  }
  getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };

  seacrhMatchProfesstionFunction = text => {
    this.setState({searchingData: true});
    const newData = this.state.data.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({tempStoryData: newData, searchingData: false});
    } else {
      this.setState({searchingData: false});
    }
  };

  render() {
    const {
      location,
      friends,
      uploading,
      caption,
      locationModal,
      alertModal,
      msgToDisplay,
      tempStoryData,
      searchingData,
      publics,
      privates,
      data,
      postImage,
      submit,
      userLat,
      userLong,
    } = this.state;
    return (
      <Container color>
        {uploading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentInset={{top: 0, bottom: 0}}
                contentContainerStyle={{paddingBottom: '20%'}}>
                <View style={styles.headingContainer}>
                  <View
                    style={{
                      marginTop: '2%',
                      width: SCREEN_WIDTH * 0.8,
                    }}>
                    <View style={styles.rowStyle}>
                      <Avatar
                        avatarStyle={styles.avatarStyle}
                        source={{
                          uri:
                            this.props.user.userData.mental_health_image != ''
                              ? this.props.user.userData.mental_health_image
                              : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                        }}
                        rounded
                        size={40}
                      />
                      <View style={{justifyContent: 'center'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: SCREEN_WIDTH * 0.6,
                          }}>
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={{...styles.textStyle}}>
                            {this.props.user.userData.name}
                          </Text>
                          {/* {item?.mood != "" ?
                                    <Avatar
                                      source={{
                                        uri:
                                          item?.mood?.image
                                      }}
                                      rounded
                                      size={20}
                                    /> : <Emoji />} */}
                        </View>
                      </View>
                    </View>

                    {/* <Avatar
                      source={{
                        uri:
                          this.props.user.userData.mental_health_image != ''
                            ? this.props.user.userData.mental_health_image
                            : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
                      }}

                      rounded
                      size={50}
                    /> */}
                    <Input
                      placeholder="What is on your mind"
                      multiline={true}
                      value={caption}
                      containerStyle={styles.containerStyle}
                      onChangeText={e => this.setState({caption: e})}
                      placeholderTextColor={'#77777B'}
                      inputContainerStyle={styles.inputContainerStyle}
                      inputStyle={styles.inputStyle}
                    />
                    {submit && !caption.length && (
                      <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                        Please fill this field
                      </Text>
                    )}
                  </View>
                </View>

                {/* <View style={styles.headingContainer}>
                  <Text style={styles.headingText}>Location</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({locationModal: true})}
                    style={styles.inputContainer}>
                    <View>
                      {location ? (
                        <Text style={styles.inputStyle1}>{location}</Text>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                    <View>
                      <Search />
                    </View>
                  </TouchableOpacity>
                </View> */}

                {/*
                <View style={styles.margin}>
                  <Text style={styles.headingText}>Privacy</Text>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({publics: true, privates: false})
                      }
                      style={styles.row}>
                      <View
                        style={
                          publics ? styles.selectedbox : styles.box
                        }></View>
                      <Text
                        style={publics ? styles.selectedOption : styles.option}>
                        Public
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({privates: true, publics: false})
                      }
                      style={[styles.row, {marginLeft: '15%'}]}>
                      <View
                        style={
                          privates ? styles.selectedbox : styles.box
                        }></View>
                      <Text
                        style={
                          privates ? styles.selectedOption : styles.option
                        }>
                        Private
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              {/* <View style={styles.rowContainer2}>
                                    <View style={styles.lightDash}></View>
                                    <View style={{ width: 10 }}></View>
                                    <View style={styles.darkDash}></View>
                                </View> */}
              <Button
                mental
                loading={uploading}
                title={
                  this.props?.route?.params?.post?._id ? 'Update Post' : 'Post'
                }
                onPress={() =>
                  this.setState({submit: true, uploading: true}, () => {
                    this.props?.route?.params?.post?._id
                      ? this.handleUpdatePost()
                      : this.handleUploadNewPost();
                  })
                }
              />
            </View>
            <SearchLocationModal
              onClose={() => this.setState({locationModal: false})}
              visible={locationModal}
              onPress={(data, details) => this.goMap(data, details)}
              lati={userLat}
              longi={userLong}
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

export default connect(mapStateToProps, mapDispatchToProps)(MentalPostCreate);
