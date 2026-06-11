import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  TextInput,
  Keyboard,
  FlatList,
  LogBox,
  TouchableWithoutFeedback,
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ViewShot from 'react-native-view-shot';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {
  Container,
  UploadingModal,
  Icon,
  DeleteModal,
  SearchLocationModal,
} from '../../../../components/index';
import {HeaderRight} from './social.postfilter.component';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './style';
import {SocialServices} from '../../../../services';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
const FILTERS = [];
const alignViewValues = ['flex-end', 'flex-start', 'center'];
const alignIconValues = ['align-center', 'align-right', 'align-left'];
const fontsList = [
  'Gotham-Book',
  'Gotham-Medium',
  'Gotham-Bold',
  'Gotham-Light',
];
const colorsList = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];
const colorsListLocation = ['lightgrey', 'white', 'white'];

class StoryFilter extends Component {
  textPosition = {x: 0, y: 0};
  locationPosition = {x: 0, y: 0};
  mentionPostion = {x: 0, y: 0};

  constructor(props) {
    super(props);
    this.state = {
      myText: "I'm ready to get swiped!",
      userLat: this.props.user.userData.location
        ? this.props.user.userData.location.lat
        : 0,
      userLong: this.props.user.userData.location
        ? this.props.user.userData.location.long
        : 0,
      friends: [],
      gestureName: 'none',
      uploading: false,
      data: [],
      backgroundColor: '#fff',
      swipeCount: 0,
      fadeValue: false,
      saveImage: 'https://picsum.photos/200/300',
      textInput: [],
      alignIndex: 0,
      alignValue: 'center',
      inputText: '',
      fontIndex: 0,
      fontValue: 'Gotham-Book',
      pickColor: false,
      fontColor: 'red',
      textBackColor: false,
      textDrag: false,
      deletePosition: {
        x: 0,
        y: 0,
        area: 0,
      },
      stickerModel: false,
      showLocation: false,
      textFocus: false,
      showMention: false,
      showMentionList: false,
      hiderBar: false,
      showTextInput: false,
      pan: new Animated.ValueXY(),
      scaleText: new Animated.Value(1),
      scaleLocation: new Animated.Value(1),
      scaleMention: new Animated.Value(1),
      scaleTextTemp: new Animated.Value(1),
      heigtKeyboard: 0,
      mentionText: 'Mention',
      locationText: 'Location',
      locationTextColor: 'purple',
      locationBgColor: 'white',
      locationIndex: 0,
      mentionIndex: 0,
      mentionTextColor: 'orange',
      mentionBgColor: 'white',
      inputPosition: {
        x: 0,
        y: 0,
      },
      allowTextInputDrag: true,
      imageUri: this.props?.route?.params?.filterImage[0].uri,
      locationModal: false,
      latitude: '',
      longitude: '',
      data: [],
    };
    this.viewShotRef = React.createRef(null);
    this.textInputRef = React.createRef(null);

    this.position.addListener(latestPosition => {
      this.textPosition = latestPosition;
    });

    this.locationAnimationPosition.addListener(latestPosition => {
      this.locationPosition = latestPosition;
    });

    this.mentionAnimationPosition.addListener(latestPosition => {
      this.mentionPostion = latestPosition;
    });
  }

  componentDidMount() {
    this.getTagFriends();
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          // showFilterText={FILTERS[this.state.swipeCount].title}
          // onPressSticker={() => this.setState({ stickerModel: true, })}
          // onPressText={() => this.setState({ showTextInput: true })}
          onPressArrow={() => this.onExtractImage()}
          // TextFoucs={this.state.textFocus}
          // OnPressAlignText={() => this.alignTextFunc()}
          // OnPressShowTextColors={() => this.showColorList()}
          // OnPressShowTextBgColors={() => this.showBackColorsList()}
          // OnPressDone={() => this.blurTextInput()}
        />
      ),
    });
  }

  handleChange = text => {
    this.setState({
      inputText: text,
    });
  };

  onSwipeLeft(gestureState) {
    let newText = `You swiped left! ${this.state.swipeCount}`;
    this.setState({myText: newText});
  }

  onSwipeRight(gestureState) {
    let newText = `You swiped right! ${this.state.swipeCount}`;
    this.setState({myText: newText});
    // this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    const {swipeCount} = this.state;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({swipeCount: swipeCount == 26 ? 0 : swipeCount + 1});
        break;
      case SWIPE_RIGHT:
        this.setState({swipeCount: swipeCount == 0 ? 0 : swipeCount - 1});
        break;
    }
  }

  onExtractImage = async () => {
    // this.setState({ hiderBar: true, uploading: true });
    const {locationText, latitude, longitude, friends} = this.state;
    let imageToSend = this.props?.route?.params?.filterImage;
    this.viewShotRef.current.capture().then(uri => {
      imageToSend[0].uri = uri;
      let array = [];
      array.push({
        uri: uri,
        name: `${new Date().getTime().toString()}.jpg`,
        filename: new Date().getTime().toString() + '.jpg',
        type: 'image/jpg',
      });
      this.props.navigation.navigate(route.SOCIALPOST1, {
        createStory: false,
        postImage: array,
      });

      // this.props.navigation.navigate(route.SOCIALPOST, { createStory: true,filterImage:imageToSend })
    });
  };
  position = new Animated.ValueXY();
  locationAnimationPosition = new Animated.ValueXY();
  mentionAnimationPosition = new Animated.ValueXY();

  pointsDistance = ([xA, yA], [xB, yB]) => {
    return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
  };
  // TextInput Gestures
  panResponder = PanResponder.create({
    // For having native touches
    onMoveShouldSetResponderCapture: () => this.state.allowTextInputDrag,
    onMoveShouldSetPanResponderCapture: () => this.state.allowTextInputDrag,
    onMoveShouldSetPanResponder: () => this.state.allowTextInputDrag,
    // onStartShouldSetPanResponder: ()=>true,
    onPanResponderMove: (e, gestureState) => {
      const touches = e.nativeEvent.touches;
      this.setState({
        textDrag: true,
      });

      // Zoom Condition
      if (touches.length >= 2) {
        const touchA = touches[0];
        const touchB = touches[1];

        const distance = this.pointsDistance(
          [touchA.pageX, touchA.pageY],
          [touchB.pageX, touchB.pageY],
        );

        const screenMovedPercents = distance / SCREEN_WIDTH;

        Animated.spring(this.state.scaleText, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
        // tempZoom=1 + screenMovedPercents * 3;
        // scale.setValue();
      }

      // Delete Item Condition
      // if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
      //   if (
      //     e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
      //     e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
      //   ) {
      //     const newPosition = {x: gestureState.dx, y: gestureState.dy};
      //     this.position.setValue(newPosition);
      //   } else {
      //     const newPosition = {x: gestureState.dx, y: gestureState.dy};
      //     this.position.setValue(newPosition);
      //   }
      // }

      // Drag Condition
      else {
        // Animated.spring(
        //   this.state.scaleText,
        //   { toValue: 1, friction: 3 }
        // ).start();
        // this.setState({
        //   scaleText:this.state.scaleTextTemp
        // });
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.position.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.position.setOffset({x: this.textPosition.x, y: this.textPosition.y});
      this.position.setValue({x: 0, y: 0});
      // Animated.spring(
      //   this.state.scaleText,
      //   { toValue: 1.4, friction: 3 }
      // ).start();
    },
    onPanResponderEnd: (e, gestureState) => {
      if (e.nativeEvent.pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.pageX > this.state.deletePosition.x &&
          e.nativeEvent.pageX < this.state.deletePosition.area
        ) {
          const newPosition = {
            x: 0,
            y: 0,
          };
          this.position.setValue(newPosition);
          this.position.flattenOffset();
          this.setState({
            showTextInput: false,
            textDrag: false,
            scaleText: new Animated.Value(1),
          });
        }
        // else
        // {
        //   const newPosition = {x: gestureState.dx, y: gestureState.dy};
        //   this.position.setValue(newPosition);
        // }
      } else {
        this.setState({
          textDrag: false,
        });
        this.position.flattenOffset();
      }

      // Animated.spring(this.state.scaleText, { toValue: 1, friction: 3 }).start();
    },
  });
  // LocatioN Gestures
  locationResponder = PanResponder.create({
    // For having native touches
    onMoveShouldSetPanResponder: () => true,
    // onStartShouldSetPanResponder: ()=>true,
    onPanResponderMove: (e, gestureState) => {
      const touches = e.nativeEvent.touches;
      this.setState({
        textDrag: true,
      });
      // const newPosition = {x: gestureState.dx, y: gestureState.dy};
      // this.locationAnimationPosition.setValue(newPosition);
      if (touches.length >= 2) {
        const touchA = touches[0];
        const touchB = touches[1];

        const distance = this.pointsDistance(
          [touchA.pageX, touchA.pageY],
          [touchB.pageX, touchB.pageY],
        );

        const screenMovedPercents = distance / SCREEN_WIDTH;

        // Animated.spring(
        //   this.state.scaleLocation,
        //   { toValue: 1 + screenMovedPercents * 3, friction: 3 }
        // ).start();

        Animated.spring(this.state.scaleLocation, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
        // tempZoom=1 + screenMovedPercents * 3;
        // scale.setValue();
      }

      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
          // this.setState({
          //   scaleTextTemp:this.state.scaleText,
          //   scaleText:0.5
          // });
          // Animated.spring(
          //   this.state.scaleText,
          //   { toValue: 0.5, friction: 3 }
          // ).start();
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.locationAnimationPosition.setValue(newPosition);
        } else {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.locationAnimationPosition.setValue(newPosition);
        }
      }

      // Drag Condition
      else {
        // Animated.spring(
        //   this.state.scaleText,
        //   { toValue: 1, friction: 3 }
        // ).start();
        // this.setState({
        //   scaleText:this.state.scaleTextTemp
        // });
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.locationAnimationPosition.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.locationAnimationPosition.setOffset({
        x: this.locationPosition.x,
        y: this.locationPosition.y,
      });
      this.locationAnimationPosition.setValue({x: 0, y: 0});
      // Animated.spring(
      //   this.state.scaleLocation,
      //   { toValue: 1.4, friction: 3 }
      // ).start();
    },
    onPanResponderEnd: (e, gestureState) => {
      const {x, y, area} = this.state.deletePosition;

      this.setState({
        textDrag: false,
      });
      if (e.nativeEvent.pageY > y) {
        if (e.nativeEvent.pageX > x && e.nativeEvent.pageX < area) {
          const newPosition = {x: 0, y: 0};
          this.locationAnimationPosition.setValue(newPosition);
          this.setState({
            showLocation: false,
            textDrag: false,
            scaleLocation: new Animated.Value(1),
          });
          this.locationAnimationPosition.flattenOffset();
        }
        // else
        // {
        //   const newPosition = {x: gestureState.dx, y: gestureState.dy};
        //   this.position.setValue(newPosition);
        // }
      } else {
        this.setState({
          textDrag: false,
        });
        this.locationAnimationPosition.flattenOffset();
      }
      // this.locationAnimationPosition.flattenOffset();
      // Animated.spring(this.state.scaleLocation, { toValue: 1, friction: 3 }).start();
    },
  });
  // Mention Gestuers
  mentionResponder = PanResponder.create({
    // For having native touches
    onMoveShouldSetPanResponder: () => true,
    // onStartShouldSetPanResponder: ()=>true,
    onPanResponderMove: (e, gestureState) => {
      const touches = e.nativeEvent.touches;
      this.setState({
        textDrag: true,
      });
      if (touches.length >= 2) {
        const touchA = touches[0];
        const touchB = touches[1];

        const distance = this.pointsDistance(
          [touchA.pageX, touchA.pageY],
          [touchB.pageX, touchB.pageY],
        );

        const screenMovedPercents = distance / SCREEN_WIDTH;

        Animated.spring(this.state.scaleMention, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
        // tempZoom=1 + screenMovedPercents * 3;
        // scale.setValue();
      }
      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
          // this.setState({
          //   scaleTextTemp:this.state.scaleText,
          //   scaleText:0.5
          // });
          // Animated.spring(
          //   this.state.scaleText,
          //   { toValue: 0.5, friction: 3 }
          // ).start();
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.mentionAnimationPosition.setValue(newPosition);
        } else {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.mentionAnimationPosition.setValue(newPosition);
        }
      }
      // Drag Condition
      else {
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.mentionAnimationPosition.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.mentionAnimationPosition.setOffset({
        x: this.mentionPostion.x,
        y: this.mentionPostion.y,
      });
      this.mentionAnimationPosition.setValue({x: 0, y: 0});
      // Animated.spring(
      //   this.state.scaleLocation,
      //   { toValue: 1.4, friction: 3 }
      // ).start();
    },
    onPanResponderEnd: (e, gestureState) => {
      const {x, y, area} = this.state.deletePosition;
      if (e.nativeEvent.pageY > y) {
        if (e.nativeEvent.pageX > x && e.nativeEvent.pageX < area) {
          const newPosition = {x: 0, y: 0};
          this.mentionAnimationPosition.setValue(newPosition);
          this.mentionAnimationPosition.flattenOffset();
          this.setState({
            showMention: false,
            textDrag: false,
            scaleMention: new Animated.Value(1),
            mentionIndex: 0,
            mentionTextColor: colorsList[this.state.mentionIndex],
            mentionBgColor: colorsListLocation[this.state.mentionIndex],
          });
          alert('Deleted >>>>>');
        }
      } else {
        this.setState({
          textDrag: false,
        });
        this.mentionAnimationPosition.flattenOffset();
      }
    },
  });
  alignTextFunc = () => {
    const {alignIndex} = this.state;
    if (alignIndex == 2) {
      this.setState(
        {
          alignIndex: 0,
        },
        this.setState({
          alignValue: alignViewValues[alignIndex],
        }),
      );
    } else {
      this.setState(
        {
          alignIndex: alignIndex + 1,
        },
        this.setState({
          alignValue: alignViewValues[alignIndex],
        }),
      );
    }
  };

  renderFonts = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 20,
          width: SCREEN_WIDTH * 0.1,
          height: SCREEN_HEIGHT * 0.05,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.changeFont(item);
          }}>
          <Text style={{color: 'white', fontSize: 15, fontFamily: item}}>
            Aa
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderColors = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: item,
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => {
          this.changeColor(item);
        }}>
        <View>
          {/* <Text style={{color:'white',fontSize:15,fontFamily:item}}></Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  renderFriends = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => {
          this.setState({
            showMentionList: false,
            friends: [item],
            mentionText: item?.username,
            showMention: true,
          });
        }}>
        <FastImage
          source={{
            uri:
              item?.image == ''
                ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                : item.image,
          }}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </TouchableOpacity>
    );
  };

  changeFont = item => {
    this.textInputRef.current.setNativeProps({
      style: {
        fontFamily: item,
      },
    });
  };

  changeColor = item => {
    if (this.state.textBackColor) {
      this.textInputRef.current.setNativeProps({
        style: {
          backgroundColor: item,
        },
      });
    } else {
      this.textInputRef.current.setNativeProps({
        style: {
          color: item,
        },
      });
    }
  };

  showColorList = () => {
    if (this.state.textBackColor) {
      this.setState({
        // pickColor: !this.state.pickColor,
        textBackColor: false,
      });
    } else {
      this.setState({
        pickColor: !this.state.pickColor,
      });
    }
  };

  showBackColorsList = () => {
    if (this.state.pickColor) {
      if (this.state.textBackColor) {
        this.setState({
          textBackColor: !this.state.textBackColor,
          pickColor: !this.state.pickColor,
        });
      } else {
        this.setState({
          textBackColor: !this.state.textBackColor,
        });
      }
    } else {
      this.setState({
        textBackColor: !this.state.textBackColor,
        pickColor: !this.state.pickColor,
      });
    }
  };

  onLayout = event => {
    const {x, y, width} = event.nativeEvent.layout;
    let area = x + width;
    this.setState({
      deletePosition: {
        x,
        y,
        area,
      },
    });
  };

  renderLocation = () => {
    if (this.state.textInput.length == 1) {
      this.textInputRef.current.setNativeProps({
        style: {
          marginBottom: 0,
        },
      });
      this.setState({
        stickerModel: false,
        showLocation: true,
      });
    } else {
      this.setState({
        stickerModel: false,
        showLocation: true,
      });
    }
  };

  renderMention = () => {
    if (this.state.textInput.length == 1) {
      this.textInputRef.current.setNativeProps({
        style: {
          marginBottom: 0,
        },
      });
      this.setState({
        stickerModel: false,
        showMention: true,
      });
    } else {
      this.setState({
        stickerModel: false,
        showMention: true,
      });
    }
  };

  foucusTextInput = () => {
    const temp = this.state.scaleText;

    this.setState({
      textFocus: true,
      // scaleText:new Animated.Value(1),
      inputPosition: {
        x: this.textPosition.x,
        y: this.textPosition.y,
      },
      allowTextInputDrag: false,
    });

    // Animated.spring(this.state.scaleText, { toValue: 1, friction: 3 }).start();
    const newPosition = {x: 0, y: 0};
    this.position.setValue(newPosition);
  };

  blurTextInput = () => {
    this.setState({
      textFocus: false,
      allowTextInputDrag: true,
    });
    const newPosition = {
      x: this.state.inputPosition.x,
      y: this.state.inputPosition.y,
    };
    this.position.setValue(newPosition);
    Keyboard.dismiss();
    // Animated.spring(this.state.scaleText, { toValue: this.state.scaleTextTemp, friction: 3 }).start();
  };

  locationClickHandler = () => {
    const {locationIndex} = this.state;
    if (locationIndex == 2) {
      this.setState({
        locationIndex: 0,
        locationTextColor: colorsList[locationIndex],
        locationBgColor: colorsListLocation[locationIndex],
      });
    } else {
      this.setState({
        locationIndex: locationIndex + 1,
        locationTextColor: colorsList[locationIndex],
        locationBgColor: colorsListLocation[locationIndex],
      });
    }
  };

  mentionClickHandler = () => {
    const {mentionIndex} = this.state;
    if (mentionIndex == 2) {
      this.setState({
        mentionIndex: 0,
        mentionTextColor: colorsList[mentionIndex],
        mentionBgColor: colorsListLocation[mentionIndex],
      });
    } else {
      this.setState({
        mentionIndex: mentionIndex + 1,
        mentionTextColor: colorsList[mentionIndex],
        mentionBgColor: colorsListLocation[mentionIndex],
      });
    }
  };

  async goMap(data, details) {
    let searchObj = {
      searchData: data,
      searchDetails: details,
    };
    this.setState({
      locationText: searchObj.searchDetails.formatted_address,
      latitude: searchObj.searchDetails.geometry.location.lat,
      longitude: searchObj.searchDetails.geometry.location.lng,
      locationModal: false,
    });
    const urlData = this.state.locationText.split(',');
    this.setState({locationText: urlData[0]});
    this.renderLocation();
  }

  getTagFriends = () => {
    SocialServices.getTagUsers(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data});
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      swipeCount,
      imageUri,
      locationModal,
      locationText,
      userLat,
      userLong,
      uploading,
      textFocus,
      pickColor,
      data,
      textDrag,
      showMentionList,
      stickerModel,
      showLocation,
      showMention,
      hiderBar,
      showTextInput,
      scaleText,
      scaleLocation,
      alignValue,
      scaleMention,
      mentionText,
      locationTextColor,
      locationBgColor,
      mentionTextColor,
      mentionBgColor,
      scaleTextTemp,
    } = this.state;
    const SelectedFilterComponent = FILTERS[swipeCount].filterComponent;
    const config = {velocityThreshold: 0.3, directionalOffsetThreshold: 100};
    return (
      <Container>
        <ViewShot
          ref={this.viewShotRef}
          options={{format: 'jpg', quality: 0.9}}
          style={{height: SCREEN_HEIGHT * 0.8}}
          keyboardShouldPersistTaps={true}>
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={state => this.onSwipeLeft(state)}
            onSwipeRight={state => this.onSwipeRight(state)}
            config={config}
            style={{
              flex: 1,
              // backgroundColor: 'red',
            }}>
            {textFocus && (
              <View>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: themeStyle.COLOR_BLACK,
                    height: SCREEN_HEIGHT * 0.06,
                    width: SCREEN_WIDTH,
                  }}>
                  <TouchableOpacity onPress={() => this.alignTextFunc()}>
                    <Icon.Feather
                      name={alignIconValues[this.state.alignIndex]}
                      size={25}
                      color={themeStyle.PRIMARY_TINT_COLOR}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.showColorList()}>
                    <Icon.MaterialCommunityIcons
                      name="format-text"
                      size={25}
                      color={themeStyle.PRIMARY_TINT_COLOR}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.showBackColorsList()}>
                    <Icon.Ionicons
                      name="color-fill-outline"
                      size={25}
                      color={themeStyle.PRIMARY_TINT_COLOR}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.blurTextInput();
                    }}>
                    <Text
                      style={{
                        fontFamily: themeStyle.FONT_REGULAR,
                        color: themeStyle.PRIMARY_TINT_COLOR,
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {swipeCount == 0 ? (
              <FastImage
                style={{
                  height: SCREEN_HEIGHT * 0.8,
                  width: SCREEN_WIDTH,
                  alignSelf: 'center',
                }}
                source={{uri: imageUri}}
                resizeMode={'contain'}
              />
            ) : (
              <SelectedFilterComponent
                image={
                  <Image
                    style={{
                      height: SCREEN_HEIGHT * 0.8,
                      width: SCREEN_WIDTH,
                      alignSelf: 'center',
                    }}
                    source={{uri: imageUri}}
                    resizeMode={'contain'}
                  />
                }
              />
            )}
          </GestureRecognizer>
          <View style={{marginBottom: SCREEN_HEIGHT * 0.35}}>
            {showTextInput && (
              <Animated.View
                style={[
                  this.position.getLayout(),
                  {
                    zIndex: 2,
                    transform: [{scale: textFocus ? scaleTextTemp : scaleText}],
                    marginHorizontal: SCREEN_WIDTH * 0.04,
                    alignSelf: alignValue,
                  },
                ]}
                {...this.panResponder.panHandlers}>
                <TextInput
                  style={{
                    flexWrap: 'wrap',
                    fontSize: 20,
                    color: 'powderblue',
                    fontFamily: this.state.fontValue,
                    borderRadius: 5,
                    padding: 20,
                    zIndex: 1,
                  }}
                  autoFocus={true}
                  onFocus={() => {
                    this.foucusTextInput();
                  }}
                  onBlur={() => null}
                  returnKeyType="next"
                  multiline={true}
                  ref={this.textInputRef}
                  onChangeText={text => this.handleChange(text)}
                  value={this.state.inputText}
                />
              </Animated.View>
            )}

            {showLocation && (
              <Animated.View
                style={[
                  this.locationAnimationPosition.getLayout(),
                  {zIndex: 1, transform: [{scale: scaleLocation}]},
                ]}
                {...this.locationResponder.panHandlers}>
                <TouchableWithoutFeedback
                  onPress={() => this.locationClickHandler()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: locationBgColor,
                      width: SCREEN_WIDTH * 0.5,
                      alignSelf: 'center',
                      padding: 5,
                    }}>
                    {/* Icon */}
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon.Ionicons
                        name="location-sharp"
                        size={20}
                        color={locationTextColor}
                      />
                    </View>
                    {/* Text */}
                    <View style={{flex: 0.8}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: locationTextColor,
                          fontSize: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {locationText}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            )}

            {showMention && (
              <Animated.View
                style={[
                  this.mentionAnimationPosition.getLayout(),
                  {zIndex: 1, transform: [{scale: scaleMention}]},
                ]}
                {...this.mentionResponder.panHandlers}>
                <TouchableWithoutFeedback
                  onPress={() => this.mentionClickHandler()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: mentionBgColor,
                      width: SCREEN_WIDTH * 0.35,
                      alignSelf: 'center',
                      padding: 5,
                    }}>
                    {/* Icon */}
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: mentionTextColor, fontSize: 20}}>
                        @
                      </Text>
                    </View>
                    {/* Text */}
                    <View style={{flex: 0.8}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{color: mentionTextColor, fontSize: 20}}>
                        {mentionText}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            )}
          </View>

          {textDrag && (
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                top: SCREEN_HEIGHT * 0.7,
                width: 50,
                height: 50,
                backgroundColor: themeStyle.COLOR_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                marginLeft: 14,
              }}
              onLayout={this.onLayout}>
              <Icon.Ionicons
                name="trash-bin-sharp"
                size={20}
                color={themeStyle.COLOR_RED}
              />
            </View>
          )}

          <Modal animationType="fade" transparent={true} visible={stickerModel}>
            {/* Main Container */}
            <View
              style={{
                alignSelf: 'center',
                height: SCREEN_HEIGHT * 0.5,
                width: SCREEN_WIDTH * 0.94,
                backgroundColor: themeStyle.COLOR_WHITE,
                marginTop: SCREEN_HEIGHT * 0.4,
                borderRadius: 20,
                paddingTop: 10,
                paddingHorizontal: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconStyleClose}>
                  <TouchableOpacity
                    onPress={() => this.setState({stickerModel: false})}>
                    <Icon.AntDesign
                      name="close"
                      size={24}
                      color={themeStyle.PRIMARY_TINT_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* One Row */}
              <View style={{flexDirection: 'row'}}>
                <View style={{marginHorizontal: 5}}>
                  <TouchableOpacity
                    disabled={showLocation ? true : false}
                    onPress={() => {
                      this.setState({stickerModel: false, locationModal: true});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: themeStyle.COLOR_WHITE,
                        width: SCREEN_WIDTH * 0.35,
                        padding: 5,
                      }}>
                      {/* Icon */}
                      <View
                        style={{
                          flex: 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon.Ionicons
                          name="location-sharp"
                          size={20}
                          color="purple"
                        />
                      </View>
                      {/* Text */}
                      <View style={{flex: 0.8}}>
                        <Text style={{color: 'purple'}}>Location</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{marginHorizontal: 5}}>
                  <TouchableOpacity
                    disabled={showMention ? true : false}
                    onPress={() => {
                      this.setState({
                        stickerModel: false,
                        showMentionList: true,
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'orange',
                        width: SCREEN_WIDTH * 0.35,
                        padding: 5,
                      }}>
                      {/* Icon */}
                      <View
                        style={{
                          flex: 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>@</Text>
                      </View>
                      {/* Text */}
                      <View style={{flex: 0.8}}>
                        <Text>Mention</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ViewShot>
        {showMentionList ? (
          data.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                bottom: SCREEN_HEIGHT * 0.3,
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                renderItem={this.renderFriends}
                // contentContainerStyle={{width:SCREEN_WIDTH}}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <Text>No friends to tag</Text>
          )
        ) : null}

        {textFocus ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: SCREEN_HEIGHT * 0.8,
            }}>
            {pickColor ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={colorsList}
                renderItem={this.renderColors}
                // contentContainerStyle={{width:SCREEN_WIDTH}}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={fontsList}
                renderItem={this.renderFonts}
                // contentContainerStyle={{width:SCREEN_WIDTH}}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
            {/* <View style={{backgroundColor:'yellow',height:100,width:100}}/> */}
          </View>
        ) : null}
        <SearchLocationModal
          onClose={() => this.setState({locationModal: false})}
          visible={locationModal}
          onPress={(data, details) => this.goMap(data, details)}
          lati={userLat}
          longi={userLong}
        />
        <UploadingModal visible={uploading} />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(StoryFilter);
