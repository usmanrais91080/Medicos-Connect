import React, {Component} from 'react';

import {Text, TouchableOpacity, View, ScrollView, Alert} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Button,
  Container,
  HeaderLeft,
  Icon,
  Input,
  UploadingModal,
} from '../../../../components';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {HorizontalSpacer, isPhoneValid} from '../../../../lib/utils/global';
import EducationSettingsFunction from './education.settings.function';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import commonStyle from '../../../../assets/styles/common.style';
import {launchImageLibrary} from 'react-native-image-picker';
import {HeaderRight} from './education.setting.component';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
class EducationSetting2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineStatus: true,
      uploading: false,
      classInvites: true,
      connectProfile: true,
      feedback: true,
      shareQr: true,
      notification: true,
      submit: false,
      photos: [
        {id: 1, image: ''},
        {id: 2, image: ''},
      ],
      uploadImages: [],
      username: '',
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => this.setState({visible: true})} />
      ),
      headerLeft: () => <HeaderLeft color navigation={this.props.navigation} />,
    });
  };

  chooseFile = index => {
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
        console.log(source.assets[0].uri);
        let photosArray = [...this.state.photos];
        photosArray[index] = {
          ...photosArray[index],
          image: source.assets[0].uri,
        };
        let images = [];
        photosArray.map(item => {
          console.log(item);
          if (item.image) {
            images.push(item.image);
          }
        });
        this.setState({
          uploadImages: images,
          photos: photosArray,
        });
      }
    });
  };

  renderItem = (item, drag, isActive, index) => {
    return (
      <>
        {item.image ? (
          <>
            <TouchableOpacity
              onPress={() => {
                let array = [...this.state.photos];
                array.map((_, i) => {
                  if (i == index) {
                    array[index] = {...array[index], image: ''};
                    this.setState({
                      uploadImages: this.state.uploadImages.filter(
                        (item, ind) => {
                          item.image != _;
                        },
                      ),
                    });
                  }
                });
                this.setState({photos: array});
              }}
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
            <Icon.Entypo name="plus" size={30} color={'#0ABDE3'} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  handleContinue = () => {
    const {connectProfile, shareQr, submit} = this.state;
    const {
      username,
      uploadImages,
      classInvites,
      onlineStatus,
      feedback,
      notification,
      mode,
    } = this.props.route.params.data;
    if (uploadImages.length && username && submit) {
      this.setState({uploading: true});
      let formData = new FormData();
      formData.append('username', username);
      formData.append('mode', mode);
      formData.append('online_status', onlineStatus);
      formData.append('allow_notifications', notification);
      // formData.append('connect_socialprofile', connectProfile)
      formData.append('allow_qr_code_sharing', shareQr);
      formData.append('class_invities', classInvites);
      if (uploadImages.includes('file://')) {
        formData.append(`image`, {
          uri: uploadImages,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      } else {
        formData.append(`image`, uploadImages);
      }
      EducationSettingsFunction.setUserEducationProfileSettings(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          this.setState({uploading: false});
          alert(
            'Profile Creation!!', // This is a title
            'Education Profile Settings Updated Successfully', // This is a alert message
            {
              textConfirm: 'Ok', // Label of button confirm
              textCancel: 'Cancel', // Label of button cancel
              onConfirm: () => {
                this.props.authActions.getUserProfile(
                  {token: this.props.user.userData.token},
                  '',
                  '',
                );
                if (this.props.route.params.prev_screen == route.HOME) {
                  this.props.navigation.replace(route.MAIN, {
                    screen: route.HOME,
                  });
                } else {
                  this.props.navigation.replace(route.MAIN, {
                    screen: route.PROFILE,
                  });
                }
              }, // Call your confirm function
              onCancel: () => {
                this.props.authActions.getUserProfile(
                  {token: this.props.user.userData.token},
                  '',
                  '',
                );
                if (this.props.route.params.prev_screen == route.HOME) {
                  this.props.navigation.replace(route.MAIN, {
                    screen: route.HOME,
                  });
                } else {
                  this.props.navigation.replace(route.MAIN, {
                    screen: route.PROFILE,
                  });
                }
              }, // Call your cancel function
            },
          );
          // Alert.alert('Success', "Education Profile Settings Updated Successfully", [{
          //     text: "Cancel",
          //     onPress: () => {
          //         this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", "");
          //         if (this.props.route.params.prev_screen == route.HOME) {
          //             this.props.navigation.replace(route.MAIN, { screen: route.HOME })
          //         } else {
          //             this.props.navigation.replace(route.MAIN, { screen: route.PROFILE })
          //         }
          //     },
          //     style: "cancel"
          // },
          // { text: "OK", onPress: () =>  {
          //     this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", "");
          //     if (this.props.route.params.prev_screen == route.HOME) {
          //         this.props.navigation.replace(route.MAIN, { screen: route.HOME })
          //     } else {
          //         this.props.navigation.replace(route.MAIN, { screen: route.PROFILE })
          //     }
          // } }])
        })
        .catch(err => {
          this.setState({uploading: false});
          alert(
            'Error!!', // This is a title
            `${err.message}`, // This is a alert message
            {
              type: 'bottomsheet',
            },
          );
        });
    } else {
      this.setState({submit: true});
    }
  };

  render() {
    const {
      username,
      connectProfile,
      feedback,
      shareQr,
      notification,
      onlineStatus,
      commentAndRating,
      submit,
      uploadImages,
      photos,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
            <View style={{marginHorizontal: '5%'}}>
              {/* <View style={styles.rowContainer}>
                                <Text style={styles.grayText}>Conect Social profile</Text>
                                <ToggleSwitch
  animationSpeed={3}
                                    isOn={onlineStatus}
                                    onColor={'#38474F'}
                                    offColor={'#38474F'}
                                    label=""
                                    thumbOffStyle={{ backgroundColor: '#fff' }}
                                    thumbOnStyle={{ backgroundColor: '#99CC66' }}
                                    labelStyle={styles.labelStyle}
                                    size="medium"
                                    onToggle={isOn => this.setState({ onlineStatus: isOn })}
                                />
                            </View> */}
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>share Qr Code</Text>
                <ToggleSwitch
                  animationSpeed={3}
                  isOn={feedback}
                  onColor={'#38474F'}
                  offColor={'#38474F'}
                  label=""
                  thumbOffStyle={{backgroundColor: '#fff'}}
                  thumbOnStyle={{backgroundColor: '#99CC66'}}
                  labelStyle={styles.labelStyle}
                  size="medium"
                  onToggle={isOn => this.setState({feedback: isOn})}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.grayText}>Your Earnings </Text>
                <Text style={styles.parrotText}>Pkrs/-49000</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.rowContainer2}>
            <View style={styles.lightDash}></View>
            <View style={{width: 10}}></View>
            <View style={styles.darkDash}></View>
          </View>
          <Button
            parrot
            title={'Continue'}
            onPress={() =>
              this.setState({submit: true}, () => this.handleContinue())
            }
          />
        </View>

        <UploadingModal visible={this.state.uploading} />
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
)(EducationSetting2nd);
