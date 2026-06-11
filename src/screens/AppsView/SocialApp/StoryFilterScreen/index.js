import React, {Component} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  PanResponder,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import {Input} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  AdenCompat,
  BrannanCompat,
  BrooklynCompat,
  ClarendonCompat,
  EarlybirdCompat,
  GinghamCompat,
  HudsonCompat,
  InkwellCompat,
  KelvinCompat,
  LarkCompat,
  LofiCompat,
  MavenCompat,
  MayfairCompat,
  MoonCompat,
  NashvilleCompat,
  PerpetuaCompat,
  ReyesCompat,
  RiseCompat,
  SlumberCompat,
  StinsonCompat,
  ToasterCompat,
  ValenciaCompat,
  WaldenCompat,
  WillowCompat,
  Xpro2Compat,
  _1977Compat,
} from 'react-native-image-filter-kit';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ViewShot from 'react-native-view-shot';
import {connect} from 'react-redux';
import themeStyle from '../../../../assets/styles/theme.style';
import ModalClose from '../../../../assets/svg/modalClose.svg';
import StoryQuestion from '../../../../assets/svg/questionStory.svg';
import StoryAdd from '../../../../assets/svg/storyAdd.svg';
import StoryBack from '../../../../assets/svg/storyBack.svg';
import StoryEmoji from '../../../../assets/svg/storyEmoji.svg';
import StoryLink from '../../../../assets/svg/storyLink.svg';
import StoryLocation from '../../../../assets/svg/storyLocation.svg';
import StoryMention from '../../../../assets/svg/storyMention.svg';
import StoryPoll from '../../../../assets/svg/storyPoll.svg';
import StoryText from '../../../../assets/svg/storyText.svg';
import Button from '../../../../components/Button';
import emojis from '../../../../assets/emojis';

import {
  Container,
  Icon,
  SearchLocationModal,
  UploadingModal,
} from '../../../../components/index';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {SocialServices} from '../../../../services';
import {HeaderRight} from './social.storyfilter.component';
import styles from './style';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
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
  questionPosition = {x: 0, y: 0};
  pollPosition = {x: 0, y: 0};
  mentionPostion = {x: 0, y: 0};
  linkPosition = {x: 0, y: 0};
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
      scaleQuestion: new Animated.Value(1),
      showQuestion: false,
      scalePoll: new Animated.Value(1),
      showPoll: false,
      scaleLink: new Animated.Value(1),
      showLink: false,
      heigtKeyboard: 0,
      mentionText: 'Mention',
      locationText: '',
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
      textVisible: false,
      addVisible: false,
      emojiVisible: false,
      locationVisible: false,
      mentionVisible: false,
      linkVisible: false,
      pollVisible: false,
      questionVisible: false,
      tagFriendsList: [],
      poll: {
        text: '',
        choices: [],
      },
      createStory: {
        text: '',
        choices: [],
        file: '',
        multimedia_type: 'image',
        type: 'multimedia',
        location: '',
        lat: 0,
        long: 0,
        tagFriends: [],
      },
    };
    this.viewShotRef = React.createRef(null);
    this.textInputRef = React.createRef(null);

    this.position.addListener(latestPosition => {
      this.textPosition = latestPosition;
    });

    this.locationAnimationPosition.addListener(latestPosition => {
      this.locationPosition = latestPosition;
    });
    this.questionAnimationPosition.addListener(latestPosition => {
      this.questionPosition = latestPosition;
    });
    this.pollAnimationPosition.addListener(latestPosition => {
      this.pollPosition = latestPosition;
    });
    this.linkAnimationPosition.addListener(latestPosition => {
      this.linkPosition = latestPosition;
    });
    this.mentionAnimationPosition.addListener(latestPosition => {
      this.mentionPostion = latestPosition;
    });
  }

  componentDidMount() {
    this.getTagFriends();
    this.props.navigation.setOptions({
      headerShown: false,
      headerRight: () => (
        <HeaderRight
          showFilterText={FILTERS[this.state.swipeCount].title}
          onPressSticker={() => this.setState({stickerModel: true})}
          onPressText={() => this.setState({showTextInput: true})}
          onPressArrow={() => this.onExtractImage()}
          TextFoucs={this.state.textFocus}
          OnPressAlignText={() => this.alignTextFunc()}
          OnPressShowTextColors={() => this.showColorList()}
          OnPressShowTextBgColors={() => this.showBackColorsList()}
          OnPressDone={() => this.blurTextInput()}
        />
      ),
    });
  }

  handleChange = text => {
    this.setState({
      inputText: text,
      createStory: {
        ...this.state.createStory,
        type: 'status',
        text: text,
      },
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
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
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
    this.setState({
      hiderBar: true,
      uploading: true,
      showMention: false,
      showQuestion: false,
      showPoll: false,
    });
    const {
      locationText,
      latitude,
      longitude,
      friends,
      inputText,
      tagFriendsList,
    } = this.state;
    const {text, choices, file, multimedia_type, type, location, lat, long} =
      this.state.createStory;
    let imageToSend = this.props?.route?.params?.filterImage;
    this.viewShotRef.current.capture().then(uri => {
      imageToSend[0].uri = uri;
      if (imageToSend.length > 0) {
        let formData = new FormData();
        text != '' &&
          formData.append(
            'text',
            inputText ? inputText : text ? text : 'Hello World',
          );
        type != '' &&
          formData.append('type', type == 'multimedia' ? 'status' : type);
        lat != 0 && formData.append('lat', lat);
        long != 0 && formData.append('long', long);
        (location != '') & (lat != 0) &&
          long != 0 &&
          formData.append('location', location);
        if (choices.length >= 1) {
          choices.map((item, index) => {
            formData.append(`choices[${index}]`, item);
          });
        }
        if (tagFriendsList.length >= 1) {
          tagFriendsList.map((item, index) => {
            formData.append(`tag_users[${index}]`, item._id);
          });
        }
        imageToSend.map((val, ind) => {
          formData.append(`background`, val);
          formData.append('backgroundType', multimedia_type);
        });
        SocialServices.createStory(formData, this.props.user.userData.token)
          .then(response => {
            if (response.data.code == 200) {
              this.setState({uploading: false});
              this.props.navigation.navigate(route.HOMESCREEN);
            }
          })
          .catch(err => {
            // console.log('FAILED RESPONSE>>>>>>>123', err?.response.data);
            this.setState({uploading: false});
          });
      }
    });
  };
  position = new Animated.ValueXY();
  locationAnimationPosition = new Animated.ValueXY();
  questionAnimationPosition = new Animated.ValueXY();
  mentionAnimationPosition = new Animated.ValueXY();
  pollAnimationPosition = new Animated.ValueXY();
  linkAnimationPosition = new Animated.ValueXY();
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
      } else {
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.position.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.position.setOffset({x: this.textPosition.x, y: this.textPosition.y});
      this.position.setValue({x: 0, y: 0});
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
      } else {
        this.setState({
          textDrag: false,
        });
        this.locationAnimationPosition.flattenOffset();
      }
    },
  });
  // POll Gestures
  pollResponder = PanResponder.create({
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

        Animated.spring(this.state.scalePoll, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
      }

      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.pollAnimationPosition.setValue(newPosition);
        } else {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.pollAnimationPosition.setValue(newPosition);
        }
      }

      // Drag Condition
      else {
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.pollAnimationPosition.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.pollAnimationPosition.setOffset({
        x: this.pollPosition.x,
        y: this.pollPosition.y,
      });
      this.pollAnimationPosition.setValue({x: 0, y: 0});
    },
    onPanResponderEnd: (e, gestureState) => {
      const {x, y, area} = this.state.deletePosition;

      this.setState({
        textDrag: false,
      });
      if (e.nativeEvent.pageY > y) {
        if (e.nativeEvent.pageX > x && e.nativeEvent.pageX < area) {
          const newPosition = {x: 0, y: 0};
          this.pollAnimationPosition.setValue(newPosition);
          this.setState({
            showPoll: false,
            textDrag: false,
            scalePoll: new Animated.Value(1),
          });
          this.pollAnimationPosition.flattenOffset();
        }
      } else {
        this.setState({
          textDrag: false,
        });
        this.pollAnimationPosition.flattenOffset();
      }
    },
  });

  // Link Gestures
  linkResponder = PanResponder.create({
    // For having native touches
    onMoveShouldSetPanResponder: () => true,
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

        Animated.spring(this.state.scaleLink, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
      }

      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.linkAnimationPosition.setValue(newPosition);
        } else {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.linkAnimationPosition.setValue(newPosition);
        }
      }

      // Drag Condition
      else {
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.linkAnimationPosition.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.linkAnimationPosition.setOffset({
        x: this.linkPosition.x,
        y: this.linkPosition.y,
      });
      this.linkAnimationPosition.setValue({x: 0, y: 0});
    },
    onPanResponderEnd: (e, gestureState) => {
      const {x, y, area} = this.state.deletePosition;

      this.setState({
        textDrag: false,
      });
      if (e.nativeEvent.pageY > y) {
        if (e.nativeEvent.pageX > x && e.nativeEvent.pageX < area) {
          const newPosition = {x: 0, y: 0};
          this.linkAnimationPosition.setValue(newPosition);
          this.setState({
            showLink: false,
            textDrag: false,
            scaleLink: new Animated.Value(1),
          });
          this.linkAnimationPosition.flattenOffset();
        }
      } else {
        this.setState({
          textDrag: false,
        });
        this.linkAnimationPosition.flattenOffset();
      }
    },
  });
  // Question Gestures
  questionResponder = PanResponder.create({
    // For having native touches
    onMoveShouldSetPanResponder: () => true,
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

        Animated.spring(this.state.scaleQuestion, {
          toValue: screenMovedPercents * 3,
          friction: 3,
        }).start();
      }

      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.questionAnimationPosition.setValue(newPosition);
        } else {
          const newPosition = {x: gestureState.dx, y: gestureState.dy};
          this.questionAnimationPosition.setValue(newPosition);
        }
      }

      // Drag Condition
      else {
        const newPosition = {x: gestureState.dx, y: gestureState.dy};
        this.questionAnimationPosition.setValue(newPosition);
      }
    },
    onPanResponderGrant: () => {
      this.questionAnimationPosition.setOffset({
        x: this.questionPosition.x,
        y: this.questionPosition.y,
      });
      this.questionAnimationPosition.setValue({x: 0, y: 0});
    },
    onPanResponderEnd: (e, gestureState) => {
      const {x, y, area} = this.state.deletePosition;

      this.setState({
        textDrag: false,
      });
      if (e.nativeEvent.pageY > y) {
        if (e.nativeEvent.pageX > x && e.nativeEvent.pageX < area) {
          const newPosition = {x: 0, y: 0};
          this.questionAnimationPosition.setValue(newPosition);
          this.setState({
            showQuestion: false,
            textDrag: false,
            scaleQuestion: new Animated.Value(1),
          });
          this.questionAnimationPosition.flattenOffset();
        }
      } else {
        this.setState({
          textDrag: false,
        });
        this.questionAnimationPosition.flattenOffset();
      }
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
      }
      // Delete Item Condition
      if (e.nativeEvent.touches[0].pageY > this.state.deletePosition.y) {
        if (
          e.nativeEvent.touches[0].pageX > this.state.deletePosition.x &&
          e.nativeEvent.touches[0].pageX < this.state.deletePosition.area
        ) {
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
          alert('Deleted');
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
          borderTopLeftRadius: index == 0 ? 10 : 0,
          borderBottomLeftRadius: index == 0 ? 10 : 0,
          borderTopRightRadius: index == colorsList.length - 1 ? 10 : 0,
          borderBottomRightRadius: index == colorsList.length - 1 ? 10 : 0,
          width: 44,
          height: 47,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 0.5,
        }}
        onPress={() => {
          this.setState({textColor: item});
          this.textInputRef.current.setNativeProps({
            style: {
              color: item,
            },
          });
        }}>
        <View></View>
      </TouchableOpacity>
    );
  };
  renderBackgroundColor = ({item, index}) => {
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
          this.setState({textBackColor: item});
          this.textInputRef.current.setNativeProps({
            style: {
              backgroundColor: item,
            },
          });
        }}></TouchableOpacity>
    );
  };

  renderBackgroundColor1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: item,
          borderRadius: 10,
          width: '23%',
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          borderWidth: this.state.imageBackColor == item ? 2 : 0,
          borderColor: this.state.imageBackColor ? '#000' : item,
        }}
        onPress={() => {
          this.setState({imageBackColor: item});
        }}></TouchableOpacity>
    );
  };
  renderFriends = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 5,
          flexDirection: 'row',
        }}
        onPress={() => {
          this.setState({
            tagFriendsList: [...this.state?.tagFriendsList, item],
          });
        }}>
        <FastImage
          source={{
            uri:
              item?.image == ''
                ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                : item.image,
          }}
          style={{height: 40, width: 40, borderRadius: 25}}
        />
        <Text
          style={{
            fontSize: 12,
            color: themeStyle.COLOR_BLACK,
            fontFamily: themeStyle.FONT_REGULAR,
          }}>
          {item?.username}
        </Text>
      </TouchableOpacity>
    );
  };

  renderFriend = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => {}}>
        <FastImage
          source={{
            uri:
              item?.image == ''
                ? 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                : item.image,
          }}
          style={{height: 60, width: 60, borderRadius: 25}}
        />
      </TouchableOpacity>
    );
  };

  changeFont = item => {
    this.setState({fontValue: item});
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
      inputPosition: {
        x: this.textPosition.x,
        y: this.textPosition.y,
      },
      allowTextInputDrag: false,
    });

    const newPosition = {x: 0, y: 0};
    this.position.setValue(newPosition);
  };

  blurTextInput = () => {
    this.setState({
      showTextInput: true,
      allowTextInputDrag: true,
    });
    const newPosition = {
      x: this.state.inputPosition.x,
      y: this.state.inputPosition.y,
    };
    this.position.setValue(newPosition);
    Keyboard.dismiss();
    this.setState({textVisible: false});
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
    const urlData = this.state.locationText?.split(',');
    this.setState({locationText: urlData[0]});
  }

  getTagFriends = () => {
    SocialServices.getTagUsers(this.props.user.userData.token)
      .then(res => {
        this.setState({data: res.data.data, friends: res.data.data});
      })
      .catch(err => null);
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
      scalePoll,
      showPoll,
      showMention,
      hiderBar,
      showTextInput,
      scaleText,
      scaleLocation,
      scaleQuestion,
      showQuestion,
      alignValue,
      scaleMention,
      mentionText,
      locationTextColor,
      locationBgColor,
      mentionTextColor,
      mentionBgColor,
      scaleTextTemp,
      showLink,
      scaleLink,
    } = this.state;
    const SelectedFilterComponent = FILTERS[swipeCount].filterComponent;
    const config = {velocityThreshold: 0.3, directionalOffsetThreshold: 100};
    return (
      <>
        <Container>
          <View
            style={{
              position: 'absolute',
              paddingVertical: 35,
              zIndex: 1,
              paddingLeft: 15,
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <StoryBack height={50} width={50} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 3,
              alignSelf: 'flex-end',
              zIndex: 1,
              position: 'absolute',
              paddingRight: 15,
              height: SCREEN_HEIGHT * 0.68,
              paddingVertical: 35,
            }}>
            <TouchableOpacity
              style={{transform: [{rotate: '180deg'}]}}
              onPress={() => this.onExtractImage()}>
              <StoryBack height={50} width={50} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({textVisible: true})}>
              <StoryText />
              <Modal
                isVisible={this.state.textVisible}
                useNativeDriver={false}
                hideModalContentWhileAnimating={true}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({textVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Text</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({textVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.innerTextModal}>
                    <TextInput
                      style={{
                        flexWrap: 'wrap',
                        fontSize: 20,
                        color: 'powderblue',
                        fontFamily: this.state.fontValue,
                        borderRadius: 5,
                        padding: 20,
                        zIndex: 1,
                        maxHeight: SCREEN_HEIGHT * 0.32,
                        height: SCREEN_HEIGHT * 0.32,
                        backgroundColor: themeStyle.CALENDER_BACKGROUND,
                        textAlignVertical: 'top',
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
                      placeholder="Type something"
                    />
                  </View>

                  <View style={{height: 60, marginTop: '5%'}}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={fontsList}
                      renderItem={this.renderFonts}
                      // contentContainerStyle={{width:SCREEN_WIDTH}}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                  {/* <Text style={styles.modalHeading}>Text Color</Text> */}
                  <View style={{height: 60, marginTop: '5%'}}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={colorsList}
                      renderItem={this.renderColors}
                      // contentContainerStyle={{width:SCREEN_WIDTH}}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                  {/* <Text style={styles.modalHeading}>Background Color</Text>
                  <View style={{height: 60, marginTop: '5%'}}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={colorsList}
                      renderItem={this.renderBackgroundColor}
                      // contentContainerStyle={{width:SCREEN_WIDTH}}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View> */}
                  <Button
                    onPress={() => {
                      this.setState({
                        createStory: {
                          ...this.state.createStory,
                          text: this.state.storytext,
                          type: 'status',
                        },
                        textVisible: false,
                      });
                      this.blurTextInput();
                    }}
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              // disabled
              onPress={() => this.setState({addVisible: true})}>
              <StoryAdd />
              <Modal
                isVisible={this.state.addVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({addVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Background</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({addVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerBackgroundModal}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      numColumns={3}
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        width: SCREEN_WIDTH * 0.9,
                      }}
                      data={colorsList}
                      renderItem={this.renderBackgroundColor1}
                      // contentContainerStyle={{width:SCREEN_WIDTH}}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>

                  <Button
                    onPress={() => {
                      this.setState({backImageColor: true, addVisible: false});
                    }}
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              // disabled
              onPress={() => this.setState({emojiVisible: true})}>
              <StoryEmoji />
              <Modal
                isVisible={this.state.emojiVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({emojiVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={{height: SCREEN_HEIGHT * 0.85}}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Emojis</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({emojiVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: SCREEN_HEIGHT * 0.32,
                      marginBottom: '5%',
                      marginTop: 10,
                    }}>
                    <FlatList
                      data={emojis}
                      horizontal={false}
                      contentContainerStyle={{
                        width: SCREEN_WIDTH * 0.72,
                        alignSelf: 'center',
                      }}
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      numColumns={4}
                      renderItem={({item: Item, index}) => (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({emoji: Item});
                          }}
                          style={styles.emojiContainer}>
                          <Item />
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                    {/* <EmojiSelector
                      onEmojiSelected={emoji => this.setState({ emoji })}
                      showSearchBar={true}
                      columns={5}
                      showTabs={true}
                      showHistory={true}
                      showSectionTitles={true}
                      category={Categories.all}
                    /> */}
                  </View>

                  <View style={{marginVertical: '5%'}}>
                    <Button
                      onPress={() => this.setState({emojiVisible: false})}
                      customColor="#91BFE1"
                      title="Add"
                      containerStyle={{
                        width: 150,

                        top: 15,
                        height: 45,
                        borderRadius: 10,
                        // alignItems: 'center',
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({locationVisible: true})}>
              <StoryLocation />
              <Modal
                isVisible={this.state.locationVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({locationVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Location</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({locationVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerLocationModal}>
                    <GooglePlacesAutocomplete
                      placeholder="Search"
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'done'} // Can be left out for default return key https://facebook.github.io
                      listViewDisplayed="auto" // true/false/undefined
                      fetchDetails={true}
                      onPress={(data, details = null) =>
                        this.goMap(data, details)
                      }
                      onFail={err => null}
                      getDefaultValue={() => ''}
                      query={{
                        key: 'AIzaSyB6qAwbMp-shWMSqu5wvw7FYoxU2dNiwso',
                        language: 'en',
                      }}
                      styles={{
                        container: {borderRadius: 10},
                        textInput: {
                          borderRadius: 10,
                          marginHorizontal: '2%',
                          height: 40,
                          color: 'grey',
                          borderColor: themeStyle.COLOR_LIGHT_GREY,
                          borderWidth: 1,
                        },
                        textInputContainer: {
                          width: '100%',
                          height: 40,
                          borderRadius: 10,
                          borderBottomWidth: 0,
                          borderTopWidth: 0,
                          backgroundColor: 'white',
                          borderWidth: 0,
                        },
                        description: {
                          fontWeight: 'bold',
                          color: themeStyle.PRIMARY_TINT_COLOR,
                          fontFamily: themeStyle.FONT_REGULAR,
                        },
                      }}
                      enablePoweredByContainer={false}
                      renderDescription={row =>
                        row.description || row.formatted_address || row.name
                      }
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or
                      GooglePlacesSearchQuery={{
                        rankby: 'distance',
                        types: 'establishment',
                      }}
                      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                    {/*<Input
                        containerStyle={ styles.containerStyle1 }
                        placeholderTextColor={ themeStyle.COLOR_BLACK }
                        placeholder="Search"
                        // onChangeText={text => this.filterAds(text)}
                        rightIcon={
                          <TouchableOpacity style={ { marginRight: 10 } }>
                            <Icon.FontAwesome
                              name="search"
                              size={ 20 }
                              color={ themeStyle.COLOR_BLACK }
                            />
                          </TouchableOpacity>
                        }
                        inputContainerStyle={ styles.inputContainerStyle1 }
                        inputStyle={ styles.inputStyle1 }
                      />*/}

                    <View style={[styles.inputContainerStyle1, {padding: 10}]}>
                      <TextInput
                        style={{margin: 0, padding: 0}}
                        placeholder={'Selected Location'}
                        value={this.state?.locationText}
                        onChangeText={text => this.setState({storytext: text})}
                        multiline={true}
                        editable={false}
                      />
                    </View>
                  </View>

                  <Button
                    onPress={() => {
                      this.setState({
                        showLocation: true,
                        createStory: {
                          ...this.state.createStory,
                          lat: this.state.latitude,
                          long: this.state.longitude,
                          location: this.state.locationText,
                        },
                        locationVisible: false,
                      });
                    }}
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({mentionVisible: true})}>
              <StoryMention />
              <Modal
                isVisible={this.state.mentionVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({mentionVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Mention</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({mentionVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerLocationModal}>
                    <View style={{width: '100%', marginBottom: 12}}>
                      <Input
                        containerStyle={styles.containerStyle1}
                        placeholderTextColor={themeStyle.COLOR_BLACK}
                        placeholder="Search"
                        // onChangeText={text => this.filterAds(text)}
                        rightIcon={
                          <TouchableOpacity style={{marginRight: 10}}>
                            <Icon.FontAwesome
                              name="search"
                              size={20}
                              color={themeStyle.COLOR_BLACK}
                            />
                          </TouchableOpacity>
                        }
                        inputContainerStyle={styles.inputContainerStyle1}
                        inputStyle={styles.inputStyle1}
                      />
                    </View>
                    <View
                      style={{
                        height: SCREEN_HEIGHT * 0.22,
                      }}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        // horizontal={true}
                        data={data}
                        renderItem={this.renderFriends}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                    <View style={[styles.inputContainerStyle1, {padding: 10}]}>
                      <TextInput
                        style={{margin: 0, padding: 0}}
                        placeholder={'Selected Profiles'}
                        value={
                          this.state?.tagFriendsList?.length > 0 &&
                          this.state?.tagFriendsList
                            ?.map(item => item.username)
                            ?.join(',')
                        }
                        onChangeText={text => this.setState({storytext: text})}
                        multiline={true}
                        editable={false}
                      />
                      {/*<Text>{ this.state?.friends?.length > 0 ? this.state?.friends?.map((item) => item.username)?.join(','):  'Selected Profiles'}</Text>*/}
                    </View>
                  </View>

                  <Button
                    onPress={() =>
                      this.setState({
                        showMention: true,
                        mentionVisible: false,
                        ...this.state.createStory,
                        tagFriends: this.state?.tagFriendsList?.map(
                          item => item.username,
                        ),
                      })
                    }
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({linkVisible: true})}>
              <StoryLink />
              <Modal
                isVisible={this.state.linkVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({linkVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Link</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({linkVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '100%', marginTop: 10}}>
                    <TextInput
                      style={[
                        styles.inputContainerStyle1,
                        {margin: 0, padding: 0, paddingHorizontal: 10},
                      ]}
                      placeholder={'Add URL'}
                      value={this.state.storyLink}
                      onChangeText={text => this.setState({storyLink: text})}
                    />
                  </View>
                  <Button
                    onPress={() =>
                      this.setState({
                        showLink: true,
                        createStory: {
                          ...this.state.createStory,
                          text: this.state.storyLink,
                          type: 'link',
                        },
                        linkVisible: false,
                      })
                    }
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({pollVisible: true})}>
              <StoryPoll />
              <Modal
                isVisible={this.state.pollVisible}
                useNativeDriver={false}
                hideModalContentWhileAnimating={true}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({pollVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Poll</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({pollVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.innerTextModal,
                      {height: SCREEN_HEIGHT * 0.32, padding: 0},
                    ]}>
                    <View
                      style={{
                        borderBottomColor: '#B3B3B3',
                        borderBottomWidth: 1,
                        flex: 2,
                        marginLeft: 5,
                        marginTop: 5,
                      }}>
                      <TextInput
                        style={{margin: 0, padding: 0, paddingHorizontal: 10}}
                        placeholder={'Statement'}
                        value={this.state.poll?.text}
                        onChangeText={text =>
                          this.setState(prevState => ({
                            poll: {
                              ...prevState.poll,
                              text: text,
                            },
                          }))
                        }
                        multiline={true}
                      />
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#B3B3B3',
                        borderBottomWidth: 1,
                        flex: 1,
                        marginLeft: 5,
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{margin: 0, padding: 0, paddingHorizontal: 10}}
                        placeholder={'Option A'}
                        value={this.state?.poll?.choices[0]}
                        onChangeText={text => {
                          const array = this.state.poll.choices;
                          array[0] = text;
                          this.setState(prevState => ({
                            poll: {
                              // object that we want to update
                              ...prevState.poll, //,    // keep all other key-value pairs
                              choices: array, // update the value of specific key
                            },
                          }));
                        }}
                        multiline={true}
                      />
                    </View>

                    <View
                      style={{
                        borderBottomColor: '#B3B3B3',
                        borderBottomWidth: 1,
                        flex: 1,
                        marginLeft: 5,
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{margin: 0, padding: 0, paddingHorizontal: 10}}
                        placeholder={'Option B'}
                        value={this.state.value}
                        onChangeText={text => {
                          const array = this.state.poll.choices;
                          array[1] = text;
                          this.setState(prevState => ({
                            poll: {
                              ...prevState.poll,
                              choices: array,
                            },
                          }));
                        }}
                        multiline={true}
                      />
                    </View>

                    <View
                      style={{
                        borderBottomColor: '#B3B3B3',
                        borderBottomWidth: 1,
                        flex: 1,
                        marginLeft: 5,
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{margin: 0, padding: 0, paddingHorizontal: 10}}
                        placeholder={'Option C'}
                        value={this.state.value}
                        onChangeText={text => {
                          const array = this.state.poll.choices;
                          array[2] = text;
                          this.setState(prevState => ({
                            poll: {
                              ...prevState.poll,
                              choices: array,
                            },
                          }));
                        }}
                        multiline={true}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 5,
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{margin: 0, padding: 0, paddingHorizontal: 10}}
                        placeholder={'Option D'}
                        value={this.state.value}
                        onChangeText={text => {
                          const array = this.state.poll.choices;
                          array[3] = text;
                          this.setState(prevState => ({
                            poll: {
                              ...prevState.poll,
                              choices: array,
                            },
                          }));
                        }}
                        multiline={true}
                      />
                    </View>
                  </View>

                  <Button
                    onPress={() => {
                      const array = this.state.poll.choices.filter(
                        item => item != undefined,
                      );
                      this.setState(
                        {
                          showPoll: true,
                          createStory: {
                            ...this.state.createStory,
                            text: this.state?.poll?.text,
                            choices: array,
                            type: 'poll',
                          },
                          pollVisible: false,
                        },
                        () => null,
                      );
                    }}
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: themeStyle.YELLOW,
                padding: 10,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                width: 45,
              }}
              onPress={() => this.setState({questionVisible: true})}>
              <StoryQuestion />
              <Modal
                isVisible={this.state.questionVisible}
                useNativeDriver={false}
                animationIn={'slideInUp'}
                backdropColor={'#E9E9E9'}
                onBackdropPress={() => this.setState({questionVisible: false})}
                animationInTiming={800}
                animationOutTiming={800}
                style={styles.modalContainer}>
                <View style={styles.textModal}>
                  <View style={styles.flex}>
                    <Text style={styles.modalHeading}>Question</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({questionVisible: false})}>
                      <ModalClose />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerTextModal}>
                    <TextInput
                      style={{margin: 0, padding: 0}}
                      placeholder={'Ask Something'}
                      value={this.state.storyQuestion}
                      onChangeText={text =>
                        this.setState({storyQuestion: text})
                      }
                      multiline={true}
                    />
                  </View>
                  <Button
                    onPress={() =>
                      this.setState({
                        showQuestion: true,
                        createStory: {
                          ...this.state.createStory,
                          text: this.state.storyQuestion,
                          type: 'question',
                        },
                        questionVisible: false,
                      })
                    }
                    customColor="#91BFE1"
                    title="Add"
                    containerStyle={{
                      width: 150,
                      marginTop: 15,
                      height: 45,
                      borderRadius: 10,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </Modal>
            </TouchableOpacity>
          </View>

          <ViewShot
            ref={this.viewShotRef}
            options={{format: 'jpg', quality: 0.9}}
            style={{height: SCREEN_HEIGHT * 0.925, width: SCREEN_WIDTH}}
            keyboardShouldPersistTaps={true}>
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeLeft={state => this.onSwipeLeft(state)}
              onSwipeRight={state => this.onSwipeRight(state)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: 'red',
              }}>
              {/* {textFocus && (
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
              )} */}
              {this.state.backImageColor ? (
                <View
                  style={{
                    backgroundColor: this.state.imageBackColor,
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH,
                    alignItems: 'center',
                  }}></View>
              ) : swipeCount == 0 ? (
                <FastImage
                  style={{
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH,
                    alignSelf: 'center',
                  }}
                  source={{uri: imageUri}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'cover'}
                />
              ) : (
                <SelectedFilterComponent
                  image={
                    <Image
                      style={{
                        height: SCREEN_HEIGHT,
                        width: SCREEN_WIDTH,
                        // alignSelf: 'center',
                      }}
                      source={{uri: imageUri}}
                      resizeMode={Platform.OS === 'ios' ? 'cover' : 'cover'}
                    />
                  }
                />
              )}
            </GestureRecognizer>
            <View style={{bottom: SCREEN_HEIGHT * 0.45}}>
              {showTextInput && (
                <View style={styles.innerTextModal}>
                  <Animated.View
                    style={[
                      this.position.getLayout(),
                      {
                        zIndex: 2,
                        transform: [
                          {scale: textFocus ? scaleTextTemp : scaleText},
                        ],
                        marginHorizontal: SCREEN_WIDTH * 0.04,
                        alignSelf: alignValue,
                      },
                    ]}
                    {...this.panResponder.panHandlers}>
                    <Text
                      onPress={() =>
                        this.setState({showTextInput: false, textVisible: true})
                      }
                      style={{
                        flexWrap: 'wrap',
                        fontSize: 20,
                        color: this.state.textColor,
                        fontFamily: this.state.fontValue,
                        borderRadius: 15,
                        padding: 20,
                        zIndex: 1,
                        overflow: 'hidden',
                        backgroundColor: this.state.textBackColor,
                        // backgroundColor:this.textInputRef.current.backgroundColor
                      }}>
                      {this.state.inputText}
                    </Text>
                  </Animated.View>
                </View>
              )}
              {showQuestion && (
                <View style={styles.innerTextModal}>
                  <Animated.View
                    style={[
                      this.questionAnimationPosition.getLayout(),
                      {
                        zIndex: 1,
                        transform: [{scale: scaleQuestion}],
                      },
                    ]}
                    {...this.questionResponder.panHandlers}>
                    <View
                      style={{
                        padding: '5%',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.modalHeading,
                          fontFamily: themeStyle.FONT_BOLD,
                        }}>
                        Question
                      </Text>
                      <Text
                        onPress={() =>
                          this.setState({
                            showQuestion: false,
                            questionVisible: true,
                          })
                        }
                        style={{
                          // flexWrap: 'wrap',
                          fontSize: 20,
                          color: '#000000',
                          fontFamily: themeStyle.FONT_MEDIUM,
                          padding: 20,
                          // zIndex: 1,

                          // backgroundColor:this.textInputRef.current.backgroundColor
                        }}>
                        {this.state.storyQuestion}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              )}
              {showPoll && (
                <View style={styles.innerTextModal}>
                  <Animated.View
                    style={[
                      this.pollAnimationPosition.getLayout(),
                      {
                        zIndex: 1,
                        transform: [{scale: scalePoll}],
                      },
                    ]}
                    {...this.pollResponder.panHandlers}>
                    <View
                      style={{
                        padding: '5%',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.modalHeading,
                          fontFamily: themeStyle.FONT_BOLD,
                        }}>
                        Poll
                      </Text>
                      <Text
                        onPress={() =>
                          this.setState({showPoll: false, pollVisible: true})
                        }
                        style={{
                          // flexWrap: 'wrap',
                          fontSize: 20,
                          color: '#000000',
                          fontFamily: themeStyle.FONT_MEDIUM,
                          padding: 20,
                          // zIndex: 1,

                          // backgroundColor:this.textInputRef.current.backgroundColor
                        }}>
                        {this.state.poll?.text}
                      </Text>
                      {this.state.poll?.choices.map(item => {
                        return (
                          <Text
                            onPress={() =>
                              this.setState({
                                showPoll: false,
                                pollVisible: true,
                              })
                            }
                            style={{
                              // flexWrap: 'wrap',
                              fontSize: 14,
                              color: '#000000',
                              fontFamily: themeStyle.FONT_REGULAR,
                              padding: 20,
                              // zIndex: 1,

                              // backgroundColor:this.textInputRef.current.backgroundColor
                            }}>
                            {item}
                          </Text>
                        );
                      })}
                    </View>
                  </Animated.View>
                </View>
              )}
              {showLink && (
                <View style={styles.innerTextModal}>
                  <Animated.View
                    style={[
                      this.linkAnimationPosition.getLayout(),
                      {
                        zIndex: 1,
                        transform: [{scale: scaleLink}],
                      },
                    ]}
                    {...this.linkResponder.panHandlers}>
                    <View
                      style={{
                        padding: '5%',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.modalHeading,
                          fontFamily: themeStyle.FONT_BOLD,
                        }}>
                        Link
                      </Text>

                      <Text
                        // onPress={() => this.setState({ showLink: false, linkVisible: true })}
                        style={{
                          // flexWrap: 'wrap',
                          fontSize: 14,
                          color: 'powderblue',
                          fontFamily: themeStyle.FONT_REGULAR,
                          padding: 20,
                          // zIndex: 1,
                          textDecorationLine: 'underline',
                          // backgroundColor:this.textInputRef.current.backgroundColor
                        }}>
                        {this.state.storyLink}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
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
                        borderRadius: 10,
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

              {this.state.emoji && (
                <Animated.View
                  style={[
                    this.mentionAnimationPosition.getLayout(),
                    {zIndex: 1, transform: [{scale: scaleMention}]},
                  ]}
                  {...this.mentionResponder.panHandlers}>
                  {/* <Text style={{ fontSize: 50 }}>{this.state.emoji}</Text> */}
                  <this.state.emoji />
                </Animated.View>
              )}
              {showMention && this.state?.tagFriendsList && (
                <View
                  style={{
                    // position: 'absolute',
                    zIndex: 1,
                    top: SCREEN_HEIGHT * 0.3,
                  }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state?.tagFriendsList}
                    renderItem={this.renderFriend}
                    // contentContainerStyle={{width:SCREEN_WIDTH}}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
            </View>
            {textDrag && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: SCREEN_HEIGHT * 0.8,
                  width: 60,
                  height: 60,
                  backgroundColor: themeStyle.YELLOW,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 35,
                  marginLeft: 14,
                }}
                onLayout={this.onLayout}>
                <Icon.Ionicons
                  name="trash-bin-sharp"
                  size={20}
                  color={themeStyle.COLOR_LIGHT_GREY}
                />
              </View>
            )}
            {/*

            <Modal animationIn="fade" transparent={true} visible={stickerModel}>
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
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.iconStyleClose}>
                    <TouchableOpacity
                      onPress={() => this.setState({ stickerModel: false })}>
                      <Icon.AntDesign
                        name="close"
                        size={24}
                        color={themeStyle.PRIMARY_TINT_COLOR}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity
                      disabled={showLocation ? true : false}
                      onPress={() => {
                        this.setState({
                          stickerModel: false,
                          locationModal: true,
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: themeStyle.COLOR_WHITE,
                          width: SCREEN_WIDTH * 0.35,
                          padding: 5,
                        }}>
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
                        <View style={{ flex: 0.8 }}>
                          <Text style={{ color: 'purple' }}>Location</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginHorizontal: 5 }}>
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
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text>@</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                          <Text>Mention</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>


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
          ) : null} */}

            {/* {textFocus ? (
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
              <View style={{backgroundColor:'yellow',height:100,width:100}}/>
            </View>
          ) : null} */}
          </ViewShot>
          {this.state.backImageColor && (
            <View
              style={{
                right: SCREEN_WIDTH * 0.43,
                position: 'absolute',
                bottom: 200,
                height: 60,
                width: 60,
                borderRadius: 60,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon.Entypo
                onPress={() =>
                  this.setState({imageBackColor: '', backImageColor: false})
                }
                name={'circle-with-cross'}
                color={themeStyle.COLOR_YELLOW}
                size={40}
              />
            </View>
          )}
          <SearchLocationModal
            onClose={() => this.setState({locationModal: false})}
            visible={locationModal}
            onPress={(data, details) => this.goMap(data, details)}
            lati={userLat}
            longi={userLong}
          />
          <UploadingModal visible={uploading} />
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(StoryFilter);
