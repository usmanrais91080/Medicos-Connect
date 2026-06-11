import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';

import styles from './styles';

const EducationStudentClassesHistoryComponent = props => {
  const {item, navigation, token, cme, showAlert, showAlertFunc} = props;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={{width: SCREEN_WIDTH * 0.5}}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textStyle}>
            {item.topic}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[styles.blackText, {marginTop: '2%'}]}>
            {item.description}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={true}
            onPress={() => {
              showAlert
                ? showAlertFunc()
                : navigation.navigate(route.EDUCATION, {
                    screen: route.EDUCATIONSTUDENTCLASSDETAIL,
                    params: {item, token},
                  });
            }}
            style={styles.btnContainer2}>
            <Text style={styles.blackText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={cme ? true : false}
            onPress={() => {
              showAlert
                ? showAlertFunc()
                : navigation.navigate(route.EDUCATION, {
                    screen: route.EDUCATIONSTUDENTCLASSDETAIL,
                    params: {item, token},
                  });
            }}
            style={styles.btnContainer1}>
            <Text style={styles.blackText}>Missed</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.rowContainer, {marginTop: '1%'}]}>
        <View></View>
      </View>
    </View>
  );
};

export default EducationStudentClassesHistoryComponent;
