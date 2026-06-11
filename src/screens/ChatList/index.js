import React, {Component, createRef} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import moment from 'moment';
import {Container, Icon, Loader} from '../../components';
import Search from '../../assets/svg/search.svg';
import Seen from '../../assets/svg/seen-svg.svg';
import Seen2 from '../../assets/svg/seen2-svg.svg';
import styles from './style';
import {Avatar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import themeStyle from '../../assets/styles/theme.style';
import {route} from '../../lib/utils/constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bottomTabActions} from '../../redux/actions/bottomTab';
import Paths from '../../assets/svg/paths.svg';
import firestore from '@react-native-firebase/firestore';
import {BottomMenuChat} from './bottomMenuChat';
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.COLOR_WHITE,
  iconColor: themeStyle.COLOR_WHITE,
};
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        {
          name: 'All',
          selected: true,
        },
        {
          name: 'Classified',
          selected: false,
        },
        {
          name: 'Connect',
          selected: false,
        },
        {
          name: 'Social',
          selected: false,
        },
        {
          name: 'Career',
          selected: false,
        },
      ],
      conversation_list: [],
      original_list: [],
      loading: false,
      visible: false,
      searchVisible: false,
      searchQuery: '',
    };
    this.searchInputRef = createRef();
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
      this.getChatList();
    });
    this.getChatList();
    this.props.navigation.setOptions({
      // headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerRight: () => this.headerRight(),
      headerTitle: () => this.headerTitle(),
    });
  };

  getChatList = async () => {
    this.setState({loading: true});
    try {
      const userId = this.props.user.userData._id;
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('chats')
        .orderBy('createdAt', 'desc')
        .get();

      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      this.setState({
        conversation_list: chatList,
        original_list: chatList,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching chat list:', error);
      this.setState({loading: false});
    }
  };

  filterChat = item => {
    const {original_list} = this.state;
    const filterArray = original_list.filter(v => v.type === item.name);

    this.setState({
      conversation_list: filterArray.length ? filterArray : original_list,
      loading: false,
      value: item.name,
    });
  };

  headerTitle = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: themeStyle.FONT_BOLD,
              fontSize: themeStyle.FONT_SIZE_LARGE,
            }}>
            Daak
          </Text>
        </View>
      </View>
    );
  };

  handleSearchChange = text => {
    const {original_list} = this.state;
    let filterArray = [];
    filterArray = original_list.filter(v =>
      v.name.toLowerCase().includes(text.toLowerCase()),
    );
    this.setState({
      conversation_list: filterArray,
      loading: false,
      value: text,
    });
  };

  handleSearch = () => {
    this.setState(
      prevState => ({searchVisible: !prevState.searchVisible}),
      () => {
        this.props.navigation.setOptions({
          headerRight: () => this.headerRight(),
        });
        setTimeout(() => {
          this.searchInputRef?.current?.focus();
        }, 100);
      },
    );
  };

  closeSearch = () => {
    this.setState(
      {
        searchQuery: '',
        searchVisible: false,
        conversation_list: this.state.original_list,
      },
      () => {
        this.props.navigation.setOptions({
          headerRight: () => this.headerRight(),
        });
      },
    );
  };

  headerRight = () => {
    const {searchVisible, searchQuery} = this.state;
    return (
      <View style={styles.headerRightContainer}>
        {searchVisible ? (
          <View style={styles.row}>
            <TextInput
              ref={this.searchInputRef}
              style={styles.searchInput}
              onChangeText={this.handleSearchChange}
              placeholder="Search..."
            />
            <Icon.AntDesign
              onPress={this.closeSearch}
              name="close"
              size={20}
              color={themeStyle.COLOR_BLACK}
            />
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={() => this.setState({visible: true})}>
              <Paths fill={themeStyle.COLOR_BLACK} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleSearch}
              style={{marginLeft: 15}}>
              <Search fill={themeStyle.COLOR_BLACK} />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  headerLeft = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 15}}
        onPress={() => this.props.navigation.replace(route.MAIN)}>
        <Icon.AntDesign
          name={'arrowleft'}
          size={25}
          color={themeStyle.COLOR_BLACK}
        />
      </TouchableOpacity>
    );
  };

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle}></View>;
  };

  renderSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  _renderItems = item => {
    return (
      <>
        <View style={styles.contentContainer}>
          <View>
            <Avatar rounded source={{uri: item.profile_url}} size={70} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.textStyle}>{item.name}</Text>
          </View>
        </View>
      </>
    );
  };
  renderItems = item => {
    let difference = moment.duration(moment().diff(item.createdAt)).as('hours');
    const time =
      difference > 24
        ? moment(item.createdAt).format('DD MMM')
        : moment(item.createdAt).fromNow(true);

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            const userId = this.props.user.userData._id;
            firestore()
              .collection('users')
              .doc(userId)
              .collection('chats')
              .doc(item.id)
              .update({seen: true, read: 1});

            this.getChatList();
            let id = item.id.split('-');
            let data = {
              ...item,
              id: id[0],
            };
            this.props.navigation.navigate('ChatScreen', {data});
          }}
          style={styles.contentContainerConversation}>
          <View style={{flex: 0.15}}>
            <Avatar rounded source={{uri: item.profile_url}} size={60} />
          </View>
          <View style={styles.nameContainerConversation}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontFamily: themeStyle.FONT_MEDIUM}}>
                {item.name}
              </Text>
              <Text style={styles.listItemText}>{time}</Text>
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.listItemText1}>
              {item.lastMessage}
            </Text>
          </View>
          <View>
            <View style={styles.timeContainer}>
              {item?.is_org ? (
                <View
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: themeStyle.COLOR_BLACK,
                  }}>
                  <Text
                    style={[
                      styles.itemText1,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Org
                  </Text>
                </View>
              ) : null}
              {item.type ? (
                <View
                  style={{
                    marginLeft: 5,
                    borderRadius: 20,
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    width: 70,
                    backgroundColor:
                      item.type == 'Classified'
                        ? themeStyle.COLOR_CLASSIFIED
                        : item.type == 'Career'
                        ? themeStyle.CARRER_PRIMARY
                        : item.type == 'Social'
                        ? themeStyle.YELLOW
                        : item.type == 'Connect'
                        ? themeStyle.PINK
                        : '#FF6B6B',
                  }}>
                  <Text
                    style={[
                      styles.itemText1,
                      {
                        color: themeStyle.COLOR_WHITE,
                      },
                    ]}>
                    {item.type == 'Social' ? 'Social' : item.type}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              {item?.seen ? <Seen /> : <Seen2 />}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#7E7E7E',
            borderBottomWidth: 0.5,
            height: 5,
            width: '80%',
            alignSelf: 'flex-end',
          }}
        />
      </>
    );
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <Container color={true}>
        <StatusBar backgroundColor={themeStyle.COLOR_WHITE} />

        {this.state.loading ? (
          <Loader />
        ) : this.state.conversation_list.length == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: themeStyle.FONT_REGULAR,
                textAlign: 'center',
              }}>
              {' '}
              {`There is no messages in your Inbox from ${this.state.value}. Please go to Homepage do explore more!`}
            </Text>
          </View>
        ) : (
          <>
            <ScrollView style={{marginBottom: 110}}>
              <View style={{paddingTop: '5%', marginBottom: 12}}>
                <FlatList
                  data={this.state.conversation_list}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.renderSeparator}
                  renderItem={({item}) => this.renderItems(item)}
                  keyExtractor={item => item}
                />
              </View>
            </ScrollView>
          </>
        )}
        <BottomMenuChat
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
          filter={this.filterChat}
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
const mapDispatchToProps = dispatch => {
  return {
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
