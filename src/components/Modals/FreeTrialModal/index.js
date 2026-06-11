import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from '../..';
import {useSelector} from 'react-redux';
import {route} from '../../../lib/utils/constants';
import {ProfileServices} from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FreeTrailModal = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.authReducer || {});
  const [days, setDays] = useState(0);
  const EIGHT_HOURS = 8 * 60 * 60 * 1000;

  useEffect(() => {
    checkFreeTrial();
  }, [user]);

  const checkFreeTrial = async () => {
    const {createdAt, medical_license_is_verified, token, is_trail} =
      user.userData;

    const lastCheckTime = await AsyncStorage.getItem('lastFreeTrialCheck');
    const currentTime = Date.now();

    if (
      !lastCheckTime ||
      currentTime - parseInt(lastCheckTime) >= EIGHT_HOURS
    ) {
      await AsyncStorage.setItem('lastFreeTrialCheck', currentTime.toString());

      const noOfDays = calculateDaysFromDate(createdAt);
      if (noOfDays % 2 === 0 && noOfDays < 7) {
        setModalVisible(true);
        setDays(noOfDays);
      }
      if (noOfDays >= 7 && medical_license_is_verified && is_trail) {
        ProfileServices.updateTrial(token)
          .then(() => {
            setModalVisible(false);
          })
          .catch(() => null);
      }
    }
  };

  const calculateDaysFromDate = createdAt => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const timeDifference = today - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const closeModal = () => setModalVisible(false);

  const getVerified = () => {
    setModalVisible(false);
    navigation.navigate(route.ACCOUNTSETTINGS, {
      data: 0,
    });
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={styles.cross}>
            <Icon.AntDesign name="close" size={25} />
          </TouchableOpacity>
          <Text style={styles.header}>
            Try Our App{'\n'}Unverified for 7 Days!
          </Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressLine}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: days == 0 ? 20 : 0,
                    borderBottomRightRadius: days == 0 ? 20 : 0,
                  },
                ]}
              />
              {days >= 2 ? (
                <View
                  style={[
                    styles.iconCircle,
                    {
                      borderBottomLeftRadius: days == 2 ? 20 : 0,
                      borderBottomRightRadius: days == 2 ? 20 : 0,
                    },
                  ]}
                />
              ) : null}
              {days >= 4 ? (
                <View
                  style={[
                    styles.iconCircle,
                    {
                      borderBottomLeftRadius: days == 4 ? 20 : 0,
                      borderBottomRightRadius: days == 4 ? 20 : 0,
                    },
                  ]}
                />
              ) : null}
              {days >= 6 ? (
                <View
                  style={[
                    styles.iconCircle,
                    {
                      borderBottomLeftRadius: days > 6 ? 20 : 0,
                      borderBottomRightRadius: days > 6 ? 20 : 0,
                    },
                  ]}
                />
              ) : null}
            </View>

            <View style={styles.textContainer}>
              <View style={styles.dayText}>
                <Text style={styles.dayTitle}>Today</Text>
                <Text style={styles.daySubtitle}>
                  Your full access to app starts today!
                </Text>
              </View>

              <View style={styles.dayText}>
                <Text style={styles.dayTitle}>5 Days</Text>
                <Text style={styles.daySubtitle}>
                  Reminder, 5 days are left with your unverified app access!
                </Text>
              </View>

              <View style={styles.dayText}>
                <Text style={styles.dayTitle}>3 Days</Text>
                <Text style={styles.daySubtitle}>
                  3 days are left! Get yourself verified today.
                </Text>
              </View>
              <View style={styles.dayText}>
                <Text style={styles.dayTitle}>1 Day</Text>
                <Text style={styles.daySubtitle}>
                  Time’s running out, just 1 day left to verify!
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.footerText}>
            The
            <Text style={styles.boldText}> 7-day unverified </Text>
            login provides access to all features, except{' '}
            <Text style={styles.boldText}>Connect</Text> due to our adherence to
            security protocols.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Start Unverified Access</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={getVerified}>
            <Text style={styles.buttonText}>Get Verified</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FreeTrailModal;
