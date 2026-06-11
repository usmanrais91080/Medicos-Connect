import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import {Icon} from '../../../../components';
import {HorizontalSpacer, VerticalSpacer} from '../../../../lib/utils/global';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';

const EducationModalStudent = props => {
  const _renderBestMatchItem = (item, index) => {
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.rowStyle}>
            <Avatar
              source={{
                uri:
                  item?.image != ''
                    ? item?.image
                    : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
              }}
              rounded
              size={50}
            />
            {HorizontalSpacer()}
            <View style={{marginTop: '5%'}}>
              <Text style={styles.textStyle}>{item?.username}</Text>
              {/* <Text style={styles.grayTextStyle}>{item.category}</Text> */}
            </View>
          </View>
          <View style={[styles.rowStyle, {marginBottom: '10%'}]}>
            {/* <Icon.AntDesign name="star" size={15} color="#99CC66" />
                    <Icon.Entypo name="dots-three-vertical" size={15} color="gray" /> */}
          </View>
        </View>
        <View style={[styles.rowContainer, {marginTop: '2.5%'}]}>
          <View>
            <Text style={[styles.grayTextStyle1, {marginTop: '2%'}]}>
              {item.description}{' '}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.blackText]}>USD {item.price} </Text>
        </View>
        <View style={[styles.rowContainer, {marginTop: '3%'}]}>
          <TouchableOpacity
            onPress={() => {
              props.reject(item?._id);
            }}
            style={styles.btnContainer3}>
            <Text style={styles.blackText2}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.accept(item?._id);
            }}
            style={styles.btnContainer1}>
            <Text style={[styles.whiteText, {color: themeStyle.COLOR_BLACK}]}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      // <View style={styles.rowContainer}>
      //     <View style={styles.rowStyle} >
      //         <Avatar
      //             source={{ uri: item.image == "" ?
      //             'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'
      //             :  item.image
      //              }}                        rounded
      //             size={50} />
      //         {HorizontalSpacer()}
      //         <View style={{ marginTop: "5%" }}>
      //             <Text style={styles.textStyle}>{item?.username != null ? item.username : "User"}</Text>
      //         </View>
      //     </View>
      //     <View style={[styles.rowStyle, { marginBottom: "10%" }]}>
      //     </View>
      // </View>
    );
  };
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      animationOutTiming={200} style={{justifyContent:"flex-end",margin:0}}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => props.onClose()}
          style={{alignItems: 'center', paddingTop: 10}}>
          <Icon.FontAwesome name="angle-down" size={30} color={'#38474F'} />
        </TouchableOpacity>

        <ScrollView style={styles.sliderStyle}>
          {props.data.length > 0 ? (
            <FlatList
              ItemSeparatorComponent={VerticalSpacer}
              contentContainerStyle={{paddingVertical: '5%'}}
              data={props.data}
              renderItem={({item, index}) => _renderBestMatchItem(item, index)}
            />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: themeStyle.PRIMARY_TINT_COLOR,
                  fontFamily: themeStyle.FONT_REGULAR,
                  fontSize: themeStyle.FONT_SIZE_SMALL,
                }}>
                No requests to load..
              </Text>
            </View>
          )}
        </ScrollView>

        {/* <TouchableOpacity
          onPress={() => props.onClose()}
          style={{alignItems: 'center', padding: 10}}>
          <Icon.FontAwesome name="angle-up" size={30} color={'#38474F'} />
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

export default EducationModalStudent;
