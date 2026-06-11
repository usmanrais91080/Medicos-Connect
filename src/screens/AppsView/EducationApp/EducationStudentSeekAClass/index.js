import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  EducationStudentQueryItemComponent,
  Loader,
  DeleteModal,
  EducationSearchBar,
} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import EducationFunction from './education.studentseekclass.function';
import Query from '../../../../assets/svg/query.svg';
import themeStyle from '../../../../assets/styles/theme.style';
import {EducationServices} from '../../../../services';
import EditQnaModal from '../../../../components/Modals/EditQnaModal';
import ImagesModal from '../../../../components/SpecialComponents/ImagesModal';
import Icon from '../../../../components/Icon';

class EducationStudentSeekAClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      loading: true,
      QnAs: [],
      alertModal: false,
      requests: [],
      filter: false,
      searching: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      page: 1,
      offset: 5,
      qnaId: '',
      editModalVisible: false,
      qnaDeleteModal: false,
      topic: '',
      description: '',
      qnaCategory: '',
      showImagesModal: false,
      images: [],
      isMyDiscussion: this.props.route.params?.isMyDiscussion,
      loading: true,
      loadingPost: false,
      stopFetchMore: true,
      isMoreQnAs: true,
      searchText: '',
      searchedQnas: [],
    };
  }
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getQnAs();
      this.setState({
        isMyDiscussion: this.props.route?.params?.isMyDiscussion || false,
      });
    });
  };

  deleteQna = () => {
    EducationServices.deleteQna(
      this.state.qnaId,
      this.props.user.userData.token,
    )
      .then(response => {
        this._getQnAs();
      })
      .catch(err => {
        setAlertModal(true);
        setErrorMessage(err?.message);
      });
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _getQnAs = () => {
    EducationFunction.getQnAs(
      this.state.page,
      this.state.offset,
      this.props.user.userData.token,
    )
      .then(res => {
        if (this.state.isMyDiscussion) {
          let newData = res.data.filter(
            item => item.user._id == this.props.user.userData._id,
          );
          this.setState({
            QnAs: newData,
            loading: false,
            loadingPost: false,
          });
          return;
        }
        this.setState({
          QnAs: [...res.data, ...this.state.QnAs],
          loading: false,
          loadingPost: false,
        });
      })
      .catch(err => {
        this.setState({loading: false});
        // console.log('_getQnAs err', err);
      });
  };

  handleVotePoll = (id, choice_id) => {
    EducationServices.onVotePoll(
      id,
      {choice_id},
      this.props.user.userData.token,
    )
      .then(res => {
        this._getQnAs();
      })
      .catch(err => {
        this.setState({
          alertModal: true,
          msgToDisplay: err.response.data.message,
        });
      });
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentQueryItemComponent
          showAlert={() =>
            this.setState({
              msgToDisplay: 'There is no response on this query.',
              alertModal: true,
            })
          }
          token={this.props.user.userData.token}
          item={item}
          showAlertForProfile={
            !this.props.user.userData.is_education_profile_created ||
            this.state.unverifiedUser
          }
          showAlertFunc={() =>
            this.showNewUserAlertFunction(
              this.props.user.userData.is_education_profile_created,
            )
          }
          viewDiscussion={() =>
            this.props.navigation.navigate(route.EDUCATIONQNADISCUSSION, {
              id: item._id,
              token: this.props.user.userData.token,
            })
          }
          showMenu={() => {
            this.setState({
              editModalVisible: true,
              qnaId: item._id,
              topic: item.topic,
              description: item.description,
              qnaCategory: item.category,
            });
          }}
          onPressImage={() =>
            this.setState({showImagesModal: true, images: item?.multi_media})
          }
          onVotePoll={this.handleVotePoll}
          navigation={this.props.navigation}
          user_id={this.props.user.userData._id}
        />
      </>
    );
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  onScrollBeginDrag = () => {
    this.setState({stopFetchMore: false});
  };

  onEndReached = async () => {
    const {stopFetchMore, page, offset, QnAs, isMyDiscussion} = this.state;
    const {userData} = this.props.user || {};

    if (stopFetchMore || !userData?.token) return;

    try {
      const response = await EducationFunction.getQnAs(
        page,
        offset,
        userData.token,
      );

      if (!response?.data) {
        this.setState({stopFetchMore: true, loading: false});
        return;
      }

      const fetchedQnAs = response.data;
      const updatedQnAs = isMyDiscussion
        ? [
            ...QnAs,
            ...fetchedQnAs.filter(item => item.user?._id === userData._id),
          ]
        : [...QnAs, ...fetchedQnAs];

      this.setState(prevState => ({
        stopFetchMore: fetchedQnAs.length === 0,
        QnAs: updatedQnAs,
        loading: false,
        loadingPost: false,
        page: fetchedQnAs.length === 0 ? prevState.page : prevState.page + 1,
        isMoreQnAs: fetchedQnAs.length !== 0,
      }));
    } catch (error) {
      this.setState({loading: false, stopFetchMore: true});
    }
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent) && this.state.isMoreQnAs) {
      this.setState({page: this.state.page + 1, loadingPost: true}, () =>
        this.onEndReached(),
      );
    }
  };

  onChangeSearchText = text => {
    const {QnAs} = this.state;
    const lowerCaseText = text.toLowerCase();

    const searchedQna = QnAs.filter(item =>
      item.topic.toLowerCase().includes(lowerCaseText),
    );

    this.setState({
      searchedQnas: searchedQna,
      searchText: text,
    });
  };

  onClearSearchText = () => {
    this.setState({
      searchText: '',
      searchedQnas: [],
    });
  };

  render() {
    const {
      loading,
      QnAs,
      alertModal,
      msgToDisplay,
      editModalVisible,
      qnaDeleteModal,
      qnaId,
      showImagesModal,
      topic,
      description,
      images,
      isMyDiscussion,
      loadingPost,
      searchText,
      searchedQnas,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={themeStyle.COLOR_EDUCATION}
            />
            <ScrollView
              contentContainerStyle={{
                marginHorizontal: '5%',
                paddingBottom: '40%',
              }}
              onScroll={this.onScroll}
              onScrollBeginDrag={this.onScrollBeginDrag}
              scrollEventThrottle={100}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this._getQnAs}
                  colors={[themeStyle.COLOR_EDUCATION]}
                />
              }>
              {isMyDiscussion ? (
                <>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => {
                      this.props.navigation.replace(route.EDUCATIONCREATEQNA, {
                        isMyDiscussion: false,
                      });
                      this._getQnAs();
                    }}>
                    <Icon.Entypo
                      name="cross"
                      size={30}
                      color={themeStyle.COLOR_BLACK}
                    />
                  </TouchableOpacity>
                  <View style={styles.profileDetailsContainer}>
                    <Image
                      source={{uri: this.props.user.userData.social_image}}
                      style={styles.userImage}
                    />
                    <Text style={styles.username}>
                      {this.props.user.userData.social_username}
                    </Text>
                  </View>
                  <Text style={styles.myDiscussion}>My Discussions</Text>
                </>
              ) : null}
              {!isMyDiscussion ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      !this.props.user.userData.is_education_profile_created ||
                      this.state.unverifiedUser
                        ? this.showNewUserAlertFunction(
                            this.props.user.userData
                              .is_education_profile_created,
                          )
                        : this.props.navigation.navigate(
                            route.EDUCATIONSTUDENTPOSTCLASS,
                          );
                    }}
                    style={[
                      styles.buttonContainer,
                      {
                        backgroundColor: themeStyle.EDUCATION_BROWN,
                        width: SCREEN_WIDTH * 0.9,
                      },
                    ]}>
                    <Query />
                    {HorizontalSpacer()}
                    <Text style={styles.btnText}>Create a QnA</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <EducationSearchBar
                searchText={searchText}
                onChangeText={this.onChangeSearchText}
                onClear={this.onClearSearchText}
                placeholder={'Search by topic...'}
              />

              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{
                  paddingVertical: '5%',
                }}
                data={searchedQnas?.length > 0 ? searchedQnas : QnAs}
                renderItem={({item, index}) =>
                  this._renderBestMatchItem(item, index)
                }
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', marginTop: '50%'}}>
                    No Q n A found
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              {loadingPost && (
                <ActivityIndicator
                  size="large"
                  color={themeStyle.COLOR_EDUCATION}
                />
              )}
            </ScrollView>
          </View>
        )}

        <EditQnaModal
          modalVisible={editModalVisible}
          setModalVisible={() => this.setState({editModalVisible: false})}
          onDelete={() =>
            this.setState({editModalVisible: false, qnaDeleteModal: true})
          }
          onEdit={() => {
            this.setState({editModalVisible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS, {
              id: qnaId,
              token: this.props.user.userData.token,
              isEdit: true,
              description,
              topic,
            });
          }}
        />

        <DeleteModal
          visible={qnaDeleteModal}
          confirm={() => {
            this.setState({qnaDeleteModal: false});
            this.deleteQna();
          }}
          cancel={() => {
            this.setState({qnaDeleteModal: false});
          }}
          text={'Are you sure you want to delete this Q n A?'}
        />
        <ImagesModal
          modalVisible={showImagesModal}
          onClose={() => this.setState({showImagesModal: false, images: []})}
          images={images}
        />
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_education_profile_created)
                this.props.navigation.navigate(route.EDUCATIONSETTINGS, {
                  prev_screen: route.HOME,
                });
              else if (msgToDisplay.includes('verified')) {
                this.props.navigation.push(route.MAIN, {
                  screen: route.PROFILE,
                  params: {
                    screen: route.ACCOUNTSETTINGS,
                    params: {
                      data: 0,
                    },
                  },
                });
              }
            });
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
export default connect(mapStateToProps)(EducationStudentSeekAClass);
