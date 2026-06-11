import React, {Component} from 'react';
import {Button as BT} from 'react-native-elements';
import {Text, View, FlatList} from 'react-native';
import {Button, Container, DeleteModal, Loader} from '../../../../components';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH, route} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import commonStyle from '../../../../assets/styles/common.style';
import {CareerServices} from '../../../../services';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CareerProfileFunction from './career.profile.function';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

class CareerEditProfile1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadImages: '',
      photos: '',
      submit: false,
      alertModal: false,
      userProfile: {},
      loading: false,
      alertModal: false,
      msgToDisplay: '',
    };
  }
  componentDidMount = () => {
    this.getUserProfile();
  };

  getUserProfile = () => {
    CareerProfileFunction.getUserProfile(this.props.user.userData.token)
      .then(res => {
        this.setState(
          {
            userProfile: res,
            photos: res.image,
            uploadImages: res.image,
            certData: res.certificates,
            jobQual: res.qualifications,
          },
          () => this.getJobTypes(),
        );
      })
      .catch(err => null);
  };

  getJobTypes = () => {
    CareerServices.getJobTypes(this.props.user.userData.token)
      .then(res => {
        this.setState({
          userProfile: {...this.state.userProfile, types: res.data?.data},
          loading: false,
        });
      })
      .catch(err => null);
  };

  chooseFile = index => {
    ImagePicker.openPicker({
      width: SCREEN_WIDTH,
      height: 300,
      compressImageQuality: 0.5,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      this.setState({
        uploadImages: image.path,
        photos: image.path,
      });
    });
  };

  selectTypes = (item, index) => {
    this.setState(prevState => {
      const {types} = prevState.userProfile;
      const updatedTypes = [...types];
      updatedTypes[index] = {
        ...updatedTypes[index],
        is_interested: !updatedTypes[index].is_interested,
      };

      return {
        userProfile: {
          ...prevState.userProfile,
          types: updatedTypes,
        },
      };
    });
  };

  renderTypes = (item, index) => {
    return (
      <BT
        buttonStyle={item?.is_interested ? styles.btnSelect : styles.btnDisable}
        titleStyle={styles.btnPrimaryText}
        title={item?.name}
        onPress={() => this.selectTypes(item, index)}
      />
    );
  };

  handleContinue = () => {
    const {photos, uploadImages, submit, userProfile} = this.state;
    let typeSelected = false;
    userProfile?.types?.map(val => {
      if (val?.is_interested) {
        typeSelected = true;
      }
    });
    if (!uploadImages) {
      this.setState({
        msgToDisplay: 'Please add your photo',
        alertModal: true,
      });
      return;
    }
    if (!typeSelected) {
      this.setState({
        msgToDisplay: 'Please select a job type',
        alertModal: true,
      });
      return;
    }
    let data = {
      photos,
      uploadImages,
      token: this.props.user.userData.token,
      userProfile,
    };
    this.props.navigation.navigate(route.CAREEREDITPROFILE1ST, {data});
  };

  render() {
    const {
      photos,
      uploadImages,
      submit,
      userProfile,
      alertModal,
      msgToDisplay,
      loading,
    } = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <KeyboardAwareScrollView
              contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
                <Text style={styles.heading}>
                  Your{' '}
                  <Text
                    style={{
                      ...styles.heading,
                      color: themeStyle.CARRER_PRIMARY,
                      fontFamily: themeStyle.FONT_BOLD,
                    }}>
                    Preferences
                  </Text>
                </Text>
                <View style={{marginVertical: '2.5%'}}>
                  <Avatar
                    source={{
                      uri: photos ? photos : userProfile.image,
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
                      onPress={this.chooseFile}
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
                  <Text style={styles.headingText}>Add Profile Photo</Text>
                  <Text style={styles.headingText2}>Job Types</Text>
                </View>
                <View style={styles.tagline}>
                  {submit && !uploadImages ? (
                    <Text style={commonStyle.errorText}>
                      Please add your photo.
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.desc2}>Can select multiple</Text>

                <FlatList
                  data={userProfile?.types}
                  renderItem={({item, index}) => this.renderTypes(item, index)}
                  ListEmptyComponent={() => (
                    <>
                      <ShimmerPlaceHolder style={styles.shimmer} />
                      <ShimmerPlaceHolder style={styles.shimmer} />
                      <ShimmerPlaceHolder style={styles.shimmer} />
                      <ShimmerPlaceHolder style={styles.shimmer} />
                      <ShimmerPlaceHolder style={styles.shimmer} />
                    </>
                  )}
                />
              </View>

              <View style={styles.btnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={styles.darkDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.lightDash}></View>
                </View>
                <Button
                  green
                  career
                  title={'Next'}
                  onPress={() => {
                    this.setState({submit: true}, () => this.handleContinue());
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}

        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareerEditProfile1st);
