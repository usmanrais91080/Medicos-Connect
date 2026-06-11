import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  DeleteModal,
  EducationSearchBar,
  EducationStudentClassesItemComponent,
  Icon,
  Loader,
} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {VerticalSpacer} from '../../../../lib/utils/global';
import EducationFunction from './education.studentclasses.function';
import Calender from '../../../../assets/svg/calender-icon.svg';
import DatePicker from 'react-native-neat-date-picker';
import themeStyle from '../../../../assets/styles/theme.style';
import moment from 'moment';

class EducationStudentClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      classes: [],
      loading: true,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      dateModal: false,
      filteredClasses: [],
      offset: 5,
      page: 1,
      loadingMore: false,
      stopFetchMore: false,
      newMsgModal: false,
      newMsg: '',
      searchText: '',
    };
  }

  componentDidMount = () => {
    this._getClasses();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getClasses();
    });
  };

  _onConfirm = date => {
    this.setState({dateModal: false});
    if (date == null || !this.state.classes.length) return;
    let filteredClasses = this.state.classes.filter(item => {
      return moment(item.start_date).format('YYYY-MM-DD') == date.dateString;
    });
    if (filteredClasses.length == 0) {
      setTimeout(() => {
        this.setState({
          newMsgModal: true,
          newMsg: 'Seems like your schedule is clear.',
        });
        return;
      }, 800);
    }
    this.setState({filteredClasses});
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _getClasses = () => {
    const {offset, page} = this.state;
    EducationFunction.getClassesStudent(
      this.props.user.userData.token,
      1,
      offset,
    )
      .then(res => {
        this.setState({classes: res.data.classes, loading: false});
      })
      .catch(err => {
        this.setState({classes: [], loading: false});
      });
  };
  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentClassesItemComponent
          item={item}
          navigation={this.props.navigation}
          token={this.props.user.userData.token}
          showAlert={
            !this.props.user.userData.is_education_profile_created ||
            this.state.unverifiedUser
          }
          showAlertFunc={() =>
            this.showNewUserAlertFunction(
              this.props.user.userData.is_education_profile_created,
            )
          }
        />
      </>
    );
  };

  _loadMore = () => {
    if (!this.state.stopFetchMore) {
      const {page, offset, classes} = this.state;
      EducationFunction.getClassesStudent(
        this.props.user.userData.token,
        page,
        offset,
      )
        .then(res => {
          this.setState({
            classes: [...classes, ...res.data.classes],
            loadingMore: false,
            page: res.data?.classes?.length == 0 ? page : page + 1,
            stopFetchMore: res.data?.classes?.length === 0,
          });
        })
        .catch(err => {
          this.setState({loadingMore: false});
        });
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  onScrollDragBegin = () => {
    this.setState({stopFetchMore: false});
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent)) {
      this.setState({page: this.state.page + 1, loadingMore: true}, () => {
        this._loadMore();
      });
    }
  };

  onChangeSearchText = text => {
    const {classes} = this.state;
    const lowerCaseText = text.toLowerCase();

    const searchedClasses = classes.filter(item =>
      item?.subject?.toLowerCase().includes(lowerCaseText),
    );

    this.setState({
      filteredClasses: searchedClasses,
      searchText: text,
    });
  };

  onClearSearchText = () => {
    this.setState({
      searchText: '',
      filteredClasses: [],
    });
  };

  render() {
    const {
      loading,
      classes,
      alertModal,
      msgToDisplay,
      dateModal,
      filteredClasses,
      loadingMore,
      newMsgModal,
      newMsg,
      searchText,
    } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{
                marginHorizontal: '5%',
                paddingBottom: '30%',
              }}
              onScroll={this.onScroll}
              onScrollBeginDrag={this.onScrollDragBegin}
              scrollEventThrottle={100}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => this._getClasses()}
                  colors={[themeStyle.COLOR_EDUCATION]}
                />
              }
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({dateModal: true, filteredClasses: []})
                }
                style={styles.calenderButton}
              >
                <Calender />
                <Text style={styles.calenderText}>Calender</Text>
              </TouchableOpacity>
              <EducationSearchBar
                searchText={searchText}
                onChangeText={this.onChangeSearchText}
                onClear={this.onClearSearchText}
                placeholder={'Search by subject...'}
              />
              <Text style={styles.upComingText}>Upcoming Classes</Text>
              {classes?.length > 0 ? (
                <>
                  <FlatList
                    ItemSeparatorComponent={VerticalSpacer}
                    contentContainerStyle={{paddingVertical: '5%'}}
                    data={
                      filteredClasses?.length > 0 ? filteredClasses : classes
                    }
                    renderItem={({item, index}) =>
                      this._renderBestMatchItem(item, index)
                    }
                  />
                  {loadingMore && (
                    <ActivityIndicator
                      size="large"
                      color={themeStyle.COLOR_EDUCATION}
                      style={{marginTop: 10}}
                    />
                  )}
                </>
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../../assets/gifs/studyschedule.gif')}
                      style={styles.gif}
                      resizeMode="contain"
                    />
                    <Text style={styles.noDataText}>No Classes Available.</Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        )}
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () => {
              if (!this.props.user.userData.is_education_profile_created)
                this.props.navigation.navigate(route.EDUCATIONSETTINGS, {
                  prev_screen: route.HOME,
                });
              else if (this.state.unverifiedUser) {
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
        <DatePicker
          isVisible={dateModal}
          colorOptions={{
            confirmButtonColor: themeStyle.COLOR_EDUCATION,
            selectedDateBackgroundColor: themeStyle.COLOR_EDUCATION,
            headerColor: themeStyle.COLOR_EDUCATION,
            weekDaysColor: themeStyle.COLOR_EDUCATION,
          }}
          mode={'single'}
          onCancel={() => this.setState({dateModal: false})}
          onConfirm={this._onConfirm}
          textColor={themeStyle.COLOR_BLACK}
        />
        <DeleteModal
          alert
          visible={newMsgModal}
          confirm={() => {
            this.setState({newMsgModal: false});
          }}
          text={newMsg}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(EducationStudentClasses);
