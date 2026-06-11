import React, {Component} from 'react';
import {Clipboard, ImageBackground, Platform, Pressable} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import themeStyle from '../../assets/styles/theme.style';
import {DeleteModal, Icon, Loader} from '../../components';
import firebaseApp from '../../services/FirebaseChat';
import {route, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/constants';
import {HorizontalSpacer} from '../../lib/utils/global';
import styles from './style';
import SendIcon from '../../assets/svg/send.svg';
import Mic from '../../assets/svg/mic.svg';
import Add from '../../assets/svg/addChat.svg';
import Wave from '../../assets/svg/wave.svg';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {ProfileServices} from '../../services';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Modal from 'react-native-modalbox';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Image as CompressedImage, Video} from 'react-native-compressor';
import HeaderLeftIcon from '../../components/HeaderLeftIcon';

import Emoji1 from '../../assets/emojis/Group-1.svg';
import Emoji2 from '../../assets/emojis/Group-5.svg';
import Emoji3 from '../../assets/emojis/Group-16.svg';
import Emoji4 from '../../assets/emojis/Group-34.svg';
import Emoji5 from '../../assets/emojis/Group-29.svg';
import Emoji6 from '../../assets/emojis/Group-30.svg';
import Bin from '../../assets/svg/bin-new.svg';
import Delete from '../../assets/svg/delete1.svg';
import firestore from '@react-native-firebase/firestore';
import Like from '../../assets/svg/like.svg';

class Chat extends Component {
  constructor(props) {
    super(props);
    const {type} = this.props.route?.params?.data;
    this.state = {
      messages: [],
      alertModal: false,
      msgToDisplay: '',
      attachment: false,
      recording: false,
      audioPath: '',
      sender: {
        id: this.props.user.userData._id,
        name:
          type == 'Education'
            ? this.props.user.userData.education_username
            : type == 'Classified'
            ? this.props.user.userData.classified_username
            : type == 'Career'
            ? this.props.user.userData.career_username
            : type == 'Connect'
            ? this.props.user.userData.connect_username
            : !type
            ? this.props.user.userData.social_username
            : this.props.user.userData.social_username,

        email: this.props.user.userData.email,
        photo:
          type == 'Education'
            ? this.props.user.userData.education_image
            : type == 'Classified'
            ? this.props.user.userData.classified_image
            : type == 'Career'
            ? this.props.user.userData.career_image
            : type == 'Connect'
            ? this.props.user.userData.connect_image
            : !type
            ? this.props.user.userData.social_image
            : this.props.user.userData.social_image,
      },
      receiver: {
        id: this.props.route?.params?.data?.id,
        name: this.props.route?.params?.data?.name,
        email: this.props.route?.params?.data?.email,
        photo: this.props.route?.params?.data?.profile_url,
      },
      loading: false,
      showReactions: false,
      recording: false,
      selectedMessageId: '',
      audioPath: '',
      audioPlaying: false,
      audioPlayingId: '',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.currentUserId = this.state.sender.id;

    if (this.state.receiver != null) {
      const chatId = this.generateChatId(this.currentUserId);
      this.chatRef = firestore().collection(`chat/${chatId}/messages`);
    }
  }

  headerTilte = () => {
    let {profile_url, type, name} = this.props.route.params.data;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar rounded source={{uri: profile_url}} size={40} />
        <View style={{marginLeft: 10, flexDirection: 'row'}}>
          <Text style={{fontFamily: themeStyle.FONT_MEDIUM}}>{name}</Text>
          <View
            style={{
              alignSelf: 'flex-start',
              marginLeft: 5,
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 2,
              width: 70,
              backgroundColor:
                type == 'Education'
                  ? themeStyle.COLOR_EDUCATION
                  : type == 'Social'
                  ? themeStyle.YELLOW
                  : type == 'Classified'
                  ? themeStyle.COLOR_CLASSIFIED
                  : type == 'Career'
                  ? themeStyle.CARRER_PRIMARY
                  : type == 'Connect'
                  ? themeStyle.PINK
                  : '#FF6B6B',
            }}>
            <Text style={styles.itemText1}>{type}</Text>
          </View>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeftIcon onPress={() => this.props.navigation.goBack()} />;
  };

  componentDidMount = () => {
    const {navigation, route} = this.props;

    navigation.setOptions({
      headerLeft: this.headerLeft,
      headerTitle: this.headerTilte,
    });

    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        this.setState({audioPlaying: false, audioPlayingId: ''});
      }
    });

    if (this.chatRef) {
      this.unsubscribe = this.chatRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.handleChatUpdates);
    }

    const initialMessage = route?.params?.data?.message;
    if (initialMessage) {
      this.onSend(initialMessage);
    }
  };

  componentWillUnmount = () => {
    this.audioRecorderPlayer.removePlayBackListener();
    if (this.unsubscribe) this.unsubscribe();
  };

  // Handler for real-time Firestore chat updates
  handleChatUpdates = querySnapshot => {
    const messages = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        _id: data._id,
        text: data.text,
        createdAt: new Date(data.createdAt),
        user: data.user,
        ...data,
      };
    });
    this.setState({messages});
  };

  onSendPost = messages => {
    const {sender, receiver} = this.state;
    const {data} = this.props.route.params;
    const now = new Date().getTime();

    const messagePayload = {
      _id: now,
      text: '',
      createdAt: now,
      uid: this.currentUserId,
      order: -1 * now,
      username: sender.username || sender.email,
      email: sender.email,
      is_product: data?.is_product || false,
      product_id: data?.product_id || null,
      is_post: data?.is_post || false,
      post_id: data?.post_id || null,
      name: sender.name || sender.email,
      avatar: sender.photo || '',
      receiver: receiver.id,
      sent: true,
      received: true,
      type: data.type || 'Normal',
      read: 0,
    };

    try {
      messages.forEach(() => this.chatRef.add(messagePayload));

      const notificationMessage =
        !data.is_post && data.is_story
          ? 'Answered your question!'
          : data.is_post
          ? 'Shared a post.'
          : 'Shared a product ad.';

      this.sendNotification(sender, receiver, notificationMessage);

      this.updateUserChatSummary(sender, receiver, notificationMessage, now);
    } catch (err) {
      console.warn('Error in onSendPost:', err);
    }
  };

  generateChatId = userId => {
    const {receiver} = this.state;
    const chatIdBase = `${userId}-${receiver.id}-${this.props.route.params.data.type}`;
    return userId > receiver.id
      ? chatIdBase
      : chatIdBase.split('-').reverse().join('-');
  };

  onStartRecord = async () => {
    this.setState({recording: true});
    const result = await this.audioRecorderPlayer.startRecorder();
    this.setState({audioPath: result});
  };

  onStopRecord = async () => {
    this.setState({recording: false});
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    await this.onSendAudioMessage();
  };

  onSend = async (messages = []) => {
    const {sender, receiver} = this.state;
    const {data} = this.props.route.params;

    try {
      const now = new Date().getTime();
      for (const message of messages) {
        const messagePayload = {
          _id: now,
          text: message.text,
          createdAt: now,
          uid: this.currentUserId,
          order: -1 * now,
          username: sender.username || sender.email,
          email: sender.email,
          name: sender.name || sender.email,
          avatar: sender.photo || '',
          receiver: receiver.id,
          sent: true,
          received: true,
          type: data.type || 'Normal',
          read: 0,
        };
        await this.chatRef.add(messagePayload);
      }

      const notificationMessage = messages[0]?.text || 'New message';
      this.sendNotification(sender, receiver, notificationMessage);
      this.updateUserChatSummary(sender, receiver, notificationMessage, now);
    } catch (err) {
      console.warn('Error in onSend:', err);
    }
  };

  // Send notification
  sendNotification = (sender, receiver, message) => {
    const notificationObj = {
      title: 'Chat Message',
      body: message,
      senderId: sender?.id,
      receiverId: receiver?.id,
      senderName: sender?.name,
      receiverName: '',
      message,
      image:
        'http://3.13.164.94:5000/api/file/public/uploads/file-1641812580150.jpg',
      type: this.props.route.params.data.type || 'Normal',
      module_type: 'daak',
      created_at: new Date(),
    };

    ProfileServices.sendChatNotifications(
      notificationObj,
      this.props.user.userData.token,
    )
      .then(() => {})
      .catch(err => console.log('Notification Error:', err));
  };

  // Update chat summary in Firestore
  updateUserChatSummary = (sender, receiver, lastMessage, now) => {
    const commonData = {
      createdAt: now,
      seen: false,
      profile_url: sender?.photo || '',
      lastMessage,
      type: this.props.route.params.data.type || 'Normal',
    };

    firestore()
      .collection('users')
      .doc(this.currentUserId)
      .collection('chats')
      .doc(`${receiver.id}-${this.props.route.params.data.type}`)
      .set(
        {
          id: `${receiver.id}-${this.props.route.params.data.type}`,
          name: receiver.username || receiver.name,
          email: receiver.email,
          ...commonData,
        },
        {merge: true},
      );

    firestore()
      .collection('users')
      .doc(receiver.id)
      .collection('chats')
      .doc(`${this.currentUserId}-${this.props.route.params.data.type}`)
      .set(
        {
          id: `${this.currentUserId}-${this.props.route.params.data.type}`,
          name: sender.name || sender.email,
          email: sender.email,
          ...commonData,
        },
        {merge: true},
      );
  };

  _renderTicks(props) {
    return (
      <View style={styles.tickView}>
        {!!props.received && <Text style={[styles.tick]}>✓✓</Text>}
      </View>
    );
  }

  handleAudioPress = async fileUrl => {
    const {audioPlayingId, audioPlaying} = this.state;
    this.setState({audioPlaying: !audioPlaying});
    if (audioPlayingId === fileUrl) {
      // If the same audio is clicked again, stop playing it
      this.audioRecorderPlayer.stopPlayer();
      this.setState({audioPlayingId: ''});
    } else {
      // If a different audio is clicked, stop the currently playing audio (if any) and start the new one
      if (audioPlayingId) {
        this.setState({audioPlayingId: ''});
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({audioPlayingId: fileUrl});
      this.audioRecorderPlayer.startPlayer(fileUrl);
    }
  };

  onReactionPress = async (message, reactionType) => {};

  _renderBubble = props => {
    let {type} = this.props.route?.params?.data;
    let {receiver, selectedMessageId, audioPlaying, audioPlayingId} =
      this.state;

    let isSelected = selectedMessageId == props.currentMessage._id;
    let isAudioPlaying =
      audioPlaying && audioPlayingId == props.currentMessage.file_url;
    return props.currentMessage?.is_file != undefined &&
      props.currentMessage?.is_file ? (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
            url: props.currentMessage?.file_url,
          });
        }}>
        <View
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: props.currentMessage?.is_product
              ? '#FF9966'
              : '#38474F',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            source={require('../../assets/images/profile_logo.jpg')}
            rounded
            size={40}
          />
          <View style={{marginLeft: '5%'}}>
            <Text style={styles.nameText}>
              {props.currentMessage.user._id == this.props.user.userData._id
                ? 'You have shared a file.'
                : `${receiver.name} have shared a file.`}
            </Text>
          </View>
          <View style={{position: 'absolute', top: 40, right: '5%'}}>
            <Text style={{fontSize: 10, color: themeStyle.COLOR_WHITE}}>
              {moment(props.currentMessage.createdAt).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : props.currentMessage?.is_post != undefined ||
      props.currentMessage?.is_product != undefined ? (
      <TouchableOpacity
        onPress={() => {
          props.currentMessage?.is_product
            ? this.props.navigation.navigate(route.CLASSIFIEDPRODUCTDETAIL, {
                productId: props.currentMessage?.product_id
                  ? props.currentMessage?.product_id
                  : '623db2f2d7845bf6f8a49207',
              })
            : this.props.navigation.navigate(route.SOCIALSINGLEPOST, {
                data: props.currentMessage?.post_id
                  ? props.currentMessage?.post_id
                  : '623b8ceb94bdd1b8abdb7f8f',
              });
        }}>
        <View
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: props.currentMessage?.is_product
              ? '#FF9966'
              : '#38474F',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            source={require('../../assets/images/profile_logo.jpg')}
            rounded
            size={40}
          />
          <View style={{marginLeft: '5%'}}>
            <Text style={styles.nameText}>
              {props.currentMessage.user._id == this.props.user.userData._id
                ? type == 'Classified'
                  ? 'You have shared a product ad.'
                  : 'You have shared a post.'
                : type == 'Classified'
                ? `${receiver.name} shared a product ad.`
                : `${receiver.name} shared a post`}
            </Text>
          </View>
          <View style={{position: 'absolute', top: 40, right: '5%'}}>
            <Text style={{fontSize: 10, color: themeStyle.COLOR_BLACK}}>
              {moment(props.currentMessage.createdAt).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : props.currentMessage?.is_audio ? (
      <Pressable
        onPress={() => this.handleAudioPress(props.currentMessage.file_url)}>
        <View style={styles.audioContainer}>
          {isAudioPlaying ? (
            <Icon.MaterialIcons
              name="pause"
              size={30}
              color={themeStyle.COLOR_BLACK}
            />
          ) : (
            <Icon.MaterialIcons
              name="play-arrow"
              size={30}
              color={themeStyle.COLOR_BLACK}
            />
          )}
          <Wave height={60} width={200} />
        </View>
      </Pressable>
    ) : (
      <>
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: themeStyle.COLOR_BLACK,
              fontFamily: themeStyle.FONT_REGULAR,
            },
          }}
          tickStyle={{
            color:
              type == 'Education'
                ? '#99CC66'
                : type == 'Classified'
                ? '#FF9966'
                : type == 'Career'
                ? '#1DD1A1'
                : type == 'Connect'
                ? '#FF6B6B'
                : !type
                ? '#38474F'
                : '#38474F',
            marginHorizontal: -2.5,
          }}
          // renderTicks={this._renderTicks}
          wrapperStyle={{
            left: {
              borderRadius: 10,
              backgroundColor: '#DFDFDF',
              padding: 5,
              marginBottom: isSelected ? 50 : 0,
            },
            right: {
              borderRadius: 10,
              backgroundColor: '#fff',
              padding: 5,
              marginBottom: isSelected ? 50 : 0,
            },
          }}
        />
        {selectedMessageId == props.currentMessage._id && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({showReactions: false, selectedMessageId: ''});
              }}>
              <Like />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji1')
              }>
              <Emoji1 height={23} width={23} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji2')
              }>
              <Emoji2 height={23} width={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji3')
              }>
              <Emoji3 height={23} width={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji4')
              }>
              <Emoji4 height={23} width={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji5')
              }>
              <Emoji5 height={23} width={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onReactionPress(props.currentMessage, 'emoji6')
              }>
              <Emoji6 height={23} width={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Clipboard.setString(props.currentMessage.text)}>
              <Icon.MaterialIcons
                name="content-copy"
                size={23}
                color={themeStyle.PRIMARY_TINT_COLOR}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({showReactions: false, selectedMessageId: ''});
              }}>
              <Bin />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  _renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
          },
        }}
      />
    );
  };

  chooseFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        copyTo: 'documentDirectory',
        type: [DocumentPicker.types.allFiles],
      });
      if (res[0].size <= 10485760) {
        let uri = res[0].uri;
        //generating image name
        let imageName = 'file-' + new Date().getTime();

        //to resolve file path issue on different platforms
        let uploadUri =
          Platform.OS === 'ios'
            ? uri.replace('file://', '')
            : res[0].fileCopyUri;
        let newURI = uploadUri;
        this.setState({loading: true});
        if (res[0].type == 'video/mp4') {
          const result = await Video.compress(
            uploadUri,
            {
              compressionMethod: 'auto',
              minimumFileSizeForCompress: 1,
            },
            progress => {
              // this.setState({ msgToDisplay: `Compressing Video ${progress*100}%` })
            },
          );
          newURI = result;
        }
        if (res[0].type == 'image/jpeg') {
          const result = await CompressedImage.compress(
            uploadUri,
            {
              compressionMethod: 'auto',
            },
            progress => {
              // this.setState({ msgToDisplay: `Compressing Video ${progress*100}%` })
            },
          );
          newURI = result;
          // const realPath = await getRealPath(result, 'video');
        }

        // this.setState({ loading: true })
        storage()
          .ref(imageName)
          .putFile(newURI)
          .then(snapshot => {
            //You can check the image is now uploaded in the storage bucket
            let imageRef = storage().ref('/' + imageName);
            imageRef
              .getDownloadURL()
              .then(url => {
                //from url you can fetched the uploaded image easily

                let messagesArr = [];
                messagesArr.push({
                  _id: new Date(),
                  sent: true,
                  received: true,
                  is_file: true,
                  file_url: url,
                  text: '',
                  createdAt: new Date(),
                  user: {
                    _id: this.currentUserId,
                  },
                });
                this.setState({loading: false});
                this.onSendFile(messagesArr, url);
              })
              .catch(e => {
                this.setState({loading: false});
              });
          })
          .catch(e => {
            this.setState({loading: false});
          });
      } else {
        this.setState({
          msgToDisplay: 'Cannot pick file size more than 10 mb',
          alertModal: true,
        });
      }

      // setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
    }
  };

  onSendAudioMessage = async () => {
    const {sender, receiver, audioPath} = this.state;

    try {
      // Step 1: Upload audio to Firebase Storage
      const fileName = `${new Date().getTime()}_${audioPath.split('/').pop()}`;
      const audioRef = storage().ref(`/voiceMessages/${fileName}`);
      await audioRef.putFile(audioPath);
      const audioURL = await audioRef.getDownloadURL();

      // Step 2: Push audio message to Firestore
      const now = new Date().getTime();
      await this.chatRef.add({
        _id: now,
        text: '',
        createdAt: now,
        uid: this.currentUserId,
        order: -1 * now,
        username: sender.username ? sender.username : sender.email,
        email: sender.email,
        is_audio: true,
        text: '',
        file_url: audioURL,
        name: sender.name ? sender.name : sender.email,
        avatar: sender?.photo ? sender?.photo : '',
        receiver: receiver.id,
        sent: true,
        received: true,
        type: this.props.route.params.data.type || 'Normal',
        read: 0,
      });

      // Step 3: Send notification (same as in onSendFile)
      const nowTime = new Date().getTime();
      let notificationObj = {
        title: 'Audio Message',
        body: 'You have received a new audio message',
        senderId: sender?.id,
        receiverId: receiver?.id,
        senderName: sender?.name,
        receiverName: '',
        message: 'This is an audio message',
        image:
          'http://3.13.164.94:5000/api/file/public/uploads/file-1641812580150.jpg',
        type:
          this.props.route.params.data.type === 'Education'
            ? 'ChatMessageEducation'
            : this.props.route.params.data.type === 'Classified'
            ? 'ChatMessageClassified'
            : this.props.route.params.data.type === 'Career'
            ? 'ChatMessageCareer'
            : this.props.route.params.data.type === 'Connect'
            ? 'ChatMessageConnect'
            : this.props.route.params.data.type === 'Social'
            ? 'ChatMessageSocial'
            : this.props.route.params.data.type === 'Support'
            ? 'ChatMessageSupport'
            : 'ChatMessage',
        module_type: 'daak',
        created_at: new Date(),
      };

      ProfileServices.sendChatNotifications(
        notificationObj,
        this.props.user.userData.token,
      )
        .then(res => {})
        .catch(err => console.log(err));

      // Update Firestore user chat summaries
      const chatSummary = {
        id: `${receiver.id}-${this.props.route.params.data.type}`,
        name: receiver.username || receiver.name,
        email: receiver.email,
        createdAt: now,
        seen: false,
        profile_url: receiver?.photo ? receiver?.photo : '',
        lastMessage: 'Shared an audio message.',
        type: this.props.route.params.data.type || 'Normal',
      };

      await firestore()
        .collection('users')
        .doc(this.currentUserId)
        .collection('chats')
        .doc(chatSummary.id)
        .set(chatSummary, {merge: true});

      await firestore()
        .collection('users')
        .doc(receiver.id)
        .collection('chats')
        .doc(`${this.currentUserId}-${this.props.route.params.data.type}`)
        .set(
          {
            ...chatSummary,
            id: `${this.currentUserId}-${this.props.route.params.data.type}`,
            name: sender.name ? sender.name : sender.email,
            email: sender.email,
            profile_url: sender?.photo ? sender?.photo : '',
          },
          {merge: true},
        );

      this.setState({loading: false, audioPath: ''});
    } catch (err) {
      console.warn('Error sending audio message:', err);
    }
  };

  onSendFile = async (messages, url) => {
    const {sender, receiver} = this.state;
    try {
      const now = new Date().getTime();

      // Step 1: Add each message to Firestore
      await Promise.all(
        messages.map(async message => {
          await this.chatRef.add({
            _id: now,
            text: '',
            createdAt: now,
            uid: this.currentUserId,
            order: -1 * now,
            username: sender.username ? sender.username : sender.email,
            email: sender.email,
            is_file: true,
            is_audio: false,
            file_url: url,
            name: sender.name ? sender.name : sender.name,
            avatar: sender?.photo ? sender?.photo : sender?.photo,
            receiver: receiver.id,
            sent: true,
            received: true,
            type: this.props.route.params.data.type || 'Normal',
            read: 0,
          });
        }),
      );
      this.setState({loading: false});

      // Step 2: Send notification
      const notificationObj = {
        title: 'Chat Message',
        body: 'You have received a message',
        senderId: sender?.id,
        receiverId: receiver?.id,
        senderName: sender?.name,
        receiverName: '',
        message: 'This is a test message',
        image:
          'http://3.13.164.94:5000/api/file/public/uploads/file-1641812580150.jpg',
        type:
          this.props.route.params.data.type === 'Education'
            ? 'ChatMessageEducation'
            : this.props.route.params.data.type === 'Classified'
            ? 'ChatMessageClassified'
            : this.props.route.params.data.type === 'Career'
            ? 'ChatMessageCareer'
            : this.props.route.params.data.type === 'Connect'
            ? 'ChatMessageConnect'
            : this.props.route.params.data.type === 'Social'
            ? 'ChatMessageSocial'
            : this.props.route.params.data.type === 'Support'
            ? 'ChatMessageSupport'
            : 'ChatMessage',
        module_type: 'daak',
        created_at: now,
      };

      ProfileServices.sendChatNotifications(
        notificationObj,
        this.props.user.userData.token,
      )
        .then(res => {})
        .catch(err => console.log(err));

      // Step 3: Update chat summaries for both users
      const chatSummary = {
        id: `${receiver.id}-${this.props.route.params.data.type}`,
        name: receiver.username || receiver.name,
        email: receiver.email,
        createdAt: now,
        seen: false,
        profile_url: receiver?.photo ? receiver?.photo : '',
        lastMessage: 'Shared a file.',
        type: this.props.route.params.data.type || 'Normal',
      };

      await firestore()
        .collection('users')
        .doc(this.currentUserId)
        .collection('chats')
        .doc(chatSummary.id)
        .set(chatSummary, {merge: true});

      await firestore()
        .collection('users')
        .doc(receiver.id)
        .collection('chats')
        .doc(`${this.currentUserId}-${this.props.route.params.data.type}`)
        .set(
          {
            ...chatSummary,
            id: `${this.currentUserId}-${this.props.route.params.data.type}`,
            name: sender.name ? sender.name : sender.email,
            email: sender.email,
            profile_url: sender?.photo ? sender?.photo : '',
          },
          {merge: true},
        );

      this.setState({loading: false});
    } catch (err) {
      console.warn('Error sending file:', err);
    }
  };

  _renderSend = props => {
    const {type} = this.props.route?.params?.data;

    if (!props.text.trim()) {
      // text box empty
      return (
        <TouchableOpacity
          // onPress={()=>{}}
          disabled
          style={{
            //  marginBottom: '2.5%',
            marginRight: '1.5%',
            backgroundColor:
              type == 'Education'
                ? themeStyle.COLOR_EDUCATION
                : type == 'Classified'
                ? themeStyle.COLOR_CLASSIFIED
                : type == 'Career'
                ? themeStyle.CARRER_PRIMARY
                : type == 'Connect'
                ? themeStyle.PINK
                : type == 'Social'
                ? themeStyle.YELLOW
                : !type
                ? '#38474F'
                : '#38474F',
            padding: 14,
            borderRadius: 10,

            alignSelf: 'flex-end',
          }}>
          <SendIcon />
        </TouchableOpacity>
      );
    }

    return (
      <Send {...props} containerStyle={{borderWidth: 0}}>
        <View
          style={{
            marginRight: '2.5%',
            backgroundColor:
              type == 'Education'
                ? themeStyle.COLOR_EDUCATION
                : type == 'Classified'
                ? themeStyle.COLOR_CLASSIFIED
                : type == 'Career'
                ? themeStyle.CARRER_PRIMARY
                : type == 'Connect'
                ? themeStyle.PINK
                : type == 'Social'
                ? themeStyle.YELLOW
                : !type
                ? '#38474F'
                : '#38474F',
            padding: 14,
            borderRadius: 10,

            alignSelf: 'center',
          }}>
          <SendIcon />
        </View>
      </Send>
    );
  };

  render() {
    const {type} = this.props.route?.params?.data;
    const {sender, alertModal, msgToDisplay, messages} = this.state;

    return (
      <ImageBackground
        source={require('../../assets/images/chatBg.png')}
        style={{flex: 1, width: SCREEN_WIDTH}}>
        <View style={styles.paddingTop}>
          {type == 'Education' ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.itemContainer}>
              <View>
                <Text style={styles.blackText1}>{'Class name'}</Text>
                <Text style={styles.grayText1}>{''}</Text>
              </View>
              <View style={styles.education}>
                <View style={styles.rowStyle1}>
                  <View style={styles.alignEnd}>
                    <Text style={styles.blackText2}>{'Workshop - Online'}</Text>
                    <Text style={styles.blackText2}>{'USD 5,000'}</Text>
                  </View>
                  {HorizontalSpacer()}
                  {HorizontalSpacer()}
                  <Icon.FontAwesome name="angle-right" size={20} color="gray" />
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.container}>
          {Platform.OS == 'android' ? (
            <GiftedChat
              messages={messages}
              onSend={this.onSend}
              placeholder={'Type your message'}
              maxComposerHeight={50}
              renderSend={this._renderSend}
              renderBubble={this._renderBubble}
              renderTime={this._renderTime}
              renderAvatar={() => null}
              isKeyboardInternallyHandled={false}
              style={{flex: 1}}
              shouldUpdateMessage={(props, nextProps) => true}
              showAvatarForEveryMessage={true}
              renderInputToolbar={props => (
                <View style={styles.inputToolbarContainer}>
                  <TouchableOpacity
                    onPress={() => this.chooseFile()}
                    style={styles.add}>
                    <Add />
                  </TouchableOpacity>
                  <View style={styles.container}>
                    <InputToolbar
                      {...props}
                      containerStyle={styles.inputContainer}
                      textInputStyle={styles.textInputStyle}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.state.recording
                        ? this.onStopRecord()
                        : this.onStartRecord();
                    }}
                    style={styles.mic}>
                    {this.state.recording ? (
                      <Icon.FontAwesome5
                        name="stop-circle"
                        size={30}
                        color={themeStyle.COLOR_BLACK}
                      />
                    ) : (
                      <Mic />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              renderTicks={message => null}
              user={{
                _id: this.currentUserId,
                name: sender.name || sender.first_name,
                avatar: sender.photo,
              }}
              bottomOffset={0}
              listViewProps={styles.listViewProps}
            />
          ) : (
            <GiftedChat
              messages={messages}
              onSend={this.onSend}
              placeholder={'Type your message'}
              maxComposerHeight={100}
              renderSend={this._renderSend}
              renderBubble={this._renderBubble}
              renderTime={this._renderTime}
              renderAvatar={() => null}
              // onLongPress={(context, message) => {
              //   this.setState({
              //     selectedMessageId: message._id,
              //     showReactions: true,
              //   });
              // }}
              shouldUpdateMessage={(props, nextProps) => true}
              isKeyboardInternallyHandled={false}
              style={styles.container}
              showAvatarForEveryMessage={true}
              renderInputToolbar={props => (
                <View style={styles.inputToolbarContainer}>
                  <TouchableOpacity
                    onPress={() => this.chooseFile()}
                    style={[styles.add, {marginBottom: -30}]}>
                    <Add />
                  </TouchableOpacity>
                  <View style={styles.container}>
                    <InputToolbar
                      {...props}
                      containerStyle={styles.inputContainer}
                      textInputStyle={styles.textInputStyle}
                      multiline={false}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.state.recording
                        ? this.onStopRecord()
                        : this.onStartRecord();
                    }}
                    style={[styles.mic, {marginBottom: -30}]}>
                    {this.state.recording ? (
                      <Icon.FontAwesome5
                        name="stop-circle"
                        size={30}
                        color={themeStyle.COLOR_BLACK}
                      />
                    ) : (
                      <Mic />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              user={{
                _id: this.currentUserId,
                name: sender.name || sender.first_name,
                avatar: sender.photo,
              }}
              bottomOffset={0}
              listViewProps={styles.listViewProps}
              renderChatEmpty={() => {
                return (
                  <View style={styles.noMessageContainer}>
                    <Text style={styles.noMessage}>No messages found!</Text>
                  </View>
                );
              }}
            />
          )}
        </View>
        <Modal
          style={{backgroundColor: 'transparent'}}
          isOpen={this.state.loading}>
          <Loader />
        </Modal>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false});
          }}
          text={msgToDisplay}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};

export default connect(mapStateToProps)(Chat);
