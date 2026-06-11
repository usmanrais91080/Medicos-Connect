import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input as CustomInput} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Container,
  DeleteModal,
  HeaderLeft,
  Icon,
  Input,
} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';
import {EducationServices, ProfileServices} from '../../../../services';
import EducationMenu from '../EducationMenu';
import styles from './style';
import AddImage from '../../../../assets/svg/add-image-button.svg';
import ImageCropPicker from 'react-native-image-crop-picker';
import ToggleSwitch from 'toggle-switch-react-native';
import EducationFunction from '../EducationStudentSeekAClass/education.studentseekclass.function';
import CreateQnaSuccessModal from '../../../../components/Modals/CreateQnaSuccessModal';

class EducationStudentPostClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      description: '',
      visible: false,
      price: '',
      category: '',
      msgToDisplay: '',
      alertModal: false,
      experience: true,
      free: true,
      lang: true,
      med: false,
      paid: false,
      onSite: false,
      online: true,
      gen: false,
      image1: '',
      image2: '',
      image3: '',
      showPoll: false,
      choices: ['', '', '', ''],
      pollText: '',
      qnaCategory: props.route.params?.qnaCategory || '',
      qnaCatagories: [],
      isEdit: props.route.params?.isEdit || false,
      topic: props.route.params?.topic || '',
      description: props.route.params?.description || '',
      qnaId: props.route.params?.id || '',
      successModal: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
    this.getQnaCatagories();
  };

  getQnaCatagories = () => {
    EducationServices.getQnaCatagories(this.props.user.userData.token).then(
      res => {
        this.setState({
          qnaCatagories: res.data.data,
          qnaCategory: res.data.data[0]?._id,
        });
      },
    );
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>
            {this.props?.user?.userData?.education_mode == 'Teacher'
              ? 'Teacher'
              : 'Student'}
          </Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onClose = () => {
    this.setState({successModal: false}, () => {
      this.props.navigation.goBack();
    });
  };

  pickImage = async index => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      switch (index) {
        case 1:
          this.setState({image1: image});
          break;
        case 2:
          this.setState({image2: image});
          break;
        case 3:
          this.setState({image3: image});
          break;
      }
    });
  };

  updateQna = () => {
    const {description, topic, qnaCategory, qnaId} = this.state;
    if (
      description == this.props.route.params.description &&
      topic == this.props.route.params.topic &&
      qnaCategory == this.props.route.params.qnaCategory
    ) {
      this.setState({
        alertModal: true,
        msgToDisplay: 'Please make some changes to update',
      });
      return;
    }
    const data = {
      qanCategory: qnaCategory,
      topic,
      description,
    };
    EducationServices.updateQna(qnaId, data, this.props.user.userData.token)
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(err => {});
  };

  createQna = () => {
    const {
      topic,
      description,
      image1,
      image2,
      image3,
      qnaCategory,
      choices,
      showPoll,
      pollText,
    } = this.state;
    if (!topic) {
      this.setState({
        msgToDisplay: 'Please fill topic',
        alertModal: true,
        loading: false,
      });
      return;
    }
    if (!description) {
      this.setState({
        msgToDisplay: 'Please fill description',
        alertModal: true,
        loading: false,
      });
      return;
    }
    let formData = new FormData();

    formData.append('qnaCategory', qnaCategory);
    formData.append('topic', topic);
    formData.append('description', description);
    formData.append('content_type', showPoll ? 'POLL' : 'TEXT');

    if (image1) {
      formData.append('files', {
        uri: image1.path,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
    }
    if (image2) {
      formData.append('files', {
        uri: image2.path,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
    }
    if (image3) {
      formData.append('files', {
        uri: image3.path,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
    }

    if (pollText) {
      formData.append('pollText', pollText ? pollText : '');
    }
    choices?.forEach((choice, index) => {
      if (choice) {
        formData.append(`choices[${index}]`, choice);
      }
    });

    EducationFunction.createQna(formData, this.props.user.userData.token)
      .then(res => {
        this.setState({successModal: true});
      })
      .catch(err => {
        this.setState({
          msgToDisplay: 'Snap! Please try again',
          alertModal: true,
          loading: false,
        });
      });
  };

  render() {
    const {
      topic,
      description,
      alertModal,
      msgToDisplay,
      showPoll,
      choices,
      pollText,
      qnaCategory,
      qnaCatagories,
      isEdit,
      successModal,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{flex: 0.8}}
            contentContainerStyle={{paddingBottom: '30%'}}>
            <StatusBar
              backgroundColor={themeStyle.COLOR_EDUCATION}
              barStyle={'light-content'}
            />
            <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
              <Text style={styles.discussion}>
                {isEdit ? 'Update' : 'Create a new'} discussion
              </Text>
              <Text style={{marginTop: 10, ...styles.desc}}>
                Select Category
              </Text>
              <View style={styles.rowContainer1}>
                {qnaCatagories?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.setState({qnaCategory: item?._id})}
                      style={[styles.row, {marginRight: 10}]}>
                      <View
                        style={
                          qnaCategory === item._id
                            ? styles.selectedbox
                            : styles.box
                        }></View>
                      <Text
                        style={
                          qnaCategory === item._id
                            ? styles.selectedOption
                            : styles.option
                        }>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={{...styles.desc, marginTop: 20}}>Topic</Text>
              <View style={styles.inputConttainer}>
                <Input
                  education
                  value={topic}
                  placeholder="Medicine"
                  placeholderTextColor={'#77777B'}
                  onChangeText={job => this.setState({topic: job})}
                />
              </View>
              <Text style={{...styles.desc, marginTop: -17, marginBottom: 5}}>
                Description
              </Text>
              <View style={{marginTop: '2%'}}>
                <CustomInput
                  placeholder="Enter your description"
                  multiline={true}
                  value={description}
                  containerStyle={styles.containerStyle}
                  onChangeText={e => this.setState({description: e})}
                  placeholderTextColor={'#77777B'}
                  inputContainerStyle={styles.inputContainerStyle}
                  textAlignVertical="top"
                  inputStyle={styles.inputStyle}
                />
              </View>
              {!isEdit ? (
                <>
                  <Text style={{...styles.desc}}>Add Images</Text>
                  <View style={styles.rowContainer1}>
                    <TouchableOpacity
                      onPress={() => {
                        this.state.image1
                          ? this.setState({image1: ''})
                          : this.pickImage(1);
                      }}
                      style={styles.imageButton}>
                      {this.state.image1 ? (
                        <Image
                          source={{uri: this.state.image1.path}}
                          style={styles.image}
                        />
                      ) : null}
                      <View
                        style={{position: 'absolute', bottom: -8, right: -8}}>
                        {!this.state.image1 ? (
                          <AddImage />
                        ) : (
                          <Icon.AntDesign
                            name="closecircle"
                            size={25}
                            color={themeStyle.COLOR_EDUCATION}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.state.image2
                          ? this.setState({image2: ''})
                          : this.pickImage(2);
                      }}
                      style={styles.imageButton}>
                      {this.state.image2 ? (
                        <Image
                          source={{uri: this.state.image2.path}}
                          style={styles.image}
                        />
                      ) : null}
                      <View
                        style={{position: 'absolute', bottom: -8, right: -8}}>
                        {!this.state.image2 ? (
                          <AddImage />
                        ) : (
                          <Icon.AntDesign
                            color={themeStyle.COLOR_EDUCATION}
                            name="closecircle"
                            size={25}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.state.image3
                          ? this.setState({image3: ''})
                          : this.pickImage(3);
                      }}
                      style={styles.imageButton}>
                      {this.state.image3 ? (
                        <Image
                          source={{uri: this.state.image3.path}}
                          style={styles.image}
                        />
                      ) : null}
                      <View
                        style={{position: 'absolute', bottom: -8, right: -8}}>
                        {!this.state.image3 ? (
                          <AddImage />
                        ) : (
                          <Icon.AntDesign
                            color={themeStyle.COLOR_EDUCATION}
                            name="closecircle"
                            size={25}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.rowContainer, {marginTop: 24}]}>
                    <Text style={styles.desc}>Question/Answer</Text>
                    <ToggleSwitch
                      isOn={showPoll}
                      onColor={themeStyle.EDUCATION_BROWN}
                      offColor={themeStyle.DARK_GRAY}
                      size="small"
                      onToggle={isOn => this.setState({showPoll: isOn})}
                    />
                  </View>
                  {showPoll ? (
                    <>
                      <View style={styles.enterOptionContainer}>
                        <TextInput
                          style={styles.enterOptionInput}
                          placeholder="Enter Text for your poll here"
                          multiline
                          value={pollText}
                          onChangeText={text => this.setState({pollText: text})}
                          placeholderTextColor={'#343434'}
                        />
                      </View>

                      <TextInput
                        style={styles.optionInput}
                        placeholder="Option A"
                        value={choices[0]}
                        placeholderTextColor={'#343434'}
                        onChangeText={text => {
                          let temp = [...choices];
                          temp[0] = text;
                          this.setState({choices: temp});
                        }}
                      />
                      <TextInput
                        style={styles.optionInput}
                        placeholder="Option B"
                        value={choices[1]}
                        onChangeText={text => {
                          let temp = [...choices];
                          temp[1] = text;
                          this.setState({choices: temp});
                        }}
                        placeholderTextColor={'#343434'}
                      />
                      <TextInput
                        style={styles.optionInput}
                        placeholder="Option C"
                        value={choices[2]}
                        onChangeText={text => {
                          let temp = [...choices];
                          temp[2] = text;
                          this.setState({choices: temp});
                        }}
                        placeholderTextColor={'#343434'}
                      />
                      <TextInput
                        style={styles.optionInput}
                        placeholder="Option D"
                        value={choices[3]}
                        onChangeText={text => {
                          let temp = [...choices];
                          temp[3] = text;
                          this.setState({choices: temp});
                        }}
                        placeholderTextColor={'#343434'}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
            </View>
          </KeyboardAwareScrollView>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postBtn}
              onPress={() => {
                isEdit ? this.updateQna() : this.createQna();
              }}>
              <Text style={styles.btnText}>{isEdit ? 'Update' : 'Post'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <EducationMenu
          data={this.props.user.userData}
          navigation={this.props.navigation}
          visible={this.state.visible}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTCLASSESANDREQUESTS,
            );
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Education';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0]._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                await this.props.authActions.getUserModules(
                  this.props.user.userData.token,
                );
                this.props.navigation.replace(route.MAIN);
              })
              .catch(err => {});
          }}
          onClose={() => this.setState({visible: false})}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
        <CreateQnaSuccessModal visible={successModal} onClose={this.onClose} />
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
)(EducationStudentPostClass);
