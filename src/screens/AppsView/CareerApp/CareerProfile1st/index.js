import React, {Component} from 'react';
import {Button as BT} from 'react-native-elements';
import {Text, TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import {Button, Container, DeleteModal} from '../../../../components';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import commonStyle from '../../../../assets/styles/common.style';
import {CareerServices} from '../../../../services';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../../../../assets/svg/search.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
class CareerProfile1st extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      uploadImages: '',
      photos: '',
      submit: false,
      alertModal: false,
      msgToDisplay: '',
    };
  }
  componentDidMount = () => {
    this.getJobTypes();
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
        this.setState({
          uploadImages: source.assets[0].uri,
          photos: source.assets[0].uri,
        });
      }
    });
  };

  handleContinue = () => {
    const {photos, uploadImages, submit, types} = this.state;
    let typeSelected = false;
    types?.map(val => {
      if (val?.is_interested) {
        typeSelected = true;
      }
    });
    if (uploadImages && submit && typeSelected) {
      let data = {
        types,
        photos,
        uploadImages,
        token: this.props.user.userData.token,
      };
      this.props.navigation.navigate(route.CAREERPROFILE2ND, {data});
    } else {
      this.setState({msgToDisplay: 'Please fill all fields', alertModal: true});
    }
  };

  selectTypes = (item, index) => {
    const {types} = this.state;
    let temp = types;
    temp[index].is_interested = !temp[index].is_interested;
    this.setState({types: temp});
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

  getJobTypes = () => {
    CareerServices.getJobTypes(this.props.user.userData.token)
      .then(res => {
        this.setState({
          types: res.data?.data,
        });
      })
      .catch(err => null);
  };

  render() {
    const {types, photos, uploadImages, submit, alertModal, msgToDisplay} =
      this.state;
    return (
      <Container>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingBottom: '30%'}}>
            <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
              <Text style={styles.heading}>
                Your{' '}
                <Text
                  style={{...styles.heading, color: themeStyle.CARRER_PRIMARY}}>
                  Preference
                </Text>
              </Text>
              <View style={{marginVertical: '2.5%'}}>
                <Avatar
                  source={{
                    uri: photos
                      ? photos
                      : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png',
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
                    name="plus"
                    color="white"
                    onPress={this.chooseFile}
                    size={15}
                    style={{
                      backgroundColor: themeStyle.CARRER_PRIMARY,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      right: 0,
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
                data={types}
                renderItem={({item, index}) => this.renderTypes(item, index)}
                ListEmptyComponent={() => (
                  <Text style={styles.desc}>Loading types...</Text>
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
                title={'Continue'}
                onPress={() => {
                  // oet?this.props.navigation.navigate(route.CAREERRESEARCHPROFILE):this.props.navigation.navigate(route.CAREERPROFILE2ND)
                  this.setState({submit: true}, () => this.handleContinue());
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CareerProfile1st);
