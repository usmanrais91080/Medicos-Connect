import React, {Component} from 'react';

import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Container, DeleteModal, Loader} from '../../../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import commonStyle from '../../../../assets/styles/common.style';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {authActions} from '../../../../redux/actions/auth';
import {connectActions} from '../../../../redux/actions/connect';
import ConnectProfileFunction from './connect.profile.function';
import styles from './style';
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

  componentDidMount = () => {
    const {userProfile} = this.props.route.params;
    let hobbies = [...this.state.hobbies];
    let lifeStyle = [...this.state.lifeStyle];
    let likes = [...this.state.likes];
    let personailty = [...this.state.personailty];
    let count = this.state.counter;
    userProfile.hobbies.map((item, index) => {
      hobbies.map((element, ind) => {
        if (item == element.name) {
          count += 1;
          hobbies[ind] = {...hobbies[ind], selected: true};
        }
      });
    });
    userProfile.lifestyles.map((item, index) => {
      lifeStyle.map((element, ind) => {
        if (item == element.name) {
          count += 1;
          lifeStyle[ind] = {...lifeStyle[ind], selected: true};
        }
      });
    });
    userProfile.likes.map((item, index) => {
      likes.map((element, ind) => {
        if (item == element.name) {
          count += 1;
          likes[ind] = {...likes[ind], selected: true};
        }
      });
    });
    userProfile.personalities.map((item, index) => {
      personailty.map((element, ind) => {
        if (item == element.name) {
          count += 1;
          personailty[ind] = {...personailty[ind], selected: true};
        }
      });
    });

    this.setState({
      hobbies,
      lifeStyle,
      likes,
      personailty,
      counter: count,
    });
  };

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
          <Text style={styles.grayText}>{item.name}</Text>
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
          <Text style={styles.grayText}>{item.name}</Text>
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
          <Text style={styles.grayText}>{item.name}</Text>
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
    const {
      religion,
      gender,
      images,
      about,
      mode,
      preferences,
      prev_screen,
      uploadImages,
    } = this.props?.route?.params;
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
      //   this.setState({uploading: true});
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
      uploadImages.map((val, ind) => {
        if (val.updated) {
          if (val.image != '') {
            formData.append(`connect_image${ind}`, {
              uri: val.image,
              name: `${new Date().getTime().toString()}.jpg`,
              filename: new Date().getTime().toString() + '.jpg',
              type: 'image/jpg',
            });
          } else {
            formData.append(`connect_image${ind}`, '');
          }
        }
      });
      // formData.append(`image`, {
      //     uri: images,
      //     name: `${new Date().getTime().toString()}.jpg`,
      //     filename: new Date().getTime().toString() + '.jpg',
      //     type: 'image/jpg'
      // })
      formData.append('religion', religion[0]);
      formData.append('mode', 'Dating');
      formData.append('about', about);
      formData.append('gender_preference', gender);
      this.props.navigation.navigate(route.CONNECTEDITPROFILE4TH, formData);

      ConnectProfileFunction.createConnectProfile(
        formData,
        this.props.user.userData.token,
      )
        .then(res => {
          // this.setState({ uploading: false }, () => {
          //   this.props.authActions.getUserProfile(
          //     { token: this.props.user.userData.token },
          //     '',
          //     '',
          //   );
          // });
        })
        .catch(err => {
          // console.log('error is =-=-=-=->', err);
          this.setState({uploading: false});
        });
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
    this.props.navigation.navigate(route.CONNECTEDITPROFILE4TH);
  };

  render() {
    const {
      uploading,
      likes,
      personailty,
      counter,
      lifeStyle,
      hobbies,
      selectedPersonality,
      selectedLikes,
      selectedLifeStyle,
      selectedHobbies,
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
            <StatusBar backgroundColor={themeStyle.PINK} />
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: '30%'}}>
                <View style={styles.margin}>
                  <Text style={styles.headingText}>
                    Build your{' '}
                    <Text style={{color: themeStyle.PINK, fontWeight: 'bold'}}>
                      profile
                    </Text>
                  </Text>
                </View>
                <View style={{marginHorizontal: '2.5%'}}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.heading}>What are your interests</Text>
                    <Text style={styles.heading}>{counter}/5</Text>
                  </View>
                  <Text style={{...styles.desc, marginRight: '5%'}}>
                    Passions makes it easier to find who shares your
                    interests.Add 3-5 to your profile to make better connections
                  </Text>
                  {submit && (
                    <Text
                      style={[
                        commonStyle.errorText,
                        {paddingLeft: 0, marginLeft: 0},
                      ]}>
                      Please select at least 3 from below to describe yourself.
                    </Text>
                  )}
                  <View style={styles.inputConttainer}>
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
                  {/* <View style={styles.inputConttainer}>
                    <Text style={styles.heading1}>Likes</Text>
                    <FlatList
                      data={likes}
                      numColumns={0}
                      renderItem={({item, index}) =>
                        this.renderLikes(item, index)
                      }
                      contentContainerStyle={styles.contentContainer}
                      keyExtractor={item => item.name}
                      ItemSeparatorComponent={VerticalSpacer}
                    />
                  </View> */}
                </View>
                <View style={styles.btnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.lightDash}></View>
                    <View style={{width: 10}}></View>
                    <View style={styles.lightDash}></View>
                    <View style={{width: 10}}></View>
                    <View style={styles.darkDash}></View>
                    <View style={{width: 10}}></View>
                    <View style={styles.lightDash}></View>
                  </View>
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
