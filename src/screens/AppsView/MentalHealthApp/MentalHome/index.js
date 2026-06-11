import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {mentalHealthActions} from '../../../../redux/actions/mentalHealth';
import {authActions} from '../../../../redux/actions/auth';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {Icon} from '../../../../components';
import Diary from '../../../../assets/svg/book.svg';
import Breathe from '../../../../assets/svg/breathe.svg';
import Goals from '../../../../assets/svg/goals.svg';
import HelpLineIcon from '../../../../assets/svg/helpLine.svg';
import Journal from '../../../../assets/svg/journal.svg';
import MoodTracker from '../../../../assets/svg/moodTracker.svg';
import Progress from '../../../../assets/svg/progress.svg';
import Workout from '../../../../assets/svg/workout.svg';
import {HelpLine} from './mental.helpline.component';
import {MentalServices} from '../../../../services';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.PURPLE_COLOR,
  iconColor: themeStyle.COLOR_WHITE,
};
class MentalHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModal: false,
      msgToDisplay: '',
      openHelpline: false,
      unverifiedUser: this.props.user.userData.user_tier == 0 ? true : false,
      helplineLoading: true,
      helpData: [],
    };
  }

  componentDidMount() {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() =>
            this.props.navigation.replace(route.MAIN, {screen: route.HOME})
          }
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
    this.getMentalHelpline();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getMentalHelpline();
      this.props.bottomTabAction.bottomTabTheme(colorTheme);
    });
  }

  getMentalHelpline = () => {
    MentalServices.getHelplines(this.props.user.userData.token)
      .then(res => {
        const newArray = res.data.data.map(val => ({
          ...val,
          label: val?.country,
          value: val?.country,
        }));
        this.setState({helplineLoading: false, helpData: newArray});
      })
      .catch(err => {
        this.setState({helplineLoading: false});
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

  render() {
    const {openHelpline, unverifiedUser, helpData} = this.state;
    const data = [
      {
        id: 1,
        title: 'Self Help Journal',
        Icon: Journal,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALSELFLOVE),
      },
      {
        id: 2,
        title: 'Diary',
        Icon: Diary,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALDIARY),
      },
      {
        id: 3,
        title: 'Workout',
        Icon: Workout,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALEXERCISE),
      },
      {
        id: 4,
        title: 'Breathe',
        Icon: Breathe,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALBREATHEHOME, {
                token: this.props.user.userData.token,
              }),
      },
      {
        id: 5,
        title: 'Mood Tracker',
        Icon: MoodTracker,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALMOODTRACKER, {
                token: this.props.user.userData.token,
              }),
      },
      {
        id: 6,
        title: 'Goals',
        Icon: Goals,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALGOALSHOME, {
                token: this.props.user.userData.token,
              }),
      },
      {
        id: 7,
        title: 'Help Line',
        Icon: HelpLineIcon,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.setState({openHelpline: true}),
      },
      {
        id: 8,
        title: 'My Progress',
        Icon: Progress,
        press: () =>
          !this.props.user.userData.is_mental_health_profile_created
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : unverifiedUser
            ? this.showNewUserAlertFunction(
                this.props.user.userData.is_mental_health_profile_created,
              )
            : this.props.navigation.navigate(route.MENTALMYPROGRESS, {
                token: this.props.user.userData.token,
              }),
      },
    ];

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={themeStyle.PURPLE_COLOR}
          barStyle={'light-content'}
        />
        <FlatList
          data={data}
          style={styles.flatlist}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          horizontal={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={item.press}
              style={styles.flatlistContainer}>
              <item.Icon />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <HelpLine
          visible={openHelpline}
          onClose={() => {
            this.setState({openHelpline: false});
          }}
          emojiImage={this.props.user.userData.mental_health_mood}
          emojiOnPress={() =>
            !this.props.user.userData.is_mental_health_profile_created
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_mental_health_profile_created,
                )
              : unverifiedUser
              ? this.showNewUserAlertFunction(
                  this.props.user.userData.is_mental_health_profile_created,
                )
              : this.props.navigation.navigate(route.MENTALMOOD, {
                  mood: this.state.ads,
                })
          }
          userLoc={this.props.user.userData?.localtion}
          data={helpData}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
    region: state.searchReducer.regionValue || {},
    posts: state.mentalHealthReducer.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mentalHealthAction: bindActionCreators(mentalHealthActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MentalHome);
