import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import DropDown from '../../../../assets/svg/dropDown.svg';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';

const EducationModalTeacher = props => {
  const _renderBestMatchItem = (item, index) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.rowStyle}>
          <Avatar
            source={{
              uri:
                item.image == ''
                  ? 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
                  : item.image,
            }}
            rounded
            size={40}
          />
          {HorizontalSpacer()}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.textStyle}>
              {item?.username != null ? item.username : 'User'}
            </Text>
          </View>
        </View>
        <View style={[styles.rowStyle, {marginBottom: '10%'}]}></View>
      </View>
    );
  };
  return (
    <Modal
      visible={props.visible}
      animationInTiming={400}
      animationOutTiming={200}
      transparent={true}
      animationType="slide"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => props.onClose()}>
              <DropDown />
            </TouchableOpacity>
            <Text style={styles.viewStudents}>View Students</Text>
            <View style={styles.line} />
            <Text style={styles.description}>
              Please select the problem with this user
            </Text>
            <ScrollView style={styles.sliderStyle}>
              <FlatList
                ItemSeparatorComponent={VerticalSpacer}
                contentContainerStyle={{paddingVertical: '5%'}}
                data={props.data}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <Text style={styles.noDataText}>
                        No Students Available.
                      </Text>
                    </View>
                  );
                }}
                renderItem={({item, index}) =>
                  _renderBestMatchItem(item, index)
                }
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    elevation: 10,
  },
  description: {
    fontSize: 16,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_REGULAR,
    marginBottom: 17,
  },
  modalContainer: {
    borderRadius: 15,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  sliderStyle: {
    alignSelf: 'center',
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_REGULAR,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.WHITE_SMOKE,
    padding: 15,
    width: SCREEN_WIDTH * 0.85,
    borderRadius: 5,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
  },
  dropdown: {alignSelf: 'center', marginTop: 15, width: 40, height: 40},
  viewStudents: {
    fontSize: 24,
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_EDUCATION,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: themeStyle.EDUCATION_BROWN,
    width: '65%',
    marginTop: 7,
    marginBottom: 10,
    alignSelf: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
    textAlign: 'center',
    marginTop: '5%',
  },
});

export default EducationModalTeacher;
