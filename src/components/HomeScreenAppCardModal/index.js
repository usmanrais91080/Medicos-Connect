import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Connect from '../../assets/svg/connect.svg';
import Education from '../../assets/svg/education.svg';
import Social from '../../assets/svg/social.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';

import styles from './style';

const icons = {
  Career: <Career height={35} width={30} />,
  BookKeeping: <Wallet height={35} width={30} />,
  Classified: <Classified height={40} width={40} />,
  MentalHealth: <Mee height={50} width={50} />,
  Connect: <Connect height={40} width={45} />,
  Education: <Education height={35} width={30} />,
  Social: <Social height={45} width={45} />,
};
const CardItemModal = props => {
  return (
    <TouchableOpacity
      onPress={async () => await props.onPress()}
      style={[styles.container, {backgroundColor: '#F8F8F8'}]}
    >
      <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
        {icons[props.item.route]}
      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <Text style={[styles.titleStyle, {marginTop: 10}]}>
          {props.item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItemModal;
