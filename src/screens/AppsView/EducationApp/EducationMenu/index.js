import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import styles from './style';
import {Button_Group_Transaction} from './education.meu.component';
import {EducationServices} from '../../../../services';
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../../../../redux/actions/auth';
import {Avatar} from 'react-native-elements';
import commonStyle from '../../../../assets/styles/common.style';
import StarRating from 'react-native-star-rating';

const EducationMenu = props => {
  const dispatch = useDispatch();

  const profile = useSelector(state => {
    return {user: state.authReducer || {}};
  });
  const switchMode = mode => {
    EducationServices.setMode({mode}, profile?.user?.userData?.token)
      .then(res => {
        dispatch(
          authActions.getUserProfile(
            {token: profile?.user?.userData?.token},
            '',
            '',
          ),
        );
        if (mode == 'Teacher') {
          props.navigation.navigate(route.EDUCATIONTEACHER);
        } else {
          props.navigation.navigate(route.EDUCATIONSTUDENT);
        }
        props.onClose();
      })
      .catch(err => {});
  };
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={1000}
      onBackdropPress={() => {
        props.onClose;
      }}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{margin: 0}}>
      <View
        style={{
          flexDirection: 'row',
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        }}>
        <View style={{flex: 0.3, flexDirection: 'column'}}></View>
        <View
          style={{
            flex: 0.7,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
          }}>
          <View style={{flex: 0.6, marginTop: '5%'}}>
            <View style={styles.menuContainer}>
              <Icon.AntDesign
                onPress={props.onClose}
                name="arrowleft"
                size={25}
                color={themeStyle.COLOR_EDUCATION}
              />
              <Text style={styles.menuheading}>Settings</Text>
            </View>
            <View style={styles.rowContainer}>
              <Avatar
                source={{
                  uri: props.data?.education_image,
                }}
                rounded
                size={55}
              />
              <View style={{marginLeft: '5%'}}>
                <Text
                  style={commonStyle.burgerMenuUserNameTextStyle}
                  numberOfLines={2}>
                  {props.data?.education_username
                    ? props.data?.education_username?.length > 13
                      ? props.data?.education_username?.split(' ')[0]
                      : props.data?.education_username
                    : '(Your Name)'}
                </Text>
                <Text
                  onPress={() => {
                    props.onClose();
                    props.navigation.navigate(route.EDUCATIONSETTINGS, {
                      prev_screen: 'Home',
                    });
                  }}
                  style={commonStyle.burgerMenuViewTextStyle}>
                  View Settings{' '}
                </Text>
                {props.teacher ? (
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={profile?.user?.userData?.averageRating}
                    starStyle={{
                      paddingHorizontal: 2,
                      marginTop: 4,
                    }}
                    starSize={15}
                    fullStarColor={themeStyle.YELLOW}
                    containerStyle={{width: 20}}
                  />
                ) : null}
              </View>
            </View>

            {props.teacher ? (
              <View>
                <TouchableOpacity
                  onPress={props.onAppliedClasses}
                  style={[styles.rowContainer, {marginTop: '10%'}]}>
                  <Text style={styles.itemText}>Upcoming Classes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={props.onTeacherStats}
                  style={[styles.rowContainer, {marginTop: '6%'}]}>
                  <Text style={styles.itemText}>Teacher Stats</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={props.onMyDiscussion}
                  style={[styles.rowContainer, {marginTop: '10%'}]}>
                  <Text style={styles.itemText}>My Discussions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={props.onAppliedClasses}
                  style={[styles.rowContainer, {marginTop: '6%'}]}>
                  <Text style={styles.itemText}>Upcoming Classes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={props.onYourClasses}
                  style={[styles.rowContainer, {marginTop: '6%'}]}>
                  <Text style={styles.itemText}>Classes History</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={[styles.rowContainer, {marginTop: '6%'}]}>
              <Text style={styles.itemText}>Switch Modes</Text>
            </View>
            <View style={styles.rowContainer1}>
              <Button_Group_Transaction
                switchFunc={switchMode}
                value={props.teacher ? 'Teacher' : 'Student'}
                nav={props.onSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default EducationMenu;
