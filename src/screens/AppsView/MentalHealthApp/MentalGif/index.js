import React, {Component} from 'react';
import {View, Image} from 'react-native';
import moment from 'moment';
import {Container, Loader} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {
  getLocalData,
  LOCAL_STORAGE_KEYS,
  storeLocalData,
} from '../../../../lib/utils/localstorage';
import {MentalServices} from '../../../../services';
import {connect} from 'react-redux';

class MentalGif extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let streakData = [];
    const userData = await getLocalData(LOCAL_STORAGE_KEYS.MENTALSPLASH);
    const date = await getLocalData(LOCAL_STORAGE_KEYS.METALTODO);

    setTimeout(async () => {
      if (userData) {
        if (date) {
          MentalServices.getNotificationSettings(this.props.user.userData.token)
            .then(res => {
              if (
                date !== `${moment().format('DD')}` &&
                `${moment().format('hh:mm A')}` >= '08:00 PM'
              ) {
                this.props.navigation.navigate(route.MENTALTODO);
              } else {
                this.props.navigation.navigate(route.MENTALHOME);
              }
            })
            .catch(err => {
              // console.log('err.response.data : ', err.response.data);
              this.props.navigation.navigate(route.MENTALHOME);
            });
        } else {
          MentalServices.getNotificationSettings(this.props.user.userData.token)
            .then(res => {
              if (
                date !== `${moment().format('DD')}` &&
                `${moment().format('hh:mm A')}` >= '08:00 PM'
              ) {
                this.props.navigation.navigate(route.MENTALTODO);
              } else {
                this.props.navigation.navigate(route.MENTALHOME);
              }
            })
            .catch(err => {
              // console.log('err.response.data : ', err.response.data);
              this.props.navigation.navigate(route.MENTALHOME);
            });
        }
      } else {
        this.props.navigation.navigate(route.SPLASH, {
          headerTitle: 'Mee',
          title:
            'Mental health tools & resources for medicos - safe, reliable, perfect!',
          videoDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          link: 'https://www.youtube.com/watch?v=3z9v0Nn3r1Q',
          onStartPress: async () => {
            await storeLocalData(
              LOCAL_STORAGE_KEYS.MENTALSPLASH,
              JSON.stringify(true),
            );
            this.props.navigation.navigate(route.MENTALHOME);
          },
        });
      }
    }, 500);
  };

  render() {
    return (
      <>
        <Loader />
        {/* <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../../assets/gifs/Mee.gif')}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.65,
              alignSelf: 'center',
            }}
          />
        </View> */}
        {/* {navigate()} */}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
export default connect(mapStateToProps)(MentalGif);
