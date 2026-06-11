import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import THEME from '../../assets/styles/theme.style';
import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Connect from '../../assets/svg/connect.svg';
import Education from '../../assets/svg/education.svg';
import Social from '../../assets/svg/social.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';

import styles from './style';

const CardItem = props => {
  const icons = {
    Career: <Career height={54} width={54} />,
    Wallet: <Wallet height={54} width={54} />,
    Market: <Classified height={61} width={61} />,
    MentalHealth: <Mee height={53} width={49} />,
    Connect: <Connect height={72} width={72} />,
    Education: <Education height={47} width={46} />,
    Social: <Social height={54} width={54} />,
  };
  return (
    <TouchableOpacity
      onPress={async () => await props.onPress()}
      style={[
        styles.container,
        {backgroundColor: THEME.COLOR_WHITE, elevation: 0.75},
      ]}>
      <View style={styles.icon}>{icons[props.item.route]}</View>
      <View style={styles.nameContainer}>
        <Text style={styles.titleStyle}>{props.item?.module?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

// const icons = {
//   Career: props?.userData?.is_career_profile_created ? (
//     <Career height={54} width={54} />
//   ) : (
//     <CareerB height={54} width={54} />
//   ),

//   Wallet: props?.userData?.is_wallet_created ? (
//     <Wallet height={54} width={54} />
//   ) : (
//     <WalletB height={54} width={54} />
//   ),
//   Classified: props?.userData?.is_classified_profile_created ? (
//     <Classified height={61} width={61} />
//   ) : (
//     <ClassifiedB height={51} width={51} />
//   ),
//   MentalHealth: props?.userData?.is_mental_health_profile_created ? (
//     <Mee height={53} width={49} />
//   ) : (
//     <MeeB height={53} width={49} />
//   ),
//   Connect: props?.userData?.is_connect_profile_created ? (
//     <Connect height={72} width={72} />
//   ) : (
//     <ConnectB height={72} width={72} />
//   ),
//   Education: props?.userData?.is_education_profile_created ? (
//     <Education height={47} width={46} />
//   ) : (
//     <EducationB height={47} width={46} />
//   ),
//   Social: props?.userData?.is_social_profile_created ? (
//     <Social height={54} width={54} />
//   ) : (
//     <SocialB height={45} width={54} />
//   ),
// };
