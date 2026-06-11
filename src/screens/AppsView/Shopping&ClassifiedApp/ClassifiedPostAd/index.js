import React, {Component} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-view';
import {
  Button,
  Container,
  DeleteModal,
  Icon,
  Input,
  SearchLocationModal,
} from '../../../../components';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import AlertDone from '../../../../assets/svg/alert-done.svg';
import {Input as IT} from 'react-native-elements';

import Barter from '../../../../assets/svg/barter.svg';
import {route} from '../../../../lib/utils/constants';
import SearchMenu from '../ClassifiedMenu';
import {ClassifiedServices} from '../../../../services';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {PostedModal} from '../../../../components/PostedModal';
import themeStyle1 from '../../../../assets/styles/common.style';
import CareerSelectModal from '../../../../components/Modals/CareerSelectModal';

const currencyList = [
  {
    name: 'USD',
    symbol: '$',
  },
  {
    name: 'AUD',
    symbol: '$',
  },
  {
    name: 'CAD',
    symbol: '$',
  },
  {
    name: 'EUR',
    symbol: '€',
  },
  {
    name: 'GBP',
    symbol: '£',
  },
  {
    name: 'INR',
    symbol: '₹',
  },
  {
    name: 'PKR',
    symbol: 'Rs',
  },
  {
    name: 'AED',
    symbol: 'د.إ',
  },
  {
    name: 'SAR',
    symbol: 'SAR',
  },
  {
    name: 'CNY',
    symbol: '¥',
  },
];
class ClassifiedPostAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      job: '',
      name: '',
      adTitle: '',
      price: '',
      desc: '',
      location: '',
      latitude: '',
      longitude: '',
      new1: true,
      used: false,
      barter: false,
      experience: true,
      expanded: false,
      visible: false,
      locationModal: false,
      images: [],
      images_1: [],
      pic: [],
      barterimages: [],
      barterimages_1: [],
      barterpic: [],
      imageIndex: 0,
      barterImageIndex: 0,
      isImageViewVisible: false,
      uploading: false,
      alertModal: false,
      msgToDisplay: '',
      userLat: this.props?.user.userData.location
        ? this.props.user.userData.location.lat
        : 0,
      userLong: this.props?.user.userData.location
        ? this.props.user.userData.location.long
        : 0,
      lang: true,
      med: false,
      isBarterImageViewVisible: false,
      alertDoneModal: false,
      submit: false,
      openCurrencyPicker: false,
      selectedCurrency: {
        name: 'USD',
        symbol: '$',
      },
    };
  }

  onOpenGallery = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: true,
        compressImageQuality: 0.1,
      }).then(photos => {
        if (photos.length < 6) {
          var photos_1 = [];
          photos.map(photo => {
            photos_1.push({
              data: photo.data,
              type: 'image',
              path: photo.path,
            });
          });
          setTimeout(() => {
            const images = photos.map(img => ({
              uri: img.path,
            }));
            const images_1 = photos.map(img => ({
              source: {uri: img.path},
              width: 806,
            }));

            this.setState({
              images: this.state.images.concat(images),
              images_1: this.state.images_1.concat(images_1),
              pic: this.state.pic.concat(photos_1),
            });
          }, 300);
        } else {
          // alert("Can only pick five images")
          this.setState({
            msgToDisplay: 'Can only pick five images',
            alertModal: true,
          });
        }
      });
    } catch (ex) {}
  };

  onOpenGalleryBarter = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: true,
        compressImageQuality: 0.1,
      }).then(photos => {
        if (photos.length < 6) {
          var photos_1 = [];
          photos.map(photo => {
            photos_1.push({
              data: photo.data,
              type: 'image',
              path: photo.path,
            });
          });
          setTimeout(() => {
            const images = photos.map(img => ({
              uri: img.path,
            }));
            const images_1 = photos.map(img => ({
              source: {uri: img.path},
              width: 806,
            }));

            this.setState({
              barterimages: this.state.barterimages.concat(images),
              barterimages_1: this.state.barterimages_1.concat(images_1),
              barterpic: this.state.pic.concat(photos_1),
            });
          }, 300);
        } else {
          this.setState({
            msgToDisplay: 'Can only pick five images',
            alertModal: true,
          });
        }
      });
    } catch (ex) {}
  };

  renderImages = (images, barter) => {
    return images.map((image, index) => {
      if (index < 5 || images.length <= 6) {
        return (
          <View style={{marginVertical: 8}}>
            <ImageBackground
              source={image}
              style={styles.postImage}
              resizeMode="contain"
            >
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 0.3,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Icon.Entypo
                    onPress={() => {
                      if (barter) {
                        this.setState({
                          barterimages: this.state.barterimages.filter(
                            obj => obj.uri != image.uri,
                          ),
                          barterpic: this.state.barterpic.filter(
                            obj => obj.uri != image.uri,
                          ),
                        });
                      } else {
                        this.setState({
                          images: this.state.images.filter(
                            obj => obj.uri != image.uri,
                          ),
                          pic: this.state.pic.filter(
                            obj => obj.uri != image.uri,
                          ),
                        });
                      }
                    }}
                    name="circle-with-cross"
                    size={20}
                    color={'orange'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (barter) {
                      this.setState({
                        barterImageIndex: index,
                        isBarterImageViewVisible: true,
                      });
                    } else {
                      this.setState({
                        imageIndex: index,
                        isImageViewVisible: true,
                      });
                    }
                  }}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                ></TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        );
      } else if (index == 5) {
        return (
          <View>
            <ImageBackground
              source={image}
              style={styles.postImageLast}
              resizeMode="contain"
            >
              <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
                {' '}
                +{images.length - 5}
              </Text>
            </ImageBackground>
          </View>
        );
      } else {
        return null;
      }
    });
  };

  handlePostAd = () => {
    const {
      location,
      barter,
      barterpic,
      new1,
      adTitle,
      desc,
      price,
      latitude,
      longitude,
      pic,
      name,
      selectedCurrency,
    } = this.state;

    if (
      location.length > 0 &&
      name.length > 0 &&
      desc.length > 0 &&
      price.length > 0 &&
      pic.length > 0
    ) {
      this.setState({uploading: true});

      let formData = new FormData();
      formData.append('location', location);
      formData.append(
        'product_category_id',
        this.state.lang
          ? '631f2853618442120d27052e'
          : '631f2873618442120d2705a0',
      );
      formData.append('name', name);
      formData.append('condition', new1 ? 'New' : 'Used');
      formData.append('title', adTitle);
      formData.append('price', parseInt(price));
      formData.append('description', desc);
      formData.append('lat', latitude);
      formData.append('long', longitude);
      formData.append('is_barter', barter);
      formData.append('currency_symbol', selectedCurrency.symbol);
      formData.append('currency_name', selectedCurrency.name);

      pic.map((item, index) => {
        formData.append(`image`, {
          uri: item.path,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
      });
      if (barter) {
        barterpic.map((item, index) => {
          formData.append(`barter_image`, {
            uri: item.path,
            name: `${new Date().getTime().toString()}.jpg`,
            filename: new Date().getTime().toString() + '.jpg',
            type: 'image/jpg',
          });
        });
      }

      ClassifiedServices.createProduct(formData, this.props.user.userData.token)
        .then(res => {
          if (res.data.code == 200) {
            this.setState({uploading: false});
            setTimeout(() => {
              this.setState({alertDoneModal: true});
            }, 1000);
            setTimeout(() => {
              this.setState({alertDoneModal: false});
              this.props.navigation.navigate(route.CLASSIFIEDPRODUCTDETAIL, {
                productId: res.data.data._id,
                userad: true,
              });
            }, 3000);
          }
        })
        .catch(err => {
          this.setState({uploading: false});
        });
    } else {
      this.setState({
        msgToDisplay: 'Please fill all fields',
        alertModal: true,
        submit: true,
      });
    }
  };

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

  render() {
    const {
      alertModal,
      msgToDisplay,
      name,
      images_1,
      images,
      price,
      adTitle,
      desc,
      location,
      imageIndex,
      locationModal,
      userLat,
      userLong,
      barterimages,
      barterimages_1,
      barterImageIndex,
      submit,
      openCurrencyPicker,
      selectedCurrency,
    } = this.state;
    return (
      <Container color={true}>
        <Modal isVisible={this.state.uploading}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            <ActivityIndicator color="#FF9966" size="small" />
          </View>
        </Modal>
        <View style={styles.container}>
          <View style={{flex: 0.8, marginHorizontal: '5%'}}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingTop: '5%', paddingBottom: '15%'}}
            >
              <View style={{marginTop: '2%'}}>
                <Text style={styles.headingText}>Category </Text>
                <View style={styles.rowContainer1}>
                  <TouchableOpacity
                    onPress={() => this.setState({med: false, lang: true})}
                    style={styles.row}
                  >
                    <View
                      style={
                        this.state.lang ? styles.selectedbox1 : styles.box1
                      }
                    ></View>
                    <Text
                      style={
                        this.state.lang
                          ? styles.selectedOption1
                          : styles.option1
                      }
                    >
                      General
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({med: true, lang: false, subj: ''})
                    }
                    style={[styles.row, {marginLeft: '15%'}]}
                  >
                    <View
                      style={this.state.med ? styles.selectedbox1 : styles.box1}
                    ></View>
                    <Text
                      style={
                        this.state.med ? styles.selectedOption1 : styles.option1
                      }
                    >
                      Medical
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{...styles.desc, paddingTop: '5%'}}>
                Product Name
              </Text>
              <View style={styles.inputConttainer}>
                <Input
                  classified
                  value={name}
                  placeholder="Write something"
                  placeholderTextColor={themeStyle.PRIMARY_TINT_COLOR}
                  onChangeText={job => this.setState({name: job})}
                />
              </View>
              {submit && !name.length ? (
                <Text
                  style={[
                    themeStyle1.errorText,
                    {marginBottom: 10, marginTop: '-8%'},
                  ]}
                >
                  {'Please fill this field'}
                </Text>
              ) : null}
              {images.length > 0 ? (
                <View style={styles.postImagesContainer}>
                  {this.renderImages(images ? images : [], false)}
                  <ImageView
                    images={images_1}
                    imageIndex={imageIndex}
                    isVisible={this.state.isImageViewVisible}
                    isSwipeCloseEnabled={true}
                    onClose={() => {
                      this.setState({isImageViewVisible: false});
                    }}
                    renderFooter={currentImage => (
                      <View>
                        <Text>My footer</Text>
                      </View>
                    )}
                  />
                </View>
              ) : (
                <>
                  <Text style={{...styles.desc, paddingBottom: '5%'}}>
                    Add images
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onOpenGallery()}
                    style={styles.addMediaStyle}
                  >
                    <Text style={styles.option}>Add image</Text>
                  </TouchableOpacity>
                  {submit && !images.length ? (
                    <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                      {'Please fill this field'}
                    </Text>
                  ) : null}
                </>
              )}
              <Text style={{...styles.desc, paddingTop: '5%'}}>
                Describe your product
              </Text>
              <View style={[styles.inputConttainer]}>
                <Input
                  classified
                  message
                  value={desc}
                  placeholder="Write Something"
                  onChangeText={job => this.setState({desc: job})}
                  placeholderTextColor={themeStyle.PRIMARY_TINT_COLOR}
                />
                {submit && !desc.length ? (
                  <Text
                    style={[
                      themeStyle1.errorText,
                      {marginBottom: 10, marginTop: '-8%'},
                    ]}
                  >
                    {'Please fill this field'}
                  </Text>
                ) : null}
              </View>

              <Text style={styles.desc}>Price</Text>
              <View style={[styles.inputConttainer, {flexDirection: 'row'}]}>
                <IT
                  containerStyle={{...styles.containerStyle}}
                  placeholder="Enter your price"
                  value={price}
                  keyboardType="number-pad"
                  inputContainerStyle={{...styles.inputContainerStylePrice}}
                  inputStyle={styles.inputStylePrice}
                  onChangeText={comment => {
                    this.setState({price: comment});
                  }}
                  onSubmitEditing={() =>
                    this.setState({openCurrencyPicker: true})
                  }
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => this.setState({openCurrencyPicker: true})}
                    >
                      <Text style={styles.desc2}>
                        {selectedCurrency.name} {selectedCurrency.symbol}
                      </Text>
                    </TouchableOpacity>
                  }
                  rightIconContainerStyle={{
                    marginRight: '2.5%',
                  }}
                />
              </View>
              {submit && !price.length ? (
                <Text
                  style={[
                    themeStyle1.errorText,
                    {marginBottom: 10, marginTop: '-8%'},
                  ]}
                >
                  {'Please fill this field'}
                </Text>
              ) : null}

              <View style={{marginTop: '2%'}}>
                <Text style={styles.headingText}>Condition </Text>
                <View style={styles.rowContainer1}>
                  <TouchableOpacity
                    onPress={() => this.setState({used: false, new1: true})}
                    style={styles.row}
                  >
                    <View
                      style={
                        this.state.new1 ? styles.selectedbox1 : styles.box1
                      }
                    ></View>
                    <Text
                      style={
                        this.state.new1
                          ? styles.selectedOption1
                          : styles.option1
                      }
                    >
                      New
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({used: true, new1: false, subj: ''})
                    }
                    style={[styles.row, {marginLeft: '15%'}]}
                  >
                    <View
                      style={
                        this.state.used ? styles.selectedbox1 : styles.box1
                      }
                    ></View>
                    <Text
                      style={
                        this.state.used
                          ? styles.selectedOption1
                          : styles.option1
                      }
                    >
                      Used
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 40,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.desc}>Barter</Text>
                  <View style={{marginLeft: 5}}>
                    <Barter />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({barter: !this.state.barter})}
                >
                  <View
                    style={
                      this.state.barter ? [styles.selectedbox1] : styles.box1
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputConttainer}>
                <Input
                  classified
                  disabled={!this.state.barter}
                  value={adTitle}
                  placeholder="Exchange possible with"
                  placeholderTextColor={themeStyle.PRIMARY_TINT_COLOR}
                  onChangeText={job => this.setState({adTitle: job})}
                />
              </View>
              {this.state.barter && barterimages?.length > 0 ? (
                <View style={styles.postImagesContainer}>
                  {this.renderImages(barterimages ? barterimages : [], true)}
                  <ImageView
                    images={barterimages_1}
                    imageIndex={barterImageIndex}
                    isVisible={this.state.isBarterImageViewVisible}
                    isSwipeCloseEnabled={true}
                    onClose={() => {
                      this.setState({isBarterImageViewVisible: false});
                    }}
                    renderFooter={currentImage => (
                      <View>
                        <Text>My footer</Text>
                      </View>
                    )}
                  />
                </View>
              ) : (
                <>
                  {this.state.barter && (
                    <TouchableOpacity
                      onPress={() => this.onOpenGalleryBarter()}
                      style={styles.addMediaStyle}
                    >
                      <Text style={styles.option}>Add image</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  this.setState({locationModal: true});
                }}
              >
                <Text style={styles.desc}>Select Location</Text>
                <TouchableOpacity
                  onPress={() => this.setState({locationModal: true})}
                >
                  <View style={styles.inputConttainer}>
                    <Input
                      classified
                      disabled
                      value={location}
                      placeholder="Select your location"
                      placeholderTextColor={themeStyle.PRIMARY_TINT_COLOR}
                    />
                  </View>
                  <View></View>
                </TouchableOpacity>
              </TouchableOpacity>
              {submit && !location.length ? (
                <Text
                  style={[
                    themeStyle1.errorText,
                    {marginBottom: 10, marginTop: '-8%'},
                  ]}
                >
                  {'Please fill this field'}
                </Text>
              ) : null}
            </KeyboardAwareScrollView>
          </View>
          <View style={styles.btnContainer}>
            <Button
              customColor={themeStyle.CLASSIFIED_HOME}
              titleColor={themeStyle.COLOR_BLACK}
              title={'Post ad'}
              onPress={() => this.handlePostAd()}
            />
          </View>
        </View>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
        <SearchMenu
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
        />
        <SearchLocationModal
          onClose={() => this.setState({locationModal: false})}
          visible={locationModal}
          onPress={(data, details) => this.goMap(data, details)}
          lati={userLat}
          longi={userLong}
        />
        <PostedModal
          data={{icon: AlertDone, text: 'Ad up! Get ready for the offers'}}
          visible={this.state.alertDoneModal}
        />
        <CareerSelectModal
          removeSearch
          title="Select Currency"
          selectedData={selectedCurrency}
          loading={false}
          isVisible={openCurrencyPicker}
          onClose={() => this.setState({openCurrencyPicker: false})}
          data={currencyList}
          onPress={data => {
            this.setState({
              selectedCurrency: data,
              openCurrencyPicker: false,
            });
          }}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
export default connect(mapStateToProps)(ClassifiedPostAd);
