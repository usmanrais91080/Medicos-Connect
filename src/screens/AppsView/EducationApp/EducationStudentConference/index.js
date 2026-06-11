import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import {
  Container,
  DeleteModal,
  EducationSearchBar,
  EducationStudentCMEsItemComponent,
  Loader,
} from '../../../../components';
import styles from './style';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import {connect} from 'react-redux';
import {EducationServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import Schedule from '../../../../assets/svg/calender-icon.svg';
import moment from 'moment';
import {ActivityIndicator} from 'react-native';

class EducationStudentConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      dateModal: false,
      classes: [],
      loading: true,
      bowserMode: [
        {
          _id: '620b5d03c348d7e282f79186',
          teacher: {
            _id: '61f4221a6012265786b4d138',
            username: 'Hamza Education',
            image:
              'http://3.13.164.94:8000/api/file/public/uploads/file-1645002555907.jpg',
          },
          category: 'Language',
          subject: 'dummy',
          topic: 'Neuro',
          class_type: 'Free',
          price: '00',
          description: 'I am Umar from developer server',
          language: '61f680428da8c226a3cfdf25',
          start_date: 'Sep 15, 2020',
          end_date: '12:57pm',
          is_applied: false,
        },
      ],
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
      filteredClasses: [],
      page: 1,
      offset: 5,
      loadingPost: false,
      stopFetchMore: true,
      searchText: '',
    };
  }

  componentDidMount = () => {
    this._getCMEs();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getCMEs();
    });
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilize these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _onConfirm = date => {
    this.setState({dateModal: false});
    let filteredClasses = this.state.classes.filter(item => {
      return (
        moment(item.created_at).format('YYYY-MM-DD') ==
        moment(date.date).format('YYYY-MM-DD')
      );
    });
    this.setState({filteredClasses});
  };

  _getCMEs = () => {
    const {page, offset} = this.state;
    EducationServices.getCME(this.props.user.userData.token, page, offset)
      .then(res => {
        this.setState({
          classes: res.data.data.items,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({classes: [], loading: false});
      });
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

  onEndReached = () => {
    if (!this.state.stopFetchMore) {
      const {page, offset} = this.state;
      EducationServices.getCME(this.props.user.userData.token, page, offset)
        .then(res => {
          this.setState({
            classes: [...this.state.classes, ...res.data.data.items],
            loadingPost: false,
            page: page + 1,
            stopFetchMore: res.data.data.items === 0,
          });
        })
        .catch(err => {
          this.setState({classes: [], loading: false});
        });
    }
  };

  onScroll = ({nativeEvent}) => {
    if (this.isCloseToBottom(nativeEvent)) {
      this.setState({page: this.state.page + 1, loadingPost: true}, () =>
        this.onEndReached(),
      );
    }
  };

  onChangeSearchText = text => {
    const {classes} = this.state;
    const lowerCaseText = text.toLowerCase();

    const searchedClasses = classes.filter(item =>
      item?.topic?.toLowerCase().includes(lowerCaseText),
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

  _renderBestMatchItem = item => {
    return (
      <>
        <EducationStudentCMEsItemComponent
          item={item}
          token={this.props.user.userData.token}
          currency={this.props.currency?.symbol}
          navigation={this.props.navigation}
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

  render() {
    const {
      dateModal,
      loading,
      classes,
      alertModal,
      msgToDisplay,
      filteredClasses,
      loadingPost,
      searchText,
    } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <ScrollView
              contentContainerStyle={{
                marginHorizontal: '5%',
                paddingBottom: '30%',
              }}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => this._getCMEs()}
                  colors={[themeStyle.COLOR_EDUCATION]}
                />
              }
              onScroll={this.onScroll}
              onScrollBeginDrag={this.onScrollBeginDrag}
              scrollEventThrottle={100}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    !this.props.user.userData.is_education_profile_created ||
                    this.state.unverifiedUser
                      ? this.showNewUserAlertFunction(
                          this.props.user.userData.is_education_profile_created,
                        )
                      : this.setState({
                          dateModal: true,
                        });
                  }}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: themeStyle.EDUCATION_BROWN,
                      width: SCREEN_WIDTH * 0.9,
                    },
                  ]}>
                  <Schedule />
                  {HorizontalSpacer()}
                  <Text style={styles.btnText}>Calender</Text>
                </TouchableOpacity>
              </View>
              <EducationSearchBar
                searchText={searchText}
                onChangeText={this.onChangeSearchText}
                onClear={this.onClearSearchText}
                placeholder={'Search by topic...'}
              />

              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{paddingVertical: '5%'}}
                data={filteredClasses?.length > 0 ? filteredClasses : classes}
                renderItem={({item}) => this._renderBestMatchItem(item)}
                ListEmptyComponent={() => (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 10,
                      color: themeStyle.COLOR_BLACK,
                    }}>
                    No CMEs found
                  </Text>
                )}
              />
              {loadingPost && (
                <ActivityIndicator
                  size={'large'}
                  color={themeStyle.COLOR_EDUCATION}
                  style={{
                    marginBottom: 30,
                  }}
                />
              )}
            </ScrollView>
          )}
        </View>
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
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    // currency: state.authReducer.userData.currency || {},
    currency: state.searchReducer.currency || {},
  };
};
export default connect(mapStateToProps)(EducationStudentConference);
