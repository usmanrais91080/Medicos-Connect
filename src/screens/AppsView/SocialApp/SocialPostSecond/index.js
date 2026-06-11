import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
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
import styles from './style';
import {SCREEN_WIDTH, route} from '../../../../lib/utils/constants';
import {SocialServices} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {postActions} from '../../../../redux/actions/post';
import Link from '../../../../assets/svg/link-new.svg';
import FastImage from 'react-native-fast-image';
import PostModal from '../../../../components/Modals/PostModal';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class SocialPost1 extends Component {
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
      dropdownOpen: false,
      caption: '',
      location: '',
      latitude: '',
      longitude: '',
      postImage: '',
      link: '',
      uploading: false,
      userLat: this.props.user.userData.location
        ? this.props.user.userData.location.lat
        : 0,
      userLong: this.props.user.userData.location
        ? this.props.user.userData.location.long
        : 0,
      postImage: this.props.route.params?.postImage,
      createText: this.props.route.params?.createText,
      postModal: false,
    };
  }

  componentDidMount = () => {
    this.getTagFriends();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props?.route?.params?.video
              ? this.props.navigation.navigate(route.SOCIALPOSTPICKER, {
                  data: this.props.user.userData._id,
                })
              : this.props.navigation.goBack()
          }
          color={themeStyle.COLOR_BLACK}
        />
      ),
      headerTitle: this.state.postImage ? 'Picture' : 'Text',
    });
  };

  getTagFriends = () => {
    SocialServices.getTagUsers(this.props.user.userData.token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.username,
            value: item._id,
            image: item.image,
          });
        });
        this.setState({
          data: array,
          tempStoryData: array,
          searchingData: false,
        });
      })
      .catch(err => {
        this.setState({
          searchingData: false,
        });
        // console.log(err);
      });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(route.SOCIALSEARCH)}>
          <Search />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  handleUploadNewPost = () => {
    const {
      publics,
      caption,
      latitude,
      longitude,
      location,
      submit,
      friends,
      link,
    } = this.state;
    const {postImage, postThumb} = this.props.route.params;
    if (submit) {
      let formData = new FormData();
      formData.append('description', caption ? caption : '');
      formData.append('type', publics ? 'Public' : 'Private');
      formData.append('link', link);
      formData.append('content_type', postImage?.length > 0 ? 'MEDIA' : 'TEXT');
      if (postImage?.length > 0) {
        postImage?.map((val, ind) => {
          formData.append(`files`, val);
        });

        if (postThumb) {
          postThumb?.map((item, ind) => {
            formData.append(`thumbnail`, item);
          });
        } else {
          postImage?.map((val, ind) => {
            formData.append(`thumbnail`, val);
          });
        }
      }
      if (friends?.length >= 1)
        friends?.map((item, index) => {
          formData.append(`tag_users[${index}]`, item.id);
        });

      if (latitude && longitude && location) {
        formData.append('lat', latitude);
        formData.append('long', longitude);
        formData.append('location', location);
      }

      SocialServices.createPost(formData, this.props.user.userData.token)
        .then(response => {
          if (response.data.code == 200) {
            this.props.socialActions.getPosts(this.props.user.userData.token);
            this.props.socialActions.getStories(
              this.props?.user?.userData?._id,
              this.props?.user?.userData?.social_username,
              this.props?.user?.userData?.social_image,

              this.props.user.userData.token,
            );
            this.setState({postModal: true});
            setTimeout(() => {
              this.setState({
                uploading: false,
                caption: '',
                location: '',
                friends: [],
              });
            }, 100);
          } else {
            console.log(
              '🚀 ~ file: index.js:256 ~ SocialPost1 ~ response.data.code',
              response.data,
            );
          }
        })
        .catch(err => {
          this.setState({uploading: false});
          console.log('Oops…something went wrong!111', err.response);
        });
    } else {
      this.setState({
        submit: true,
        uploading: false,
        msgToDisplay: 'Oops…something went wrong!',
        alertModal: true,
      });
    }
  };

  handleUploadNewStory = () => {
    const {publics, caption, latitude, longitude, location, submit, friends} =
      this.state;
    const {postImage} = this.props.route.params;
    if (postImage && submit) {
      if (postImage.length > 0) {
        let formData = new FormData();
        formData.append('description', caption ? caption : '');
        formData.append('type', publics ? 'Public' : 'Private');
        if (friends.length >= 1)
          friends.map((item, index) => {
            formData.append(`tag_users[${index}]`, item.id);
          });

        if (latitude && longitude && location) {
          formData.append('lat', latitude);
          formData.append('long', longitude);
          formData.append('location', location);
        }
        postImage.map((val, ind) => {
          formData.append(`files`, val);
        });
        SocialServices.createStory(formData, this.props.user.userData.token)
          .then(response => {
            if (response.data.code == 200) {
              this.props.socialActions.getPosts(this.props.user.userData.token);
              this.props.socialActions.getStories(
                this.props?.user?.userData?._id,
                this.props?.user?.userData?.social_username,
                this.props?.user?.userData?.social_image,
                this.props.user.userData.token,
              );
              this.setState({postModal: true});
              setTimeout(() => {
                this.setState({uploading: false});
              }, 100);
            }
          })
          .catch(err => {
            this.setState({uploading: false});
            // console.log(err);
          });
      }
    } else {
      this.setState({submit: true, uploading: false});
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
      userLat,
      userLong,
      link,
      createText,
      postModal,
    } = this.state;
    const {createStory} = this.props.route.params;
    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container>
            <View style={styles.container}>
              <KeyboardAwareScrollView
                contentInset={{top: 0, bottom: 0}}
                contentContainerStyle={{paddingBottom: '20%'}}>
                <StatusBar
                  backgroundColor={themeStyle.YELLOW}
                  barStyle="dark-content"
                />
                {postImage ? (
                  <FastImage
                    source={{uri: postImage[0]?.uri}}
                    style={styles.imageStyle}
                  />
                ) : null}
                <View style={styles.headingContainer}>
                  <Text style={styles.headingText}>
                    {createText ? 'Create Post' : 'Caption'}
                  </Text>
                  <View
                    style={{
                      marginTop: '1%',
                    }}>
                    <View style={styles.inputContainerStyle}>
                      <TextInput
                        placeholder="Share your thoughts about this picture"
                        multiline={true}
                        value={caption}
                        style={styles.containerStyle}
                        onChangeText={e => this.setState({caption: e})}
                        placeholderTextColor={'#77777B'}
                        textAlignVertical="top"
                      />
                      {postImage?.length == 0 || createText ? (
                        <View style={styles.linkContainer}>
                          <TextInput
                            value={link}
                            onChangeText={e => this.setState({link: e})}
                            placeholder="Link"
                            style={styles.linkInput}
                            placeholderTextColor={'#77777B'}
                          />
                          <Link />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
                {!createText ? (
                  <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Location</Text>
                    <TouchableOpacity
                      style={styles.inputConttainer1}
                      onPress={() => {
                        this.setState({locationModal: true});
                      }}>
                      <View style={{flex: 1}}>
                        {location.length > 0 ? (
                          <Text style={styles.selectFriends}>{location}</Text>
                        ) : (
                          <Text style={styles.selectFriends}>
                            Enter Location
                          </Text>
                        )}
                      </View>
                      <Search fill={themeStyle.COLOR_BLACK} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View style={[styles.headingContainer, {marginTop: 16}]}>
                  <Text style={styles.headingText}>Tag Friends</Text>
                  <TouchableOpacity
                    style={styles.inputConttainer1}
                    onPress={() => {
                      this.setState({professionMatchModal: true});
                    }}>
                    <View style={{flex: 1}}>
                      {friends.length > 0 ? (
                        <Text style={styles.selectFriends}>
                          {friends[friends.length - 1]?.label}
                        </Text>
                      ) : (
                        <Text style={styles.selectFriends}>Select friends</Text>
                      )}
                    </View>
                    <Search fill={themeStyle.COLOR_BLACK} />
                  </TouchableOpacity>
                  <CustomDropDownModal
                    tagFriends
                    loading={searchingData}
                    isVisible={this.state.professionMatchModal}
                    onClose={() => this.setState({professionMatchModal: false})}
                    data={tempStoryData}
                    OnReset={() => this.setState({tempStoryData: data})}
                    onSearch={text => this.seacrhMatchProfesstionFunction(text)}
                    onPress={item => {
                      try {
                        let array = [...friends];
                        if (array.length == 0) {
                          array.push(item);
                        } else {
                          array.map((friendObj, index) => {
                            if (array[index].id != item.id) {
                              array.push(item);
                            }
                          });
                        }
                        const uniqueArray = this.getUniqueListBy(array, 'id');
                        this.setState({friends: uniqueArray});
                      } catch (error) {
                        // console.log(error);
                      }
                      this.setState({
                        professionMatchModal: false,
                        tempStoryData: data,
                      });
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <ScrollView horizontal={true}>
                    {friends.map((item, index) =>
                      this.renderChips(item, index),
                    )}
                  </ScrollView>
                </View>

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
                </View>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              <Button
                blue
                loading={uploading}
                title={'Upload'}
                onPress={() =>
                  this.setState({submit: true, uploading: true}, () => {
                    createStory
                      ? this.handleUploadNewStory()
                      : this.handleUploadNewPost();
                  })
                }
              />
            </View>
            <UploadingModal visible={uploading} />
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
            <PostModal
              isVisible={postModal}
              bottomAds={this.props.user?.bottomAds}
              topAds={this.props.user?.topAds}
              onClose={() => {
                this.setState({postModal: false});
                this.props.navigation.navigate(route.HOMESCREEN);
              }}
              title={'Your content is posted'}
              gifFile={require('../../../../assets/gifs/post-saved.gif')}
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
    socialActions: bindActionCreators(postActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialPost1);
