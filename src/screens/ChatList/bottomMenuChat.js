import React from 'react';
import Modal from 'react-native-modal';
import DropDown from '../../assets/svg/dropDown.svg';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {VerticalSpacer} from '../../lib/utils/global';
import themeStyle from '../../assets/styles/theme.style';

import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Connect from '../../assets/svg/connect.svg';
import Education from '../../assets/svg/education.svg';
import Social from '../../assets/svg/social.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';
import Medicos from '../../assets/svg/medicos_connect_logo.svg';
import styles from './style';

const icons = {
  Career: <Career height={35} width={30} />,
  Wallet: <Wallet height={35} width={30} />,
  Classified: <Classified height={40} width={40} />,
  Mee: <Mee height={50} width={50} />,
  Connect: <Connect height={50} width={45} />,
  Education: <Education height={35} width={30} />,
  Social: <Social height={45} width={45} />,
  MedicosConnect: <Medicos height={45} width={45} />,
};

export const BottomMenuChat = props => {
  const modules = [
    {name: 'Career', route: 'a'},
    {name: 'Pager', route: 'b'},
    {name: 'Wallet', route: 'c'},
    {name: 'Classified', route: 'd'},
    {name: 'Mee', route: 'e'},
    {name: 'Connect', route: 'f'},
    {name: 'Education', route: 'g'},
    {name: 'Social', route: 'i'},
    {name: 'MedicosConnect', route: 'j'},
  ];

  const {visible, onClose, filter} = props;
  return (
    <Modal
      transparent
      isVisible={visible}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      animationIn={'slideInUp'}
      backdropColor={'transparent'}
      onBackdropPress={onClose}
      animationInTiming={800}
      animationOutTiming={800}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <View
        style={{
          backgroundColor: themeStyle.COLOR_WHITE,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingTop: 10,
          paddingHorizontal: '5%',
          paddingBottom: 20,
          // height: SCREEN_HEIGHT * 0.5,
          borderColor: '#0B90CF',
          borderWidth: 2,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{alignItems: 'center', marginBottom: 20}}
          onPress={onClose}
        >
          <DropDown />
        </TouchableOpacity>
        <FlatList
          data={modules}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => props.filter(item)}
                style={[
                  item.name !== 'MedicosConnect'
                    ? styles.container
                    : styles.container2,
                  {backgroundColor: '#F8F8F8'},
                ]}
              >
                <View
                  style={
                    item.name !== 'MedicosConnect' && {
                      flex: 0.6,
                      justifyContent: 'flex-end',
                    }
                  }
                >
                  {icons[item?.name]}
                </View>
                <View
                  style={
                    item.name !== 'MedicosConnect'
                      ? {
                          flex: 0.4,
                          justifyContent: 'center',
                        }
                      : {marginLeft: 20, marginBottom: 10}
                  }
                >
                  <Text style={[styles.titleStyle, {marginTop: 10}]}>
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.contentContainer2}
          keyExtractor={item => item.route}
          ItemSeparatorComponent={VerticalSpacer}
        />
      </View>
    </Modal>
  );
};
