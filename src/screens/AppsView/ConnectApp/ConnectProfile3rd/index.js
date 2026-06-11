import React, {Component} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {
  Button,
  Container,
  Input,
  Icon,
  UploadingModal,
  DeleteModal,
  Loader,
} from '../../../../components';
import Career from '../../../../assets/svg/careerwelcome.svg';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {connectActions} from '../../../../redux/actions/connect';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import commonStyle from '../../../../assets/styles/common.style';
import ConnectProfileFunction from './connect.profile.function';
class ConnectProfile2nd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: [...this.props.connectInterests.hobbies],
      lifeStyle: [...this.props.connectInterests.lifestyles],
      personailty: [...this.props.connectInterests.personalities],
      likes: [...this.props.connectInterests.likes],
      job: '',
      selectedLikes: [],
      selectedPersonality: [],
      selectedHobbies: [],
      selectedLifeStyle: [],
      certifcate: '',
      ielts: true,
      toefl: false,
      submit: false,
      oet: false,
      counter: 0,
      uploading: false,
      alertModal: false,
      msgToDisplay: 'Connect profile created successfully',
    };
  }

  renderhobbies = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let count = this.state.counter;
          let array = [...this.state.hobbies];
          if (array[index].selected) {
            if (count <= 5) {
              array[index] = {...array[index], selected: false};
              count = count - 1;
            }
          } else {
            if (count < 5) {
              array[index] = {...array[index], selected: true};
              count = count + 1;
            }
          }
          this.setState({hobbies: array, counter: count});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLifeStyle = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let count = this.state.counter;
          let array = [...this.state.lifeStyle];
          if (array[index].selected) {
            if (count <= 5) {
              array[index] = {...array[index], selected: false};
              count = count - 1;
            }
          } else {
            if (count < 5) {
              array[index] = {...array[index], selected: true};
              count = count + 1;
            }
          }
          this.setState({lifeStyle: array, counter: count});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderPersonality = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let count = this.state.counter;
          let array = [...this.state.personailty];
          if (array[index].selected) {
            if (count <= 5) {
              array[index] = {...array[index], selected: false};
              count = count - 1;
            }
          } else {
            if (count < 5) {
              array[index] = {...array[index], selected: true};
              count = count + 1;
            }
          }
          this.setState({personailty: array, counter: count});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLikes = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let count = this.state.counter;
          let array = [...this.state.likes];
          if (array[index].selected) {
            if (count <= 5) {
              array[index] = {...array[index], selected: false};
              count = count - 1;
            }
          } else {
            if (count < 5) {
              array[index] = {...array[index], selected: true};
              count = count + 1;
            }
          }
          this.setState({likes: array, counter: count});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleContinue = () => {
    const {religion, gender, images, about, mode, preferences, prev_screen} =
      this.props?.route?.params;
    let hobbiesArray = [];
    this.state.hobbies.map(item => {
      if (item.selected) {
        hobbiesArray.push(item._id);
      }
    });
    let lifeStyleArray = [];
    this.state.lifeStyle.map(item => {
      if (item.selected) {
        lifeStyleArray.push(item._id);
      }
    });
    let personailtyArray = [];
    this.state.personailty.map(item => {
      if (item.selected) {
        personailtyArray.push(item._id);
      }
    });
    let likesArray = [];
    this.state.likes.map(item => {
      if (item.selected) {
        likesArray.push(item._id);
      }
    });

    const totalLenght =
      hobbiesArray.length +
      lifeStyleArray.length +
      likesArray.length +
      personailtyArray.length;

    if (totalLenght >= 3) {
      let formData = new FormData();
      likesArray.map((item, index) => {
        formData.append(`likes[${index}]`, item);
      });
      personailtyArray.map((item, index) => {
        formData.append(`personalities[${index}]`, item);
      });
      lifeStyleArray.map((item, index) => {
        formData.append(`lifestyles[${index}]`, item);
      });
      hobbiesArray.map((item, index) => {
        formData.append(`hobbies[${index}]`, item);
      });
      preferences.map((item, index) => {
        formData.append(`personality_judgements[${index}]`, item);
      });
      images.map((val, ind) =>
        formData.append(`connect_image${ind}`, {
          uri: val,
          name: `${new Date().getTime().toString()}.jpg`,
          filename: new Date().getTime().toString() + '.jpg',
          type: 'image/jpg',
        }),
      );
      formData.append('religion', religion[0]);
      formData.append('mode', 'Dating');
      formData.append('about', about);
      formData.append('gender_preference', gender);

      this.props.navigation.navigate(route.CONNECTEDITPROFILE4TH, {formData});

      // Moved this to the next screen
      // ConnectProfileFunction.createConnectProfile(
      //   formData,
      //   this.props.user.userData.token,
      // )
      //   .then(res => {
      //     if (this.props.user.userData.profession != '') {
      //       this.setState({uploading: false}, () => null
      //       );
      //     } else {
      //       this.setState({uploading: false, alertModal: true});
      //     }
      //   })
      //   .catch(err => {
      //     console.log('Create connect profile err', err);
      //     this.setState({uploading: false});
      //   });
    } else {
      this.setState({
        selectedLikes: likesArray,
        selectedPersonality: personailtyArray,
        selectedHobbies: hobbiesArray,
        selectedLifeStyle: lifeStyleArray,
        submit: true,
      });
    }
  };

  alertConfrim = () => {
    const {prev_screen} = this.props.route.params;
    this.props.authActions.getUserProfile(
      {token: this.props.user.userData.token},
      '',
      '',
    );
    this.props.navigation.replace(route.MAIN, {screen: route.HOME});
  };

  render() {
    const {
      uploading,
      personailty,
      counter,
      lifeStyle,
      hobbies,
      submit,
      alertModal,
      msgToDisplay,
    } = this.state;
    return (
      <Container>
        {uploading ? (
          <Loader />
        ) : (
          <Container>
            <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: '30%'}}>
                <View style={{marginHorizontal: '2.5%', marginTop: '5%'}}>
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
                  <View style={styles.rowContainer}>
                    <Text style={styles.heading}>What are your interests</Text>
                    <Text style={styles.heading}>{counter}/5</Text>
                  </View>
                  <Text style={{...styles.desc, marginRight: '5%'}}>
                    Passions makes it easier to find who shares your
                    interests.Add 3-5 to your profile to make better connections
                  </Text>
                  <View style={styles.inputConttainer}>
                    {submit && (
                      <Text
                        style={[
                          commonStyle.errorText,
                          {paddingLeft: 0, marginLeft: 0},
                        ]}>
                        Please select at least 3 from below to describe
                        yourself.
                      </Text>
                    )}
                    <Text style={styles.heading1}>Hobbies</Text>
                    <FlatList
                      data={hobbies}
                      numColumns={0}
                      renderItem={({item, index}) =>
                        this.renderhobbies(item, index)
                      }
                      contentContainerStyle={styles.contentContainer}
                      keyExtractor={item => item.name}
                      ItemSeparatorComponent={VerticalSpacer}
                    />
                  </View>
                  <View style={styles.inputConttainer}>
                    <Text style={styles.heading1}>Lifestyle</Text>
                    <FlatList
                      data={lifeStyle}
                      numColumns={0}
                      renderItem={({item, index}) =>
                        this.renderLifeStyle(item, index)
                      }
                      contentContainerStyle={styles.contentContainer}
                      keyExtractor={item => item.name}
                      ItemSeparatorComponent={VerticalSpacer}
                    />
                  </View>
                  <View style={styles.inputConttainer}>
                    <Text style={styles.heading1}>Personality</Text>
                    <FlatList
                      data={personailty}
                      numColumns={0}
                      renderItem={({item, index}) =>
                        this.renderPersonality(item, index)
                      }
                      contentContainerStyle={styles.contentContainer}
                      keyExtractor={item => item.name}
                      ItemSeparatorComponent={VerticalSpacer}
                    />
                  </View>
                </View>
                <View style={styles.rowContainer2}>
                  <View style={styles.lightDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.lightDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.darkDash}></View>
                  <View style={{width: 10}}></View>
                  <View style={styles.lightDash}></View>
                </View>
                <View
                  style={[
                    styles.rowContainer,
                    styles.margin,
                    {marginVertical: '7%'},
                  ]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.pop()}
                    style={styles.back}>
                    <Text style={styles.grayText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleContinue()}
                    style={styles.next}>
                    <Text style={styles.grayText}>Next</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}></View>
              </ScrollView>
            </View>
            <DeleteModal
              alert
              visible={alertModal}
              confirm={() => {
                this.setState({alertModal: false});
                this.alertConfrim();
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectProfile2nd);
