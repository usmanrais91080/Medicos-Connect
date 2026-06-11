import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StatusBar} from 'react-native';
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
} from '../../../../components';
import {Input} from 'react-native-elements';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {SocialServices} from '../../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Link from '../../../../assets/svg/link-new.svg';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

class SocialPostEdit extends Component {
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
      data: [],
      tempStoryData: [],
      professionMatchModal: false,
      searchingData: true,
      data1: [],
      dropdownOpen: false,
      caption: this.props.route.params?.caption,
      location: '',
      latitude: '',
      longitude: '',
      postImage: '',
      uploading: false,
      postId: this.props.route.params.postId,
      userLat: this.props.user.userData.location
        ? this.props.user.userData.location.lat
        : 0,
      userLong: this.props.user.userData.location
        ? this.props.user.userData.location.long
        : 0,
      link: this.props.route.params?.link,
    };
  }

  componentDidMount() {
    this.getTagFriends();
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={themeStyle.COLOR_BLACK}
        />
      ),
    });
  }

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
          });
        });
        this.setState({
          data: array,
          tempStoryData: array,
          searchingData: false,
        });
      })
      .catch(err => {
        // console.log(err)
      });
  };

  handleUploadNewPost = () => {
    const {postId, caption} = this.state;
    if (caption.length) {
      let data = {
        id: postId,
        description: caption,
      };
      SocialServices.updatePost(data, this.props.user.userData.token)
        .then(response => {
          if (response.data.code == 200) {
            this.setState({uploading: false});
            this.props.navigation.goBack();
          }
        })
        .catch(err => {
          this.setState({uploading: false});
          // console.log(err);
        });
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
      submit,
      userLat,
      userLong,
      link,
    } = this.state;
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
                  barStyle="dark-content"
                  backgroundColor={themeStyle.YELLOW}
                />
                <View style={styles.headingContainer}>
                  <Text style={styles.headingText}>{'Caption'}</Text>
                  <View
                    style={{
                      marginTop: '1%',
                    }}>
                    <View style={styles.inputContainerStyle}>
                      <TextInput
                        placeholder="Write caption here..."
                        multiline={true}
                        value={caption}
                        style={styles.containerStyle}
                        onChangeText={e => this.setState({caption: e})}
                        placeholderTextColor={'#77777B'}
                        textAlignVertical="top"
                      />
                      {/* <View style={styles.linkContainer}>
                        <TextInput
                          value={link}
                          onChangeText={e => this.setState({link: e})}
                          placeholder="Link"
                          style={styles.linkInput}
                          placeholderTextColor={'#77777B'}
                        />
                        <Link />
                      </View> */}
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnContainer}>
              <Button
                customColor={themeStyle.BLUE}
                loading={uploading}
                title={'Update post'}
                onPress={() =>
                  this.setState({submit: true, uploading: true}, () => {
                    this.handleUploadNewPost();
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialPostEdit);
