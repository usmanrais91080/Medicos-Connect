import React, {Component} from 'react';

import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  Container,
  DeleteModal,
  Input,
  Loader,
} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import {connectActions} from '../../../../redux/actions/connect';
import {ConnectModuleServices} from '../../../../services';
import styles from './style';

class CareerProfile2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      image1: '',
      loading: true,
      alertModal: false,
      msgToDisplay: 'Network Error',
      submit: false,
      uploadImages: [],
      judgementList: [],
      selfDesc: '',
      userProfile: null,
      photos: [
        {id: 1, image: ''},
        {id: 2, image: ''},
        {id: 3, image: ''},
      ],
      photoList: [
        {id: 1, image: ''},
        {id: 2, image: ''},
        {id: 3, image: ''},
      ],
      genderList: [
        {
          name: 'Male',
          selected: true,
        },
        {
          name: 'Female',
          selected: false,
        },
        {
          name: 'Any',
          selected: false,
        },
      ],
      religionList: [
        {
          name: 'Islam',
          selected: true,
        },
        {
          name: 'Christian',
          selected: false,
        },
        {
          name: 'Hindu',
          selected: false,
        },
        {
          name: 'Atheist',
          selected: false,
        },
        {
          name: 'Buddhism',
          selected: false,
        },
        {
          name: 'Other',
          selected: false,
        },
      ],
    };
  }

  componentDidMount = () => {
    ConnectModuleServices.getConnectProfile(this.props.user.userData.token)
      .then(res => {
        let tempImages = [];
        for (let i = 0; i < 3; i++) {
          if (res?.data?.data[`connect_image${i}`] != null)
            tempImages.push(res?.data?.data[`connect_image${i}`]);
          else {
            tempImages.push('');
          }
        }
        let religionArr = [...this.state.religionList];
        let genderArr = [...this.state.genderList];
        religionArr.map((item, index) => {
          if (res.data?.data?.religion == item.name) {
            religionArr[index] = {...religionArr[index], selected: true};
          } else {
            religionArr[index] = {...religionArr[index], selected: false};
          }
        });
        genderArr.map((item, index) => {
          if (res.data?.data?.gender_preference == item.name) {
            genderArr[index] = {...genderArr[index], selected: true};
          } else {
            genderArr[index] = {...genderArr[index], selected: false};
          }
        });
        let array = this.state?.photoList;
        tempImages.map((val, index) => {
          array[index].image = val;
        });
        this.setState(
          {
            selfDesc: res.data?.data?.about,
            religionList: religionArr,
            genderList: genderArr,
            photos: tempImages,
            photoList: array,
            userProfile: res.data?.data,
            judgementList: res.data?.data?.personality_judgements,
          },
          () => this.setState({loading: false}),
        );
      })
      .catch(err => {});
  };

  renderGenderItems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let array = [...this.state.genderList];
          array.forEach((e, i) => {
            array[i] = {...array[i], selected: false};
          });
          array[index] = {...array[index], selected: true};
          this.setState({genderList: array});
        }}
        key={index.toString()}
        style={{marginRight: 10}}
      >
        <View
          style={
            item.selected ? styles.selectedOption : styles.unSelectedOption
          }
        >
          <Text style={[styles.whiteText, {color: themeStyle.COLOR_BLACK}]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderReligionItems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let array = [...this.state.religionList];
          array.forEach((e, i) => {
            array[i] = {...array[i], selected: false};
          });
          array[index] = {...array[index], selected: true};
          this.setState({religionList: array});
        }}
        key={index.toString()}
        style={{marginRight: 10}}
      >
        <View
          style={
            item.selected ? styles.selectedOption : styles.unSelectedOption
          }
        >
          <Text style={[styles.whiteText, {color: themeStyle.COLOR_BLACK}]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  chooseFile = index => {
    var options = {
      quality: 0.5,
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
        let photosArray = [...this.state.photoList];
        photosArray[index] = {image: source.assets[0].uri, updated: true};
        let images = [];
        this.setState({
          uploadImages: images,
          photos: photosArray,
          photoList: photosArray,
        });
      }
    });
  };
  ChooseFromLibrary = index => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      let source = image;
      let photosArray = [...this.state.photoList];
      photosArray[index] = {image: source.path, updated: true};

      let images = [];
      photosArray.map(item => {
        if (item.image) {
          images.push(item.image);
        }
      });
      this.setState({
        uploadImages: images,
        photos: photosArray,
        photoList: photosArray,
      });
    });
  };
  removeMedia = index => {
    let photosArray = [...this.state.photoList];
    photosArray[index] = {image: '', updated: true};

    let images = [];
    photosArray.map(item => {
      if (item.image || item.image != '') {
        images.push(item.image);
      }
    });
    this.setState({
      uploadImages: images,
      photos: photosArray,
      photoList: photosArray,
    });
  };

  renderItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 10}}>
        <Avatar
          onPress={() => this.ChooseFromLibrary(index)}
          source={{uri: item.image ? item?.image : null}}
          containerStyle={{borderWidth: 2, borderColor: themeStyle.PINK}}
          rounded
          size={100}
        >
          <Avatar.Accessory
            type="entypo"
            name={item.image ? 'edit' : 'plus'}
            color={themeStyle.COLOR_WHITE}
            size={15}
            style={{
              backgroundColor: themeStyle.PINK,
              borderRadius: 25,
              height: 20,
              width: 20,
            }}
          ></Avatar.Accessory>
        </Avatar>
      </View>
    );

    // TODO: use that later after crash fix
    // renderItem = ({item, drag, isActive, index}) => {
    //   return (
    //     <TouchableOpacity style={{marginHorizontal: 10}} onLongPress={drag}>
    //       <Avatar
    //         onPress={() => this.ChooseFromLibrary(index)}
    //         source={{uri: item.image ? item?.image : null}}
    //         containerStyle={{borderWidth: 2, borderColor: themeStyle.PINK}}
    //         rounded
    //         size={100}
    //       >
    //         <Avatar.Accessory
    //           type="entypo"
    //           name={item.image ? 'edit' : 'plus'}
    //           color={themeStyle.COLOR_WHITE}
    //           //onPress={ () => { item.image? this.ChooseFromLibrary(index): this.removeMedia(index)}}

    //           size={15}
    //           style={{
    //             backgroundColor: themeStyle.PINK,
    //             borderRadius: 25,
    //             height: 20,
    //             width: 20,
    //             // right: 1,
    //             // bottom: 10,
    //           }}
    //         ></Avatar.Accessory>
    //       </Avatar>
    //     </TouchableOpacity>
    //   );
  };

  handleContinue = () => {
    let religion = [];
    this.state.religionList.map(item => {
      if (item.selected) {
        religion.push(item.name);
      }
    });
    let images = [];
    let gender;
    this.state.genderList.map(item => {
      if (item.selected) {
        gender = item.name;
      }
    });
    if (this.state.photoList.length > 0 && religion.length && gender) {
      this.props.navigation.navigate(route.CONNECTEDITPROFILE2ND, {
        userProfile: this.state.userProfile,
        images: images,
        religion,
        gender,
        about: this.state.selfDesc,
        judgementList: this.state.judgementList,
        uploadImages: this.state.photoList,
      });
    } else {
      this.setState({submit: true});
    }
  };

  render() {
    const {
      alertModal,
      msgToDisplay,
      loading,
      selfDesc,
      religionList,
      genderList,
      photoList,
    } = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PINK} />
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '30%'}}
            >
              <View>
                <View style={styles.margin}>
                  <Text style={styles.headingText}>
                    Build your{' '}
                    <Text style={{color: themeStyle.PINK, fontWeight: 'bold'}}>
                      profile
                    </Text>
                  </Text>
                </View>
                {/* TODO: use that later after crash fix*/}
                {/* <DraggableFlatList
                  horizontal={true}
                  contentContainerStyle={{
                    marginHorizontal: '3%',
                    marginTop: '5%',
                  }}
                  data={photoList}
                  // data={[1, 2, 3]}
                  ItemSeparatorComponent={HorizontalSpacer}
                  onDragEnd={({data}) => {
                    this.setState({photoList: data});
                  }}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this.renderItem}
                /> */}
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    marginHorizontal: '3%',
                    marginTop: '5%',
                  }}
                  data={photoList}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this.renderItem}
                />
                <View style={styles.rowContainer}>
                  <Text style={[styles.heading, {color: themeStyle.PINK}]}>
                    Add photos
                  </Text>
                  {/* TODO: use that later after crash fix*/}
                  {/* <Text style={styles.desc}>
                    {'(hold and drag to change order)'}
                  </Text> */}
                </View>
                <View style={styles.margin}>
                  <Text style={styles.desc1}>Bio</Text>
                  <View style={styles.inputConttainer}>
                    <Input
                      connect
                      multiline={true}
                      value={selfDesc}
                      placeholder="Describe who you are; your dreams, passion, hobbies, anything that you dislike. Let people see through you!"
                      onChangeText={job => this.setState({selfDesc: job})}
                      placeholderTextColor={themeStyle.LIGHT_GRAY}
                    />
                  </View>
                </View>
                <Text style={[styles.heading, {marginHorizontal: '3%'}]}>
                  Gender Preference
                </Text>
                <FlatList
                  data={genderList}
                  numColumns={3}
                  renderItem={({item, index}) =>
                    this.renderGenderItems(item, index)
                  }
                  contentContainerStyle={styles.contentContainer}
                  keyExtractor={item => item.name}
                  ItemSeparatorComponent={VerticalSpacer}
                />
                <Text
                  style={[
                    styles.heading,
                    {marginTop: '1%', marginHorizontal: '3%'},
                  ]}
                >
                  Religion
                </Text>
                <FlatList
                  data={religionList}
                  numColumns={3}
                  renderItem={({item, index}) =>
                    this.renderReligionItems(item, index)
                  }
                  contentContainerStyle={styles.contentContainer}
                  keyExtractor={item => item.name}
                  ItemSeparatorComponent={VerticalSpacer}
                />
              </View>
              <View style={styles.rowContainer2}>
                <View style={styles.darkDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.lightDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.lightDash}></View>
                <View style={{width: 10}}></View>
                <View style={styles.lightDash}></View>
              </View>
              <View style={styles.btnContainer}>
                <Button
                  customColor={themeStyle.SPANISH_PINK}
                  title={'Continue'}
                  titleColor={themeStyle.COLOR_BLACK}
                  onPress={() => this.handleContinue()}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
        </View>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, this.props.navigation.goBack());
          }}
          text={msgToDisplay}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    connectInterests: state.connectReducer || {},
    user: state.authReducer || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    connectActions: bindActionCreators(connectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerProfile2nd);
