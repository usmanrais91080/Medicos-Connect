import React, { Component } from 'react';
import Lottie from 'lottie-react-native';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Container, Loader } from '../../../../components';
import { VerticalSpacer } from '../../../../lib/utils/global';
import styles from './style';
import { route } from '../../../../lib/utils/constants';
import { ProfileServices } from '../../../../services';
import { connect } from 'react-redux';
import style from './style';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../../redux/actions/auth';

class MentalMood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      moodArray: [
        {
          _id: '62f64bca6f3b3b23300d21ec',
          expression: 'Angry',
          image:
            'https://api-dev.medicosconnect.com/public/uploads/file-1660309411911.PNG',
          createdAt: '2022-08-12T12:47:06.437Z',
        },
        {
          _id: '62f650216ffcef362cb12330',
          expression: 'Sad',
          image:
            'https://api-dev.medicosconnect.com/public/uploads/file-1660309537361.PNG',
          createdAt: '2022-08-12T13:05:37.372Z',
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getMentalMoods();
  };

  renderMoods = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectMood(item?._id)}
        // onPress={() => {
        //   let count = this.state.counter;
        //   let array = [...this.state.hobbies];
        //   if (array[index].selected) {
        //     if (count <= 5) {
        //       array[index] = {...array[index], selected: false};
        //       count = count - 1;
        //     }
        //   } else {
        //     if (count < 5) {
        //       array[index] = {...array[index], selected: true};
        //       count = count + 1;
        //     }
        //   }
        //   this.setState({hobbies: array, counter: count});
        // }}
        key={index.toString()}
        style={{ marginRight: 10 }}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item?.expression}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleSelectMood = item => {
    const { prev_screen } = this.props?.route?.params;
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append('mood_id', item);
    ProfileServices.updateMentalProfileSettings(
      formData,
      this.props.user.userData.token,
    )
      .then(res => {
        this.props.authActions.getUserProfile(
          { token: this.props.user.userData.token },
          '',
          '',
        );
        this.setState({
          loading: false,
        }, () => this.props.navigation.replace(route.MENTALHOME));

      })
      .catch(err => {
        // console.log('err>>>>>>', err);
        this.props.authActions.getUserProfile(
          { token: this.props.user.userData.token },
          '',
          '',
        );
        this.setState({
          errorAlert: true,
          msgToDisplay: 'Oh, shoot! Try again',
          uploading: false,
        });
      });
  };

  getMentalMoods = () => {
    ProfileServices.getMentalMoods(this.props.user.userData.token)
      .then(res => {
        if (res.data.code == 200) {
          this.setState({ moodArray: res.data.data, loading: false });
        }
      })
      .catch(err => {
      });
  };

  render() {
    return (
      <Container>
        <View style={style.container}>
          <View style={{ marginVertical: 20 }}>
            <View style={{ width: 250, height: 250, alignSelf: 'center' }}>
              <Lottie
                source={require('../../../../assets/animation/sleep.json')}
                autoPlay
                loop
              />
            </View>

            <View>
              {this.state.loading ?
                <View style={{ marginVertical: '10%' }}><Loader /></View> :
                <>
                  <Text style={style.blackText}>How are you feeling today?</Text>
                  <FlatList
                    data={this.state.moodArray}
                    numColumns={3}
                    renderItem={({ item, index }) => this.renderMoods(item, index)}
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={VerticalSpacer}
                  /></>
              }

            </View>
          </View>
        </View>
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
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MentalMood);
