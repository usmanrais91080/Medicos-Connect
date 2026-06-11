import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  DeleteModal,
  EducationStudentMyClassesItemComponent,
  Loader,
} from '../../../../components';
import styles from './style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import EducationFunction from './education.teacercoachclass.function';
import {route} from '../../../../lib/utils/constants';

class EducationTeacherMyClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      loading: true,
      classes: [],
      any: false,
      workshops: true,
      oneOnOne: false,
      default: false,
      latest: true,
      oldest: false,
      bowserMode: [
        {
          title: 'Community',
          qualification: 'Qualifications',
          className: 'Class Name',
          type: '1 on 1',
          classType: 'Home Tution',
          description: `Lorem ipsum dolor sit amet, consetetur\nsadipscing elitr, sed diam nonumy eirmod\ntempor invidunt ut`,
          price: 'PKR 5,000',
        },
      ],
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      alertModal: false,
      msgToDisplay: '',
    };
  }

  componentDidMount = () => {
    this._getQueries();
  };

  showNewUserAlertFunction = created => {
    this.setState({
      alertModal: true,
      msgToDisplay: created
        ? 'In order to utilise these features, your account must be verified. Go to account settings and complete your profile to get verified with Medicos Connect.'
        : 'To make use of these features, you need to create an account. Go to the account settings and create your profile to kickstart your journey with Medicos Connect.',
    });
  };

  _getQueries = () => {
    EducationFunction.getStudentQueries(this.props.user.userData.token)
      .then(res => {
        this.setState({classes: res.data, loading: false});
      })
      .catch(err => {
        this.setState({classes: [], loading: false});
      });
  };

  _renderBestMatchItem = (item, index) => {
    return (
      <>
        <EducationStudentMyClassesItemComponent
          coach
          teacher
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

  render() {
    const {activeTab, loading, classes, alertModal, msgToDisplay} = this.state;
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
              }}>
              {classes.length > 0 ? (
                <FlatList
                  ItemSeparatorComponent={VerticalSpacer}
                  contentContainerStyle={{paddingVertical: '5%'}}
                  data={classes}
                  renderItem={({item, index}) =>
                    this._renderBestMatchItem(item, index)
                  }
                />
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
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
export default connect(mapStateToProps)(EducationTeacherMyClasses);
