import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import Icon from '../../../../components/Icon';
import Wave from '../../../../assets/svg/wave.svg';
import Sound from 'react-native-sound';
import themeStyle from '../../../../assets/styles/theme.style';
import {ShareMenu} from '../MentalDiary/mental.diary.sharemenu.component';
import {MentalServices} from '../../../../services';
import {route} from '../../../../lib/utils/constants';
import {DeleteModal, Loader} from '../../../../components';

const MentalDiaryEntry = ({route: routeData, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [postMenu, setPostMenu] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState('');
  let {data, token} = routeData.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation]);

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPostMenu(true);
        }}>
        <Icon.Entypo
          name="dots-three-vertical"
          size={20}
          color={themeStyle.COLOR_WHITE}
          style={{marginRight: 20}}
        />
      </TouchableOpacity>
    );
  };

  const handleDeleteEntry = () => {
    MentalServices.deleteDiary(data?._id, token)
      .then(res => {
        setAlertModal(true);
        setMsgToDisplay(`${res?.data?.message}`);
      })
      .catch(err => {
        // console.log('err', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {moment(data.createdAt).format('ddd, MMM D, YYYY')}
      </Text>
      <View style={styles.line} />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.body}>{data.text}</Text>
      {data?.image && <Image source={{uri: data.image}} style={styles.image} />}
      {data?.recording != null && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
            alignSelf: 'flex-start',
            paddingHorizontal: 20,
            marginTop: 8,
          }}>
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (isPlaying) {
                    setIsPlaying(false);
                  } else {
                    setIsLoading(true);
                  }
                  setIsPlaying(isPlaying);
                  setIsLoading(isLoading);
                  let sound = new Sound(data?.recording, null, error => {
                    if (error) {
                    } else {
                      if (isPlaying) {
                        setIsPlaying(false);
                        sound.pause();
                      } else {
                        sound.play(success => {
                          if (success) {
                            setIsLoading(false);
                            setIsPlaying(false);
                          }
                        });
                        setIsLoading(false);
                        setIsPlaying(true);
                      }
                    }
                  });
                }}>
                <Icon.AntDesign
                  name={isPlaying ? 'pausecircle' : 'play'}
                  size={30}
                  color={themeStyle.PURPLE_COLOR}
                />
              </TouchableOpacity>
            )}
          </>
          <>
            <Wave height={60} width={200} />
          </>
        </View>
      )}
      <ShareMenu
        visible={postMenu}
        onPressButton={text => {
          setPostMenu(false);
          if (text == 'pin') {
          } else if (text == 'share') {
            navigation.navigate(route.MENTALDIARYCREATE, {
              data,
              token,
              update: true,
            });
          } else {
            handleDeleteEntry();
          }
        }}
        onClose={() => {
          setPostMenu(false);
        }}
      />
      <DeleteModal
        alert
        visible={alertModal}
        confirm={() => {
          setAlertModal(false);
          navigation.goBack();
        }}
        text={msgToDisplay}
      />
    </View>
  );
};

export default MentalDiaryEntry;
