import React, {Component} from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, DeleteModal, Icon, Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import ConnectProfileFunction from './connect.profile.funtion';
import ConnectProfileFunction3rd from './../ConnectEditProfile3rd/connect.profile.function';

import {FlatList} from 'react-native-gesture-handler';
import {bindActionCreators} from 'redux';
import commonStyle from '../../../../assets/styles/common.style';
import themeStyle from '../../../../assets/styles/theme.style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import {connectActions} from '../../../../redux/actions/connect';
import {ConnectModuleServices, WalletServices} from '../../../../services';
import {
  ProfessionMatchModal,
  ProfessionModal,
} from './connect.profile4th.component';
import styles from './style';
import LearnMore from '../../../../assets/svg/learn-more.svg';
import AddImage from '../../../../assets/svg/add-image.svg';
import ProfilePlaceholder from '../../../../assets/svg/profile-placeholder.svg';
import Warning from '../../../../assets/svg/warning.svg';
import ImagePicker from 'react-native-image-crop-picker';
class ConnectProfile3rd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      education: [],
      professions: [...this.props.connectProfessions],
      selectedProfessions: [],
      job: '',
      certifcate: '',
      ielts: true,
      toefl: false,
      paymentModal: false,
      blockContact: true,
      matchByProfesstion: false,
      oet: false,
      professionModal: false,
      professionMatchModal: false,
      connectMatchProfessions: [],
      professionLoading: false,
      IsProfessionFound: false,
      packages: [],
      paymentLoading: false,
      item: {},
      videoUri: '',
      selfie: '',
      isSelfieModal: false,
      showSelfieModal: false,
      showRetakeSelfieModal: false,
      newMsgModal: false,
      newMsg: '',
    };
    this.arrayholder = [];
    this.arrayholder1 = [];
  }

  componentDidMount = () => {
    this.props.connectActions.getConnectProfessions(
      this.props.user.userData.token,
    );
    this.arrayholder = this.props.connectProfessions;
    this.getMacthedPrfessions();
    this.getPackages();
    // this.getConnectSettings();
  };

  getPackages = () => {
    ConnectProfileFunction.getPackages(this.props.user.userData.token)
      .then(res => {
        this.setState({packages: res});
      })
      .catch(err => null);
  };

  renderChips(item, index) {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({tags: this.state.tags.filter((_, i) => i != index)})
          }
          style={styles.minusContainer}
        >
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item?.name}</Text>
        </View>
      </View>
    );
  }

  takeSelfie = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(image => {
      this.setState({
        selfie: image,
        showSelfieModal: false,
        showRetakeSelfieModal: true,
      });
    });
  };

  // getConnectSettings = () => {
  //   ConnectSettingsFunction.getUserConnectProfileSettings(
  //     this.props.user.userData.token,
  //   )
  //     .then(res => {
  //       this.setState({
  //         username: res.username,
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({loading: false});
  //     });
  // };

  handleConnect = () => {
    const {professions, selfie} = this.state;
    if (!this.props.user.userData.connect_selfie_is_verified && !selfie) {
      this.setState({submit: true});
      return;
    }
    this.setState({professionLoading: true});
    let hobbiesArray = [];
    professions.map(item => {
      if (item.selected) {
        hobbiesArray.push(item._id);
      }
    });
    if (selfie) {
      if (this.props.route.params?.formData) {
        this.props.route.params?.formData?.append('connect_selfie', {
          uri: selfie.path,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        });
        ConnectProfileFunction3rd.createConnectProfile(
          this.props.route?.params?.formData,
          this.props.user.userData.token,
        )
          .then(res => {})
          .catch(err => {
            this.setState({professionLoading: false});
          });
      } else {
        const formData = new FormData();
        console.log('selfie', selfie);
        formData.append('connect_selfie', {
          uri: selfie.path,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: selfie.mime,
        });

        ConnectModuleServices.updateConnectProfile(
          formData,
          this.props.user.userData.token,
        )
          .then(res => {
            console.log('updateConnectProfile res', res);
          })
          .catch(err => {
            console.log('updateConnectProfile err', err);
            this.setState({professionLoading: false});
          });
      }
    }

    if (hobbiesArray.length > 0) {
      ConnectProfileFunction.updateConnectProfessionMatches(
        {profession_matches: hobbiesArray},
        this.props.user.userData.token,
      )
        .then(() => {
          this.props.authActions.getUserProfile(
            {token: this.props.user.userData.token},
            '',
            '',
          );
          this.setState({
            professionLoading: false,
          });
          if (this.props.user.userData?.connect_selfie_is_verified) {
            this.setState({
              newMsgModal: true,
              newMsg:
                'Your profile is ready, but hang tight while we verify your selfie. You’ll be up and running in no time!',
            });
          } else {
            this.setState({
              newMsgModal: true,
              newMsg: 'Your profile has been updated successfully',
            });
          }
        })
        .catch(err => null);
    } else {
      this.setState({submit: true, professionLoading: false});
    }
  };

  seacrhProfesstionFunction = text => {
    this.arrayholder = this.props.connectProfessions;
    this.setState({value: text});
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({professions: newData, IsProfessionFound: false});
    } else {
      this.setState({IsProfessionFound: true});
    }
  };
  seacrhMatchProfesstionFunction = text => {
    this.setState({value: text});
    const newData = this.arrayholder1.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({
        connectMatchProfessions: newData,
        IsProfessionFound: false,
      });
    } else {
      this.setState({IsProfessionFound: true});
    }
  };

  handleSelectProfession = data => {
    let array = [];
    array.push(data);
    this.setState(
      {
        education: array,
        professionModal: false,
        professionLoading: true,
        value: '',
      },
      () => this.getMacthedPrfessions(data._id),
    );
  };

  getMacthedPrfessions = () => {
    ConnectProfileFunction.getConnectProfessionMatches(
      this.props.user.userData.token,
    )
      .then(res => {
        let array = [...res];
        if (this.props.user.userData.profession_matches.length > 0) {
          this.props.user.userData.profession_matches.map((item, index) => {
            array.map((element, ind) => {
              if (item.profession_match?.name == element?.name) {
                array[ind] = {...array[ind], selected: true};
              }
            });
          });
          this.setState({professions: array, professionLoading: false});
        } else {
          this.setState({professions: array, professionLoading: false});
        }
      })
      .catch(err => {
        this.setState({professions: [], professionLoading: false});
      });
  };
  getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };

  handleSelectMatchProfession = data => {
    let connectionArray = [...this.state.connectMatchProfessions];
    connectionArray.map((item, index) => {
      if (data._id == item._id) {
        if (data.selected) {
          connectionArray[index] = {...connectionArray[index], selected: false};
        } else {
          connectionArray[index] = {...connectionArray[index], selected: true};
        }
      }
    });
    let array = [...this.state.tags];
    array.push(data);
    this.arrayholder1 = connectionArray;
    this.setState({
      connectMatchProfessions: connectionArray,
      tags: array,
    });
  };

  createPayment = p_id => {
    this.setState({paymentLoading: true});
    fetch(
      `http://3.13.164.94:8000/api/paypal/payment/${p_id}/${this.props.user.userData._id}`,
    )
      .then(res => res)
      .then(response => {
        this.setState({paymentLoading: false});
        // this.setState({page:response.url},()=>this.setState({showModal:true}))
        this.setState({videoUri: response.url});
        // this.props.navigation.navigate(route.VIEWURL, { url: response.url })
      })
      .catch(error => {
        // console.log('Error>>>>>>>>', error);
        this.setState({paymentLoading: false});
      });
    // WalletServices.createPayment(p_id,this.props.user.userData._id,this.props.user.userData.token)
    // .then((res) => {
    //     // this.setState({loading:false,packages:res.data.data})
    //     })
    // .catch((err) => { console.log("err : ", err); this.setState({loading:false})})
  };
  handlePaymentSuccess = () => {
    let array = [...this.state.connectMatchProfessions];
    let tags = [...this.state.tags];
    array.map((element, index) => {
      if (this.state?.item?.name == element?.name) {
        array[index] = {...array[index], selected: true};
        tags.push(this.state?.item);
      }
    });
    this.arrayholder1 = array;
    this.setState({
      connectMatchProfessions: array,
      tags: tags,
      professionLoading: false,
      paymentModal: false,
      item: null,
    });
  };

  handleCreateTransction = item => {
    this.setState({paymentLoading: true});
    let data = {
      ampules: 10,
      type: 'Connect',
    };
    WalletServices.createTransaction(data, this.props.user.userData.token)
      .then(res => {
        let array = [...this.state.connectMatchProfessions];
        let tags = [...this.state.tags];
        array.map((element, index) => {
          if (this.state?.item?.name == element?.name) {
            array[index] = {...array[index], selected: true};
            tags.push(this.state?.item);
          }
        });
        this.arrayholder1 = array;
        this.setState({
          connectMatchProfessions: array,
          tags: tags,
          paymentLoading: true,
          professionLoading: false,
          paymentModal: false,
          item: null,
        });
      })
      .catch(err => null);
  };

  renderhobbies = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let array = [...this.state.professions];
          const selectedProfessions = this.state.selectedProfessions;
          if (array[index].selected) {
            array[index] = {...array[index], selected: false};
            this.setState({
              selectedProfessions: selectedProfessions.filter(
                item => item !== array[index].name,
              ),
            });
          } else {
            array[index] = {...array[index], selected: true};
            this.setState({
              selectedProfessions: [...selectedProfessions, array[index].name],
            });
          }
          this.setState({professions: array});
        }}
        key={index.toString()}
        style={{marginRight: 10}}
      >
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}
        >
          <Text style={styles.grayText}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      paymentModal,
      videoUri,
      item,
      professions,
      submit,
      selectedProfessions,
      professionLoading,
      newMsgModal,
      newMsg,
    } = this.state;
    return (
      <Container>
        {professionLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '10%'}}
            >
              <StatusBar
                backgroundColor={themeStyle.PINK}
                barStyle={'light-content'}
              />
              <View style={styles.margin}>
                <Text style={styles.headingText}>
                  Build your{' '}
                  <Text style={{color: themeStyle.PINK, fontWeight: 'bold'}}>
                    profile
                  </Text>
                </Text>
              </View>
              <View style={{marginHorizontal: '4%', marginTop: '2%'}}>
                <Text style={styles.heading2}>Match profiles</Text>
                <Text style={{...styles.desc, marginRight: '5%'}}>
                  Passions makes it easier to find who shares your interests.Add
                  3-5 to your profile to make better connections
                </Text>
                <View style={styles.inputConttainer1}>
                  <Text style={styles.heading1}>Match by profession</Text>
                  <FlatList
                    data={professions}
                    numColumns={0}
                    renderItem={({item, index}) =>
                      this.renderhobbies(item, index)
                    }
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={item => item?.name}
                    ItemSeparatorComponent={VerticalSpacer}
                  />
                  {submit && !selectedProfessions.length ? (
                    <Text style={commonStyle.errorText}>
                      Please select at least one profession to match.
                    </Text>
                  ) : null}
                </View>
                {!this.props.user.userData.connect_selfie_is_verified ? (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.selfieTitle}>Add Selfie</Text>
                      <TouchableOpacity>
                        <LearnMore />
                      </TouchableOpacity>
                    </View>
                    {!this.state.selfie.path ? (
                      <TouchableOpacity
                        onPress={() => this.setState({showSelfieModal: true})}
                        style={styles.imageContainer}
                      >
                        <ProfilePlaceholder />
                        <View style={styles.addImage}>
                          <AddImage />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Image
                        source={{uri: this.state.selfie.path}}
                        style={styles.selfie}
                      />
                    )}
                    <Text style={styles.followSteps}>
                      (follow steps to upload image)
                    </Text>
                    <TouchableOpacity
                      style={styles.selfieButton}
                      onPress={() => {
                        if (this.state.selfie) {
                          this.setState({showRetakeSelfieModal: true});
                        } else {
                          this.setState({showSelfieModal: true});
                        }
                      }}
                    >
                      <Text style={styles.takeSelfieText}>
                        {!this.state.selfie
                          ? 'Take a selfie'
                          : 'Retake a selfie'}
                      </Text>
                    </TouchableOpacity>
                    {submit && !this.state.selfie ? (
                      <View style={styles.selfieWarning}>
                        <Warning />
                        <Text style={commonStyle.errorText}>
                          Please provide an image for verification
                        </Text>
                      </View>
                    ) : null}
                  </>
                ) : null}

                {/* Selfie modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showSelfieModal}
                  onRequestClose={() => {
                    this.setState({showSelfieModal: false});
                  }}
                >
                  <View style={styles.selfieModalContainer}>
                    <View style={styles.selfieModal}>
                      <Text style={styles.selfieModalTitle}>
                        Pose and snap!
                      </Text>
                      <Image
                        source={require('../../../../assets/images/selfie_placeholder.png')}
                        style={styles.selfieImage}
                      />
                      <View
                        style={[styles.modalTextRowContainer, {marginTop: 40}]}
                      >
                        <Text style={styles.selfieDetailsText}>{'\u30FB'}</Text>
                        <Text style={styles.selfieDetailsText}>
                          Your face must be clearly visible
                        </Text>
                      </View>
                      <View style={styles.modalTextRowContainer}>
                        <Text style={styles.selfieDetailsText}>{'\u30FB'}</Text>
                        <Text style={styles.selfieDetailsText}>
                          You must copy the exact pose
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.rowContainer,
                          {marginTop: 40, width: '95%', marginBottom: 30},
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({showSelfieModal: false})
                          }
                          style={styles.selfieBack}
                        >
                          <Text style={styles.grayText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.takeSelfie}
                          style={styles.takeSelfie}
                        >
                          <Text style={styles.grayText}>Take selfie</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View />
                  </View>
                </Modal>
                {/* Retake selfie modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showRetakeSelfieModal}
                  onRequestClose={() => {
                    this.setState({showRetakeSelfieModal: false});
                  }}
                >
                  <View style={styles.selfieModalContainer}>
                    <View style={styles.selfieModal}>
                      <Text style={styles.selfieModalTitle}>
                        Happy with your selfie?
                      </Text>
                      <Image
                        source={{uri: this.state.selfie.path}}
                        style={styles.selfieImage}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            showRetakeSelfieModal: false,
                            showSelfieModal: true,
                            selfie: '',
                          })
                        }
                      >
                        <Text style={styles.retakeSelfie}>
                          Retake your selfie
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={[styles.modalTextRowContainer, {marginTop: 15}]}
                      >
                        <Text style={styles.selfieDetailsText}>{'\u30FB'}</Text>
                        <Text style={styles.selfieDetailsText}>
                          This selfie is just for verification purposes only
                        </Text>
                      </View>
                      <View style={styles.modalTextRowContainer}>
                        <Text style={styles.selfieDetailsText}>{'\u30FB'}</Text>
                        <Text style={styles.selfieDetailsText}>
                          This is to avoid catfishing and scams
                        </Text>
                      </View>
                      <View style={styles.modalTextRowContainer}>
                        <Text style={styles.selfieDetailsText}>{'\u30FB'}</Text>
                        <Text style={styles.selfieDetailsText}>
                          It will not be displayed on your profile
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() =>
                          this.setState({showRetakeSelfieModal: false})
                        }
                      >
                        <Text style={styles.submitText}>Submit Selfie</Text>
                      </TouchableOpacity>
                      <Text style={styles.verificationProcessText}>
                        This image is for verification purposes only
                      </Text>
                    </View>
                    <View />
                  </View>
                </Modal>
              </View>

              <View style={styles.btnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={styles.lightDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.lightDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.lightDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.darkDash}></View>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  styles.margin,
                  {marginVertical: '7%'},
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.pop()}
                  style={styles.back}
                >
                  <Text style={styles.grayText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleConnect()}
                  style={styles.next}
                >
                  <Text style={styles.grayText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            if (this.props.user.userData?.connect_selfie === null) {
              this.setState({newMsgModal: false});
              return;
            } else if (!this.props.user.userData?.connect_selfie_is_verified) {
              this.props.navigation.replace(route.HOMESCREEN);
            } else {
              this.props.navigation.replace(route.CONNECTHOME);
            }
            this.setState({newMsgModal: false});
          }}
          text={newMsg}
        />
        <ProfessionModal
          isVisible={this.state.professionModal}
          onClose={() => this.setState({professionModal: false, value: ''})}
          data={this.state.professions}
          onSearch={text => this.seacrhFunction(text)}
          onPress={data => {
            this.handleSelectProfession(data);
          }}
        />
        <ProfessionMatchModal
          packages={this.state.packages}
          loading={this.state.professionLoading}
          paymentLoading={this.state.paymentLoading}
          isVisible={this.state.professionMatchModal}
          onClose={() =>
            this.setState({professionMatchModal: false, value: ''})
          }
          data={this.state.connectMatchProfessions}
          profession={this.props.user.userData.profession}
          paymentModal={paymentModal}
          item={item}
          videoUri={videoUri}
          onPressPayment={item =>
            this.props.user.userData.ampules > 20
              ? this.handleCreateTransction(item)
              : this.setState({paymentModal: true, item: item})
          }
          onSearch={text => this.seacrhMatchProfesstionFunction(text)}
          onPress={data => {
            this.handleSelectMatchProfession(data);
          }}
          paymentFalse={() =>
            this.setState({paymentModal: false, videoUri: ''})
          }
          payForAmpules={p_id => this.createPayment(p_id)}
          goBack={() => this.props.navigation.goBack()}
          setVideoUri={() => this.setState({videoUri: ''})}
          paymentSuccess={() => this.handlePaymentSuccess()}
          authActions={() =>
            this.props.authActions.getUserProfile(
              this.props.user.userData.token,
              '',
              '',
            )
          }
        />
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
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectProfile3rd);
