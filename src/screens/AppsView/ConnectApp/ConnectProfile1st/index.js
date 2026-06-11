import React, {Component} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {Button, Container, Input, Icon} from '../../../../components';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import CommonStyle from '../../../../assets/styles/common.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import commonStyle from '../../../../assets/styles/common.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import {bindActionCreators} from 'redux';
import {connectActions} from '../../../../redux/actions/connect';
import {connect} from 'react-redux';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.PINK,
  iconColor: themeStyle.COLOR_WHITE,
};
class ConnectProfile1ST extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      image1: '',
      submit: false,
      uploadImages: [],
      photoList: [
        {id: 1, image: ''},
        {id: 2, image: ''},
        {id: 3, image: ''},
      ],
      selfDesc: '',
      photos: [
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
          name: 'Non Binary',
          selected: false,
        },
      ],
      religionList: [
        {
          name: 'Islam',
          selected: true,
        },
        {
          name: 'Christianity',
          selected: false,
        },
        {
          name: 'Hinduism',
          selected: false,
        },
        {
          name: 'Atheism',
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
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
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
        style={{marginRight: 10}}>
        <View
          style={
            item.selected ? styles.selectedOption : styles.unSelectedOption
          }>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
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
        style={{marginRight: 10}}>
        <View
          style={
            item.selected ? styles.selectedOption : styles.unSelectedOption
          }>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
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
        let photosArray = [...this.state.photos];
        photosArray[index] = {
          ...photosArray[index],
          image: source.assets[0].uri,
        };
        let images = [];
        photosArray.map(item => {
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
      //   photosArray[index] = {...photosArray[index], image: source.path};
      // photosArray[index] = {image: source.path};
      photosArray[index] = {
        ...photosArray[index],
        image: source.path,
      };

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
    //   photosArray[index] = {...photosArray[index], image: source.path};
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

  renderItem = (item, drag, isActive, index) => {
    return (
      <TouchableOpacity
        style={{marginHorizontal: 10}}
        //onPress={ () => this.ChooseFromLibrary(index) }
        //  onLongPress={() => drag()}
        disabled={true}>
        <Avatar
          onPress={() => this.ChooseFromLibrary(index)}
          source={{uri: item.image ? item?.image : null}}
          containerStyle={{borderWidth: 2, borderColor: themeStyle.PINK}}
          rounded
          size={100}>
          <Avatar.Accessory
            type="entypo"
            name={item.image ? 'edit' : 'plus'}
            color={themeStyle.COLOR_WHITE}
            //onPress={ () => { item.image? this.ChooseFromLibrary(index): this.removeMedia(index)}}

            size={15}
            style={{
              backgroundColor: themeStyle.PINK,
              borderRadius: 25,
              height: 20,
              width: 20,
              right: 1,
              bottom: 10,
            }}></Avatar.Accessory>
        </Avatar>
      </TouchableOpacity>
    );
  };

  handleContinue = () => {
    const {religionList, photos, genderList, selfDesc, uploadImages} =
      this.state;
    let religion = [];
    religionList.map(item => {
      if (item.selected) {
        religion.push(item.name);
      }
    });
    let images = [];
    photos.map(item => {
      if (item.image) {
        images.push(item.image);
      }
    });
    let gender;
    genderList.map(item => {
      if (item.selected) {
        gender = item.name;
      }
    });
    if (uploadImages.length > 0 && religion.length && gender.length) {
      this.props.navigation.navigate(route.CONNECTPROFILE2ND, {
        images: images,
        religion,
        gender,
        about: selfDesc,
        mode: this.props?.route?.params?.mode,
        prev_screen: this.props.route?.params?.prev_screen,
      });
    } else {
      this.setState({uploadImages: uploadImages, submit: true});
    }
  };

  render() {
    const {
      selfDesc,
      image,
      image1,
      submit,
      religionList,
      genderList,
      photos,
      uploadImages,
    } = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '30%'}}>
            <View>
              <View style={styles.margin}>
                <Text style={styles.headingText}>
                  Build your{' '}
                  <Text
                    style={{
                      ...styles.headingText,
                      color: themeStyle.PINK,
                      fontFamily: themeStyle.FONT_BOLD,
                    }}>
                    profile
                  </Text>
                </Text>
              </View>
              {/* <View style={styles.rowContainer}>
                <Text style={styles.heading}>Add photos</Text>
               <Text style={styles.desc}>Hold and drag to change order</Text>
              </View> */}
              <DraggableFlatList
                horizontal={true}
                contentContainerStyle={{
                  marginHorizontal: '3%',
                  marginTop: '5%',
                }}
                data={photos}
                // data={[1, 2, 3]}
                ItemSeparatorComponent={HorizontalSpacer}
                onDragEnd={({data}) => {
                  this.setState({photos: data});
                }}
                keyExtractor={item => item.id}
                renderItem={({item, drag, isActive, index}) =>
                  this.renderItem(item, drag, isActive, index)
                }
              />
              {/* <View style={{ alignItems: "center", marginVertical: "2.5%" }}>
                                < Avatar
                                    source={{ uri: photos ? photos : "https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png" }}
                                    rounded
                                    size={100} >
                                    <Avatar.Accessory type="feather" name="plus" color="#FF6B6B" onPress={this.chooseFile} size={25}
                                        style={{ backgroundColor: '#e9e9e9', borderRadius: 5, height: 30, width: 30, left: 0 }} >
                                    </Avatar.Accessory>
                                </Avatar>
                            </View> */}
              <View style={styles.tagline}>
                <Text style={styles.tagLineText}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: themeStyle.PINK,
                      fontFamily: themeStyle.FONT_REGULAR,
                    }}>
                    Add photos{' '}
                  </Text>{' '}
                  (Hold and drag to change order){' '}
                </Text>
                {submit && !uploadImages.length ? (
                  <Text style={commonStyle.errorText}>
                    Please add at least one photo.
                  </Text>
                ) : null}
              </View>
              <View style={styles.margin}>
                <Text style={styles.heading}>Bio</Text>
                <View style={styles.inputConttainer}>
                  <Input
                    connect
                    multiline={true}
                    // profile
                    value={selfDesc}
                    placeholder='"Describe who you are; your dreams, passion, hobbies, anything that you dislike. Let people see through you!"'
                    onChangeText={job => this.setState({selfDesc: job})}
                  />
                </View>
              </View>
              <View style={styles.margin}>
                <Text style={styles.heading}>Gender Preference</Text>
              </View>
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
              <View style={styles.margin}>
                <Text style={styles.heading}>Religion</Text>
              </View>
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
                connect
                titleColor={'#000'}
                title={'Next'}
                onPress={() => this.handleContinue()}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    connectProfessions: state.connectReducer?.connectProfessions || {},
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    connectActions: bindActionCreators(connectActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectProfile1ST);
